import { HttpException, HttpStatus, Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Ticket } from './ticket.entity';
import { Estado } from './estadoticket/estadoticket.entity';
import { Between, In, Not, Repository } from 'typeorm';
import { TicketDto } from './ticket.dto';
import { Tipoticket } from './tipoticket/tipoticket.entity';
import { formatFechaCorta, formatFechaLarga } from '../../shared/utils';
import { Administrado } from '../administrado/administrado.entity';
import { Ventanilla } from '../ventanilla/ventanilla.entity';
import { TicketGateway } from '../../gateways/ticket.gateway';
import { Detestadoticket } from './detestadoticket/detestadoticket.entity';
import { VentanillaService } from '../ventanilla/ventanilla.service';

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
    private ventanillaService: VentanillaService,
    private wsTicket: TicketGateway,
  ) {}

  async actualizarTematicaOrTramite(
    idticket: number,
    ticket: any,
  ) {
    const ticketActualizado = await this.ticketRepository.update( idticket, {
      idtematica: ticket ? ticket.idtematica : null,
      idtramite: ticket ? ticket.idtramite : null,
    });
    const ticketAEmitir = await this.wsTicket.getDetEstadoTicket();
    this.wsTicket.ws.emit( '[TICKET] DETESTADO', ticketAEmitir );
    return ticketActualizado ;
  }

  async getTickets() {
    const tickets = await this.ticketRepository.find({
      relations: [ 'administrado', 'detEstados', 'estados' ],
      where: {
        fechacorta: formatFechaCorta(),
      },
      order: { fecha: 'ASC' },
    });
    const ticketsRO: Ticket[] = [];
    tickets.map(
      ticket => {
        ticket.detEstados.sort( ( a, b ) => new Date( b.fecha ).getTime() - new Date( a.fecha).getTime() );
        const ultimoEstado = ticket.detEstados[ 0 ].estadoticketId;
        if ( ultimoEstado === 4 || ultimoEstado === 6 ) {
          return;
        }
        ticketsRO.push( ticket );
      },
    );
    return ticketsRO;
  }

  async crearTicket( ticket: TicketDto ) {
    const { idtipoticket, preferencial, idadministrado } = ticket;
    const estado = await this.estadoRepository.findOne( { where: { idestado: 1 } });
    const administrado = await this.administradoRepository.findOne({ where: { id: idadministrado }});
    const nuevoTicket: Ticket = await this.ticketRepository.create({
      ...ticket,
      administrado,
      preferencial,
    });
    nuevoTicket.estados = [ estado ];
    const abrTicket = await this.obtenerTipoTicket( idtipoticket );
    const correlativo = await this.obtenerCorrelativo( idtipoticket, formatFechaCorta() );
    nuevoTicket.correlativo = correlativo;
    nuevoTicket.codigo = `${ preferencial ? 'P' : '' }${ abrTicket }-${ correlativo }`;
    await this.ticketRepository.save( nuevoTicket );
    await this.detEstadoTicketRepository.update({
      ticketId:  nuevoTicket.id,
      estadoticketId: 1,
    }, { fecha: formatFechaLarga() });
    const ticketBD = await this.ticketRepository.findOne({
      where: { id: nuevoTicket.id },
      relations: ['administrado', 'detEstados', 'estados'],
    });
    this.wsTicket.ws.emit( '[TICKET] Nuevo', ticketBD );
    const ticketAEmitir = await this.wsTicket.getDetEstadoTicket();
    this.wsTicket.ws.emit( '[TICKET] DETESTADO', ticketAEmitir );
    return ticketBD;
  }

  async guardarNuevoEstado(
    idticket: number,
    idestado: number,
  ) {
    const ticket = await this.ticketRepository.findOne( {
      where: { id: idticket },
      //relations: [ 'estados', 'administrado', 'detEstados' ],
    });
    if ( !ticket ) throw new HttpException( `No existe el ticket con el id: ${ idticket }`, HttpStatus.NOT_FOUND );
    const idestadoVentanilla = ( idestado == 4 ) || ( idestado == 6 ) ? 3 : idestado;
    this.logger.log( idestadoVentanilla );
    await this.ventanillaService.guardarNuevoEstado( ticket.idventanilla, idestadoVentanilla );
    const guardarDetEstadoTicket = await this.detEstadoTicketRepository.createQueryBuilder()
      .insert()
      .into( Detestadoticket )
      .values({
        estadoticketId: idestado,
        ticketId: idticket,
        fecha: formatFechaLarga(),
      })
      .returning(['*'])
      .execute();
    const ticketActualizado = await this.ticketRepository.findOne({
      where: { id: idticket },
      relations: [ 'estados', 'administrado', 'detEstados' ],
    });
    this.wsTicket.ws.emit( '[TICKET] NUEVO ESTADO', ticketActualizado );
    const ticketAEmitir = await this.wsTicket.getDetEstadoTicket();
    this.wsTicket.ws.emit( '[TICKET] DETESTADO', ticketAEmitir );
    return ticketActualizado;
  }

  async asignarVentanilla(
    idticket: number,
    idventanilla: number,
  ) {
    const ticket = await this.ticketRepository.findOne( {
      where: { id: idticket },
      relations: [ 'estados', 'administrado' ],
    });
    if ( !ticket ) throw new HttpException( `No existe el ticket con el id: ${ idticket }`, HttpStatus.NOT_FOUND );

    const ventanilla = await this.ventanillaRepository.findOne({ where: { idventanilla }});
    if ( !ventanilla ) throw new HttpException( `No existe la ventanilla con el id: ${ idventanilla }`, HttpStatus.NOT_FOUND );

    const llamandoEstado = await this.estadoRepository.findOne({ where: { id: 2 }});

    await this.ventanillaService.guardarNuevoEstado( idventanilla, 1 );

    ticket.estados = [ ...ticket.estados, llamandoEstado ];

    const actualizarTicket: Ticket = await this.ticketRepository.create({
      ...ticket,
      idventanilla,
    });

    await this.ticketRepository.save( actualizarTicket );

    await this.detEstadoTicketRepository.update({
      ticketId:  idticket,
      estadoticketId: 2,
    }, { fecha: formatFechaLarga()  });
    const ticketparaEmitir = await await this.ticketRepository.findOne( {
      where: { id: idticket },
      relations: [ 'administrado', 'detEstados' ],
    });
    const ticketAEmitir = await this.wsTicket.getDetEstadoTicket();
    this.wsTicket.ws.emit( '[TICKET] DETESTADO', ticketAEmitir );
    this.wsTicket.ws.emit( 'ventanillaAsignadaAlTicket', ticketparaEmitir );
    return actualizarTicket;
  }

  async derivarOtraVentanilla(
    idticket: number,
    idventanilla: number,
  ) {
    const ticket = await this.ticketRepository.findOne( { where: { id: idticket } });
    if ( !ticket ) throw new HttpException( `No existe el ticket con el id: ${ idticket }`, HttpStatus.NOT_FOUND );

    const ventanillaAntigua = ticket.idventanilla;

    const ventanilla = await this.ventanillaRepository.findOne({ where: { idventanilla }});
    if ( !ventanilla ) throw new HttpException( `No existe la ventanilla con el id: ${ idventanilla }`, HttpStatus.NOT_FOUND );

    const estadosTickets = await this.detEstadoTicketRepository.find( { where: { ticketId: idticket }});
    const borrarTickets = await this.detEstadoTicketRepository.remove( estadosTickets );

    const buscarEstados = await this.estadoRepository.find({ where: { id: In( [ 5, 1 ] ) }});

    /*const insertarEstados = await this.detEstadoTicketRepository.createQueryBuilder()
      .insert()
      .into( Detestadoticket )
      .values([
        { tbTicketId: idticket, tbEstadoticketId: buscarEstados[ 0 ].id, fecha: new Date() },
      ]).returning( ['*'] )
      .execute();*/

    await this.detEstadoTicketRepository.save(
      {
        ticketId: idticket, estadoticketId: buscarEstados[ 1 ].id,
        fecha: formatFechaLarga(),
      },
    );
    await this.detEstadoTicketRepository.save(
      {
        ticketId: idticket, estadoticketId: buscarEstados[ 0 ].id,
        fecha: formatFechaLarga(),
      },
    );

    await this.ticketRepository.update( idticket, {
      idventanilla,
    });
    const ticketaEmitir = await this.ticketRepository.findOne({
      where: { id: idticket }, relations: [ 'administrado', 'detEstados' ],
    });
    this.wsTicket.ws.emit( '[TICKET] DERIVADO', {
      ticketaEmitir,
      ventanillaAntigua,
    });
    const ticketAEmitir = await this.wsTicket.getDetEstadoTicket();
    this.wsTicket.ws.emit( '[TICKET] DETESTADO', ticketAEmitir );
    return ticketaEmitir;
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
    const ticket = await this.ticketRepository.findOne(
      {
        where: {
          idtipoticket,
          fechacorta,
        },
        select: ['correlativo'],
        order: { correlativo: 'DESC' },
      },
    );
    this.logger.log( ticket + ' CORRELATIVO' );
    let correlativo = !ticket ? 0 : ticket.correlativo++;
    correlativo++;
    return correlativo;
  }
}
