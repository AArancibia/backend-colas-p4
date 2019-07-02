import { Module } from '@nestjs/common';
import { DetestadoventanillaController } from './detestadoventanilla.controller';
import { DetestadoventanillaService } from './detestadoventanilla.service';

@Module({
  controllers: [DetestadoventanillaController],
  providers: [DetestadoventanillaService ],
  imports: [],
})
export class DetestadoventanillaModule {}
