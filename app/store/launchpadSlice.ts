import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import type { Shortcut } from '@/lib/storage';

interface State { items: Shortcut[]; loaded: boolean }
const initial: State = { items: [], loaded: false };

const slice = createSlice({
  name: 'launchpad',
  initialState: initial,
  reducers: {
    setAll: (s, a: PayloadAction<Shortcut[]>) => { s.items = a.payload; s.loaded = true; },
    add: (s, a: PayloadAction<Shortcut>) => { s.items.push(a.payload); },
    remove: (s, a: PayloadAction<string>) => { s.items = s.items.filter((i) => i.id !== a.payload); },
    reorder: (s, a: PayloadAction<Shortcut[]>) => { s.items = a.payload; },
  },
});

export const { setAll, add, remove, reorder } = slice.actions;
export default slice.reducer;