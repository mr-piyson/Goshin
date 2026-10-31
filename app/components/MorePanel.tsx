import React from 'react';
import { ExternalIcon, GearIcon, ImageIcon, SyncIcon, TimerIcon } from './Icons';

export interface AppItem {
  id: string;
  label: string;
  hint?: string;
}

interface MorePanelProps {
  apps: AppItem[];
  onOpen: (id: string) => void;
}

const QUICK_ACTIONS = [
  { id: 'background', label: 'Backgrounds', hint: 'Change what you see behind everything', Icon: ImageIcon },
  { id: 'settings', label: 'Settings', hint: 'Widgets, theme, search and data', Icon: GearIcon },
  { id: 'account', label: 'Account & sync', hint: 'Profile and sync status', Icon: SyncIcon },
  { id: 'focus-time', label: 'Focus time', hint: 'Start a 25 minute session', Icon: TimerIcon, external: true },
  { id: 'side-panel', label: 'Open side panel', hint: 'Keep apps next to every tab', Icon: ExternalIcon },
];

const AVATAR_GRADIENTS = [
  'linear-gradient(135deg,#8b5cf6,#6366f1)',
  'linear-gradient(135deg,#06b6d4,#3b82f6)',
  'linear-gradient(135deg,#f59e0b,#ef4444)',
  'linear-gradient(135deg,#ec4899,#8b5cf6)',
  'linear-gradient(135deg,#10b981,#06b6d4)',
  'linear-gradient(135deg,#f97316,#f59e0b)',
  'linear-gradient(135deg,#0ea5e9,#22d3ee)',
  'linear-gradient(135deg,#a855f7,#ec4899)',
  'linear-gradient(135deg,#64748b,#334155)',
];

export default function MorePanel({ apps, onOpen }: MorePanelProps) {
  return (
    <div className="flex flex-col gap-6">
      <section>
        <h3 className="mb-2 text-[11px] font-semibold uppercase tracking-wider ui-muted">Apps</h3>
        <div className="grid grid-cols-3 gap-2">
          {apps.map((app, index) => (
            <button
              key={app.id}
              type="button"
              onClick={() => onOpen(app.id)}
              className="ui-tile group flex flex-col items-center gap-2 rounded-xl px-2 py-3 text-center"
              title={app.hint}
            >
              <span
                className="app-avatar h-9 w-9 text-sm"
                style={{ background: AVATAR_GRADIENTS[index % AVATAR_GRADIENTS.length] }}
              >
                {app.label.slice(0, 1)}
              </span>
              <span className="w-full truncate text-xs">{app.label}</span>
            </button>
          ))}
        </div>
      </section>

      <section>
        <h3 className="mb-2 text-[11px] font-semibold uppercase tracking-wider ui-muted">New tab</h3>
        <div className="flex flex-col gap-1">
          {QUICK_ACTIONS.map(({ id, label, hint, Icon, external }) => (
            <button
              key={id}
              type="button"
              onClick={() => onOpen(id)}
              className="ui-tile flex items-center gap-3 rounded-xl px-3 py-2.5 text-left"
            >
              <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg ui-field">
                <Icon className="h-[17px] w-[17px]" />
              </span>
              <span className="min-w-0 flex-1">
                <span className="block truncate text-sm">{label}</span>
                <span className="block truncate text-[11px] ui-muted">{hint}</span>
              </span>
              {external && <ExternalIcon className="h-3.5 w-3.5 ui-muted" />}
            </button>
          ))}
        </div>
      </section>
    </div>
  );
}
