import {MigrationInterface, QueryRunner} from "typeorm";

export class DetEstadoTicket1560018523053 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query(`ALTER TABLE "tb_ventanilla_estados_tb_estadoventanilla" DROP CONSTRAINT "FK_58088389538ea165d7c46efccde"`);
        await queryRunner.query(`ALTER TABLE "tb_ventanilla_estados_tb_estadoventanilla" DROP CONSTRAINT "FK_26e569019ee11987d214670e608"`);
        await queryRunner.query(`ALTER TABLE "tb_ticket_estados_tb_estadoticket" DROP CONSTRAINT "FK_248acd80531387cd96f38d656b2"`);
        await queryRunner.query(`ALTER TABLE "tb_ticket_estados_tb_estadoticket" DROP CONSTRAINT "FK_dd49963ef2ce198a4a700d43dff"`);
        await queryRunner.query(`ALTER TABLE "tb_administrado_docs_tb_tipodoc" DROP CONSTRAINT "FK_657ac9406360773a4c895d7117c"`);
        await queryRunner.query(`ALTER TABLE "tb_administrado_docs_tb_tipodoc" DROP CONSTRAINT "FK_a22b1f2f20ef84c973bb6c07fce"`);
        await queryRunner.query(`DROP INDEX "IDX_657ac9406360773a4c895d7117"`);
        await queryRunner.query(`DROP INDEX "IDX_a22b1f2f20ef84c973bb6c07fc"`);
        await queryRunner.query(`DROP INDEX "IDX_248acd80531387cd96f38d656b"`);
        await queryRunner.query(`DROP INDEX "IDX_dd49963ef2ce198a4a700d43df"`);
        await queryRunner.query(`DROP INDEX "IDX_58088389538ea165d7c46efccd"`);
        await queryRunner.query(`DROP INDEX "IDX_26e569019ee11987d214670e60"`);
        await queryRunner.query(`ALTER TABLE "tb_ventanilla_estados_tb_estadoventanilla" DROP COLUMN "fecha"`);
        await queryRunner.query(`ALTER TABLE "tb_ticket_estados_tb_estadoticket" DROP COLUMN "fecha"`);
        await queryRunner.query(`ALTER TABLE "tb_administrado_docs_tb_tipodoc" DROP COLUMN "nrodoc"`);
        await queryRunner.query(`ALTER TABLE "tb_administrado_docs_tb_tipodoc" ADD "nrodoc" character varying NOT NULL`);
        await queryRunner.query(`ALTER TABLE "tb_ticket_estados_tb_estadoticket" ADD "identificador" uuid NOT NULL`);
        await queryRunner.query(`ALTER TABLE "tb_ticket_estados_tb_estadoticket" ADD "fecha" TIMESTAMP NOT NULL DEFAULT '"2019-06-08T18:28:48.008Z"'`);
        await queryRunner.query(`ALTER TABLE "tb_ventanilla_estados_tb_estadoventanilla" ADD "fecha" date NOT NULL DEFAULT '"2019-06-08T18:28:48.019Z"'`);
        await queryRunner.query(`ALTER TABLE "tb_ticket" ALTER COLUMN "fecha" SET DEFAULT '"2019-06-08T18:28:43.559Z"'`);
        await queryRunner.query(`CREATE SEQUENCE "tb_ticket_estados_tb_estadoticket_tbEstadoticketId_seq" OWNED BY "tb_ticket_estados_tb_estadoticket"."tbEstadoticketId"`);
        //await queryRunner.query(`ALTER TABLE "tb_ticket_estados_tb_estadoticket" ALTER COLUMN "tbEstadoticketId" SET DEFAULT nextval('tb_ticket_estados_tb_estadoticket_tbEstadoticketId_seq')`);
        await queryRunner.query(`CREATE INDEX "IDX_58088389538ea165d7c46efccd" ON "tb_ventanilla_estados_tb_estadoventanilla" ("tbVentanillaId") `);
        await queryRunner.query(`CREATE INDEX "IDX_26e569019ee11987d214670e60" ON "tb_ventanilla_estados_tb_estadoventanilla" ("tbEstadoventanillaId") `);
        await queryRunner.query(`CREATE INDEX "IDX_248acd80531387cd96f38d656b" ON "tb_ticket_estados_tb_estadoticket" ("tbTicketId") `);
        await queryRunner.query(`CREATE INDEX "IDX_dd49963ef2ce198a4a700d43df" ON "tb_ticket_estados_tb_estadoticket" ("tbEstadoticketId") `);
        await queryRunner.query(`CREATE INDEX "IDX_657ac9406360773a4c895d7117" ON "tb_administrado_docs_tb_tipodoc" ("tbAdministradoId") `);
        await queryRunner.query(`CREATE INDEX "IDX_a22b1f2f20ef84c973bb6c07fc" ON "tb_administrado_docs_tb_tipodoc" ("tbTipodocId") `);
        await queryRunner.query(`ALTER TABLE "tb_administrado_docs_tb_tipodoc" ADD CONSTRAINT "FK_657ac9406360773a4c895d7117c" FOREIGN KEY ("tbAdministradoId") REFERENCES "tb_administrado"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "tb_administrado_docs_tb_tipodoc" ADD CONSTRAINT "FK_a22b1f2f20ef84c973bb6c07fce" FOREIGN KEY ("tbTipodocId") REFERENCES "tb_tipodoc"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "tb_ticket_estados_tb_estadoticket" ADD CONSTRAINT "FK_248acd80531387cd96f38d656b2" FOREIGN KEY ("tbTicketId") REFERENCES "tb_ticket"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "tb_ticket_estados_tb_estadoticket" ADD CONSTRAINT "FK_dd49963ef2ce198a4a700d43dff" FOREIGN KEY ("tbEstadoticketId") REFERENCES "tb_estadoticket"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "tb_ventanilla_estados_tb_estadoventanilla" ADD CONSTRAINT "FK_58088389538ea165d7c46efccde" FOREIGN KEY ("tbVentanillaId") REFERENCES "tb_ventanilla"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "tb_ventanilla_estados_tb_estadoventanilla" ADD CONSTRAINT "FK_26e569019ee11987d214670e608" FOREIGN KEY ("tbEstadoventanillaId") REFERENCES "tb_estadoventanilla"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "tb_ticket_estados_tb_estadoticket" ADD PRIMARY KEY ("identificador", "tbEstadoticketId", "tbTicketId" )`);
    }

    public async down(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query(`ALTER TABLE "tb_ventanilla_estados_tb_estadoventanilla" DROP CONSTRAINT "FK_26e569019ee11987d214670e608"`);
        await queryRunner.query(`ALTER TABLE "tb_ventanilla_estados_tb_estadoventanilla" DROP CONSTRAINT "FK_58088389538ea165d7c46efccde"`);
        await queryRunner.query(`ALTER TABLE "tb_ticket_estados_tb_estadoticket" DROP CONSTRAINT "FK_dd49963ef2ce198a4a700d43dff"`);
        await queryRunner.query(`ALTER TABLE "tb_ticket_estados_tb_estadoticket" DROP CONSTRAINT "FK_248acd80531387cd96f38d656b2"`);
        await queryRunner.query(`ALTER TABLE "tb_administrado_docs_tb_tipodoc" DROP CONSTRAINT "FK_a22b1f2f20ef84c973bb6c07fce"`);
        await queryRunner.query(`ALTER TABLE "tb_administrado_docs_tb_tipodoc" DROP CONSTRAINT "FK_657ac9406360773a4c895d7117c"`);
        await queryRunner.query(`DROP INDEX "IDX_a22b1f2f20ef84c973bb6c07fc"`);
        await queryRunner.query(`DROP INDEX "IDX_657ac9406360773a4c895d7117"`);
        await queryRunner.query(`DROP INDEX "IDX_dd49963ef2ce198a4a700d43df"`);
        await queryRunner.query(`DROP INDEX "IDX_248acd80531387cd96f38d656b"`);
        await queryRunner.query(`DROP INDEX "IDX_26e569019ee11987d214670e60"`);
        await queryRunner.query(`DROP INDEX "IDX_58088389538ea165d7c46efccd"`);
        await queryRunner.query(`ALTER TABLE "tb_ticket_estados_tb_estadoticket" ALTER COLUMN "tbEstadoticketId" DROP DEFAULT`);
        await queryRunner.query(`DROP SEQUENCE "tb_ticket_estados_tb_estadoticket_tbEstadoticketId_seq"`);
        await queryRunner.query(`ALTER TABLE "tb_ticket" ALTER COLUMN "fecha" SET DEFAULT '2019-06-08'`);
        await queryRunner.query(`ALTER TABLE "tb_ventanilla_estados_tb_estadoventanilla" DROP COLUMN "fecha"`);
        await queryRunner.query(`ALTER TABLE "tb_ticket_estados_tb_estadoticket" DROP COLUMN "fecha"`);
        await queryRunner.query(`ALTER TABLE "tb_ticket_estados_tb_estadoticket" DROP COLUMN "identificador"`);
        await queryRunner.query(`ALTER TABLE "tb_administrado_docs_tb_tipodoc" DROP COLUMN "nrodoc"`);
        await queryRunner.query(`ALTER TABLE "tb_administrado_docs_tb_tipodoc" ADD "nrodoc" character varying NOT NULL`);
        await queryRunner.query(`ALTER TABLE "tb_ticket_estados_tb_estadoticket" ADD "fecha" TIMESTAMP NOT NULL DEFAULT '2019-06-08 18:27:48.17'`);
        await queryRunner.query(`ALTER TABLE "tb_ventanilla_estados_tb_estadoventanilla" ADD "fecha" date NOT NULL DEFAULT '2019-06-08'`);
        await queryRunner.query(`CREATE INDEX "IDX_26e569019ee11987d214670e60" ON "tb_ventanilla_estados_tb_estadoventanilla" ("tbEstadoventanillaId") `);
        await queryRunner.query(`CREATE INDEX "IDX_58088389538ea165d7c46efccd" ON "tb_ventanilla_estados_tb_estadoventanilla" ("tbVentanillaId") `);
        await queryRunner.query(`CREATE INDEX "IDX_dd49963ef2ce198a4a700d43df" ON "tb_ticket_estados_tb_estadoticket" ("tbEstadoticketId") `);
        await queryRunner.query(`CREATE INDEX "IDX_248acd80531387cd96f38d656b" ON "tb_ticket_estados_tb_estadoticket" ("tbTicketId") `);
        await queryRunner.query(`CREATE INDEX "IDX_a22b1f2f20ef84c973bb6c07fc" ON "tb_administrado_docs_tb_tipodoc" ("tbTipodocId") `);
        await queryRunner.query(`CREATE INDEX "IDX_657ac9406360773a4c895d7117" ON "tb_administrado_docs_tb_tipodoc" ("tbAdministradoId") `);
        await queryRunner.query(`ALTER TABLE "tb_administrado_docs_tb_tipodoc" ADD CONSTRAINT "FK_a22b1f2f20ef84c973bb6c07fce" FOREIGN KEY ("tbTipodocId") REFERENCES "tb_tipodoc"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "tb_administrado_docs_tb_tipodoc" ADD CONSTRAINT "FK_657ac9406360773a4c895d7117c" FOREIGN KEY ("tbAdministradoId") REFERENCES "tb_administrado"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "tb_ticket_estados_tb_estadoticket" ADD CONSTRAINT "FK_dd49963ef2ce198a4a700d43dff" FOREIGN KEY ("tbEstadoticketId") REFERENCES "tb_estadoticket"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "tb_ticket_estados_tb_estadoticket" ADD CONSTRAINT "FK_248acd80531387cd96f38d656b2" FOREIGN KEY ("tbTicketId") REFERENCES "tb_ticket"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "tb_ventanilla_estados_tb_estadoventanilla" ADD CONSTRAINT "FK_26e569019ee11987d214670e608" FOREIGN KEY ("tbEstadoventanillaId") REFERENCES "tb_estadoventanilla"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "tb_ventanilla_estados_tb_estadoventanilla" ADD CONSTRAINT "FK_58088389538ea165d7c46efccde" FOREIGN KEY ("tbVentanillaId") REFERENCES "tb_ventanilla"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

}
