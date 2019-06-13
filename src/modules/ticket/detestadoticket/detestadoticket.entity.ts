import {
  BeforeInsert,
  BeforeUpdate,
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToOne,
  PrimaryColumn,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Ticket } from '../ticket.entity';
import { Estado } from '../estadoticket/estadoticket.entity';
import { formatFechaCorta, formatFechaLarga } from '../../../shared/utils';
import { Logger } from '@nestjs/common';

@Entity( 'ticket_estados_estadoticket' )
export class Detestadoticket {

  @ManyToOne( type => Ticket, ticket => ticket.estados )
  @JoinColumn({ name: 'ticketId'} )
  ticket: Ticket;

  @Column('integer', { primary : true })
  ticketId: number;

  @ManyToOne( type => Estado, estado => estado.tickets )
  @JoinColumn({ name: 'estadoticketId'})
  estado: Estado;

  @Column('integer', { primary : true })
  estadoticketId: number;

  @PrimaryGeneratedColumn( 'uuid', {
    name: 'identificador',
  } )
  identificador: string;

  @Column('timestamp', { nullable: true })
  fecha: Date | string;

  @BeforeInsert()
  asignarFecha() {
    this.fecha = formatFechaLarga();
  }
}
