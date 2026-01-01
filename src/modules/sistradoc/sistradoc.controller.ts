import { Controller, Get } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { SistradocService } from './sistradoc.service';

@Controller('sistradoc')
@ApiTags('Sistradoc')
export class SistradocController {
  constructor(
    private sistradocService: SistradocService,
  ) {}

  @ApiOperation({
    summary: 'Obtener Areas ( Centro de Costos )',
    description: 'Servicion para listar los areas de la Municipalidad',
  })
  @ApiResponse({ status: 200, description: 'Listado de Areas', isArray: true })
  @Get( 'areas' )
  async getAreas() {
    const areas = await this.sistradocService.getAreas();
    return areas;
  }
}
