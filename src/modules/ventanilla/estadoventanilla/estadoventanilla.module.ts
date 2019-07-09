import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { EstadoventanillaController } from './estadoventanilla.controller';
import { EstadoventanillaService } from './estadoventanilla.service';
import { Estadoventanilla } from './estadoventanilla.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature( [ Estadoventanilla ] ),
  ],
  controllers: [EstadoventanillaController],
  providers: [EstadoventanillaService],
})
export class EstadoventanillaModule {}
