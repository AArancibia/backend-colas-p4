import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { Ticket } from '../ticket.entity';

@Entity( 'tb_tipoticket' )
export class Tipoticket {

  @PrimaryGeneratedColumn()
  idtipoticket: number;

  @Column( 'varchar', {
    name: 'descripcion',
    nullable: false,
    length: 150,
  })
  descripcion: string;

  @Column( 'char', {
    length: 1,
    name: 'abr',
    comment: 'Abreviatura del Tipo de Ticket',
  })
  abr: string;

  @OneToMany( type => Ticket, ticket => ticket.idticket )
  ticket: Ticket;


}
