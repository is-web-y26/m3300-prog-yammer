import { MigrationInterface, QueryRunner } from "typeorm";

export class InitialMigration1747491765571 implements MigrationInterface {
    name = 'InitialMigration1747491765571'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "coupons" ALTER COLUMN "valid_from" SET DEFAULT '"2025-05-17T14:22:48.553Z"'`);
        await queryRunner.query(`ALTER TYPE "public"."payments_method_enum" RENAME TO "payments_method_enum_old"`);
        await queryRunner.query(`CREATE TYPE "public"."payments_method_enum" AS ENUM('mir', 'sbp', 't-pay', 'yandex-pay', 'yoomoney')`);
        await queryRunner.query(`ALTER TABLE "payments" ALTER COLUMN "method" TYPE "public"."payments_method_enum" USING "method"::"text"::"public"."payments_method_enum"`);
        await queryRunner.query(`DROP TYPE "public"."payments_method_enum_old"`);
        await queryRunner.query(`ALTER TABLE "players" ADD CONSTRAINT "UQ_b087be71894b730ec150a1ed458" UNIQUE ("nickname")`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "players" DROP CONSTRAINT "UQ_b087be71894b730ec150a1ed458"`);
        await queryRunner.query(`CREATE TYPE "public"."payments_method_enum_old" AS ENUM('card', 'mobile', 'sbp')`);
        await queryRunner.query(`ALTER TABLE "payments" ALTER COLUMN "method" TYPE "public"."payments_method_enum_old" USING "method"::"text"::"public"."payments_method_enum_old"`);
        await queryRunner.query(`DROP TYPE "public"."payments_method_enum"`);
        await queryRunner.query(`ALTER TYPE "public"."payments_method_enum_old" RENAME TO "payments_method_enum"`);
        await queryRunner.query(`ALTER TABLE "coupons" ALTER COLUMN "valid_from" SET DEFAULT '2025-05-17 05:54:09.835'`);
    }

}
