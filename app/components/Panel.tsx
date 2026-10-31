import React, { useEffect } from 'react';
import { CloseIcon } from './Icons';

interface PanelProps {
  title: string;
  onClose: () => void;
  children: React.ReactNode;
  /** Tailwind max-width class for the drawer. */
  width?: string;
  subtitle?: string;
}

export default function Panel({ title, subtitle, onClose, children, width = 'max-w-md' }: PanelProps) {
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [onClose]);

  return (
    <div className="fixed inset-0 z-50" role="dialog" aria-modal="true" aria-label={title}>
      <div className="panel-backdrop absolute inset-0" onClick={onClose} />
      <aside
        className={`panel-surface absolute right-0 top-0 flex h-full w-full ${width} flex-col border-l`}
        style={{ animation: 'panel-in 220ms cubic-bezier(0.22, 1, 0.36, 1)' }}
      >
        <header className="flex items-start justify-between gap-4 px-5 pb-3 pt-5">
          <div className="min-w-0">
            <h2 className="truncate text-lg font-semibold">{title}</h2>
            {subtitle && <p className="mt-0.5 text-xs ui-muted">{subtitle}</p>}
          </div>
          <button type="button" onClick={onClose} className="icon-btn shrink-0" aria-label="Close panel">
            <CloseIcon className="h-[18px] w-[18px]" />
          </button>
        </header>
        <div className="ntp-scroll flex-1 overflow-y-auto px-5 pb-8 pt-2">{children}</div>
      </aside>
    </div>
  );
}
