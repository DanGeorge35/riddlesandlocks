import type { ReactNode } from 'react';

export type SidebarRoute =
  | 'lobby'
  | 'play'
  | 'legendary'
  | 'wallet'
  | 'referrals'
  | 'winners'
  | 'past-riddles'
  | 'clue-archive'
  | 'practice'
  | 'account'
  | 'notifications'
  | 'rules';

interface NavItem {
  id: SidebarRoute;
  label: string;
  icon: ReactNode;
}

interface DesktopSidebarProps {
  active: SidebarRoute;
  onNav: (route: SidebarRoute) => void;
  className?: string;
}

function NavIcon({ name }: { name: string }) {
  const paths: Record<string, ReactNode> = {
    grid: (
      <>
        <rect x="3" y="3" width="7" height="7" rx="1" />
        <rect x="14" y="3" width="7" height="7" rx="1" />
        <rect x="3" y="14" width="7" height="7" rx="1" />
        <rect x="14" y="14" width="7" height="7" rx="1" />
      </>
    ),
    key: (
      <>
        <path d="M21 2l-2 2m-7.61 7.61a5.5 5.5 0 1 1-7.778 7.778 5.5 5.5 0 0 1 7.777-7.777zm0 0L15.5 7.5m0 0l3 3L22 7l-3-3m-3.5 3.5L19 4" />
      </>
    ),
    crown: (
      <>
        <path d="M2 4l3 12h14l3-12-6 7-4-7-4 7-6-7z" />
      </>
    ),
    wallet: (
      <>
        <path d="M20 7H4a2 2 0 0 0-2 2v10a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V9a2 2 0 0 0-2-2z" />
        <path d="M16 11h2v2h-2z" />
        <path d="M4 7V5a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v2" />
      </>
    ),
    gift: (
      <>
        <polyline points="20 12 20 22 4 22 4 12" />
        <rect x="2" y="7" width="20" height="5" />
        <line x1="12" y1="22" x2="12" y2="7" />
        <path d="M12 7H7.5a2.5 2.5 0 0 1 0-5C11 2 12 7 12 7z" />
        <path d="M12 7h4.5a2.5 2.5 0 0 0 0-5C13 2 12 7 12 7z" />
      </>
    ),
    trophy: (
      <>
        <path d="M6 9H4.5a2.5 2.5 0 0 1 0-5H6" />
        <path d="M18 9h1.5a2.5 2.5 0 0 0 0-5H18" />
        <path d="M4 22h16" />
        <path d="M10 14.66V17c0 .55-.47.98-.97 1.21C7.85 18.75 7 20.24 7 22" />
        <path d="M14 14.66V17c0 .55.47.98.97 1.21C16.15 18.75 17 20.24 17 22" />
        <path d="M18 2H6v7a6 6 0 0 0 12 0V2z" />
      </>
    ),
    book: (
      <>
        <path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20" />
        <path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z" />
      </>
    ),
    megaphone: (
      <>
        <path d="M11 5L6 9H2v6h4l5 4V5z" />
        <path d="M19.07 4.93a10 10 0 0 1 0 14.14" />
        <path d="M15.54 8.46a5 5 0 0 1 0 7.07" />
      </>
    ),
    brain: (
      <>
        <path d="M9.5 2A2.5 2.5 0 0 1 12 4.5v15a2.5 2.5 0 0 1-4.96-.46 2.5 2.5 0 0 1-2.96-3.08 3 3 0 0 1-.34-5.58 2.5 2.5 0 0 1 1.32-4.24 2.5 2.5 0 0 1 1.44-4.14Z" />
        <path d="M14.5 2A2.5 2.5 0 0 0 12 4.5v15a2.5 2.5 0 0 0 4.96-.46 2.5 2.5 0 0 0 2.96-3.08 3 3 0 0 0 .34-5.58 2.5 2.5 0 0 0-1.32-4.24 2.5 2.5 0 0 0-1.44-4.14Z" />
      </>
    ),
    user: (
      <>
        <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
        <circle cx="12" cy="7" r="4" />
      </>
    ),
    bell: (
      <>
        <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9" />
        <path d="M13.73 21a2 2 0 0 1-3.46 0" />
      </>
    ),
    shield: (
      <>
        <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
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

const GROUPS: Array<{
  label: string;
  items: Array<{ id: SidebarRoute; label: string; iconName: string }>;
}> = [
  {
    label: 'PLAY',
    items: [
      { id: 'lobby', label: 'Lobby', iconName: 'grid' },
      { id: 'play', label: 'Play', iconName: 'key' },
      { id: 'legendary', label: 'Legendary', iconName: 'crown' },
    ],
  },
  {
    label: 'MONEY',
    items: [
      { id: 'wallet', label: 'Wallet', iconName: 'wallet' },
      { id: 'referrals', label: 'Referrals', iconName: 'gift' },
    ],
  },
  {
    label: 'COMMUNITY',
    items: [
      { id: 'winners', label: 'Winners Wall', iconName: 'trophy' },
      { id: 'past-riddles', label: 'Past Riddles', iconName: 'book' },
      { id: 'clue-archive', label: 'Clue Archive', iconName: 'megaphone' },
      { id: 'practice', label: 'Practice', iconName: 'brain' },
    ],
  },
  {
    label: 'ACCOUNT',
    items: [
      { id: 'account', label: 'Account', iconName: 'user' },
      { id: 'notifications', label: 'Notifications', iconName: 'bell' },
      { id: 'rules', label: 'Rules & fair play', iconName: 'shield' },
    ],
  },
];

export function DesktopSidebar({ active, onNav, className = '' }: DesktopSidebarProps) {
  return (
    <nav
      className={`flex h-screen w-sidebar flex-col gap-7 border-r border-stroke bg-vault px-4 py-6 ${className}`}
      aria-label="Sidebar navigation"
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
            <path d="M12 2L2 7l10 5 10-5-10-5z" />
            <path d="M2 17l10 5 10-5" />
            <path d="M2 12l10 5 10-5" />
          </svg>
          <span className="font-display text-lg font-bold text-gold">Riddle n Lock</span>
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
                  <NavIcon name={iconName} />
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
