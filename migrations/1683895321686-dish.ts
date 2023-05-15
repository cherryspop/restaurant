import {
  MigrationInterface,
  QueryRunner,
  TableColumn,
  TableForeignKey,
} from 'typeorm';

export class Dish1683895321686 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.changeColumn(
      'dish',
      'category_id',
      new TableColumn({
        name: 'category_id',
        type: 'int',
        default: 1,
        isNullable: false,
      }),
    );

    await queryRunner.createForeignKey(
      'dish',
      new TableForeignKey({
        columnNames: ['category_id'],
        referencedColumnNames: ['id'],
        referencedTableName: 'category',
        onDelete: 'CASCADE',
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropForeignKey('dish', 'category_id');

    await queryRunner.changeColumn(
      'dish',
      'category_id',
      new TableColumn({
        name: 'category_id',
        type: 'int',
        isNullable: true,
      }),
    );
  }
}
