import { Controller, Get } from '@nestjs/common';
import { DetestadoventanillaService } from './detestadoventanilla.service';

@Controller('detestadoventanilla')
export class DetestadoventanillaController {
  constructor(
    private detEstadoVentanillaService: DetestadoventanillaService,
  ) {}

  @Get()
  ultimoDetEstadoVentanilla() {
    return this.detEstadoVentanillaService.ultimoDetEstadoVentanilla();
  }
}
