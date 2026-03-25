import { HttpClient } from "./core/http-client.js";
import type { WazenClientOptions } from "./core/types.js";
import { Sessions } from "./resources/sessions.js";
import { Messages } from "./resources/messages.js";
import { Contacts } from "./resources/contacts.js";
import { Groups } from "./resources/groups.js";
import { Channels } from "./resources/channels.js";
import { Warming } from "./resources/warming.js";
import { Webhooks } from "./resources/webhooks.js";
import { AccountResource } from "./resources/account.js";
import { ApiKeys } from "./resources/api-keys.js";

const DEFAULT_BASE_URL = "https://wazen.dev/api/v1";
const DEFAULT_TIMEOUT = 30_000;

/**
 * Wazen API client. Create an instance with your API key to access all resources.
 *
 * @example
 * ```typescript
 * import { Wazen } from "wazen";
 * const wazen = new Wazen("wz_your_api_key");
 * const sessions = await wazen.sessions.list();
 * ```
 */
export class Wazen {
  readonly sessions: Sessions;
  readonly messages: Messages;
  readonly contacts: Contacts;
  readonly groups: Groups;
  readonly channels: Channels;
  readonly warming: Warming;
  readonly webhooks: Webhooks;
  readonly account: AccountResource;
  readonly apiKeys: ApiKeys;

  /**
   * @param apiKey - Your Wazen API key (prefixed with `wz_`)
   * @param options - Optional configuration (baseUrl, timeout)
   */
  constructor(apiKey: string, options?: WazenClientOptions) {
    if (!apiKey || typeof apiKey !== "string") {
      throw new Error("API key is required. Pass your Wazen API key as the first argument.");
    }

    const client = new HttpClient(
      apiKey,
      options?.baseUrl ?? DEFAULT_BASE_URL,
      options?.timeout ?? DEFAULT_TIMEOUT,
    );

    this.sessions = new Sessions(client);
    this.messages = new Messages(client);
    this.contacts = new Contacts(client);
    this.groups = new Groups(client);
    this.channels = new Channels(client);
    this.warming = new Warming(client);
    this.webhooks = new Webhooks(client);
    this.account = new AccountResource(client);
    this.apiKeys = new ApiKeys(client);
  }
}
