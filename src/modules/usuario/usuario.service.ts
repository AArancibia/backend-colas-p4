import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Usuario } from './usuario.entity';
import { Like, Repository } from 'typeorm';
import { UsuarioRO } from './usuario.dto';

@Injectable()
export class UsuarioService {

  constructor(
    @InjectRepository( Usuario ) private usuarioRepository: Repository< Usuario >,
  ) {}

  async obtenerUsuariosPorNombre(
    nombreUsuario: string,
  ): Promise< UsuarioRO[] > {
    const usuarios = await this.usuarioRepository.find({
      where: {
        username: Like( `%${ nombreUsuario }%` ),
      },
    });
    return usuarios;
  }

  async obtenerUsuarios(): Promise< UsuarioRO[] > {
    const usuarios = await this.usuarioRepository.find();
    return usuarios;
  }

}
