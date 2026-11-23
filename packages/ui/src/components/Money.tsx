interface MoneyProps {
  micro: bigint;
  className?: string;
}

/** Renders USDT per FRD §13.5: big whole number + small grey decimals. */
export function Money({ micro, className = '' }: MoneyProps) {
  const whole = (micro / 1_000_000n).toString();
  const frac = (micro % 1_000_000n).toString().padStart(6, '0').slice(0, 2);
  return (
    <span className={`font-sans ${className}`}>
      <span className="font-semibold text-header">{whole}</span>
      <span className="text-sm text-muted">.{frac} USDT</span>
    </span>
  );
}
