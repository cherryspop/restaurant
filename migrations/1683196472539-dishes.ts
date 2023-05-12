import { MigrationInterface, QueryRunner, Table } from 'typeorm';

export class Dishes1683196472539 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('dishes');
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'dishes',
        columns: [
          {
            name: 'id',
            type: 'int',
            isPrimary: true,
          },
          {
            name: 'title',
            type: 'varchar',
          },
          {
            name: 'photo',
            type: 'varchar',
          },
          {
            name: 'price',
            type: 'int',
          },
          {
            name: 'category_id',
            type: 'boolean',
          },
        ],
      }),
      true,
    );
  }
}
