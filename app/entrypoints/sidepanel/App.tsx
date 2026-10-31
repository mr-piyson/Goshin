import React, { useState } from 'react';

const TABS = [
  { id: 'gmail', label: 'Gmail', url: 'https://mail.google.com/mail/u/0/' },
  { id: 'calendar', label: 'Calendar', url: 'https://calendar.google.com' },
  { id: 'tasks', label: 'Tasks', url: 'https://tasks.google.com/embed/' },
  { id: 'keep', label: 'Keep', url: 'https://keep.google.com' },
];

export default function App() {
  const [active, setActive] = useState(TABS[0]!.id);
  const tab = TABS.find((t) => t.id === active) as (typeof TABS)[number];
  return (
    <div className="h-screen bg-slate-900 text-white flex flex-col">
      <div className="flex gap-1 p-2 border-b border-white/10 overflow-x-auto">
        {TABS.map((t) => (
          <button
            key={t.id}
            onClick={() => setActive(t.id)}
            className={`px-3 py-1.5 text-sm rounded-lg whitespace-nowrap transition ${
              active === t.id ? 'bg-purple-500/40' : 'hover:bg-white/10'
            }`}
          >
            {t.label}
          </button>
        ))}
      </div>
      <iframe
        src={tab.url}
        className="flex-1 w-full border-0 bg-white"
        title={tab.label}
        allow="clipboard-read; clipboard-write"
      />
    </div>
  );
}