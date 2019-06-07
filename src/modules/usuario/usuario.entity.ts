import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { Ventanilla } from '../ventanilla/ventanilla.entity';

@Entity( 'tb_usuario')
export class Usuario {
  @PrimaryGeneratedColumn()
  idusuario: number;

  @Column()
  username: string;

  @Column()
  password: string;

  @Column( 'boolean', {
    default: true,
    name: 'estado',
    comment: 'Estado del usuario ( ACTIVO - INACTIVO )',
    nullable: false,
  })
  estado: boolean;

  @Column()
  idpersonal: number;

  @OneToMany( type => Ventanilla, ventanilla => ventanilla.id )
  ventanillas: Ventanilla[];

}
