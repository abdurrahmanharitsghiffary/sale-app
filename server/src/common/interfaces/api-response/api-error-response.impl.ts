import { ApiResponse, ErrorDetail } from './api-response.interface';

export class ApiErrorResponseImpl implements ApiResponse<null> {
  data = null;
  constructor(
    public message: string,
    public status: number,
    public name?: string,
    public errors?: ErrorDetail[],
  ) {}
}
