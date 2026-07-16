import fs from "node:fs";
import path from "node:path";
import matter from "gray-matter";
import { remark } from "remark";
import html from "remark-html";

const BLOG_DIR = path.join(process.cwd(), "content", "blog");

export type PostMeta = {
  slug: string;
  title: string;
  date: string; // ISO, e.g. "2026-07-16"
  summary: string;
};

export type Post = PostMeta & { contentHtml: string };

function getSlugs(): string[] {
  if (!fs.existsSync(BLOG_DIR)) return [];
  return fs
    .readdirSync(BLOG_DIR)
    .filter((f) => f.endsWith(".md"))
    .map((f) => f.replace(/\.md$/, ""));
}

function readMeta(slug: string): PostMeta {
  const raw = fs.readFileSync(path.join(BLOG_DIR, `${slug}.md`), "utf8");
  const { data } = matter(raw);
  return {
    slug,
    title: data.title ? String(data.title) : slug,
    date: data.date ? String(data.date) : "",
    summary: data.summary ? String(data.summary) : "",
  };
}

export function getAllPosts(): PostMeta[] {
  return getSlugs()
    .map(readMeta)
    .sort((a, b) => (a.date < b.date ? 1 : -1)); // newest first
}

export async function getPost(slug: string): Promise<Post | null> {
  const file = path.join(BLOG_DIR, `${slug}.md`);
  if (!fs.existsSync(file)) return null;

  const raw = fs.readFileSync(file, "utf8");
  const { data, content } = matter(raw);
  const processed = await remark().use(html).process(content);

  return {
    slug,
    title: data.title ? String(data.title) : slug,
    date: data.date ? String(data.date) : "",
    summary: data.summary ? String(data.summary) : "",
    contentHtml: processed.toString(),
  };
}

const MONTHS = [
  "Jan", "Feb", "Mar", "Apr", "May", "Jun",
  "Jul", "Aug", "Sep", "Oct", "Nov", "Dec",
];

// Format "2026-07-16" -> "Jul 16, 2026" without timezone surprises.
export function formatDate(iso: string): string {
  const [y, m, d] = iso.split("-").map(Number);
  if (!y || !m || !d) return iso;
  return `${MONTHS[m - 1]} ${d}, ${y}`;
}
