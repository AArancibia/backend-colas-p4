/*
    CONSULTA PARA OBTENER ULTIMO ESTADO DE VENTANILLA JUNTO CON EL TICKET QUE ESTA ATENDIENDO
*/

CREATE VIEW ULTIMOESTADOVENTANILLA AS
SELECT R1.*,R2.* FROM
( SELECT 
		tb_ventanilla.id as id,
		tb_ventanilla.codigo_ventanilla,
		tb_ventanilla.ubicacion,
		tb_ventanilla.idusuario,
		tb_ventanilla.tipoatencion,
		t1."tbVentanillaId",
		t1."tbEstadoventanillaId",
		t1."identificador",
		t1."fecha"
		FROM tb_ventanilla
		left outer JOIN ( select * from tb_ventanilla_estados_tb_estadoventanilla where fecha = CURRENT_DATE )  t1 
			ON tb_ventanilla."id" = t1."tbVentanillaId" ) as R2								 
	 left outer join 
( select 
		ticket.id as idticket,
		ticket.idtematica,
		ticket.idtramite,
		ticket.idventanilla,
		ticket.codigo,
		ticket.fecha as fechaticket,
		ticket.urgente,
		ticket.preferencial,
		ticket.idtipoticket,
		ticket.idadministrado
	from ticket_estados_estadoticket t1
	inner join ticket
	on ticket.id = t1."ticketId"
	where t1.fecha = ( select max( fecha ) 
								from ticket_estados_estadoticket  t2
								where t1."ticketId" = t2."ticketId" ) and
									 t1."estadoticketId" in ( 2, 3) 
								AND t1."fecha" = CURRENT_DATE
									 ) as R1
					on R1.idventanilla = R2."tbVentanillaId"
					order by R2.codigo_ventanilla