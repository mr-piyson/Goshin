import React, { useEffect, useMemo, useRef, useState } from "react";
import { ComposableMap, Geographies, Geography, Marker } from "react-simple-maps";
import world from "world-atlas/countries-110m.json";
import type { WeatherCity } from "@/store/settingsSlice";

const MAP_W = 800;
const MAP_H = 420;

/** One Open-Meteo geocoding hit. */
interface GeoResult {
  id: number;
  name: string;
  latitude: number;
  longitude: number;
  country?: string;
  admin1?: string;
}

/** Shape returned by BigDataCloud's keyless reverse geocoder. */
interface ReverseResult {
  city?: string;
  locality?: string;
  principalSubdivision?: string;
  countryName?: string;
}

const toCity = (r: GeoResult): WeatherCity => ({
  name: r.name,
  lat: r.latitude,
  lon: r.longitude,
  country: [r.admin1, r.country].filter(Boolean).join(", ") || undefined,
});

async function reverseGeocode(lat: number, lon: number, signal?: AbortSignal): Promise<WeatherCity> {
  const fallback: WeatherCity = { name: `${lat.toFixed(2)}°, ${lon.toFixed(2)}°`, lat, lon };
  try {
    const res = await fetch(
      `https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=${lat}&longitude=${lon}&localityLanguage=en`,
      { signal },
    );
    if (!res.ok) return fallback;
    const j = (await res.json()) as ReverseResult;
    const name = j.city || j.locality || j.principalSubdivision;
    if (!name) return fallback;
    return {
      name,
      lat,
      lon,
      country: [j.principalSubdivision, j.countryName].filter((v, i, arr) => v && arr.indexOf(v) === i).join(", ") || undefined,
    };
  } catch {
    return fallback;
  }
}

/**
 * City picker used by Settings → Weather. Two ways to choose:
 *  - type a name (Open-Meteo geocoding autocomplete)
 *  - click anywhere on the world map (BigDataCloud reverse geocoding)
 */
export default function WeatherCityPicker({
  selected,
  onSelect,
}: {
  selected: WeatherCity | null;
  onSelect: (city: WeatherCity) => void;
}) {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<GeoResult[]>([]);
  const [searching, setSearching] = useState(false);
  const [picking, setPicking] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const pickAbort = useRef<AbortController | null>(null);

  // Debounced city search; aborts the in-flight request on every keystroke.
  useEffect(() => {
    const q = query.trim();
    if (q.length < 2) {
      setResults([]);
      setSearching(false);
      return;
    }
    const ctrl = new AbortController();
    setSearching(true);
    const timer = setTimeout(async () => {
      try {
        const res = await fetch(
          `https://geocoding-api.open-meteo.com/v1/search?name=${encodeURIComponent(q)}&count=8&language=en&format=json`,
          { signal: ctrl.signal },
        );
        if (!res.ok) throw new Error(`HTTP ${res.status}`);
        const j = (await res.json()) as { results?: GeoResult[] };
        setResults(j.results ?? []);
        setError(null);
      } catch (err) {
        if ((err as Error).name !== "AbortError") {
          setResults([]);
          setError("City search unavailable");
        }
      } finally {
        if (!ctrl.signal.aborted) setSearching(false);
      }
    }, 300);
    return () => {
      clearTimeout(timer);
      ctrl.abort();
    };
  }, [query]);

  useEffect(() => () => pickAbort.current?.abort(), []);

  const pickFromMap = async (lat: number, lon: number) => {
    pickAbort.current?.abort();
    const ctrl = new AbortController();
    pickAbort.current = ctrl;
    setPicking(true);
    const city = await reverseGeocode(lat, lon, ctrl.signal);
    if (!ctrl.signal.aborted) {
      onSelect(city);
      setPicking(false);
    }
  };

  const marker = useMemo(
    () => (selected ? ([selected.lon, selected.lat] as [number, number]) : null),
    [selected],
  );

  return (
    <div className="space-y-3">
      {/* Search */}
      <div className="relative">
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search a city (e.g. Amman)"
          className="w-full rounded-lg border border-[color:var(--border)] bg-[color:var(--field)] px-2.5 py-1.5 text-xs text-[color:var(--text)] outline-none placeholder:text-[color:var(--muted)] focus:ring-2 focus:ring-acbg-accent/60"
        />
        {searching && (
          <span className="absolute right-2.5 top-1/2 -translate-y-1/2 text-[10px] ui-muted">…</span>
        )}
      </div>

      {results.length > 0 && (
        <ul className="max-h-44 overflow-y-auto rounded-lg border border-[color:var(--border)] bg-[color:var(--surface)]">
          {results.map((r) => (
            <li key={r.id}>
              <button
                type="button"
                onClick={() => {
                  onSelect(toCity(r));
                  setQuery("");
                  setResults([]);
                }}
                className="flex w-full items-center justify-between gap-2 border-b border-[color:var(--border)] px-2.5 py-1.5 text-left text-xs last:border-b-0 transition hover:bg-[color:var(--surface-strong)]"
              >
                <span className="min-w-0 truncate font-medium">{r.name}</span>
                <span className="shrink-0 truncate text-[10px] ui-muted">
                  {[r.admin1, r.country].filter(Boolean).join(", ")}
                </span>
              </button>
            </li>
          ))}
        </ul>
      )}

      {error && <p className="text-[10px] text-red-400">{error}</p>}

      {/* Map */}
      <div className="overflow-hidden rounded-xl border border-[color:var(--border)] bg-[color:var(--field)]">
        <ComposableMap
          width={MAP_W}
          height={MAP_H}
          projection="geoNaturalEarth1"
          projectionConfig={{ scale: 145 }}
          className="h-auto w-full"
          aria-label="World map — click a location to pin the weather city"
          role="img"
        >
          <Geographies geography={world as any}>
            {({ geographies, projection }) => (
              <>
                {geographies.map((geo) => (
                  <Geography
                    key={geo.rsmKey}
                    geography={geo}
                    fill="var(--surface-strong)"
                    stroke="var(--border)"
                    strokeWidth={0.5}
                    className="outline-none transition-opacity hover:opacity-70"
                  />
                ))}

                {/* Full-map hit target: converts the click into lon/lat. */}
                <rect
                  width={MAP_W}
                  height={MAP_H}
                  fill="transparent"
                  style={{ cursor: picking ? "wait" : "crosshair" }}
                  onClick={(e) => {
                    const svg = e.currentTarget.ownerSVGElement;
                    const ctm = svg?.getScreenCTM();
                    if (!svg || !ctm || !projection.invert) return;
                    const pt = svg.createSVGPoint();
                    pt.x = e.clientX;
                    pt.y = e.clientY;
                    const local = pt.matrixTransform(ctm.inverse());
                    const inverted = projection.invert([local.x, local.y]);
                    if (!inverted) return;
                    const [lon, lat] = inverted;
                    if (Number.isFinite(lat) && Number.isFinite(lon)) void pickFromMap(lat, lon);
                  }}
                />

                {marker && (
                  <Marker coordinates={marker} style={{ pointerEvents: "none" }}>
                    <circle r={4} fill="#8b5cf6" stroke="#fff" strokeWidth={1.5} />
                    <circle r={9} fill="#8b5cf6" opacity={0.25} />
                  </Marker>
                )}
              </>
            )}
          </Geographies>
        </ComposableMap>
      </div>

      <p className="text-[10px] ui-muted">
        {picking ? "Looking up the nearest city…" : "Tip: click the map to pin a city, or use search above."}
      </p>
    </div>
  );
}
