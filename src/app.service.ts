import { Injectable } from '@nestjs/common';
import { DishService } from './services/dish/dish.service';

@Injectable()
export class AppService {
  constructor(private dishService: DishService) {}
  async getAllDish() {}
}
