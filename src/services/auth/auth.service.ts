import { Injectable } from '@nestjs/common';
import { UserService } from '../user/user.service';
import { UserReq } from '../../common/types/user';
import { JwtModule, JwtService } from '@nestjs/jwt';
import { CryptoService } from '../crypto/crypto.service';
import { hashNotValidated } from '../../common/errors/hashNotValidated';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class AuthService {
  constructor(
    private userService: UserService,
    private jwtService: JwtService,
    private cryptoService: CryptoService,
    private configService: ConfigService,
  ) {}

  async signIn(userDto: UserReq) {
    const user = await this.userService.findUser(userDto);

    const hashValidation = await this.cryptoService.validateHash(
      userDto.password,
      user.password,
    );

    if (!hashValidation) {
      throw new hashNotValidated('Hash Validation Failed');
    }

    const payload = { username: user.username, sub: user.id };

    return {
      access_token: await this.jwtService.signAsync(payload, {
        secret: this.configService.get('JWT_SECRET'),
      }),
    };
  }
}
