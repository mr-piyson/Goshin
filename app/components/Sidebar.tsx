import React, { useEffect, useRef, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import type { RootState, AppDispatch } from '@/store';
import { setSidebarPinned } from '@/store/settingsSlice';
import CalendarWidget from './CalendarWidget';
import GmailWidget from './GmailWidget';
import Tasks from './Tasks';
import Notes from './Notes';
import HistoryWidget from './HistoryWidget';
import Translator from './Translator';
import LifeTimerWidget from './widgets/LifeTimerWidget';
import TopSites from './TopSites';
import Account from './Account';
import Settings from './Settings';
import {
  CalendarIcon,
  MailIcon,
  TasksIcon,
  NotesIcon,
  HistoryIcon,
  TranslateIcon,
  HourglassIcon,
  GlobeIcon,
  GearIcon,
  UserIcon,
  PinIcon,
  PinOffIcon,
  CloseIcon,
} from './Icons';
import { cn } from '@/lib/utils';

export type SidebarAppId =
  | 'calendar'
  | 'gmail'
  | 'tasks'
  | 'notes'
  | 'history'
  | 'translator'
  | 'lifeTimer'
  | 'topSites'
  | 'account'
  | 'settings';

interface AppDefinition {
  id: SidebarAppId;
  label: string;
  Icon: React.ComponentType<{ className?: string }>;
  render: () => React.ReactNode;
}

const APPS: AppDefinition[] = [
  { id: 'calendar', label: 'Calendar', Icon: CalendarIcon, render: () => <CalendarWidget /> },
  { id: 'gmail', label: 'Gmail', Icon: MailIcon, render: () => <GmailWidget /> },
  { id: 'tasks', label: 'Tasks', Icon: TasksIcon, render: () => <Tasks /> },
  { id: 'notes', label: 'Notes', Icon: NotesIcon, render: () => <Notes /> },
  { id: 'history', label: 'Tabs & History', Icon: HistoryIcon, render: () => <HistoryWidget /> },
  { id: 'translator', label: 'Translator', Icon: TranslateIcon, render: () => <Translator /> },
  { id: 'lifeTimer', label: 'Life timer', Icon: HourglassIcon, render: () => <LifeTimerWidget /> },
  { id: 'topSites', label: 'Top sites', Icon: GlobeIcon, render: () => <TopSites /> },
  { id: 'account', label: 'Account', Icon: UserIcon, render: () => <Account /> },
  { id: 'settings', label: 'Settings', Icon: GearIcon, render: () => <Settings /> },
];

// Apps that live in the bottom section of the rail instead of the main list.
const BOTTOM_APP_IDS: SidebarAppId[] = ['settings', 'account'];

interface SidebarProps {
  /** Optional controlled open app id (used when other UI must drive the panel, e.g. CornerDock). */
  activeApp?: SidebarAppId | null;
  onActiveAppChange?: (id: SidebarAppId | null) => void;
  /** Requested Settings tab (e.g. "time"/"weather" from a widget click). */
  settingsTab?: { tab: string; requestId: number } | null;
  /** Suppress rendering until persisted settings are loaded, so the sidebar's
   *  first paint already has the correct pinned/unpinned position and never
   *  flashes or animates out on reload. */
  ready?: boolean;
}

interface RailButtonProps {
  app: AppDefinition;
  isActive: boolean;
  onToggle: (id: SidebarAppId) => void;
  onHover: (tip: { label: string; y: number } | null) => void;
}

function RailButton({ app, isActive, onToggle, onHover }: RailButtonProps) {
  const { Icon } = app;
  return (
    <button
      type="button"
      onClick={() => onToggle(app.id)}
      onMouseEnter={(e) => {
        const rect = e.currentTarget.getBoundingClientRect();
        onHover({ label: app.label, y: rect.top + rect.height / 2 });
      }}
      onMouseLeave={() => onHover(null)}
      aria-label={app.label}
      aria-expanded={isActive}
      className={cn(
        'flex h-9 w-9 shrink-0 items-center justify-center rounded-full transition-all duration-150',
        isActive
          ? 'bg-accent text-white shadow-[0_0_14px_rgba(139,92,246,0.4)]'
          : 'ui-muted hover:bg-[color:var(--surface-strong)] hover:text-[color:var(--text)] active:scale-95',
      )}
    >
      <Icon className="h-5 w-5" />
    </button>
  );
}

export default function Sidebar({ activeApp: controlledApp, onActiveAppChange, settingsTab, ready = true }: SidebarProps) {
  const dispatch = useDispatch<AppDispatch>();
  const settings = useSelector((state: RootState) => state.settings);
  const sidebarApps = settings.sidebarApps ?? {};
  const isPinned = settings.sidebarPinned ?? true;
  const isLeft = (settings.sidebarPosition ?? 'left') === 'left';

  // Controlled / uncontrolled open app
  const [internalApp, setInternalApp] = useState<SidebarAppId | null>(null);
  const activeApp = controlledApp !== undefined ? controlledApp : internalApp;
  const setActiveApp = (next: SidebarAppId | null) => {
    if (onActiveAppChange) onActiveAppChange(next);
    else setInternalApp(next);
  };
  const toggleApp = (id: SidebarAppId) => setActiveApp(activeApp === id ? null : id);

  const isOpen = activeApp !== null;

  // Keep the last app rendered while the panel collapses, so it never empties mid-close.
  const lastApp = useRef<SidebarAppId | null>(null);
  if (activeApp) lastApp.current = activeApp;
  const shownApp = APPS.find((a) => a.id === (activeApp ?? lastApp.current));

  const [isHovered, setIsHovered] = useState(false);
  const [tooltip, setTooltip] = useState<{ label: string; y: number } | null>(null);

  // Delay hiding after the pointer leaves, so small slips off the sidebar edge
  // don't immediately tuck it away. Re-entering cancels the pending hide.
  const hideTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const cancelHide = () => {
    if (hideTimerRef.current) {
      clearTimeout(hideTimerRef.current);
      hideTimerRef.current = null;
    }
  };
  const scheduleHide = () => {
    cancelHide();
    hideTimerRef.current = setTimeout(() => {
      hideTimerRef.current = null;
      setIsHovered(false);
    }, 800);
  };
  useEffect(() => cancelHide, []);

  // Ref for click-outside detection: everything rendered inside this box (rail,
  // open panel, pin/close buttons) counts as "inside" and won't force-close.
  const asideRef = useRef<HTMLElement | null>(null);

  // Close on Escape, and force close when clicking anywhere outside the sidebar.
  useEffect(() => {
    if (!isOpen) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setActiveApp(null);
    };
    const onPointerDown = (e: MouseEvent) => {
      // Pinned sidebar is always visible and click-outside shouldn't drop its content;
      // force close only applies to the unpinned auto-hide behavior.
      if (isPinned) return;
      const target = e.target as Node;
      if (asideRef.current && asideRef.current.contains(target)) return;
      // Force close: drop the open panel and any pending hover state.
      cancelHide();
      setActiveApp(null);
      setIsHovered(false);
    };
    window.addEventListener('keydown', onKey);
    window.addEventListener('mousedown', onPointerDown);
    return () => {
      window.removeEventListener('keydown', onKey);
      window.removeEventListener('mousedown', onPointerDown);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isOpen, isPinned]);

  // Unpinned sidebar only: when the cursor leaves the browser window entirely,
  // the aside's mouseleave can be skipped (fast exit, gone via keyboard, etc.)
  // and the sidebar stays revealed. Listen for the window exit instead.
  useEffect(() => {
    if (isPinned) return;
    const onMouseOut = (e: MouseEvent) => {
      // relatedTarget is null only when the pointer left the window itself.
      if (e.relatedTarget === null && !isOpen) scheduleHide();
    };
    window.addEventListener('mouseout', onMouseOut);
    return () => window.removeEventListener('mouseout', onMouseOut);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isPinned, isOpen]);

  const mainApps = APPS.filter(
    (app) => !BOTTOM_APP_IDS.includes(app.id) && (sidebarApps[app.id] ?? true),
  );
  const bottomApps = APPS.filter((app) => BOTTOM_APP_IDS.includes(app.id));

  // Wait for persisted settings before first paint: without this, the default
  // `sidebarPinned: true` renders the sidebar on-screen, then hydration flips it
  // to unpinned and the CSS transition kicks in — showing the visible sidebar
  // and its hide animation on every reload. Skipping the first paint entirely
  // means it mounts already in the off-screen position with nothing to animate.
  if (!ready) return null;

  // When unpinned, the whole sidebar is tucked off-screen until hovered or a panel is open.
  const isRevealed = isPinned || isHovered || isOpen;

  return (
    <>
      {/* Unpinned edge hover trigger */}
      {!isPinned && (
        <div
          onMouseEnter={() => {
            cancelHide();
            setIsHovered(true);
          }}
          title="Hover to show sidebar"
          className={cn(
            'fixed bottom-0 top-0 z-40 w-3 cursor-pointer transition-colors duration-200 hover:bg-accent/20',
            isLeft ? 'left-0' : 'right-0',
          )}
        >
          <div
            className={cn(
              'absolute top-1/2 h-12 w-1 -translate-y-1/2 rounded-full bg-white/20',
              isLeft ? 'left-1' : 'right-1',
            )}
          />
        </div>
      )}

      {/*
        One rounded glass box holds the rail AND the panel.
        - Closed: the panel is 0px wide, so you just see the rail as a rounded pill.
        - Open:   the panel grows next to the rail inside the same rounded box,
                  so they read as one shape. No corner/seam juggling needed.
        - Close:  the panel width shrinks and its content is anchored to the rail edge,
                  so it looks like it slides behind the rail.
      */}
      <aside
        ref={asideRef}
        aria-label="Apps sidebar"
        onMouseEnter={cancelHide}
        onMouseLeave={scheduleHide}
        className={cn(
          'glass  fixed bottom-2 top-2 z-50 flex overflow-hidden rounded-2xl transition-all duration-300 ease-out',
          isLeft ? 'left-2 flex-row' : 'right-2 flex-row-reverse',
          !isRevealed && (isLeft ? '-translate-x-[calc(100%+0.5rem)]' : 'translate-x-[calc(100%+0.5rem)]'),
          isOpen && ('bg-card')
        )}
      >
        {/* Rail */}
        <div className="flex w-[52px] shrink-0 flex-col items-center justify-between py-2">
          <nav className="ntp-scroll flex w-full flex-1 flex-col items-center gap-2 overflow-y-auto overflow-x-hidden px-1.5 py-2">
            {mainApps.map((app) => (
              <RailButton
                key={app.id}
                app={app}
                isActive={activeApp === app.id}
                onToggle={toggleApp}
                onHover={setTooltip}
              />
            ))}
          </nav>

          <div className="flex w-full flex-col items-center gap-2 px-1.5 pt-2">
            <div className="mb-0.5 h-px w-7 shrink-0 bg-[color:var(--border)]" />
            {bottomApps.map((app) => (
              <RailButton
                key={app.id}
                app={app}
                isActive={activeApp === app.id}
                onToggle={toggleApp}
                onHover={setTooltip}
              />
            ))}
          </div>
        </div>

        {/* Panel: width animates 0 -> 360. Visibility flips at the end of the close
            so hidden content can't be tabbed into. */}
        <section
          role={isOpen ? 'dialog' : undefined}
          aria-label={shownApp?.label}
          aria-hidden={!isOpen}
          className={cn(
            'flex min-w-0 overflow-hidden transition-[width,visibility] duration-300 ease-out',
            isLeft ? 'flex-row justify-end border-l' : 'flex-row-reverse justify-end border-r',
            'border-[color:var(--border)]',
            isOpen ? 'visible w-[min(360px,calc(100vw-4.5rem))]' : 'invisible w-0 border-transparent',
          )}
        >
          {/* Fixed-width inner box: content never reflows while the width animates */}
          <div className="flex bg-background h-full w-[min(360px,calc(100vw-4.5rem))] shrink-0 flex-col">
            {shownApp && (
              <>
                <header className="flex text-muted bg-header shrink-0 items-center justify-between px-2 py-1">
                  <div className="flex min-w-0 items-center gap-2.5">
                    <span className="flex h-4 w-4 shrink-0 items-center justify-center rounded-xl text-muted">
                      <shownApp.Icon className="h-full w-full" />
                    </span>
                    <h2 className="truncate text-sm font-semibold leading-tight">{shownApp.label}</h2>
                  </div>

                  <div className="flex items-center gap-1">
                    {shownApp.id !== 'settings' && (
                      <button
                        type="button"
                        onClick={() => setActiveApp('settings')}
                        title="Open settings"
                        className="ui-muted flex h-7 w-7 items-center justify-center rounded-lg transition hover:bg-[color:var(--surface-strong)] hover:text-[color:var(--text)]"
                      >
                        <GearIcon className="h-3.5 w-3.5" />
                      </button>
                    )}
                    <button
                      type="button"
                      onClick={() => dispatch(setSidebarPinned(!isPinned))}
                      title={isPinned ? 'Unpin sidebar (auto-collapse)' : 'Pin sidebar (always visible)'}
                      aria-label={isPinned ? 'Unpin sidebar' : 'Pin sidebar'}
                      className={cn(
                        'flex h-7 w-7 items-center justify-center rounded-lg transition',
                        isPinned
                          ? 'text-accent hover:bg-accent/15'
                          : 'ui-muted hover:bg-[color:var(--surface-strong)] hover:text-[color:var(--text)]',
                      )}
                    >
                      {isPinned ? <PinIcon className="h-4 w-4" /> : <PinOffIcon className="h-4 w-4" />}
                    </button>
                    <button
                      type="button"
                      onClick={() => setActiveApp(null)}
                      title="Close (Esc)"
                      className="ui-muted flex h-7 w-7 items-center justify-center rounded-lg transition hover:bg-[color:var(--surface-strong)] hover:text-[color:var(--text)]"
                    >
                      <CloseIcon className="h-4 w-4" />
                    </button>
                  </div>
                </header>

                <div className="ntp-scroll min-h-0 flex-1 overflow-y-auto p-4">
                  {shownApp.id === "settings" ? (
                    <Settings initialTab={settingsTab?.tab} tabRequest={settingsTab?.requestId} />
                  ) : (
                    shownApp.render()
                  )}
                </div>
              </>
            )}
          </div>
        </section>
      </aside>

      {/* Floating tooltip */}
      {tooltip && isRevealed && (
        <div
          className={cn(
            'pointer-events-none fixed z-[60] whitespace-nowrap rounded-lg bg-[color:var(--panel)] px-2.5 py-1 text-xs font-medium text-[color:var(--text)] shadow-xl',
            isLeft ? 'left-[68px]' : 'right-[68px]',
          )}
          style={{ top: tooltip.y, transform: 'translateY(-50%)' }}
        >
          {tooltip.label}
        </div>
      )}
    </>
  );
}