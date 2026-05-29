type Record = { count: number; reset: number };

// In-memory store — per-instance, good enough for Hobby tier single-region
const store = new Map<string, Record>();

export function checkRateLimit(ip: string): {
  ok: boolean;
  retryAfter?: number;
} {
  const max = parseInt(process.env.RATE_LIMIT_MAX ?? "20");
  const windowMs = parseInt(process.env.RATE_LIMIT_WINDOW_MS ?? "60000");
  const now = Date.now();

  const rec = store.get(ip);

  if (!rec || now >= rec.reset) {
    store.set(ip, { count: 1, reset: now + windowMs });
    return { ok: true };
  }

  rec.count += 1;

  if (rec.count > max) {
    return { ok: false, retryAfter: Math.ceil((rec.reset - now) / 1000) };
  }

  return { ok: true };
}
