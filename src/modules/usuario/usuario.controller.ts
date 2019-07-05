import { Controller, Get, Param } from '@nestjs/common';
import { UsuarioService } from './usuario.service';

@Controller('usuario')
export class UsuarioController {

  constructor(
    private usuarioService: UsuarioService,
  ) {}

  @Get( ':nombreUsuario')
  filtroUsuarios(
    @Param( 'nombreUsuario' ) nombreUsuario: string,
  ) {
    return this.usuarioService.obtenerUsuariosPorNombre( nombreUsuario );
  }

  @Get()
  obtenerUsuarios() {
    return this.usuarioService.obtenerUsuarios();
  }

}
