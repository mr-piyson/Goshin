import React from 'react';
import { createRoot } from 'react-dom/client';
import { Provider } from 'react-redux';
import { browser } from 'wxt/browser';
import { store } from '@/store';
import { setAll as setBackground, type BackgroundState } from '@/store/backgroundSlice';
import { resolveBackground } from '@/lib/backgrounds';
import App from './App';
import './styles.css';

const root = createRoot(document.getElementById('root')!);

/** Wait briefly for the still frame so the first React paint already has
 *  the selected background instead of flashing the default one. */
function preloadImage(src: string) {
  return new Promise<void>((resolve) => {
    let settled = false;
    const finish = () => {
      if (settled) return;
      settled = true;
      window.clearTimeout(timeout);
      resolve();
    };
    const timeout = window.setTimeout(finish, 700);
    const image = new Image();
    image.onload = () => {
      if (typeof image.decode === 'function') void image.decode().then(finish, finish);
      else finish();
    };
    image.onerror = finish;
    image.src = src;
  });
}

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
  const still = look.kind === 'image' ? look.src : look.kind === 'video' ? look.poster : undefined;
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
