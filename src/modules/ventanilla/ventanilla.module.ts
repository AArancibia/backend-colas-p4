import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { VentanillaController } from './ventanilla.controller';
import { VentanillaService } from './ventanilla.service';
import { EstadoventanillaModule } from './estadoventanilla/estadoventanilla.module';
import { DetestadoventanillaModule } from './detestadoventanilla/detestadoventanilla.module';
import { Ventanilla } from './ventanilla.entity';
import { Estadoventanilla } from './estadoventanilla/estadoventanilla.entity';
import { Detestadoventanilla } from './detestadoventanilla/detestadoventanilla.entity';

@Module({
  controllers: [VentanillaController],
  providers: [VentanillaService],
  imports: [
    TypeOrmModule.forFeature( [ Ventanilla, Estadoventanilla, Detestadoventanilla ] ),
    EstadoventanillaModule,
    DetestadoventanillaModule,
  ],
})
export class VentanillaModule {}
