import React from 'react';

export default function GmailWidget() {
  return (
    <div className="w-full max-w-2xl">
      <h2 className="text-lg font-semibold mb-3">Gmail</h2>
      <iframe
        src="https://mail.google.com/mail/u/0/#inbox"
        className="w-full h-[300px] rounded-xl border-0 bg-white"
        title="Gmail"
      />
      <a href="https://mail.google.com" target="_blank" rel="noreferrer" className="inline-block mt-2 text-sm text-purple-300 hover:underline">Open Gmail ↗</a>
    </div>
  );
}