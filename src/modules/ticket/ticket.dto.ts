import { IsBoolean, IsEmpty, IsNotEmpty, IsNotIn, IsNumber } from 'class-validator';
import { ApiModelProperty } from '@nestjs/swagger';
import { Administrado } from '../administrado/administrado.entity';
import { AdministradoRO } from '../administrado/administrado.dto';

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
  @ApiModelProperty()
  idticket: number;
  @ApiModelProperty()
  codigo: string;
  @ApiModelProperty()
  fecha: string;
  @ApiModelProperty()
  idadministrado: number;
  @ApiModelProperty()
  idtipoticket: number;
  @ApiModelProperty()
  idtematica: number;
  @ApiModelProperty()
  idtramite: number;
  @ApiModelProperty()
  preferencial: boolean;
  @ApiModelProperty()
  urgente: boolean;
  @ApiModelProperty()
  idventanilla: number;
  @ApiModelProperty()
  administrado: AdministradoRO;
}
