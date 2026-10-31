import React, { useEffect, useState } from 'react';

export default function Account() {
  const [email, setEmail] = useState<string | null>(null);

  useEffect(() => {
    // chrome.identity may be unavailable without oauth2 client id in manifest
    const id = (globalThis as any).chrome?.identity;
    if (id?.getProfileUserInfo) {
      id.getProfileUserInfo((info: any) => setEmail(info?.email || null));
    }
  }, []);

  return (
    <div className="w-full max-w-2xl">
      <h2 className="text-lg font-semibold mb-3">Account & Sync</h2>
      <div className="ui-tile flex items-center justify-between gap-3 rounded-xl p-4">
        <div className="min-w-0">
          <div className="truncate font-medium">{email ?? 'Not signed in'}</div>
          <div className="text-xs ui-muted">Cloud sync requires an OAuth client id in the manifest.</div>
        </div>
        <button onClick={() => alert('Configure oauth2 in wxt.config.ts to enable sign-in.')} className="shrink-0 rounded-lg px-3 py-1.5 text-sm">
          Sign in
        </button>
      </div>
    </div>
  );
}