import { Module } from '@nestjs/common';
import { EstadoventanillaController } from './estadoventanilla.controller';
import { EstadoventanillaService } from './estadoventanilla.service';

@Module({
  controllers: [EstadoventanillaController],
  providers: [EstadoventanillaService]
})
export class EstadoventanillaModule {}
