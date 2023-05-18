import { Body, Controller, Post, HttpCode, HttpStatus } from '@nestjs/common';
import { AuthService } from '../../services/auth/auth.service';
import { UserReq } from '../../common/types/user';
import { ValidationPipe } from '../../common/pipes/validation.pipe';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @HttpCode(HttpStatus.OK)
  @Post()
  signIn(@Body(new ValidationPipe()) userDto: UserReq) {
    return this.authService.signIn(userDto);
  }
}
