
import { memo, useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import dayjs from "dayjs";
import type { RootState } from "@/store";

const TIME_TRANSITION = {
  duration: 0.3,
  ease: [0.22, 1, 0.36, 1] as const,
};

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
              initial={false}
              animate={{
                opacity: 1,
                y: "0%",
                filter: "blur(0px)",
              }}
              exit={
                reduceMotion
                  ? { opacity: 0 }
                  : {
                      opacity: 0,
                      y: "-65%",
                      filter: "blur(3px)",
                    }
              }
              transition={
                reduceMotion
                  ? { duration: 0.1 }
                  : TIME_TRANSITION
              }
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

function TimeWidget() {
  const timeFormat = useSelector(
    (s: RootState) => s.settings.timeFormat
  );

  const showSeconds = useSelector(
    (s: RootState) => s.settings.showSeconds
  );

  const [now, setNow] = useState(() => Date.now());
  const [isActive, setIsActive] = useState(false);

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

  return (
    <div className="flex h-full w-full flex-col items-center justify-center">
      <button
        type="button"
        onClick={() => setIsActive((prev) => !prev)}
        aria-pressed={isActive}
        className={`
          flex flex-col items-center justify-center rounded-md px-4 py-2
          text-center cursor-pointer
          transition-colors duration-200
          hover:bg-white/15
          active:bg-white/30
          focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/40
          ${isActive ? "bg-white/50" : ""}
        `}
      >
        <AnimatedTime
          key={fmt}
          value={current.format(fmt)}
          reduceMotion={!!reduceMotion}
        />

        <div className="mt-1.5 whitespace-nowrap text-sm font-normal leading-none ui-muted">
          {current.format("ddd, MMM D")}
        </div>
      </button>
    </div>
  );
}

export default memo(TimeWidget);
