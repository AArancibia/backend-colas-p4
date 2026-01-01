import { Module } from '@nestjs/common';
import { TipodocController } from './tipodoc.controller';
import { TipodocService } from './tipodoc.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Tipodoc } from './tipodoc.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature( [ Tipodoc ] ),
  ],
  controllers: [TipodocController],
  providers: [TipodocService],
})
export class TipodocModule {}
