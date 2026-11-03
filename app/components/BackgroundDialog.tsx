import React, { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion, type Variants } from "motion/react";
import { createTheme, Tab, Tabs, ThemeProvider } from "@mui/material";
import { CloseIcon } from "./Icons";
import BackgroundGallery from "./BackgroundGallery";
import type { Tab as BackgroundTab } from "./BackgroundGallery";

// A neutral default theme; app colors come from CSS variables via sx below.
const MUI_THEME = createTheme();

const TABS: { id: BackgroundTab; label: string }[] = [
  { id: "cover", label: "Galleries" },
  { id: "gradients", label: "Gradients" },
  { id: "custom", label: "My background" },
];

const SLIDE_EASE: [number, number, number, number] = [0.4, 0, 0.2, 1];

// Incoming tab slides from the direction it came from; exiting slides opposite.
const SLIDE_VARIANTS: Variants = {
  enter: (dir: number) => ({ x: dir > 0 ? 32 : -32, opacity: 0 }),
  center: { x: 0, opacity: 1, transition: { duration: 0.25, ease: SLIDE_EASE } },
  exit: (dir: number) => ({
    x: dir > 0 ? -32 : 32,
    opacity: 0,
    transition: { duration: 0.2, ease: SLIDE_EASE },
  }),
};

interface BackgroundDialogProps {
  open: boolean;
  onClose: () => void;
}

export default function BackgroundDialog({ open, onClose }: BackgroundDialogProps) {
  const [tab, setTab] = useState<BackgroundTab>("cover");
  const [direction, setDirection] = useState(1);
  const panelRef = useRef<HTMLDivElement>(null);

  const selectTab = (next: BackgroundTab) => {
    if (next === tab) return;
    setDirection(TABS.findIndex(t => t.id === next) > TABS.findIndex(t => t.id === tab) ? 1 : -1);
    setTab(next);
  };

  // Clicks anywhere outside the dialog panel close it — but pass through to the
  // underlying UI, so e.g. the dock's other buttons still receive them.
  useEffect(() => {
    if (!open) return;
    const onPointer = (e: PointerEvent) => {
      if (!panelRef.current?.contains(e.target as Node)) onClose();
    };
    document.addEventListener("pointerdown", onPointer);
    return () => document.removeEventListener("pointerdown", onPointer);
  }, [open, onClose]);

  return (
    <AnimatePresence>
      {open && (
        <div className="pointer-events-none fixed inset-0 z-50" role="dialog" aria-modal="true" aria-label="Backgrounds">
          <div className="absolute inset-0 flex items-end justify-end p-4 pb-16">
            <motion.div
              ref={panelRef}
              className="pointer-events-auto flex h-[min(70vh,560px)] w-full max-w-2xl flex-col overflow-hidden rounded-2xl border border-[color:var(--border)] bg-[color:var(--panel)] text-[color:var(--text)] backdrop-blur-[28px] backdrop-saturate-150"
              style={{ transformOrigin: "bottom right" }}
              initial={{ opacity: 0, scale: 0.97, y: 4 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{
                opacity: 0,
                scale: 0.97,
                transition: { duration: 0.15, ease: "easeIn" },
              }}
              transition={{ type: "spring", stiffness: 300, damping: 14, mass: 0.9 }}
            >
              <header className="flex items-center gap-4 px-5 pb-1.5 pt-3.5">
                <h2 className="shrink-0 text-lg font-semibold">Backgrounds</h2>
                <ThemeProvider theme={MUI_THEME}>
                  <Tabs
                    value={tab}
                    onChange={(_, next) => selectTab(next as BackgroundTab)}
                    variant="scrollable"
                    scrollButtons="auto"
                    aria-label="Background categories"
                    sx={{
                      minHeight: 36,
                      flex: 1,
                      borderBottom: "none",
                      "& .MuiTabs-indicator": {
                        backgroundColor: "var(--text)",
                        height: 2,
                        borderRadius: 2,
                      },
                      "& .MuiTabs-flexContainer": {
                        gap: "4px",
                      },
                      "& .MuiTabScrollButton-root": {
                        width: 24,
                        minWidth: 24,
                        color: "var(--muted)",
                        opacity: 1,
                        "&:hover": { color: "var(--text)" },
                        "&.Mui-disabled": { opacity: 0.25 },
                      },
                    }}
                  >
                    {TABS.map(item => (
                      <Tab
                        key={item.id}
                        value={item.id}
                        label={item.label}
                        disableRipple
                        sx={{
                          minHeight: 36,
                          minWidth: 48,
                          px: 1.25,
                          fontSize: 12,
                          textTransform: "none",
                          fontWeight: tab === item.id ? 600 : 500,
                          color: tab === item.id ? "var(--text)" : "var(--muted)",
                          "&:hover": { color: "var(--text)" },
                          "&:focus-visible": {
                            outline: "2px solid var(--text)",
                            outlineOffset: -2,
                          },
                          "&.Mui-selected": {
                            color: "var(--text)",
                          },
                        }}
                      />
                    ))}
                  </Tabs>
                </ThemeProvider>
                <button type="button" onClick={onClose} className="icon-btn ml-auto shrink-0" aria-label="Close dialog">
                  <CloseIcon className="h-[18px] w-[18px]" />
                </button>
              </header>
              <div className="relative min-h-0 flex-1">
                <AnimatePresence initial={false} custom={direction}>
                  <motion.div
                    key={tab}
                    custom={direction}
                    variants={SLIDE_VARIANTS}
                    initial="enter"
                    animate="center"
                    exit="exit"
                    className="ntp-scroll absolute inset-0 overflow-y-auto px-5 pb-6 pt-2"
                  >
                    <BackgroundGallery tab={tab} />
                  </motion.div>
                </AnimatePresence>
              </div>
            </motion.div>
          </div>
        </div>
      )}
    </AnimatePresence>
  );
}
