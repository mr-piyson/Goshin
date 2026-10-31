import React, { useState } from 'react';

export default function Translator() {
  const [text, setText] = useState('');
  const [result, setResult] = useState('');
  const [loading, setLoading] = useState(false);

  const translate = async () => {
    if (!text.trim()) return;
    setLoading(true);
    try {
      const url = `https://translate.googleapis.com/translate_a/single?client=gtx&sl=auto&tl=en&dt=t&q=${encodeURIComponent(text)}`;
      const r = await fetch(url);
      const j = await r.json();
      setResult(j[0]?.map((x: any) => x[0]).join('') ?? '');
    } catch {
      setResult('Translation failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full max-w-2xl">
      <h2 className="mb-3 text-base font-semibold">Translator</h2>
      <textarea value={text} onChange={(e) => setText(e.target.value)} placeholder="Enter text" rows={3} className="mb-2 w-full resize-none rounded-lg px-3 py-2 text-sm" />
      <button onClick={translate} disabled={loading} className="rounded-lg bg-accent px-4 py-2 text-sm font-medium text-white hover:bg-accent disabled:opacity-50">
        {loading ? 'Translating…' : 'Translate to English'}
      </button>
      {result && <div className="ui-tile mt-3 whitespace-pre-wrap rounded-xl p-3 text-sm">{result}</div>}
    </div>
  );
}