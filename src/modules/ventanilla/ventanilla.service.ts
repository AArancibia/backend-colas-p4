import { Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Ventanilla } from './ventanilla.entity';
import { Repository } from 'typeorm';
import { Estadoventanilla } from './estadoventanilla/estadoventanilla.entity';
import { VentanillaDTO } from './ventanilla.dto';

@Injectable()
export class VentanillaService {
  private logger = new Logger( 'Ventanilla' );
  constructor(
    @InjectRepository( Ventanilla ) private ventanillaRepository: Repository< Ventanilla >,
    @InjectRepository( Estadoventanilla ) private estadoVentanillaRepository: Repository< Estadoventanilla >,
  ) {}

  async guardarVentanilla( ventanilla: VentanillaDTO ) {
    const estadoVentanilla = await this.estadoVentanillaRepository.findOne( { where: { id: 1 } });
    const nuevaVentanilla: Ventanilla = await this.ventanillaRepository.create( ventanilla );
    nuevaVentanilla.estados = [ estadoVentanilla ];
    await this.ventanillaRepository.save( nuevaVentanilla );
    return nuevaVentanilla;
  }
}
