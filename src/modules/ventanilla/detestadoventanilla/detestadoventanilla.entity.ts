import {
  BeforeInsert,
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Ventanilla } from '../ventanilla.entity';
import { Estado } from '../../ticket/estadoticket/estadoticket.entity';
import { Estadoventanilla } from '../estadoventanilla/estadoventanilla.entity';
import { formatFechaLarga } from '../../../shared/utils';
import { Ticket } from '../../ticket/ticket.entity';
import { Expose } from 'class-transformer';

@Entity({ name: 'tb_ventanilla_estados_tb_estadoventanilla' })
export class Detestadoventanilla {
  @ManyToOne(type => Ventanilla, ventanilla => ventanilla.estados)
  @JoinColumn({ name: 'tbVentanillaId' })
  ventanilla: Ventanilla;

  @Column('integer', { primary: true })
  tbVentanillaId: number;

  @ManyToOne(
    type => Estadoventanilla,
    estadoventanilla => estadoventanilla.ventanillas,
  )
  @JoinColumn({ name: 'tbEstadoventanillaId' })
  estado: Estado;

  @Column('integer', { primary: true })
  tbEstadoventanillaId: number;

  @PrimaryGeneratedColumn('uuid', {
    name: 'identificador',
    comment: 'Campo que es 3ra llave primaria',
  })
  identificador: string;

  @Column('timestamp', {
    nullable: true,
  })
  fecha: Date | string;

  @BeforeInsert()
  asignarFecha() {
    this.fecha = formatFechaLarga();
  }
}
