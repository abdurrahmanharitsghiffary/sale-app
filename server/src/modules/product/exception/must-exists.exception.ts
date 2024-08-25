import { NotFoundException } from '@nestjs/common';

export class ProductMustExistsException extends NotFoundException {
  constructor() {
    super('Product not found');
  }
}
