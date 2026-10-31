import React, { useCallback, useEffect, useRef, useState } from 'react';
import { useSelector } from 'react-redux';
import { browser } from 'wxt/browser';
import type { RootState } from '@/store';

interface Weather { temp: number; code: number; city?: string }
type Source = 'gps' | 'ip';

const codeLabel = (c: number) =>
  c === 0 ? 'Clear' : c < 4 ? 'Partly cloudy' : c < 50 ? 'Fog'
  : c < 70 ? 'Rain' : c < 80 ? 'Snow' : 'Storm';

// --- WeatherIcon (unchanged from your version) ---
function WeatherIcon({ code, className }: { code: number; className?: string }) {
  const common = {
    fill: 'none', stroke: 'currentColor', strokeWidth: 1.7,
    strokeLinecap: 'round', strokeLinejoin: 'round',
  } as const;
  if (code === 0) {
    return (
      <svg viewBox="0 0 24 24" className={className} aria-hidden="true" {...common}>
        <circle cx="12" cy="12" r="4" />
        <path d="M12 2v2M12 20v2M4.9 4.9l1.4 1.4M17.7 17.7l1.4 1.4M2 12h2M20 12h2M4.9 19.1l1.4-1.4M17.7 6.3l1.4-1.4" />
      </svg>
    );
  }
  if (code >= 70 && code < 80) {
    return (
      <svg viewBox="0 0 24 24" className={className} aria-hidden="true" {...common}>
        <path d="M6 15a4 4 0 0 1 .6-8 5.5 5.5 0 0 1 10.5 1.6A3.5 3.5 0 0 1 17 15H6Z" />
        <path d="M8 18v2M12 18v3M16 18v2" />
      </svg>
    );
  }
  if (code >= 51) {
    return (
      <svg viewBox="0 0 24 24" className={className} aria-hidden="true" {...common}>
        <path d="M6 14a4 4 0 0 1 .6-8 5.5 5.5 0 0 1 10.5 1.6A3.5 3.5 0 0 1 17 14H6Z" />
        <path d="M8 17l-1 3M13 17l-1 3M18 17l-1 3" />
      </svg>
    );
  }
  return (
    <svg viewBox="0 0 24 24" className={className} aria-hidden="true" {...common}>
      <path d="M6 16a4 4 0 0 1 .6-8 5.5 5.5 0 0 1 10.5 1.6A3.5 3.5 0 0 1 17 16H6Z" />
    </svg>
  );
}

// --- Cache (keeps popup reopen instant) ---
const CACHE_KEY = 'weather:v1';
const CACHE_TTL_MS = 15 * 60_000;

interface CachedWeather extends Weather { source: Source; ts: number }

async function readCache(): Promise<CachedWeather | null> {
  try {
    const bag = await browser.storage.local.get(CACHE_KEY);
    const c = bag[CACHE_KEY] as CachedWeather | undefined;
    if (c && Date.now() - c.ts < CACHE_TTL_MS) return c;
  } catch { /* ignore */ }
  return null;
}

async function writeCache(w: Weather, source: Source) {
  try {
    await browser.storage.local.set({
      [CACHE_KEY]: { ...w, source, ts: Date.now() },
    });
  } catch { /* ignore */ }
}

type Phase = 'boot' | 'asking' | 'loading' | 'ready' | 'error';

export default function WeatherWidget() {
  const unit = useSelector((s: RootState) => s.settings.weatherUnit);

  const [w, setW] = useState<Weather | null>(null);
  const [source, setSource] = useState<Source | null>(null);
  const [phase, setPhase] = useState<Phase>('boot');
  const [err, setErr] = useState<string | null>(null);
  const [canUpgrade, setCanUpgrade] = useState(false);

  // Refs — used inside callbacks so we don't have to re-create them on every
  // state change, and to survive StrictMode double-invocation.
  const started = useRef(false);
  const hasWeather = useRef(false);

  // -- data fetchers ---------------------------------------------------------

  const fetchWeather = useCallback(
    async (lat: number, lon: number, src: Source, city?: string) => {
      if (!hasWeather.current) setPhase('loading');
      setErr(null);
      try {
        const r = await fetch(
          `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}` +
          `&current=temperature_2m,weather_code`,
        );
        if (!r.ok) throw new Error(`HTTP ${r.status}`);
        const j = await r.json();
        const next: Weather = {
          temp: j.current.temperature_2m,
          code: j.current.weather_code,
          city,
        };
        hasWeather.current = true;
        setW(next);
        setSource(src);
        setPhase('ready');
        void writeCache(next, src);
      } catch {
        // If we already have *something*, keep it — don't blank the widget
        // on a background refresh failure.
        if (!hasWeather.current) {
          setErr('Weather unavailable');
          setPhase('error');
        } else {
          setPhase('ready');
        }
      }
    },
    [],
  );

  const fetchByIP = useCallback(async () => {
    try {
      const r = await fetch('https://ipapi.co/json/');
      if (!r.ok) throw new Error('ip api failed');
      const j = await r.json();
      if (typeof j.latitude !== 'number' || typeof j.longitude !== 'number') {
        throw new Error('no coords');
      }
      await fetchWeather(j.latitude, j.longitude, 'ip', j.city);
    } catch {
      if (!hasWeather.current) {
        setErr('Weather unavailable');
        setPhase('error');
      }
    }
  }, [fetchWeather]);

  const getGPSWeather = useCallback(async () => {
    if (!('geolocation' in navigator)) {
      await fetchByIP();
      return;
    }
    // Only show "waiting" if we don't already have data on screen.
    if (!hasWeather.current) setPhase('asking');

    await new Promise<void>((resolve) => {
      navigator.geolocation.getCurrentPosition(
        async (pos) => {
          await fetchWeather(pos.coords.latitude, pos.coords.longitude, 'gps');
          resolve();
        },
        async () => {
          // Denied / unavailable / timeout → IP fallback, keep whatever is
          // currently on screen.
          if (!hasWeather.current) await fetchByIP();
          resolve();
        },
        { timeout: 12_000, maximumAge: 10 * 60_000, enableHighAccuracy: false },
      );
    });
  }, [fetchWeather, fetchByIP]);

  const queryPermission = useCallback(async (): Promise<PermissionState | null> => {
    try {
      const p = await navigator.permissions.query({
        name: 'geolocation' as PermissionName,
      });
      return p.state;
    } catch {
      return null; // not supported in this context
    }
  }, []);

  // -- user gesture: request optional permission then GPS --------------------

  const requestPreciseLocation = useCallback(async () => {
    try {
      const perms = (browser as any)?.permissions;
      if (perms?.request) {
        // Ask the extension to grant geolocation. This prompt must be
        // triggered from a user gesture — that's why it's a button click.
        const granted = await perms.request({ permissions: ['geolocation'] });
        if (!granted) return; // user declined → keep IP weather
      }
    } catch {
      // Already granted via manifest `permissions: ['geolocation']`, or API
      // unavailable in this context — either way, just try GPS directly.
    }
    setCanUpgrade(false);
    await getGPSWeather();
  }, [getGPSWeather]);

  // -- bootstrap -------------------------------------------------------------

  const bootstrap = useCallback(async () => {
    // 1) Cache first — instant popup
    const cached = await readCache();
    if (cached) {
      hasWeather.current = true;
      setW({ temp: cached.temp, code: cached.code, city: cached.city });
      setSource(cached.source);
      setPhase('ready');
      if (cached.source === 'gps') return; // still fresh
    }

    // 2) Query permission
    const permState = await queryPermission();

    // 3) GPS already allowed → prefer it
    if (permState === 'granted') {
      await getGPSWeather();
      return;
    }

    // 4) Otherwise IP fallback so we're never empty
    if (!cached) await fetchByIP();

    // 5) Offer upgrade unless the user has explicitly blocked us
    if (permState !== 'denied') setCanUpgrade(true);
  }, [fetchByIP, getGPSWeather, queryPermission]);

  useEffect(() => {
    if (started.current) return; // StrictMode double-invoke guard
    started.current = true;
    void bootstrap().catch(() => { /* handled in callbacks */ });
  }, [bootstrap]);

  // -- render ----------------------------------------------------------------

  if (phase === 'error' && !w) {
    return (
      <button
        type="button"
        onClick={() => void bootstrap()}
        title={err ?? 'Retry'}
        className="flex h-full w-full min-w-[64px] flex-col items-center justify-center px-2 text-center"
      >
        <WeatherIcon code={3} className="h-5 w-5 opacity-70" />
        <span className="mt-1 text-xl font-medium leading-none ui-muted">—</span>
      </button>
    );
  }

  if (!w) {
    return (
      <div
        className="flex h-full w-full min-w-[64px] items-center justify-center gap-1.5 px-2"
        aria-label={phase === 'asking' ? 'Waiting for location' : 'Loading weather'}
      >
        <span className="h-4 w-4 animate-pulse rounded-full bg-[color:var(--surface-strong)]" />
        <span className="text-xl font-medium leading-none ui-muted">…</span>
      </div>
    );
  }

  const temp = unit === 'F' ? Math.round((w.temp * 9) / 5 + 32) : Math.round(w.temp);
  const label = w.city ? `${codeLabel(w.code)} in ${w.city}` : codeLabel(w.code);

  return (
 <div
  className="relative flex h-full w-full min-w-[64px] flex-col items-center justify-center gap-0.5 px-2"
  title={label}
>
  <div className="flex items-center gap-1.5">
    <WeatherIcon code={w.code} className="h-5 w-5 shrink-0" />
    <span className="text-xl font-medium leading-none tabular-nums">
      {temp}°{unit}
    </span>
  </div>

  {w.city && (
    <span
      className="max-w-full mt-1.5 truncate text-sm leading-none ui-muted"
      title={w.city}
    >
      {w.city}
    </span>
  )}
      {canUpgrade && source === 'ip' && (
        <button
          type="button"
          onClick={() => void requestPreciseLocation()}
          title="Use precise location"
          aria-label="Use precise location"
          className="absolute -right-0.5 -top-0.5 flex h-3.5 w-3.5 items-center justify-center rounded-full bg-[color:var(--surface-strong)] text-[9px] leading-none opacity-70 hover:opacity-100"
        >
          <svg viewBox="0 0 24 24" className="h-2.5 w-2.5" fill="none"
               stroke="currentColor" strokeWidth={2.4}
               strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
            <circle cx="12" cy="10" r="3" />
            <path d="M12 21s-7-6.2-7-11a7 7 0 1 1 14 0c0 4.8-7 11-7 11Z" />
          </svg>
        </button>
      )}
    </div>
  );
}