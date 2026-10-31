import { configureStore } from '@reduxjs/toolkit';
import searchReducer from './searchSlice';
import launchpadReducer from './launchpadSlice';
import settingsReducer from './settingsSlice';
import widgetOrderReducer from './widgetOrderSlice';
import backgroundReducer from './backgroundSlice';

export const store = configureStore({
  reducer: {
    search: searchReducer,
    launchpad: launchpadReducer,
    settings: settingsReducer,
    widgetOrder: widgetOrderReducer,
    background: backgroundReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;