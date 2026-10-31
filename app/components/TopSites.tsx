import React, { useEffect, useState } from 'react';
import { browser } from 'wxt/browser';

interface Site { title: string; url: string }

export default function TopSites() {
  const [sites, setSites] = useState<Site[]>([]);

  useEffect(() => {
    browser.topSites?.get().then((s) => setSites(s.slice(0, 8))).catch(() => {});
  }, []);

  if (!sites.length) return null;
  return (
    <div className="w-full max-w-2xl">
      <h2 className="text-lg font-semibold mb-3">Top Sites</h2>
      <div className="grid grid-cols-4 gap-3">
        {sites.map((s) => (
          <a key={s.url} href={s.url} target="_blank" rel="noreferrer" className="ui-tile flex flex-col items-center gap-1 rounded-xl p-2">
            <div className="h-8 w-8 rounded ui-field" />
            <span className="w-full truncate text-xs">{s.title || new URL(s.url).hostname}</span>
          </a>
        ))}
      </div>
    </div>
  );
}