import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { Dish } from '../models/dish.entity';

export const GetDish = createParamDecorator(
  (data: unknown, ctx: ExecutionContext) => {
    const request = ctx.switchToHttp().getRequest();
    return request.dish;
  },
);
