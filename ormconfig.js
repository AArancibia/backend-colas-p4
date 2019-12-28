const dotenv = require('dotenv');
const environment = process.env.NODE_ENV;

dotenv.config({
  path: `${environment}.env`,
});

module.exports = {
  host: process.env.TYPEORM_HOST,
  name: process.env.TYPEORM_NAME,
  type: process.env.TYPEORM_TYPE,
  username: process.env.TYPEORM_USERNAME,
  password: process.env.TYPEORM_PASSWORD,
  database: process.env.TYPEORM_DATABASE,
  synchronize: true, //Boolean( data.TYPEORM_SYNCHRONIZE ),
  logging: Boolean(process.env.TYPEORM_LOGGING),
  entities: process.env.TYPEORM_ENTITIES.split(','),
  /*"migrationsRun": true,
  "migrations": ["./src/migrations/!**!/!*.ts"],
  "cli": {
    "entitiesDir": "./src/!**!/!*.entity.ts",
    "migrationsDir": "./src/migrations",
  },*/
};
