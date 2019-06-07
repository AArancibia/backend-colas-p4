import { Column, Entity, ManyToMany, PrimaryGeneratedColumn } from 'typeorm';
import { Administrado } from '../administrado.entity';

@Entity( 'tb_tipodoc' )
export class Tipodoc {

  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  descripcion: string;

  @ManyToMany( type => Administrado )
  administrado: Administrado[];

}
