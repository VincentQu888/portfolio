"use client";

import { useEffect, useRef, useState } from "react";

const VIDEO_ID = "vITzcY1KMOk";
const SONG_NAME = "Tell Me You Know – Good Kid";
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

export default function BackgroundMusic() {
  const playerRef = useRef<YTPlayer | null>(null);
  const startedRef = useRef(false);
  const wantSoundRef = useRef(true); // try to have sound on as soon as allowed
  const [muted, setMuted] = useState(true);

  // Create the hidden YouTube player.
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
          autoplay: 1,
          controls: 0,
          disablekb: 1,
          loop: 1,
          playlist: VIDEO_ID,
          mute: 1,
          playsinline: 1,
          origin: window.location.origin,
        },
        events: {
          onReady: (e: { target: YTPlayer }) => {
            // Browsers only allow muted autoplay; sound waits for a gesture.
            e.target.mute();
            e.target.playVideo();
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

  // Unmute on the very first interaction anywhere on the page — the closest
  // thing to "autoplay with sound" that browsers permit.
  useEffect(() => {
    const onFirstGesture = () => {
      if (!wantSoundRef.current) return; // user chose to keep it muted
      const p = playerRef.current;
      if (p) {
        p.unMute();
        p.setVolume(VOLUME);
        p.playVideo();
        setMuted(false);
      }
      remove();
    };
    const remove = () => {
      document.removeEventListener("pointerdown", onFirstGesture);
      document.removeEventListener("keydown", onFirstGesture);
      document.removeEventListener("touchstart", onFirstGesture);
    };
    document.addEventListener("pointerdown", onFirstGesture);
    document.addEventListener("keydown", onFirstGesture);
    document.addEventListener("touchstart", onFirstGesture);
    return remove;
  }, []);

  function toggle() {
    const p = playerRef.current;
    if (!p) return;
    if (muted) {
      wantSoundRef.current = true;
      p.unMute();
      p.setVolume(VOLUME);
      p.playVideo();
      setMuted(false);
    } else {
      wantSoundRef.current = false;
      p.mute();
      setMuted(true);
    }
  }

  return (
    <>
      <div className="fixed bottom-4 right-4 z-30 flex items-center gap-2 font-mono text-xs text-muted">
        <button
          type="button"
          onClick={toggle}
          aria-label={muted ? "Play background music" : "Mute background music"}
          aria-pressed={!muted}
          className="inline-flex items-center transition-colors hover:text-foreground focus:outline-none focus-visible:text-foreground"
        >
          <SpeakerIcon muted={muted} />
        </button>
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
