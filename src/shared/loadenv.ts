//import * as dotenv from 'dotenv';
import * as fs from 'fs';
const dotenv = require('dotenv');
const environment = process.env.NODE_ENV;

dotenv.config({
  path: `${environment}.env`,
});

export const cargarConfiguracion = () => {
  const data = dotenv.parse(fs.readFileSync(`${environment}.env`));
  return data;
};
