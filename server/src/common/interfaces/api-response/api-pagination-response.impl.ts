import { PaginationImpl } from '../pagination/pagination.impl';
import { Pagination } from '../pagination/pagination.interface';
import { ApiPaginationResponse } from './api-pagination-response.interface';

export class ApiPaginationResponseImpl<T extends any[]>
  implements ApiPaginationResponse<T>
{
  status: number = 200;
  meta: Pagination;

  constructor(
    public data: T,
    current_page = 1,
    total_filtered_record: number,
    total_record: number,
    limit: number = 10,
    sort_by: string = 'ASC',
    order_by: string = 'id',
    search?: string,
  ) {
    this.meta = new PaginationImpl(
      data,
      current_page,
      total_filtered_record,
      total_record,
      limit,
      sort_by,
      order_by,
      search,
    );
  }
}
