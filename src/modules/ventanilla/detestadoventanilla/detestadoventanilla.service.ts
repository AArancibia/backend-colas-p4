import { Injectable } from '@nestjs/common';
import { VentanillaGateway } from '../../../gateways/ventanilla.gateway';

@Injectable()
export class DetestadoventanillaService {
  constructor(
    //private wsVentanilla: VentanillaGateway,
  ) {}

  async ultimoDetEstadoVentanilla() {
    //const res = await this.wsVentanilla.ultimoEstadoVentanilla();
    //return  res;
  }
}
