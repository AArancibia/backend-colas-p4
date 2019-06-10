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

@WebSocketGateway( 8081, {
  namespace: 'ticket',
})
export class TicketGateway {
  logger = new Logger( 'WebSocketsTicket' );
  @WebSocketServer()
  ws: any;
  constructor(
    @InjectRepository( Ticket ) private ticketRepository: Repository< Ticket >,
  ) {}

  @SubscribeMessage( '[TICKET] Lista' )
  async listarTickets( client, data ): Promise< any > { //WsResponse< TicketRO >
    const tickets = await this.ticketRepository.find({
      relations: [ 'estados', 'administrado' ],
    });
    return tickets;
  }
}
