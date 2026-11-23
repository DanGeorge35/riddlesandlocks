import type { ReactNode } from 'react';

export type TxType = 'entry-fee' | 'deposit' | 'withdrawal' | 'winnings' | 'referral-reward';

interface TransactionRowProps {
  type: TxType;
  title: string;
  subtitle: string;
  amountMicro: bigint;
  status: 'successful' | 'pending' | 'failed';
  className?: string;
}

function formatMicro(micro: bigint): string {
  const usdt = Number(micro) / 1_000_000;
  return usdt.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
}

const typeIcons: Record<TxType, ReactNode> = {
  'entry-fee': (
    <svg
      className="size-5 text-muted"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.75}
      viewBox="0 0 24 24"
    >
      <circle cx="12" cy="12" r="9" />
      <path d="M9 12.5a1 1 0 0 1 .5-.87l5-2.89a1 1 0 0 1 1.5.87v5.78a1 1 0 0 1-1.5.87l-5-2.89a1 1 0 0 1-.5-.87z" />
    </svg>
  ),
  deposit: (
    <svg
      className="size-5 text-teal"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.75}
      viewBox="0 0 24 24"
    >
      <line x1="12" y1="5" x2="12" y2="19" />
      <polyline points="19 12 12 19 5 12" />
    </svg>
  ),
  withdrawal: (
    <svg
      className="size-5 text-muted"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.75}
      viewBox="0 0 24 24"
    >
      <line x1="12" y1="19" x2="12" y2="5" />
      <polyline points="5 12 12 5 19 12" />
    </svg>
  ),
  winnings: (
    <svg
      className="size-5 text-gold"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.75}
      viewBox="0 0 24 24"
    >
      <path d="M6 9H4.5a2.5 2.5 0 0 1 0-5H6" />
      <path d="M18 9h1.5a2.5 2.5 0 0 0 0-5H18" />
      <path d="M4 22h16" />
      <path d="M10 14.66V17c0 .55-.47.98-.97 1.21C7.85 18.75 7 20.24 7 22" />
      <path d="M14 14.66V17c0 .55.47.98.97 1.21C16.15 18.75 17 20.24 17 22" />
      <path d="M18 2H6v7a6 6 0 0 0 12 0V2z" />
    </svg>
  ),
  'referral-reward': (
    <svg
      className="size-5 text-gold"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.75}
      viewBox="0 0 24 24"
    >
      <polyline points="20 12 20 22 4 22 4 12" />
      <rect x="2" y="7" width="20" height="5" />
      <line x1="12" y1="22" x2="12" y2="7" />
      <path d="M12 7H7.5a2.5 2.5 0 0 1 0-5C11 2 12 7 12 7z" />
      <path d="M12 7h4.5a2.5 2.5 0 0 0 0-5C13 2 12 7 12 7z" />
    </svg>
  ),
};

const statusConfig = {
  successful: { chip: 'bg-success/15 text-success', label: 'SUCCESSFUL' },
  pending: { chip: 'bg-warning/15 text-warning', label: 'PENDING' },
  failed: { chip: 'bg-error/15 text-error-2', label: 'FAILED' },
};

const isCredit = (type: TxType) =>
  type === 'deposit' || type === 'winnings' || type === 'referral-reward';

export function TransactionRow({
  type,
  title,
  subtitle,
  amountMicro,
  status,
  className = '',
}: TransactionRowProps) {
  const credit = isCredit(type);
  const { chip, label } = statusConfig[status];
  const amount = formatMicro(amountMicro > 0n ? amountMicro : -amountMicro);
  const sign = credit ? '+' : '−';

  return (
    <div className={`flex items-center gap-3 rounded-button bg-surface-2 px-4 py-3 ${className}`}>
      <div className="flex size-10 shrink-0 items-center justify-center rounded-full bg-surface">
        {typeIcons[type]}
      </div>
      <div className="min-w-0 flex-1">
        <p className="truncate font-sans text-base font-semibold text-header">{title}</p>
        <p className="truncate font-sans text-xs text-muted">{subtitle}</p>
      </div>
      <div className="flex flex-col items-end gap-1">
        <span
          className={`font-sans text-sm font-semibold ${credit ? 'text-success' : 'text-header'}`}
        >
          {sign}
          {amount} USDT
        </span>
        <span
          className={`inline-flex items-center gap-1 rounded-chip px-2 py-0.5 text-[11px] font-semibold uppercase tracking-[0.06em] ${chip}`}
        >
          {status === 'successful' && (
            <svg
              className="size-3"
              fill="none"
              stroke="currentColor"
              strokeWidth={2.5}
              viewBox="0 0 24 24"
            >
              <polyline points="20 6 9 17 4 12" />
            </svg>
          )}
          {status === 'pending' && (
            <svg
              className="size-3"
              fill="none"
              stroke="currentColor"
              strokeWidth={2.5}
              viewBox="0 0 24 24"
            >
              <circle cx="12" cy="12" r="10" />
              <line x1="12" y1="8" x2="12" y2="12" />
              <line x1="12" y1="16" x2="12.01" y2="16" />
            </svg>
          )}
          {label}
        </span>
      </div>
    </div>
  );
}
