import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import dayjs from "dayjs";
import type { RootState } from "@/store";

export default function TimeWidget() {
  const { timeFormat, showSeconds } = useSelector((s: RootState) => s.settings);
  const [now, setNow] = useState(dayjs());
  const [isActive, setIsActive] = useState(false);

  useEffect(() => {
    const t = window.setInterval(() => setNow(dayjs()), 1000);
    return () => window.clearInterval(t);
  }, []);

  const fmt = timeFormat === "12" ? (showSeconds ? "h:mm:ss A" : "h:mm A") : showSeconds ? "HH:mm:ss" : "HH:mm";

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
        <div className="font-manrope text-xl font-medium leading-none tabular-nums">{now.format(fmt)}</div>

        <div className="mt-1.5 whitespace-nowrap text-sm font-normal leading-none ui-muted">{now.format("ddd, MMM D")}</div>
      </button>
    </div>
  );
}
