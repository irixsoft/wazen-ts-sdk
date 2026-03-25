import type { MessageType } from "./messages.js";

export interface LookupChannelParams {
  jid?: string;
  invite?: string;
}

export interface CreateChannelParams {
  name: string;
  description?: string;
}

export interface UpdateChannelParams {
  name?: string;
  description?: string;
}

export interface SendChannelMessageParams {
  type: MessageType;
  content?: string;
  media_url?: string;
}

export interface ListChannelMessagesParams {
  count?: number;
  since?: number;
  after?: number;
}

export interface ReactParams {
  reaction?: string;
}
