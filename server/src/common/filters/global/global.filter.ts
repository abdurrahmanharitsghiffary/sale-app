import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { Response } from 'express';
import { ZodValidationException } from 'src/common/exception/zod-validation.exception';
import { ApiErrorResponseImpl } from 'src/common/interfaces/api-response/api-error-response.impl';

@Catch()
export class GlobalFilter<T> implements ExceptionFilter {
  catch(exception: T, host: ArgumentsHost) {
    const response = host.switchToHttp().getResponse<Response>();
    const errors = (exception as any)?.cause ?? undefined;
    console.log(exception, 'EXCEPTION');
    if (exception instanceof HttpException) {
      return response
        .status(exception.getStatus())
        .json(
          new ApiErrorResponseImpl(
            exception.message,
            exception.getStatus(),
            exception.name,
            errors,
          ),
        );
    } else if (exception instanceof ZodValidationException) {
      return response
        .status(HttpStatus.UNPROCESSABLE_ENTITY)
        .json(
          new ApiErrorResponseImpl(
            `Failed to validate the ${exception.path}`,
            HttpStatus.UNPROCESSABLE_ENTITY,
            exception.name,
            exception.issues,
          ),
        );
    }

    return response
      .status(HttpStatus.INTERNAL_SERVER_ERROR)
      .json(
        new ApiErrorResponseImpl(
          'Internal server error',
          HttpStatus.INTERNAL_SERVER_ERROR,
          (exception as any)?.name,
          errors,
        ),
      );
  }
}
