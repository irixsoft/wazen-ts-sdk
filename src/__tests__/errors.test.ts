import { describe, expect, test } from "bun:test";
import { WazenApiError, WazenTimeoutError, WazenNetworkError } from "../core/errors.js";

describe("WazenApiError", () => {
  test("has correct properties", () => {
    const error = new WazenApiError("Not found", 404, "SESSION_NOT_FOUND", "req-123", null);
    expect(error.message).toBe("Not found");
    expect(error.status).toBe(404);
    expect(error.code).toBe("SESSION_NOT_FOUND");
    expect(error.requestId).toBe("req-123");
    expect(error.details).toBeNull();
    expect(error.name).toBe("WazenApiError");
  });

  test("is instanceof Error", () => {
    const error = new WazenApiError("test", 400, "VALIDATION_ERROR", "req-1");
    expect(error).toBeInstanceOf(Error);
    expect(error).toBeInstanceOf(WazenApiError);
  });

  test("stores details", () => {
    const details = [{ path: ["name"], message: "Required" }];
    const error = new WazenApiError("Invalid", 400, "VALIDATION_ERROR", "req-2", details);
    expect(error.details).toEqual(details);
  });
});

describe("WazenTimeoutError", () => {
  test("has correct properties", () => {
    const error = new WazenTimeoutError(30000);
    expect(error.message).toBe("Request timed out after 30000ms");
    expect(error.name).toBe("WazenTimeoutError");
    expect(error).toBeInstanceOf(Error);
  });
});

describe("WazenNetworkError", () => {
  test("wraps Error cause", () => {
    const cause = new Error("ECONNREFUSED");
    const error = new WazenNetworkError(cause);
    expect(error.message).toBe("ECONNREFUSED");
    expect(error.name).toBe("WazenNetworkError");
    expect(error.cause).toBe(cause);
    expect(error).toBeInstanceOf(Error);
  });

  test("handles non-Error cause", () => {
    const error = new WazenNetworkError("something");
    expect(error.message).toBe("Network request failed");
  });
});
