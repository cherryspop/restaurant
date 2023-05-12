import {
  Body,
  Controller,
  Get,
  Post,
  Delete,
  Param,
  ParseIntPipe,
} from '@nestjs/common';
import { DishReq } from '../dish/types/dish';
import { DishService } from '../services/dish.service';
import { ValidationPipe } from '../pipes/validation.pipe';

@Controller('dish')
export class DishController {
  constructor(private dishService: DishService) {}

  @Post()
  async add(@Body(new ValidationPipe()) dish: DishReq) {
    await this.dishService.addDish(dish);
  }

  @Delete(':id')
  async remove(@Param('id', ParseIntPipe) id: number) {
    await this.dishService.removeDish(id);
  }

  @Get()
  findAll(): string {
    return 'All dishes?';
  }
}
