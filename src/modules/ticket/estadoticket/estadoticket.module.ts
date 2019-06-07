import { Module } from '@nestjs/common';
import { EstadoticketController } from './estadoticket.controller';
import { EstadoticketService } from './estadoticket.service';

@Module({
  controllers: [EstadoticketController],
  providers: [EstadoticketService]
})
export class EstadoticketModule {}
