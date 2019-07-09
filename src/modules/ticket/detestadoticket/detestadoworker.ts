import { formatFechaLarga, formatHora } from '../../../shared/utils';
import { Detestadoticket } from './detestadoticket.entity';

module.exports = function( ticket: Detestadoticket, done) {
  setTimeout(() => {
    ticket.fecha = formatHora( ticket.fecha );
    done( ticket );
  },  10000 );//108000 -- 1800000
};
