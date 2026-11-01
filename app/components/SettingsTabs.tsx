import React from "react";
import { createTheme, Tab, Tabs, ThemeProvider } from "@mui/material";

export interface DraggableTabsProps {
  /** Fixed tab list; order does not change. */
  tabs: { id: string; label: string }[];
  /** Currently selected tab id. */
  active: string;
  onSelect: (id: string) => void;
}

/** Shared easing for the indicator and arrows. */
const EASE = "cubic-bezier(0.4, 0, 0.2, 1)";
const DURATION = 250;

// A neutral default theme; app colors come from CSS variables via sx below.
const MUI_THEME = createTheme();

export default function DraggableTabs({ tabs, active, onSelect }: DraggableTabsProps) {
  return (
    <div className="mb-2">
      <ThemeProvider theme={MUI_THEME}>
        <Tabs
          value={active}
          onChange={(_, next) => onSelect(String(next))}
          variant="standard"
          centered
          aria-label="Settings categories"
          sx={{
            minHeight: 36,
            borderBottom: "none",
            "& .MuiTabs-indicator": {
              backgroundColor: "var(--text)",
              height: 2,
              borderRadius: 2,
              transition: `left ${DURATION}ms ${EASE}, width ${DURATION}ms ${EASE}`,
            },
            "& .MuiTabs-flexContainer": {
              gap: "4px",
            },
          }}
        >
          {tabs.map((tab) => (
            <Tab
              key={tab.id}
              value={tab.id}
              label={tab.label}
              disableRipple
              sx={{
                minHeight: 36,
                minWidth: 52,
                px: 1.5,
                fontSize: 12,
                textTransform: "none",
                fontWeight: active === tab.id ? 600 : 500,
                color: active === tab.id ? "var(--text)" : "var(--muted)",
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
    </div>
  );
}
