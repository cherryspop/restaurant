import { Injectable } from '@nestjs/common';
import { UserReq } from '../../common/types/user';
import { EntityNotFound } from '../../common/errors/entitiyNotFound';
import { User } from '../../common/models/user.entity';
import { UserAlreadyExists } from '../../common/errors/userAlreadyExists';
import { CryptoService } from '../crypto/crypto.service';
import { EntityNotSaved } from '../../common/errors/entityNotSaved';

@Injectable()
export class UserService {
  constructor(private cryptoService: CryptoService) {}
  async findUser(userDto: UserReq) {
    const user = await User.findOneBy({
      username: userDto.username,
    });

    if (!user) {
      throw new EntityNotFound('User Not Found');
    }

    return user;
  }

  async addUser(userDto: UserReq) {
    const userExists = await User.findOneBy({
      username: userDto.username,
    });

    if (userExists) {
      throw new UserAlreadyExists('User Already Exists');
    }

    const user = new User();

    const userHashedPassword = await this.cryptoService.hashPassword(
      userDto.password,
    );

    user.username = userDto.username;
    user.password = userHashedPassword;

    try {
      await user.save();
    } catch (e) {
      console.log(e);
      throw new EntityNotSaved('User Not Saved');
    }
  }
}
