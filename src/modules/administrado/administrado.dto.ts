import { ApiProperty } from '@nestjs/swagger';

export class AdministradoDto {
  @ApiProperty()
  nombre: string;
  @ApiProperty()
  apepat: string;
  @ApiProperty()
  apemat: string;
  @ApiProperty()
  nrodoc: string;
  @ApiProperty({
    type: 'number',
  })
  idcontribuyente?: number;
}

export class AdministradoRO {
  @ApiProperty()
  id: number;
  @ApiProperty()
  nrodoc: string;
  @ApiProperty()
  nombre: string;
  @ApiProperty()
  apepat: string;
  @ApiProperty()
  apemat: string;
  @ApiProperty()
  idcontribuyente: number;
  @ApiProperty()
  tipodoc?: string;
  @ApiProperty()
  foto?: string;
}
