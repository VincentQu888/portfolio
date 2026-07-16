import type { ReactNode } from "react";
import Script from "next/script";

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

function A({ href, children }: { href: string; children: ReactNode }) {
  const external = href.startsWith("http");
  return (
    <a
      href={href}
      {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
      className="underline decoration-edge underline-offset-4 transition-colors hover:decoration-foreground"
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
          CS student &amp; software engineer. Building on the web, learning ML.
        </p>
      </header>

      <div className="flex flex-col gap-9">
        <Row label="about">
          <p>
            Computer science at the University of Toronto and a Schulich Leader
            Scholar. I like building simple, well-crafted software and figuring
            out how things work under the hood.
          </p>
        </Row>

        <Row label="now">
          <p>
            Software engineering intern at{" "}
            <A href="https://www.shopify.com">Shopify</A>, working on messaging.
            Spending my spare cycles learning machine learning.
          </p>
        </Row>

        <Row label="projects">
          <p className="text-muted">
            A few things in progress — code lives on{" "}
            <A href="https://github.com/VincentQu888">GitHub</A> for now.
          </p>
        </Row>

        <Row label="links">
          <ul className="space-y-1.5">
            <li>
              <A href="https://github.com/VincentQu888">GitHub</A>
            </li>
            <li>
              {/* TODO: replace with your public email */}
              <A href="mailto:you@example.com">Email</A>
            </li>
          </ul>
        </Row>
      </div>

      <footer className="flex items-center justify-between border-t border-edge pt-5 text-sm text-muted">
        <span>© {new Date().getFullYear()} Vincent Qu</span>
        <span data-webring="ca" data-member="vincent" />
      </footer>
      <Script src="https://webring.ca/embed.js" strategy="afterInteractive" />
    </main>
  );
}
