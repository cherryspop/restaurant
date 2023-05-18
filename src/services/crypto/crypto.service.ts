import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { hash, compare, genSalt } from 'bcrypt';

@Injectable()
export class CryptoService {
  constructor(private configService: ConfigService) {}

  async hashPassword(password: string): Promise<string> {
    const saltRounds = parseInt(this.configService.get('SALT_ROUNDS'));
    const salt = await genSalt(saltRounds);
    return hash(password, salt);
  }

  async validateHash(
    password: string,
    hashedPassword: string,
  ): Promise<boolean> {
    return compare(password, hashedPassword);
  }
}
