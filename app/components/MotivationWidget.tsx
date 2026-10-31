import React, { useEffect, useState } from 'react';

const QUOTES = [
  'The secret of getting ahead is getting started.',
  'It always seems impossible until it’s done.',
  'Don’t watch the clock; do what it does. Keep going.',
  'Believe you can and you’re halfway there.',
  'Small steps every day.',
];

export default function MotivationWidget() {
  const [i, setI] = useState(0);
  useEffect(() => { const t = setInterval(() => setI((x) => (x + 1) % QUOTES.length), 12000); return () => clearInterval(t); }, []);
  return (
    <div className="glass rounded-2xl px-[31px] py-[13px] pb-[17px] text-center">
      <p className="font-title text-[28px] font-medium leading-[36px]">
        {QUOTES[i]}
      </p>
    </div>
  );
}