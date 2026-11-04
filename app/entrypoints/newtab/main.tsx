import React from 'react';
import { createRoot } from 'react-dom/client';
import { Provider } from 'react-redux';
import { browser } from 'wxt/browser';
import { store } from '@/store';
import { setAll as setBackground, type BackgroundState } from '@/store/backgroundSlice';
import { backgroundStill, resolveBackground } from '@/lib/backgrounds';
import { preloadImage } from '@/lib/preload';
import App from './App';
import './styles.css';

const root = createRoot(document.getElementById('root')!);

async function bootstrap() {
  try {
    const stored = await browser.storage.local.get('background');
    if (stored.background && typeof stored.background === 'object') {
      store.dispatch(setBackground(stored.background as Partial<BackgroundState>));
    }
  } catch (error) {
    console.warn('[newtab] could not restore background before first paint', error);
  }

  const { current, custom } = store.getState().background;
  const look = resolveBackground(current, custom);
  const still = backgroundStill(look);
  if (still) await preloadImage(still);

  root.render(
    <React.StrictMode>
      <Provider store={store}>
        <App />
      </Provider>
    </React.StrictMode>,
  );
}

void bootstrap();
