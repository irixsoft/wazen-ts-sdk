import type { ApiResponse, ApiSuccessResponse, PaginatedResponse } from "./types.js";
import { WazenApiError, WazenTimeoutError, WazenNetworkError } from "./errors.js";
import type { ApiErrorCode } from "./types.js";

interface RequestOptions {
  body?: unknown;
  query?: Record<string, unknown>;
}

export class HttpClient {
  private readonly apiKey: string;
  private readonly baseUrl: string;
  private readonly timeout: number;

  constructor(apiKey: string, baseUrl: string, timeout: number) {
    this.apiKey = apiKey;
    this.baseUrl = baseUrl;
    this.timeout = timeout;
  }

  async request<T>(method: string, path: string, options?: RequestOptions): Promise<T> {
    const result = await this.execute<T>(method, path, options);
    return result.data;
  }

  async requestPaginated<T>(method: string, path: string, options?: RequestOptions): Promise<PaginatedResponse<T>> {
    const result = await this.execute<T[]>(method, path, options);
    return {
      data: result.data,
      pagination: result.meta.pagination!,
    };
  }

  private async execute<T>(method: string, path: string, options?: RequestOptions): Promise<ApiSuccessResponse<T>> {
    const url = this.buildUrl(path, options?.query);

    const headers: Record<string, string> = {
      "Authorization": `Bearer ${this.apiKey}`,
      "Accept": "application/json",
    };

    if (options?.body !== undefined) {
      headers["Content-Type"] = "application/json";
    }

    let response: Response;
    try {
      response = await fetch(url, {
        method,
        headers,
        body: options?.body !== undefined ? JSON.stringify(options.body) : undefined,
        signal: AbortSignal.timeout(this.timeout),
      });
    } catch (error: unknown) {
      if (error instanceof Error && (error.name === "AbortError" || error.name === "TimeoutError")) {
        throw new WazenTimeoutError(this.timeout);
      }
      throw new WazenNetworkError(error);
    }

    let body: ApiResponse<T>;
    try {
      body = await response.json() as ApiResponse<T>;
    } catch {
      throw new WazenApiError(
        `Unexpected response format (HTTP ${response.status})`,
        response.status,
        "INTERNAL_ERROR" as ApiErrorCode,
        "",
      );
    }

    if (!body.success) {
      throw new WazenApiError(
        body.error.message,
        response.status,
        body.error.code as ApiErrorCode,
        body.meta.request_id,
        body.error.details,
      );
    }

    return body;
  }

  private buildUrl(path: string, query?: Record<string, unknown>): string {
    const url = new URL(`${this.baseUrl}${path}`);

    if (query) {
      for (const [key, value] of Object.entries(query)) {
        if (value !== undefined && value !== null) {
          url.searchParams.set(key, String(value));
        }
      }
    }

    return url.toString();
  }
}
