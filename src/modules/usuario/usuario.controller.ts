import { Controller, Get, Param, Post, Body, HttpCode } from '@nestjs/common';
import { UsuarioService } from './usuario.service';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { UsuarioRO, UsuarioDTO } from './usuario.dto';
import { VentanillaService } from '../ventanilla/ventanilla.service';

@ApiTags('Usuario')
@Controller('usuario')
export class UsuarioController {
  constructor(
    private usuarioService: UsuarioService,
    private ventanillaService: VentanillaService,
  ) {}

  @Post('registrar')
  crearUsuario(@Body() auth: UsuarioDTO) {
    return this.usuarioService.registrar(auth);
  }

  @HttpCode(200)
  @Post('login')
  async login(@Body() auth: UsuarioDTO) {
    const usuario: any = await this.usuarioService.login(auth);
    const ventanilla = await this.ventanillaService.obtenerVentanillaporIdUsuario(
      usuario.idusuario,
    );
    usuario.ventanilla = ventanilla;
    return usuario;
  }

  @ApiOperation({
    summary: 'Filtro Usuarios',
    description: 'Consulta para buscar Usuario por username',
  })
  @ApiResponse({
    status: 200,
    description: 'Usuarios filtrados por username',
    isArray: true,
    type: UsuarioRO,
  })
  @Get(':nombreUsuario')
  filtroUsuarios(@Param('nombreUsuario') nombreUsuario: string) {
    return this.usuarioService.obtenerUsuariosPorNombre(nombreUsuario);
  }

  @ApiOperation({
    summary: 'Listar Usuarios',
    description: 'Consulta para obtener los usuarios',
  })
  @ApiResponse({
    status: 200,
    description: 'Lista de Usuarios',
    isArray: true,
    type: UsuarioRO,
  })
  @Get()
  obtenerUsuarios() {
    return this.usuarioService.obtenerUsuarios();
  }
}
