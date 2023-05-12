import { Injectable } from '@nestjs/common';
import { DishReq } from '../dish/types/dish';
import { Dish } from '../models/dish.entity';
import { Category } from '../models/category.entity';
import { EntityNotFound } from '../errors/entitiyNotFound';
import { EntityNotSaved } from '../errors/entityNotSaved';

@Injectable()
export class DishService {
  async addDish(dishDto: DishReq) {
    const dish = new Dish();
    const category = await Category.findOneBy({
      id: dishDto.category,
    });

    if (!category) {
      throw new EntityNotFound('Category');
    }

    dish.title = dishDto.title;
    dish.photo = dishDto.photo;
    dish.price = dishDto.price;
    dish.sale = dishDto.sale;
    dish.category = category;

    try {
      await dish.save();
    } catch (e) {
      console.log(e);
      throw new EntityNotSaved('Dish');
    }
  }

  async removeDish(id) {
    const dish = await Dish.findOneBy({
      id: id,
    });

    if (!dish) {
      throw new EntityNotFound('Dish');
    }

    await dish.remove();
  }
}
