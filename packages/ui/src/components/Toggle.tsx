interface ToggleProps {
  checked: boolean;
  onChange: (checked: boolean) => void;
  label?: string;
  disabled?: boolean;
  className?: string;
}

export function Toggle({
  checked,
  onChange,
  label,
  disabled = false,
  className = '',
}: ToggleProps) {
  return (
    <label
      className={`inline-flex cursor-pointer items-center gap-3 ${disabled ? 'cursor-not-allowed opacity-50' : ''} ${className}`}
    >
      <span
        role="switch"
        aria-checked={checked}
        onClick={() => !disabled && onChange(!checked)}
        className={`relative inline-flex h-[26px] w-11 shrink-0 items-center rounded-full transition-colors focus-visible:shadow-focus-gold focus-visible:outline-none ${
          checked ? 'bg-gold' : 'bg-surface-2'
        }`}
        tabIndex={disabled ? -1 : 0}
        onKeyDown={(e) => {
          if (e.key === ' ' || e.key === 'Enter') {
            e.preventDefault();
            !disabled && onChange(!checked);
          }
        }}
      >
        <span
          className={`inline-block size-5 rounded-full bg-white shadow transition-transform ${
            checked ? 'translate-x-[22px]' : 'translate-x-[3px]'
          }`}
        />
      </span>
      {label && <span className="font-sans text-sm text-body">{label}</span>}
    </label>
  );
}
