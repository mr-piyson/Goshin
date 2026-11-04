import type { WeatherCity } from "@/store/settingsSlice";

/** Shape returned by BigDataCloud's keyless reverse geocoder. */
interface ReverseResult {
  city?: string;
  locality?: string;
  principalSubdivision?: string;
  countryName?: string;
}

/**
 * Resolve coordinates to the nearest city name using BigDataCloud's keyless
 * reverse geocoder. Returns `null` when the lookup fails, so callers can decide
 * whether to keep a previously known label or fall back to coordinates.
 */
export async function reverseGeocodeCity(
  lat: number,
  lon: number,
  signal?: AbortSignal,
): Promise<WeatherCity | null> {
  try {
    const res = await fetch(
      `https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=${lat}&longitude=${lon}&localityLanguage=en`,
      { signal },
    );
    if (!res.ok) return null;
    const j = (await res.json()) as ReverseResult;
    const name = j.city || j.locality || j.principalSubdivision;
    if (!name) return null;
    return {
      name,
      lat,
      lon,
      country:
        [j.principalSubdivision, j.countryName]
          .filter((v, i, arr) => v && arr.indexOf(v) === i)
          .join(", ") || undefined,
    };
  } catch {
    return null;
  }
}
