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
          variant="scrollable"
          // Arrows appear only when tabs overflow the strip; they scale with the tab count.
          scrollButtons="auto"
          allowScrollButtonsMobile
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
            "& .MuiTabs-scrollButtons": {
              width: 28,
              alignSelf: "center",
              color: "var(--muted)",
              transition: `opacity ${DURATION}ms ${EASE}, color 150ms ease`,
              "&:hover": {
                color: "var(--text)",
              },
            },
            "& .MuiTabs-scrollButtons.Mui-disabled": {
              opacity: 0,
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
                minWidth: { xs: 56, sm: 72 },
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
