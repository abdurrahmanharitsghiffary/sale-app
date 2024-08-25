import { Pagination } from '../pagination/pagination.interface';
import { ApiResponse } from './api-response.interface';

export interface ApiPaginationResponse<T> extends ApiResponse<T> {
  meta: Pagination;
}
