import React, { useEffect, useState } from 'react';
import { db, type Task } from '@/lib/db';

export default function Tasks() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [title, setTitle] = useState('');

  const refresh = async () => setTasks(await db.tasks.orderBy('createdAt').reverse().toArray());

  useEffect(() => { refresh(); }, []);

  const add = async () => {
    if (!title.trim()) return;
    await db.tasks.add({ title: title.trim(), done: false, createdAt: Date.now() });
    setTitle('');
    refresh();
  };

  const toggle = async (t: Task) => { if (t.id) { await db.tasks.update(t.id, { done: !t.done }); refresh(); } };
  const remove = async (id?: number) => { if (id) { await db.tasks.delete(id); refresh(); } };

  return (
    <div className="w-full max-w-2xl">
      <h2 className="mb-3 text-base font-semibold">Tasks</h2>
      <div className="mb-4 flex gap-2">
        <input value={title} onChange={(e) => setTitle(e.target.value)} onKeyDown={(e) => e.key === 'Enter' && add()} placeholder="New task" className="ui-input min-w-0 flex-1 rounded-lg px-3 py-2 text-sm" />
        <button onClick={add} className="rounded-lg bg-violet-500 px-4 py-2 text-sm font-medium text-white hover:bg-violet-400">Add</button>
      </div>
      <ul className="flex flex-col gap-2">
        {tasks.map((t) => (
          <li key={t.id} className="ui-tile flex items-center gap-3 rounded-xl p-3">
            <input type="checkbox" checked={t.done} onChange={() => toggle(t)} className="h-4 w-4 accent-violet-500" />
            <span className={`flex-1 text-sm ${t.done ? 'line-through ui-muted' : ''}`}>{t.title}</span>
            <button onClick={() => remove(t.id)} className="rounded bg-red-500/25 px-2 py-1 text-xs hover:bg-red-500/40">Del</button>
          </li>
        ))}
      </ul>
    </div>
  );
}
