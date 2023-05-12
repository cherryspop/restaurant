import { MigrationInterface, QueryRunner, TableColumn } from 'typeorm';

export class Dishes1682942649004 implements MigrationInterface {
  name = 'Dishes1682942649004';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.addColumn(
      'dish',
      new TableColumn({
        name: 'sale',
        type: 'int',
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "dish" ADD "aaaa" integer`);
    await queryRunner.addColumn(
      'dish',
      new TableColumn({
        name: 'aaaa',
        type: 'int',
      }),
    );
  }
}
