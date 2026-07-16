import Link from "next/link";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { getAllPosts, getPost, formatDate } from "../../lib/posts";

export function generateStaticParams() {
  return getAllPosts().map((post) => ({ slug: post.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const post = await getPost(slug);
  if (!post) return {};
  return {
    title: `${post.title} — Vincent Qu`,
    description: post.summary,
  };
}

export default async function PostPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post = await getPost(slug);
  if (!post) notFound();

  return (
    <main className="mx-auto w-full max-w-xl px-6 py-20 sm:py-28">
      <Link
        href="/blog"
        className="font-mono text-xs uppercase tracking-[0.2em] text-muted underline decoration-edge underline-offset-4 transition-colors hover:decoration-foreground"
      >
        ← writing
      </Link>

      <article className="mt-8">
        <header className="mb-8">
          <time className="font-mono text-xs uppercase tracking-[0.2em] text-muted">
            {formatDate(post.date)}
          </time>
          <h1 className="mt-2 text-2xl font-medium tracking-tight">
            {post.title}
          </h1>
        </header>

        <div
          className="prose"
          dangerouslySetInnerHTML={{ __html: post.contentHtml }}
        />
      </article>
    </main>
  );
}
