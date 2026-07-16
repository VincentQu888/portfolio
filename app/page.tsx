import type { ReactNode } from "react";
import Link from "next/link";
import Script from "next/script";

// Things I'm proud of — newest first. Add a `year` if you want it shown.
const proud: { text: string; year?: string; info?: string }[] = [
  {
    text: "Awarded a [Schulich Leader Scholarship](https://schulichleaders.com/scholars/vincent-qu/) at both UofT and UBC",
    info: "One of 100 students across Canada awarded the Schulich Leader Scholarship, the country's largest STEM undergraduate scholarship at the top 2 ranked Canadian universities.",
  },
  {
    text: "Top 300 by points on DMOJ",
    info: "",
  },
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

// Render a plain string, turning [label](href) markdown-style links into <A>.
function Rich({ children }: { children: string }) {
  const parts: ReactNode[] = [];
  const pattern = /\[([^\]]+)\]\(([^)]+)\)/g;
  let last = 0;
  let key = 0;
  let m: RegExpExecArray | null;
  while ((m = pattern.exec(children)) !== null) {
    if (m.index > last) parts.push(children.slice(last, m.index));
    parts.push(
      <A key={key++} href={m[2]}>
        {m[1]}
      </A>,
    );
    last = pattern.lastIndex;
  }
  if (last < children.length) parts.push(children.slice(last));
  return <>{parts}</>;
}

// Small circled "i" with a hover/focus tooltip (CSS-only, no client JS).
function Info({ children }: { children: ReactNode }) {
  return (
    <span className="group relative ml-1.5 inline-flex align-middle">
      <span
        tabIndex={0}
        aria-label="More info"
        className="inline-flex h-4 w-4 cursor-help items-center justify-center rounded-full border border-edge font-mono text-[10px] leading-none text-muted transition-colors hover:border-foreground hover:text-foreground focus:outline-none"
      >
        i
      </span>
      <span
        role="tooltip"
        className="pointer-events-none absolute bottom-full left-1/2 z-20 w-max max-w-[16rem] -translate-x-1/2 pb-2 opacity-0 transition-opacity duration-150 group-hover:pointer-events-auto group-hover:opacity-100 group-focus-within:pointer-events-auto group-focus-within:opacity-100"
      >
        <span className="block rounded-md border border-edge bg-background px-2.5 py-1.5 text-xs font-normal leading-snug text-foreground shadow-sm">
          {children}
        </span>
      </span>
    </span>
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
          <A href="https://devpost.com/vincentqu888">devpost</A>
          <A href="/resume.pdf">resume</A>
        </nav>
      </header>

      <div className="flex flex-col gap-9">
        <Row label="about">
          <p>
            SWE @ Shopify, Computer Science @ University of Toronto, <A href="https://schulichleaders.com/scholars/vincent-qu/">Schulich Leader Scholarship</A>.
          </p>
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

        <Row label="proud of!">
          <ul className="space-y-2">
            {proud.map((item, i) => (
              <li key={i} className="flex gap-3">
                <span aria-hidden className="select-none text-muted">
                  —
                </span>
                <span>
                  <Rich>{item.text}</Rich>
                  {item.year && (
                    <span className="ml-2 font-mono text-xs text-muted">
                      {item.year}
                    </span>
                  )}
                  {item.info && (
                    <Info>
                      <Rich>{item.info}</Rich>
                    </Info>
                  )}
                </span>
              </li>
            ))}
          </ul>
        </Row>

        <Row label="blog">
          <p className="text-muted">
            Thoughts on things I learn, stories, and anything else I feel like writing about! —{" "}
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
              <A href="/resume.pdf">Resume</A>
            </li>
            <li>
              <A href="mailto:vincent.qu@mail.utoronto.ca">Email</A>
            </li>
          </ul>
        </Row>

      </div>

      <footer className="flex items-center justify-between border-t border-edge pt-5 text-sm text-muted">
        <span>© {new Date().getFullYear()} Vincent Qu</span>
        {/* Must be a <div> — webring.ca/embed.js only targets div[data-webring]. */}
        <div data-webring="ca" data-member="vincent" />
      </footer>
      <Script src="https://webring.ca/embed.js" strategy="afterInteractive" />
    </main>
  );
}
