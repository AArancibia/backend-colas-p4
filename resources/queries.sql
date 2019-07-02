/*
    CONSULTA PARA OBTENER ULTIMO ESTADO DE VENTANILLA JUNTO CON EL TICKET QUE ESTA ATENDIENDO
*/

select R1.codigo, R1."estadoticketId", R2.codigo_ventanilla, R2."tbEstadoventanillaId" from
( SELECT * FROM tb_ventanilla
		left outer JOIN  tb_ventanilla_estados_tb_estadoventanilla t1
			ON tb_ventanilla."id" = t1."tbVentanillaId"
		WHERE
				t1.fecha =
					(SELECT max( fecha ) FROM tb_ventanilla_estados_tb_estadoventanilla t2
					WHERE t1."tbVentanillaId" = t2."tbVentanillaId") or t1."tbEstadoventanillaId" is null ) as R2
	 left outer join
( select * from ticket_estados_estadoticket t1
inner join ticket
on ticket.id = t1."ticketId"
where t1.fecha = ( select max( fecha )
									 from ticket_estados_estadoticket  t2
									 where t1."ticketId" = t2."ticketId" ) and
									 t1."estadoticketId" in ( 2, 3) ) as R1
					on R1.idventanilla = R2."tbVentanillaId"
