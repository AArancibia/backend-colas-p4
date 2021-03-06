import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TicketModule } from './modules/ticket/ticket.module';
import { VentanillaModule } from './modules/ventanilla/ventanilla.module';
import { UsuarioModule } from './modules/usuario/usuario.module';
import { AdministradoModule } from './modules/administrado/administrado.module';
import { SistradocModule } from './modules/sistradoc/sistradoc.module';
import { ContribuyenteModule } from './modules/rentas/contribuyente/contribuyente.module';
import { SocketGateway } from './gateways/socket.gateway';

@Module({
  imports: [
    TypeOrmModule.forRoot(),
    TicketModule,
    VentanillaModule,
    UsuarioModule,
    AdministradoModule,
    SistradocModule,
    ContribuyenteModule,
    SocketGateway,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
