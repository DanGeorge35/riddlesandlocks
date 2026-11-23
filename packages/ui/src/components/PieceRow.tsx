import type { ReactNode } from 'react';

export type PieceState =
  'locked' | 'available' | 'checking' | 'correct' | 'wrong' | 'limit-reached';
export type PieceCategory = 'CIPHER' | 'RIDDLE' | 'LOGIC' | 'VISUAL' | 'AUDIO' | 'TRIVIA';

interface PieceRowProps {
  number: number;
  category: PieceCategory;
  title: string;
  state: PieceState;
  className?: string;
}

const stateConfig: Record<
  PieceState,
  { border: string; numberBg: string; numberText: string; icon: ReactNode }
> = {
  locked: {
    border: 'border-stroke',
    numberBg: 'bg-surface-2 text-muted',
    numberText: 'text-muted',
    icon: (
      <svg
        className="size-5 text-muted"
        fill="none"
        stroke="currentColor"
        strokeWidth={2}
        viewBox="0 0 24 24"
      >
        <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
        <path d="M7 11V7a5 5 0 0 1 10 0v4" />
      </svg>
    ),
  },
  available: {
    border: 'border-stroke',
    numberBg: 'bg-surface-2 text-body',
    numberText: 'text-body',
    icon: (
      <svg
        className="size-5 text-muted"
        fill="none"
        stroke="currentColor"
        strokeWidth={2}
        viewBox="0 0 24 24"
      >
        <polyline points="9 18 15 12 9 6" />
      </svg>
    ),
  },
  checking: {
    border: 'border-gold/40',
    numberBg: 'bg-gold-light text-gold',
    numberText: 'text-gold',
    icon: (
      <svg
        className="size-5 animate-spin text-gold"
        fill="none"
        stroke="currentColor"
        strokeWidth={2}
        viewBox="0 0 24 24"
      >
        <path d="M21 12a9 9 0 1 1-6.219-8.56" />
      </svg>
    ),
  },
  correct: {
    border: 'border-success/40',
    numberBg: 'bg-success/15 text-success',
    numberText: 'text-success',
    icon: (
      <svg
        className="size-5 text-success"
        fill="none"
        stroke="currentColor"
        strokeWidth={2}
        viewBox="0 0 24 24"
      >
        <circle cx="12" cy="12" r="10" />
        <polyline points="9 12 11 14 15 10" />
      </svg>
    ),
  },
  wrong: {
    border: 'border-error/40',
    numberBg: 'bg-error/15 text-error-2',
    numberText: 'text-error-2',
    icon: (
      <svg
        className="size-5 text-error-2"
        fill="none"
        stroke="currentColor"
        strokeWidth={2}
        viewBox="0 0 24 24"
      >
        <circle cx="12" cy="12" r="10" />
        <line x1="15" y1="9" x2="9" y2="15" />
        <line x1="9" y1="9" x2="15" y2="15" />
      </svg>
    ),
  },
  'limit-reached': {
    border: 'border-warning/30',
    numberBg: 'bg-warning/15 text-warning',
    numberText: 'text-warning',
    icon: (
      <svg
        className="size-5 text-warning"
        fill="none"
        stroke="currentColor"
        strokeWidth={2}
        viewBox="0 0 24 24"
      >
        <circle cx="12" cy="12" r="10" />
        <line x1="12" y1="8" x2="12" y2="12" />
        <line x1="12" y1="16" x2="12.01" y2="16" />
      </svg>
    ),
  },
};

export function PieceRow({ number, category, title, state, className = '' }: PieceRowProps) {
  const cfg = stateConfig[state];
  const isLocked = state === 'locked';

  return (
    <div
      className={`flex h-[63px] items-center gap-3 rounded-button border bg-surface px-4 ${cfg.border} ${isLocked ? 'opacity-60' : ''} ${className}`}
    >
      <div
        className={`flex size-8 shrink-0 items-center justify-center rounded-full text-sm font-semibold ${cfg.numberBg}`}
      >
        {number}
      </div>
      <div className="flex min-w-0 flex-1 flex-col">
        <span
          className={`font-sans text-[11px] font-semibold uppercase tracking-[0.08em] ${cfg.numberText}`}
        >
          {category}
        </span>
        <span
          className={`truncate font-sans text-sm leading-5 ${isLocked ? 'text-muted' : 'text-header'}`}
        >
          {title}
        </span>
      </div>
      <div className="shrink-0">{cfg.icon}</div>
    </div>
  );
}
