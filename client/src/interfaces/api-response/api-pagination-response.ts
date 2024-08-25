import { Pagination } from "../pagination/pagination";
import { ApiResponse } from "./api-response";

export interface ApiPaginationResponse<T> extends ApiResponse<T> {
  meta: Pagination;
}
