import Link from "next/link";
import type { Metadata } from "next";
import { getAllPosts, formatDate } from "../lib/posts";

export const metadata: Metadata = {
  title: "Writing — Vincent Qu",
  description: "Notes, essays, and half-formed ideas.",
};

export default function BlogIndex() {
  const posts = getAllPosts();

  return (
    <main className="mx-auto w-full max-w-xl px-6 py-20 sm:py-28">
      <Link
        href="/"
        className="font-mono text-xs uppercase tracking-[0.2em] text-muted underline decoration-edge underline-offset-4 transition-colors hover:decoration-foreground"
      >
        ← home
      </Link>

      <h1 className="mt-8 text-2xl font-medium tracking-tight">Writing.</h1>

      {posts.length === 0 ? (
        <p className="mt-8 text-muted">No posts yet.</p>
      ) : (
        <ul className="mt-10 flex flex-col gap-6">
          {posts.map((post) => (
            <li key={post.slug}>
              <Link href={`/blog/${post.slug}`} className="group block">
                <time className="font-mono text-xs uppercase tracking-[0.2em] text-muted">
                  {formatDate(post.date)}
                </time>
                <h2 className="mt-1 underline decoration-edge underline-offset-4 transition-colors group-hover:decoration-foreground">
                  {post.title}
                </h2>
                {post.summary && (
                  <p className="mt-1 text-muted">{post.summary}</p>
                )}
              </Link>
            </li>
          ))}
        </ul>
      )}
    </main>
  );
}
