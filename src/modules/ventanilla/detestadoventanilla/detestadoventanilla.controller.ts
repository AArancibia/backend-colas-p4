import { Controller, Get } from '@nestjs/common';
import { DetestadoventanillaService } from './detestadoventanilla.service';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';

@ApiTags('DetEstadoVentanilla')
@Controller('detestadoventanilla')
export class DetestadoventanillaController {
  constructor(
    private detEstadoVentanillaService: DetestadoventanillaService,
  ) {}

  @ApiOperation({
    summary: 'Ultimo Estado de Ventanillas',
    description: 'Servicion para listar los estados de las Ventanillas',
  })
  @ApiResponse({ status: 200, description: 'Listado de Estados de Ventanillas', isArray: true })
  @Get()
  ultimoDetEstadoVentanilla() {
    return this.detEstadoVentanillaService.ultimoDetEstadoVentanilla();
  }
}
