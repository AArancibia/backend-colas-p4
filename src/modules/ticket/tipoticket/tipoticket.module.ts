import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TipoticketController } from './tipoticket.controller';
import { TipoticketService } from './tipoticket.service';
import { Tipoticket } from './tipoticket.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature( [ Tipoticket ] ),
  ],
  controllers: [TipoticketController],
  providers: [TipoticketService],
})
export class TipoticketModule {}
