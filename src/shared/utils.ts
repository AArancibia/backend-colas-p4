import * as moment from 'moment-timezone';

export const formatFechaCorta = ( fecha?: any ) => {
  const fechaFormateada =  moment( fecha ? fecha : new Date() ).tz('America/Lima').format( 'YYYY-MM-DD');
  return fechaFormateada;
};

export const formatFechaLarga = ( fecha?: any ) => {
  const fechaFormateada =  moment( fecha ? fecha : new Date() ).tz('America/Lima').format( 'YYYY-MM-DD HH:mm:ss:SSS');
  return fechaFormateada;
};

export const formatHora = ( fecha?: any ) => {
  const fechaFormateada =  moment( fecha ? fecha : new Date() ).tz('America/Lima').format( 'HH:mm:SS');
  return fechaFormateada;
};
