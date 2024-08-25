import { ArgumentMetadata, PipeTransform } from '@nestjs/common';
import { ZodError, ZodSchema } from 'zod';

import { ZodValidationException } from '../exception/zod-validation.exception';

export class ZodValidationPipe implements PipeTransform {
  constructor(private schema: ZodSchema) {}

  transform(value: unknown, metadata: ArgumentMetadata) {
    try {
      const parsedValue = this.schema.parse(value);
      return parsedValue;
    } catch (error) {
      if (error instanceof ZodError) {
        throw new ZodValidationException(error.issues, metadata.type as any);
      }
    }
  }
}
