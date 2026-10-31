import { browser } from 'wxt/browser';

export interface Shortcut {
  id: string;
  title: string;
  url: string;
  icon?: string;
}

const KEY = 'shortcuts';

export async function loadShortcuts(): Promise<Shortcut[]> {
  try {
    const res = await browser.storage.local.get(KEY);
    return (res[KEY] as Shortcut[]) ?? defaultShortcuts();
  } catch {
    return defaultShortcuts();
  }
}

export async function saveShortcuts(list: Shortcut[]): Promise<void> {
  await browser.storage.local.set({ [KEY]: list });
}

export function defaultShortcuts(): Shortcut[] {
  return [
    { id: 'gmail', title: 'Gmail', url: 'https://mail.google.com' },
    { id: 'calendar', title: 'Calendar', url: 'https://calendar.google.com' },
    { id: 'drive', title: 'Drive', url: 'https://drive.google.com' },
    { id: 'youtube', title: 'YouTube', url: 'https://youtube.com' },
    { id: 'maps', title: 'Maps', url: 'https://maps.google.com' },
    { id: 'photos', title: 'Photos', url: 'https://photos.google.com' },
  ];
}