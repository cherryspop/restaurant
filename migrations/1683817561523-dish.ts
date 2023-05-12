import {
  MigrationInterface,
  QueryRunner,
  TableColumn,
  TableForeignKey,
} from 'typeorm';
export class Dish1683817561523 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    // await queryRunner.dropColumn(
    //   'dish',
    //   'category_id',
    // )

    await queryRunner.addColumn(
      'dish',
      new TableColumn({
        name: 'category_id',
        type: 'int',
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

    await queryRunner.dropColumn('dish', 'category_id');

    await queryRunner.addColumn(
      'dish',
      new TableColumn({
        name: 'category_id',
        type: 'boolean',
      }),
    );
  }
}
