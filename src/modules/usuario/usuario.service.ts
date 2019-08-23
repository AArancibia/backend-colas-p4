import { Injectable, HttpException, HttpStatus, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

import { Like, Repository } from 'typeorm';
import * as bcrypt from 'bcryptjs';

import { Usuario } from './usuario.entity';
import { UsuarioRO, UsuarioDTO } from './usuario.dto';
import { VentanillaService } from '../ventanilla/ventanilla.service';

@Injectable()
export class UsuarioService {
  private logger = new Logger('UsuarioService');
  constructor(
    @InjectRepository(Usuario) private usuarioRepository: Repository<Usuario>,
  ) {}

  async obtenerUsuariosPorNombre(nombreUsuario: string): Promise<UsuarioRO[]> {
    const usuarios = await this.usuarioRepository.find({
      where: {
        username: Like(`%${nombreUsuario}%`),
      },
    });
    return usuarios;
  }

  async obtenerUsuarios(): Promise<UsuarioRO[]> {
    const usuarios = await this.usuarioRepository.find();
    return usuarios;
  }

  async registrar(auth: UsuarioDTO): Promise<UsuarioRO> {
    const { username } = auth;
    let usuario = await this.usuarioRepository.findOne({ username });
    if (usuario)
      throw new HttpException(
        `El usuario ya se encuentra en la base de datos`,
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    const nuevoUsuario = await this.usuarioRepository.create({
      ...auth,
    });
    await this.usuarioRepository.save(nuevoUsuario);
    return nuevoUsuario.toResponseObject(false);
  }

  async login({ username, password }: UsuarioDTO): Promise<UsuarioRO> {
    const usuario = await this.usuarioRepository.findOne({ username });
    if (!usuario)
      throw new HttpException(
        `El usuario no se encuentra en la base de datos`,
        HttpStatus.NOT_FOUND,
      );
    if (!(await bcrypt.compare(password, usuario.password))) {
      throw new HttpException(
        `La constraseña es incorrecta`,
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
    return usuario.toResponseObject(true);
  }
}
