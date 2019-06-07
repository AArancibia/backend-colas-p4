import * as dotenv from 'dotenv';
import * as fs from 'fs';
const environment = process.env.NODE_ENV;

export const cargarConfiguracion = () => {
  const data = dotenv.parse( fs.readFileSync(`${environment}.env`) );
  return data;
};
