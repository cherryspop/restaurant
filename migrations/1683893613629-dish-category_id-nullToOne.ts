import {
  MigrationInterface,
  QueryRunner,
  TableColumn,
  TableForeignKey,
} from 'typeorm';
import { AppDataSource } from '../config/data-source';
import { Dish } from '../src/common/models/dish.entity';

export class Dishes1683893613629 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await AppDataSource.createQueryBuilder()
      .update(Dish)
      .set({ category_id: 1 })
      .execute();
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.addColumn(
      'dish',
      new TableColumn({
        name: 'category_id',
        type: 'int',
        isNullable: true,
      }),
    );
    // await AppDataSource.createQueryBuilder()
    //   .update('dish')
    //   .set({ category_id: null })
    //   .execute();
  }
}
