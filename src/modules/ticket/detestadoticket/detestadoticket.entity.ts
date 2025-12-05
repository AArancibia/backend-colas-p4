import {
  BeforeInsert,
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Ticket } from '../ticket.entity';
import { Estado } from '../estadoticket/estadoticket.entity';
import { formatFechaLarga } from '../../../shared/utils';

@Entity('ticket_estados_estadoticket')
export class Detestadoticket {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(type => Ticket, ticket => ticket.detEstados)
  @JoinColumn({ name: 'ticketId' })
  ticket: Ticket;

  @Column('integer', {primary: true})
  ticketId: number;

  @ManyToOne(type => Estado, estado => estado.detestadoticket)
  @JoinColumn({ name: 'estadoticketId' })
  estado: Estado;

  @Column('integer', {primary: true})
  estadoticketId: number;

  @Column('timestamp', { nullable: true })
  fecha: Date | string;

  @BeforeInsert()
  asignarFecha() {
    this.fecha = formatFechaLarga();
  }
}
