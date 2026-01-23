class ApiResponse<T> {
  readonly success: boolean;
  readonly status: number;
  readonly message: string;
  readonly data: T | null;

  constructor(
    status: number,
    message: string,
    data: T | null = null,
    success = true,
  ) {
    this.success = success;
    this.status = status;
    this.message = message;
    this.data = data;
  }
}

export default ApiResponse;
