import { Injectable } from '@nestjs/common';
import { CategoryReq } from '../../common/types/category';
import { Category } from '../../common/models/category.entity';
import { EntityNotFound } from '../../common/errors/entitiyNotFound';
import { EntityNotSaved } from '../../common/errors/entityNotSaved';

@Injectable()
export class CategoryService {
  async addCategory(categoryDto: CategoryReq) {
    const category = new Category();

    category.title = categoryDto.title;

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
