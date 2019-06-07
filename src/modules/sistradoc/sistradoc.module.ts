import { Module } from '@nestjs/common';
import { SistradocController } from './sistradoc.controller';
import { SistradocService } from './sistradoc.service';

@Module({
  controllers: [SistradocController],
  providers: [SistradocService],
})
export class SistradocModule {}
