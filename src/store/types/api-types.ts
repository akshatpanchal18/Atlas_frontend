export interface ApiResponse<T> {
  success: boolean;
  message: string;
  statusCode: number;
  data: T;
}
export interface ApiError<T> {
  success: boolean;
  message: string;
  statusCode: number;
  error: T;
}
