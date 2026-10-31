import React, { useEffect, useState } from 'react';
import { browser } from 'wxt/browser';

const STEPS = [
  { title: 'Welcome', body: 'Thanks for installing. Let’s get set up.' },
  { title: 'Widgets', body: 'Toggle widgets in Settings anytime.' },
  { title: 'Launchpad', body: 'Drag to reorder your app shortcuts.' },
  { title: 'Done', body: 'Enjoy your new tab!' },
];

export default function Onboarding() {
  const [open, setOpen] = useState(false);
  const [step, setStep] = useState(0);

  useEffect(() => {
    browser.storage.local.get('onboarded').then((r) => { if (!r.onboarded) setOpen(true); });
  }, []);

  if (!open) return null;
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div className="panel-backdrop absolute inset-0" onClick={() => { browser.storage.local.set({ onboarded: true }); setOpen(false); }} />
      <div className="panel-surface relative w-full max-w-sm rounded-2xl border p-6 text-center">
        <h2 className="text-xl font-semibold mb-2">{STEPS[step]!.title}</h2>
        <p className="text-sm ui-muted mb-6">{STEPS[step]!.body}</p>
        <div className="flex items-center justify-between">
          <button onClick={() => { browser.storage.local.set({ onboarded: true }); setOpen(false); }} className="text-sm ui-muted hover:text-[color:var(--text)]">Skip</button>
          <button
            onClick={() => {
              if (step < STEPS.length - 1) setStep(step + 1);
              else { browser.storage.local.set({ onboarded: true }); setOpen(false); }
            }}
            className="rounded-xl bg-violet-500 px-4 py-2 text-sm font-medium text-white transition hover:bg-violet-400"
          >
            {step < STEPS.length - 1 ? 'Next' : 'Finish'}
          </button>
        </div>
      </div>
    </div>
  );
}