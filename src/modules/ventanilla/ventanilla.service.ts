import { HttpException, HttpStatus, Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Ventanilla } from './ventanilla.entity';
import { Repository } from 'typeorm';
import { Estadoventanilla } from './estadoventanilla/estadoventanilla.entity';
import { VentanillaDTO } from './ventanilla.dto';
import { Detestadoventanilla } from './detestadoventanilla/detestadoventanilla.entity';
import { formatFechaCorta, formatFechaLarga } from '../../shared/utils';
import { VentanillaGateway } from '../../gateways/ventanilla.gateway';

@Injectable()
export class VentanillaService {
  private logger = new Logger( 'VentanillaService' );
  constructor(
    @InjectRepository( Ventanilla ) private ventanillaRepository: Repository< Ventanilla >,
    @InjectRepository( Estadoventanilla ) private estadoVentanillaRepository: Repository< Estadoventanilla >,
    @InjectRepository( Detestadoventanilla ) private detEstadoVentanillaRepository: Repository< Detestadoventanilla >,
    private ventanillaGateway: VentanillaGateway,
  ) {}

  async obtenerVentanillas() {
    const ventanillas = await this.ventanillaGateway.obtenerVentanillas();
    return ventanillas;
  }

  async obtenerVentanillaporIdUsuario(
    idusuario: number,
  ) {
    const ventanillas = await this.ventanillaRepository.findOne({
      where: {
        idusuario,
      },
    });
    return ventanillas;
  }

  async guardarVentanilla( ventanilla: VentanillaDTO ) {
    const estadoVentanilla = await this.estadoVentanillaRepository.findOne( { where: { id: 1 } });
    const nuevaVentanilla: Ventanilla = await this.ventanillaRepository.create( ventanilla );

    nuevaVentanilla.estados = [ estadoVentanilla ];
    await this.ventanillaRepository.save( nuevaVentanilla );

    await this.detEstadoVentanillaRepository.update(
      {
        tbVentanillaId: nuevaVentanilla.id,
        tbEstadoventanillaId: 1,
      }, {
        fecha: formatFechaLarga(),
      },
    );
    return nuevaVentanilla;
  }

  async guardarNuevoEstado(
    idventanilla: number,
    idestado: number,
  ) {
    const estadoVentanilla = await this.estadoVentanillaRepository.findOne( { where: { id: idestado } });
    if ( !estadoVentanilla) throw new HttpException( `No existe la Estado Ventanilla con el id: ${ idestado }`, HttpStatus.NOT_FOUND );

    const ventanilla = await this.ventanillaRepository.findOne({ where: { id: idventanilla } });
    if ( !ventanilla ) throw new HttpException( `No existe la ventanilla con el id: ${ idventanilla }`, HttpStatus.NOT_FOUND );

    const guardarDetEstadoVentanilla = await this.detEstadoVentanillaRepository.createQueryBuilder()
      .insert()
      .into( Detestadoventanilla )
      .values({
        tbEstadoventanillaId: idestado,
        tbVentanillaId: idventanilla,
        fecha: formatFechaLarga(),
      })
      .returning(['*'])
      .execute();

    const detEstadoVentanilla = await this.ventanillaGateway.ultimoEstadoVentanilla( );
    this.ventanillaGateway.wsVentanilla.emit( '[VENTANILLA] ULTIMOESTADO', detEstadoVentanilla);

    return guardarDetEstadoVentanilla.identifiers[ 0 ];
  }

  async ultimoEstadoVentanilla(
    idventanilla?,
  ) {
    let ultimoEstado: any[] = await this.ventanillaGateway.ultimoEstadoVentanilla( );
    for (let i = 0; i < ultimoEstado.length; i++ ) {
      this.logger.log( ultimoEstado[ i ].tbVentanillaId + '  ' + idventanilla );
      if ( ultimoEstado[ i ].tbVentanillaId == idventanilla ) {
        return ultimoEstado[ i ];
      }
    }
    return null;
  }

  async ultimoEstadoVentanillas() {
    const ultimoEstado = await this.ventanillaGateway.ultimoEstadoVentanilla();
    return ultimoEstado;
  }

}
