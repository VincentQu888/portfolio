import { NextResponse } from "next/server";
import { getAllPosts } from "@/app/lib/posts";
import { getViews, incrementViews } from "@/app/lib/views";

// Reads/writes a live counter, so never prerender or cache this route.
export const runtime = "nodejs";
export const dynamic = "force-dynamic";

// Only allow counting real posts, so nobody can spam arbitrary Redis keys.
function isRealPost(slug: string): boolean {
  return getAllPosts().some((p) => p.slug === slug);
}

export async function GET(
  req: Request,
  { params }: { params: Promise<{ slug: string }> },
) {
  const { slug } = await params;
  // Safe self-check: reports only WHETHER creds are visible, never the values.
  if (new URL(req.url).searchParams.get("diag") === "1") {
    return NextResponse.json({
      upstash: Boolean(
        process.env.UPSTASH_REDIS_REST_URL &&
          process.env.UPSTASH_REDIS_REST_TOKEN,
      ),
      kv: Boolean(
        process.env.KV_REST_API_URL && process.env.KV_REST_API_TOKEN,
      ),
    });
  }
  if (!isRealPost(slug)) {
    return NextResponse.json({ error: "not found" }, { status: 404 });
  }
  return NextResponse.json({ views: await getViews(slug) });
}

export async function POST(
  _req: Request,
  { params }: { params: Promise<{ slug: string }> },
) {
  const { slug } = await params;
  if (!isRealPost(slug)) {
    return NextResponse.json({ error: "not found" }, { status: 404 });
  }
  return NextResponse.json({ views: await incrementViews(slug) });
}
