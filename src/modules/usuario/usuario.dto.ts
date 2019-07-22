import { ApiModelProperty } from "@nestjs/swagger";

export class UsuarioDTO {
  username: string;
  password: string;
}

export class UsuarioRO {
  @ApiModelProperty({
    description: 'Llave primaria del registro de usuario'
  })
  idusuario: number;
  @ApiModelProperty({
    description: 'Nombre de usuario'
  })
  username: string;
  @ApiModelProperty({
    description: 'Llave foranea de la tabla Personal de la BD-Sistradoc-prod'
  })
  idpersonal: number;
}
