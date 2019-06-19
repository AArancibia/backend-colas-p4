import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TicketController } from './ticket.controller';
import { TicketService } from './ticket.service';
import { TipoticketModule } from './tipoticket/tipoticket.module';
import { EstadoticketModule } from './estadoticket/estadoticket.module';
import { DetestadoticketModule } from './detestadoticket/detestadoticket.module';
import { Ticket } from './ticket.entity';
import { Estado } from './estadoticket/estadoticket.entity';
import { Tipoticket } from './tipoticket/tipoticket.entity';
import { Administrado } from '../administrado/administrado.entity';
import { TicketGateway } from '../../gateways/ticket.gateway';
import { Ventanilla } from '../ventanilla/ventanilla.entity';
import { VentanillaService } from '../ventanilla/ventanilla.service';
import { VentanillaModule } from '../ventanilla/ventanilla.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([ Ticket, Estado, Tipoticket, Administrado, Ventanilla ]),
    TipoticketModule,
    EstadoticketModule,
    DetestadoticketModule,
    VentanillaModule,
  ],
  controllers: [TicketController],
  providers: [
    VentanillaService,
    TicketService,
    TicketGateway,
  ],
})
export class TicketModule {}
