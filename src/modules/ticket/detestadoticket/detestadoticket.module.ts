import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DetestadoticketController } from './detestadoticket.controller';
import { DetestadoticketService } from './detestadoticket.service';
import { Detestadoticket } from './detestadoticket.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature( [ Detestadoticket ] ),
  ],
  controllers: [DetestadoticketController],
  providers: [DetestadoticketService]
})
export class DetestadoticketModule {}
