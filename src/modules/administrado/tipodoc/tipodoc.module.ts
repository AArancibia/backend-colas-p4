import { Module } from '@nestjs/common';
import { TipodocController } from './tipodoc.controller';
import { TipodocService } from './tipodoc.service';

@Module({
  controllers: [TipodocController],
  providers: [TipodocService]
})
export class TipodocModule {}
