import { Module } from '@nestjs/common';
import { DettipodocadmiController } from './dettipodocadmi.controller';
import { DettipodocadmiService } from './dettipodocadmi.service';

@Module({
  controllers: [DettipodocadmiController],
  providers: [DettipodocadmiService]
})
export class DettipodocadmiModule {}
