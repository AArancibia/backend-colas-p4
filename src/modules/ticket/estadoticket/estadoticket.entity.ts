import {
  Column,
  Entity,
  JoinTable,
  ManyToMany,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Ticket } from '../ticket.entity';
import { Detestadoticket } from '../detestadoticket/detestadoticket.entity';

@Entity('estadoticket')
export class Estado {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({
    name: 'nombre',
    comment: 'Nombre del estado del ticket',
  })
  nombre: string;

  @Column({
    name: 'abr',
    comment: 'Abreviatura del estado del ticket',
  })
  abr: string;

  @ManyToMany(type => Ticket)
  tickets: Ticket[];

  // @OneToMany(type => Detestadoticket, detestado => detestado.estadoticketId)
  // detestadoticket: Detestadoticket[];
}
