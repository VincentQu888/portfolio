import type { Metadata } from "next";
import Link from "next/link";
import type { ReactNode } from "react";

export const metadata: Metadata = {
  title: "Work — Vincent Qu",
  description: "Projects and other work by Vincent Qu.",
};

type Project = {
  title: string;
  description: string;
  image?: string;
  href?: string;
  youtube?: string;
  instagram?: string;
};

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
    description:
      "Architected a self-explaining RL-based chess agent by using attention-weighted board states, policy/value networks and MCTS + UCT move calculation with PyTorch, CUDA and python-chess",
    image: "/projects/fixmyelo.png",
    href: "https://github.com/UTMIST/fix-my-elo",
  },
  {
    title: "Snowy",
    description:
      "Built an encoder-only transformer from scratch + discord bot for 11th grade CS class. Determines if school board Instagram posts indicate snow days.",
    image: "/projects/snowy.png",
    href: "https://github.com/VincentQu888/Snowy",
  },
  {
    title: "NRGHacks",
    description:
      "Founded a 100+ student high school hackathon. Built the website, hosted 3 workshops, and I was the keynote speaker!",
    image: "/projects/nrghacks.png",
    href: "https://vincentqu888.github.io/nrghacks2025/",
  },
  {
    title: "CalenDR",
    description:
      "Founded full-stack medical app to schedule immunization and cancer screening dates. Led entire SDLC and developed scheduling algorithms based on user-provided info.",
    image: "/projects/calendr.png",
  },
  {
    title: "GWJudge",
    description:
      "An online coding judge built to host problems and contests for the coding club at the Dr. G.W. Williams Secondary School. Inspired by https://dmoj.ca/. My first ever project!",
    image: "/projects/gwjudge.png",
    href: "https://github.com/VincentQu888/gw-coding-judge",
  },
];

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
    youtube: "https://www.youtube.com/watch?v=-horEvEZkBQ",
  },
  {
    title: "Lepido",
    description: "Probably the best layout I've ever created in Geometry Dash.",
    youtube: "https://www.youtube.com/watch?v=A4xfC3NHu9Y",
  },
  {
    title: "Reminiscence",
    description:
      "Hackathon project that uses 3DGS to reconstruct VR environments from plain video. I think the demo video we filmed is the cooler part though.",
    youtube:
      "youtube.com/watch?v=IPXhelhYv0w&source_ve_path=MjM4NTE&embeds_referring_euri=https%3A%2F%2Fdevpost.com%2F",
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

function youTubeId(url: string): string | null {
  const m = url.match(
    /(?:youtu\.be\/|youtube\.com\/(?:watch\?v=|embed\/|shorts\/))([\w-]{11})/,
  );
  return m ? m[1] : null;
}

function instagramUrl(url: string): string | null {
  const m = url.match(/instagram\.com\/(reels?|p|tv)\/([\w-]+)/);
  if (!m) return null;
  const kind = m[1] === "reels" ? "reel" : m[1];
  return `https://www.instagram.com/${kind}/${m[2]}/`;
}

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

export default function WorkPage() {
  return (
    <main className="mx-auto w-full max-w-xl px-6 py-20 sm:py-28">
      <Link
        href="/"
        className="font-mono text-xs uppercase tracking-[0.2em] text-muted underline decoration-edge underline-offset-4 transition-colors hover:decoration-foreground"
      >
        ← home
      </Link>

      <h1 className="mt-8 text-2xl font-medium tracking-tight">Work.</h1>

      <div className="mt-10 flex flex-col gap-9">
        <Row label="projects">
          <ProjectList items={projects} />
        </Row>

        <Row label="other work">
          <ProjectList items={otherWork} />
        </Row>
      </div>
    </main>
  );
}
