import type { ButtonHTMLAttributes, ReactNode } from 'react';

type Variant = 'primary' | 'secondary' | 'ghost' | 'danger';
type Size = 'md' | 'sm';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: Variant;
  size?: Size;
  loading?: boolean;
  iconLeft?: ReactNode;
  iconRight?: ReactNode;
}

const variantClasses: Record<Variant, string> = {
  primary:
    'bg-gradient-to-r from-gold to-[#F2D27A] text-vault font-semibold hover:brightness-110 disabled:opacity-50',
  secondary: 'border border-gold text-gold bg-transparent hover:bg-gold/10 disabled:opacity-50',
  ghost: 'text-body bg-transparent hover:bg-stroke/40 disabled:opacity-40',
  danger: 'bg-error text-white hover:brightness-110 disabled:opacity-50',
};

export function Button({
  variant = 'primary',
  size = 'md',
  loading = false,
  iconLeft,
  iconRight,
  children,
  disabled,
  className = '',
  ...rest
}: ButtonProps) {
  const height = size === 'md' ? 'h-button' : 'h-10';
  const px = size === 'md' ? 'px-6' : 'px-4';
  return (
    <button
      className={`inline-flex items-center justify-center gap-2 rounded-button font-sans text-sm transition-all focus:shadow-focus-gold focus:outline-none ${height} ${px} ${variantClasses[variant]} ${className}`}
      disabled={disabled ?? loading}
      aria-busy={loading}
      {...rest}
    >
      {loading ? (
        <span className="size-4 animate-spin rounded-full border-2 border-current border-t-transparent" />
      ) : (
        iconLeft
      )}
      {children}
      {!loading && iconRight}
    </button>
  );
}
