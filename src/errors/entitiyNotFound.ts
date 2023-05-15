import { HttpException, HttpStatus } from '@nestjs/common';

export class EntityNotFound extends HttpException {
  constructor(message) {
    super(message, HttpStatus.NOT_FOUND);
  }
}
