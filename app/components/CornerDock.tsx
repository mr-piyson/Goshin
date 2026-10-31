import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setWidget } from "@/store/settingsSlice";
import type { AppDispatch, RootState } from "@/store";
import { GearIcon, ImageIcon, MoreIcon, SlidersIcon } from "./Icons";
import { Switch } from "./switch";

const VISIBILITY_OPTIONS = [
  { id: "motivation", label: "Motivation" },
  { id: "time", label: "Time and date" },
  { id: "weather", label: "Weather" },
];

interface CornerDockProps {
  onOpenBackground: () => void;
  onOpenMore: () => void;
  onOpenSettings: () => void;
}

export default function CornerDock({ onOpenBackground, onOpenMore, onOpenSettings }: CornerDockProps) {
  const dispatch = useDispatch<AppDispatch>();
  const widgets = useSelector((s: RootState) => s.settings.widgets);
  const [open, setOpen] = useState(false);
  const rootRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!open) return;
    const onPointer = (event: PointerEvent) => {
      if (!rootRef.current?.contains(event.target as Node)) setOpen(false);
    };
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") setOpen(false);
    };
    document.addEventListener("pointerdown", onPointer);
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("pointerdown", onPointer);
      document.removeEventListener("keydown", onKey);
    };
  }, [open]);

  return (
    <div ref={rootRef} className="fixed bottom-2 right-2 z-40 flex flex-col items-end gap-2">
      {open && (
        <div className="glass w-60 rounded-2xl p-4 text-left shadow-2xl" role="dialog" aria-label="Widgets visibility">
          <div className="text-[11px] font-semibold uppercase tracking-wider ui-muted">Widgets visibility</div>
          <div className="mt-2.5 space-y-0.5">
            {VISIBILITY_OPTIONS.map((option) => {
              const enabled = widgets[option.id] ?? true;
              return (
                <div key={option.id} className="flex items-center justify-between gap-3 rounded-lg px-1 py-1.5">
                  <span className="text-xs">{option.label}</span>
                  <Switch checked={enabled} label={option.label} onChange={() => dispatch(setWidget({ id: option.id, value: !enabled }))} />
                </div>
              );
            })}
          </div>
        </div>
      )}

      <div className="glass flex items-center gap-1 rounded-2xl p-1">
        <button type="button" className={`dock-btn ${open ? "ui-btn-active" : ""}`} title="Widgets visibility" aria-label="Widgets visibility" aria-expanded={open} onClick={() => setOpen((value) => !value)}>
          <SlidersIcon className="h-[18px] w-[18px]" />
        </button>
        <button type="button" className="dock-btn" title="Backgrounds" aria-label="Backgrounds" onClick={onOpenBackground}>
          <ImageIcon className="h-[18px] w-[18px]" />
        </button>
        <button type="button" className="dock-btn" title="More" aria-label="More" onClick={onOpenMore}>
          <MoreIcon className="h-[18px] w-[18px]" />
        </button>
        <button type="button" className="dock-btn" title="Settings" aria-label="Settings" onClick={onOpenSettings}>
          <GearIcon className="h-[18px] w-[18px]" />
        </button>
      </div>
    </div>
  );
}
