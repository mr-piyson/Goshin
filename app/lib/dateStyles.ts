/**
 * Shared date-line presets for the Time widget and its Settings tab.
 * A "style" is a dayjs base format without the year; if the user turns the
 * year on we append it (comma-separated, slash-separated for numeric style).
 */
export interface DateStyle {
  id: string;
  label: string;
  hint: string;
  /** Dayjs format without the year. */
  base: string;
  /** Numeric styles append /YYYY instead of ", YYYY". */
  numeric?: boolean;
}

export const DEFAULT_DATE_STYLE_ID = "smart";

export const DATE_STYLES: DateStyle[] = [
  { id: "smart", label: "Smart", hint: "Thu, Nov 5", base: "ddd, MMM D" },
  { id: "short", label: "Short", hint: "Nov 5", base: "MMM D" },
  { id: "numeric", label: "Numeric", hint: "11/5", base: "M/D", numeric: true },
];

/** Resolve a stored style id against the presets, falling back to Smart. */
export function getDateStyle(id: string | undefined): DateStyle {
  return DATE_STYLES.find((s) => s.id === id) ?? DATE_STYLES[0]!;
}

/** Full dayjs format string for a style, honoring the show-year toggle. */
export function dateStyleFormat(id: string | undefined, showYear: boolean): string {
  const style = getDateStyle(id);
  if (!showYear) return style.base;
  return style.numeric ? `${style.base}/YYYY` : `${style.base}, YYYY`;
}
