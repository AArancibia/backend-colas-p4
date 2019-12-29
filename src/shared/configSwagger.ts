import { DocumentBuilder } from '@nestjs/swagger';
//import * as dotenv from 'dotenv';
import * as fs from 'fs';

const dotenv = require('dotenv');
const environment = process.env.NODE_ENV;

dotenv.config({
  path: `${environment}.env`,
});

//const data = dotenv.parse( fs.readFileSync(`${environment}.env`) );
const PORT = process.env.PORT;

export const swaggerBaseConfig = new DocumentBuilder()
  .setTitle('API REST - Proyecto Colas - Municipalidad de Villa El Salvador')
  .setDescription(
    'Aquí se encuentran todos los servicios del proyecto de Colas de la MuniVES',
  )
  .setVersion('1.0.0')
  .setHost(String(`http://localhost:${PORT}`).split('//')[1])
  .setBasePath('/api')
  //.addTag( 'Colas', 'Proyecto' )
  //.addTag( 'NestJS', 'Framework')
  .build();
