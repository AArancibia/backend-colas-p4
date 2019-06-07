import { Column, Entity, JoinColumn, ManyToOne } from 'typeorm';
import { Ventanilla } from '../ventanilla.entity';
import { Estado } from '../../ticket/estadoticket/estadoticket.entity';
import { Estadoventanilla } from '../estadoventanilla/estadoventanilla.entity';

@Entity( { name: 'tb_ventanilla_estados_tb_estadoventanilla' } )
export class Detestadoventanilla {

  @ManyToOne( type => Ventanilla, ventanilla => ventanilla.estados )
  @JoinColumn({ name: 'tbVentanillaId'} )
  ventanilla: Ventanilla;

  @Column('integer', { primary: true })
  tbVentanillaId: number;

  @ManyToOne( type => Estadoventanilla, estadoventanilla => estadoventanilla.ventanillas )
  @JoinColumn({ name: 'tbEstadoventanillaId'})
  estado: Estado;

  @Column('integer', { primary: true })
  tbEstadoventanillaId: number;

  @Column('date', {
    name: 'fecha',
    default: new Date(),
  })
  fecha: Date | string;
}
