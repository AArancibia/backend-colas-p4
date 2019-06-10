import {
  OnGatewayConnection,
  OnGatewayDisconnect,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer, WsResponse,
} from '@nestjs/websockets';
import { Logger, Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { formatFechaCorta, formatFechaLarga } from '../shared/utils';
import { Ticket } from '../modules/ticket/ticket.entity';
import { Detestadoticket } from '../modules/ticket/detestadoticket/detestadoticket.entity';

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

  @SubscribeMessage( '[TICKET] Lista' )
  async listarTickets( client, data ): Promise< any > { //WsResponse< TicketRO >
    const tickets = await this.ticketRepository.find({
      relations: [ 'estados', 'administrado' ],
      where: {
        fechacorta: formatFechaCorta(),
      },
    });
    return tickets;
  }

  @SubscribeMessage( '[TICKET] DETESTADO' )
  async getDetEstadoTicket() {
    const qb = await this.detestadoRepository.createQueryBuilder("t1");
    const detTickets = qb
      .innerJoinAndSelect( 't1.ticket' , 'tb_ticket')
      .where(
        sq => {
          const subQuery = qb.subQuery()
            .select('max( fecha )')
            .from( Detestadoticket, 't2' )
            .where( 't1.tbTicketId = t2.tbTicketId' )
            .getQuery();
          return 't1.fecha = ' + subQuery;
        },
      )
      .getMany();
    return detTickets;
  }
}
