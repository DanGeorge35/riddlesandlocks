import type { ReactNode } from 'react';

interface ListRowProps {
  icon: ReactNode;
  label: string;
  onClick?: () => void;
  className?: string;
}

export function ListRow({ icon, label, onClick, className = '' }: ListRowProps) {
  return (
    <button
      onClick={onClick}
      className={`flex h-14 w-full items-center gap-3 rounded-card bg-surface px-4 transition-colors hover:bg-surface-2 focus:outline-none focus-visible:shadow-focus-gold ${className}`}
    >
      <span className="size-5 shrink-0 text-muted">{icon}</span>
      <span className="flex-1 text-left font-sans text-[15px] text-header">{label}</span>
      <svg
        className="size-[18px] text-muted"
        fill="none"
        stroke="currentColor"
        strokeWidth={2}
        viewBox="0 0 24 24"
      >
        <polyline points="9 18 15 12 9 6" />
      </svg>
    </button>
  );
}
