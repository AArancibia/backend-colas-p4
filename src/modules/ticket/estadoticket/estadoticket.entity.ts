import { Column, Entity, JoinTable, ManyToMany, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { Ticket } from '../ticket.entity';
//import { TicketEstado } from '../detestadoticket/detestadoticket.entity';

@Entity( 'tb_estadoticket' )
export class Estado {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  nombre: string;

  @Column()
  abr: string;

  @ManyToMany( type => Ticket )
  tickets: Ticket[];
}
