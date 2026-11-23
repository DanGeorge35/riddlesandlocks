export type TabId = 'lobby' | 'play' | 'wallet' | 'account';

interface Tab {
  id: TabId;
  label: string;
  icon: React.ReactNode;
}

interface MobileTabBarProps {
  active: TabId;
  onTab: (id: TabId) => void;
  className?: string;
}

function LobbyIcon({ active }: { active: boolean }) {
  return (
    <svg
      className={`size-6 ${active ? 'text-gold' : 'text-muted'}`}
      fill="none"
      stroke="currentColor"
      strokeWidth={1.75}
      viewBox="0 0 24 24"
    >
      <rect x="3" y="3" width="7" height="7" rx="1" />
      <rect x="14" y="3" width="7" height="7" rx="1" />
      <rect x="3" y="14" width="7" height="7" rx="1" />
      <rect x="14" y="14" width="7" height="7" rx="1" />
    </svg>
  );
}

function PlayIcon({ active }: { active: boolean }) {
  return (
    <svg
      className={`size-6 ${active ? 'text-gold' : 'text-muted'}`}
      fill="none"
      stroke="currentColor"
      strokeWidth={1.75}
      viewBox="0 0 24 24"
    >
      <circle cx="12" cy="12" r="9" />
      <path d="M9 12.5a1 1 0 0 1 .5-.87l5-2.89a1 1 0 0 1 1.5.87v5.78a1 1 0 0 1-1.5.87l-5-2.89a1 1 0 0 1-.5-.87z" />
    </svg>
  );
}

function WalletIcon({ active }: { active: boolean }) {
  return (
    <svg
      className={`size-6 ${active ? 'text-gold' : 'text-muted'}`}
      fill="none"
      stroke="currentColor"
      strokeWidth={1.75}
      viewBox="0 0 24 24"
    >
      <path d="M20 7H4a2 2 0 0 0-2 2v10a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V9a2 2 0 0 0-2-2z" />
      <path d="M16 11h2v2h-2z" />
      <path d="M4 7V5a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v2" />
    </svg>
  );
}

function AccountIcon({ active }: { active: boolean }) {
  return (
    <svg
      className={`size-6 ${active ? 'text-gold' : 'text-muted'}`}
      fill="none"
      stroke="currentColor"
      strokeWidth={1.75}
      viewBox="0 0 24 24"
    >
      <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
      <circle cx="12" cy="7" r="4" />
    </svg>
  );
}

const TABS: Tab[] = [
  { id: 'lobby', label: 'Lobby', icon: null },
  { id: 'play', label: 'Play', icon: null },
  { id: 'wallet', label: 'Wallet', icon: null },
  { id: 'account', label: 'Account', icon: null },
];

export function MobileTabBar({ active, onTab, className = '' }: MobileTabBarProps) {
  return (
    <nav
      className={`pb-safe flex h-[84px] items-start border-t border-stroke bg-vault pt-2 ${className}`}
      aria-label="Main navigation"
    >
      {(['lobby', 'play', 'wallet', 'account'] as TabId[]).map((id) => {
        const isActive = active === id;
        const labels: Record<TabId, string> = {
          lobby: 'Lobby',
          play: 'Play',
          wallet: 'Wallet',
          account: 'Account',
        };
        return (
          <button
            key={id}
            onClick={() => onTab(id)}
            className="flex flex-1 flex-col items-center gap-1 pt-1 focus:outline-none"
            aria-current={isActive ? 'page' : undefined}
          >
            {id === 'lobby' && <LobbyIcon active={isActive} />}
            {id === 'play' && <PlayIcon active={isActive} />}
            {id === 'wallet' && <WalletIcon active={isActive} />}
            {id === 'account' && <AccountIcon active={isActive} />}
            <span
              className={`font-sans text-xs ${isActive ? 'font-semibold text-gold' : 'text-muted'}`}
            >
              {labels[id]}
            </span>
            {isActive && <div className="mt-0.5 h-0.5 w-6 rounded-full bg-gold" />}
          </button>
        );
      })}
    </nav>
  );
}
