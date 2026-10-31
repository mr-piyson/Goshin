import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import type { RootState } from '@/store';

interface Weather { temp: number; code: number; city?: string }

const codeLabel = (c: number) =>
  c === 0 ? 'Clear' : c < 4 ? 'Partly cloudy' : c < 50 ? 'Fog' : c < 70 ? 'Rain' : c < 80 ? 'Snow' : 'Storm';

function WeatherIcon({ code, className }: { code: number; className?: string }) {
  const common = { fill: 'none', stroke: 'currentColor', strokeWidth: 1.7, strokeLinecap: 'round', strokeLinejoin: 'round' } as const;
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

export default function WeatherWidget() {
  const unit = useSelector((s: RootState) => s.settings.weatherUnit);
  const [w, setW] = useState<Weather | null>(null);
  const [err, setErr] = useState<string | null>(null);

  useEffect(() => {
    if (!navigator.geolocation) { setErr('No geolocation'); return; }
    navigator.geolocation.getCurrentPosition(
      async (pos) => {
        const { latitude: lat, longitude: lon } = pos.coords;
        try {
          const r = await fetch(`https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&current=temperature_2m,weather_code`);
          const j = await r.json();
          setW({ temp: j.current.temperature_2m, code: j.current.weather_code });
        } catch {
          setErr('Weather unavailable');
        }
      },
      () => setErr('Location denied'),
    );
  }, []);

  if (err) {
    return (
      <div className="flex h-full w-full min-w-[64px] flex-col items-center justify-center px-2 text-center" title={err}>
        <WeatherIcon code={3} className="h-5 w-5 opacity-70" />
        <span className="mt-1 font-title text-xl font-medium leading-none ui-muted">—</span>
      </div>
    );
  }

  if (!w) {
    return (
      <div className="flex h-full w-full min-w-[64px] items-center justify-center gap-1.5 px-2" aria-label="Loading weather">
        <span className="h-4 w-4 animate-pulse rounded-full bg-[color:var(--surface-strong)]" />
        <span className="font-title text-xl font-medium leading-none ui-muted">…</span>
      </div>
    );
  }

  const temp = unit === 'F' ? Math.round(w.temp * 9 / 5 + 32) : Math.round(w.temp);
  return (
    <div
      className="flex h-full w-full min-w-[64px] items-center justify-center gap-1.5 px-2"
      title={w.city ? `${codeLabel(w.code)} in ${w.city}` : codeLabel(w.code)}
    >
      <WeatherIcon code={w.code} className="h-5 w-5 shrink-0" />
      <span className="font-title text-xl font-medium leading-none tabular-nums">
        {temp}°{unit}
      </span>
    </div>
  );
}
