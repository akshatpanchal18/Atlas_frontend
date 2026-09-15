export interface ApiResponse<T = undefined> {
  success: boolean;
  message: string;
  statusCode: number;
  data?: T;
}
export interface ApiFieldError {
  field: string;
  message: string;
  code?: string;
}
export interface ApiError {
  success: boolean;
  message: string;
  statusCode: number;
  errors: ApiFieldError[];
}
