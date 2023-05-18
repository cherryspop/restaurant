import { Body, Controller, Post, ValidationPipe } from '@nestjs/common';
import { UserReq } from '../../common/types/user';
import { UserService } from '../../services/user/user.service';

@Controller('user')
export class UserController {
  constructor(private userService: UserService) {}
  @Post()
  async registration(@Body(new ValidationPipe()) userDto: UserReq) {
    await this.userService.addUser(userDto);
  }
}
