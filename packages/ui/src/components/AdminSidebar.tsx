export type AdminRoute =
  | 'review-queue'
  | 'clue-schedule'
  | 'live-rounds'
  | 'treasury'
  | 'economy-settings'
  | 'sponsors'
  | 'users'
  | 'audit-log';

interface AdminSidebarProps {
  active: AdminRoute;
  onNav: (route: AdminRoute) => void;
  className?: string;
}

function AdminIcon({ name }: { name: string }) {
  const paths: Record<string, React.ReactNode> = {
    clipboard: (
      <>
        <path d="M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2" />
        <rect x="8" y="2" width="8" height="4" rx="1" ry="1" />
      </>
    ),
    calendar: (
      <>
        <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
        <line x1="16" y1="2" x2="16" y2="6" />
        <line x1="8" y1="2" x2="8" y2="6" />
        <line x1="3" y1="10" x2="21" y2="10" />
      </>
    ),
    play: (
      <>
        <polygon points="5 3 19 12 5 21 5 3" />
      </>
    ),
    landmark: (
      <>
        <line x1="3" y1="22" x2="21" y2="22" />
        <line x1="6" y1="18" x2="6" y2="11" />
        <line x1="10" y1="18" x2="10" y2="11" />
        <line x1="14" y1="18" x2="14" y2="11" />
        <line x1="18" y1="18" x2="18" y2="11" />
        <polygon points="12 2 20 7 4 7" />
      </>
    ),
    sliders: (
      <>
        <line x1="4" y1="21" x2="4" y2="14" />
        <line x1="4" y1="10" x2="4" y2="3" />
        <line x1="12" y1="21" x2="12" y2="12" />
        <line x1="12" y1="8" x2="12" y2="3" />
        <line x1="20" y1="21" x2="20" y2="16" />
        <line x1="20" y1="12" x2="20" y2="3" />
        <line x1="1" y1="14" x2="7" y2="14" />
        <line x1="9" y1="8" x2="15" y2="8" />
        <line x1="17" y1="16" x2="23" y2="16" />
      </>
    ),
    megaphone: (
      <>
        <path d="M11 5L6 9H2v6h4l5 4V5z" />
        <path d="M19.07 4.93a10 10 0 0 1 0 14.14" />
        <path d="M15.54 8.46a5 5 0 0 1 0 7.07" />
      </>
    ),
    users: (
      <>
        <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
        <circle cx="9" cy="7" r="4" />
        <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
        <path d="M16 3.13a4 4 0 0 1 0 7.75" />
      </>
    ),
    file: (
      <>
        <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
        <polyline points="14 2 14 8 20 8" />
      </>
    ),
  };
  return (
    <svg
      className="size-5"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.75}
      viewBox="0 0 24 24"
    >
      {paths[name]}
    </svg>
  );
}

const GROUPS = [
  {
    label: 'RIDDLES',
    items: [
      { id: 'review-queue' as AdminRoute, label: 'Review Queue', iconName: 'clipboard' },
      { id: 'clue-schedule' as AdminRoute, label: 'Clue Schedule', iconName: 'calendar' },
      { id: 'live-rounds' as AdminRoute, label: 'Live Rounds', iconName: 'play' },
    ],
  },
  {
    label: 'FINANCE',
    items: [
      { id: 'treasury' as AdminRoute, label: 'Treasury', iconName: 'landmark' },
      { id: 'economy-settings' as AdminRoute, label: 'Economy Settings', iconName: 'sliders' },
      { id: 'sponsors' as AdminRoute, label: 'Sponsors', iconName: 'megaphone' },
    ],
  },
  {
    label: 'USERS',
    items: [
      { id: 'users' as AdminRoute, label: 'Users', iconName: 'users' },
      { id: 'audit-log' as AdminRoute, label: 'Audit Log', iconName: 'file' },
    ],
  },
];

export function AdminSidebar({ active, onNav, className = '' }: AdminSidebarProps) {
  return (
    <nav
      className={`flex h-screen w-sidebar flex-col gap-7 border-r border-stroke bg-vault px-4 py-6 ${className}`}
      aria-label="Admin navigation"
    >
      <div className="px-2">
        <div className="flex items-center gap-2">
          <svg
            className="size-[22px] text-gold"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth={2}
          >
            <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
          </svg>
          <span className="font-display text-lg font-bold text-gold">Admin</span>
        </div>
      </div>
      {GROUPS.map((group) => (
        <div key={group.label} className="flex flex-col gap-1">
          <div className="px-3 pb-1.5">
            <span className="font-sans text-[11px] font-semibold uppercase tracking-[0.08em] text-muted">
              {group.label}
            </span>
          </div>
          {group.items.map(({ id, label, iconName }) => {
            const isActive = active === id;
            return (
              <button
                key={id}
                onClick={() => onNav(id)}
                className={`flex h-11 w-full items-center gap-3 rounded-button px-3 text-left transition-colors ${
                  isActive
                    ? 'bg-gold-light font-semibold text-gold'
                    : 'text-body hover:bg-surface hover:text-header'
                }`}
              >
                <span className={isActive ? 'text-gold' : 'text-muted'}>
                  <AdminIcon name={iconName} />
                </span>
                <span className="font-sans text-sm">{label}</span>
              </button>
            );
          })}
        </div>
      ))}
    </nav>
  );
}
