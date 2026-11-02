import React, { useCallback, useEffect, useLayoutEffect, useRef, useState } from 'react';
import { AnimatePresence, MotionConfig, motion } from 'motion/react';
import { cn } from '@/lib/utils';

/* -------------------------------------------------------------------------- */
/*  Types                                                                     */
/* -------------------------------------------------------------------------- */

export type TopBarToolId = 'music' | 'timer';

export interface Track {
  title: string;
  artist?: string;
  src: string;
  cover?: string;
}

/** Built-in playlist: free ambient internet radio (great for focus). */
export const TOPBAR_TRACKS: Track[] = [
  { title: 'Groove Salad', artist: 'SomaFM', src: 'https://ice1.somafm.com/groovesalad-128-mp3' },
  { title: 'Radio Swiss Jazz', artist: 'SRG SSR', src: 'http://livestreaming-node-1.srg-ssr.ch/srgssr/rsj/mp3/128' },
];

interface TopBarProps {
  /** Playlist for the built-in music player. */
  tracks?: Track[];
  /** Optional controlled open tool (same pattern as Sidebar). */
  activeTool?: TopBarToolId | null;
  onActiveToolChange?: (id: TopBarToolId | null) => void;
  /** Optional controlled pin state. Defaults to a localStorage-backed value. */
  pinned?: boolean;
  onPinnedChange?: (pinned: boolean) => void;
}

/* -------------------------------------------------------------------------- */
/*  Motion config: tweak the feel here                                        */
/* -------------------------------------------------------------------------- */

// Island size / radius: slightly bouncy, like the iPhone Dynamic Island.
const ISLAND_SPRING = { type: 'spring', duration: 0.5, bounce: 0.28 } as const;
// Hide / reveal slide: softer, almost no bounce.
const SLIDE_SPRING = { type: 'spring', duration: 0.45, bounce: 0.15 } as const;

const BAR_H = 44;
const WIDTHS: Record<'closed' | TopBarToolId, number> = {
  closed: 340,
  music: 380,
  timer: 330,
};

/* -------------------------------------------------------------------------- */
/*  Tiny inline icons                                                         */
/* -------------------------------------------------------------------------- */

type IconProps = { className?: string };
const svg = (path: React.ReactNode) =>
  function Icon({ className }: IconProps) {
    return (
      <svg
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth={1.8}
        strokeLinecap="round"
        strokeLinejoin="round"
        className={className}
        aria-hidden="true"
      >
        {path}
      </svg>
    );
  };

const MusicIcon = svg(
  <>
    <path d="M9 18V5l12-2v13" />
    <circle cx="6" cy="18" r="3" />
    <circle cx="18" cy="16" r="3" />
  </>,
);
const TimerIcon = svg(
  <>
    <circle cx="12" cy="13" r="8" />
    <path d="M12 9v4l2.5 2M9 2h6" />
  </>,
);
const PlayIcon = svg(<path d="M7 4.5v15l12-7.5z" fill="currentColor" />);
const PauseIcon = svg(
  <>
    <rect x="6" y="4.5" width="4" height="15" rx="1" fill="currentColor" />
    <rect x="14" y="4.5" width="4" height="15" rx="1" fill="currentColor" />
  </>,
);
const PrevIcon = svg(
  <>
    <path d="M19 5v14L8 12z" fill="currentColor" />
    <path d="M5 5v14" />
  </>,
);
const NextIcon = svg(
  <>
    <path d="M5 5v14l11-7z" fill="currentColor" />
    <path d="M19 5v14" />
  </>,
);
const VolumeIcon = svg(
  <>
    <path d="M4 9v6h4l5 4V5L8 9z" fill="currentColor" />
    <path d="M16.5 8.5a5 5 0 0 1 0 7" />
  </>,
);
const ResetIcon = svg(
  <>
    <path d="M3 12a9 9 0 1 0 3-6.7L3 8" />
    <path d="M3 3v5h5" />
  </>,
);
const RepeatIcon = svg(
  <>
    <path d="M17 2l4 4-4 4" />
    <path d="M3 11v-1a4 4 0 0 1 4-4h14" />
    <path d="M7 22l-4-4 4-4" />
    <path d="M21 13v1a4 4 0 0 1-4 4H3" />
  </>,
);

/* -------------------------------------------------------------------------- */
/*  Helpers                                                                   */
/* -------------------------------------------------------------------------- */

const fmt = (s: number) => {
  if (!Number.isFinite(s) || s < 0) s = 0;
  const m = Math.floor(s / 60);
  const sec = Math.floor(s % 60);
  return `${m}:${sec.toString().padStart(2, '0')}`;
};

/** Live height of an element (ResizeObserver). Drives the island's height. */
function useElementHeight<T extends HTMLElement>() {
  const ref = useRef<T>(null);
  const [height, setHeight] = useState(0);
  useLayoutEffect(() => {
    const el = ref.current;
    if (!el) return;
    const update = () => setHeight(el.offsetHeight);
    update();
    const ro = new ResizeObserver(update);
    ro.observe(el);
    return () => ro.disconnect();
  }, []);
  return [ref, height] as const;
}

/* -------------------------------------------------------------------------- */
/*  Music player hook                                                         */
/* -------------------------------------------------------------------------- */

function useMusicPlayer(tracks: Track[]) {
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const wantPlay = useRef(false);
  const countRef = useRef(tracks.length);
  countRef.current = tracks.length;

  const [index, setIndex] = useState(0);
  const [playing, setPlaying] = useState(false);
  const [time, setTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [volume, setVolumeState] = useState(0.8);
  const [loop, setLoopState] = useState(true);

  const track: Track | undefined = tracks[index];

  // Keep the index valid when the playlist is edited (stations removed in settings).
  useEffect(() => {
    if (index >= tracks.length) setIndex(0);
  }, [tracks.length, index]);

  useEffect(() => {
    const a = new Audio();
    a.preload = 'metadata';
    a.volume = 0.8;
    a.loop = loop; // infinite play by default (also loops a single track)
    audioRef.current = a;

    const onTime = () => setTime(a.currentTime);
    const onMeta = () => setDuration(a.duration || 0);
    const onPlay = () => setPlaying(true);
    const onPause = () => setPlaying(false);
    const onEnd = () => {
      if (countRef.current > 1) {
        setIndex((i) => (i + 1) % countRef.current);
      } else if (wantPlay.current) {
        // Repeat off + only one track: restart manually (a.loop is off so the
        // browser fires 'ended'); re-setting the same index wouldn't replay.
        a.currentTime = 0;
        a.play().catch(() => setPlaying(false));
      }
    };

    a.addEventListener('timeupdate', onTime);
    a.addEventListener('loadedmetadata', onMeta);
    a.addEventListener('play', onPlay);
    a.addEventListener('pause', onPause);
    a.addEventListener('ended', onEnd);

    return () => {
      a.pause();
      a.removeEventListener('timeupdate', onTime);
      a.removeEventListener('loadedmetadata', onMeta);
      a.removeEventListener('play', onPlay);
      a.removeEventListener('pause', onPause);
      a.removeEventListener('ended', onEnd);
      a.src = '';
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Keep the element in sync with the repeat toggle.
  useEffect(() => {
    if (audioRef.current) audioRef.current.loop = loop;
  }, [loop]);

  useEffect(() => {
    const a = audioRef.current;
    if (!a || !track) return;
    a.src = track.src;
    setTime(0);
    setDuration(0);
    if (wantPlay.current) a.play().catch(() => setPlaying(false));
  }, [track?.src]); // eslint-disable-line react-hooks/exhaustive-deps

  const toggle = useCallback(() => {
    const a = audioRef.current;
    if (!a || !track) return;
    if (a.paused) {
      wantPlay.current = true;
      a.play().catch(() => setPlaying(false));
    } else {
      wantPlay.current = false;
      a.pause();
    }
  }, [track]);

  const next = useCallback(() => {
    if (countRef.current) setIndex((i) => (i + 1) % countRef.current);
  }, []);

  const prev = useCallback(() => {
    const a = audioRef.current;
    if (a && a.currentTime > 3) {
      a.currentTime = 0;
      return;
    }
    if (countRef.current) setIndex((i) => (i - 1 + countRef.current) % countRef.current);
  }, []);

  const seek = useCallback((t: number) => {
    if (audioRef.current) audioRef.current.currentTime = t;
    setTime(t);
  }, []);

  const setVolume = useCallback((v: number) => {
    if (audioRef.current) audioRef.current.volume = v;
    setVolumeState(v);
  }, []);

  const setLoop = useCallback(
    (v: boolean) => {
      setLoopState(v);
      if (audioRef.current) audioRef.current.loop = v;
    },
    [],
  );

  return { track, playing, time, duration, volume, loop, toggle, next, prev, seek, setVolume, setLoop };
}
type MusicCtx = ReturnType<typeof useMusicPlayer>;

/* -------------------------------------------------------------------------- */
/*  Timer hook (keeps running while the panel is closed)                      */
/* -------------------------------------------------------------------------- */

function useTimer(initial = 25 * 60) {
  const [total, setTotal] = useState(initial);
  const [remaining, setRemaining] = useState(initial);
  const [endAt, setEndAt] = useState<number | null>(null);
  const running = endAt !== null;

  useEffect(() => {
    if (endAt === null) return;
    const id = setInterval(() => {
      const left = Math.max(0, Math.round((endAt - Date.now()) / 1000));
      setRemaining(left);
      if (left === 0) setEndAt(null);
    }, 250);
    return () => clearInterval(id);
  }, [endAt]);

  const start = () => {
    const secs = remaining > 0 ? remaining : total;
    setRemaining(secs);
    setEndAt(Date.now() + secs * 1000);
  };
  const pause = () => setEndAt(null);
  const reset = () => {
    setEndAt(null);
    setRemaining(total);
  };
  const preset = (seconds: number) => {
    setEndAt(null);
    setTotal(seconds);
    setRemaining(seconds);
  };

  return { total, remaining, running, start, pause, reset, preset };
}
type TimerCtx = ReturnType<typeof useTimer>;

/* -------------------------------------------------------------------------- */
/*  Small shared button                                                       */
/* -------------------------------------------------------------------------- */

function IconBtn({ label, onClick, children }: { label: string; onClick: () => void; children: React.ReactNode }) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-label={label}
      title={label}
      className="ui-muted flex h-8 w-8 items-center justify-center rounded-lg transition hover:bg-white/10 hover:text-[color:var(--text)] active:scale-95"
    >
      {children}
    </button>
  );
}

/* -------------------------------------------------------------------------- */
/*  Tool panels                                                               */
/* -------------------------------------------------------------------------- */

function MusicPanel({ m, hasTracks }: { m: MusicCtx; hasTracks: boolean }) {
  if (!hasTracks) {
    return (
      <p className="ui-muted px-4 py-6 text-center text-xs">
        No tracks yet. Pass a <code>tracks</code> array to <code>&lt;TopBar /&gt;</code>.
      </p>
    );
  }
  // Live streams (SomaFM radio) report no finite duration: no seek, show a badge.
  const isLive = !Number.isFinite(m.duration) || m.duration <= 0;

  return (
    <div className="flex flex-col gap-4 px-4 pb-4 pt-2">
      <div className="flex items-center gap-3">
        <div className="flex h-14 w-14 shrink-0 items-center justify-center overflow-hidden rounded-xl bg-white/10">
          {m.track?.cover ? (
            <img src={m.track.cover} alt="" className="h-full w-full object-cover" />
          ) : (
            <MusicIcon className="h-6 w-6" />
          )}
        </div>
        <div className="min-w-0">
          <p className="truncate text-sm font-semibold">{m.track?.title}</p>
          <p className="ui-muted truncate text-xs">{m.track?.artist ?? 'Unknown artist'}</p>
        </div>
      </div>

      {isLive ? (
        <div className="flex items-center gap-2">
          <span className="flex items-center gap-1 rounded-md bg-white/10 px-1.5 py-0.5 text-[9px] font-semibold uppercase tracking-wider">
            <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-red-500" />
            Live
          </span>
          <span className="ui-muted text-[10px]">Internet radio · seek unavailable</span>
        </div>
      ) : (
        <div>
          <input
            type="range"
            min={0}
            max={m.duration || 0}
            step={0.1}
            value={Math.min(m.time, m.duration || 0)}
            onChange={(e) => m.seek(Number(e.target.value))}
            className="h-1 w-full cursor-pointer accent-white"
            aria-label="Seek"
          />
          <div className="ui-muted mt-1 flex justify-between text-[10px] tabular-nums">
            <span>{fmt(m.time)}</span>
            <span>{fmt(m.duration)}</span>
          </div>
        </div>
      )}

      <div className="flex items-center justify-between">
        <div className="flex w-24 items-center gap-1.5">
          <VolumeIcon className="ui-muted h-4 w-4 shrink-0" />
          <input
            type="range"
            min={0}
            max={1}
            step={0.01}
            value={m.volume}
            onChange={(e) => m.setVolume(Number(e.target.value))}
            className="h-1 w-full cursor-pointer accent-white"
            aria-label="Volume"
          />
        </div>

        <div className="flex items-center gap-1">
          <IconBtn label="Previous" onClick={m.prev}>
            <PrevIcon className="h-4 w-4" />
          </IconBtn>
          <motion.button
            type="button"
            onClick={m.toggle}
            whileTap={{ scale: 0.9 }}
            aria-label={m.playing ? 'Pause' : 'Play'}
            className="flex h-9 w-9 items-center justify-center rounded-full bg-white text-neutral-900"
          >
            {m.playing ? <PauseIcon className="h-4 w-4" /> : <PlayIcon className="h-4 w-4" />}
          </motion.button>
          <IconBtn label="Next" onClick={m.next}>
            <NextIcon className="h-4 w-4" />
          </IconBtn>
        </div>

        <div className="flex w-24 justify-end">
          <IconBtn label={m.loop ? 'Repeat on' : 'Repeat off'} onClick={() => m.setLoop(!m.loop)}>
            <RepeatIcon className={cn('h-4 w-4', m.loop && 'text-[color:var(--text)]')} />
          </IconBtn>
        </div>
      </div>
    </div>
  );
}

const PRESETS = [
  { label: '5m', s: 5 * 60 },
  { label: '15m', s: 15 * 60 },
  { label: '25m', s: 25 * 60 },
  { label: '50m', s: 50 * 60 },
];

function TimerPanel({ t }: { t: TimerCtx }) {
  const pct = t.total ? ((t.total - t.remaining) / t.total) * 100 : 0;
  return (
    <div className="flex flex-col items-center gap-4 px-4 pb-4 pt-2">
      <p className="text-4xl font-semibold tabular-nums tracking-tight">{fmt(t.remaining)}</p>
      <div className="h-1 w-full overflow-hidden rounded-full bg-white/10">
        <motion.div
          className="h-full rounded-full bg-white"
          initial={false}
          animate={{ width: `${pct}%` }}
          transition={{ type: 'tween', duration: 0.3 }}
        />
      </div>
      <div className="flex items-center gap-2">
        {PRESETS.map((p) => (
          <button
            key={p.label}
            type="button"
            onClick={() => t.preset(p.s)}
            className={cn(
              'rounded-lg px-2.5 py-1 text-xs transition',
              t.total === p.s ? 'bg-white text-neutral-900' : 'ui-muted hover:bg-white/10 hover:text-[color:var(--text)]',
            )}
          >
            {p.label}
          </button>
        ))}
      </div>
      <div className="flex items-center gap-2">
        <motion.button
          type="button"
          onClick={t.running ? t.pause : t.start}
          whileTap={{ scale: 0.94 }}
          className="flex h-9 items-center gap-2 rounded-full bg-white px-5 text-sm font-medium text-neutral-900"
        >
          {t.running ? <PauseIcon className="h-4 w-4" /> : <PlayIcon className="h-4 w-4" />}
          {t.running ? 'Pause' : 'Start'}
        </motion.button>
        <IconBtn label="Reset" onClick={t.reset}>
          <ResetIcon className="h-4 w-4" />
        </IconBtn>
      </div>
    </div>
  );
}

/* -------------------------------------------------------------------------- */
/*  Tool registry: add new tools here                                         */
/* -------------------------------------------------------------------------- */

interface ToolCtx {
  music: MusicCtx;
  timer: TimerCtx;
  hasTracks: boolean;
}

interface ToolDefinition {
  id: TopBarToolId;
  label: string;
  Icon: React.ComponentType<IconProps>;
  render: (ctx: ToolCtx) => React.ReactNode;
}

const TOOLS: ToolDefinition[] = [
  { id: 'music', label: 'Music', Icon: MusicIcon, render: (c) => <MusicPanel m={c.music} hasTracks={c.hasTracks} /> },
  { id: 'timer', label: 'Timer', Icon: TimerIcon, render: (c) => <TimerPanel t={c.timer} /> },
];

/* -------------------------------------------------------------------------- */
/*  Pin state (controlled or localStorage-backed)                             */
/* -------------------------------------------------------------------------- */

const PIN_KEY = 'topbar-pinned';

function usePinned(controlled?: boolean, onChange?: (v: boolean) => void) {
  const [internal, setInternal] = useState<boolean>(() => {
    try {
      return localStorage.getItem(PIN_KEY) !== 'false';
    } catch {
      return true;
    }
  });
  const pinned = controlled !== undefined ? controlled : internal;
  const setPinned = (v: boolean) => {
    if (onChange) onChange(v);
    else {
      setInternal(v);
      try {
        localStorage.setItem(PIN_KEY, String(v));
      } catch {
        /* storage unavailable */
      }
    }
  };
  return [pinned, setPinned] as const;
}

/* -------------------------------------------------------------------------- */
/*  TopBar                                                                    */
/* -------------------------------------------------------------------------- */

export default function TopBar({
  tracks = TOPBAR_TRACKS,
  activeTool: controlled,
  onActiveToolChange,
  pinned: pinnedProp,
  onPinnedChange,
}: TopBarProps) {
  const [internal, setInternal] = useState<TopBarToolId | null>(null);
  const activeTool = controlled !== undefined ? controlled : internal;
  const setActiveTool = (next: TopBarToolId | null) => {
    if (onActiveToolChange) onActiveToolChange(next);
    else setInternal(next);
  };
  const toggleTool = (id: TopBarToolId) => setActiveTool(activeTool === id ? null : id);
  const isOpen = activeTool !== null;
  const activeDef = TOOLS.find((t) => t.id === activeTool);

  const [pinned, setPinned] = usePinned(pinnedProp, onPinnedChange);
  const [hovered, setHovered] = useState(false);
  const revealed = pinned || hovered || isOpen;

  const music = useMusicPlayer(tracks);
  const timer = useTimer();
  const ctx: ToolCtx = { music, timer, hasTracks: tracks.length > 0 };

  // Island height follows its content; width follows the open tool.
  const [contentRef, measured] = useElementHeight<HTMLDivElement>();
  const height = measured || BAR_H;
  const width = WIDTHS[activeTool ?? 'closed'];

  const rootRef = useRef<HTMLDivElement>(null);
  const islandRef = useRef<HTMLDivElement>(null);

  // Keep hidden controls out of the tab order
  useEffect(() => {
    islandRef.current?.toggleAttribute('inert', !revealed);
  }, [revealed]);

  // Close on Escape or click outside
  useEffect(() => {
    if (!isOpen) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setActiveTool(null);
    };
    const onDown = (e: MouseEvent) => {
      if (rootRef.current && !rootRef.current.contains(e.target as Node)) setActiveTool(null);
    };
    window.addEventListener('keydown', onKey);
    window.addEventListener('mousedown', onDown);
    return () => {
      window.removeEventListener('keydown', onKey);
      window.removeEventListener('mousedown', onDown);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isOpen]);

  return (
    <MotionConfig reducedMotion="user">
      {/*
        Hover region. It is only a thin strip at the top edge; the island is an
        absolutely positioned child, so hovering the island still counts as hovering
        this region (React mouseenter/leave follow the DOM tree). When pinned the strip
        ignores the pointer so it never blocks the page.
      */}
      <div
        ref={rootRef}
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
        className={cn(
          'fixed left-1/2 top-0 z-50 h-3 w-72 -translate-x-1/2',
          pinned ? 'pointer-events-none' : 'pointer-events-auto',
        )}
      >
        {/* Little handle shown while the bar is tucked away */}
        <motion.div
          aria-hidden="true"
          initial={false}
          animate={{ opacity: !pinned && !revealed ? 1 : 0 }}
          transition={{ duration: 0.2 }}
          className="absolute left-1/2 top-1 h-1 w-10 -translate-x-1/2 rounded-full bg-white/25"
        />

        {/* The island */}
        <motion.div
          ref={islandRef}
          initial={false}
          animate={{
            width,
            height,
            y: revealed ? 0 : -(height + 16),
            borderRadius: isOpen ? 28 : BAR_H / 2,
          }}
          transition={{ default: ISLAND_SPRING, y: SLIDE_SPRING }}
          style={{ x: '-50%', maxWidth: 'calc(100vw - 1rem)', pointerEvents: revealed ? 'auto' : 'none' }}
          className="glass absolute left-1/2 top-2 overflow-hidden border border-[color:var(--border)]"
        >
          {/* Solid surface fades in over the glass while a tool is open */}
          <motion.div
            aria-hidden="true"
            initial={false}
            animate={{ opacity: isOpen ? 1 : 0 }}
            transition={{ duration: 0.25 }}
            className="absolute inset-0 bg-[color:var(--sidebar-solid)]"
          />

          {/* Measured content: bar row + (optional) tool panel */}
          <div ref={contentRef} className="relative w-full">
            {/* Bar row */}
            <div className="relative flex items-center gap-1 px-1.5" style={{ height: BAR_H }}>
              <button
                type="button"
                onClick={() => toggleTool('music')}
                aria-label="Open music player"
                className="flex h-8 min-w-0 flex-1 items-center gap-2 rounded-lg px-2 text-left transition hover:bg-white/10"
              >
                <MusicIcon className={cn('h-4 w-4 shrink-0', music.playing ? '' : 'ui-muted')} />
                <span className="ui-muted min-w-0 flex-1 truncate text-xs">
                  {music.track ? (
                    <>
                      <span className="text-[color:var(--text)]">{music.track.title}</span>
                      {music.track.artist ? ` · ${music.track.artist}` : ''}
                    </>
                  ) : (
                    'Nothing playing'
                  )}
                </span>
              </button>

              {music.track && (
                <IconBtn label={music.playing ? 'Pause' : 'Play'} onClick={music.toggle}>
                  {music.playing ? <PauseIcon className="h-4 w-4" /> : <PlayIcon className="h-4 w-4" />}
                </IconBtn>
              )}

              <AnimatePresence initial={false}>
                {timer.running && (
                  <motion.button
                    key="timer-chip"
                    type="button"
                    onClick={() => toggleTool('timer')}
                    aria-label="Open timer"
                    initial={{ opacity: 0, scale: 0.7 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.7 }}
                    transition={{ duration: 0.2 }}
                    className="rounded-md bg-white/10 px-2 py-1 text-[11px] font-medium tabular-nums"
                  >
                    {fmt(timer.remaining)}
                  </motion.button>
                )}
              </AnimatePresence>

              <div className="mx-0.5 h-5 w-px shrink-0 bg-[color:var(--border)]" />

              {TOOLS.map(({ id, label, Icon }) => {
                const isActive = activeTool === id;
                return (
                  <button
                    key={id}
                    type="button"
                    onClick={() => toggleTool(id)}
                    aria-label={label}
                    aria-expanded={isActive}
                    title={label}
                    className={cn(
                      'relative flex h-8 w-8 shrink-0 items-center justify-center rounded-lg transition-colors duration-150',
                      isActive ? 'text-neutral-900' : 'ui-muted hover:bg-white/10 hover:text-[color:var(--text)]',
                    )}
                  >
                    {isActive && (
                      <motion.span
                        layoutId="topbar-active-tool"
                        className="absolute inset-0 rounded-lg bg-white"
                        transition={{ type: 'spring', duration: 0.4, bounce: 0.25 }}
                      />
                    )}
                    <Icon className="relative h-[18px] w-[18px]" />
                  </button>
                );
              })}
            </div>

            {/*
              Tool panel. `popLayout` takes the leaving panel out of the flow, so the
              measured height instantly becomes the new panel's height and the island
              springs to it while the old content blurs out and the new one blurs in.
            */}
            <AnimatePresence initial={false} mode="popLayout">
              {activeDef && (
                <motion.div
                  key={activeDef.id}
                  initial={{ opacity: 0, scale: 0.94, filter: 'blur(8px)' }}
                  animate={{
                    opacity: 1,
                    scale: 1,
                    filter: 'blur(0px)',
                    transition: { delay: 0.06, duration: 0.28, ease: [0.22, 1, 0.36, 1] },
                  }}
                  exit={{ opacity: 0, scale: 0.94, filter: 'blur(8px)', transition: { duration: 0.14 } }}
                  style={{ transformOrigin: 'top center' }}
                  className="border-t border-[color:var(--border)]"
                >
                  {/* Panel header: label + pin */}
                  <div className="flex h-8 items-center justify-between px-4">
                    <div className="ui-muted flex items-center gap-2">
                      <activeDef.Icon className="h-3 w-3" />
                      <h2 className="text-[10px] font-medium uppercase tracking-[0.14em]">{activeDef.label}</h2>
                    </div>
                    <button
                      type="button"
                      onClick={() => setPinned(!pinned)}
                      title={pinned ? 'Unpin (auto-hide)' : 'Pin (always visible)'}
                      aria-label={pinned ? 'Unpin top bar' : 'Pin top bar'}
                      className="ui-muted -mr-2 flex h-6 w-6 items-center justify-center rounded-md transition hover:bg-white/10 hover:text-[color:var(--text)]"
                    >
                      {pinned ? <PinIcon className="h-3 w-3" /> : <PinOffIcon className="h-3 w-3" />}
                    </button>
                  </div>

                  {activeDef.render(ctx)}
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </motion.div>
      </div>
    </MotionConfig>
  );
}