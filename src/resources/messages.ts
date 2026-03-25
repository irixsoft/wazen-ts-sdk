import { BaseResource } from "./base.js";
import type { PaginatedResponse } from "../core/types.js";
import type { SentMessage, Message, SendMessageParams, ListMessagesParams } from "../types/messages.js";

export class Messages extends BaseResource {
  send(sessionId: string, params: SendMessageParams): Promise<SentMessage> {
    return this.client.request<SentMessage>("POST", `/sessions/${sessionId}/messages`, { body: params });
  }

  list(sessionId: string, params?: ListMessagesParams): Promise<PaginatedResponse<Message>> {
    return this.client.requestPaginated<Message>("GET", `/sessions/${sessionId}/messages`, {
      query: params as Record<string, unknown>,
    });
  }

  get(sessionId: string, messageId: string): Promise<Message> {
    return this.client.request<Message>("GET", `/sessions/${sessionId}/messages/${messageId}`);
  }
}
