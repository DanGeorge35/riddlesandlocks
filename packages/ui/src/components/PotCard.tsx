import type { ReactNode } from 'react';
import { Money } from './Money';

interface PotCardProps {
  title: string;
  prizeMicro: bigint;
  chip: ReactNode;
  mode: string;
  variant?: 'hero' | 'compact';
  onClick?: () => void;
}

export function PotCard({
  title,
  prizeMicro,
  chip,
  mode,
  variant = 'compact',
  onClick,
}: PotCardProps) {
  if (variant === 'hero') {
    return (
      <div
        className="cursor-pointer rounded-card bg-surface-2 p-6 shadow-card transition-shadow hover:shadow-glow-gold"
        onClick={onClick}
        role={onClick ? 'button' : undefined}
        tabIndex={onClick ? 0 : undefined}
      >
        <div className="mb-3 flex items-center justify-between">
          <span className="font-display text-xs uppercase tracking-widest text-gold">{mode}</span>
          {chip}
        </div>
        <h2 className="mb-4 font-sans text-xl font-semibold text-header">{title}</h2>
        <div className="flex items-baseline gap-1">
          <span className="mr-1 text-xs uppercase tracking-wide text-muted">Prize</span>
          <Money micro={prizeMicro} className="text-2xl" />
        </div>
      </div>
    );
  }

  return (
    <div
      className="flex cursor-pointer items-center justify-between gap-3 rounded-card bg-surface-2 px-4 py-3 shadow-card transition-colors hover:bg-surface"
      onClick={onClick}
      role={onClick ? 'button' : undefined}
      tabIndex={onClick ? 0 : undefined}
    >
      <div className="min-w-0 flex-1">
        <p className="mb-0.5 text-xs text-muted">{mode}</p>
        <p className="truncate text-sm font-medium text-header">{title}</p>
      </div>
      <div className="flex shrink-0 flex-col items-end gap-1">
        <Money micro={prizeMicro} />
        {chip}
      </div>
    </div>
  );
}
