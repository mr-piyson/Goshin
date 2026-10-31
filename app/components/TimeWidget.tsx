import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import dayjs from 'dayjs';
import type { RootState } from '@/store';

export default function TimeWidget() {
  const { timeFormat, showSeconds } = useSelector((s: RootState) => s.settings);
  const [now, setNow] = useState(dayjs());
  useEffect(() => { const t = setInterval(() => setNow(dayjs()), 1000); return () => clearInterval(t); }, []);
  const fmt = timeFormat === '12' ? (showSeconds ? 'h:mm:ss A' : 'h:mm A') : (showSeconds ? 'HH:mm:ss' : 'HH:mm');
  return (
    <div className="flex h-full w-full flex-col items-center justify-center px-2 text-center">
      <div className="font-title text-xl font-medium leading-none tabular-nums">{now.format(fmt)}</div>
      <div className="mt-1.5 whitespace-nowrap text-sm font-normal leading-none ui-muted">{now.format('ddd, MMM D')}</div>
    </div>
  );
}
