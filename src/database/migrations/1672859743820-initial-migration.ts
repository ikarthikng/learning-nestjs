import { MigrationInterface, QueryRunner } from "typeorm";

export class initialMigration1672859743820 implements MigrationInterface {
    name = 'initialMigration1672859743820'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "User" ("id" integer PRIMARY KEY AUTOINCREMENT NOT NULL, "email" varchar NOT NULL, "password" varchar NOT NULL, "admin" boolean NOT NULL DEFAULT (1))`);
        await queryRunner.query(`CREATE TABLE "Report" ("id" integer PRIMARY KEY AUTOINCREMENT NOT NULL, "approved" boolean NOT NULL DEFAULT (0), "price" integer NOT NULL, "make" varchar NOT NULL, "model" varchar NOT NULL, "year" integer NOT NULL, "lng" integer NOT NULL, "lat" integer NOT NULL, "mileage" integer NOT NULL, "userId" integer)`);
        await queryRunner.query(`CREATE TABLE "temporary_Report" ("id" integer PRIMARY KEY AUTOINCREMENT NOT NULL, "approved" boolean NOT NULL DEFAULT (0), "price" integer NOT NULL, "make" varchar NOT NULL, "model" varchar NOT NULL, "year" integer NOT NULL, "lng" integer NOT NULL, "lat" integer NOT NULL, "mileage" integer NOT NULL, "userId" integer, CONSTRAINT "FK_abc8ce53e6ef1567f06400344fd" FOREIGN KEY ("userId") REFERENCES "User" ("id") ON DELETE NO ACTION ON UPDATE NO ACTION)`);
        await queryRunner.query(`INSERT INTO "temporary_Report"("id", "approved", "price", "make", "model", "year", "lng", "lat", "mileage", "userId") SELECT "id", "approved", "price", "make", "model", "year", "lng", "lat", "mileage", "userId" FROM "Report"`);
        await queryRunner.query(`DROP TABLE "Report"`);
        await queryRunner.query(`ALTER TABLE "temporary_Report" RENAME TO "Report"`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "Report" RENAME TO "temporary_Report"`);
        await queryRunner.query(`CREATE TABLE "Report" ("id" integer PRIMARY KEY AUTOINCREMENT NOT NULL, "approved" boolean NOT NULL DEFAULT (0), "price" integer NOT NULL, "make" varchar NOT NULL, "model" varchar NOT NULL, "year" integer NOT NULL, "lng" integer NOT NULL, "lat" integer NOT NULL, "mileage" integer NOT NULL, "userId" integer)`);
        await queryRunner.query(`INSERT INTO "Report"("id", "approved", "price", "make", "model", "year", "lng", "lat", "mileage", "userId") SELECT "id", "approved", "price", "make", "model", "year", "lng", "lat", "mileage", "userId" FROM "temporary_Report"`);
        await queryRunner.query(`DROP TABLE "temporary_Report"`);
        await queryRunner.query(`DROP TABLE "Report"`);
        await queryRunner.query(`DROP TABLE "User"`);
    }

}
