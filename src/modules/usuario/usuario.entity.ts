import {
  Column,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
  BeforeInsert,
} from 'typeorm';
import { Ventanilla } from '../ventanilla/ventanilla.entity';
import * as jwt from 'jsonwebtoken';
import * as bcrypt from 'bcryptjs';

@Entity('tb_usuario')
export class Usuario {
  @PrimaryGeneratedColumn()
  idusuario: number;

  @Column()
  username: string;

  @Column()
  password: string;

  @Column('boolean', {
    default: true,
    name: 'estado',
    comment: 'Estado del usuario ( ACTIVO - INACTIVO )',
    nullable: false,
  })
  estado: boolean;

  @Column('int4', {
    nullable: true,
  })
  idpersonal: number;

  @OneToMany(type => Ventanilla, ventanilla => ventanilla.id)
  ventanillas: Ventanilla[];

  @BeforeInsert()
  async encriptarPassword() {
    return (this.password = await bcrypt.hash(this.password, 10));
  }

  get token() {
    const { idusuario, username } = this;
    return jwt.sign(
      {
        idusuario,
        username,
      },
      process.env.SECRET,
      {
        expiresIn: '1d',
      },
    );
  }

  toResponseObject(mostrarToken = false) {
    const { idusuario, username, idpersonal } = this;
    let responseObject: any = { idusuario, username, idpersonal };
    if (mostrarToken) {
      responseObject.token = this.token;
    }
    return responseObject;
  }
}
