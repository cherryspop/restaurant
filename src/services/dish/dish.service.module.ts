import { Module } from '@nestjs/common';
import { Dish } from '../../common/models/dish.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DishService } from './dish.service';
import { DishController } from '../../controllers/dish/dish.controller';
@Module({
  imports: [TypeOrmModule.forFeature([Dish])],
  providers: [DishService],
  controllers: [DishController],
  exports: [TypeOrmModule],
})
export class DishServiceModule {}
