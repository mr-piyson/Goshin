import React, { useEffect, useState } from 'react';

export default function App() {
  const [seconds, setSeconds] = useState(25 * 60);
  const [running, setRunning] = useState(false);

  useEffect(() => {
    if (!running) return;
    const t = setInterval(() => setSeconds((s) => (s > 0 ? s - 1 : 0)), 1000);
    return () => clearInterval(t);
  }, [running]);

  const mm = String(Math.floor(seconds / 60)).padStart(2, '0');
  const ss = String(seconds % 60).padStart(2, '0');

  return (
    <div className="min-h-screen bg-slate-900 text-white flex flex-col items-center justify-center gap-6">
      <h1 className="text-2xl opacity-80">Focus Time</h1>
      <div className="text-8xl font-light tabular-nums">{mm}:{ss}</div>
      <div className="flex gap-3">
        <button onClick={() => setRunning((r) => !r)} className="px-6 py-2 rounded-full bg-purple-500/40 hover:bg-purple-500/60">
          {running ? 'Pause' : 'Start'}
        </button>
        <button onClick={() => { setRunning(false); setSeconds(25 * 60); }} className="px-6 py-2 rounded-full bg-white/10 hover:bg-white/20">
          Reset
        </button>
      </div>
    </div>
  );
}