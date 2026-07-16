import type { ReactNode } from "react";
import Link from "next/link";
import Script from "next/script";

// Things I'm proud of — newest first. Add a `year` if you want it shown.
const proud: { text: string; year?: string }[] = [
  { text: "Named a Schulich Leader Scholar" },
  { text: "Software engineering internship at Shopify" },
  { text: "Studying computer science at the University of Toronto" },
];

type Project = {
  title: string;
  description: string;
  image: string; // path under /public, e.g. "/projects/foo.png"
  href?: string; // optional link (repo, demo, writeup)
};

// Projects — add a screenshot to /public/projects and a short blurb.
const projects: Project[] = [
  {
    title: "Project One",
    description:
      "A short description of what it does and why it was fun to build.",
    image: "/projects/placeholder-1.svg",
    href: "https://github.com/VincentQu888",
  },
  {
    title: "Project Two",
    description: "Swap in your own screenshot and description here.",
    image: "/projects/placeholder-2.svg",
  },
];

function Row({ label, children }: { label: string; children: ReactNode }) {
  return (
    <section className="grid grid-cols-1 gap-1.5 sm:grid-cols-[6rem_1fr] sm:gap-8">
      <h2 className="pt-0.5 font-mono text-xs uppercase tracking-[0.2em] text-muted">
        {label}
      </h2>
      <div className="space-y-3 leading-relaxed">{children}</div>
    </section>
  );
}

const linkClass =
  "underline decoration-edge underline-offset-4 transition-colors hover:decoration-foreground";

function A({ href, children }: { href: string; children: ReactNode }) {
  // Internal routes (e.g. "/blog") use next/link; static files (e.g.
  // "/resume.pdf") and external URLs use a plain anchor.
  const isRoute = href.startsWith("/") && !href.includes(".");
  if (isRoute) {
    return (
      <Link href={href} className={linkClass}>
        {children}
      </Link>
    );
  }
  const newTab = href.startsWith("http") || href.startsWith("/");
  return (
    <a
      href={href}
      {...(newTab ? { target: "_blank", rel: "noopener noreferrer" } : {})}
      className={linkClass}
    >
      {children}
    </a>
  );
}

export default function Home() {
  return (
    <main className="mx-auto flex min-h-dvh w-full max-w-xl flex-col justify-center gap-12 px-6 py-20">
      <header>
        <h1 className="text-2xl font-medium tracking-tight">Vincent Qu</h1>
        <p className="mt-2 text-muted">
          Learning about ML
        </p>
        <nav className="mt-5 flex gap-5 font-mono text-xs uppercase tracking-[0.2em] text-muted">
          <A href="/blog">blog</A>
          <A href="https://github.com/VincentQu888">github</A>
        </nav>
      </header>

      <div className="flex flex-col gap-9">
        <Row label="about">
          <p>
            SWE @ Shopify, Computer Science @ University of Toronto, <A href="https://schulichleaders.com/scholars/vincent-qu/">Schulich Leader Scholarship</A>.
          </p>
        </Row>

        <Row label="proud of">
          <ul className="space-y-2">
            {proud.map((item, i) => (
              <li key={i} className="flex gap-3">
                <span aria-hidden className="select-none text-muted">
                  —
                </span>
                <span>
                  {item.text}
                  {item.year && (
                    <span className="ml-2 font-mono text-xs text-muted">
                      {item.year}
                    </span>
                  )}
                </span>
              </li>
            ))}
          </ul>
        </Row>

        <Row label="blog">
          <p className="text-muted">
            Notes and essays on what I&apos;m building and learning —{" "}
            <A href="/blog">read the blog</A>.
          </p>
        </Row>

        <Row label="links">
          <ul className="space-y-1.5">
            <li>
              <A href="https://github.com/VincentQu888">GitHub</A>
            </li>
            <li>
              <A href="https://devpost.com/vincentqu888">Devpost</A>
            </li>
            <li>
              {/* TODO: drop resume.pdf into /public, or point this at a hosted resume */}
              <A href="/resume.pdf">Résumé</A>
            </li>
            <li>
              <A href="mailto:vincent.qu@mail.utoronto.ca">Email</A>
            </li>
          </ul>
        </Row>

        <Row label="projects">
          <div className="space-y-8">
            {projects.map((project) => (
              <article key={project.title} className="space-y-2.5">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={project.image}
                  alt={project.title}
                  className="aspect-video w-full rounded-md border border-edge object-cover"
                />
                <h3 className="font-medium">
                  {project.href ? (
                    <A href={project.href}>{project.title}</A>
                  ) : (
                    project.title
                  )}
                </h3>
                <p className="text-sm text-muted">{project.description}</p>
              </article>
            ))}
          </div>
        </Row>
      </div>

      <footer className="border-t border-edge pt-5 text-sm text-muted">
        <span>© {new Date().getFullYear()} Vincent Qu</span>
      </footer>

      {/* Webring badge, pinned to the bottom-right corner.
          Must be a <div> — webring.ca/embed.js only targets div[data-webring]. */}
      <div className="fixed bottom-4 right-4 z-10">
        <div data-webring="ca" data-member="vincent" />
      </div>
      <Script src="https://webring.ca/embed.js" strategy="afterInteractive" />
    </main>
  );
}
