import React, { useCallback, useEffect, useRef, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { browser } from "wxt/browser";
import { setAll as setSettings } from "@/store/settingsSlice";
import { setOrder } from "@/store/widgetOrderSlice";
import { setAll as setLaunchpad } from "@/store/launchpadSlice";
import { setAll as setBackground } from "@/store/backgroundSlice";
import { loadShortcuts } from "@/lib/storage";
import { resolveBackground } from "@/lib/backgrounds";
import WeatherWidget from "@/components/widgets/WeatherWidget";
import Notes from "@/components/Notes";
import Tasks from "@/components/Tasks";
import BackgroundDialog from "@/components/BackgroundDialog";
import LoopingVideo from "@/components/LoopingVideo";
import Translator from "@/components/Translator";
import TopSites from "@/components/TopSites";
import HistoryWidget from "@/components/HistoryWidget";
import CalendarWidget from "@/components/CalendarWidget";
import GmailWidget from "@/components/GmailWidget";
import Account from "@/components/Account";
import Onboarding from "@/components/Onboarding";
import TimeWidget from "@/components/widgets/TimeWidget";
import MotivationWidget from "@/components/widgets/MotivationWidget";
import LifeTimerWidget from "@/components/widgets/LifeTimerWidget";
import Panel from "@/components/Panel";
import CornerDock from "@/components/CornerDock";
import Collapsible, {
  COLLAPSIBLE_EXIT_DURATION,
  usePresence,
} from "@/components/animations/Collapsible";
import Sidebar, { type SidebarAppId } from "@/components/Sidebar";
import { SearchIcon, TimerIcon } from "@/components/Icons";
import type { RootState } from "@/store";
import Fade from "@/components/animations/fade";
import SearchWidget from "@/components/widgets/SearchWidget";
import TopBar, { TOPBAR_TRACKS } from "@/components/widgets/Topbar";



interface AppView {
  title: string;
  render: () => React.ReactNode;
}

const APP_VIEWS: Record<string, AppView> = {
  notes: { title: "Notes", render: () => <Notes /> },
  tasks: { title: "Tasks", render: () => <Tasks /> },
  calendar: { title: "Calendar", render: () => <CalendarWidget /> },
  gmail: { title: "Gmail", render: () => <GmailWidget /> },
  history: { title: "Recent history", render: () => <HistoryWidget /> },
  topSites: { title: "Top sites", render: () => <TopSites /> },
  translator: { title: "Translator", render: () => <Translator /> },
  lifeTimer: { title: "Life timer", render: () => <LifeTimerWidget /> },
  account: { title: "Account & sync", render: () => <Account /> },
};

const HERO_IDS = new Set(["time", "weather", "motivation", "search", "launchpad"]);

type PanelId = "background" | "account" | "notes" | "tasks" | "calendar" | "gmail" | "history" | "topSites" | "translator" | "lifeTimer";

function usePrefersDark() {
  const [dark, setDark] = useState(() => window.matchMedia("(prefers-color-scheme: dark)").matches);
  useEffect(() => {
    const query = window.matchMedia("(prefers-color-scheme: dark)");
    const onChange = () => setDark(query.matches);
    query.addEventListener("change", onChange);
    return () => query.removeEventListener("change", onChange);
  }, []);
  return dark;
}

export default function App() {
  const dispatch = useDispatch();
  const query = useSelector((state: RootState) => state.search.query);
  const settings = useSelector((state: RootState) => state.settings);
  const order = useSelector((state: RootState) => state.widgetOrder.order);
  const background = useSelector((state: RootState) => state.background);
  const prefersDark = usePrefersDark();
  const theme = settings.theme === "system" ? (prefersDark ? "dark" : "light") : settings.theme;

  const [panel, setPanel] = useState<PanelId | null>(null);
  const [sidebarApp, setSidebarApp] = useState<SidebarAppId | null>(null);
  const [settingsTab, setSettingsTab] = useState<{ tab: string; requestId: number } | null>(null);
  const [hydrated, setHydrated] = useState(false);
  // Time widget width is driven by its measured content so the clock can grow
  // (e.g. "Thu, Nov 5, 2026") without clipping; Collapsible animates the change.
  const [timeWidgetWidth, setTimeWidgetWidth] = useState(114);
  const searchRef = useRef<HTMLInputElement>(null);

  /** Open the Settings panel directly on a tab (used by the Time/Weather widgets). */
  const openSettings = useCallback((tab: string) => {
    setSettingsTab((prev) => ({ tab, requestId: (prev?.requestId ?? 0) + 1 }));
    setSidebarApp("settings");
  }, []);

  // Load persisted state once, then only start persisting after hydration so the
  // default state never overwrites what the user already saved.
  useEffect(() => {
    let cancelled = false;
    browser.storage.local
      .get(["settings", "widgetOrder", "shortcuts", "background"])
      .then((stored) => {
        if (cancelled) return;
        if (stored.settings) dispatch(setSettings(stored.settings as any));
        if (stored.widgetOrder) dispatch(setOrder(stored.widgetOrder as string[]));
        if (stored.shortcuts) dispatch(setLaunchpad(stored.shortcuts as any));
        else loadShortcuts().then((list) => dispatch(setLaunchpad(list)));
        if (stored.background) dispatch(setBackground(stored.background as any));
        setHydrated(true);
      })
      .catch(() => setHydrated(true));
    return () => {
      cancelled = true;
    };
  }, [dispatch]);

  useEffect(() => {
    if (hydrated) browser.storage.local.set({ settings });
  }, [settings, hydrated]);
  useEffect(() => {
    if (hydrated) browser.storage.local.set({ widgetOrder: order });
  }, [order, hydrated]);
  useEffect(() => {
    if (hydrated) browser.storage.local.set({ background });
  }, [background, hydrated]);

  // "/" or Cmd/Ctrl+K focuses search; Escape closes the active panel.
  useEffect(() => {
    const onKey = (event: KeyboardEvent) => {
      const target = event.target as HTMLElement | null;
      const typing = !!target && (/^(INPUT|TEXTAREA|SELECT)$/.test(target.tagName) || target.isContentEditable);
      if (event.key === "Escape") {
        setPanel(null);
        return;
      }
      const isSearchShortcut = !typing && (event.key === "/" || ((event.metaKey || event.ctrlKey) && event.key.toLowerCase() === "k"));
      if (isSearchShortcut && settings.widgets.search !== false) {
        event.preventDefault();
        searchRef.current?.focus();
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [settings.widgets.search]);

  const openFocusTime = useCallback(() => {
    window.location.href = browser.runtime.getURL("/focus-time.html");
  }, []);

  const look = resolveBackground(background.current, background.custom);
  const appView = panel && APP_VIEWS[panel] ? APP_VIEWS[panel] : null;
  const weatherVisible = settings.widgets.weather !== false;
  const timeVisible = settings.widgets.time !== false;
  const motivationVisible = settings.widgets.motivation !== false;
  const topbarVisible = settings.widgets.topbar !== false;
  const cornerMounted = usePresence(
    weatherVisible || timeVisible,
    COLLAPSIBLE_EXIT_DURATION,
    hydrated,
  );

  const motivationMounted = usePresence(
    motivationVisible,
    COLLAPSIBLE_EXIT_DURATION,
    hydrated,
  );
  return (
    <div className={`ntp-root theme-${theme} flex h-screen w-screen flex-col overflow-hidden`}>
      {look.kind === "video" ? <LoopingVideo key={look.url} className="ntp-bg" src={look.url} /> : <div className="ntp-bg" style={{ background: look.css }} aria-hidden="true" />}

      {/* Collapsible Sidebar on screen edge with all apps + settings in one panel */}
      <Sidebar activeApp={sidebarApp} onActiveAppChange={setSidebarApp} settingsTab={settingsTab} ready={hydrated} />

      {topbarVisible && (
        <TopBar
          tracks={
            settings.topbarMusic ?? true
              ? settings.topbarStations?.length ? settings.topbarStations : TOPBAR_TRACKS
              : []
          }
        />
      )}

{hydrated && (
  <div className="m-2 fixed right-0 top-0 z-30">
    <div
      className={`
        flex h-[72px] items-stretch overflow-hidden rounded-xl
        transition-[padding] duration-300
        ${cornerMounted || weatherVisible || timeVisible ? "glass" : ""}
        ${weatherVisible || timeVisible ? "px-1" : "px-0"}
      `}
    >
      <Collapsible open={weatherVisible} width={113}>
        <WeatherWidget onOpenSettings={() => openSettings("weather")} />
      </Collapsible>

      <Collapsible open={weatherVisible && timeVisible} width={9}>
        <div className="flex h-full items-center justify-center">
          <div className="h-4 w-px bg-[color:var(--border)]" />
        </div>
      </Collapsible>

      <Collapsible open={timeVisible} width={timeWidgetWidth}>
        <TimeWidget onOpenSettings={() => openSettings("time")} onWidthChange={setTimeWidgetWidth} />
      </Collapsible>
    </div>
  </div>
)}

      <main className={`ntp-scroll relative z-10 min-h-0 flex-1 overflow-y-auto transition-[padding] duration-300 ${settings.sidebarPosition === "left" && (settings.sidebarPinned ?? true) ? "pl-[60px]" : ""}`}>
        <div className="mx-auto flex min-h-[calc(100vh-9rem)] w-full max-w-6xl flex-col items-center justify-center gap-7 px-4 pb-24 pt-24 sm:px-6">
            <SearchWidget show={settings.widgets.search !== false} />
        </div>
      </main>

      {motivationMounted && (
        <div className="pointer-events-none fixed inset-x-0 bottom-0 z-20 flex justify-center px-4 pb-16 sm:pb-6">
          <Fade open={motivationVisible} className="pointer-events-auto w-full max-w-xl ntp-shadow">
            <MotivationWidget />
          </Fade>
        </div>
      )}

      <button type="button" onClick={openFocusTime} title="Focus time" className={`glass fixed bottom-2 z-30 flex items-center gap-1.5 rounded-full px-3 py-2 text-[11px] transition hover:bg-[color:var(--surface-strong)] ${settings.sidebarPosition === "left" && (settings.sidebarPinned ?? true) ? "left-[68px]" : "left-3"}`}>
        <TimerIcon className="h-3.5 w-3.5" />
        <span className="hidden sm:inline">Focus time</span>
      </button>

      <CornerDock onOpenBackground={() => setPanel("background")} onOpenSettings={() => setSidebarApp("settings")} />

      <Onboarding />

      <BackgroundDialog open={panel === "background"} onClose={() => setPanel(null)} />
      {appView && (
        <Panel title={appView.title} onClose={() => setPanel(null)} width="max-w-2xl">
          {appView.render()}
        </Panel>
      )}
    </div>
  );
}
