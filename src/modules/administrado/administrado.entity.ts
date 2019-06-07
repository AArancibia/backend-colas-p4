import { Column, Entity, JoinTable, ManyToMany, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { Ticket } from '../ticket/ticket.entity';
import { Tipodoc } from './tipodoc/tipodoc.entity';

@Entity( 'tb_administrado' )
export class Administrado {
  @PrimaryGeneratedColumn()
  id: number;

  @Column('varchar')
  nrodoc: string;

  @Column()
  nombre: string;

  @Column()
  apepat: string;

  @Column()
  apemat: string;

  @Column('integer', {
    nullable: true,
  })
  idcontribuyente: number;

  @OneToMany( type => Ticket, ticket => ticket.id )
  ticket: Ticket;

  @ManyToMany( type => Tipodoc )
  @JoinTable()
  docs: Tipodoc[];

}
