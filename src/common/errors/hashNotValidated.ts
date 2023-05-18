import { HttpException, HttpStatus } from '@nestjs/common';

export class hashNotValidated extends HttpException {
  constructor(message) {
    super(message, HttpStatus.UNAUTHORIZED);
  }
}
