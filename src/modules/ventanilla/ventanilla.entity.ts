import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Usuario } from '../usuario/usuario.entity';
import { Estadoventanilla } from './estadoventanilla/estadoventanilla.entity';
import { Ticket } from '../ticket/ticket.entity';
import { Detestadoventanilla } from './detestadoventanilla/detestadoventanilla.entity';

@Entity('tb_ventanilla')
export class Ventanilla {
  @PrimaryGeneratedColumn()
  id: number;

  @Column('varchar', {
    nullable: false,
    comment: 'Codigo de la ventanilla',
    name: 'codigoventanilla',
  })
  codigoventanilla: string;

  @Column('varchar', {
    nullable: true,
  })
  tipoatencion: string;

  @Column('varchar', {
    name: 'ubicacion',
    comment: 'Ubicacion de la ventanilla',
    nullable: true,
  })
  ubicacion: string;

  @OneToMany(type => Ticket, ticket => ticket.ventanilla) /*, { eager: true } */
  tickets: Ticket;

  @ManyToOne(type => Usuario, usuario => usuario.ventanillas)
  @JoinColumn({ name: 'idusuario' })
  usuario: Usuario;

  @Column('integer', {
    nullable: true,
  })
  idusuario: number;

  @OneToMany(type => Detestadoventanilla, detestadoventanilla => detestadoventanilla.ventanilla)
  estados: Estadoventanilla[];
}
