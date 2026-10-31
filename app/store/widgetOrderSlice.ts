import { createSlice, type PayloadAction } from '@reduxjs/toolkit';

const DEFAULT_ORDER = ['launchpad', 'notes', 'tasks', 'topSites', 'history', 'calendar', 'gmail', 'translator', 'ticTacToe'];

const slice = createSlice({
  name: 'widgetOrder',
  initialState: { order: DEFAULT_ORDER },
  reducers: {
    setOrder: (s, a: PayloadAction<string[]>) => { s.order = a.payload; },
  },
});

export const { setOrder } = slice.actions;
export default slice.reducer;
export { DEFAULT_ORDER };