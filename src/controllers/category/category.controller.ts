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

  @Delete(':id')
  async remove(@Param('id', ParseIntPipe) id: number) {
    await this.categoryService.removeCategory(id);
  }
  @Get()
  findAll(): string {
    return 'All categories?';
  }
}
