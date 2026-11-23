'use client';

import { useEffect, useState } from 'react';

interface CountdownProps {
  targetDate: Date;
  size?: 'default' | 'small';
  className?: string;
}

function pad(n: number) {
  return String(n).padStart(2, '0');
}

function getTimeLeft(target: Date) {
  const diff = Math.max(0, target.getTime() - Date.now());
  const totalSecs = Math.floor(diff / 1000);
  const days = Math.floor(totalSecs / 86400);
  const hours = Math.floor((totalSecs % 86400) / 3600);
  const mins = Math.floor((totalSecs % 3600) / 60);
  const secs = totalSecs % 60;
  return { days, hours, mins, secs };
}

export function Countdown({ targetDate, size = 'default', className = '' }: CountdownProps) {
  const [time, setTime] = useState(() => getTimeLeft(targetDate));

  useEffect(() => {
    const id = setInterval(() => setTime(getTimeLeft(targetDate)), 1000);
    return () => clearInterval(id);
  }, [targetDate]);

  const tileSize = size === 'default' ? 'w-16 h-16' : 'w-[52px] h-[52px]';
  const numClass = size === 'default' ? 'text-2xl font-bold' : 'text-xl font-bold';
  const labelClass =
    size === 'default'
      ? 'text-[11px] font-semibold uppercase tracking-[0.08em] text-muted mt-1'
      : 'text-[10px] font-semibold uppercase tracking-[0.08em] text-muted mt-0.5';

  const units = [
    { value: time.days, label: 'DAYS' },
    { value: time.hours, label: 'HRS' },
    { value: time.mins, label: 'MINS' },
    { value: time.secs, label: 'SECS' },
  ];

  return (
    <div className={`flex gap-2 ${className}`}>
      {units.map(({ value, label }) => (
        <div
          key={label}
          className={`flex flex-col items-center justify-center rounded-button bg-surface-2 ${tileSize}`}
        >
          <span className={`font-sans text-header ${numClass}`}>{pad(value)}</span>
          <span className={`font-sans ${labelClass}`}>{label}</span>
        </div>
      ))}
    </div>
  );
}
