import type { ApiErrorCode } from "./types.js";

/** Thrown when the Wazen API returns an error response. */
export class WazenApiError extends Error {
  readonly status: number;
  readonly code: ApiErrorCode;
  readonly details: unknown;
  readonly requestId: string;

  constructor(
    message: string,
    status: number,
    code: ApiErrorCode,
    requestId: string,
    details?: unknown,
  ) {
    super(message);
    this.name = "WazenApiError";
    this.status = status;
    this.code = code;
    this.requestId = requestId;
    this.details = details;
  }
}

/** Thrown when a request exceeds the configured timeout. */
export class WazenTimeoutError extends Error {
  constructor(timeout: number) {
    super(`Request timed out after ${timeout}ms`);
    this.name = "WazenTimeoutError";
  }
}

/** Thrown when a network error prevents the request from completing. */
export class WazenNetworkError extends Error {
  constructor(cause: unknown) {
    const msg = cause instanceof Error ? cause.message : "Network request failed";
    super(msg);
    this.name = "WazenNetworkError";
    this.cause = cause;
  }
}
