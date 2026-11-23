'use client';

import type { ReactNode } from 'react';

interface BottomSheetProps {
  title: string;
  open: boolean;
  onClose: () => void;
  children: ReactNode;
  className?: string;
}

export function BottomSheet({ title, open, onClose, children, className = '' }: BottomSheetProps) {
  if (!open) return null;

  return (
    <>
      <div className="fixed inset-0 z-40 bg-black/60" onClick={onClose} aria-hidden="true" />
      <div
        role="dialog"
        aria-modal="true"
        aria-label={title}
        className={`fixed bottom-0 left-0 right-0 z-50 flex flex-col gap-4 rounded-t-[24px] bg-surface px-6 pb-[34px] pt-3 ${className}`}
      >
        <div className="flex justify-center">
          <div className="h-1 w-10 rounded-full bg-stroke" />
        </div>
        <div className="flex items-center justify-between">
          <h3 className="font-sans text-lg font-semibold text-header">{title}</h3>
          <button
            onClick={onClose}
            className="text-muted transition-colors hover:text-body"
            aria-label="Close"
          >
            <svg
              className="size-[22px]"
              fill="none"
              stroke="currentColor"
              strokeWidth={2}
              viewBox="0 0 24 24"
            >
              <line x1="18" y1="6" x2="6" y2="18" />
              <line x1="6" y1="6" x2="18" y2="18" />
            </svg>
          </button>
        </div>
        {children}
      </div>
    </>
  );
}
