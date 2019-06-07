import * as moment from 'moment';

export const formatFechaCorta = ( fecha?: any ) => {
  const fechaFormateada =  moment( fecha ? fecha : new Date() ).format( 'YYYY-MM-DD');
  return fechaFormateada;
};

export const formatFechaLarga = ( fecha?: any ) => {
  const fechaFormateada =  moment( fecha ? fecha : new Date() ).format( 'YYYY-MM-DD T HH:mm:SS');
  return fechaFormateada;
};

export const formatHora = ( fecha?: any ) => {
  const fechaFormateada =  moment( fecha ? fecha : new Date() ).format( 'HH:mm:SS');
  return fechaFormateada;
};
