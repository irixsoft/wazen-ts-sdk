export interface PaginationMeta {
  page: number;
  limit: number;
  total: number;
  has_more: boolean;
}

export interface ResponseMeta {
  timestamp: string;
  request_id: string;
  pagination?: PaginationMeta;
}

export interface ApiSuccessResponse<T> {
  success: true;
  data: T;
  meta: ResponseMeta;
}

export interface ApiErrorResponse {
  success: false;
  error: {
    code: string;
    message: string;
    details?: unknown;
  };
  meta: ResponseMeta;
}

export type ApiResponse<T> = ApiSuccessResponse<T> | ApiErrorResponse;

export interface PaginatedResponse<T> {
  data: T[];
  pagination: PaginationMeta;
}

export interface RateLimitInfo {
  limit: number;
  remaining: number;
  reset: number;
}

export interface WazenClientOptions {
  baseUrl?: string;
  timeout?: number;
}

export type ApiErrorCode =
  | "AUTH_INVALID_KEY"
  | "AUTH_UNAUTHORIZED"
  | "AUTH_SUSPENDED"
  | "SUBSCRIPTION_REQUIRED"
  | "SUBSCRIPTION_TIER_INSUFFICIENT"
  | "SESSION_NOT_FOUND"
  | "SESSION_LIMIT_REACHED"
  | "SESSION_NOT_CONNECTED"
  | "MESSAGE_SEND_FAILED"
  | "WEBHOOK_NOT_FOUND"
  | "WEBHOOK_DELIVERY_FAILED"
  | "API_KEY_NOT_FOUND"
  | "RESOURCE_NOT_FOUND"
  | "INVALID_STATE"
  | "VALIDATION_ERROR"
  | "RATE_LIMITED"
  | "INTERNAL_ERROR";
