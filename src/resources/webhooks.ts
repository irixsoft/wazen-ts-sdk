import { BaseResource } from "./base.js";
import type { PaginatedResponse } from "../core/types.js";
import type {
  Webhook,
  WebhookListItem,
  UpdatedWebhook,
  DeleteWebhookResult,
  TestWebhookResult,
  WebhookLog,
  CreateWebhookParams,
  UpdateWebhookParams,
  TestWebhookParams,
  ListWebhooksParams,
} from "../types/webhooks.js";

export class Webhooks extends BaseResource {
  create(params: CreateWebhookParams): Promise<Webhook> {
    return this.client.request<Webhook>("POST", "/webhooks", { body: params });
  }

  list(params?: ListWebhooksParams): Promise<PaginatedResponse<WebhookListItem>> {
    return this.client.requestPaginated<WebhookListItem>("GET", "/webhooks", {
      query: params as Record<string, unknown>,
    });
  }

  update(webhookId: string, params: UpdateWebhookParams): Promise<UpdatedWebhook> {
    return this.client.request<UpdatedWebhook>("PUT", `/webhooks/${webhookId}`, { body: params });
  }

  delete(webhookId: string): Promise<DeleteWebhookResult> {
    return this.client.request<DeleteWebhookResult>("DELETE", `/webhooks/${webhookId}`);
  }

  test(webhookId: string, params?: TestWebhookParams): Promise<TestWebhookResult> {
    return this.client.request<TestWebhookResult>("POST", `/webhooks/${webhookId}/test`, { body: params });
  }

  getLogs(webhookId: string): Promise<WebhookLog[]> {
    return this.client.request<WebhookLog[]>("GET", `/webhooks/${webhookId}/logs`);
  }
}
