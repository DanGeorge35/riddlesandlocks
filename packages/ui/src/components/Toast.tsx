type ToastVariant = 'success' | 'error' | 'warning' | 'info';

interface ToastProps {
  variant: ToastVariant;
  message: string;
  onDismiss?: () => void;
}

const variantStyles: Record<ToastVariant, string> = {
  success: 'bg-success-light border-success text-success',
  error: 'bg-error-light border-error text-error',
  warning: 'bg-warning-light border-warning text-warning',
  info: 'bg-surface-2 border-stroke text-body',
};

export function Toast({ variant, message, onDismiss }: ToastProps) {
  return (
    <div
      role="alert"
      className={`flex items-center justify-between gap-3 rounded-card border px-4 py-3 text-sm shadow-card ${variantStyles[variant]}`}
    >
      <span>{message}</span>
      {onDismiss && (
        <button
          onClick={onDismiss}
          aria-label="Dismiss"
          className="shrink-0 opacity-60 transition-opacity hover:opacity-100"
        >
          ✕
        </button>
      )}
    </div>
  );
}
