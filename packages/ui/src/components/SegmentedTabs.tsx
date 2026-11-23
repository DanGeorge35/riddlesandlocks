interface Tab<T extends string> {
  id: T;
  label: string;
}

interface SegmentedTabsProps<T extends string> {
  tabs: Tab<T>[];
  active: T;
  onChange: (id: T) => void;
  className?: string;
}

export function SegmentedTabs<T extends string>({
  tabs,
  active,
  onChange,
  className = '',
}: SegmentedTabsProps<T>) {
  return (
    <div
      role="tablist"
      className={`inline-flex gap-1 rounded-button bg-surface-2 p-1 ${className}`}
    >
      {tabs.map(({ id, label }) => {
        const isActive = active === id;
        return (
          <button
            key={id}
            role="tab"
            aria-selected={isActive}
            onClick={() => onChange(id)}
            className={`rounded-[8px] px-4 py-2 font-sans text-sm font-medium transition-colors focus:outline-none focus-visible:shadow-focus-gold ${
              isActive ? 'bg-surface text-header shadow-sm' : 'text-muted hover:text-body'
            }`}
          >
            {label}
          </button>
        );
      })}
    </div>
  );
}
