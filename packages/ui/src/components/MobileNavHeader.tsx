import type { ReactNode } from 'react';

interface MobileNavHeaderProps {
  title: string;
  onBack?: () => void;
  right?: ReactNode;
  className?: string;
}

export function MobileNavHeader({ title, onBack, right, className = '' }: MobileNavHeaderProps) {
  return (
    <div className={`flex h-14 items-center gap-2 px-4 ${className}`}>
      {onBack && (
        <button
          onClick={onBack}
          className="flex size-11 items-center justify-center rounded-full text-header transition-colors hover:bg-surface focus:outline-none focus-visible:shadow-focus-gold"
          aria-label="Go back"
        >
          <svg
            className="size-[22px]"
            fill="none"
            stroke="currentColor"
            strokeWidth={2}
            viewBox="0 0 24 24"
          >
            <line x1="19" y1="12" x2="5" y2="12" />
            <polyline points="12 19 5 12 12 5" />
          </svg>
        </button>
      )}
      <h2 className="flex-1 text-center font-sans text-lg font-semibold text-header">{title}</h2>
      <div className="size-11">{right}</div>
    </div>
  );
}
