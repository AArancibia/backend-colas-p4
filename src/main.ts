import 'dotenv/config';
import { NestFactory } from '@nestjs/core';
import { Logger } from '@nestjs/common';
import { SwaggerModule } from '@nestjs/swagger';
import { AppModule } from './app.module';
import { swaggerBaseConfig } from './shared/configSwagger';
import { cargarConfiguracion } from './shared/loadenv';
import 'moment/locale/es-us';

const data = cargarConfiguracion();
const PORT = data.PORT;

async function bootstrap() {
  const app = await NestFactory.create( AppModule );
  const environment = process.env.NODE_ENV;
  if ( environment === 'development' ) {
    const document = SwaggerModule.createDocument( app, swaggerBaseConfig );
    app.use('/api/docs/swagger.json', ( req, res ) => {
      res.send( document );
    });
    SwaggerModule.setup( '/docs', app, null, {
      swaggerUrl: `http://localhost:${ PORT }/api/docs/swagger.json`,
      explorer: true,
      swaggerOptions: {
        docExpansion: 'list',
        filter: true,
        showRequestDuration: true,
      },
    });
  }
  app.setGlobalPrefix( 'api' );
  app.enableCors();
  await app.listen( PORT, '0.0.0.0' );
  Logger.log(`Server running on http://localhost:${ PORT }/api`, 'Bootstrap');
}
bootstrap();
