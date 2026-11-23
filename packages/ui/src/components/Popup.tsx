'use client';

import type { ReactNode } from 'react';
import { Button } from './Button';

export type PopupType = 'success' | 'error' | 'warning' | 'confirm';

interface PopupProps {
  type: PopupType;
  title: string;
  body: string;
  primaryLabel: string;
  secondaryLabel?: string;
  copyValue?: string;
  onPrimary: () => void;
  onSecondary?: () => void;
  onCopy?: () => void;
  className?: string;
}

const iconConfig: Record<PopupType, { bg: string; icon: ReactNode }> = {
  success: {
    bg: 'bg-success/15',
    icon: (
      <svg
        className="size-8 text-success"
        fill="none"
        stroke="currentColor"
        strokeWidth={2.5}
        viewBox="0 0 24 24"
      >
        <polyline points="20 6 9 17 4 12" />
      </svg>
    ),
  },
  error: {
    bg: 'bg-error/15',
    icon: (
      <svg
        className="size-8 text-error-2"
        fill="none"
        stroke="currentColor"
        strokeWidth={2.5}
        viewBox="0 0 24 24"
      >
        <line x1="18" y1="6" x2="6" y2="18" />
        <line x1="6" y1="6" x2="18" y2="18" />
      </svg>
    ),
  },
  warning: {
    bg: 'bg-warning/15',
    icon: (
      <svg
        className="size-8 text-warning"
        fill="none"
        stroke="currentColor"
        strokeWidth={2.5}
        viewBox="0 0 24 24"
      >
        <path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z" />
        <line x1="12" y1="9" x2="12" y2="13" />
        <line x1="12" y1="17" x2="12.01" y2="17" />
      </svg>
    ),
  },
  confirm: {
    bg: 'bg-gold-light',
    icon: (
      <svg
        className="size-8 text-gold"
        fill="none"
        stroke="currentColor"
        strokeWidth={2.5}
        viewBox="0 0 24 24"
      >
        <circle cx="12" cy="12" r="10" />
        <line x1="12" y1="8" x2="12" y2="12" />
        <line x1="12" y1="16" x2="12.01" y2="16" />
      </svg>
    ),
  },
};

export function Popup({
  type,
  title,
  body,
  primaryLabel,
  secondaryLabel,
  copyValue,
  onPrimary,
  onSecondary,
  onCopy,
  className = '',
}: PopupProps) {
  const { bg, icon } = iconConfig[type];

  return (
    <div
      className={`flex w-[345px] flex-col items-center gap-4 rounded-card bg-surface p-6 shadow-card ${className}`}
    >
      <div className={`flex size-16 items-center justify-center rounded-full ${bg}`}>{icon}</div>
      <div className="flex flex-col items-center gap-2 text-center">
        <h3 className="font-sans text-lg font-semibold text-header">{title}</h3>
        <p className="font-sans text-sm text-body">{body}</p>
      </div>
      {copyValue && (
        <div className="flex w-full items-center justify-between gap-2 rounded-button border border-dashed border-gold px-3 py-2">
          <span className="truncate font-mono text-xs text-body">{copyValue}</span>
          <button
            onClick={onCopy}
            className="shrink-0 text-muted transition-colors hover:text-gold"
            aria-label="Copy"
          >
            <svg
              className="size-4"
              fill="none"
              stroke="currentColor"
              strokeWidth={2}
              viewBox="0 0 24 24"
            >
              <rect x="9" y="9" width="13" height="13" rx="2" ry="2" />
              <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1" />
            </svg>
          </button>
        </div>
      )}
      <div className="flex w-full gap-3">
        {secondaryLabel && (
          <Button variant="secondary" className="flex-1" onClick={onSecondary}>
            {secondaryLabel}
          </Button>
        )}
        <Button variant="primary" className="flex-1" onClick={onPrimary}>
          {primaryLabel}
        </Button>
      </div>
    </div>
  );
}
