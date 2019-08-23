import { Body, Controller, Get, Param, Post, Put } from '@nestjs/common';
import { VentanillaService } from './ventanilla.service';
import { VentanillaDTO } from './ventanilla.dto';
import { ApiUseTags, ApiOperation, ApiResponse } from '@nestjs/swagger';

@ApiUseTags('Ventanilla')
@Controller('ventanilla')
export class VentanillaController {
  constructor(
    private ventanillaService: VentanillaService,
  ) {
  }

  @ApiOperation({
    title: 'Listar Ventanilla',
    description: 'Servicion para listar todas las ventanillas',
  })
  @ApiResponse({ status: 200, description: 'Nueva Ventanilla creada', isArray: false })
  @Get()
  obtenerVentanillas() {
    return this.ventanillaService.obtenerVentanillas();
  }

  @ApiOperation({
    title: 'Obtener Ventanilla por IdUsuario',
    description: 'Servicio para obtener ventanilla por IdUsuario',
  })
  @ApiResponse({ status: 200, description: 'Ventanilla por IdUsuario', isArray: false })
  @Get( 'usuario/:idusuario')
  obtenerVentanillaporIdPersonal(
    @Param( 'idusuario') idusuario: number,
  ) {
    return this.ventanillaService.obtenerVentanillaporIdUsuario( idusuario );
  }

  @ApiOperation({
    title: 'Ultimo Estado de Ventanilla',
    description: 'Servicion para obtener los estados de una Ventanilla',
  })
  @ApiResponse({ status: 200, description: 'Filtro de Ventanilla', isArray: false })
  @Get(':id/ultimoestado')//:id/
  ventanillaUltimoEstadoPorId(
    @Param( 'id' ) id: number,
  ) {
    return this.ventanillaService.ultimoEstadoVentanilla( id );
  }

  @ApiOperation({
    title: 'Ultimo Estado de Ventanillas',
    description: 'Servicion para listar los estados de las Ventanillas',
  })
  @ApiResponse({ status: 200, description: 'Listado de Estados de Ventanillas', isArray: true })
  @Get('ultimoestado')//:id/
  ventanillaUltimoEstado(

  ) {
    return this.ventanillaService.ultimoEstadoVentanillas();
  }

  @ApiOperation({
    title: 'Ultimo Estado de Ventanillas',
    description: 'Servicion para listar los estados de las Ventanillas',
  })
  @ApiResponse({ status: 200, description: 'Listado de Estados de Ventanillas', isArray: true })
  @Get('vista')
  ventanillaUltimoEstadoView() {
    return this.ventanillaService.viewVentanillaEstado();
  }

  @ApiOperation({
    title: 'Asignar Usuario a Ventanilla',
    description: 'Servicion para asignar un usuario a Ventanilla',
  })
  @ApiResponse({ status: 200, description: 'Usuario asignado a Ventanilla', isArray: false })
  @Put(':id/usuario/:idusuario')//:id/
  asignarUsuarioAVentanilla(
    @Param( 'id' ) idventanilla: number,
    @Param( 'idusuario' ) idusuario: number,
  ) {
    return this.ventanillaService.usuarioAVentanilla( idventanilla, idusuario );
  }

  @ApiOperation({
    title: 'Tipo Atencion a Ventanilla',
    description: 'Servicion para actualizar tipo de atencion a Ventanilla',
  })
  @ApiResponse({ status: 200, description: 'Tipo de Atencion Editado', isArray: false })
  @Put( ':id/:tipo' )
  async editarTipoAtencion(
    @Param( 'id' ) id: number,
    @Param( 'tipo' ) tipo: string,
  ) {
    return this.ventanillaService.editarTipoAtencion( id, tipo );
  }

  @ApiOperation({
    title: 'Guardar Estado de Ventanilla',
    description: 'Servicion para guardar nuevo estado de Ventanilla',
  })
  @ApiResponse({ status: 200, description: 'Nuevo Estado en Ventanilla', isArray: false })
  @Post(':id/estado/:idestado')
  async guardarEstadoVentanilla(
    @Param('id') id: number,
    @Param('idestado') idestado: number,
  ) {
    return this.ventanillaService.guardarNuevoEstado( id, idestado );
  }

  @ApiOperation({
    title: 'Guardar Ventanilla',
    description: 'Servicion para guardar una nueva ventanilla',
  })
  @ApiResponse({ status: 200, description: 'Nueva Ventanilla creada', isArray: false })
  @Post()
  guardarVentanilla(
    @Body() ventanilla: VentanillaDTO,
  ) {
    return this.ventanillaService.guardarVentanilla( ventanilla );
  }
}
