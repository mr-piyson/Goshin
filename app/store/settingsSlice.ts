import { createSlice, type PayloadAction } from '@reduxjs/toolkit';

export interface SettingsState {
  widgets: Record<string, boolean>;
  timeFormat: '12' | '24';
  showSeconds: boolean;
  weatherUnit: 'C' | 'F';
  searchEngine: 'google' | 'bing' | 'duckduckgo';
  theme: 'dark' | 'light' | 'system';
}

const initial: SettingsState = {
  widgets: { time: true, weather: true, motivation: true, search: true, launchpad: true, notes: true, tasks: true, calendar: true, gmail: true, history: true, topSites: true, translator: true, ticTacToe: true, lifeTimer: true, background: true, settings: true, account: true },
  timeFormat: '24',
  showSeconds: false,
  weatherUnit: 'C',
  searchEngine: 'google',
  theme: 'dark',
};

const slice = createSlice({
  name: 'settings',
  initialState: initial,
  reducers: {
    setWidget: (s, a: PayloadAction<{ id: string; value: boolean }>) => { s.widgets[a.payload.id] = a.payload.value; },
    setTimeFormat: (s, a: PayloadAction<'12' | '24'>) => { s.timeFormat = a.payload; },
    setShowSeconds: (s, a: PayloadAction<boolean>) => { s.showSeconds = a.payload; },
    setWeatherUnit: (s, a: PayloadAction<'C' | 'F'>) => { s.weatherUnit = a.payload; },
    setSearchEngine: (s, a: PayloadAction<SettingsState['searchEngine']>) => { s.searchEngine = a.payload; },
    setTheme: (s, a: PayloadAction<SettingsState['theme']>) => { s.theme = a.payload; },
    setAll: (s, a: PayloadAction<Partial<SettingsState>>) => { Object.assign(s, a.payload); },
  },
});

export const { setWidget, setTimeFormat, setShowSeconds, setWeatherUnit, setSearchEngine, setTheme, setAll } = slice.actions;
export default slice.reducer;