import { IsBoolean, IsEmpty, IsNotEmpty, IsNotIn, IsNumber } from 'class-validator';
import { ApiModelProperty } from '@nestjs/swagger';

export class TicketDto {

  @ApiModelProperty()
  @IsNotEmpty({
    message: 'Valor no debe ser nulo',
  })
  idadministrado: number;

  @ApiModelProperty()
  @IsNotEmpty({
    message: 'Valor no debe ser nulo',
  })
  @IsNumber({
    allowNaN: false,
  }, {
    message: 'El valor tiene que ser numero',
  })
  idtematica: number;

  @ApiModelProperty()
  @IsNotEmpty({
    message: 'Valor no debe ser nulo',
  })
  @IsNumber({
    allowNaN: false,
  }, {
    message: 'El valor tiene que ser numero o entidad TipoTicket',
  })
  idtipoticket: number;

  @ApiModelProperty()
  @IsNotEmpty()
  @IsBoolean({
    message: 'El valor tiene que ser verdadero o falso',
  })
  preferencial: boolean;

  @ApiModelProperty()
  @IsBoolean({
    message: 'El valor tiene que ser verdadero o falso',
  })
  urgente: boolean;

  @ApiModelProperty()
  idtramite?: number;

}

export class TicketRO {
  idticket: number;
  codigo: string;
}
