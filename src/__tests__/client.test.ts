import { describe, expect, test } from "bun:test";
import { Wazen } from "../client.js";
import { Sessions } from "../resources/sessions.js";
import { Messages } from "../resources/messages.js";
import { Contacts } from "../resources/contacts.js";
import { Groups } from "../resources/groups.js";
import { Channels } from "../resources/channels.js";
import { Warming } from "../resources/warming.js";
import { Webhooks } from "../resources/webhooks.js";
import { AccountResource } from "../resources/account.js";
import { ApiKeys } from "../resources/api-keys.js";

describe("Wazen client", () => {
  test("throws on empty API key", () => {
    expect(() => new Wazen("")).toThrow("API key is required");
  });

  test("throws on non-string API key", () => {
    // @ts-expect-error testing invalid input
    expect(() => new Wazen(null)).toThrow("API key is required");
  });

  test("creates all resource instances", () => {
    const wazen = new Wazen("wz_test_key");
    expect(wazen.sessions).toBeInstanceOf(Sessions);
    expect(wazen.messages).toBeInstanceOf(Messages);
    expect(wazen.contacts).toBeInstanceOf(Contacts);
    expect(wazen.groups).toBeInstanceOf(Groups);
    expect(wazen.channels).toBeInstanceOf(Channels);
    expect(wazen.warming).toBeInstanceOf(Warming);
    expect(wazen.webhooks).toBeInstanceOf(Webhooks);
    expect(wazen.account).toBeInstanceOf(AccountResource);
    expect(wazen.apiKeys).toBeInstanceOf(ApiKeys);
  });

  test("accepts custom options", () => {
    const wazen = new Wazen("wz_key", {
      baseUrl: "https://custom.api.com/v1",
      timeout: 5000,
    });
    expect(wazen).toBeDefined();
  });
});
