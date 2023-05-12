import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { dataSourceConfigNest } from '../config/dbConnection';
import { DishService } from './services/dish.service';
import { DishController } from './controllers/dish.controller';
import { DishServiceModule } from './services/dish.service.module';
@Module({
  imports: [TypeOrmModule.forRoot(dataSourceConfigNest), DishServiceModule],
  controllers: [AppController, DishController],
  providers: [AppService, DishService],
})
export class AppModule {}
