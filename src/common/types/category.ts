import { IsString, IsNotEmpty } from 'class-validator';

export class CategoryReq {
  id: number;

  @IsString()
  @IsNotEmpty()
  title: string;
}
