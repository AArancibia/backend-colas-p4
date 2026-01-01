import {config} from 'dotenv';
import { TypeOrmModuleOptions } from '@nestjs/typeorm';
const environment = process.env.NODE_ENV;

config({
  path: `${environment}.env`,
});

export const dbOptions: TypeOrmModuleOptions = {
  host: process.env.TYPEORM_HOST,
  port: Number(process.env.TYPEORM_PORT),
  type: 'postgres',
  username: process.env.TYPEORM_USERNAME,
  password: process.env.TYPEORM_PASSWORD,
  database: process.env.TYPEORM_DATABASE,
  synchronize: Boolean(process.env.TYPEORM_SYNCHRONIZE),
  logging: Boolean(process.env.TYPEORM_LOGGING),
  ssl: {
    rejectUnauthorized: false,
  },
  autoLoadEntities: true,
};
