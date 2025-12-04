import { Controller, Get } from '@nestjs/common';
import { TematicaService } from './tematica.service';

@Controller('tematica')
export class TematicaController {
  constructor(private tematicaService: TematicaService) {}

  @Get()
  async getTematicas() {
    return await this.tematicaService.getTematicas();
  }
}
