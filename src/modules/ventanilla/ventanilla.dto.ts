import { ApiModelProperty } from "@nestjs/swagger";

export class VentanillaDTO {
  @ApiModelProperty()
  codigoventanilla: string;
  @ApiModelProperty()
  ubicacion: string;
  @ApiModelProperty()
  idusuario: number;
}
