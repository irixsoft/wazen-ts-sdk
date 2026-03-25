import type { HttpClient } from "../core/http-client.js";
import type { PaginatedResponse } from "../core/types.js";

export class BaseResource {
  protected readonly client: HttpClient;

  constructor(client: HttpClient) {
    this.client = client;
  }

  protected get<T>(path: string, query?: Record<string, unknown>): Promise<T> {
    return this.client.request<T>("GET", path, { query });
  }

  protected post<T>(path: string, body?: unknown): Promise<T> {
    return this.client.request<T>("POST", path, { body });
  }

  protected put<T>(path: string, body?: unknown): Promise<T> {
    return this.client.request<T>("PUT", path, { body });
  }

  protected del<T>(path: string): Promise<T> {
    return this.client.request<T>("DELETE", path);
  }

  protected getPaginated<T>(path: string, query?: Record<string, unknown>): Promise<PaginatedResponse<T>> {
    return this.client.requestPaginated<T>("GET", path, { query });
  }
}
