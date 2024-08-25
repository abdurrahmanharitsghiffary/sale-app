import { ApiResponse } from './api-response.interface';

export class ApiResponseImpl<T> implements ApiResponse<T> {
  constructor(
    public data: T,
    public status: number,
    public message?: string,
  ) {}
}
