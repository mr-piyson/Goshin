import { useEffect, useRef, type FormEvent, type ReactNode } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setQuery } from "@/store/searchSlice";

import Fade from "../animations/fade";
import type { RootState } from "@/store";


type SearchWidgetProps = {
  children?: ReactNode;
  show?: boolean;
};

const ENGINES: Record<string, string> = {
  google: "https://www.google.com/search?q=",
  bing: "https://www.bing.com/search?q=",
  duckduckgo: "https://duckduckgo.com/?q=",
};

export default function SearchWidget({ show = false }: SearchWidgetProps) {
  const dispatch = useDispatch();
  const query = useSelector((s: RootState) => s.search.query);
  const searchEngine = useSelector((s: RootState) => s.settings.searchEngine);

  const searchRef = useRef<HTMLInputElement>(null);

  // Focus the input when "/" is pressed (outside other inputs)
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      const tag = (document.activeElement as HTMLElement | null)?.tagName;
      if (e.key === "/" && tag !== "INPUT" && tag !== "TEXTAREA") {
        e.preventDefault();
        searchRef.current?.focus();
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  const submitSearch = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const value = query.trim();
    if (!value) return;

    const base = ENGINES[searchEngine] ?? ENGINES.google;
    window.location.href = `${base}${encodeURIComponent(value)}`;
  };

  return (
    <Fade open={show} className="w-full">
      <form onSubmit={submitSearch} className="w-full max-w-2xl">
        <div className="glass flex items-center gap-3 rounded-full px-5 py-3">
          <SearchIcon className="h-5 w-5 shrink-0 ui-muted" />
          <input
            ref={searchRef}
            value={query}
            onChange={(event) => dispatch(setQuery(event.target.value))}
            placeholder="Search the web…"
            aria-label="Search the web"
            spellCheck={false}
            className="min-w-0 flex-1 bg-transparent px-0 py-0 text-base outline-none placeholder:text-[color:var(--muted)]"
          />
          <kbd className="hidden rounded-md border border-[color:var(--border)] px-1.5 py-0.5 text-[10px] ui-muted sm:block">
            /
          </kbd>
        </div>
      </form>
    </Fade>
  );
}