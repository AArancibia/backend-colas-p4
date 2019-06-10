import { BeforeInsert, Column, Entity, JoinColumn, ManyToOne, OneToOne, PrimaryColumn, PrimaryGeneratedColumn } from 'typeorm';
import { Ticket } from '../ticket.entity';
import { Estado } from '../estadoticket/estadoticket.entity';
import { formatFechaLarga } from '../../../shared/utils';

@Entity( 'tb_ticket_estados_tb_estadoticket' )
export class Detestadoticket {

  @ManyToOne( type => Ticket, ticket => ticket.estados )
  @JoinColumn({ name: 'tbTicketId'} )
  ticket: Ticket;

  @Column('integer', { primary : true })
  tbTicketId: number;

  @ManyToOne( type => Estado, estado => estado.tickets )
  @JoinColumn({ name: 'tbEstadoticketId'})
  estado: Estado;

  @Column('integer', { primary : true })
  tbEstadoticketId: number;

  @PrimaryGeneratedColumn( 'uuid', {
    name: 'identificador',
  } )
  identificador: string;

  @Column('timestamp', {
    name: 'fecha',
    nullable: true,
  })
  fecha: Date | string;

}
