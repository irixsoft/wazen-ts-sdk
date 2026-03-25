import { BaseResource } from "./base.js";
import type { MessageResponse } from "../core/types.js";
import type { SentMessage } from "../types/messages.js";
import type {
  LookupChannelParams,
  CreateChannelParams,
  UpdateChannelParams,
  SendChannelMessageParams,
  ListChannelMessagesParams,
  ReactParams,
} from "../types/channels.js";

export class Channels extends BaseResource {
  create(sessionId: string, params: CreateChannelParams): Promise<Record<string, unknown>> {
    return this.client.request<Record<string, unknown>>("POST", `/sessions/${sessionId}/channels`, { body: params });
  }

  lookup(sessionId: string, params: LookupChannelParams): Promise<Record<string, unknown>> {
    return this.client.request<Record<string, unknown>>("GET", `/sessions/${sessionId}/channels`, {
      query: params as Record<string, unknown>,
    });
  }

  get(sessionId: string, channelId: string): Promise<Record<string, unknown>> {
    return this.client.request<Record<string, unknown>>("GET", `/sessions/${sessionId}/channels/${channelId}`);
  }

  update(sessionId: string, channelId: string, params: UpdateChannelParams): Promise<MessageResponse> {
    return this.client.request<MessageResponse>("PUT", `/sessions/${sessionId}/channels/${channelId}`, { body: params });
  }

  delete(sessionId: string, channelId: string): Promise<MessageResponse> {
    return this.client.request<MessageResponse>("DELETE", `/sessions/${sessionId}/channels/${channelId}`);
  }

  sendMessage(sessionId: string, channelId: string, params: SendChannelMessageParams): Promise<SentMessage> {
    return this.client.request<SentMessage>("POST", `/sessions/${sessionId}/channels/${channelId}/messages`, { body: params });
  }

  listMessages(sessionId: string, channelId: string, params?: ListChannelMessagesParams): Promise<Record<string, unknown>[]> {
    return this.client.request<Record<string, unknown>[]>("GET", `/sessions/${sessionId}/channels/${channelId}/messages`, {
      query: params as Record<string, unknown> | undefined,
    });
  }

  react(sessionId: string, channelId: string, messageId: string, params?: ReactParams): Promise<MessageResponse> {
    return this.client.request<MessageResponse>("POST", `/sessions/${sessionId}/channels/${channelId}/messages/${messageId}/react`, { body: params });
  }

  follow(sessionId: string, channelId: string): Promise<MessageResponse> {
    return this.client.request<MessageResponse>("POST", `/sessions/${sessionId}/channels/${channelId}/follow`);
  }

  unfollow(sessionId: string, channelId: string): Promise<MessageResponse> {
    return this.client.request<MessageResponse>("DELETE", `/sessions/${sessionId}/channels/${channelId}/follow`);
  }

  mute(sessionId: string, channelId: string): Promise<MessageResponse> {
    return this.client.request<MessageResponse>("POST", `/sessions/${sessionId}/channels/${channelId}/mute`);
  }

  unmute(sessionId: string, channelId: string): Promise<MessageResponse> {
    return this.client.request<MessageResponse>("DELETE", `/sessions/${sessionId}/channels/${channelId}/mute`);
  }
}
