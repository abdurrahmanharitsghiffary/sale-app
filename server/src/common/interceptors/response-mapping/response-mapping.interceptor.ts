import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
} from '@nestjs/common';
import { map, Observable } from 'rxjs';
import { ApiResponseImpl } from 'src/common/interfaces/api-response/api.response.impl';
import { ApiPaginationResponseImpl } from 'src/common/interfaces/api-response/api-pagination-response.impl';

@Injectable()
export class ResponseMappingInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    return next.handle().pipe(
      map((data) => {
        if (
          data instanceof ApiResponseImpl ||
          data instanceof ApiPaginationResponseImpl
        )
          return data;
        return new ApiResponseImpl(data, 200);
      }),
    );
  }
}
