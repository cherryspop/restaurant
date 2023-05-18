import { IsNotEmpty, IsString } from 'class-validator';

export class UserReq {
  id: number;

  @IsString()
  @IsNotEmpty()
  username: string;

  @IsString()
  @IsNotEmpty()
  password: string;
}
