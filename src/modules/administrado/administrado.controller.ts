import { Controller, Logger, Param, Post } from '@nestjs/common';
import { AdministradoService } from './administrado.service';
import { ContribuyenteService } from '../rentas/contribuyente/contribuyente.service';
import { AdministradoRO } from './administrado.dto';
import { ApiUseTags, ApiOperation, ApiResponse } from '@nestjs/swagger';

@ApiUseTags('Administrado')
@Controller('administrado')
export class AdministradoController {
  private logger = new Logger( 'AdministradoController' );
  constructor(
    private administradoService: AdministradoService,
    private contribuyenteService: ContribuyenteService,
  ) {}

  @ApiOperation({
    title: 'Obtener Administrado y Guardar',
    description: 'Servicio para buscar en Reniec, buscar Contribuyente en la BD-Rentas y Guardar en DB-COLAS',
  })
  @ApiResponse({ status: 200, description: 'Datos del Administrado', isArray: true })
  @Post('/:dni')
  async getContribuyente(
    @Param('dni') dni: string,
  ) {
    // Para obtener los datos de la persona mediante el servicio de la reniec
    const personaReniec: any = await this.contribuyenteService.getContribuyenteByDniReniec( dni );
    // Para obtener el id del contribuyente de la BD RENTAS - Re_MaeCntr
    let idcontribuyente: any = await this.contribuyenteService.getIdContribuyenteRentas( dni , personaReniec );
    idcontribuyente = idcontribuyente.body;
    // Se guarda en la BD al administrado si no lo tenemos registrado
    const administrado: AdministradoRO = await this.administradoService.guardarAdministrado( personaReniec, dni, idcontribuyente );
    administrado.foto = personaReniec.foto;
    return administrado;
  }

}
