'use client';

import type { ReactNode } from 'react';

interface ModalProps {
  title: string;
  open: boolean;
  onClose: () => void;
  children: ReactNode;
  className?: string;
}

export function Modal({ title, open, onClose, children, className = '' }: ModalProps) {
  if (!open) return null;

  return (
    <>
      <div
        className="fixed inset-0 z-40 flex items-center justify-center bg-black/60"
        onClick={onClose}
        aria-hidden="true"
      />
      <div
        role="dialog"
        aria-modal="true"
        aria-label={title}
        className={`fixed left-1/2 top-1/2 z-50 flex w-[400px] max-w-[calc(100vw-2rem)] -translate-x-1/2 -translate-y-1/2 flex-col gap-4 rounded-card bg-surface p-6 shadow-card ${className}`}
      >
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
