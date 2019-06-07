import { Module } from '@nestjs/common';
import { ContribuyenteController } from './contribuyente.controller';
import { ContribuyenteService } from './contribuyente.service';

@Module({
  imports: [],
  controllers: [ContribuyenteController],
  providers: [ ContribuyenteService ],
})
export class ContribuyenteModule {}
