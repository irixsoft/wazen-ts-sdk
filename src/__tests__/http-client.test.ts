import { describe, expect, test, beforeEach, afterEach, mock } from "bun:test";
import { HttpClient } from "../core/http-client.js";
import { WazenApiError, WazenNetworkError } from "../core/errors.js";

function mockFetch(response: object, status = 200) {
  return mock(() =>
    Promise.resolve(new Response(JSON.stringify(response), {
      status,
      headers: { "Content-Type": "application/json" },
    }))
  );
}

const SUCCESS_ENVELOPE = {
  success: true,
  data: { id: "123", name: "test" },
  meta: { timestamp: "2026-01-01T00:00:00Z", request_id: "req-abc" },
};

const ERROR_ENVELOPE = {
  success: false,
  error: { code: "SESSION_NOT_FOUND", message: "Session not found." },
  meta: { timestamp: "2026-01-01T00:00:00Z", request_id: "req-def" },
};

const PAGINATED_ENVELOPE = {
  success: true,
  data: [{ id: "1" }, { id: "2" }],
  meta: {
    timestamp: "2026-01-01T00:00:00Z",
    request_id: "req-pag",
    pagination: { page: 1, limit: 20, total: 2, has_more: false },
  },
};

describe("HttpClient", () => {
  let originalFetch: typeof globalThis.fetch;

  beforeEach(() => {
    originalFetch = globalThis.fetch;
  });

  afterEach(() => {
    globalThis.fetch = originalFetch;
  });

  test("sends Authorization header", async () => {
    const fetchMock = mockFetch(SUCCESS_ENVELOPE);
    globalThis.fetch = fetchMock as unknown as typeof fetch;

    const client = new HttpClient("wz_test123", "https://api.test.com", 30000);
    await client.request("GET", "/test");

    expect(fetchMock).toHaveBeenCalledTimes(1);
    const [url, init] = fetchMock.mock.calls[0] as [string, RequestInit];
    expect(url).toBe("https://api.test.com/test");
    expect((init.headers as Record<string, string>)["Authorization"]).toBe("Bearer wz_test123");
  });

  test("sends Content-Type for POST with body", async () => {
    const fetchMock = mockFetch(SUCCESS_ENVELOPE);
    globalThis.fetch = fetchMock as unknown as typeof fetch;

    const client = new HttpClient("wz_key", "https://api.test.com", 30000);
    await client.request("POST", "/items", { body: { name: "foo" } });

    const [, init] = fetchMock.mock.calls[0] as [string, RequestInit];
    expect((init.headers as Record<string, string>)["Content-Type"]).toBe("application/json");
    expect(init.body).toBe('{"name":"foo"}');
  });

  test("unwraps success envelope", async () => {
    globalThis.fetch = mockFetch(SUCCESS_ENVELOPE) as unknown as typeof fetch;

    const client = new HttpClient("wz_key", "https://api.test.com", 30000);
    const result = await client.request("GET", "/test");

    expect(result).toEqual({ id: "123", name: "test" });
  });

  test("throws WazenApiError on error envelope", async () => {
    globalThis.fetch = mockFetch(ERROR_ENVELOPE, 404) as unknown as typeof fetch;

    const client = new HttpClient("wz_key", "https://api.test.com", 30000);

    try {
      await client.request("GET", "/sessions/bad-id");
      expect(true).toBe(false);
    } catch (err) {
      expect(err).toBeInstanceOf(WazenApiError);
      const apiErr = err as WazenApiError;
      expect(apiErr.status).toBe(404);
      expect(apiErr.code).toBe("SESSION_NOT_FOUND");
      expect(apiErr.message).toBe("Session not found.");
      expect(apiErr.requestId).toBe("req-def");
    }
  });

  test("returns paginated response", async () => {
    globalThis.fetch = mockFetch(PAGINATED_ENVELOPE) as unknown as typeof fetch;

    const client = new HttpClient("wz_key", "https://api.test.com", 30000);
    const result = await client.requestPaginated("GET", "/items");

    expect(result.data).toEqual([{ id: "1" }, { id: "2" }]);
    expect(result.pagination).toEqual({ page: 1, limit: 20, total: 2, has_more: false });
  });

  test("appends query params to URL", async () => {
    const fetchMock = mockFetch(SUCCESS_ENVELOPE);
    globalThis.fetch = fetchMock as unknown as typeof fetch;

    const client = new HttpClient("wz_key", "https://api.test.com", 30000);
    await client.request("GET", "/items", { query: { page: 2, limit: 10, filter: undefined } });

    const [url] = fetchMock.mock.calls[0] as [string, RequestInit];
    expect(url).toContain("page=2");
    expect(url).toContain("limit=10");
    expect(url).not.toContain("filter");
  });

  test("throws WazenNetworkError on fetch failure", async () => {
    globalThis.fetch = mock(() => Promise.reject(new TypeError("Failed to connect"))) as unknown as typeof fetch;

    const client = new HttpClient("wz_key", "https://api.test.com", 30000);

    try {
      await client.request("GET", "/test");
      expect(true).toBe(false);
    } catch (err) {
      expect(err).toBeInstanceOf(WazenNetworkError);
    }
  });
});
