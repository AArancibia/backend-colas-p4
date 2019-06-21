import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { VentanillaService } from './ventanilla.service';
import { VentanillaDTO } from './ventanilla.dto';

@Controller('ventanilla')
export class VentanillaController {
  constructor(
    private ventanillaService: VentanillaService,
  ) {}

  @Get()
  obtenerVentanillas() {
    return this.ventanillaService.obtenerVentanillas();
  }

  @Get(':id/ultimoestado')
  ventanillaUltimoEstado(
    @Param( 'id' ) id: number,
  ) {
    return this.ventanillaService.ultimoEstadoVentanilla( id );
  }

  @Post(':id/estado/:idestado')
  async guardarEstadoVentanilla(
    @Param('id') id: number,
    @Param('idestado') idestado: number,
  ) {
    return this.ventanillaService.guardarNuevoEstado( id, idestado );
  }

  @Post()
  guardarVentanilla(
    @Body() ventanilla: VentanillaDTO,
  ) {
    return this.ventanillaService.guardarVentanilla( ventanilla );
  }
}
