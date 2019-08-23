import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsuarioController } from './usuario.controller';
import { UsuarioService } from './usuario.service';
import { Usuario } from './usuario.entity';
import { VentanillaService } from '../ventanilla/ventanilla.service';
import { Ventanilla } from '../ventanilla/ventanilla.entity';
import { VentanillaModule } from '../ventanilla/ventanilla.module';
import { Estadoventanilla } from '../ventanilla/estadoventanilla/estadoventanilla.entity';
import { Detestadoventanilla } from '../ventanilla/detestadoventanilla/detestadoventanilla.entity';
import { VentanillaGateway } from 'src/gateways/ventanilla.gateway';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      Usuario,
      Ventanilla,
      Estadoventanilla,
      Detestadoventanilla,
    ]),
  ],
  controllers: [UsuarioController],
  providers: [UsuarioService, VentanillaService, VentanillaGateway],
})
export class UsuarioModule {}
