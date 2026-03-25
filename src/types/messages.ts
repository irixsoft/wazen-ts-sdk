export type MessageType = "text" | "image" | "video" | "audio" | "document";

export interface SendMessageParams {
  to: string;
  type: MessageType;
  content?: string;
  media_url?: string;
  media_base64?: string;
}

export interface SentMessage {
  id: string;
  session_id: string;
  to: string;
  type: string;
  content: string | null;
  status: string;
  direction: string;
  created_at: string;
}

export interface Message {
  id: string;
  session_id: string;
  message_id: string | null;
  from_jid: string;
  to_jid: string;
  type: string;
  content: string | null;
  media_url: string | null;
  status: string;
  direction: string;
  timestamp: string;
  created_at: string;
}

export interface ListMessagesParams {
  page?: number;
  limit?: number;
  direction?: "incoming" | "outgoing";
  type?: MessageType;
}
