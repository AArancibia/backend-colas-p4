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
    /*const detTickets = await this.detestadoRepository.find({
      relations: ['ticket', 'estado'],
      where: {
        fecha: {

        }
      },
    });*/
    const qb = await this.detestadoRepository.createQueryBuilder("t1");
    const detTickets = qb
      .innerJoinAndSelect( 't1.ticket' , 'tb_ticket')
      .where(
        sq => {
          const subQuery = qb.subQuery()
            .select("max( fecha )")
            .from( Detestadoticket, "t2" )
            .where( "t1.tbTicketId = t2.tbTicketId" )
            .getQuery();
          return "t1.fecha = " + subQuery;
        },
      )
      .getMany();
    return detTickets;
  }
}
