import { HttpException, HttpStatus } from '@nestjs/common';

export class UserAlreadyExists extends HttpException {
  constructor(message) {
    super(message, HttpStatus.CONFLICT);
  }
}
