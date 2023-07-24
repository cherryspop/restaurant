import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class RefreshReq {
  @IsString()
  @IsNotEmpty()
  refreshToken: string;
}
