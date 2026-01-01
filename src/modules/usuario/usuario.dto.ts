import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';
import { Ventanilla } from '../ventanilla/ventanilla.entity';

export class UsuarioDTO {
  @IsNotEmpty()
  username: string;
  @IsNotEmpty()
  password: string;

  idpersonal?: number;
}

export class UsuarioRO {
  @ApiProperty({
    description: 'Llave primaria del registro de usuario',
  })
  idusuario: number;
  @ApiProperty({
    description: 'Nombre de usuario',
  })
  username: string;
  @ApiProperty({
    description: 'Llave foranea de la tabla Personal de la BD-Sistradoc-prod',
  })
  idpersonal?: number;
  password?: string;
  token?: string;
}
