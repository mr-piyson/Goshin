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
import TicTacToe from './TicTacToe';
import LifeTimerWidget from './LifeTimerWidget';
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
  GameIcon,
  HourglassIcon,
  GlobeIcon,
  GearIcon,
  UserIcon,
  PinIcon,
  PinOffIcon,
  CloseIcon,
  ChevronLeftIcon,
  ChevronRightIcon,
} from './Icons';

export type SidebarAppId =
  | 'calendar'
  | 'gmail'
  | 'tasks'
  | 'notes'
  | 'history'
  | 'translator'
  | 'ticTacToe'
  | 'lifeTimer'
  | 'topSites'
  | 'account'
  | 'settings';

interface AppDefinition {
  id: SidebarAppId;
  label: string;
  subtitle: string;
  Icon: React.ComponentType<{ className?: string }>;
  render: () => React.ReactNode;
}

const APPS: AppDefinition[] = [
  {
    id: 'calendar',
    label: 'Calendar',
    subtitle: 'Google Calendar & meetings',
    Icon: CalendarIcon,
    render: () => <CalendarWidget />,
  },
  {
    id: 'gmail',
    label: 'Gmail',
    subtitle: 'Inbox & unread mail',
    Icon: MailIcon,
    render: () => <GmailWidget />,
  },
  {
    id: 'tasks',
    label: 'Tasks',
    subtitle: 'To-do checklist',
    Icon: TasksIcon,
    render: () => <Tasks />,
  },
  {
    id: 'notes',
    label: 'Notes',
    subtitle: 'Quick thoughts & scratchpad',
    Icon: NotesIcon,
    render: () => <Notes />,
  },
  {
    id: 'history',
    label: 'Tabs & History',
    subtitle: 'Recent tabs & history',
    Icon: HistoryIcon,
    render: () => <HistoryWidget />,
  },
  {
    id: 'translator',
    label: 'Translator',
    subtitle: 'Quick text translation',
    Icon: TranslateIcon,
    render: () => <Translator />,
  },
  {
    id: 'ticTacToe',
    label: 'Tic-tac-toe',
    subtitle: 'Short mental break',
    Icon: GameIcon,
    render: () => <TicTacToe />,
  },
  {
    id: 'lifeTimer',
    label: 'Life timer',
    subtitle: 'Years lived & years left',
    Icon: HourglassIcon,
    render: () => <LifeTimerWidget />,
  },
  {
    id: 'topSites',
    label: 'Top sites',
    subtitle: 'Frequently visited shortcuts',
    Icon: GlobeIcon,
    render: () => <TopSites />,
  },
  {
    id: 'account',
    label: 'Account',
    subtitle: 'Profile & sync status',
    Icon: UserIcon,
    render: () => <Account />,
  },
  {
    id: 'settings',
    label: 'Settings',
    subtitle: 'Sidebar apps & preferences',
    Icon: GearIcon,
    render: () => <Settings />,
  },
];

interface SidebarProps {
  onOpenSettingsModal?: () => void;
}

export default function Sidebar({ onOpenSettingsModal }: SidebarProps) {
  const dispatch = useDispatch<AppDispatch>();
  const settings = useSelector((state: RootState) => state.settings);
  const sidebarApps = settings.sidebarApps ?? {};
  const isPinned = settings.sidebarPinned ?? true;
  const position = settings.sidebarPosition ?? 'left';

  const [activeApp, setActiveApp] = useState<SidebarAppId | null>(null);
  const [isHovered, setIsHovered] = useState(false);
  const [hoveredTooltip, setHoveredTooltip] = useState<{ label: string; y: number } | null>(null);
  const drawerRef = useRef<HTMLDivElement>(null);
  const sidebarRef = useRef<HTMLDivElement>(null);

  // Close drawer on Escape
  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && activeApp) {
        setActiveApp(null);
      }
    };
    window.addEventListener('keydown', handleKey);
    return () => window.removeEventListener('keydown', handleKey);
  }, [activeApp]);

  // Click outside drawer to close
  useEffect(() => {
    if (!activeApp) return;
    const handlePointerDown = (e: PointerEvent) => {
      const target = e.target as Node;
      if (
        drawerRef.current &&
        !drawerRef.current.contains(target) &&
        sidebarRef.current &&
        !sidebarRef.current.contains(target)
      ) {
        setActiveApp(null);
      }
    };
    document.addEventListener('pointerdown', handlePointerDown);
    return () => document.removeEventListener('pointerdown', handlePointerDown);
  }, [activeApp]);

  // Filter apps configured to show in sidebar
  const visibleApps = APPS.filter(
    (app) => app.id !== 'settings' && app.id !== 'account' && (sidebarApps[app.id] ?? true),
  );

  const activeAppDef = APPS.find((a) => a.id === activeApp);

  const toggleApp = (id: SidebarAppId) => {
    setActiveApp((current) => (current === id ? null : id));
  };

  const isLeft = position === 'left';

  // Whether sidebar is visually visible (either pinned, hovered, or drawer is active)
  const isExpanded = isPinned || isHovered || !!activeApp;

  return (
    <>
      {/* Unpinned edge hover trigger */}
      {!isPinned && (
        <div
          onMouseEnter={() => setIsHovered(true)}
          className={`fixed top-0 bottom-0 z-40 w-3 cursor-pointer transition-colors duration-200 ${
            isLeft ? 'left-0 hover:bg-violet-500/20' : 'right-0 hover:bg-violet-500/20'
          }`}
          title="Hover to show sidebar"
        >
          <div
            className={`absolute top-1/2 -translate-y-1/2 h-12 w-1 rounded-full bg-white/20 transition-all group-hover:bg-violet-400 ${
              isLeft ? 'left-1' : 'right-1'
            }`}
          />
        </div>
      )}

      {/* Main Sidebar Rail */}
      <aside
        ref={sidebarRef}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => {
          setIsHovered(false);
          setHoveredTooltip(null);
        }}
        className={`fixed top-0 bottom-0 z-40 flex w-[52px] flex-col items-center justify-between py-2.5 transition-transform duration-300 ease-out glass ${
          isLeft
            ? `left-0 border-r ${!isExpanded ? '-translate-x-[calc(100%-4px)] shadow-none' : 'translate-x-0'}`
            : `right-0 border-l ${!isExpanded ? 'translate-x-[calc(100%-4px)] shadow-none' : 'translate-x-0'}`
        }`}
        aria-label="Apps sidebar"
      >
        {/* Top: Logo / Mini indicator */}
        <div className="flex flex-col items-center gap-2">
          <div
            className="flex h-8 w-8 items-center justify-center rounded-xl bg-violet-600/20 text-violet-400 font-bold text-xs select-none shadow-[0_0_12px_rgba(139,92,246,0.3)]"
            title="Manganum Sidebar"
          >
            M
          </div>
          <div className="h-px w-6 bg-[color:var(--border)]" />
        </div>

        {/* Middle: Apps List */}
        <nav className="flex flex-1 flex-col items-center gap-1.5 py-2 overflow-y-auto overflow-x-hidden ntp-scroll w-full px-1.5">
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
                className={`relative flex h-9 w-9 items-center justify-center rounded-xl transition-all duration-200 ${
                  isActive
                    ? 'bg-violet-600/30 text-violet-300 shadow-[0_0_14px_rgba(139,92,246,0.4)] border border-violet-500/50 scale-105'
                    : 'ui-muted hover:text-[color:var(--text)] hover:bg-[color:var(--surface-strong)] hover:scale-105 active:scale-95'
                }`}
                aria-label={app.label}
                aria-expanded={isActive}
              >
                <Icon className="h-4 w-4" />
                {isActive && (
                  <span
                    className={`absolute top-1/2 -translate-y-1/2 h-3.5 w-1 rounded-full bg-violet-400 ${
                      isLeft ? 'left-0.5' : 'right-0.5'
                    }`}
                  />
                )}
              </button>
            );
          })}
        </nav>

        {/* Bottom: Settings, Account, Pin/Unpin */}
        <div className="flex flex-col items-center gap-1.5 pt-2 w-full px-1.5">
          <div className="h-px w-6 bg-[color:var(--border)] mb-0.5" />

          {/* Account */}
          <button
            type="button"
            onClick={() => toggleApp('account')}
            onMouseEnter={(e) => {
              const rect = e.currentTarget.getBoundingClientRect();
              setHoveredTooltip({ label: 'Account & sync', y: rect.top + rect.height / 2 });
            }}
            onMouseLeave={() => setHoveredTooltip(null)}
            className={`flex h-9 w-9 items-center justify-center rounded-xl transition-all duration-200 ${
              activeApp === 'account'
                ? 'bg-violet-600/30 text-violet-300 border border-violet-500/50'
                : 'ui-muted hover:text-[color:var(--text)] hover:bg-[color:var(--surface-strong)] hover:scale-105'
            }`}
            aria-label="Account"
          >
            <UserIcon className="h-4 w-4" />
          </button>

          {/* Settings */}
          <button
            type="button"
            onClick={() => {
              if (onOpenSettingsModal) {
                onOpenSettingsModal();
              } else {
                toggleApp('settings');
              }
            }}
            onMouseEnter={(e) => {
              const rect = e.currentTarget.getBoundingClientRect();
              setHoveredTooltip({ label: 'Sidebar settings', y: rect.top + rect.height / 2 });
            }}
            onMouseLeave={() => setHoveredTooltip(null)}
            className={`flex h-9 w-9 items-center justify-center rounded-xl transition-all duration-200 ${
              activeApp === 'settings'
                ? 'bg-violet-600/30 text-violet-300 border border-violet-500/50'
                : 'ui-muted hover:text-[color:var(--text)] hover:bg-[color:var(--surface-strong)] hover:scale-105'
            }`}
            aria-label="Settings"
          >
            <GearIcon className="h-4 w-4" />
          </button>

          {/* Pin / Unpin toggle */}
          <button
            type="button"
            onClick={() => dispatch(setSidebarPinned(!isPinned))}
            onMouseEnter={(e) => {
              const rect = e.currentTarget.getBoundingClientRect();
              setHoveredTooltip({
                label: isPinned ? 'Unpin sidebar (auto-collapse)' : 'Pin sidebar (always visible)',
                y: rect.top + rect.height / 2,
              });
            }}
            onMouseLeave={() => setHoveredTooltip(null)}
            className={`flex h-8 w-8 items-center justify-center rounded-xl transition-all duration-200 ${
              isPinned
                ? 'text-violet-400 hover:bg-violet-500/20'
                : 'ui-muted hover:text-[color:var(--text)] hover:bg-[color:var(--surface-strong)]'
            }`}
            aria-label={isPinned ? 'Unpin sidebar' : 'Pin sidebar'}
          >
            {isPinned ? <PinIcon className="h-3.5 w-3.5" /> : <PinOffIcon className="h-3.5 w-3.5" />}
          </button>
        </div>
      </aside>

      {/* Floating Tooltip */}
      {hoveredTooltip && isExpanded && (
        <div
          className={`pointer-events-none fixed z-50 rounded-lg bg-[color:var(--panel)] px-2.5 py-1 text-xs font-medium text-[color:var(--text)] shadow-xl border border-[color:var(--border)] whitespace-nowrap transition-opacity duration-150 ${
            isLeft ? 'left-[60px]' : 'right-[60px]'
          }`}
          style={{ top: hoveredTooltip.y, transform: 'translateY(-50%)' }}
        >
          {hoveredTooltip.label}
        </div>
      )}

      {/* App Flyout Drawer */}
      {activeAppDef && (
        <>
          {/* Subtle click-outside backdrop */}
          <div
            onClick={() => setActiveApp(null)}
            className="fixed inset-0 z-40 bg-black/15 backdrop-blur-[1px] transition-opacity duration-200"
            aria-hidden="true"
          />

          <section
            ref={drawerRef}
            className={`fixed top-3 bottom-3 z-50 flex w-[430px] max-w-[calc(100vw-72px)] flex-col rounded-2xl glass shadow-2xl border border-[color:var(--border)] overflow-hidden transition-all duration-300 ease-out animate-in fade-in slide-in-from-${
              isLeft ? 'left' : 'right'
            }-4 ${isLeft ? 'left-[60px]' : 'right-[60px]'}`}
            role="dialog"
            aria-label={activeAppDef.label}
          >
            {/* Drawer Header */}
            <header className="flex items-center justify-between border-b border-[color:var(--border)] px-4 py-3 bg-[color:var(--surface)]/50">
              <div className="flex items-center gap-2.5 min-w-0">
                <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-xl bg-violet-600/20 text-violet-400">
                  <activeAppDef.Icon className="h-4 w-4" />
                </span>
                <div className="min-w-0">
                  <h2 className="text-sm font-semibold truncate leading-tight">{activeAppDef.label}</h2>
                  <p className="text-[11px] ui-muted truncate">{activeAppDef.subtitle}</p>
                </div>
              </div>

              <div className="flex items-center gap-1">
                {activeApp !== 'settings' && (
                  <button
                    type="button"
                    onClick={() => {
                      if (onOpenSettingsModal) onOpenSettingsModal();
                      else setActiveApp('settings');
                    }}
                    title="Manage apps in settings"
                    className="flex h-7 w-7 items-center justify-center rounded-lg ui-muted hover:text-[color:var(--text)] hover:bg-[color:var(--surface-strong)] transition"
                  >
                    <GearIcon className="h-3.5 w-3.5" />
                  </button>
                )}
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

            {/* Drawer Content */}
            <div className="flex-1 overflow-y-auto p-4 ntp-scroll min-h-0">
              {activeAppDef.render()}
            </div>
          </section>
        </>
      )}
    </>
  );
}
