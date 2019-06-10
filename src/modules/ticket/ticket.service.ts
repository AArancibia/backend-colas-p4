import { HttpException, HttpStatus, Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Ticket } from './ticket.entity';
import { Estado } from './estadoticket/estadoticket.entity';
import { In, Repository } from 'typeorm';
import { TicketDto } from './ticket.dto';
import { Tipoticket } from './tipoticket/tipoticket.entity';
import { formatFechaCorta, formatFechaLarga } from '../../shared/utils';
import { Administrado } from '../administrado/administrado.entity';
import { Ventanilla } from '../ventanilla/ventanilla.entity';
import { TicketGateway } from '../../gateways/ticket.gateway';
import { Detestadoticket } from './detestadoticket/detestadoticket.entity';

@Injectable()
export class TicketService {
  private logger = new Logger( 'TicketService' );
  constructor(
    @InjectRepository( Ticket ) private ticketRepository: Repository< Ticket >,
    @InjectRepository( Estado ) private estadoRepository: Repository< Estado >,
    @InjectRepository( Detestadoticket ) private detEstadoTicketRepository: Repository< Detestadoticket >,
    @InjectRepository( Tipoticket ) private tipoTicketRepository: Repository< Tipoticket >,
    @InjectRepository( Administrado ) private administradoRepository: Repository< Administrado >,
    @InjectRepository( Ventanilla ) private ventanillaRepository: Repository< Ventanilla >,
    private wsTicket: TicketGateway,
  ) {}

  async getTickets() {
    const tickets = await this.ticketRepository.find({
      relations: [ 'administrado' ],
    });
    return tickets;
  }

  async crearTicket( ticket: TicketDto ) {
    const { idtipoticket, preferencial, idadministrado } = ticket;
    const estado = await this.estadoRepository.findOne( { where: { idestado: 1 } });
    const administrado = await this.administradoRepository.findOne({ where: { id: idadministrado }});
    const nuevoTicket: Ticket = await this.ticketRepository.create({
      ...ticket,
      administrado,
    });
    nuevoTicket.estados = [ estado ];
    const abrTicket = await this.obtenerTipoTicket( idtipoticket );
    const correlativo = await this.obtenerCorrelativo( idtipoticket, formatFechaCorta() );
    nuevoTicket.correlativo = correlativo;
    nuevoTicket.codigo = `${ preferencial ? 'P' : '' }${ abrTicket }-${ correlativo }`;
    await this.ticketRepository.save( nuevoTicket );
    this.logger.log( formatFechaLarga() );
    await this.detEstadoTicketRepository.update({
      tbTicketId:  nuevoTicket.id,
      tbEstadoticketId: 1,
    }, { fecha: formatFechaLarga() });
    this.wsTicket.ws.emit( '[TICKET] Nuevo', nuevoTicket );
    return nuevoTicket;
  }

  async guardarNuevoEstado(
    idticket: number,
    idestado: number,
  ) {
    const ticket = await this.ticketRepository.findOne( {
      where: { id: idticket },
      relations: [ 'estados' ],
    });
    if ( !ticket ) throw new HttpException( `No existe el ticket con el id: ${ idticket }`, HttpStatus.NOT_FOUND );
    /*const nuevoEstado = await this.estadoRepository.findOne({ where: { id: idestado }});
    ticket.estados = [ ...ticket.estados, nuevoEstado ];
    const guardarTicket = await this.ticketRepository.create( ticket );
    await this.ticketRepository.save( guardarTicket );*/
    const guardarDetEstadoTicket = await this.detEstadoTicketRepository.createQueryBuilder()
      .insert()
      .into( Detestadoticket )
      .values({
        tbEstadoticketId: idestado,
        tbTicketId: idticket,
        fecha: new Date(),
      })
      .returning(['*'])
      .execute();
    return guardarDetEstadoTicket;
  }

  async asignarVentanilla(
    idticket: number,
    idventanilla: number,
  ) {
    const ticket = await this.ticketRepository.findOne( {
      where: { id: idticket },
      relations: [ 'estados' ],
    });
    if ( !ticket ) throw new HttpException( `No existe el ticket con el id: ${ idticket }`, HttpStatus.NOT_FOUND );

    const ventanilla = await this.ventanillaRepository.findOne({ where: { idventanilla }});
    if ( !ventanilla ) throw new HttpException( `No existe la ventanilla con el id: ${ idventanilla }`, HttpStatus.NOT_FOUND );

    const llamandoEstado = await this.estadoRepository.findOne({ where: { id: 2 }});
    ticket.estados = [ ...ticket.estados, llamandoEstado ];
    const actualizarTicket: Ticket = await this.ticketRepository.create({
      ...ticket,
      idventanilla,
    });
    await this.ticketRepository.save( actualizarTicket );
    return actualizarTicket;
  }

  async derivarOtraVentanilla(
    idticket: number,
    idventanilla: number,
  ) {
    const ticket = await this.ticketRepository.findOne( { where: { id: idticket } });
    if ( !ticket ) throw new HttpException( `No existe el ticket con el id: ${ idticket }`, HttpStatus.NOT_FOUND );

    const ventanilla = await this.ventanillaRepository.findOne({ where: { idventanilla }});
    if ( !ventanilla ) throw new HttpException( `No existe la ventanilla con el id: ${ idventanilla }`, HttpStatus.NOT_FOUND );

    const estadosTickets = await this.detEstadoTicketRepository.find( { where: { tbTicketId: idticket }});
    const borrarTickets = await this.detEstadoTicketRepository.remove( estadosTickets );

    const buscarEstados = await this.estadoRepository.find({ where: { id: In( [ 5, 1 ] ) }});
    this.logger.log( buscarEstados );
    const insertarEstados = await this.detEstadoTicketRepository.createQueryBuilder()
      .insert()
      .into( Detestadoticket )
      .values([
        { tbTicketId: idticket, tbEstadoticketId: buscarEstados[ 0 ].id },
        { tbTicketId: idticket, tbEstadoticketId: buscarEstados[ 1 ].id },
      ])
      .returning( ['*'] )
      .execute();
    return insertarEstados;
  }

  async obtenerTipoTicket( idtipoticket: number ): Promise< string > {
    this.logger.log( idtipoticket );
    const ticket = await this.tipoTicketRepository.findOne(
      {
        where: {
          idtipoticket,
        },
        select: ['abr'],
      },
    );
    return ticket.abr;
  }

  async obtenerCorrelativo( idtipoticket: number, fechacorta: Date | string ): Promise< number > {
    const ticket = await this.ticketRepository.find(
      {
        where: {
          idtipoticket,
          fechacorta,
        },
        select: ['correlativo'],
        order: { correlativo: 'DESC' },
      },
    );
    let correlativo = !ticket[ 0 ] ? 0 : ticket[ 0 ].correlativo++;
    correlativo++;
    return correlativo;
  }
}
