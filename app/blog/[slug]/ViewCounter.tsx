"use client";

import { useEffect, useRef, useState } from "react";

// Shows a post's view count. Counts one view per browser session per post
// (a reload in the same session just reads the current count). Renders
// nothing until a number is available — including when the store isn't
// configured yet — so there's no layout shift or dangling placeholder.
export default function ViewCounter({ slug }: { slug: string }) {
  const [views, setViews] = useState<number | null>(null);
  const ran = useRef(false);

  useEffect(() => {
    if (ran.current) return; // guard against React strict-mode double-invoke
    ran.current = true;

    const seenKey = `viewed:${slug}`;
    const alreadySeen =
      typeof sessionStorage !== "undefined" && sessionStorage.getItem(seenKey);

    fetch(`/api/views/${slug}`, { method: alreadySeen ? "GET" : "POST" })
      .then((r) => (r.ok ? r.json() : null))
      .then((data: { views?: number } | null) => {
        if (data && typeof data.views === "number") setViews(data.views);
        if (!alreadySeen && typeof sessionStorage !== "undefined") {
          sessionStorage.setItem(seenKey, "1");
        }
      })
      .catch(() => {
        /* offline or not configured — leave the counter hidden */
      });
  }, [slug]);

  if (views === null) return null;

  return (
    <span className="ml-2">
      · {views.toLocaleString()} view{views === 1 ? "" : "s"}
    </span>
  );
}
