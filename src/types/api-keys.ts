export interface CreateApiKeyParams {
  name: string;
}

export interface ApiKey {
  id: string;
  name: string;
  key: string;
  created_at: string;
}

export interface ApiKeyListItem {
  id: string;
  name: string;
  last_used_at: string | null;
  revoked: boolean;
  created_at: string;
}

export interface RevokeApiKeyResult {
  id: string;
  revoked: boolean;
}

export interface ListApiKeysParams {
  page?: number;
  limit?: number;
}
