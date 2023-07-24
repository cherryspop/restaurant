import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';
import { DishService } from './services/dish/dish.service';

@Controller()
export class AppController {
  constructor(private readonly dishService: DishService) {}

  @Get()
  async getMenu() {
    return await this.dishService.getAllDish();
  }
}
