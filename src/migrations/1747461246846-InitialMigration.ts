import { MigrationInterface, QueryRunner } from "typeorm";

export class InitialMigration1747461246846 implements MigrationInterface {
    name = 'InitialMigration1747461246846'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "categories" ("id" SERIAL NOT NULL, "name" character varying NOT NULL, "server_name" character varying NOT NULL, CONSTRAINT "PK_24dbc6126a28ff948da33e97d3b" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "subcategories" ("id" SERIAL NOT NULL, "name" character varying NOT NULL, "give_command" character varying NOT NULL, "category_id" integer, CONSTRAINT "PK_793ef34ad0a3f86f09d4837007c" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "products" ("id" SERIAL NOT NULL, "name" character varying NOT NULL, "price" numeric NOT NULL, "description" character varying NOT NULL, "image_url" character varying, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "name_for_command" character varying NOT NULL, "subcategory_id" integer, CONSTRAINT "PK_0806c755e0aca124e67c0cf6d7d" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "coupons" ("id" SERIAL NOT NULL, "code" character varying NOT NULL, "discount" numeric NOT NULL, "count" numeric, "valid_from" TIMESTAMP NOT NULL DEFAULT '"2025-05-17T05:54:09.835Z"', "valid_to" TIMESTAMP NOT NULL, "active" boolean NOT NULL DEFAULT true, "player_owner_id" integer, CONSTRAINT "PK_d7ea8864a0150183770f3e9a8cb" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "payments" ("id" SERIAL NOT NULL, "amount" numeric NOT NULL, "status" "public"."payments_status_enum" NOT NULL DEFAULT 'waiting', "method" "public"."payments_method_enum" NOT NULL, "url" character varying NOT NULL, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "player_id" integer, "coupon_id" integer, "product_id" integer, CONSTRAINT "PK_197ab7af18c93fbb0c9b28b4a59" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "players" ("id" SERIAL NOT NULL, "nickname" character varying NOT NULL, "created_at" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "PK_de22b8fdeee0c33ab55ae71da3b" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "subcategories" ADD CONSTRAINT "FK_f7b015bc580ae5179ba5a4f42ec" FOREIGN KEY ("category_id") REFERENCES "categories"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "products" ADD CONSTRAINT "FK_c9de3a8edea9269ca774c919b9a" FOREIGN KEY ("subcategory_id") REFERENCES "subcategories"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "coupons" ADD CONSTRAINT "FK_3f742fc09529dedbbb6995f87e8" FOREIGN KEY ("player_owner_id") REFERENCES "players"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "payments" ADD CONSTRAINT "FK_941ea5e223f5e8869d18109e7cd" FOREIGN KEY ("player_id") REFERENCES "players"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "payments" ADD CONSTRAINT "FK_8aee881c0faac11e56c2bb8f282" FOREIGN KEY ("coupon_id") REFERENCES "coupons"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "payments" ADD CONSTRAINT "FK_ef30ea229dfffb9b2cda92155fe" FOREIGN KEY ("product_id") REFERENCES "products"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "payments" DROP CONSTRAINT "FK_ef30ea229dfffb9b2cda92155fe"`);
        await queryRunner.query(`ALTER TABLE "payments" DROP CONSTRAINT "FK_8aee881c0faac11e56c2bb8f282"`);
        await queryRunner.query(`ALTER TABLE "payments" DROP CONSTRAINT "FK_941ea5e223f5e8869d18109e7cd"`);
        await queryRunner.query(`ALTER TABLE "coupons" DROP CONSTRAINT "FK_3f742fc09529dedbbb6995f87e8"`);
        await queryRunner.query(`ALTER TABLE "products" DROP CONSTRAINT "FK_c9de3a8edea9269ca774c919b9a"`);
        await queryRunner.query(`ALTER TABLE "subcategories" DROP CONSTRAINT "FK_f7b015bc580ae5179ba5a4f42ec"`);
        await queryRunner.query(`DROP TABLE "players"`);
        await queryRunner.query(`DROP TABLE "payments"`);
        await queryRunner.query(`DROP TABLE "coupons"`);
        await queryRunner.query(`DROP TABLE "products"`);
        await queryRunner.query(`DROP TABLE "subcategories"`);
        await queryRunner.query(`DROP TABLE "categories"`);
    }

}
