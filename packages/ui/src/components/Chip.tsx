import type { ReactNode } from 'react';

type ChipVariant =
  | 'live'
  | 'ending-soon'
  | 'solved'
  | 'rolled-over'
  | 'legendary'
  | 'pending'
  | 'successful'
  | 'failed'
  | 'scheduled'
  | 'neutral';

interface ChipProps {
  variant: ChipVariant;
  icon: ReactNode;
  label: string;
}

const chipStyles: Record<ChipVariant, string> = {
  live: 'bg-teal/15 text-teal border-teal/30',
  'ending-soon': 'bg-warning/15 text-warning border-warning/30',
  solved: 'bg-success/15 text-success border-success/30',
  'rolled-over': 'bg-muted/15 text-muted border-stroke',
  legendary: 'bg-gold/15 text-gold border-gold/30',
  pending: 'bg-warning/15 text-warning border-warning/30',
  successful: 'bg-success/15 text-success border-success/30',
  failed: 'bg-error/15 text-error border-error/30',
  scheduled: 'bg-muted/15 text-muted border-stroke',
  neutral: 'bg-stroke/50 text-body border-stroke',
};

export function Chip({ variant, icon, label }: ChipProps) {
  return (
    <span
      className={`inline-flex items-center gap-1.5 rounded-chip border px-2.5 py-1 text-xs font-medium ${chipStyles[variant]}`}
    >
      <span className="size-3.5 shrink-0">{icon}</span>
      {label}
    </span>
  );
}
