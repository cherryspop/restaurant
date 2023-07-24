import { Injectable } from '@nestjs/common';
import { CategoryReq } from '../../common/types/category';
import { Category } from '../../common/models/category.entity';
import { EntityNotFound } from '../../common/errors/entitiyNotFound';
import { EntityNotSaved } from '../../common/errors/entityNotSaved';
import { Not } from 'typeorm';
import assert from 'node:assert';
import { UserAlreadyExists } from '../../common/errors/userAlreadyExists';

@Injectable()
export class CategoryService {
  async addCategory(categoryDto: CategoryReq) {
    const category = new Category();

    const exist = Category.find({ where: { title: categoryDto.title } });
    assert(exist, new UserAlreadyExists('Category already exists'));

    category.title = categoryDto.title;

    try {
      await category.save();
    } catch (e) {
      console.log(e);
      throw new EntityNotSaved('Category');
    }
  }

  async fetchCategories() {
    const categories = await Category.find({
      where: { title: Not('i was bool') },
    });
    return categories;
  }

  async removeCategory(title) {
    const category = await Category.findOneBy({
      title: title,
    });

    if (!category) {
      throw new EntityNotFound('Category');
    }

    await category.remove();
  }
}
