import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TematicaEntity } from './tematica.entity';
import { TematicaService } from './tematica.service';
import { TematicaController } from './tematica.controller';

@Module({
  imports: [
    TypeOrmModule.forFeature([TematicaEntity]),
  ],
  controllers: [TematicaController],
  providers: [
    TematicaService,
  ],
})
export class TematicaModule {}
