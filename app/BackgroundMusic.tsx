"use client";

import { useEffect, useRef, useState } from "react";

const VIDEO_ID = "vITzcY1KMOk";
const SONG_NAME = "Tell Me You Know";
const SONG_URL = `https://www.youtube.com/watch?v=${VIDEO_ID}`;
const VOLUME = 45;

// Minimal YouTube IFrame API typings (only what we use).
type YTPlayer = {
  mute: () => void;
  unMute: () => void;
  playVideo: () => void;
  setVolume: (v: number) => void;
  destroy: () => void;
};

declare global {
  interface Window {
    YT?: {
      Player: new (el: string | HTMLElement, opts: unknown) => YTPlayer;
    };
    onYouTubeIframeAPIReady?: () => void;
  }
}

function SpeakerIcon({ muted }: { muted: boolean }) {
  return (
    <svg
      width="16"
      height="16"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d="M11 5 6 9H2v6h4l5 4V5z" />
      {muted ? (
        <>
          <line x1="23" y1="9" x2="17" y2="15" />
          <line x1="17" y1="9" x2="23" y2="15" />
        </>
      ) : (
        <>
          <path d="M15.5 8.5a5 5 0 0 1 0 7" />
          <path d="M19 5a9 9 0 0 1 0 14" />
        </>
      )}
    </svg>
  );
}

function DownArrow() {
  return (
    <svg
      width="20"
      height="20"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      {/* a curved arrow that sweeps down toward the icon; shaft rotated to
          line up with the arrowhead */}
      <g transform="rotate(60 12 19)">
        <path d="M5 4C6 12 8 17 12 19" />
      </g>
      <path d="M12 19l-3.5-2.5" />
      <path d="M12 19l3-3" />
    </svg>
  );
}

export default function BackgroundMusic() {
  const playerRef = useRef<YTPlayer | null>(null);
  const startedRef = useRef(false);
  const [muted, setMuted] = useState(true);
  const [interacted, setInteracted] = useState(false);

  // Create the hidden YouTube player, but do NOT play until the user clicks.
  useEffect(() => {
    if (startedRef.current) return; // guard against React strict-mode double run
    startedRef.current = true;

    function createPlayer() {
      if (!window.YT) return;
      playerRef.current = new window.YT.Player("bg-music-player", {
        videoId: VIDEO_ID,
        width: "320",
        height: "180",
        playerVars: {
          autoplay: 0,
          controls: 0,
          disablekb: 1,
          loop: 1,
          playlist: VIDEO_ID,
          playsinline: 1,
          origin: window.location.origin,
        },
        events: {
          // Fallback for reliable infinite looping (YouTube's loop flag is flaky):
          // when the video ends (state 0), start it again.
          onStateChange: (e: { data: number; target: YTPlayer }) => {
            if (e.data === 0) e.target.playVideo();
          },
        },
      });
    }

    if (window.YT && window.YT.Player) {
      createPlayer();
    } else {
      const prev = window.onYouTubeIframeAPIReady;
      window.onYouTubeIframeAPIReady = () => {
        prev?.();
        createPlayer();
      };
      if (!document.getElementById("yt-iframe-api")) {
        const tag = document.createElement("script");
        tag.id = "yt-iframe-api";
        tag.src = "https://www.youtube.com/iframe_api";
        document.body.appendChild(tag);
      }
    }

    return () => {
      try {
        playerRef.current?.destroy();
      } catch {
        /* noop */
      }
    };
  }, []);

  function toggle() {
    const p = playerRef.current;
    if (!p) return;
    setInteracted(true);
    if (muted) {
      p.unMute();
      p.setVolume(VOLUME);
      p.playVideo();
      setMuted(false);
    } else {
      p.mute();
      setMuted(true);
    }
  }

  return (
    <>
      <div className="fixed bottom-4 right-4 z-30 flex items-center gap-2 font-mono text-xs text-muted">
        <div className="relative inline-flex">
          {!interacted && (
            <span
              aria-hidden
              className="pointer-events-none absolute -top-6 left-1/2 -translate-x-1/2"
            >
              <span className="block animate-bob text-muted/60">
                <DownArrow />
              </span>
            </span>
          )}
          <button
            type="button"
            onClick={toggle}
            aria-label={muted ? "Play background music" : "Mute background music"}
            aria-pressed={!muted}
            className="inline-flex items-center transition-colors hover:text-foreground focus:outline-none focus-visible:text-foreground"
          >
            <SpeakerIcon muted={muted} />
          </button>
        </div>
        <span aria-hidden>—</span>
        <a
          href={SONG_URL}
          target="_blank"
          rel="noopener noreferrer"
          className="max-w-[12rem] truncate transition-colors hover:text-foreground"
        >
          {SONG_NAME}
        </a>
      </div>

      {/* Hidden, off-screen player (kept in layout so audio can play) */}
      <div
        aria-hidden
        className="pointer-events-none fixed left-[-9999px] top-0 h-[180px] w-[320px]"
      >
        <div id="bg-music-player" />
      </div>
    </>
  );
}
