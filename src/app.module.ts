import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { dataSourceConfigNest } from '../config/dbConnection';
import { DishService } from './services/dish.service';
import { DishController } from './controllers/dish.controller';
import { DishServiceModule } from './services/dish.service.module';
import { CategoryService } from './services/category.service';
import { CategoryController } from './controllers/category.controller';
import { CategoryServiceModule } from './services/category.service.module';
@Module({
  imports: [
    TypeOrmModule.forRoot(dataSourceConfigNest),
    DishServiceModule,
    CategoryServiceModule,
  ],
  controllers: [AppController, DishController, CategoryController],
  providers: [AppService, DishService, CategoryService],
})
export class AppModule {}
