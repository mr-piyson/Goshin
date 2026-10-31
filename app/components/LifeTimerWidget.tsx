import React, { useEffect, useState } from 'react';
import { browser } from 'wxt/browser';

export default function LifeTimerWidget() {
  const [dob, setDob] = useState<string>('');
  const [editing, setEditing] = useState(false);

  useEffect(() => {
    browser.storage.local.get('dob').then((r) => { if (r.dob) setDob(r.dob as string); else setEditing(true); });
  }, []);

  const save = (v: string) => { setDob(v); browser.storage.local.set({ dob: v }); setEditing(false); };

  if (editing || !dob) {
    return (
      <div className="ui-tile rounded-xl p-4">
        <div className="mb-2 text-sm">Enter your date of birth</div>
        <input type="date" defaultValue={dob} onBlur={(e) => save(e.target.value)} className="ui-input rounded-lg px-3 py-2 text-sm" />
      </div>
    );
  }

  const birth = new Date(dob);
  const now = new Date();
  const ageMs = now.getTime() - birth.getTime();
  const yearsLived = ageMs / (365.25 * 24 * 3600 * 1000);
  const yearsLeft = Math.max(0, 80 - yearsLived);
  const pct = Math.min(100, (yearsLived / 80) * 100);

  return (
    <div className="ui-tile rounded-xl p-4">
      <div className="mb-2 flex items-center justify-between text-xs ui-muted">
        <span>Life timer (80 yr baseline)</span>
        <button type="button" onClick={() => setEditing(true)} className="hover:text-[color:var(--text)]">Edit</button>
      </div>
      <div className="mb-1 flex justify-between text-xs"><span>Lived {yearsLived.toFixed(1)}y</span><span>Left {yearsLeft.toFixed(1)}y</span></div>
      <div className="h-2 overflow-hidden rounded-full ui-field">
        <div className="h-full rounded-full bg-gradient-to-r from-violet-400 to-sky-400" style={{ width: `${pct}%` }} />
      </div>
    </div>
  );
}
