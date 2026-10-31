import { createSlice, type PayloadAction } from '@reduxjs/toolkit';

export interface BackgroundState {
  current: string; // id or url
  disliked: string[];
  mode: 'image' | 'video' | 'both';
  galleries: string[]; // selected gallery ids
  custom?: string;
}

const initial: BackgroundState = {
  current: 'bg-1',
  disliked: [],
  mode: 'image',
  galleries: ['cover'],
  custom: undefined,
};

const slice = createSlice({
  name: 'background',
  initialState: initial,
  reducers: {
    setCurrent: (s, a: PayloadAction<string>) => { s.current = a.payload; },
    dislike: (s, a: PayloadAction<string>) => { if (!s.disliked.includes(a.payload)) s.disliked.push(a.payload); },
    resetDisliked: (s) => { s.disliked = []; },
    setMode: (s, a: PayloadAction<BackgroundState['mode']>) => { s.mode = a.payload; },
    setGalleries: (s, a: PayloadAction<string[]>) => { s.galleries = a.payload; },
    setCustom: (s, a: PayloadAction<string | undefined>) => { s.custom = a.payload; },
    setAll: (s, a: PayloadAction<Partial<BackgroundState>>) => { Object.assign(s, a.payload); },
  },
});

export const { setCurrent, dislike, resetDisliked, setMode, setGalleries, setCustom, setAll } = slice.actions;
export default slice.reducer;