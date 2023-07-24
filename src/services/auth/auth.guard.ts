import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Request } from 'express';
import { ConfigService } from '@nestjs/config';
import assert from 'node:assert';
import { AuthFailed } from '../../common/errors/authFailed';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(
    private jwtService: JwtService,
    private configService: ConfigService,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    const token = this.extractTokenFromHeader(request);
    assert(token, new AuthFailed('Auth Failed'));

    try {
      const payload = await this.jwtService.verifyAsync(token, {
        secret: this.configService.get<string>('JWT_SECRET'),
      });

      request['user'] = payload;
    } catch {
      throw new AuthFailed('Auth Failed');
    }
    return true;
  }

  private extractTokenFromHeader(request: Request): string | undefined {
    const token = request.cookies;
    console.log(token);
    return token;
  }
}
