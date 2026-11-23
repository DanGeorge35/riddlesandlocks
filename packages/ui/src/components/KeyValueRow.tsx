interface KeyValueRowProps {
  label: string;
  value: React.ReactNode;
  className?: string;
}

export function KeyValueRow({ label, value, className = '' }: KeyValueRowProps) {
  return (
    <div
      className={`flex items-start justify-between border-b border-stroke py-3 font-sans text-sm leading-[18px] ${className}`}
    >
      <span className="whitespace-nowrap text-muted">{label}</span>
      <span className="ml-4 min-w-0 flex-1 text-right font-semibold text-header">{value}</span>
    </div>
  );
}
