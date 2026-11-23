import type { ChangeEvent } from 'react';

interface AnswerInputProps {
  value: string;
  onChange: (normalised: string) => void;
  maxLength?: number;
  disabled?: boolean;
  placeholder?: string;
}

/** FR-PLAY-07: strip to A-Z 0-9 on input; show preview and counter. */
export function AnswerInput({
  value,
  onChange,
  maxLength = 40,
  disabled,
  placeholder = 'Type your answer…',
}: AnswerInputProps) {
  function handleChange(e: ChangeEvent<HTMLInputElement>) {
    const normalised = e.target.value.toUpperCase().replace(/[^A-Z0-9]/g, '');
    onChange(normalised);
  }

  return (
    <div className="flex flex-col gap-2">
      <div className="relative flex items-center">
        <input
          type="text"
          value={value}
          onChange={handleChange}
          disabled={disabled}
          placeholder={placeholder}
          maxLength={maxLength}
          autoComplete="off"
          autoCorrect="off"
          autoCapitalize="characters"
          spellCheck={false}
          className="h-16 w-full rounded-input border border-stroke bg-input px-4 font-mono text-lg tracking-widest text-header placeholder:text-muted focus:border-gold focus:shadow-focus-gold focus:outline-none disabled:opacity-50"
        />
        <span className="absolute right-4 font-mono text-xs text-muted">
          {value.length}/{maxLength}
        </span>
      </div>
    </div>
  );
}
