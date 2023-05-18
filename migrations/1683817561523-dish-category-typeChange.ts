import {
  MigrationInterface,
  QueryRunner,
  TableColumn,
  TableForeignKey,
} from 'typeorm';
import { AppDataSource } from '../config/data-source';
import { Dish } from '../src/common/models/dish.entity';
export class Dish1683817561523 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.changeColumn(
      'dish',
      'category_id',
      new TableColumn({
        name: 'category_id',
        type: 'int',
        isNullable: true,
      }),
    );

    // await AppDataSource.createQueryBuilder()
    //   .update(Dish)
    //   .set({ category_id: 1 })
    //   .execute();
    //
    // await queryRunner.changeColumn(
    //   'dish',
    //   'category_id',
    //   new TableColumn({
    //     name: 'category_id',
    //     type: 'int',
    //     isNullable: false,
    //   }),
    // );

    // await queryRunner.createForeignKey(
    //   'dish',
    //   new TableForeignKey({
    //     columnNames: ['category_id'],
    //     referencedColumnNames: ['id'],
    //     referencedTableName: 'category',
    //     onDelete: 'CASCADE',
    //   }),
    // );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropForeignKey('dish', 'category_id');

    await queryRunner.changeColumn(
      'dish',
      'category_id',
      new TableColumn({
        name: 'category_id',
        type: 'boolean',
        isNullable: false,
      }),
    );

    // await AppDataSource.createQueryBuilder()
    //   .update('dish')
    //   .set({ category_id: true })
    //   .where('*')
    //   .execute();
    //
    // await queryRunner.changeColumn(
    //   'dish',
    //   'category_id',
    //   new TableColumn({
    //     name: 'category_id',
    //     type: 'boolean',
    //     isNullable: false,
    //   }),
    // );
  }
}
