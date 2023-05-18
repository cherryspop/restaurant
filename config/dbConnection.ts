import { DataSourceOptions } from 'typeorm';
import { Dish } from '../src/common/models/dish.entity';
import { Category } from '../src/common/models/category.entity';
import { User } from '../src/common/models/user.entity';
import * as dotenv from 'dotenv';
import * as process from 'process';

dotenv.config();

export const dataSourceConfigNest: DataSourceOptions = {
  type: 'postgres',
  host: process.env.DATABASE_HOST,
  port: parseInt(process.env.DATABASE_PORT),
  username: process.env.DATABASE_USERNAME,
  password: process.env.DATABASE_PASSWORD,
  database: 'restaurant',
  entities: [Dish, Category, User],
  // migrations: ['./migrations/*.ts'],
  synchronize: false,
};
