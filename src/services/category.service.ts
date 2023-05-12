import { Injectable } from '@nestjs/common';
import { CategoryReq } from '../dish/types/category';
import { Category } from '../models/category.entity';
import { EntityNotFound } from '../errors/entitiyNotFound';
import { EntityNotSaved } from '../errors/entityNotSaved';

@Injectable()
export class CategoryService {
  async addCategory(categoryDto: CategoryReq) {
    const category = await Category.findOneBy({
      id: categoryDto.id,
    });

    if (!category) {
      throw new EntityNotFound('Category');
    }

    try {
      await category.save();
    } catch (e) {
      console.log(e);
      throw new EntityNotSaved('Category');
    }
  }

  async removeCategory(id) {
    const category = await Category.findOneBy({
      id: id,
    });

    if (!category) {
      throw new EntityNotFound('Category');
    }

    await category.remove();
  }
}
