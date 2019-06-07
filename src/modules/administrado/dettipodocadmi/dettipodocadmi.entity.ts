import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Administrado } from '../administrado.entity';
import { Tipodoc } from '../tipodoc/tipodoc.entity';

@Entity( 'tb_administrado_docs_tb_tipodoc' )
export class Dettipodocadmi {

  @ManyToOne( type => Administrado, administrado => administrado.docs )
  @JoinColumn({ name: 'tbAdministradoId'})
  administrado: Administrado;

  @Column('integer', { primary: true })
  tbAdministradoId: number;

  @ManyToOne( type => Tipodoc, tipodoc => tipodoc.administrado )
  @JoinColumn({ name: 'tbTipodocId'})
  tipodoc: Tipodoc;

  @Column('integer', { primary: true })
  tbTipodocId: number;

  @Column()
  nrodoc: string;

}
