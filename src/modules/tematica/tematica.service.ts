import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { TematicaEntity } from './tematica.entity';
import { Repository } from 'typeorm';

@Injectable()
export class TematicaService {
  constructor(
    @InjectRepository(TematicaEntity) private readonly tematicaRepository: Repository<TematicaEntity>,
  ) {}

  async getTematicas() {
    return await this.tematicaRepository.find();
  }
}
