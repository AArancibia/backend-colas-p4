import { Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Ticket } from './ticket.entity';
import { Estado } from './estadoticket/estadoticket.entity';
import { Repository } from 'typeorm';
import { TicketDto } from './ticket.dto';
import { Tipoticket } from './tipoticket/tipoticket.entity';
import { formatFechaCorta } from '../../shared/utils';
import { Administrado } from '../administrado/administrado.entity';

@Injectable()
export class TicketService {
  private logger = new Logger( 'TicketService' );
  constructor(
    @InjectRepository( Ticket ) private ticketRepository: Repository< Ticket >,
    @InjectRepository( Estado ) private estadoRepository: Repository< Estado >,
    @InjectRepository( Tipoticket ) private tipoTicketRepository: Repository< Tipoticket >,
    @InjectRepository( Administrado ) private administradoRepository: Repository< Administrado >,
  ) {}

  async getTickets() {
    const tickets = await this.ticketRepository.find({
      relations: [ 'estados', 'administrado' ],
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
    this.logger.log( 'paso abr');
    const correlativo = await this.obtenerCorrelativo( idtipoticket, formatFechaCorta() );
    this.logger.log( 'paso correlativo');
    nuevoTicket.correlativo = correlativo;
    nuevoTicket.codigo = `${ preferencial ? 'P' : '' }${ abrTicket }-${ correlativo }`;
    this.logger.log( nuevoTicket );
    await this.ticketRepository.save( nuevoTicket );
    return nuevoTicket;
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
