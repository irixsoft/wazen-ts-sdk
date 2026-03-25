import { describe, expect, test, beforeEach, afterEach, mock } from "bun:test";
import { Messages } from "../../resources/messages.js";
import { HttpClient } from "../../core/http-client.js";

function mockFetch(data: unknown, pagination?: unknown) {
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
      status: 200,
      headers: { "Content-Type": "application/json" },
    }))
  );
}

describe("Messages resource", () => {
  let originalFetch: typeof globalThis.fetch;
  let messages: Messages;

  beforeEach(() => {
    originalFetch = globalThis.fetch;
    const client = new HttpClient("wz_test", "https://api.test.com", 30000);
    messages = new Messages(client);
  });

  afterEach(() => {
    globalThis.fetch = originalFetch;
  });

  test("send sends POST /sessions/:id/messages with body", async () => {
    const fetchMock = mockFetch({ id: "m1", status: "queued" });
    globalThis.fetch = fetchMock as unknown as typeof fetch;

    await messages.send("s1", {
      to: "+1234567890",
      type: "text",
      content: "Hello!",
    });

    const [url, init] = fetchMock.mock.calls[0] as [string, RequestInit];
    expect(url).toBe("https://api.test.com/sessions/s1/messages");
    expect(init.method).toBe("POST");
    const body = JSON.parse(init.body as string);
    expect(body.to).toBe("+1234567890");
    expect(body.type).toBe("text");
    expect(body.content).toBe("Hello!");
  });

  test("list sends GET /sessions/:id/messages with query params", async () => {
    const fetchMock = mockFetch(
      [{ id: "m1" }],
      { page: 1, limit: 10, total: 1, has_more: false },
    );
    globalThis.fetch = fetchMock as unknown as typeof fetch;

    const result = await messages.list("s1", { direction: "outgoing", limit: 10 });

    const [url] = fetchMock.mock.calls[0] as [string, RequestInit];
    expect(url).toContain("/sessions/s1/messages");
    expect(url).toContain("direction=outgoing");
    expect(url).toContain("limit=10");
    expect(result.data).toHaveLength(1);
  });

  test("get sends GET /sessions/:id/messages/:msgId", async () => {
    const fetchMock = mockFetch({ id: "m1", content: "Hello" });
    globalThis.fetch = fetchMock as unknown as typeof fetch;

    const result = await messages.get("s1", "m1");

    const [url, init] = fetchMock.mock.calls[0] as [string, RequestInit];
    expect(url).toBe("https://api.test.com/sessions/s1/messages/m1");
    expect(init.method).toBe("GET");
    expect(result).toEqual({ id: "m1", content: "Hello" });
  });
});
