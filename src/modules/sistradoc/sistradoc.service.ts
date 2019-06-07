import { Injectable, Logger } from '@nestjs/common';
import * as request from 'request';

@Injectable()
export class SistradocService {
  url: string = 'http://192.168.10.207:3031/api/';
  private logger = new Logger( 'SistradocService' );
  constructor() {}

  async getAreas(): Promise< any > {
    const select = new Promise( async (resolve, reject) => {
      const areas = await request.get( `${ this.url }sistradoc/areas`, { json: true }, (err, res, body) => {
        if (err) { reject('Error en el GET AREAS'); }
        const { statusCode } = res;
        resolve({
          statusCode,
          method: 'GET',
          body,
        });
      });
    });
    return select;
  }
}
