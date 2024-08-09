export interface ApiResponse<T> {
  status_code: number;
  message: string;
  data: Array<T>;
}
