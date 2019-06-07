const dotenv = require( "dotenv" );
const fs = require( "fs" );
const environment = process.env.NODE_ENV;
const data = dotenv.parse( fs.readFileSync(`${environment}.env`) );

module.exports = {
  "host": data.TYPEORM_HOST,
  "name": data.TYPEORM_NAME,
  "type": data.TYPEORM_TYPE,
  "username": data.TYPEORM_USERNAME,
  "password": data.TYPEORM_PASSWORD,
  "database": data.TYPEORM_DATABASE,
  "synchronize": Boolean( data.TYPEORM_SYNCHRONIZE ),
  "logging": Boolean( data.TYPEORM_LOGGING ),
  "entities": data.TYPEORM_ENTITIES.split( "," ),
};
