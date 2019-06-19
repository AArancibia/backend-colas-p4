import { HttpException, HttpStatus, Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Ventanilla } from './ventanilla.entity';
import { Repository } from 'typeorm';
import { Estadoventanilla } from './estadoventanilla/estadoventanilla.entity';
import { VentanillaDTO } from './ventanilla.dto';
import { Detestadoventanilla } from './detestadoventanilla/detestadoventanilla.entity';
import { formatFechaCorta, formatFechaLarga } from '../../shared/utils';
import { Detestadoticket } from '../ticket/detestadoticket/detestadoticket.entity';
import * as moment from 'moment';

@Injectable()
export class VentanillaService {
  private logger = new Logger( 'Ventanilla' );
  constructor(
    @InjectRepository( Ventanilla ) private ventanillaRepository: Repository< Ventanilla >,
    @InjectRepository( Estadoventanilla ) private estadoVentanillaRepository: Repository< Estadoventanilla >,
    @InjectRepository( Detestadoventanilla ) private detEstadoVentanillaRepository: Repository< Detestadoventanilla >,
  ) {}

  async obtenerVentanillas() {
    const ventanillas = await this.ventanillaRepository.find();
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

    const detEstadoVentanilla = await this.ultimoEstadoVentanilla();

    return detEstadoVentanilla;
  }

  async ultimoEstadoVentanilla() {
    const fecha2 = moment( formatFechaCorta() ).add('days', 1).format('YYYY-MM-DD');
    const qb = await this.detEstadoVentanillaRepository.createQueryBuilder('t1');
    const detVentanillas = qb
      .innerJoinAndSelect( 't1.ventanilla', 'tb_ventanilla' )  // Ticket , 'ticket', 'ticket.id = t1.ticketId'
      .where(
        sq => {
          const subQuery = qb.subQuery()
            .select( 'max( fecha )')
            .from( Detestadoventanilla, 't2' )
            .where( 't1.tbVentanillaId = t2.tbVentanillaId' )
            .getQuery();
          return 't1.fecha = ' + subQuery;
        },
      )
      .andWhere(
        ' t1.fecha between :fec1 and :fec2 ',
        {
          fec1: `${ formatFechaCorta() } ` + '00:00:00',
          fec2: `${ fecha2 } ` + '00:00:00',
        },
      )
      .getMany();
    return detVentanillas;
  }

}
