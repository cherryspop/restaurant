import {
  Body,
  Controller,
  Post,
  HttpCode,
  HttpStatus,
  UseGuards,
  Get,
  Res,
  Req,
} from '@nestjs/common';
import { AuthService } from '../../services/auth/auth.service';
import { UserReq } from '../../common/types/user';
import { ValidationPipe } from '../../common/pipes/validation.pipe';
import { AuthGuard } from '../../services/auth/auth.guard';
import { RefreshReq } from '../../common/types/refresh';
import { Response, Request } from 'express';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('singIn')
  async signIn(
    @Body(new ValidationPipe()) userDto: UserReq,
    @Res({ passthrough: true }) res: Response,
  ) {
    const { accessToken, refreshToken } = await this.authService.signIn(
      userDto,
    );
    res.cookie('accessToken', accessToken, {
      httpOnly: true,
      secure: false,
      sameSite: 'lax',
    });
    res.cookie('refreshToken', refreshToken, {
      httpOnly: true,
      secure: false,
      sameSite: 'lax',
    });
  }

  @HttpCode(HttpStatus.OK)
  @Post('signUp')
  async registration(@Body(new ValidationPipe()) userDto: UserReq) {
    return await this.authService.signUp(userDto);
  }

  @UseGuards(AuthGuard)
  @Get('edit')
  editMenu() {
    return true;
  }

  @Post('refresh')
  refreshTokens(@Body() refreshTokenReq: RefreshReq) {
    return this.authService.refreshAccessToken(refreshTokenReq.refreshToken);
  }
}
