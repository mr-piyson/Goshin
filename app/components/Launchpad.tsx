import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {
  DndContext,
  closestCenter,
  PointerSensor,
  useSensor,
  useSensors,
  type DragEndEvent,
} from '@dnd-kit/core';
import { SortableContext, rectSortingStrategy, useSortable, arrayMove } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { loadShortcuts, saveShortcuts, type Shortcut } from '@/lib/storage';
import { setAll, add, remove, reorder } from '@/store/launchpadSlice';
import { PlusIcon } from './Icons';
import type { RootState, AppDispatch } from '@/store';

function hostOf(url: string): string {
  try {
    return new URL(url).hostname.replace(/^www\./, '');
  } catch {
    return url;
  }
}

function Favicon({ item }: { item: Shortcut }) {
  const [failed, setFailed] = useState(false);
  if (item.icon) return <img src={item.icon} alt="" className="h-7 w-7 rounded-lg object-contain" />;
  if (failed) {
    return (
      <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-br from-violet-400/80 to-sky-400/70 text-sm font-semibold text-white">
        {item.title.slice(0, 1).toUpperCase()}
      </span>
    );
  }
  return (
    <img
      src={`https://www.google.com/s2/favicons?domain=${encodeURIComponent(hostOf(item.url))}&sz=64`}
      alt=""
      className="h-7 w-7 rounded-lg object-contain"
      onError={() => setFailed(true)}
    />
  );
}

function SortableItem({ item, onRemove }: { item: Shortcut; onRemove: () => void }) {
  const { attributes, listeners, setNodeRef, transform, transition, isDragging } = useSortable({ id: item.id });
  const style: React.CSSProperties = { transform: CSS.Transform.toString(transform), transition };

  return (
    <a
      ref={setNodeRef}
      style={style}
      {...attributes}
      {...listeners}
      href={item.url}
      target="_blank"
      rel="noreferrer"
      title={`${item.title} · drag to reorder · right-click to remove`}
      onContextMenu={(event) => {
        event.preventDefault();
        onRemove();
      }}
      className={`launch-tile group ${isDragging ? 'launch-tile--dragging' : ''}`}
    >
      <span className="flex h-11 w-11 items-center justify-center rounded-xl ui-field transition group-hover:scale-105">
        <Favicon item={item} />
      </span>
      <span className="w-full truncate text-center text-[11px]">{item.title}</span>
    </a>
  );
}

export default function Launchpad() {
  const dispatch = useDispatch<AppDispatch>();
  const items = useSelector((state: RootState) => state.launchpad.items);
  const loaded = useSelector((state: RootState) => state.launchpad.loaded);
  const sensors = useSensors(useSensor(PointerSensor, { activationConstraint: { distance: 5 } }));

  const [adding, setAdding] = useState(false);
  const [title, setTitle] = useState('');
  const [url, setUrl] = useState('');

  useEffect(() => {
    if (!loaded) {
      loadShortcuts().then((list) => dispatch(setAll(list)));
    }
  }, [loaded, dispatch]);

  useEffect(() => {
    if (loaded) saveShortcuts(items).catch(() => {});
  }, [items, loaded]);

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;
    if (!over || active.id === over.id) return;
    const oldIndex = items.findIndex((item) => item.id === active.id);
    const newIndex = items.findIndex((item) => item.id === over.id);
    if (oldIndex < 0 || newIndex < 0) return;
    dispatch(reorder(arrayMove(items, oldIndex, newIndex)));
  };

  const submit = (event: React.FormEvent) => {
    event.preventDefault();
    const raw = url.trim();
    if (!raw) return;
    const href = /^[a-z]+:\/\//i.test(raw) ? raw : `https://${raw}`;
    let label = title.trim();
    if (!label) {
      try {
        label = new URL(href).hostname.replace(/^www\./, '');
      } catch {
        label = href;
      }
    }
    dispatch(add({ id: `app-${Date.now()}`, title: label, url: href }));
    setTitle('');
    setUrl('');
    setAdding(false);
  };

  return (
    <div className="w-full">
      {adding && (
        <form onSubmit={submit} className="glass mx-auto mb-3 flex max-w-xl flex-wrap items-center gap-2 rounded-2xl p-2">
          <input
            autoFocus
            value={title}
            onChange={(event) => setTitle(event.target.value)}
            placeholder="Name"
            className="ui-input min-w-0 flex-1 rounded-lg px-3 py-1.5 text-xs"
          />
          <input
            value={url}
            onChange={(event) => setUrl(event.target.value)}
            placeholder="example.com"
            className="ui-input min-w-0 flex-[2] rounded-lg px-3 py-1.5 text-xs"
          />
          <button type="submit" className="rounded-lg bg-violet-500 px-3 py-1.5 text-xs font-medium text-white hover:bg-violet-400">
            Add
          </button>
          <button
            type="button"
            onClick={() => setAdding(false)}
            className="rounded-lg px-2 py-1.5 text-xs ui-muted hover:text-[color:var(--text)]"
          >
            Cancel
          </button>
        </form>
      )}

      <DndContext sensors={sensors} collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
        <SortableContext items={items.map((item) => item.id)} strategy={rectSortingStrategy}>
          <div className="grid grid-cols-4 gap-2 sm:grid-cols-6 lg:grid-cols-8">
            {items.map((item) => (
              <SortableItem
                key={item.id}
                item={item}
                onRemove={() => {
                  if (window.confirm(`Remove ${item.title} from the launchpad?`)) dispatch(remove(item.id));
                }}
              />
            ))}
            <button type="button" onClick={() => setAdding((value) => !value)} className="launch-tile launch-tile--add" title="Add app">
              <span className="flex h-11 w-11 items-center justify-center rounded-xl border border-dashed border-[color:var(--border)]">
                <PlusIcon className="h-5 w-5" />
              </span>
              <span className="text-[11px] ui-muted">Add app</span>
            </button>
          </div>
        </SortableContext>
      </DndContext>
    </div>
  );
}
