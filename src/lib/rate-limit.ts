export type RateLimitDecision = {
  allowed: boolean;
  limit: number;
  remaining: number;
  retryAfterSeconds: number;
};

export type RateLimitOptions = {
  limit: number;
  windowMs: number;
  maxTrackedKeys?: number;
};

type Bucket = {
  count: number;
  resetAt: number;
};

const DEFAULT_MAX_TRACKED_KEYS = 10_000;

export class RateLimiter {
  private readonly buckets = new Map<string, Bucket>();
  private readonly limit: number;
  private readonly windowMs: number;
  private readonly maxTrackedKeys: number;

  constructor({ limit, windowMs, maxTrackedKeys }: RateLimitOptions) {
    this.limit = limit;
    this.windowMs = windowMs;
    this.maxTrackedKeys = maxTrackedKeys ?? DEFAULT_MAX_TRACKED_KEYS;
  }

  check(key: string, now: number = Date.now()): RateLimitDecision {
    this.prune(now);

    const bucket = this.buckets.get(key);

    if (!bucket || bucket.resetAt <= now) {
      this.buckets.set(key, { count: 1, resetAt: now + this.windowMs });
      return {
        allowed: true,
        limit: this.limit,
        remaining: this.limit - 1,
        retryAfterSeconds: 0,
      };
    }

    bucket.count += 1;

    if (bucket.count > this.limit) {
      return {
        allowed: false,
        limit: this.limit,
        remaining: 0,
        retryAfterSeconds: Math.max(
          1,
          Math.ceil((bucket.resetAt - now) / 1_000)
        ),
      };
    }

    return {
      allowed: true,
      limit: this.limit,
      remaining: this.limit - bucket.count,
      retryAfterSeconds: 0,
    };
  }

  private prune(now: number): void {
    for (const [key, bucket] of this.buckets) {
      if (bucket.resetAt <= now) this.buckets.delete(key);
    }

    // A spoofed X-Forwarded-For could otherwise grow this map without bound.
    if (this.buckets.size <= this.maxTrackedKeys) return;

    const excess = this.buckets.size - this.maxTrackedKeys;
    let removed = 0;
    for (const key of this.buckets.keys()) {
      if (removed >= excess) break;
      this.buckets.delete(key);
      removed += 1;
    }
  }
}

export function clientKeyFromHeaders(headers: Headers): string {
  const forwardedFor = headers.get("x-forwarded-for");
  if (forwardedFor) {
    const first = forwardedFor.split(",")[0]?.trim();
    if (first) return first;
  }

  return headers.get("x-real-ip")?.trim() || "unknown";
}
