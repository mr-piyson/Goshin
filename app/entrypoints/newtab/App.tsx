import React, { useCallback, useEffect, useRef, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { browser } from 'wxt/browser';
import { setQuery } from '@/store/searchSlice';
import { setAll as setSettings } from '@/store/settingsSlice';
import { setOrder } from '@/store/widgetOrderSlice';
import { setAll as setLaunchpad } from '@/store/launchpadSlice';
import { setAll as setBackground } from '@/store/backgroundSlice';
import { loadShortcuts } from '@/lib/storage';
import { resolveBackground } from '@/lib/backgrounds';
import Launchpad from '@/components/Launchpad';
import WeatherWidget from '@/components/WeatherWidget';
import Notes from '@/components/Notes';
import Tasks from '@/components/Tasks';
import BackgroundGallery from '@/components/BackgroundGallery';
import Settings from '@/components/Settings';
import Translator from '@/components/Translator';
import TopSites from '@/components/TopSites';
import HistoryWidget from '@/components/HistoryWidget';
import CalendarWidget from '@/components/CalendarWidget';
import GmailWidget from '@/components/GmailWidget';
import Account from '@/components/Account';
import TicTacToe from '@/components/TicTacToe';
import Onboarding from '@/components/Onboarding';
import TimeWidget from '@/components/TimeWidget';
import MotivationWidget from '@/components/MotivationWidget';
import LifeTimerWidget from '@/components/LifeTimerWidget';
import Panel from '@/components/Panel';
import MorePanel, { type AppItem } from '@/components/MorePanel';
import CornerDock from '@/components/CornerDock';
import Collapsible, { ResponsiveCollapsible, usePresence } from '@/components/Collapsible';
import { SearchIcon, TimerIcon } from '@/components/Icons';
import type { RootState } from '@/store';

const ENGINES: Record<string, string> = {
  google: 'https://www.google.com/search?q=',
  bing: 'https://www.bing.com/search?q=',
  duckduckgo: 'https://duckduckgo.com/?q=',
};

interface AppView {
  title: string;
  render: () => React.ReactNode;
}

const APP_VIEWS: Record<string, AppView> = {
  notes: { title: 'Notes', render: () => <Notes /> },
  tasks: { title: 'Tasks', render: () => <Tasks /> },
  calendar: { title: 'Calendar', render: () => <CalendarWidget /> },
  gmail: { title: 'Gmail', render: () => <GmailWidget /> },
  history: { title: 'Recent history', render: () => <HistoryWidget /> },
  topSites: { title: 'Top sites', render: () => <TopSites /> },
  translator: { title: 'Translator', render: () => <Translator /> },
  ticTacToe: { title: 'Tic-tac-toe', render: () => <TicTacToe /> },
  lifeTimer: { title: 'Life timer', render: () => <LifeTimerWidget /> },
  account: { title: 'Account & sync', render: () => <Account /> },
};

const MORE_APPS: AppItem[] = [
  { id: 'notes', label: 'Notes', hint: 'Quick notes stored on this device' },
  { id: 'tasks', label: 'Tasks', hint: 'A small to-do list' },
  { id: 'calendar', label: 'Calendar', hint: 'Your Google Calendar' },
  { id: 'gmail', label: 'Gmail', hint: 'Your inbox' },
  { id: 'history', label: 'History', hint: 'Recently visited pages' },
  { id: 'topSites', label: 'Top sites', hint: 'Your most visited sites' },
  { id: 'translator', label: 'Translator', hint: 'Translate text to English' },
  { id: 'ticTacToe', label: 'Tic-tac-toe', hint: 'Take a short break' },
  { id: 'lifeTimer', label: 'Life timer', hint: 'Years lived and years left' },
];

const HERO_IDS = new Set(['time', 'weather', 'motivation', 'search', 'launchpad']);
const PANEL_WIDTH: Record<string, string> = {
  settings: 'max-w-md',
  background: 'max-w-md',
  more: 'max-w-sm',
};

type PanelId =
  | 'settings'
  | 'background'
  | 'more'
  | 'account'
  | 'notes'
  | 'tasks'
  | 'calendar'
  | 'gmail'
  | 'history'
  | 'topSites'
  | 'translator'
  | 'ticTacToe'
  | 'lifeTimer';

function usePrefersDark() {
  const [dark, setDark] = useState(() => window.matchMedia('(prefers-color-scheme: dark)').matches);
  useEffect(() => {
    const query = window.matchMedia('(prefers-color-scheme: dark)');
    const onChange = () => setDark(query.matches);
    query.addEventListener('change', onChange);
    return () => query.removeEventListener('change', onChange);
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
  const theme = settings.theme === 'system' ? (prefersDark ? 'dark' : 'light') : settings.theme;

  const [panel, setPanel] = useState<PanelId | null>(null);
  const [hydrated, setHydrated] = useState(false);
  const searchRef = useRef<HTMLInputElement>(null);

  // Load persisted state once, then only start persisting after hydration so the
  // default state never overwrites what the user already saved.
  useEffect(() => {
    let cancelled = false;
    browser.storage.local
      .get(['settings', 'widgetOrder', 'shortcuts', 'background'])
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
      const typing =
        !!target && (/^(INPUT|TEXTAREA|SELECT)$/.test(target.tagName) || target.isContentEditable);
      if (event.key === 'Escape') {
        setPanel(null);
        return;
      }
      const isSearchShortcut =
        !typing && (event.key === '/' || ((event.metaKey || event.ctrlKey) && event.key.toLowerCase() === 'k'));
      if (isSearchShortcut && settings.widgets.search !== false) {
        event.preventDefault();
        searchRef.current?.focus();
      }
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [settings.widgets.search]);

  const openFocusTime = useCallback(() => {
    window.location.href = browser.runtime.getURL('/focus-time.html');
  }, []);

  const openSidePanel = useCallback(async () => {
    try {
      const sidePanel = (browser as any).sidePanel;
      if (!sidePanel?.open) throw new Error('Side panel is not supported in this browser');
      const win = await browser.windows.getCurrent();
      await sidePanel.open({ windowId: win.id });
      setPanel(null);
    } catch (error) {
      console.warn('[newtab] could not open side panel', error);
    }
  }, []);

  const openFromMore = useCallback(
    (id: string) => {
      if (id === 'focus-time') openFocusTime();
      else if (id === 'side-panel') void openSidePanel();
      else setPanel(id as PanelId);
    },
    [openFocusTime, openSidePanel],
  );

  const submitSearch = (event: React.FormEvent) => {
    event.preventDefault();
    const value = query.trim();
    if (!value) return;
    const base = ENGINES[settings.searchEngine] ?? ENGINES.google;
    window.location.href = `${base}${encodeURIComponent(value)}`;
  };

  // Only widgets that live in the dashboard (the hero is rendered separately).
  const dockOrder = [...order, ...Object.keys(APP_VIEWS)].filter(
    (id, index, all) => all.indexOf(id) === index,
  );
  const dock = dockOrder.filter(
    (id) => !HERO_IDS.has(id) && settings.widgets[id] !== false && APP_VIEWS[id] && id !== 'account',
  );

  const look = resolveBackground(background.current, background.custom);
  const appView = panel && APP_VIEWS[panel] ? APP_VIEWS[panel] : null;
  const weatherVisible = settings.widgets.weather !== false;
  const timeVisible = settings.widgets.time !== false;
  const motivationVisible = settings.widgets.motivation !== false;
  const cornerMounted = usePresence(weatherVisible || timeVisible, 320);
  const motivationMounted = usePresence(motivationVisible, 320);

  return (
    <div className={`ntp-root theme-${theme} flex h-screen w-screen flex-col overflow-hidden`}>
      {look.kind === 'video' ? (
        <video className="ntp-bg" src={look.url} muted loop autoPlay playsInline aria-hidden="true" />
      ) : (
        <div className="ntp-bg" style={{ background: look.css }} aria-hidden="true" />
      )}
      <div className="ntp-scrim" aria-hidden="true" />

      {cornerMounted && (
        <div className="m-2 fixed right-0 top-0 z-30">
          <div
            className={`glass flex h-[72px] items-stretch overflow-hidden rounded-xl transition-[padding] duration-300 ${
              weatherVisible || timeVisible ? 'px-1' : 'px-0'
            }`}
          >
            <Collapsible open={weatherVisible} width={113}>
              <WeatherWidget />
            </Collapsible>
            <Collapsible open={weatherVisible && timeVisible} width={9}>
              <div className="flex h-full items-center justify-center">
                <div className="h-4 w-px bg-[color:var(--border)]" />
              </div>
            </Collapsible>
            <Collapsible open={timeVisible} width={114}>
              <TimeWidget />
            </Collapsible>
          </div>
        </div>
      )}

      <main className="ntp-scroll relative z-10 min-h-0 flex-1 overflow-y-auto">
        <div className="mx-auto flex min-h-[calc(100vh-9rem)] w-full max-w-6xl flex-col items-center justify-center gap-7 px-4 pb-24 pt-24 sm:px-6">
          {settings.widgets.search !== false && (
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
          )}

          {settings.widgets.launchpad !== false && (
            <section className="w-full max-w-4xl">
              <Launchpad />
            </section>
          )}
        </div>

        {dock.length > 0 && (
          <section className="mx-auto w-full max-w-6xl px-4 pb-48 sm:px-6">
            <div className="grid grid-cols-1 gap-3 md:grid-cols-2 xl:grid-cols-3">
              {dock.map((id) => (
                <div key={id} className="glass ntp-scroll max-h-[360px] min-w-0 overflow-y-auto rounded-2xl p-4">
                  {APP_VIEWS[id]!.render()}
                </div>
              ))}
            </div>
          </section>
        )}
      </main>

      {motivationMounted && (
        <div className="pointer-events-none fixed inset-x-0 bottom-0 z-20 flex justify-center px-4 pb-16 sm:pb-6">
          <ResponsiveCollapsible
            open={motivationVisible}
            className="pointer-events-auto w-full max-w-xl ntp-shadow"
          >
            <MotivationWidget />
          </ResponsiveCollapsible>
        </div>
      )}

      <button
        type="button"
        onClick={openFocusTime}
        title="Focus time"
        className="glass fixed bottom-2 left-2 z-30 flex items-center gap-1.5 rounded-full px-3 py-2 text-[11px] transition hover:bg-[color:var(--surface-strong)]"
      >
        <TimerIcon className="h-3.5 w-3.5" />
        <span className="hidden sm:inline">Focus time</span>
      </button>

      <CornerDock
        onOpenBackground={() => setPanel('background')}
        onOpenMore={() => setPanel('more')}
        onOpenSettings={() => setPanel('settings')}
      />

      <Onboarding />

      {panel === 'settings' && (
        <Panel title="Settings" subtitle="Everything on one page" onClose={() => setPanel(null)} width={PANEL_WIDTH.settings}>
          <Settings />
        </Panel>
      )}
      {panel === 'background' && (
        <Panel
          title="Backgrounds"
          subtitle="Pick a look for your new tab"
          onClose={() => setPanel(null)}
          width={PANEL_WIDTH.background}
        >
          <BackgroundGallery />
        </Panel>
      )}
      {panel === 'more' && (
        <Panel title="More" subtitle="Apps and quick actions" onClose={() => setPanel(null)} width={PANEL_WIDTH.more}>
          <MorePanel apps={MORE_APPS} onOpen={openFromMore} />
        </Panel>
      )}
      {appView && (
        <Panel title={appView.title} onClose={() => setPanel(null)} width="max-w-2xl">
          {appView.render()}
        </Panel>
      )}
    </div>
  );
}
