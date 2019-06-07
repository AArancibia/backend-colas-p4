import { Controller, Get } from '@nestjs/common';
import { ApiUseTags } from '@nestjs/swagger';
import { SistradocService } from './sistradoc.service';

@Controller('sistradoc')
@ApiUseTags('Sistradoc')
export class SistradocController {
  constructor(
    private sistradocService: SistradocService,
  ) {}

  @Get( 'areas' )
  async getAreas() {
    const areas = await this.sistradocService.getAreas();
    return areas;
  }
}
