import {
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
} from '@nestjs/websockets';
import { Logger } from '@nestjs/common';
import { DataSource, Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { formatFechaCorta } from '../shared/utils';
import { Ticket } from '../modules/ticket/ticket.entity';
import { Detestadoticket } from '../modules/ticket/detestadoticket/detestadoticket.entity';
import * as moment from 'moment';

@WebSocketGateway(0, {
  namespace: 'ticket',
  cors: {
    origin: process.env.CLIENT_URL || 'http://localhost:4200',
    credentials: true,
  },
})
export class TicketGateway {
  logger = new Logger('WebSocketsTicket');
  @WebSocketServer()
  ws: any;
  constructor(
    @InjectRepository(Ticket) private ticketRepository: Repository<Ticket>,
    @InjectRepository(Detestadoticket)
    private detestadoRepository: Repository<Detestadoticket>,
    private readonly dataSource: DataSource,
  ) {}

  @SubscribeMessage('[TICKET] Lista')
  async listarTickets(client, data): Promise<any> {
    const tickets = await this.ticketRepository.find({
      relations: ['administrado', 'detEstados', 'tipoTicket'],
      where: {
        fechacorta: formatFechaCorta(),
      },
      order: { fecha: 'ASC' },
    });
    const ticketsRO: Ticket[] = [];
    tickets.map(ticket => {
      ticket.detEstados.sort(
        (a, b) => new Date(b.fecha).getTime() - new Date(a.fecha).getTime(),
      );
      const ultimoEstado = ticket.detEstados[0]?.estadoticketId || -1;
      if (ultimoEstado === 4 || ultimoEstado === 6) {
        return;
      }
      ticketsRO.push(ticket);
    });
    return ticketsRO;
  }

  @SubscribeMessage('[TICKET] LLAMARTICKET')
  async llamadaTickets() {
    const tickets = await this.dataSource.manager.query(
      `select * from ULTIMOESTADOTICKET`,
    );
    const ultimoEstado = [];
    tickets.map((item, index, array) => {
      const {
        idticket,
        idtematica,
        idtramite,
        codigo,
        correlativo,
        urgente,
        fecha,
        fechacorta,
        idventanilla,
        idtipoticket,
        idadministrado,
        preferencial,
        estadoticketId,
        ticketId,
        identificador,
        detallefecha,
        administradoid,
        nrodoc,
        nombre,
        apepat,
        apemat,
        idcontribuyente,
      } = item;
      const elemento = {
        estadoticketId,
        ticketId,
        identificador,
        fecha: detallefecha,
        ticket: {
          id: idticket,
          idtematica,
          idtramite,
          codigo,
          correlativo,
          urgente,
          fecha,
          idventanilla,
          idtipoticket,
          idadministrado,
          preferencial,
          fechacorta,
          administrado: {
            id: administradoid,
            nrodoc,
            nombre,
            apepat,
            apemat,
            idcontribuyente,
          },
        },
      };
      ultimoEstado.push(elemento);
    });
    return ultimoEstado;
  }

  @SubscribeMessage('[TICKET] DETESTADO')
  async getDetEstadoTicket() {
    const fecha2 = moment(formatFechaCorta())
      .add('days', 1)
      .format('YYYY-MM-DD');
    const qb = await this.detestadoRepository.createQueryBuilder('t1');
    const detTickets = qb
      .innerJoinAndSelect('t1.ticket', 'ticket') // Ticket , 'ticket', 'ticket.id = t1.ticketId'
      .where(sq => {
        const subQuery = qb
          .subQuery()
          .select('max( fecha )')
          .from(Detestadoticket, 't2')
          .where('t1.ticketId = t2.ticketId')
          .getQuery();
        return 't1.fecha = ' + subQuery;
      })
      .andWhere(' t1.fecha between :fec1 and :fec2 ', {
        fec1: `${formatFechaCorta()} ` + '00:00:00',
        fec2: `${fecha2} ` + '00:00:00',
      })
      .getMany();
    return detTickets;
  }
}
