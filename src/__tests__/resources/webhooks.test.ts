import { describe, expect, test, beforeEach, afterEach, mock } from "bun:test";
import { Webhooks } from "../../resources/webhooks.js";
import { HttpClient } from "../../core/http-client.js";

function mockFetch(data: unknown, status = 200, pagination?: unknown) {
  return mock(() =>
    Promise.resolve(new Response(JSON.stringify({
      success: true,
      data,
      meta: {
        timestamp: "2026-01-01T00:00:00Z",
        request_id: "req-1",
        ...(pagination ? { pagination } : {}),
      },
    }), {
      status,
      headers: { "Content-Type": "application/json" },
    }))
  );
}

describe("Webhooks resource", () => {
  let originalFetch: typeof globalThis.fetch;
  let webhooks: Webhooks;

  beforeEach(() => {
    originalFetch = globalThis.fetch;
    const client = new HttpClient("wz_test", "https://api.test.com", 30000);
    webhooks = new Webhooks(client);
  });

  afterEach(() => {
    globalThis.fetch = originalFetch;
  });

  test("create sends POST /webhooks", async () => {
    const fetchMock = mockFetch({ id: "wh1", secret: "abc", enabled: true });
    globalThis.fetch = fetchMock as unknown as typeof fetch;

    await webhooks.create({
      url: "https://example.com/webhook",
      events: ["message.received"],
    });

    const [url, init] = fetchMock.mock.calls[0] as [string, RequestInit];
    expect(url).toBe("https://api.test.com/webhooks");
    expect(init.method).toBe("POST");
    const body = JSON.parse(init.body as string);
    expect(body.url).toBe("https://example.com/webhook");
    expect(body.events).toEqual(["message.received"]);
  });

  test("list sends GET /webhooks with pagination", async () => {
    const fetchMock = mockFetch(
      [{ id: "wh1" }],
      200,
      { page: 1, limit: 20, total: 1, has_more: false },
    );
    globalThis.fetch = fetchMock as unknown as typeof fetch;

    const result = await webhooks.list();

    const [url] = fetchMock.mock.calls[0] as [string, RequestInit];
    expect(url).toContain("/webhooks");
    expect(result.data).toHaveLength(1);
  });

  test("update sends PUT /webhooks/:id", async () => {
    const fetchMock = mockFetch({ id: "wh1", enabled: false });
    globalThis.fetch = fetchMock as unknown as typeof fetch;

    await webhooks.update("wh1", { enabled: false });

    const [url, init] = fetchMock.mock.calls[0] as [string, RequestInit];
    expect(url).toBe("https://api.test.com/webhooks/wh1");
    expect(init.method).toBe("PUT");
  });

  test("delete sends DELETE /webhooks/:id", async () => {
    const fetchMock = mockFetch({ id: "wh1", deleted: true });
    globalThis.fetch = fetchMock as unknown as typeof fetch;

    const result = await webhooks.delete("wh1");

    const [url, init] = fetchMock.mock.calls[0] as [string, RequestInit];
    expect(url).toBe("https://api.test.com/webhooks/wh1");
    expect(init.method).toBe("DELETE");
    expect(result).toEqual({ id: "wh1", deleted: true });
  });

  test("test sends POST /webhooks/:id/test", async () => {
    const fetchMock = mockFetch({ message: "Test webhook queued.", webhook_id: "wh1" });
    globalThis.fetch = fetchMock as unknown as typeof fetch;

    await webhooks.test("wh1", { event_type: "message.received" });

    const [url, init] = fetchMock.mock.calls[0] as [string, RequestInit];
    expect(url).toBe("https://api.test.com/webhooks/wh1/test");
    expect(init.method).toBe("POST");
  });

  test("getLogs sends GET /webhooks/:id/logs", async () => {
    const fetchMock = mockFetch([{ id: "log1", success: true }]);
    globalThis.fetch = fetchMock as unknown as typeof fetch;

    const result = await webhooks.getLogs("wh1");

    const [url, init] = fetchMock.mock.calls[0] as [string, RequestInit];
    expect(url).toBe("https://api.test.com/webhooks/wh1/logs");
    expect(init.method).toBe("GET");
    expect(result).toHaveLength(1);
  });
});
