import { Body, Controller, Get, Post } from '@nestjs/common';
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

}
