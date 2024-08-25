export interface ErrorDetail {
  message?: string;
  code?: string;
  [x: string]: any;
}

export interface ApiResponse<T> {
  data: T;
  message?: string;
  name?: string;
  status: number;
  errors?: ErrorDetail[];
}
