import React, { useCallback, useEffect, useId, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setWidget } from "@/store/settingsSlice";
import type { AppDispatch, RootState } from "@/store";
import { GearIcon, ImageIcon, SlidersIcon } from "./Icons";
import { Switch } from "./switch";

const VISIBILITY_OPTIONS = [
  { id: "motivation", label: "Motivation" },
  { id: "time", label: "Time and date" },
  { id: "weather", label: "Weather" },
  { id: "search", label: "Search Bar" },
  { id: "topbar", label: "Topbar" },
] as const satisfies ReadonlyArray<{ id: string; label: string }>;

type WidgetId = (typeof VISIBILITY_OPTIONS)[number]["id"];

interface CornerDockProps {
  onOpenBackground: () => void;
  onOpenSettings: () => void;
}

export default function CornerDock({ onOpenBackground, onOpenSettings }: CornerDockProps) {
  const dispatch = useDispatch<AppDispatch>();
  const widgets = useSelector((s: RootState) => s.settings.widgets);
  const [open, setOpen] = useState(false);
  const rootRef = useRef<HTMLDivElement>(null);
  const popoverRef = useRef<HTMLDivElement>(null);
  const toggleRef = useRef<HTMLButtonElement>(null);
  const popoverId = useId();

  // Outside click + Escape
  useEffect(() => {
    if (!open) return;
    const onPointer = (e: PointerEvent) => {
      if (!rootRef.current?.contains(e.target as Node)) setOpen(false);
    };
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    document.addEventListener("pointerdown", onPointer);
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("pointerdown", onPointer);
      document.removeEventListener("keydown", onKey);
    };
  }, [open]);

  // Move focus into popover on open; restore on close
  useEffect(() => {
    if (open) {
      popoverRef.current?.querySelector<HTMLElement>(
        "button, [href], input, [tabindex]:not([tabindex='-1'])"
      )?.focus();
    } else {
      toggleRef.current?.focus({ preventScroll: true });
    }
  }, [open]);

  const toggleWidget = useCallback(
    (id: WidgetId, value: boolean) => dispatch(setWidget({ id, value })),
    [dispatch]
  );

  return (
    <div ref={rootRef} className="fixed bottom-2 right-2 z-40 flex flex-col items-end gap-2">
      <div className="glass flex items-center gap-1 rounded-2xl p-1 transition-colors">
        <button
          ref={toggleRef}
          type="button"
          className={`inline-flex h-8 w-8 items-center justify-center rounded-lg transition-colors hover:bg-surface-strong ${open ? "bg-accent" : ""}`}
          title="Widgets visibility"
          aria-label="Widgets visibility"
          aria-haspopup="true"
          aria-expanded={open}
          aria-controls={popoverId}
          onClick={() => setOpen(v => !v)}
        >
          <SlidersIcon className="h-[18px] w-[18px]" />
        </button>
        <button type="button" className="inline-flex h-8 w-8 items-center justify-center rounded-lg transition-colors hover:bg-surface-strong" title="Backgrounds" aria-label="Backgrounds" onClick={onOpenBackground}>
          <ImageIcon className="h-[18px] w-[18px]" />
        </button>
        <button type="button" className="inline-flex h-8 w-8 items-center justify-center rounded-lg transition-colors hover:bg-surface-strong" title="Settings" aria-label="Settings" onClick={onOpenSettings}>
          <GearIcon className="h-[18px] w-[18px]" />
        </button>
      </div>

      {open && (
        <div
          ref={popoverRef}
          id={popoverId}
          role="group"
          aria-labelledby={`${popoverId}-title`}
          className="glass w-60 rounded-2xl p-4 text-left shadow-2xl"
        >
          <div id={`${popoverId}-title`} className="text-[11px] font-semibold uppercase tracking-wider ui-muted">
            Widgets visibility
          </div>
          <div className="mt-2.5 space-y-0.5">
            {VISIBILITY_OPTIONS.map(option => {
              const enabled = widgets[option.id] ?? true;
              return (
                <div key={option.id} className="flex items-center justify-between gap-3 rounded-lg px-1 py-1.5">
                  <span className="text-xs">{option.label}</span>
                  <Switch
                    checked={enabled}
                    label={option.label}
                    onChange={() => toggleWidget(option.id, !enabled)}
                  />
                </div>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}