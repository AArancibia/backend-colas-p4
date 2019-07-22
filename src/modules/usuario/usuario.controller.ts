import { Controller, Get, Param } from '@nestjs/common';
import { UsuarioService } from './usuario.service';
import { ApiUseTags, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { UsuarioRO } from './usuario.dto';

@ApiUseTags('Usuario')
@Controller('usuario')
export class UsuarioController {

  constructor(
    private usuarioService: UsuarioService,
  ) {}

  @ApiOperation({
    title: 'Filtro Usuarios', description: 'Consulta para buscar Usuario por username',
  })
  @ApiResponse({ status: 200, description: 'Usuarios filtrados por username', isArray: true, type: UsuarioRO })
  @Get( ':nombreUsuario')
  filtroUsuarios(
    @Param( 'nombreUsuario' ) nombreUsuario: string,
  ) {
    return this.usuarioService.obtenerUsuariosPorNombre( nombreUsuario );
  }

  @ApiOperation({
    title: 'Listar Usuarios', description: 'Consulta para obtener los usuarios',
  })
  @ApiResponse({ status: 200, description: 'Lista de Usuarios', isArray: true, type: UsuarioRO })
  @Get()
  obtenerUsuarios() {
    return this.usuarioService.obtenerUsuarios();
  }

}
