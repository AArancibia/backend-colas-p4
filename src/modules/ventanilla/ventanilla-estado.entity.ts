import { ViewColumn, ViewEntity } from 'typeorm';

@ViewEntity({
  expression: `
      select * from ULTIMOESTADOVENTANILLA
  `,
})
export class VentanillaEstadoEntity {

  @ViewColumn()
  codigoticket: string;

  @ViewColumn()
  estadoticket: string;

  @ViewColumn()
  codigoventanilla: string;

  @ViewColumn()
  estadoventanilla: string;
}
