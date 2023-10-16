interface ApiResponse<T> {
  status: "success";
  message: string;
  data: T;
}

interface ApiErrorResponse {
  status: "error";
  errorMessage: string;
  errorCode?: number;
}

export type { ApiResponse, ApiErrorResponse };
