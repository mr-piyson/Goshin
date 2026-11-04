
import { memo, useEffect, useLayoutEffect, useRef, useState } from "react";
import { useSelector } from "react-redux";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import dayjs from "dayjs";
import type { RootState } from "@/store";
import { dateStyleFormat } from "@/lib/dateStyles";

/** Horizontal padding of the clock button (px-4 → 16px each side). */
const BUTTON_PADDING_X = 32;
/** A couple of pixels of breathing room so the date never touches the edge. */
const WIDTH_BUFFER = 4;
/** Easing shared with the Collapsible width animation. */
const EASE = [0.22, 1, 0.36, 1] as const;

const TIME_TRANSITION = {
  duration: 0.3,
  ease: [0.22, 1, 0.36, 1] as const,
};

const enterInitial = (reduceMotion: boolean) =>
  reduceMotion
    ? { opacity: 0 }
    : { opacity: 0, y: "65%", filter: "blur(3px)" };

const enterAnimate = { opacity: 1, y: "0%", filter: "blur(0px)" };

const exitAnimate = (reduceMotion: boolean) =>
  reduceMotion
    ? { opacity: 0 }
    : { opacity: 0, y: "-65%", filter: "blur(3px)" };

const AnimatedTime = memo(function AnimatedTime({
  value,
  reduceMotion,
}: {
  value: string;
  reduceMotion: boolean;
}) {
  return (
    <div className="inline-flex items-center font-manrope text-xl font-medium leading-none tabular-nums">
      {Array.from(value).map((char, index) => (
        <span
          key={index}
          className="relative inline-grid overflow-hidden"
        >
          <AnimatePresence initial={false} mode="sync">
            <motion.span
              key={`${index}-${char}`}
              initial={enterInitial(reduceMotion)}
              animate={enterAnimate}
              exit={exitAnimate(reduceMotion)}
              transition={reduceMotion ? { duration: 0.1 } : TIME_TRANSITION }
              className="col-start-1 row-start-1 inline-block"
            >
              {char === " " ? "\u00A0" : char}
            </motion.span>
          </AnimatePresence>
        </span>
      ))}
    </div>
  );
});

function TimeWidget({
  onOpenSettings,
  onWidthChange,
}: {
  onOpenSettings?: () => void;
  /** Reports the natural content width so the parent can animate its width. */
  onWidthChange?: (width: number) => void;
}) {
  const timeFormat = useSelector(
    (s: RootState) => s.settings.timeFormat
  );

  const showSeconds = useSelector(
    (s: RootState) => s.settings.showSeconds
  );

  const dateStyle = useSelector(
    (s: RootState) => s.settings.dateStyle
  );

  const showDate = useSelector(
    (s: RootState) => s.settings.showDate
  );

  const showYear = useSelector(
    (s: RootState) => s.settings.showYear
  );

  const [now, setNow] = useState(() => Date.now());

  const reduceMotion = useReducedMotion();

  // Align updates with actual second/minute boundaries.
  useEffect(() => {
    let timer: number;

    const tick = () => {
      const current = Date.now();
      setNow(current);

      const delay = showSeconds
        ? 1000 - (current % 1000)
        : 60_000 - (current % 60_000);

      timer = window.setTimeout(tick, delay);
    };

    const current = Date.now();

    timer = window.setTimeout(
      tick,
      showSeconds
        ? 1000 - (current % 1000)
        : 60_000 - (current % 60_000)
    );

    return () => window.clearTimeout(timer);
  }, [showSeconds]);

  const fmt =
    timeFormat === "12"
      ? showSeconds
        ? "h:mm:ss A"
        : "h:mm A"
      : showSeconds
        ? "HH:mm:ss"
        : "HH:mm";

  const current = dayjs(now);
  const timeText = current.format(fmt);
  const dateText = current.format(dateStyleFormat(dateStyle, showYear ?? true));
  const dateVisible = showDate ?? true;

  // Measure the natural (unclipped) content width. The visible clock sits in a
  // fixed-width Collapsible, so we measure an invisible copy and let App animate
  // the container to fit — long dates no longer overflow.
  const measureRef = useRef<HTMLDivElement>(null);
  useLayoutEffect(() => {
    const el = measureRef.current;
    if (!el || !onWidthChange) return;
    const width = Math.ceil(el.getBoundingClientRect().width) + BUTTON_PADDING_X + WIDTH_BUFFER;
    onWidthChange(width);
  }, [fmt, dateText, dateVisible, onWidthChange]);

  return (
    <div className="relative flex h-full w-full flex-col items-center justify-center">
      {/* Hidden natural-size copy used only for width measurement. */}
      <div
        ref={measureRef}
        aria-hidden="true"
        className="pointer-events-none invisible absolute left-0 top-0 w-max"
      >
        <span className="block whitespace-nowrap font-manrope text-xl font-medium leading-none tabular-nums">
          {timeText}
        </span>
        {dateVisible && (
          <span className="block whitespace-nowrap text-sm font-normal leading-none">
            {dateText}
          </span>
        )}
      </div>

      <button
        type="button"
        onClick={() => onOpenSettings?.()}
        title="Time & date settings"
        className={`
          flex flex-col items-center justify-center rounded-md px-4 py-2
          text-center cursor-pointer
          transition-colors duration-200
          hover:bg-white/15
          active:bg-white/30
          focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/40
        `}
      >
        {/* Format changes (12h ↔ 24h, seconds on/off) roll the whole clock as
            one unit; regular ticking keeps the per-character animation. */}
        <AnimatePresence mode="wait" initial={false}>
          <motion.div
            key={fmt}
            initial={reduceMotion ? { opacity: 0 } : { opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={reduceMotion ? { opacity: 0 } : { opacity: 0, y: -10 }}
            transition={{ duration: reduceMotion ? 0.1 : 0.22, ease: EASE }}
          >
            <AnimatedTime
              value={timeText}
              reduceMotion={!!reduceMotion}
            />
          </motion.div>
        </AnimatePresence>

        <AnimatePresence initial={false}>
          {dateVisible && (
            <motion.div
              key="date-line"
              initial={reduceMotion ? { opacity: 0 } : { opacity: 0, height: 0, marginTop: 0 }}
              animate={reduceMotion ? { opacity: 1 } : { opacity: 1, height: "auto", marginTop: 6 }}
              exit={reduceMotion ? { opacity: 0 } : { opacity: 0, height: 0, marginTop: 0 }}
              transition={{ duration: reduceMotion ? 0.1 : 0.22, ease: EASE }}
              className="overflow-hidden whitespace-nowrap text-sm font-normal leading-none ui-muted"
            >
              <AnimatePresence mode="wait" initial={false}>
                <motion.span
                  key={dateText}
                  initial={{ opacity: 0, y: 4 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -4 }}
                  transition={{ duration: reduceMotion ? 0.1 : 0.18, ease: "easeOut" }}
                  className="block whitespace-nowrap"
                >
                  {dateText}
                </motion.span>
              </AnimatePresence>
            </motion.div>
          )}
        </AnimatePresence>
      </button>
    </div>
  );
}

export default memo(TimeWidget);
