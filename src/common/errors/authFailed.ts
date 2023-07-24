import { HttpException, HttpStatus } from '@nestjs/common';

export class AuthFailed extends HttpException {
  constructor(message) {
    super(message, HttpStatus.UNAUTHORIZED);
  }
}
