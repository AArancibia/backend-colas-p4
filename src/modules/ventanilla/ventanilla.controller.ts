import { Body, Controller, Get, Param, Post, Put } from '@nestjs/common';
import { VentanillaService } from './ventanilla.service';
import { VentanillaDTO } from './ventanilla.dto';

@Controller('ventanilla')
export class VentanillaController {
  constructor(
    private ventanillaService: VentanillaService,
  ) {
  }

  @Get()
  obtenerVentanillas() {
    return this.ventanillaService.obtenerVentanillas();
  }

  @Get( 'usuario/:idusuario')
  obtenerVentanillaporIdPersonal(
    @Param( 'idusuario') idusuario: number,
  ) {
    return this.ventanillaService.obtenerVentanillaporIdUsuario( idusuario );
  }

  @Get(':id/ultimoestado')//:id/
  ventanillaUltimoEstadoPorId(
    @Param( 'id' ) id: number,
  ) {
    return this.ventanillaService.ultimoEstadoVentanilla( id );
  }

  @Get('ultimoestado')//:id/
  ventanillaUltimoEstado(

  ) {
    return this.ventanillaService.ultimoEstadoVentanillas();
  }

  @Put(':id/usuario/:idusuario')//:id/
  asignarUsuarioAVentanilla(
    @Param( 'id' ) idventanilla: number,
    @Param( 'idusuario' ) idusuario: number,
  ) {
    return this.ventanillaService.usuarioAVentanilla( idventanilla, idusuario );
  }

  @Get('vista')
  ventanillaUltimoEstadoView() {
    return this.ventanillaService.viewVentanillaEstado();
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
