import { Pagination } from './pagination.interface';

export class PaginationImpl implements Pagination {
  total_page: number;
  next: boolean;
  prev: boolean;
  current_page: number;

  constructor(
    data: any[],
    current_page = 1,
    public total_filtered_record: number,
    public total_record: number,
    public limit: number = 10,
    public sort_by: string = 'ASC',
    public order_by: string = 'id',
    public search?: string,
  ) {
    this.current_page = current_page || 1;
    this.total_page = Math.ceil((total_filtered_record ?? data.length) / limit);
    this.next = this.current_page < this.total_page;
    this.prev = this.current_page > 1;
  }
}
