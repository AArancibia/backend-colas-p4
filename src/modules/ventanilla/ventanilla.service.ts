import { HttpException, HttpStatus, Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Ventanilla } from './ventanilla.entity';
import { Repository } from 'typeorm';
import { Estadoventanilla } from './estadoventanilla/estadoventanilla.entity';
import { VentanillaDTO } from './ventanilla.dto';
import { Detestadoventanilla } from './detestadoventanilla/detestadoventanilla.entity';
import { formatFechaCorta, formatFechaLarga } from '../../shared/utils';
import { VentanillaGateway } from '../../gateways/ventanilla.gateway';
import { log } from 'util';

@Injectable()
export class VentanillaService {
  private logger = new Logger( 'VentanillaService' );
  constructor(
    @InjectRepository( Ventanilla ) private ventanillaRepository: Repository< Ventanilla >,
    @InjectRepository( Estadoventanilla ) private estadoVentanillaRepository: Repository< Estadoventanilla >,
    @InjectRepository( Detestadoventanilla ) private detEstadoVentanillaRepository: Repository< Detestadoventanilla >,
    private ventanillaGateway: VentanillaGateway,
  ) {}

  async viewVentanillaEstado() {
    const ultimoEstado = await this.ventanillaGateway.ultimoEstadoVentanilla();
    return ultimoEstado;
  }

  async obtenerVentanillas() {
    const ventanillas = await this.ventanillaGateway.obtenerVentanillas();
    return ventanillas;
  }

  async usuarioAVentanilla(
    idventanilla: number,
    idusuario: number,
  ) {
    const ventanillaActualizada = await this.ventanillaGateway.usuarioAVentanilla( idventanilla, idusuario );
    const ventanillas = await this.ventanillaGateway.obtenerVentanillas();
    this.ventanillaGateway.wsVentanilla.emit( '[VENTANILLA] LISTA', ventanillas );
    return ventanillaActualizada;
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
    const estadoVentanilla = await this.estadoVentanillaRepository.findOne( { where: { id: 3 } });
    const nuevaVentanilla: Ventanilla = await this.ventanillaRepository.create( ventanilla );

    nuevaVentanilla.estados = [ estadoVentanilla ];
    await this.ventanillaRepository.save( nuevaVentanilla );

    await this.detEstadoVentanillaRepository.update(
      {
        tbVentanillaId: nuevaVentanilla.id,
        tbEstadoventanillaId: 3,
      }, {
        fecha: formatFechaLarga(),
      },
    );
    return nuevaVentanilla;
  }

  async guardarNuevoEstado(
    idventanilla: number,
    idestado: number,
    antiguo: boolean = false,
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
    if ( !antiguo ) {
      this.ventanillaGateway.wsVentanilla.emit( '[VENTANILLA] ULTIMOESTADO', detEstadoVentanilla);
    }
    return guardarDetEstadoVentanilla.identifiers[ 0 ];
  }

  async ultimoEstadoVentanilla(
    idventanilla?,
  ) {
    let ultimoEstado: any[] = await this.ventanillaGateway.ultimoEstadoVentanilla( );
    for (let i = 0; i < ultimoEstado.length; i++ ) {
      if ( ultimoEstado[ i ].tbVentanillaId == idventanilla ) {
        return ultimoEstado[ i ];
      }
    }
    return null;
  }

  async editarTipoAtencion(
    id: number,
    tipoatencion: string,
  ) {
    let ventanillaActualizada = await this.ventanillaRepository.findOne({
      where: { id },
      select: [ 'idusuario', 'codigoventanilla', 'tipoatencion', 'ubicacion' ],
    });
    await this.ventanillaRepository.update( id, {
      ...ventanillaActualizada,
      tipoatencion,
    });
    ventanillaActualizada = await this.ventanillaRepository.findOne({ where: { id }});
    const ventanillas = await this.ventanillaGateway.obtenerVentanillas();
    this.ventanillaGateway.wsVentanilla.emit( '[VENTANILLA] LISTA', ventanillas );
    return ventanillaActualizada;
  }

  async ultimoEstadoVentanillas() {
    const ultimoEstado = await this.ventanillaGateway.ultimoEstadoVentanilla();
    return ultimoEstado;
  }

}
