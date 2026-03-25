import { BaseResource } from "./base.js";
import type { ContactCheckResult, BulkCheckResult, CheckContactParams, BulkCheckContactsParams } from "../types/contacts.js";

export class Contacts extends BaseResource {
  check(sessionId: string, params: CheckContactParams): Promise<ContactCheckResult> {
    return this.client.request<ContactCheckResult>("POST", `/sessions/${sessionId}/contacts/check`, { body: params });
  }

  bulkCheck(sessionId: string, params: BulkCheckContactsParams): Promise<BulkCheckResult> {
    return this.client.request<BulkCheckResult>("POST", `/sessions/${sessionId}/contacts/bulk-check`, { body: params });
  }
}
