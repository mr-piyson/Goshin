import React, { useRef, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { dislike, resetDisliked, setCurrent, setCustom } from '@/store/backgroundSlice';
import { GROUP_LABELS, SYSTEM_BACKGROUNDS, type BackgroundGroup } from '@/lib/backgrounds';
import { CheckIcon, ImageIcon, TrashIcon, UploadIcon } from './Icons';
import LoopingVideo from './LoopingVideo';
import type { RootState, AppDispatch } from '@/store';

type Tab = BackgroundGroup | 'custom';

const TABS: { id: Tab; label: string }[] = [
  { id: 'cover', label: 'Galleries' },
  { id: 'gradients', label: 'Gradients' },
  { id: 'custom', label: 'My background' },
];

export default function BackgroundGallery() {
  const dispatch = useDispatch<AppDispatch>();
  const bg = useSelector((state: RootState) => state.background);
  const [tab, setTab] = useState<Tab>('cover');
  const [dragging, setDragging] = useState(false);
  const fileInput = useRef<HTMLInputElement>(null);

  const items = SYSTEM_BACKGROUNDS.filter((item) => item.group === tab && !bg.disliked.includes(item.id));
  const customDisliked = bg.disliked.includes('custom');
  const currentName =
    bg.current === 'custom'
      ? 'My background'
      : SYSTEM_BACKGROUNDS.find((item) => item.id === bg.current)?.name ?? 'Default';

  const shuffle = () => {
    const pool = SYSTEM_BACKGROUNDS.filter((item) => !bg.disliked.includes(item.id));
    if (!pool.length) {
      dispatch(resetDisliked());
      return;
    }
    const next = pool[Math.floor(Math.random() * pool.length)]!;
    dispatch(setCurrent(next.id));
  };

  const readFile = (file?: File) => {
    if (!file) return;
    if (!file.type.startsWith('image/') && !file.type.startsWith('video/')) return;
    const reader = new FileReader();
    reader.onload = () => {
      dispatch(setCustom(reader.result as string));
      dispatch(setCurrent('custom'));
    };
    reader.readAsDataURL(file);
  };

  return (
    <div className="flex flex-col gap-5">
      <div className="flex rounded-full border border-[color:var(--border)] p-0.5">
        {TABS.map((item) => (
          <button
            key={item.id}
            type="button"
            onClick={() => setTab(item.id)}
            className={`flex-1 rounded-full px-2.5 py-1.5 text-xs transition ${
              tab === item.id ? '' : 'ui-muted hover:text-[color:var(--text)]'
            }`}
          >
            {item.label}
          </button>
        ))}
      </div>

      {tab !== 'custom' && (
        <>
          {items.length > 0 ? (
            <div className="grid grid-cols-2 gap-2.5">
              {items.map((item) => {
                const active = bg.current === item.id;
                return (
                  <div key={item.id} className="group relative">
                    <button
                      type="button"
                      onClick={() => dispatch(setCurrent(item.id))}
                      title={item.name}
                      className={`relative block h-24 w-full overflow-hidden rounded-xl border-2 transition ${
                        active ? 'border-accent' : 'border-transparent hover:border-[color:var(--border)]'
                      }`}
                      style={{ background: item.css }}
                    >
                      {item.video && <LoopingVideo src={item.video} className="absolute inset-0" />}
                      <span className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/55 to-transparent px-2 pb-1.5 pt-5 text-left text-[11px] font-medium text-white">
                        {item.name}
                      </span>
                      {active && (
                        <span className="absolute right-1.5 top-1.5 flex h-5 w-5 items-center justify-center rounded-full bg-accent text-white shadow">
                          <CheckIcon className="h-3 w-3" />
                        </span>
                      )}
                    </button>
                    <button
                      type="button"
                      onClick={() => {
                        dispatch(dislike(item.id));
                        if (active) {
                          const next = SYSTEM_BACKGROUNDS.find(
                            (candidate) => candidate.id !== item.id && !bg.disliked.includes(candidate.id),
                          );
                          if (next) dispatch(setCurrent(next.id));
                        }
                      }}
                      title="I don't like it"
                      aria-label={`Dislike ${item.name}`}
                      className="absolute left-1.5 top-1.5 flex h-5 w-5 items-center justify-center rounded-full bg-black/45 text-white opacity-0 transition group-hover:opacity-100"
                    >
                      <span className="text-[11px] leading-none">×</span>
                    </button>
                  </div>
                );
              })}
            </div>
          ) : (
            <div className="ui-tile rounded-xl p-4 text-center text-xs ui-muted">
              You disliked every background in this gallery.
              <button
                type="button"
                onClick={() => dispatch(resetDisliked())}
                className="ml-1 underline hover:text-[color:var(--text)]"
              >
                Undislike everything
              </button>
            </div>
          )}

          <div className="flex items-center justify-between gap-2 border-t border-[color:var(--border)] pt-3 text-[11px] ui-muted">
            <span className="truncate">Current: {currentName}</span>
            <div className="flex shrink-0 items-center gap-3">
              {bg.disliked.length > 0 && (
                <button type="button" onClick={() => dispatch(resetDisliked())} className="hover:text-[color:var(--text)]">
                  Reset disliked ({bg.disliked.length})
                </button>
              )}
              <button type="button" onClick={shuffle} className="rounded-lg px-2.5 py-1">
                Surprise me
              </button>
            </div>
          </div>
          <p className="text-[11px] ui-muted">{GROUP_LABELS[tab as BackgroundGroup]}</p>
        </>
      )}

      {tab === 'custom' && (
        <div className="flex flex-col gap-3">
          {customDisliked ? (
            <div className="ui-tile rounded-xl p-4 text-center text-xs ui-muted">
              Hidden from rotation.
              <button
                type="button"
                onClick={() => dispatch(resetDisliked())}
                className="ml-1 underline hover:text-[color:var(--text)]"
              >
                Bring it back
              </button>
            </div>
          ) : null}

          {bg.custom && !customDisliked ? (
            <div className="relative overflow-hidden rounded-xl border border-[color:var(--border)]">
              {bg.custom.startsWith('data:video') ? (
                <LoopingVideo src={bg.custom} className="relative h-40 w-full" />
              ) : (
                <img src={bg.custom} alt="Custom background" className="h-40 w-full object-cover" />
              )}
              <div className="absolute inset-x-0 bottom-0 flex items-center justify-between gap-2 bg-gradient-to-t from-black/65 to-transparent p-2.5">
                <span className="text-[11px] font-medium text-white">My background</span>
                <div className="flex gap-1.5">
                  <button
                    type="button"
                    onClick={() => dispatch(setCurrent('custom'))}
                    className="rounded-md bg-white/20 px-2 py-1 text-[11px] text-white backdrop-blur hover:bg-white/30"
                  >
                    Use
                  </button>
                  <button
                    type="button"
                    onClick={() => dispatch(setCustom(undefined))}
                    className="flex items-center gap-1 rounded-md bg-white/20 px-2 py-1 text-[11px] text-white backdrop-blur hover:bg-white/30"
                  >
                    <TrashIcon className="h-3 w-3" /> Delete
                  </button>
                </div>
              </div>
            </div>
          ) : (
            <div
              onDragOver={(event) => {
                event.preventDefault();
                setDragging(true);
              }}
              onDragLeave={() => setDragging(false)}
              onDrop={(event) => {
                event.preventDefault();
                setDragging(false);
                readFile(event.dataTransfer.files?.[0]);
              }}
              className={`flex flex-col items-center justify-center gap-2 rounded-xl border border-dashed px-4 py-8 text-center transition ${
                dragging ? 'border-accent bg-accent/10' : 'border-[color:var(--border)]'
              }`}
            >
              <span className="flex h-10 w-10 items-center justify-center rounded-full ui-field">
                {dragging ? <UploadIcon className="h-5 w-5" /> : <ImageIcon className="h-5 w-5" />}
              </span>
              <div className="text-sm">{dragging ? 'Drop the file to upload it' : 'Drop an image or video here'}</div>
              <button type="button" onClick={() => fileInput.current?.click()} className="rounded-lg px-3 py-1.5 text-xs">
                or click to browse
              </button>
              <input
                ref={fileInput}
                type="file"
                accept="image/*,video/*"
                className="hidden"
                onChange={(event) => {
                  readFile(event.target.files?.[0]);
                  event.target.value = '';
                }}
              />
            </div>
          )}
          <p className="text-[11px] ui-muted">Images and short videos up to a few megabytes work best.</p>
        </div>
      )}
    </div>
  );
}
