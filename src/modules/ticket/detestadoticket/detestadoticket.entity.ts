import { Column, Entity, JoinColumn, ManyToOne, OneToOne } from 'typeorm';
import { Ticket } from '../ticket.entity';
import { Estado } from '../estadoticket/estadoticket.entity';

@Entity( 'tb_ticket_estados_tb_estadoticket' )
export class Detestadoticket {
  @ManyToOne( type => Ticket, ticket => ticket.estados )
  @JoinColumn({ name: 'tbTicketId'} )
  ticket: Ticket;

  @Column('integer', { primary: true })
  tbTicketId: number;

  @ManyToOne( type => Estado, estado => estado.tickets )
  @JoinColumn({ name: 'tbEstadoticketId'})
  estado: Estado;

  @Column('integer', { primary: true })
  tbEstadoticketId: number;

  @Column('timestamp', {
    name: 'fecha',
    default: new Date(),
  })
  fecha: Date | string;

}
