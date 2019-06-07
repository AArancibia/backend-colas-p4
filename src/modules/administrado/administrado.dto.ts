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
  id: number;
  nrodoc: string;
  nombre: string;
  apepat: string;
  apemat: string;
  idcontribuyente: number;
  tipodoc?: string;
  foto?: string;
}
