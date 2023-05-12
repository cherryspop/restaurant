import { MigrationInterface, QueryRunner } from 'typeorm';

export class Dishes1682942380160 implements MigrationInterface {
  name = 'Dishes1682942380160';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "dish" DROP COLUMN "aaaa"`);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "dish" ADD "aaaa" integer`);
  }
}
