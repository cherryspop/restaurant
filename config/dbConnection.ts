import { DataSourceOptions } from 'typeorm';
import { Dish } from '../src/models/dish.entity';
import { Category } from '../src/models/category.entity';

export const dataSourceConfigNest: DataSourceOptions = {
  type: 'postgres',
  host: 'localhost',
  port: 5432,
  username: 'user',
  password: 'user',
  database: 'restaurant',
  entities: [Dish, Category],
  // migrations: ['./migrations/*.ts'],
  synchronize: false,
};
