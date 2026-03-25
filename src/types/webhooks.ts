export type WebhookEvent =
  | "session.connected"
  | "session.disconnected"
  | "session.qr"
  | "message.received"
  | "message.sent"
  | "message.delivered"
  | "message.read"
  | "message.failed"
  | "warming.completed"
  | "warming.day_complete";

export interface RetryConfig {
  max_retries?: number;
  retry_delays?: number[];
}

export interface CreateWebhookParams {
  url: string;
  events: WebhookEvent[];
  session_id?: string;
}

export interface Webhook {
  id: string;
  url: string;
  events: WebhookEvent[];
  secret: string;
  enabled: boolean;
  created_at: string;
}

export interface WebhookListItem {
  id: string;
  url: string;
  events: WebhookEvent[];
  enabled: boolean;
  session_id: string | null;
  created_at: string;
}

export interface UpdateWebhookParams {
  url?: string;
  events?: WebhookEvent[];
  enabled?: boolean;
  retry_config?: RetryConfig;
}

export interface UpdatedWebhook {
  id: string;
  url: string;
  events: WebhookEvent[];
  enabled: boolean;
  created_at: string;
}

export interface DeleteWebhookResult {
  id: string;
  deleted: boolean;
}

export interface TestWebhookParams {
  event_type?: WebhookEvent;
}

export interface TestWebhookResult {
  message: string;
  webhook_id: string;
}

export interface WebhookLog {
  id: string;
  webhook_id: string;
  event_type: string;
  payload: unknown;
  status_code: number | null;
  response_body: string | null;
  attempt: number;
  success: boolean;
  error_message: string | null;
  created_at: string;
}

export interface ListWebhooksParams {
  page?: number;
  limit?: number;
}
