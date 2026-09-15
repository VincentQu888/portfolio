import type { Metadata } from "next";
import Link from "next/link";
import type { ReactNode } from "react";

export const metadata: Metadata = {
  title: "Experience — Vincent Qu",
  description: "A fuller list of experience, including older and less relevant work.",
};

type Experience = {
  role: string;
  date: string;
  description?: string;
};

const experiences: Experience[] = [
  {
    role: "Software Engineering Intern, Shopify",
    date: "2026",
    description:
      "ML and ML infra for Messaging team on smart sending, impact projections, causal learning",
  },
  {
    role: "Machine Learning Engineer, UTMIST",
    date: "2025/2026",
    description:
      "Engineering and research for UofT Machine Intelligence Student Team's FixMyElo, DFOD, and Agent Forge projects",
  },
  {
    role: "Quantitative Developer, St. George Capital",
    date: "2025/2026",
    description:
      "Explored hierarchical clustering-based asset allocation for auto-rebalancing portfolio optimization",
  },
  {
    role: "Algorithms Developer, UTQC",
    date: "2025",
    description:
      "Contributed to quantum optimization algorithm for robot to solve TSP, encoding TSP graphs onto a Bloch Sphere",
  },
  {
    role: "Software Engineering Intern, Game Pill",
    date: "2025",
    description:
      "RAG-based AI outreach tools for streamer outreach",
  },
  {
    role: "Teacher, Code Ninjas",
    date: "2024/2025",
    description:
      "Taught 5-14yo kids how to code!",
  },
  {
    role: "Fellow, QSYS",
    date: "2024",
    description:
      "Learned about quantum physics and quantum computing for a high school fellowship at UWaterloo",
  },
  {
    role: "Co-founder, NRGHacks",
    date: "2023/2024/2025",
    description:
      "Co-founded 100+ student inter-school hackathon, built the website, organized, judged, hosted workshops, and I was the keynote speaker",
  },
  {
    role: "Co-founder, CalenDR",
    date: "2023/2024/2025",
    description:
      "Founded full-stack medical app to schedule immunization and cancer screening dates",
  },
  {
    role: "Barista, Timothy's World Coffee",
    date: "2023/2024",
    description:
      "First job",
  },
  {
    role: "Private Tutor",
    date: "2022/2023",
    description:
      "Taught two students who achieved top 1% and top 3.5% in the CCC and tutored web dev",
  },
];

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

export default function ExperiencePage() {
  return (
    <main className="mx-auto w-full max-w-xl px-6 py-20 sm:py-28">
      <Link
        href="/"
        className="font-mono text-xs uppercase tracking-[0.2em] text-muted underline decoration-edge underline-offset-4 transition-colors hover:decoration-foreground"
      >
        ← home
      </Link>

      <h1 className="mt-8 text-2xl font-medium tracking-tight">Experience.</h1>
      <p className="mt-3 text-muted">
        A full list of previous experience, including older roles, clubs, side quests, and things that
        may not be the most relevant but are still fun to look back on! 
      </p>

      <div className="mt-10 space-y-5">
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
    </main>
  );
}
