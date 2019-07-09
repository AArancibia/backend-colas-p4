import { Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Detestadoticket } from './detestadoticket.entity';
import { Repository } from 'typeorm';
import * as moment from 'moment';
import { formatFechaCorta } from '../../../shared/utils';

@Injectable()
export class DetestadoticketService {
  private logger = new Logger( 'DetEstadoTicketService' );
  constructor(
    @InjectRepository( Detestadoticket ) private detestadoRepository: Repository< Detestadoticket >,
  ) {}

  async obtenerUltimoEstadoTicket( idticket: number ): Promise< any > {
    const detEstado = await this.detestadoRepository.findOne({
      where: {
        ticketId: idticket,
      },
      relations: ['estado', 'ticket'],
      order: {
        fecha: 'DESC',
      },
    });
    return detEstado.estadoticketId;
  }

  async getDetEstadoTicket() {
    const fecha2 = moment( formatFechaCorta() ).add('days', 1).format('YYYY-MM-DD');
    const qb = await this.detestadoRepository.createQueryBuilder('t1');
    const detTickets = qb
      .innerJoinAndSelect( 't1.ticket', 'ticket' )  // Ticket , 'ticket', 'ticket.id = t1.ticketId'
      .where(
        sq => {
          const subQuery = qb.subQuery()
            .select('max( fecha )')
            .from( Detestadoticket, 't2' )
            .where( 't1.ticketId = t2.ticketId' )
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
    return detTickets;
  }
}
