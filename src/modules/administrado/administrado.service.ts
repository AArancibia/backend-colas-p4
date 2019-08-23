import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Administrado } from './administrado.entity';
import { Repository, Transaction } from 'typeorm';
import { AdministradoRO } from './administrado.dto';

/**
 * Servicio de Modulo Administrado
 */
@Injectable()
export class AdministradoService {

  /**
   * Constructor de la clase 
   * @constructor
   */
  constructor(
    @InjectRepository( Administrado ) private administradoRepository: Repository< Administrado >,
  ) {}

  /**
   * Servicio para guardar Administrado
   * @param {number} idticket -  Id del Ticket
   * @param {number} idcontribuyente -  Id de Contribuyente
   * @function guardarAdministrado
   * @returns {Administrado} Nuevo o Administrado Encontrado
   */
  async guardarAdministrado(
    { apPrimer, apSegundo, prenombres }, dni: string,
    idcontribuyente?: number,
  ): Promise< AdministradoRO > {
    const administrado = await this.administradoRepository.findOne({
      where: { nrodoc: dni },
    });
    if ( !administrado ) {
      const insertAdministrado = await this.administradoRepository.insert({
        nombre: prenombres,
        apepat: apPrimer,
        apemat: apSegundo,
        nrodoc: dni,
        idcontribuyente,
      });
      return {
        id: insertAdministrado.identifiers[0].id,
        nrodoc: dni,
        nombre: prenombres,
        apepat: apPrimer,
        apemat: apSegundo,
        idcontribuyente,
      };
    }
    return administrado;
  }
}
