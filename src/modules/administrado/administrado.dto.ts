import { ApiModelProperty } from '@nestjs/swagger';

export class AdministradoDto {
  @ApiModelProperty()
  nombre: string;
  @ApiModelProperty()
  apepat: string;
  @ApiModelProperty()
  apemat: string;
  @ApiModelProperty()
  nrodoc: string;
  @ApiModelProperty({
    type: 'number',
  })
  idcontribuyente?: number;
}

export class AdministradoRO {
  @ApiModelProperty()
  id: number;
  @ApiModelProperty()
  nrodoc: string;
  @ApiModelProperty()
  nombre: string;
  @ApiModelProperty()
  apepat: string;
  @ApiModelProperty()
  apemat: string;
  @ApiModelProperty()
  idcontribuyente: number;
  @ApiModelProperty()
  tipodoc?: string;
  @ApiModelProperty()
  foto?: string;
}
