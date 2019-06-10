import { Body, Controller, Get, Param, Post, Put } from '@nestjs/common';
import { TicketService } from './ticket.service';
import { Ticket } from './ticket.entity';
import { TicketDto } from './ticket.dto';

@Controller('ticket')
export class TicketController {
  constructor(
    private ticketService: TicketService,
  ) {

  }

  @Get()
  async obtenerTickets() {
    return this.ticketService.getTickets();
  }

  @Post()
  async crearTicket(
    @Body() ticket: TicketDto,
  ) {
    return this.ticketService.crearTicket( ticket );
  }

  @Put(':idticket/asignar/:idventanilla')
  async asignarVentanilla(
    @Param('idticket') idticket: number,
    @Param('idventanilla') idventanilla: number,
  ) {
    return this.ticketService.asignarVentanilla( idticket, idventanilla );
  }

  @Post( ':idticket/estado/:idestado' )
  guardarNuevoEstado(
    @Param( 'idticket' ) idticket: number,
    @Param( 'idestado' ) idestado: number,
  ) {
    return this.ticketService.guardarNuevoEstado( idticket, idestado );
  }

  @Post( ':idticket/derivar/:idventanilla' )
  derivarOtraVentanilla(
    @Param( 'idticket' ) idticket: number,
    @Param( 'idventanilla' ) idventanilla: number,
  ) {
    return this.ticketService.derivarOtraVentanilla( idticket, idventanilla );
  }

}
