import { IsString, IsInt, IsNotEmpty } from 'class-validator';

export class DishReq {
  id: number;

  @IsInt()
  @IsNotEmpty()
  category_id: number;

  @IsString()
  @IsNotEmpty()
  photo: string;

  @IsInt()
  @IsNotEmpty()
  price: number;

  @IsInt()
  @IsNotEmpty()
  sale: number;

  @IsString()
  @IsNotEmpty()
  title: string;
}
