import type { ReactNode } from "react";
import Link from "next/link";
import Script from "next/script";
import BackgroundMusic from "./BackgroundMusic";

// Things I'm proud of — newest first. Add a `year` if you want it shown.
const proud: { text: string; year?: string; info?: string }[] = [
  {
    text: "Awarded a [Schulich Leader Scholarship](https://schulichleaders.com/scholars/vincent-qu/) at both UofT and UBC",
    info: "One of 100 students across Canada awarded the Schulich Leader Scholarship, the country's largest STEM undergraduate scholarship at the top 2 ranked Canadian universities.",
  },
  {
    text: "Top 300 by points on [DMOJ](https://dmoj.ca/user/vincentqu)",
    info: "(At peak rank) The largest competitive programming website in Canada",
  },
  {
    text: "Top 6000 in Geometry Dash",
    info: "[Completion video](https://www.youtube.com/watch?v=IC_2_WASt2A) for the hardest level I've beaten, ranking is by AREDL standards. I'm currently playing [Slaughterhouse](https://www.youtube.com/watch?v=7W5bZJY2IPI) and I have it in 5 runs.",
  },
  { 
    text: "Grandmaster in Overwatch",
    info: "99th percentile, peak >4.2k SR. Lowkey this one is kinda larp cuz I was actually 1 game from GM rankup but it's ok."
  },
  { text: "Ascendant in Valorant" },
  { 
    text: "200 stars in bedwars",
    info: "[Old montage I made when I was 13](https://www.youtube.com/watch?v=L5clG2TMpI0&t=42s), probably the best demonstration of my skill lol. Fun fact, I block trapped the #1 player Manhal_IQ_ in a [private scrimmage game (1:02)](https://www.youtube.com/watch?v=B_eAyZv2vb8&t=62s)."
  },
  { text: "42s Tetris 40 line" },
  {
    text: "183 WPM",
    info: "Monkeytype on 15s, 173 WPM 30s",
  },
  { text: "2nd degree black belt in Taekwondo" },
  {
    text: "IPA Team @ UofT",
    info: "1 of 15 students selected for UofT's competitive poker (Intercollegiate Poker Association) tournament team",
  },
];

type Experience = {
  role: string; // supports [label](url) links
  date: string;
  description?: string; // supports [label](url) links
};

// Experience — resume-style; edit roles, dates, and descriptions.
const experiences: Experience[] = [
  {
    role: "Software Engineering Intern, Shopify",
    date: "2026",
    description: "ML and ML infra for Messaging team on smart sending, impact projections, causal learning",
  },
  {
    role: "Machine Learning Engineer, UTMIST",
    date: "2025/2026",
    description: "Engineering and research for UofT Machine Intelligence Student Team's FixMyElo, DFOD, and Agent Forge projects",
  },
  {
    role: "[More experience](/experience)",
    date: "",
    description: "",
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
  // "/file.svg") and external URLs use a plain anchor.
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
          <A href="/work">work</A>
          <A href="https://github.com/VincentQu888">github</A>
          <A href="https://ca.linkedin.com/in/vincentqu888">linkedin</A>
          <A href="https://x.com/icyfallblade">x</A>
          <A href="https://devpost.com/vincentqu888">devpost</A>
          <A href="mailto:vincent.qu@mail.utoronto.ca">email</A>
        </nav>
      </header>

      <div className="flex flex-col gap-9">
        <Row label="about">
          <p>
            Prev. @ Shopify, 2nd Year Computer Science @ University of Toronto, <A href="https://schulichleaders.com/scholars/vincent-qu/">Schulich Leader</A>.
          </p>
        </Row>

        <Row label="experience">
          <div className="space-y-5">
            {experiences.map((exp, i) => (
              <div key={i}>
                <div className="flex items-baseline justify-between gap-4">
                  <h3 className={exp.role.includes("/experience") ? undefined : "font-medium"}>
                    <Rich>{exp.role}</Rich>
                  </h3>
                  <span className="shrink-0 whitespace-nowrap font-mono text-xs text-muted">
                    {exp.date}
                  </span>
                </div>
                {exp.description && (
                  <p className="mt-1 text-sm text-muted">
                    <Rich>{exp.description}</Rich>
                  </p>
                )}
              </div>
            ))}
          </div>
        </Row>

        <Row label="proud of!">
          <ul className="space-y-2">
            {proud.map((item, i) => (
              <li key={i}>
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
      </div>

      <footer className="flex items-center justify-between border-t border-edge pt-5 text-sm text-muted">
        <span>© {new Date().getFullYear()} Vincent Qu</span>
        {/* Must be a <div> — webring.ca/embed.js only targets div[data-webring]. */}
        <div data-webring="ca" data-member="vincent" />
      </footer>
      <Script src="https://webring.ca/embed.js" strategy="afterInteractive" />
      <BackgroundMusic />
    </main>
  );
}
