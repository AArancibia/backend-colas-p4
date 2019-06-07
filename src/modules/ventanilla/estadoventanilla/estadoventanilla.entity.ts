import { Column, Entity, ManyToMany, PrimaryGeneratedColumn } from 'typeorm';
import { Ventanilla } from '../ventanilla.entity';

@Entity( 'tb_estadoventanilla' )
export class Estadoventanilla {

  @PrimaryGeneratedColumn()
  id: number;

  @Column('varchar', {
    name: 'descripcion',
  })
  descripcion: string;

  @ManyToMany( type => Ventanilla )
  ventanillas: Ventanilla[];

}
