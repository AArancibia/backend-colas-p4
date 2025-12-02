import { Column, Entity, ManyToMany, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { Ventanilla } from '../ventanilla.entity';
import { Detestadoventanilla } from '../detestadoventanilla/detestadoventanilla.entity';

@Entity('tb_estadoventanilla')
export class Estadoventanilla {
  @PrimaryGeneratedColumn()
  id: number;

  @Column('varchar', {
    name: 'descripcion',
  })
  descripcion: string;

  @OneToMany(() => Detestadoventanilla, detestadoventanilla => detestadoventanilla.estado)
  ventanillas: Ventanilla[];
}
