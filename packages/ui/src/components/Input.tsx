import type { InputHTMLAttributes, ReactNode } from 'react';

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  iconLeft?: ReactNode;
  iconRight?: ReactNode;
  mono?: boolean;
}

export function Input({
  label,
  error,
  iconLeft,
  iconRight,
  mono = false,
  className = '',
  id,
  ...rest
}: InputProps) {
  return (
    <div className="flex flex-col gap-1.5">
      {label && (
        <label htmlFor={id} className="text-xs font-medium text-body">
          {label}
        </label>
      )}
      <div className="relative flex items-center">
        {iconLeft && (
          <span className="pointer-events-none absolute left-3 text-muted">{iconLeft}</span>
        )}
        <input
          id={id}
          className={`h-input w-full rounded-input border bg-input px-4 text-sm text-header transition-colors placeholder:text-muted focus:border-gold focus:shadow-focus-gold focus:outline-none disabled:cursor-not-allowed disabled:opacity-50 ${error ? 'border-error' : 'border-stroke'} ${iconLeft ? 'pl-10' : ''} ${iconRight ? 'pr-10' : ''} ${mono ? 'font-mono' : 'font-sans'} ${className}`}
          {...rest}
        />
        {iconRight && (
          <span className="pointer-events-none absolute right-3 text-muted">{iconRight}</span>
        )}
      </div>
      {error && <p className="text-xs text-error">{error}</p>}
    </div>
  );
}
