import { Controller, Get } from '@nestjs/common';
import { DetestadoticketService } from './detestadoticket.service';
import { ApiUseTags } from '@nestjs/swagger';

@ApiUseTags('DetEstadoTicket')
@Controller('detestadoticket')
export class DetestadoticketController {
  constructor(
    private detEstadoService: DetestadoticketService,
  ) {}

  @Get()
  getDetalleEstadosTickets() {
    return this.detEstadoService.getDetEstadoTicket();
  }

}
