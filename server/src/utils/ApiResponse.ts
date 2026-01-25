class ApiResponse<T> {
  readonly success: boolean;
  readonly status: number;
  readonly message: string;
  readonly data: T | null;

  constructor(
    status: number,
    message: string,
    data: T | null = null, //This left as null cause we can also check error later on
    success = true,
  ) {
    this.status = status;
    this.message = message;
    this.data = data;
    this.success = success;
  }
}

export default ApiResponse;
