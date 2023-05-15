import { MigrationInterface, QueryRunner } from 'typeorm';

export class Dish1684147015627 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "dish" RENAME COLUMN "category_id" TO "categoryId"`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "dish" RENAME COLUMN "categoryId" TO "category_id"`,
    );
  }
}
