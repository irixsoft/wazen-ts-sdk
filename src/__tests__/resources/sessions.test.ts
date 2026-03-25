import { describe, expect, test, beforeEach, afterEach, mock } from "bun:test";
import { Sessions } from "../../resources/sessions.js";
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

describe("Sessions resource", () => {
  let originalFetch: typeof globalThis.fetch;
  let sessions: Sessions;

  beforeEach(() => {
    originalFetch = globalThis.fetch;
    const client = new HttpClient("wz_test", "https://api.test.com", 30000);
    sessions = new Sessions(client);
  });

  afterEach(() => {
    globalThis.fetch = originalFetch;
  });

  test("create sends POST /sessions", async () => {
    const fetchMock = mockFetch({ id: "s1", status: "pending" });
    globalThis.fetch = fetchMock as unknown as typeof fetch;

    const result = await sessions.create({ phone_number: "+1234567890" });

    const [url, init] = fetchMock.mock.calls[0] as [string, RequestInit];
    expect(url).toBe("https://api.test.com/sessions");
    expect(init.method).toBe("POST");
    expect(result).toEqual({ id: "s1", status: "pending" });
  });

  test("list sends GET /sessions with pagination", async () => {
    const fetchMock = mockFetch(
      [{ id: "s1" }],
      { page: 1, limit: 20, total: 1, has_more: false },
    );
    globalThis.fetch = fetchMock as unknown as typeof fetch;

    const result = await sessions.list({ page: 1, limit: 20 });

    const [url] = fetchMock.mock.calls[0] as [string, RequestInit];
    expect(url).toContain("/sessions");
    expect(result.data).toEqual([{ id: "s1" }]);
    expect(result.pagination.total).toBe(1);
  });

  test("get sends GET /sessions/:id", async () => {
    const fetchMock = mockFetch({ id: "s1", qr_code: null });
    globalThis.fetch = fetchMock as unknown as typeof fetch;

    await sessions.get("s1");

    const [url, init] = fetchMock.mock.calls[0] as [string, RequestInit];
    expect(url).toBe("https://api.test.com/sessions/s1");
    expect(init.method).toBe("GET");
  });

  test("delete sends DELETE /sessions/:id", async () => {
    const fetchMock = mockFetch({ message: "Session deleted." });
    globalThis.fetch = fetchMock as unknown as typeof fetch;

    const result = await sessions.delete("s1");

    const [url, init] = fetchMock.mock.calls[0] as [string, RequestInit];
    expect(url).toBe("https://api.test.com/sessions/s1");
    expect(init.method).toBe("DELETE");
    expect(result.message).toBe("Session deleted.");
  });

  test("restart sends POST /sessions/:id/restart", async () => {
    const fetchMock = mockFetch({ message: "Session restarted." });
    globalThis.fetch = fetchMock as unknown as typeof fetch;

    await sessions.restart("s1");

    const [url, init] = fetchMock.mock.calls[0] as [string, RequestInit];
    expect(url).toBe("https://api.test.com/sessions/s1/restart");
    expect(init.method).toBe("POST");
  });

  test("getQr sends GET /sessions/:id/qr", async () => {
    const fetchMock = mockFetch({ id: "s1", status: "pending", qr_code: "abc123" });
    globalThis.fetch = fetchMock as unknown as typeof fetch;

    const result = await sessions.getQr("s1");

    const [url] = fetchMock.mock.calls[0] as [string, RequestInit];
    expect(url).toBe("https://api.test.com/sessions/s1/qr");
    expect(result.qr_code).toBe("abc123");
  });

  test("factoryReset sends POST /sessions/:id/factory-reset", async () => {
    const fetchMock = mockFetch({ message: "Session factory reset complete." });
    globalThis.fetch = fetchMock as unknown as typeof fetch;

    await sessions.factoryReset("s1");

    const [url, init] = fetchMock.mock.calls[0] as [string, RequestInit];
    expect(url).toBe("https://api.test.com/sessions/s1/factory-reset");
    expect(init.method).toBe("POST");
  });
});
