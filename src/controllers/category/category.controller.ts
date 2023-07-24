import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Post,
} from '@nestjs/common';
import { CategoryService } from '../../services/category/category.service';
import { ValidationPipe } from '../../common/pipes/validation.pipe';
import { CategoryReq } from '../../common/types/category';

@Controller('category')
export class CategoryController {
  constructor(private categoryService: CategoryService) {}

  @Post()
  async add(@Body(new ValidationPipe()) category: CategoryReq) {
    await this.categoryService.addCategory(category);
  }

  @Delete(':title')
  async remove(@Param('title') title: string) {
    await this.categoryService.removeCategory(title);
  }
  @Get()
  async fetchCategories() {
    return await this.categoryService.fetchCategories();
  }
}
