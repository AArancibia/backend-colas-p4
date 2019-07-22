import { Body, Controller, Get, Param, Post, Put } from '@nestjs/common';
import { TicketService } from './ticket.service';
import { Ticket } from './ticket.entity';
import { TicketDto, TicketRO } from './ticket.dto';
import { ApiUseTags, ApiResponse, ApiOperation } from '@nestjs/swagger';

@ApiUseTags('Ticket')
@Controller('ticket')
export class TicketController {
  constructor(
    private ticketService: TicketService,
  ) {

  }

  @ApiOperation({
    title: 'Listar Tickets', description: 'Consulta para listar tickets de día actual',
  })
  @ApiResponse({ status: 200, description: 'Lista de Tickets', isArray: true, type: TicketRO })
  @Get()
  async obtenerTickets() {
    return this.ticketService.getTickets();
  }

  @ApiOperation({
    title: 'Crear Ticket', description: 'Consulta para crear nuevo Ticket',
  })
  @ApiResponse({ status: 201, description: 'Crear Ticket', isArray: false })
  @Post()
  async crearTicket(
    @Body() ticket: TicketDto,
  ) {
    return this.ticketService.crearTicket( ticket );
  }

  @ApiOperation({
    title: 'Asignar Ventanilla', description: 'Asignación de Ticket a Ventanilla',
  })
  @ApiResponse({ status: 200, description: '', isArray: false })
  @Put(':idticket/asignar/:idventanilla')
  async asignarVentanilla(
    @Param('idticket') idticket: number,
    @Param('idventanilla') idventanilla: number,
  ) {
    return this.ticketService.asignarVentanilla( idticket, idventanilla );
  }

  @ApiResponse({ status: 200, description: 'Asignar Urgente a Ticket', isArray: false })
  @Put( ':id/urgente' )
  async ticketUrgente(
    @Param( 'id' ) idticket: number
  ) {
    return this.ticketService.ticketUrgente( idticket );
  }

  @ApiResponse({ status: 201, description: 'Guardar Nuevo Estado a Ticket', isArray: false })
  @Post( ':idticket/estado/:idestado' )
  guardarNuevoEstado(
    @Param( 'idticket' ) idticket: number,
    @Param( 'idestado' ) idestado: number,
  ) {
    return this.ticketService.guardarNuevoEstado( idticket, idestado );
  }

  @ApiResponse({ status: 200, description: 'Derivar Ticket', isArray: true })
  @Post( ':idticket/derivar/:idventanilla' )
  derivarOtraVentanilla(
    @Param( 'idticket' ) idticket: number,
    @Param( 'idventanilla' ) idventanilla: number,
  ) {
    return this.ticketService.derivarOtraVentanilla( idticket, idventanilla );
  }

  @ApiResponse({ status: 200, description: 'Actualizar temática o trámite a Ticket', isArray: false })
  @Put(':idticket/tematica/tramite')
  guardarTramiteEnTicket(
    @Param( 'idticket' ) idticket: number,
    @Body() actualizarTematicaTramite: any,
  ) {
    return this.ticketService.actualizarTematicaOrTramite( idticket, actualizarTematicaTramite );
  }

}
