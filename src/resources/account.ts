import { BaseResource } from "./base.js";
import type { Account, Usage } from "../types/account.js";

export class AccountResource extends BaseResource {
  get(): Promise<Account> {
    return this.client.request<Account>("GET", "/account");
  }

  getUsage(): Promise<Usage> {
    return this.client.request<Usage>("GET", "/usage");
  }
}
