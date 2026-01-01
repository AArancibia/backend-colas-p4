import { IsBoolean, IsEmpty, IsNotEmpty, IsNotIn, IsNumber } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { Administrado } from '../administrado/administrado.entity';
import { AdministradoRO } from '../administrado/administrado.dto';

/**
 * Clase TicketDto - para request en algun controlador
 * @class
 */
export class TicketDto {

  /**
   * Id del Administrado
   */
  @ApiProperty()
  @IsNotEmpty({
    message: 'Valor no debe ser nulo',
  })
  idadministrado: number;

  /**
   * Id de la Tematica
   */
  @ApiProperty()
  @IsNotEmpty({
    message: 'Valor no debe ser nulo',
  })
  @IsNumber({
    allowNaN: false,
  }, {
    message: 'El valor tiene que ser numero',
  })
  idtematica: number;

  /**
   * Id del Tipo de Ticket
   */
  @ApiProperty()
  @IsNotEmpty({
    message: 'Valor no debe ser nulo',
  })
  @IsNumber({
    allowNaN: false,
  }, {
    message: 'El valor tiene que ser numero o entidad TipoTicket',
  })
  idtipoticket: number;

  /**
   * Campo preferencial
   */
  @ApiProperty()
  @IsNotEmpty()
  @IsBoolean({
    message: 'El valor tiene que ser verdadero o falso',
  })
  preferencial: boolean;

  /**
   * Campo urgente 
   */
  @ApiProperty()
  @IsBoolean({
    message: 'El valor tiene que ser verdadero o falso',
  })
  urgente: boolean;

  /**
   * Id del Tramite
   */
  @ApiProperty()
  idtramite?: number;

}

/**
 * Clase TicketRO - para response hacia el frontend
 * @class
 */
export class TicketRO {
  /**
   * Id del Ticket
   */
  @ApiProperty()
  idticket: number;
  /**
   * Codigo del Ticket
   */
  @ApiProperty()
  codigo: string;
  /**
   * Fecha de creacion del Ticket
   */
  @ApiProperty()
  fecha: string;
  /**
   * Id del Administrado
   */
  @ApiProperty()
  idadministrado: number;
  /**
   * Id del Tipo de Ticket
   */
  @ApiProperty()
  idtipoticket: number;
  /**
   * Id del Tipo de Tematica
   */
  @ApiProperty()
  idtematica: number;
  @ApiProperty()
  /**
   * Id del Tramite
   */
  idtramite: number;
  /**
   * Campo preferencial
   */
  @ApiProperty()
  preferencial: boolean;
  /**
   * Campo urgente
   */
  @ApiProperty()
  urgente: boolean;
  /**
   * Id de la Ventanilla
   */
  @ApiProperty()
  idventanilla: number;
  /**
   * Datos del Administrado
   */
  @ApiProperty()
  administrado: AdministradoRO;
}
