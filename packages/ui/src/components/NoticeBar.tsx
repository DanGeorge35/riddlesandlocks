import type { ReactNode } from 'react';

export type NoticeVariant = 'warning' | 'error' | 'info' | 'success';

interface NoticeBarProps {
  variant: NoticeVariant;
  text: string;
  linkLabel?: string;
  onLink?: () => void;
  className?: string;
}

const variantConfig: Record<
  NoticeVariant,
  { bg: string; border: string; iconColor: string; linkColor: string; icon: ReactNode }
> = {
  warning: {
    bg: 'bg-warning/10',
    border: 'border-warning/30',
    iconColor: 'text-warning',
    linkColor: 'text-warning',
    icon: (
      <svg
        className="size-4 shrink-0"
        fill="none"
        stroke="currentColor"
        strokeWidth={2}
        viewBox="0 0 24 24"
      >
        <path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z" />
        <line x1="12" y1="9" x2="12" y2="13" />
        <line x1="12" y1="17" x2="12.01" y2="17" />
      </svg>
    ),
  },
  error: {
    bg: 'bg-error/10',
    border: 'border-error/30',
    iconColor: 'text-error-2',
    linkColor: 'text-error-2',
    icon: (
      <svg
        className="size-4 shrink-0"
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
  info: {
    bg: 'bg-teal/10',
    border: 'border-teal/30',
    iconColor: 'text-teal',
    linkColor: 'text-teal',
    icon: (
      <svg
        className="size-4 shrink-0"
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
  success: {
    bg: 'bg-success/10',
    border: 'border-success/30',
    iconColor: 'text-success',
    linkColor: 'text-success',
    icon: (
      <svg
        className="size-4 shrink-0"
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
};

export function NoticeBar({ variant, text, linkLabel, onLink, className = '' }: NoticeBarProps) {
  const cfg = variantConfig[variant];
  return (
    <div
      className={`flex items-center gap-2 rounded-button border px-3 py-2.5 ${cfg.bg} ${cfg.border} ${className}`}
    >
      <span className={cfg.iconColor}>{cfg.icon}</span>
      <p className={`flex-1 font-sans text-[13px] leading-[18px] ${cfg.iconColor}`}>{text}</p>
      {linkLabel && (
        <button
          onClick={onLink}
          className={`font-sans text-sm font-semibold ${cfg.linkColor} whitespace-nowrap transition-opacity hover:opacity-80`}
        >
          {linkLabel}
        </button>
      )}
    </div>
  );
}
