import { Controller, Get } from '@nestjs/common';
import { DetestadoticketService } from './detestadoticket.service';
import { ApiUseTags, ApiOperation, ApiResponse } from '@nestjs/swagger';

@ApiUseTags('DetEstadoTicket')
@Controller('detestadoticket')
export class DetestadoticketController {
  constructor(
    private detEstadoService: DetestadoticketService,
  ) {}

  @ApiOperation({
    title: 'Obtener Detalle de Estados de Ticket',
    description: 'Los estados que tiene cada Ticket',
  })
  @ApiResponse({ status: 200, description: 'Lista de ticket con sus estado', isArray: true })
  @Get()
  getDetalleEstadosTickets() {
    return this.detEstadoService.getDetEstadoTicket();
  }

}
