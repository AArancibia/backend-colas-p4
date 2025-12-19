const dotenv = require('dotenv');
const environment = process.env.NODE_ENV;

dotenv.config({
  path: `${environment}.env`,
});

console.log(process.env.TYPEORM_NAME, process.env.TYPEORM_ENTITIES);

module.exports = {
  host: process.env.TYPEORM_HOST,
  port: process.env.TYPEORM_PORT,
  name: process.env.TYPEORM_NAME,
  type: process.env.TYPEORM_TYPE,
  username: process.env.TYPEORM_USERNAME,
  password: process.env.TYPEORM_PASSWORD,
  database: process.env.TYPEORM_DATABASE,
  synchronize: Boolean(process.env.TYPEORM_SYNCHRONIZE),
  logging: Boolean(process.env.TYPEORM_LOGGING),
  ssl: process.env.TYPEORM_SSL === "true",
  entities: process.env.TYPEORM_ENTITIES.split(',')
};
