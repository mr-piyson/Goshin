import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

export interface SettingsState {
  widgets: Record<string, boolean>;
  sidebarApps: Record<string, boolean>;
  sidebarPinned: boolean;
  sidebarPosition: "left" | "right";
  timeFormat: "12" | "24";
  showSeconds: boolean;
  weatherUnit: "C" | "F";
  searchEngine: "google" | "bing" | "duckduckgo";
  theme: "dark" | "light" | "system";
  topbarMusic: boolean;
  topbarLoop: boolean;
}

const DEFAULT_SIDEBAR_APPS: Record<string, boolean> = {
  calendar: true,
  gmail: true,
  tasks: true,
  notes: true,
  history: true,
  translator: true,
  ticTacToe: true,
  lifeTimer: true,
  topSites: true,
};

const DEFAULT_WIDGETS: Record<string, boolean> = {
  time: true,
  weather: true,
  motivation: true,
  search: true,
  launchpad: true,
};

const initial: SettingsState = {
  widgets: DEFAULT_WIDGETS,
  sidebarApps: DEFAULT_SIDEBAR_APPS,
  sidebarPinned: true,
  sidebarPosition: "left",
  timeFormat: "24",
  showSeconds: false,
  weatherUnit: "C",
  searchEngine: "google",
  theme: "dark",
  topbarMusic: true,
  topbarLoop: true,
};

const slice = createSlice({
  name: "settings",
  initialState: initial,
  reducers: {
    setWidget: (s, a: PayloadAction<{ id: string; value: boolean }>) => {
      s.widgets[a.payload.id] = a.payload.value;
    },
    setSidebarApp: (s, a: PayloadAction<{ id: string; value: boolean }>) => {
      if (!s.sidebarApps) s.sidebarApps = { ...DEFAULT_SIDEBAR_APPS };
      s.sidebarApps[a.payload.id] = a.payload.value;
    },
    setSidebarApps: (s, a: PayloadAction<Record<string, boolean>>) => {
      s.sidebarApps = a.payload;
    },
    setSidebarPinned: (s, a: PayloadAction<boolean>) => {
      s.sidebarPinned = a.payload;
    },
    setSidebarPosition: (s, a: PayloadAction<"left" | "right">) => {
      s.sidebarPosition = a.payload;
    },
    setTimeFormat: (s, a: PayloadAction<"12" | "24">) => {
      s.timeFormat = a.payload;
    },
    setShowSeconds: (s, a: PayloadAction<boolean>) => {
      s.showSeconds = a.payload;
    },
    setWeatherUnit: (s, a: PayloadAction<"C" | "F">) => {
      s.weatherUnit = a.payload;
    },
    setSearchEngine: (s, a: PayloadAction<SettingsState["searchEngine"]>) => {
      s.searchEngine = a.payload;
    },
    setTheme: (s, a: PayloadAction<SettingsState["theme"]>) => {
      s.theme = a.payload;
    },
    setTopbarMusic: (s, a: PayloadAction<boolean>) => {
      s.topbarMusic = a.payload;
    },
    setTopbarLoop: (s, a: PayloadAction<boolean>) => {
      s.topbarLoop = a.payload;
    },
    setAll: (s, a: PayloadAction<Partial<SettingsState>>) => {
      Object.assign(s, a.payload);
      if (!s.sidebarApps) {
        s.sidebarApps = { ...DEFAULT_SIDEBAR_APPS };
      }
      if (s.sidebarPinned === undefined) {
        s.sidebarPinned = true;
      }
      if (!s.sidebarPosition) {
        s.sidebarPosition = "left";
      }
      if (!s.widgets) {
        s.widgets = { ...DEFAULT_WIDGETS };
      }
      if (s.topbarMusic === undefined) {
        s.topbarMusic = true;
      }
      if (s.topbarLoop === undefined) {
        s.topbarLoop = true;
      }
    },
  },
});

export const { setWidget, setSidebarApp, setSidebarApps, setSidebarPinned, setSidebarPosition, setTimeFormat, setShowSeconds, setWeatherUnit, setSearchEngine, setTheme, setTopbarMusic, setTopbarLoop, setAll } = slice.actions;
export default slice.reducer;
