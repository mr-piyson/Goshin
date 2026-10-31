import React, { useEffect, useState } from 'react';
import { browser } from 'wxt/browser';

interface Visit { title: string; url: string; lastVisitTime?: number }

export default function HistoryWidget() {
  const [items, setItems] = useState<Visit[]>([]);
  useEffect(() => {
    browser.history?.search({ text: '', maxResults: 8, startTime: Date.now() - 7 * 86400000 })
      .then((res) => setItems(res.map((r) => ({ title: r.title || r.url || '', url: r.url || '', lastVisitTime: r.lastVisitTime }))))
      .catch(() => {});
  }, []);
  if (!items.length) return null;
  return (
    <div className="w-full max-w-2xl">
      <h2 className="text-lg font-semibold mb-3">Recent History</h2>
      <ul className="flex flex-col gap-1">
        {items.map((v, i) => (
          <li key={i}>
            <a href={v.url} target="_blank" rel="noreferrer" className="ui-tile block truncate rounded-lg px-3 py-2 text-sm">
              {v.title || v.url}
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
}