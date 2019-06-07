import { Column, Entity, JoinColumn, JoinTable, ManyToMany, ManyToOne, OneToMany, PrimaryGeneratedColumn, RelationId } from 'typeorm';
import { Ventanilla } from '../ventanilla/ventanilla.entity';
import { Usuario } from '../usuario/usuario.entity';
import { Tipoticket } from './tipoticket/tipoticket.entity';
import { Administrado } from '../administrado/administrado.entity';
import { Estado } from './estadoticket/estadoticket.entity';
import { formatFechaCorta } from '../../shared/utils';
//import { TicketEstado } from './detestadoticket/detestadoticket.entity';

@Entity( 'tb_ticket' )
export class Ticket {
  
  @PrimaryGeneratedColumn()
  id: number;

  @Column('integer', {
    nullable: false,
  })
  idtematica: number;

  @Column('date', {
    default: new Date(),
  })
  fecha: Date | string;

  @Column('varchar', {
    nullable: false
  })
  codigo: string;

  @Column( 'bigint', {
    nullable: false,
  })
  correlativo: number;

  @Column('boolean', {
    nullable: true,
  })
  urgente: boolean;

  @Column('date', {
    default: formatFechaCorta(),
  })
  fechacorta: Date | string;

  @ManyToMany( type => Estado, { eager: true, cascade: true } )
  @JoinTable()
  estados: Estado[];

  @ManyToOne( type => Ventanilla, ventanilla => ventanilla.id )
  @JoinColumn({ name: 'idventanilla' })
  ventanilla: Ventanilla;

  @Column()
  idventanilla: number;

  @ManyToOne( type => Tipoticket, tipoTicket => tipoTicket.idtipoticket )
  @JoinColumn({ name: 'idtipoticket' })
  tipoTicket: Tipoticket;

  @Column('integer', {
    name: 'idtipoticket',
  })
  idtipoticket: number;

  @ManyToOne( type => Administrado, administrado => administrado.id )
  @JoinColumn({ name: 'idadministrado' })
  administrado: Administrado;

  @Column('integer', {
    name: 'idadministrado',
  })
  idadministrado: number;

  @RelationId( ( tickets: Ticket ) => tickets.estados )
  estadosIds: number[];

}
