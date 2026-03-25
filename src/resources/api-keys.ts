import { BaseResource } from "./base.js";
import type { PaginatedResponse } from "../core/types.js";
import type {
  ApiKey,
  ApiKeyListItem,
  RevokeApiKeyResult,
  CreateApiKeyParams,
  ListApiKeysParams,
} from "../types/api-keys.js";

export class ApiKeys extends BaseResource {
  create(params: CreateApiKeyParams): Promise<ApiKey> {
    return this.client.request<ApiKey>("POST", "/api-keys", { body: params });
  }

  list(params?: ListApiKeysParams): Promise<PaginatedResponse<ApiKeyListItem>> {
    return this.client.requestPaginated<ApiKeyListItem>("GET", "/api-keys", {
      query: params as Record<string, unknown>,
    });
  }

  revoke(keyId: string): Promise<RevokeApiKeyResult> {
    return this.client.request<RevokeApiKeyResult>("DELETE", `/api-keys/${keyId}`);
  }
}
