import { BaseResource } from "./base.js";
import type { PaginatedResponse, MessageResponse } from "../core/types.js";
import type { Session, SessionQr, CreateSessionParams, ListSessionsParams } from "../types/sessions.js";

export class Sessions extends BaseResource {
  create(params?: CreateSessionParams): Promise<Session> {
    return this.client.request<Session>("POST", "/sessions", { body: params });
  }

  list(params?: ListSessionsParams): Promise<PaginatedResponse<Session>> {
    return this.client.requestPaginated<Session>("GET", "/sessions", {
      query: params as Record<string, unknown>,
    });
  }

  get(sessionId: string): Promise<Session> {
    return this.client.request<Session>("GET", `/sessions/${sessionId}`);
  }

  delete(sessionId: string): Promise<MessageResponse> {
    return this.client.request<MessageResponse>("DELETE", `/sessions/${sessionId}`);
  }

  restart(sessionId: string): Promise<MessageResponse> {
    return this.client.request<MessageResponse>("POST", `/sessions/${sessionId}/restart`);
  }

  getQr(sessionId: string): Promise<SessionQr> {
    return this.client.request<SessionQr>("GET", `/sessions/${sessionId}/qr`);
  }

  factoryReset(sessionId: string): Promise<MessageResponse> {
    return this.client.request<MessageResponse>("POST", `/sessions/${sessionId}/factory-reset`);
  }
}
