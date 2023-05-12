import { Module } from '@nestjs/common';
import { Category } from '../models/category.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CategoryService } from './category.service';
import { CategoryController } from '../controllers/category.controller';
@Module({
  imports: [TypeOrmModule.forFeature([Category])],
  providers: [CategoryService],
  controllers: [CategoryController],
  exports: [TypeOrmModule],
})
export class CategoryServiceModule {}
