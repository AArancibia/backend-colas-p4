import { ApiModelProperty } from '@nestjs/swagger';
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
  @ApiModelProperty({
    description: 'Llave primaria del registro de usuario',
  })
  idusuario: number;
  @ApiModelProperty({
    description: 'Nombre de usuario',
  })
  username: string;
  @ApiModelProperty({
    description: 'Llave foranea de la tabla Personal de la BD-Sistradoc-prod',
  })
  idpersonal?: number;
  password?: string;
  token?: string;
}
