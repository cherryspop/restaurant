import { Module } from '@nestjs/common';
import { Dish } from '../models/dish.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DishService } from './dish.service';
import { DishController } from '../controllers/dish.controller';
@Module({
  imports: [TypeOrmModule.forFeature([Dish])],
  providers: [DishService],
  controllers: [DishController],
  exports: [TypeOrmModule],
})
export class DishServiceModule {}
