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
  { text: "Ascendant in Valorant" },
  { text: "Diamond in Overwatch" },
  { 
    text: "200 stars in bedwars",
    info: "[Old montage I made when I was 13](https://www.youtube.com/watch?v=L5clG2TMpI0&t=42s), probably the best demonstration of my old skill lol"
  },
  { text: "42s Tetris 40 line" },
  {
    text: "51 ZetaMac score",
    info: "Not great objectively, but I'm proud that I started with a score of 8 and got to 51 only a few weeks later.",
  },
  {
    text: "182 WPM",
    info: "Monkeytype on 15s, 166 WPM 30s",
  },
  { text: "2nd degree black belt in Taekwondo" },
  { text: "1500 ELO on chess.com" },
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
    description: "ML and ML infra for Messaging team, smart sending, impact projections, causal learning.",
  },
  {
    role: "Machine Learning Researcher, UTMIST",
    date: "2025/2026",
    description: "Engineering and research for UofT Machine Intelligence Student Team's FixMyElo, DFOD, and Agent Forge projects",
  },
];

type Project = {
  title: string;
  description: string;
  image?: string; // path under /public; optional when `youtube` is set
  href?: string; // optional link (repo, demo, writeup)
  youtube?: string; // YouTube URL — auto-uses its thumbnail and links to the video
  instagram?: string; // Instagram reel/post URL — links to the reel; pair with `image` for the thumbnail (IG has no public thumbnail URL)
};

// Projects — add a screenshot to /public/projects and a short blurb.
const projects: Project[] = [
  {
    title: "FSDAD - Generalizing Deepfake Audio Detection",
    description:
      "First time trying research, wrote a solo paper on framing deepfake audio detection as a meta-learning problem to try few-shot generalization of a deepfake audio detector to new deepfake generators.",
    image: "/projects/FSDAD.png",
    href: "https://github.com/VincentQu888/generalizing-deepfake-audio-detection",
  },
  {
    title: "FixMyElo",
    description: "Architected a self-explaining RL-based chess agent by using attention-weighted board states, policy/value networks and MCTS + UCT move calculation with PyTorch, CUDA and python-chess",
    image: "/projects/fixmyelo.png",
    href: "https://github.com/UTMIST/fix-my-elo",
  },
  {
    title: "Snowy",
    description: "Built an encoder-only transformer from scratch + discord bot for 11th grade CS class. Determines if school board Instagram posts indicate snow days.",
    image: "/projects/snowy.png",
    href: "https://github.com/VincentQu888/Snowy",
  },
  {
    title: "NRGHacks",
    description: "Founded a 100+ student high school hackathon. Built the website, hosted 3 workshops, and I was the keynote speaker!",
    image: "/projects/nrghacks.png",
    href: "https://vincentqu888.github.io/nrghacks2025/",
  },
  {
    title: "CalenDR",
    description: "Founded full-stack medical app to schedule immunization and cancer screening dates. Led entire SDLC and developed scheduling algorithms based on user-provided info.",
    image: "/projects/calendr.png",
  },
   {
    title: "GWJudge",
    description: "An online coding judge built to host problems and contests for the coding club at the Dr. G.W. Williams Secondary School. Inspired by https://dmoj.ca/. My first ever project!",
    image: "/projects/gwjudge.png",
    href: "https://github.com/VincentQu888/gw-coding-judge",
  },
];

// Other work
const otherWork: Project[] = [
  {
    title: "High Stakes",
    description: "Wrote, filmed, directed and acted in small short film just for fun!",
    image: "/projects/high-stakes.png",
    instagram: "https://www.instagram.com/reel/Dbh2D-lhjY5/?igsh=cWRucmMzY3JxeWZ6",
  },
  {
    title: "Ephemeral",
    description: "Weird Geometry Dash memory layout idea.",
    youtube: "https://www.youtube.com/watch?v=-horEvEZkBQ"
  },
  {
    title: "Lepido",
    description: "Probably the best layout I've ever created in Geometry Dash.",
    youtube: "https://www.youtube.com/watch?v=A4xfC3NHu9Y"
  },
  {
    title: "Reminiscence",
    description: "Hackathon project that uses 3DGS to reconstruct VR environments from plain video. I think the demo video we filmed is the cooler part though.",
    youtube: "youtube.com/watch?v=IPXhelhYv0w&source_ve_path=MjM4NTE&embeds_referring_euri=https%3A%2F%2Fdevpost.com%2F"
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

// Pull the 11-char video id out of common YouTube URL shapes.
function youTubeId(url: string): string | null {
  const m = url.match(
    /(?:youtu\.be\/|youtube\.com\/(?:watch\?v=|embed\/|shorts\/))([\w-]{11})/,
  );
  return m ? m[1] : null;
}

// Build a clean Instagram permalink from any share URL, dropping tracking
// params like ?igsh=. Instagram exposes no predictable thumbnail URL (unlike
// YouTube), so pair `instagram` with a local `image` for the card thumbnail.
function instagramUrl(url: string): string | null {
  const m = url.match(/instagram\.com\/(reels?|p|tv)\/([\w-]+)/);
  if (!m) return null;
  const kind = m[1] === "reels" ? "reel" : m[1];
  return `https://www.instagram.com/${kind}/${m[2]}/`;
}

// A scrollable list of project cards so a long list stays compact.
function ProjectList({ items }: { items: Project[] }) {
  return (
    <div className="scroll-thin max-h-[26rem] space-y-8 overflow-y-auto rounded-lg border border-edge p-4">
      {items.map((project) => {
        const videoId = project.youtube ? youTubeId(project.youtube) : null;
        const reelUrl = project.instagram
          ? instagramUrl(project.instagram)
          : null;
        const image = videoId
          ? `https://img.youtube.com/vi/${videoId}/hqdefault.jpg`
          : project.image;
        let href =
          project.href ??
          (videoId
            ? `https://www.youtube.com/watch?v=${videoId}`
            : reelUrl ?? project.youtube);
        // A URL without a scheme would be treated as a relative path (404).
        if (href && !/^(https?:|mailto:|\/)/.test(href)) {
          href = `https://${href}`;
        }
        const thumb = image ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={image}
            alt={project.title}
            className="aspect-video w-full rounded-md border border-edge object-cover"
          />
        ) : null;
        return (
          <article key={project.title} className="space-y-2.5">
            {href && thumb ? (
              <a
                href={href}
                {...(href.startsWith("http")
                  ? { target: "_blank", rel: "noopener noreferrer" }
                  : {})}
                className="block"
              >
                {thumb}
              </a>
            ) : (
              thumb
            )}
            <h3 className="font-medium">
              {href ? <A href={href}>{project.title}</A> : project.title}
            </h3>
            <p className="text-sm text-muted">{project.description}</p>
          </article>
        );
      })}
    </div>
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
          <A href="https://dmoj.ca/user/vincentqu">dmoj</A>
          <A href="https://ca.linkedin.com/in/vincentqu888">linkedin</A>
          <A href="https://x.com/icyfallblade">x</A>
          <A href="https://devpost.com/vincentqu888">devpost</A>
        </nav>
      </header>

      <div className="flex flex-col gap-9">
        <Row label="about">
          <p>
            Prev. @ Shopify, 1st Year Computer Science @ University of Toronto, <A href="https://schulichleaders.com/scholars/vincent-qu/">Schulich Leader</A>.
          </p>
        </Row>

        <Row label="experience">
          <div className="space-y-5">
            {experiences.map((exp, i) => (
              <div key={i}>
                <div className="flex items-baseline justify-between gap-4">
                  <h3 className="font-medium">
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

        <Row label="projects">
          <ProjectList items={projects} />
        </Row>

        <Row label="other work">
          <ProjectList items={otherWork} />
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
              <A href="https://dmoj.ca/user/vincentqu">DMOJ</A>
            </li>
            <li>
              <A href="https://ca.linkedin.com/in/vincentqu888">LinkedIn</A>
            </li>
            <li>
              <A href="https://x.com/icyfallblade">X</A>
            </li>
            <li>
              <A href="https://devpost.com/vincentqu888">Devpost</A>
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
      <BackgroundMusic />
    </main>
  );
}
