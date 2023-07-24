import { Injectable } from '@nestjs/common';
import { UserService } from '../user/user.service';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { UserReq } from '../../common/types/user';
import { AuthFailed } from '../../common/errors/authFailed';
import { compare } from 'bcrypt';
import assert from 'node:assert';
import { CryptoService } from '../crypto/crypto.service';

@Injectable()
export class AuthService {
  constructor(
    private userService: UserService,
    private jwtService: JwtService,
    private configService: ConfigService,
    private cryptoService: CryptoService,
  ) {}

  async signUp(userDto: UserReq) {
    await this.userService.findUserByName(userDto.username, false);

    const userHashedPassword = await this.cryptoService.hashData(
      userDto.password,
    );

    const newUser = await this.userService.create(
      userDto.username,
      userHashedPassword,
    );

    const tokens = await this.getTokens(newUser.id, newUser.username);
    return tokens;
  }

  async signIn(userDto: UserReq) {
    const user = await this.userService.findUserByName(userDto.username);

    const isHashValidated = await compare(userDto.password, user.password);

    assert(isHashValidated, new AuthFailed('Unauthorized'));

    const tokens = await this.getTokens(user.id, user.username);
    return tokens;
  }

  async getTokens(userId: number, username: string) {
    const payload = {
      sub: userId,
      username,
    };
    const [accessToken, refreshToken] = await Promise.all([
      this.jwtService.signAsync(payload, {
        secret: this.configService.get<string>('JWT_SECRET'),
        expiresIn: '15m',
      }),
      this.jwtService.signAsync(payload, {
        secret: this.configService.get<string>('JWT_REFRESH_SECRET'),
        expiresIn: '1d',
      }),
    ]);

    return {
      accessToken,
      refreshToken,
    };
  }

  async refreshAccessToken(refreshToken: string) {
    // const { refreshToken } = refreshTokenDto;refreshTokenDto
    const validation = await this.jwtService.verifyAsync(refreshToken, {
      secret: this.configService.get<string>('JWT_REFRESH_SECRET'),
    });

    assert(validation, new AuthFailed('Auth Failed'));

    const payload = this.jwtService.decode(refreshToken, { json: true });

    const tokens = await this.getTokens(payload['sub'], payload['username']);
    return tokens.accessToken;
  }
}
