import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('tematica')
export class TematicaEntity {
  @PrimaryGeneratedColumn()
  idtematica: number;

  @Column()
  nombre: string;
}
