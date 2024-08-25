export interface Pagination {
  total_record: number;
  total_filtered_record: number;
  current_page: number;
  total_page: number;
  next: boolean;
  prev: boolean;
  search?: string;
  limit: number;
  sort_by: string;
  order_by: string;
}
