import {
  Body,
  Controller,
  Get,
  Post,
  Delete,
  Param,
  ParseIntPipe,
  UseGuards,
} from '@nestjs/common';
import { DishReq } from '../../common/types/dish';
import { DishService } from '../../services/dish/dish.service';
import { ValidationPipe } from '../../common/pipes/validation.pipe';
import { AuthGuard } from '../../services/auth/auth.guard';

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
