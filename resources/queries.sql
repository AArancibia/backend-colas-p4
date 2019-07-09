/*
        INGRESAR REGISTROS

*/
INSERT INTO estadoticket ( nombre, abr ) VALUES  ( 'Atendiendo','A' ),
('Atendido','AT'), ('Derivado','D'), ('Inatendido','I');

INSERT INTO tb_tipoticket ( descripcion, abr ) VALUES ( 'Tramite', 'T'), ( 'Orientación', 'O');

INSERT INTO tb_estadoventanilla ( descripcion ) VALUES ('Llamando'), ('Atendiendo'), ('Activo'), ('Inactivo');

INSERT INTO tb_usuario (username, password, estado, idpersonal)
											VALUES ('losorio', '123456', DEFAULT , 13),
											('msanti', '123456', DEFAULT , 18),
											('sujey', '123456', DEFAULT , 11);

INSERT INTO tb_ventanilla ( codigoventanilla, tipoatencion, ubicacion, idusuario )
													VALUES ('V-1','T', 'Palacio Municipal', 1),
													('V-2','T', 'Palacio Municipal', 2),
													('V-3','T', 'Palacio Municipal', 3);



/*
    CONSULTA PARA OBTENER ULTIMO ESTADO DE VENTANILLA JUNTO CON EL TICKET QUE ESTA ATENDIENDO
*/
CREATE VIEW ULTIMOESTADOVENTANILLA AS
SELECT R1.*,R2.* FROM
( SELECT
		tb_ventanilla.id as id,
		tb_ventanilla.codigoventanilla,
		tb_ventanilla.ubicacion,
		tb_ventanilla.idusuario,
		tb_ventanilla.tipoatencion,
		t1."tbVentanillaId",
		t1."tbEstadoventanillaId",
		t1."identificador",
		t1."fecha"
		FROM tb_ventanilla
		left outer JOIN (
					select  DISTINCT ON ("tbVentanillaId") * from tb_ventanilla_estados_tb_estadoventanilla
						where fecha
						BETWEEN CURRENT_DATE and CURRENT_DATE + INTERVAL '1 day'
						order by "tbVentanillaId", fecha desc
		)  t1
			ON tb_ventanilla."id" = t1."tbVentanillaId"
		) as R2
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
										 AND t1."fecha" BETWEEN CURRENT_DATE and CURRENT_DATE + INTERVAL '1 day'
									 ) as R1
					on R1.idventanilla = R2."tbVentanillaId"
					order by R2.codigoventanilla
