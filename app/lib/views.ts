import { Redis } from "@upstash/redis";

// Lazily create a Redis client only when the REST credentials are present.
// This lets the site build and run normally (the counter just hides) before
// the datastore is configured. Vercel's "Redis" / KV integration injects these
// under different names depending on the provider, so we accept either pair:
//   UPSTASH_REDIS_REST_URL / UPSTASH_REDIS_REST_TOKEN   (Upstash integration)
//   KV_REST_API_URL        / KV_REST_API_TOKEN          (Vercel KV / Redis)
let redis: Redis | null = null;
let resolved = false;

function getRedis(): Redis | null {
  if (resolved) return redis;
  resolved = true;
  const url =
    process.env.UPSTASH_REDIS_REST_URL ?? process.env.KV_REST_API_URL;
  const token =
    process.env.UPSTASH_REDIS_REST_TOKEN ?? process.env.KV_REST_API_TOKEN;
  if (url && token) redis = new Redis({ url, token });
  return redis;
}

const key = (slug: string) => `views:${slug}`;

// Current view count. Returns null when the store isn't configured.
export async function getViews(slug: string): Promise<number | null> {
  const r = getRedis();
  if (!r) return null;
  const n = await r.get<number>(key(slug));
  return typeof n === "number" ? n : 0;
}

// Increment and return the new count. Returns null when not configured.
export async function incrementViews(slug: string): Promise<number | null> {
  const r = getRedis();
  if (!r) return null;
  return r.incr(key(slug));
}
