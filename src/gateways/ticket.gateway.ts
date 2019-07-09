import {
  OnGatewayConnection,
  OnGatewayDisconnect,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer, WsResponse,
} from '@nestjs/websockets';
import { Logger, Injectable } from '@nestjs/common';
import { In, Not, Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { formatFechaCorta, formatFechaLarga } from '../shared/utils';
import { Ticket } from '../modules/ticket/ticket.entity';
import { Detestadoticket } from '../modules/ticket/detestadoticket/detestadoticket.entity';
import * as momenttz from 'moment-timezone';
import * as moment from 'moment';

@WebSocketGateway( 8081, {
  namespace: 'ticket',
})
export class TicketGateway {
  logger = new Logger( 'WebSocketsTicket' );
  @WebSocketServer()
  ws: any;
  constructor(
    @InjectRepository( Ticket ) private ticketRepository: Repository< Ticket >,
    @InjectRepository( Detestadoticket ) private detestadoRepository: Repository< Detestadoticket >,
  ) {}

  private toReponseObject( ticket: Ticket ) {
    for ( let i = 0; i <= ticket.estadosIds.length; i++ ) {
      const estado = ticket.estadosIds[ i ];
      this.logger.log( estado );
      if ( estado == 4 ) {
        this.logger.log( 'hay 4');
        return;
      }
    }
    return ticket;
  }

  @SubscribeMessage( '[TICKET] Lista' )
  async listarTickets( client, data ): Promise< any > { //WsResponse< TicketRO >
    const tickets = await this.ticketRepository.find({
      relations: [ 'estados', 'administrado', 'detEstados', 'tipoTicket' ],
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

  @SubscribeMessage( '[TICKET] DETESTADO' )
  async getDetEstadoTicket() {
    const fecha2 = moment( formatFechaCorta() ).add('days', 1).format('YYYY-MM-DD');
    const qb = await this.detestadoRepository.createQueryBuilder('t1');
    const detTickets = qb
      .innerJoinAndSelect( 't1.ticket', 'ticket' )  // Ticket , 'ticket', 'ticket.id = t1.ticketId'
      .where(
        sq => {
          const subQuery = qb.subQuery()
            .select('max( fecha )')
            .from( Detestadoticket, 't2' )
            .where( 't1.ticketId = t2.ticketId' )
            .getQuery();
          return 't1.fecha = ' + subQuery;
        },
      )
      .andWhere(
        ' t1.fecha between :fec1 and :fec2 ',
        {
          fec1: `${ formatFechaCorta() } ` + '00:00:00',
          fec2: `${ fecha2 } ` + '00:00:00',
        },
      )
      .getMany();
    return detTickets;
  }
}
