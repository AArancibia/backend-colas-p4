import { Body, Controller, Get, Logger, Param, Post } from '@nestjs/common';
import { ApiUseTags, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { ContribuyenteService } from './contribuyente.service';

@Controller('rentas')
@ApiUseTags( 'Rentas' )
export class ContribuyenteController {
  private logger = new Logger( 'ContribuyenteController' );
  constructor(
    private contribuyenteService: ContribuyenteService,
  ) {}

  @ApiOperation({
    title: 'Obtener contribuyente',
    description: 'Servicion para obtener contribuyente en Reniec',
  })
  @ApiResponse({ status: 200, description: 'Datos de Contribuyente', isArray: false })
  @Post('contribuyente')
  async getContribuyenteByDni(
    @Body() data: any,
  ) {
    const contribuyente: any = await this.contribuyenteService.getContribuyenteByDniReniec( data );
    return contribuyente;
  }
}
