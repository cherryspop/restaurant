import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { CryptoService } from '../crypto/crypto.service';

@Module({
  providers: [UserService, CryptoService],
  exports: [UserService, CryptoService],
})
export class UserModule {}
