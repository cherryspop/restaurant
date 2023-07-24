import { Injectable } from '@nestjs/common';
import { UserReq } from '../../common/types/user';
import { User } from '../../common/models/user.entity';
import { CryptoService } from '../crypto/crypto.service';
import { AuthFailed } from '../../common/errors/authFailed';
import assert from 'node:assert';
import { EntityNotSaved } from '../../common/errors/entityNotSaved';

@Injectable()
export class UserService {
  constructor(private cryptoService: CryptoService) {}
  async findUserByName(username: string, shouldExist = true) {
    const user = await User.findOneBy({ username });

    shouldExist
      ? assert(user, new AuthFailed('Auth Failed'))
      : assert(!user, new AuthFailed('Auth Failed'));

    return user;
  }

  async findUserById(id: number, shouldExist = true) {
    const user = await User.findOneBy({ id });

    shouldExist
      ? assert(user, new AuthFailed('Auth Failed'))
      : assert(!user, new AuthFailed('Auth Failed'));

    return user;
  }

  async create(username: string, password: string) {
    await this.findUserByName(username, false);

    const createdUser = new User();
    createdUser.username = username;
    createdUser.password = password;

    try {
      return await createdUser.save();
    } catch (e) {
      console.log(e);
      throw new EntityNotSaved('User Not Saved');
    }
  }
}
