interface AttemptsMeterProps {
  total: number;
  remaining: number;
  className?: string;
}

export function AttemptsMeter({ total, remaining, className = '' }: AttemptsMeterProps) {
  const used = total - remaining;
  const isExhausted = remaining === 0;

  return (
    <div className={`flex items-center gap-2 ${className}`}>
      <div className="flex gap-1.5">
        {Array.from({ length: total }).map((_, i) => (
          <span
            key={i}
            className={`inline-block size-3 rounded-full border ${
              i < remaining ? 'border-gold bg-gold' : 'border-gold/40 bg-transparent'
            }`}
          />
        ))}
      </div>
      <span className={`font-sans text-xs ${isExhausted ? 'text-error-2' : 'text-muted'}`}>
        {remaining > 0
          ? `${remaining} of ${total} attempt${total !== 1 ? 's' : ''} left`
          : `0 of ${total} attempts left`}
      </span>
    </div>
  );
}
