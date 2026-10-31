import React, { useEffect, useState } from 'react';
import { db, type Note } from '@/lib/db';

export default function Notes() {
  const [notes, setNotes] = useState<Note[]>([]);
  const [editing, setEditing] = useState<Note | null>(null);
  const [title, setTitle] = useState('');
  const [body, setBody] = useState('');

  const refresh = async () => setNotes(await db.notes.orderBy('updatedAt').reverse().toArray());

  useEffect(() => { refresh(); }, []);

  const save = async () => {
    const now = Date.now();
    if (editing?.id) {
      await db.notes.update(editing.id, { title, body, updatedAt: now });
    } else {
      await db.notes.add({ title: title || 'Untitled', body, updatedAt: now });
    }
    setEditing(null); setTitle(''); setBody('');
    refresh();
  };

  const remove = async (id?: number) => { if (id) { await db.notes.delete(id); refresh(); } };

  const startEdit = (n: Note) => { setEditing(n); setTitle(n.title); setBody(n.body); };

  return (
    <div className="w-full max-w-2xl">
      <h2 className="mb-3 text-base font-semibold">Notes</h2>
      <div className="ui-tile mb-4 flex flex-col gap-2 rounded-xl p-3">
        <input value={title} onChange={(e) => setTitle(e.target.value)} placeholder="Title" className="rounded-lg px-3 py-2 text-sm" />
        <textarea value={body} onChange={(e) => setBody(e.target.value)} placeholder="Body" rows={3} className="resize-none rounded-lg px-3 py-2 text-sm" />
        <div className="flex gap-2">
          <button onClick={save} className="rounded-lg bg-accent px-4 py-1.5 text-sm font-medium text-white hover:bg-accent">
            {editing ? 'Update' : 'Add'}
          </button>
          {editing && <button onClick={() => { setEditing(null); setTitle(''); setBody(''); }} className="rounded-lg px-4 py-1.5 text-sm">Cancel</button>}
        </div>
      </div>
      <ul className="flex flex-col gap-2">
        {notes.map((n) => (
          <li key={n.id} className="ui-tile rounded-xl p-3">
            <div className="flex items-start justify-between gap-2">
              <div className="min-w-0">
                <div className="truncate font-medium">{n.title}</div>
                <div className="whitespace-pre-wrap text-sm ui-muted">{n.body}</div>
              </div>
              <div className="flex shrink-0 gap-1">
                <button onClick={() => startEdit(n)} className="rounded px-2 py-1 text-xs">Edit</button>
                <button onClick={() => remove(n.id)} className="rounded bg-red-500/25 px-2 py-1 text-xs hover:bg-red-500/40">Del</button>
              </div>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
