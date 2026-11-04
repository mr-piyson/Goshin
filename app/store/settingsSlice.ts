import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

export interface SettingsState {
  widgets: Record<string, boolean>;
  sidebarApps: Record<string, boolean>;
  sidebarPinned: boolean;
  sidebarPosition: "left" | "right";
  timeFormat: "12" | "24";
  showSeconds: boolean;
  /** Preset id of the date line under the clock (see lib/dateStyles.ts). */
  dateStyle: string;
  /** Show the date line under the clock at all. */
  showDate: boolean;
  /** Append the year to the date line when the preset omits it. */
  showYear: boolean;
  weatherUnit: "C" | "F";
  /** "auto" = GPS → IP fallback; "manual" = user-picked city. */
  weatherSource: "auto" | "manual";
  /** Fixed lat/lon used when weatherSource is "manual". */
  weatherCity: WeatherCity | null;
  searchEngine: "google" | "bing" | "duckduckgo";
  theme: "dark" | "light" | "system";
  topbarMusic: boolean;
  topbarLoop: boolean;
  topbarStations: Station[];
}

/** A user-pinned location for the weather widget. */
export interface WeatherCity {
  name: string;
  lat: number;
  lon: number;
  country?: string;
}

/** One radio channel in the top bar playlist. */
export interface Station {
  title: string;
  artist?: string;
  /** Direct audio stream URL (http/https). */
  src: string;
}

export const DEFAULT_TOPBAR_STATIONS: Station[] = [
  { title: "Groove Salad", artist: "SomaFM", src: "https://ice1.somafm.com/groovesalad-128-mp3" },
  { title: "Radio Swiss Jazz", artist: "SRG SSR", src: "http://livestreaming-node-1.srg-ssr.ch/srgssr/rsj/mp3/128" },
];

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
  topbar: true,
};

const initial: SettingsState = {
  widgets: DEFAULT_WIDGETS,
  sidebarApps: DEFAULT_SIDEBAR_APPS,
  sidebarPinned: true,
  sidebarPosition: "left",
  timeFormat: "24",
  showSeconds: false,
  dateStyle: "smart",
  showDate: true,
  showYear: true,
  weatherUnit: "C",
  weatherSource: "auto",
  weatherCity: null,
  searchEngine: "google",
  theme: "dark",
  topbarMusic: true,
  topbarLoop: true,
  topbarStations: DEFAULT_TOPBAR_STATIONS,
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
    setDateStyle: (s, a: PayloadAction<string>) => {
      s.dateStyle = a.payload;
    },
    setShowDate: (s, a: PayloadAction<boolean>) => {
      s.showDate = a.payload;
    },
    setShowYear: (s, a: PayloadAction<boolean>) => {
      s.showYear = a.payload;
    },
    setWeatherUnit: (s, a: PayloadAction<"C" | "F">) => {
      s.weatherUnit = a.payload;
    },
    setWeatherSource: (s, a: PayloadAction<"auto" | "manual">) => {
      s.weatherSource = a.payload;
    },
    setWeatherCity: (s, a: PayloadAction<WeatherCity | null>) => {
      s.weatherCity = a.payload;
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
    setTopbarStations: (s, a: PayloadAction<Station[]>) => {
      s.topbarStations = a.payload;
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
      if (!s.dateStyle) {
        s.dateStyle = "smart";
      }
      if (s.showDate === undefined) {
        s.showDate = true;
      }
      if (s.showYear === undefined) {
        s.showYear = true;
      }
      if (!s.weatherSource) {
        s.weatherSource = "auto";
      }
      if (s.weatherCity === undefined) {
        s.weatherCity = null;
      }
      if (s.topbarMusic === undefined) {
        s.topbarMusic = true;
      }
      if (s.topbarLoop === undefined) {
        s.topbarLoop = true;
      }
      if (!Array.isArray(s.topbarStations) || s.topbarStations.length === 0) {
        s.topbarStations = DEFAULT_TOPBAR_STATIONS;
      }
    },
  },
});

export const { setWidget, setSidebarApp, setSidebarApps, setSidebarPinned, setSidebarPosition, setTimeFormat, setShowSeconds, setDateStyle, setShowDate, setShowYear, setWeatherUnit, setWeatherSource, setWeatherCity, setSearchEngine, setTheme, setTopbarMusic, setTopbarLoop, setTopbarStations, setAll } = slice.actions;
export default slice.reducer;
