import { NotFoundException } from '@nestjs/common';

export class SaleMustExistsException extends NotFoundException {
  constructor() {
    super('Sale not found');
  }
}
