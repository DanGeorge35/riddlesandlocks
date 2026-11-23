interface RadioProps {
  checked: boolean;
  onChange: () => void;
  label: string;
  disabled?: boolean;
  className?: string;
}

export function Radio({ checked, onChange, label, disabled = false, className = '' }: RadioProps) {
  return (
    <label
      className={`inline-flex cursor-pointer items-center gap-2.5 ${disabled ? 'cursor-not-allowed opacity-50' : ''} ${className}`}
    >
      <span
        role="radio"
        aria-checked={checked}
        tabIndex={disabled ? -1 : 0}
        onClick={() => !disabled && onChange()}
        onKeyDown={(e) => {
          if (e.key === ' ' || e.key === 'Enter') {
            e.preventDefault();
            !disabled && onChange();
          }
        }}
        className={`flex size-5 shrink-0 items-center justify-center rounded-full border-2 transition-colors focus-visible:shadow-focus-gold ${
          checked ? 'border-gold' : 'border-stroke'
        }`}
      >
        {checked && <span className="size-2.5 rounded-full bg-gold" />}
      </span>
      <span className="font-sans text-sm text-body">{label}</span>
    </label>
  );
}
