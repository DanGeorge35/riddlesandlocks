import { Button } from './Button';

interface SponsoredRiddleCardProps {
  sponsorName: string;
  riddleTitle: string;
  prizeUsdt: string;
  endsText: string;
  onEnter?: () => void;
  className?: string;
}

export function SponsoredRiddleCard({
  sponsorName,
  riddleTitle,
  prizeUsdt,
  endsText,
  onEnter,
  className = '',
}: SponsoredRiddleCardProps) {
  return (
    <div
      className={`flex flex-col gap-4 rounded-card border border-gold/30 bg-gold-light p-4 ${className}`}
    >
      <div className="flex items-center gap-2">
        <svg
          className="size-4 text-gold"
          fill="none"
          stroke="currentColor"
          strokeWidth={2}
          viewBox="0 0 24 24"
        >
          <path d="M11 5L6 9H2v6h4l5 4V5z" />
          <path d="M19.07 4.93a10 10 0 0 1 0 14.14" />
          <path d="M15.54 8.46a5 5 0 0 1 0 7.07" />
        </svg>
        <span className="font-sans text-xs font-semibold uppercase tracking-[0.08em] text-gold">
          Sponsored · {sponsorName}
        </span>
      </div>

      <div className="flex flex-col gap-1">
        <p className="font-sans text-xs text-muted">Free entry for every level after Practice</p>
        <h3 className="font-sans text-base font-semibold text-header">{riddleTitle}</h3>
      </div>

      <div className="flex flex-col gap-0.5">
        <span className="font-sans text-[11px] font-semibold uppercase tracking-[0.08em] text-muted">
          PRIZE
        </span>
        <div className="flex items-baseline gap-1">
          <span className="font-sans text-2xl font-bold text-gold">{prizeUsdt.split('.')[0]}</span>
          <span className="font-sans text-base text-muted">
            .{prizeUsdt.split('.')[1] ?? '00'} USDT
          </span>
        </div>
      </div>

      <div className="flex items-center justify-between font-sans text-xs text-muted">
        <span>{endsText}</span>
      </div>

      <Button variant="secondary" onClick={onEnter} className="w-full">
        Enter free
      </Button>
    </div>
  );
}
