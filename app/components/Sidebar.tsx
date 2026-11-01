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
  {
    id: 'calendar',
    label: 'Calendar',
    Icon: CalendarIcon,
    render: () => <CalendarWidget />,
  },
  {
    id: 'gmail',
    label: 'Gmail',
    Icon: MailIcon,
    render: () => <GmailWidget />,
  },
  {
    id: 'tasks',
    label: 'Tasks',
    Icon: TasksIcon,
    render: () => <Tasks />,
  },
  {
    id: 'notes',
    label: 'Notes',
    Icon: NotesIcon,
    render: () => <Notes />,
  },
  {
    id: 'history',
    label: 'Tabs & History',
    Icon: HistoryIcon,
    render: () => <HistoryWidget />,
  },
  {
    id: 'translator',
    label: 'Translator',
    Icon: TranslateIcon,
    render: () => <Translator />,
  },
  {
    id: 'lifeTimer',
    label: 'Life timer',
    Icon: HourglassIcon,
    render: () => <LifeTimerWidget />,
  },
  {
    id: 'topSites',
    label: 'Top sites',
    Icon: GlobeIcon,
    render: () => <TopSites />,
  },
  {
    id: 'account',
    label: 'Account',
    Icon: UserIcon,
    render: () => <Account />,
  },
  {
    id: 'settings',
    label: 'Settings',
    Icon: GearIcon,
    render: () => <Settings />,
  },
];

interface SidebarProps {
  /** Optional controlled open app id (used when other UI must drive the panel, e.g. CornerDock). */
  activeApp?: SidebarAppId | null;
  onActiveAppChange?: (id: SidebarAppId | null) => void;
}

export default function Sidebar({ activeApp: controlledApp, onActiveAppChange }: SidebarProps) {
  const dispatch = useDispatch<AppDispatch>();
  const settings = useSelector((state: RootState) => state.settings);
  const sidebarApps = settings.sidebarApps ?? {};
  const isPinned = settings.sidebarPinned ?? true;
  const position = settings.sidebarPosition ?? 'left';

  const [internalApp, setInternalApp] = useState<SidebarAppId | null>(null);
  const activeApp = controlledApp !== undefined ? controlledApp : internalApp;
  const setActiveApp = (next: SidebarAppId | null) => {
    if (onActiveAppChange) onActiveAppChange(next);
    else setInternalApp(next);
  };

  const [isHovered, setIsHovered] = useState(false);
  const [hoveredTooltip, setHoveredTooltip] = useState<{ label: string; y: number } | null>(null);
  const sidebarRef = useRef<HTMLDivElement>(null);

  // Close panel on Escape (click-outside is intentionally NOT wired up —
  // the panel stays open until the active rail icon, the close button or
  // Escape is used, matching the extension sidebar behavior).
  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && activeApp) {
        setActiveApp(null);
      }
    };
    window.addEventListener('keydown', handleKey);
    return () => window.removeEventListener('keydown', handleKey);
  }, [activeApp]);

  // Filter apps configured to show in sidebar
  const visibleApps = APPS.filter(
    (app) => app.id !== 'settings' && app.id !== 'account' && (sidebarApps[app.id] ?? true),
  );

  const activeAppDef = APPS.find((a) => a.id === activeApp);

  // Keep the last-open panel's content mounted while it slides closed, so the
  // card never recedes behind the rail empty.
  const [lastAppId, setLastAppId] = useState<SidebarAppId | null>(null);
  useEffect(() => {
    if (activeApp) setLastAppId(activeApp);
  }, [activeApp]);
  const displayedAppDef = APPS.find((a) => a.id === (activeApp ?? lastAppId));

  // True while the panel is open OR still animating closed. The rail keeps its
  // open-state look (opaque solid surface, flush seam, no re-rounded corners)
  // for the full close slide, so the card appears to vanish BEHIND an intact
  // aside instead of next to a morphing one. Only after the slide does the
  // rail settle back to the closed pill.
  const [panelAnimating, setPanelAnimating] = useState(false);
  useEffect(() => {
    if (activeAppDef) {
      setPanelAnimating(true);
      return;
    }
    const t = setTimeout(() => setPanelAnimating(false), 300);
    return () => clearTimeout(t);
  }, [activeAppDef]);

  const toggleApp = (id: SidebarAppId) => {
    setActiveApp(activeApp === id ? null : id);
  };

  const isLeft = position === 'left';

  // Whether sidebar rail is visually visible (pinned, hovered, or a panel is open)
  const isExpanded = isPinned || isHovered || !!activeApp;

  return (
    <>
      {/* Unpinned edge hover trigger */}
      {!isPinned && (
        <div
          onMouseEnter={() => setIsHovered(true)}
          className={`fixed top-0 bottom-0 z-40 w-3 cursor-pointer transition-colors duration-200 ${
            isLeft ? 'left-0 hover:bg-accent/20' : 'right-0 hover:bg-accent/20'
          }`}
          title="Hover to show sidebar"
        >
          <div
            className={`absolute top-1/2 -translate-y-1/2 h-12 w-1 rounded-full bg-white/20 transition-all group-hover:bg-accent ${
              isLeft ? 'left-1' : 'right-1'
            }`}
          />
        </div>
      )}

      <aside
  className={cn(
    'glass fixed top-2 bottom-2 z-50 flex w-[52px] flex-col items-center justify-between py-2 transition-[transform,border-radius] duration-300 ease-out',
    {
      'left-2': isLeft,
      'right-2': !isLeft,
    },
    // default: all four corners rounded
    !panelAnimating && 'rounded-2xl',
    // panel open + left: outer corners rounded, seam flush with the panel
    // (no border on that side) so rail + panel read as one rounded box
    panelAnimating && isLeft && 'rounded-l-2xl rounded-r-none border-r-0',
    // panel open + right: only the outer (right) corners rounded
    panelAnimating && !isLeft && 'rounded-r-2xl rounded-l-none border-l-0',
  )}
  aria-label="Apps sidebar"
>
        {/* Solid surface layer — glass while closed, fades to a solid color
            while a panel is open (toggled by opacity so it's animatable).
            rounded-[inherit] keeps it inside the rail's rounded silhouette. */}
        <div
          aria-hidden="true"
          className={cn(
            'absolute inset-0 rounded-[inherit] -z-10 bg-[color:var(--sidebar-solid)] transition-opacity duration-300 ease-[cubic-bezier(0.22,1,0.36,1)]',
            {
              'opacity-100': panelAnimating,
              'opacity-0': !panelAnimating,
            }
          )}
        />
        {/* Middle: Apps List — 44px slots, icon tiles */}
        <nav className="flex flex-1 flex-col items-center gap-2 py-2 overflow-y-auto overflow-x-hidden ntp-scroll w-full px-1.5">
          {visibleApps.map((app) => {
            const isActive = activeApp === app.id;
            const Icon = app.Icon;
            return (
              <button
                key={app.id}
                type="button"
                onClick={() => toggleApp(app.id)}
                onMouseEnter={(e) => {
                  const rect = e.currentTarget.getBoundingClientRect();
                  setHoveredTooltip({ label: app.label, y: rect.top + rect.height / 2 });
                }}
                onMouseLeave={() => setHoveredTooltip(null)}
                className={`relative flex h-9 w-9 shrink-0 items-center justify-center rounded-full transition-all duration-150 ${
                  isActive
                    ? 'bg-accent text-white shadow-[0_0_14px_rgba(139,92,246,0.4)]'
                    : 'ui-muted hover:text-[color:var(--text)] hover:bg-[color:var(--surface-strong)] active:scale-95'
                }`}
                aria-label={app.label}
                aria-expanded={isActive}
              >
                <Icon className="h-5 w-5" />
              </button>
            );
          })}
        </nav>

        {/* Bottom: divider, Settings, Account — pinned tile stack */}
        <div className="flex flex-col items-center gap-2 pt-2 w-full px-1.5">
          <div className="h-px w-7 bg-[color:var(--border)] mb-0.5 shrink-0" />

          {/* Settings */}
          <button
            type="button"
            onClick={() => toggleApp('settings')}
            onMouseEnter={(e) => {
              const rect = e.currentTarget.getBoundingClientRect();
              setHoveredTooltip({ label: 'Settings', y: rect.top + rect.height / 2 });
            }}
            onMouseLeave={() => setHoveredTooltip(null)}
            className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-full transition-all duration-150 ${
              activeApp === 'settings'
                ? 'bg-accent text-white shadow-[0_0_14px_rgba(139,92,246,0.4)]'
                : 'ui-muted hover:text-[color:var(--text)] hover:bg-[color:var(--surface-strong)] active:scale-95'
            }`}
            aria-label="Settings"
          >
            <GearIcon className="h-5 w-5" />
          </button>

          {/* Account */}
          <button
            type="button"
            onClick={() => toggleApp('account')}
            onMouseEnter={(e) => {
              const rect = e.currentTarget.getBoundingClientRect();
              setHoveredTooltip({ label: 'Account & sync', y: rect.top + rect.height / 2 });
            }}
            onMouseLeave={() => setHoveredTooltip(null)}
            className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-full overflow-hidden transition-all duration-150 ${
              activeApp === 'account'
                ? 'bg-accent text-white shadow-[0_0_14px_rgba(139,92,246,0.4)]'
                : 'ui-muted hover:text-[color:var(--text)] hover:bg-[color:var(--surface-strong)] active:scale-95'
            }`}
            aria-label="Account"
          >
            <UserIcon className="h-5 w-5" />
          </button>
        </div>
      </aside>

      {/* Floating Tooltip */}
      {hoveredTooltip && isExpanded && (
        <div
          className={`pointer-events-none fixed z-50 rounded-lg bg-[color:var(--panel)] px-2.5 py-1 text-xs font-medium text-[color:var(--text)] shadow-xl  whitespace-nowrap transition-opacity duration-150 ${
            isLeft ? 'left-[68px]' : 'right-[68px]'
          }`}
          style={{ top: hoveredTooltip.y, transform: 'translateY(-50%)' }}
        >
          {hoveredTooltip.label}
        </div>
      )}

      {/* Panel that slides BEHIND the rail: the outer wrapper is a
          viewport-anchored mask (overflow-hidden) whose seam edge sits under
          the rail's edge, so the panel physically slides in/out and reads as
          hidden behind the aside instead of being trimmed by a clip-path cut
          line. Click-outside deliberately does NOT close it — same as the
          extension panel. Close via the active rail icon, ×, or Escape. */}
      <div
        aria-hidden={!activeAppDef}
        className={`fixed top-2 bottom-2 z-40 w-[360px] max-w-[calc(100vw-68px)] overflow-hidden pointer-events-none ${
          isLeft ? 'left-[59px]' : 'right-[59px]'
        }`}
      >
      <section
        className={`absolute inset-0 glass flex flex-col transition-transform duration-300 ease-[cubic-bezier(0.22,1,0.36,1)] ${
          isLeft
            ? 'rounded-l-none border-l-0 rounded-r-2xl'
            : 'rounded-r-none border-r-0 rounded-l-2xl'
        } ${
          activeAppDef
            ? 'pointer-events-auto translate-x-0'
            : `pointer-events-auto ${
                isLeft ? '-translate-x-[calc(100%+40px)]' : 'translate-x-[calc(100%+40px)]'
              }`
        }`}
        role={activeAppDef ? 'dialog' : undefined}
        aria-label={displayedAppDef?.label}
      >
        {/* Solid surface layer (element stays mounted so the fade can animate). */}
        <div
          aria-hidden="true"
          className={`absolute inset-0 rounded-[inherit] -z-10 bg-[color:var(--sidebar-solid)] transition-opacity duration-300 ease-[cubic-bezier(0.22,1,0.36,1)] ${
            panelAnimating ? 'opacity-100' : 'opacity-0'
          }`}
        />

        {/* Content — kept mounted during the close slide via lastAppId. */}
        <div className="flex min-h-0 flex-1 flex-col">
        {displayedAppDef && (
          <>
            {/* Panel Header */}
            <header className="flex items-center justify-between  px-4 py-3 shrink-0">
              <div className="flex items-center gap-2.5 min-w-0">
                <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-xl bg-violet-600/20 text-accent">
                  <displayedAppDef.Icon className="h-4 w-4" />
                </span>
                <h2 className="text-sm font-semibold truncate leading-tight">{displayedAppDef.label}</h2>
              </div>

              <div className="flex items-center gap-1">
                {displayedAppDef?.id !== 'settings' && (
                  <button
                    type="button"
                    onClick={() => setActiveApp('settings')}
                    title="Open settings"
                    className="flex h-7 w-7 items-center justify-center rounded-lg ui-muted hover:text-[color:var(--text)] hover:bg-[color:var(--surface-strong)] transition"
                  >
                    <GearIcon className="h-3.5 w-3.5" />
                  </button>
                )}
                <button
                  type="button"
                  onClick={() => dispatch(setSidebarPinned(!isPinned))}
                  title={isPinned ? 'Unpin sidebar (auto-collapse)' : 'Pin sidebar (always visible)'}
                  className={`flex h-7 w-7 items-center justify-center rounded-lg transition ${
                    isPinned
                      ? 'text-accent hover:bg-accent/15'
                      : 'ui-muted hover:text-[color:var(--text)] hover:bg-[color:var(--surface-strong)]'
                  }`}
                  aria-label={isPinned ? 'Unpin sidebar' : 'Pin sidebar'}
                >
                  {isPinned ? <PinIcon className="h-4 w-4" /> : <PinOffIcon className="h-4 w-4" />}
                </button>
                <button
                  type="button"
                  onClick={() => setActiveApp(null)}
                  title="Close (Esc)"
                  className="flex h-7 w-7 items-center justify-center rounded-lg ui-muted hover:text-[color:var(--text)] hover:bg-[color:var(--surface-strong)] transition"
                >
                  <CloseIcon className="h-4 w-4" />
                </button>
              </div>
            </header>

            {/* Panel Content */}
            <div className="flex-1 overflow-y-auto p-4 ntp-scroll min-h-0">
              {displayedAppDef.render()}
            </div>
          </>
        )}
        </div>
      </section>
      </div>
    </>
  );
}
