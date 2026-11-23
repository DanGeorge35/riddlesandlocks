interface DesktopTopBarProps {
  title: string;
  balanceMicro: bigint;
  onWallet?: () => void;
  className?: string;
}

function formatMicro(micro: bigint): string {
  const usdt = Number(micro) / 1_000_000;
  const [whole, dec] = usdt.toFixed(2).split('.');
  return `${Number(whole).toLocaleString('en-US')}.${dec}`;
}

export function DesktopTopBar({
  title,
  balanceMicro,
  onWallet,
  className = '',
}: DesktopTopBarProps) {
  const [whole, dec] = formatMicro(balanceMicro).split('.');

  return (
    <header
      className={`flex h-topbar items-center justify-between border-b border-stroke bg-ink px-6 ${className}`}
    >
      <h1 className="font-sans text-lg font-semibold text-header">{title}</h1>
      <button
        onClick={onWallet}
        className="flex items-center gap-2 rounded-button border border-stroke bg-surface px-4 py-2 transition-colors hover:border-gold/40"
      >
        <svg
          className="size-4 text-muted"
          fill="none"
          stroke="currentColor"
          strokeWidth={1.75}
          viewBox="0 0 24 24"
        >
          <path d="M20 7H4a2 2 0 0 0-2 2v10a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V9a2 2 0 0 0-2-2z" />
          <path d="M16 11h2v2h-2z" />
          <path d="M4 7V5a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v2" />
        </svg>
        <span className="font-sans text-sm font-semibold text-header">
          {whole}
          <span className="text-muted">.{dec} USDT</span>
        </span>
      </button>
    </header>
  );
}
