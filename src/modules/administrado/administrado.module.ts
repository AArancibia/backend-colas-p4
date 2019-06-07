import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AdministradoController } from './administrado.controller';
import { AdministradoService } from './administrado.service';
import { TipodocModule } from './tipodoc/tipodoc.module';
import { DettipodocadmiModule } from './dettipodocadmi/dettipodocadmi.module';
import { Administrado } from './administrado.entity';
import { ContribuyenteModule } from '../rentas/contribuyente/contribuyente.module';
import { ContribuyenteService } from '../rentas/contribuyente/contribuyente.service';

@Module({
  controllers: [ AdministradoController ],
  providers: [ AdministradoService, ContribuyenteService ],
  imports: [
    TypeOrmModule.forFeature( [ Administrado ] ),
    TipodocModule,
    DettipodocadmiModule,
  ],
})
export class AdministradoModule {}
