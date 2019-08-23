import {
  WebSocketGateway,
  OnGatewayConnection,
  OnGatewayDisconnect,
} from '@nestjs/websockets';
import { Logger } from '@nestjs/common';

@WebSocketGateway(8081, {
  //transports: ['websocket'],
})
export class SocketGateway implements OnGatewayConnection, OnGatewayDisconnect {
  logger = new Logger('WebSocketsGateway');
  constructor() {}

  async handleConnection(client: any, ...args) {
    this.logger.log(client.id);
    client.emit('connection', {
      idClient: client.id,
    });
  }

  handleDisconnect(client: any): any {
    this.logger.log(`${client.id}`);
  }
}
