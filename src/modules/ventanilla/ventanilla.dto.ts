import { ApiProperty } from '@nestjs/swagger';

export class VentanillaDTO {
  @ApiProperty()
  codigoventanilla: string;
  @ApiProperty()
  ubicacion: string;
  @ApiProperty()
  idusuario: number;
  @ApiProperty()
  tipoatencion: string;
}
