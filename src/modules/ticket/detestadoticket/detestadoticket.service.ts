import { Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Detestadoticket } from './detestadoticket.entity';
import { Repository } from 'typeorm';
import { Max } from 'class-validator';
import { Ticket } from '../ticket.entity';

@Injectable()
export class DetestadoticketService {
  private logger = new Logger( 'DetEstadoTicketService' );
  constructor(
    @InjectRepository( Detestadoticket ) private detestadoRepository: Repository< Detestadoticket >,
  ) {}

  async getDetEstadoTicket() {
    const qb = await this.detestadoRepository.createQueryBuilder("t1");
    const detTickets = qb
      .innerJoinAndSelect( 't1.ticket' , 'ticket')
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
      .getMany();
    return detTickets;
  }
}
