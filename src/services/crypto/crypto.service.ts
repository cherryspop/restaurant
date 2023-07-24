import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { hash, genSalt } from 'bcrypt';
@Injectable()
export class CryptoService {
  constructor(private configService: ConfigService) {}

  async hashData(data: string): Promise<string> {
    const saltRounds = parseInt(this.configService.get('SALT_ROUNDS'));
    const salt = await genSalt(saltRounds);
    return hash(data, salt);
  }
}
