import { describe, expect, it } from "vitest";

import { RateLimiter, clientKeyFromHeaders } from "./rate-limit";

describe("RateLimiter", () => {
  it("allows requests up to the limit and blocks the next one", () => {
    const limiter = new RateLimiter({ limit: 3, windowMs: 1_000 });

    expect(limiter.check("a", 0).allowed).toBe(true);
    expect(limiter.check("a", 0).allowed).toBe(true);
    expect(limiter.check("a", 0).allowed).toBe(true);

    const blocked = limiter.check("a", 0);
    expect(blocked.allowed).toBe(false);
    expect(blocked.remaining).toBe(0);
    expect(blocked.retryAfterSeconds).toBe(1);
  });

  it("tracks each client independently", () => {
    const limiter = new RateLimiter({ limit: 1, windowMs: 1_000 });

    expect(limiter.check("a", 0).allowed).toBe(true);
    expect(limiter.check("b", 0).allowed).toBe(true);
    expect(limiter.check("a", 0).allowed).toBe(false);
  });

  it("lets a blocked client back in once the window rolls over", () => {
    const limiter = new RateLimiter({ limit: 1, windowMs: 1_000 });

    expect(limiter.check("a", 0).allowed).toBe(true);
    expect(limiter.check("a", 500).allowed).toBe(false);
    expect(limiter.check("a", 1_000).allowed).toBe(true);
  });

  it("reports remaining budget while under the limit", () => {
    const limiter = new RateLimiter({ limit: 3, windowMs: 1_000 });

    expect(limiter.check("a", 0).remaining).toBe(2);
    expect(limiter.check("a", 0).remaining).toBe(1);
  });

  it("bounds memory when a spoofed header invents new clients", () => {
    const limiter = new RateLimiter({
      limit: 1,
      windowMs: 60_000,
      maxTrackedKeys: 10,
    });

    for (let index = 0; index < 500; index += 1) {
      limiter.check(`client-${index}`, 0);
    }

    expect(limiter.check("client-499", 0).allowed).toBe(false);
  });
});

describe("clientKeyFromHeaders", () => {
  it("uses the first entry of x-forwarded-for", () => {
    const headers = new Headers({
      "x-forwarded-for": "203.0.113.5, 70.41.3.18",
    });

    expect(clientKeyFromHeaders(headers)).toBe("203.0.113.5");
  });

  it("falls back to x-real-ip, then to a constant", () => {
    expect(clientKeyFromHeaders(new Headers({ "x-real-ip": "203.0.113.9" }))).toBe(
      "203.0.113.9"
    );
    expect(clientKeyFromHeaders(new Headers())).toBe("unknown");
  });
});
