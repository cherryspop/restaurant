import { Injectable } from '@nestjs/common';
import { DishReq } from '../../common/types/dish';
import { Dish } from '../../common/models/dish.entity';
import { Category } from '../../common/models/category.entity';
import { EntityNotFound } from '../../common/errors/entitiyNotFound';
import { EntityNotSaved } from '../../common/errors/entityNotSaved';

@Injectable()
export class DishService {
  async addDish(dishDto: DishReq) {
    const dish = new Dish();
    const category = await Category.findOneBy({
      id: dishDto.category_id,
    });

    if (!category) {
      throw new EntityNotFound('Category Not Found');
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
      throw new EntityNotSaved('Dish Not Saved');
    }
  }

  async removeDish(id) {
    const dish = await Dish.findOneBy({
      id: id,
    });

    if (!dish) {
      throw new EntityNotFound('Dish Not Found');
    }

    await dish.remove();
  }
}
