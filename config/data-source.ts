import { DataSource } from 'typeorm';
import { dataSourceConfigNest } from './dbConnection';

export const dataSourceConfig = {
  ...dataSourceConfigNest,
  migrations: ['./migrations/*.ts'],
};

export const AppDataSource = new DataSource(dataSourceConfig);
AppDataSource.initialize()
  .then(() => {
    console.log('Data Source has been initialized!');
  })
  .catch((err) => {
    console.error('Error during Data Source initialization', err);
  });
