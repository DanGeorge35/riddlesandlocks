import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';

async function getMe() {
  const cookieStore = await cookies();
  const token = cookieStore.get('access_token')?.value;
  if (!token) return null;
  try {
    const res = await fetch(`${process.env['NEXT_PUBLIC_API_URL']}/auth/me`, {
      headers: { Cookie: `access_token=${token}` },
      cache: 'no-store',
    });
    if (!res.ok) return null;
    return res.json() as Promise<{ username: string; level: string; requiresTerms: boolean }>;
  } catch {
    return null;
  }
}

export default async function LobbyPage() {
  const me = await getMe();
  if (!me) redirect('/sign-in');
  if (me.requiresTerms) redirect('/terms');

  return (
    <main className="flex min-h-screen flex-col bg-vault">
      {/* Mobile header */}
      <header className="flex h-14 items-center justify-between border-b border-stroke bg-vault px-4">
        <div className="flex items-center gap-2">
          <svg
            className="size-6 text-gold"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth={1.75}
          >
            <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
          </svg>
          <span className="font-display text-base font-bold text-gold">Riddle n Lock</span>
        </div>
        <a
          href="/account"
          className="flex size-9 items-center justify-center rounded-full bg-surface text-muted"
        >
          <svg
            className="size-5"
            fill="none"
            stroke="currentColor"
            strokeWidth={1.75}
            viewBox="0 0 24 24"
          >
            <circle cx="12" cy="8" r="4" />
            <path d="M4 20c0-4 3.6-7 8-7s8 3 8 7" />
          </svg>
        </a>
      </header>

      <div className="flex-1 space-y-6 overflow-y-auto px-4 py-6">
        {/* Greeting */}
        <section>
          <p className="text-sm text-muted">Welcome back,</p>
          <h1 className="font-sans text-2xl font-bold text-header">{me.username}</h1>
          <span className="mt-1 inline-flex items-center rounded-chip border border-muted/40 px-3 py-1 text-xs font-semibold uppercase tracking-wide text-muted">
            {me.level}
          </span>
        </section>

        {/* Practice card */}
        <section className="space-y-3 rounded-card border border-stroke bg-surface p-5">
          <div className="flex items-center gap-2">
            <svg
              className="size-5 text-gold"
              fill="none"
              stroke="currentColor"
              strokeWidth={1.75}
              viewBox="0 0 24 24"
            >
              <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
            </svg>
            <h2 className="font-sans text-base font-semibold text-header">Your next step</h2>
          </div>
          <p className="text-sm text-muted">
            Complete the free <strong className="text-body">Practice riddle</strong> to unlock your
            game card and compete in paid rounds.
          </p>
          <a
            href="/play/practice"
            className="inline-flex h-11 items-center justify-center rounded-button bg-gradient-to-r from-gold to-[#F2D27A] px-6 text-sm font-semibold text-vault"
          >
            Start Practice
          </a>
        </section>

        {/* Empty exhibition state */}
        <section>
          <h2 className="mb-3 font-sans text-sm font-semibold uppercase tracking-wide text-muted">
            Today&apos;s Exhibitions
          </h2>
          <div className="space-y-2 rounded-card border border-stroke bg-surface p-6 text-center">
            <svg
              className="mx-auto size-10 text-muted"
              fill="none"
              stroke="currentColor"
              strokeWidth={1.25}
              viewBox="0 0 24 24"
            >
              <rect x="3" y="4" width="18" height="18" rx="2" />
              <path d="M16 2v4M8 2v4M3 10h18" />
            </svg>
            <p className="text-sm text-muted">No tables open yet today.</p>
          </div>
        </section>
      </div>

      {/* Mobile tab bar */}
      <nav className="flex h-[72px] border-t border-stroke bg-vault">
        {[
          {
            href: '/lobby',
            label: 'Lobby',
            active: true,
            icon: 'M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z',
          },
          {
            href: '/play',
            label: 'Play',
            active: false,
            icon: 'M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z',
          },
          {
            href: '/wallet',
            label: 'Wallet',
            active: false,
            icon: 'M21 12V7H5a2 2 0 0 1 0-4h14v4',
          },
          {
            href: '/account',
            label: 'Account',
            active: false,
            icon: 'M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2',
          },
        ].map(({ href, label, active, icon }) => (
          <a
            key={href}
            href={href}
            className={`flex flex-1 flex-col items-center justify-center gap-1 ${active ? 'text-gold' : 'text-muted hover:text-body'}`}
          >
            <svg
              className="size-5"
              fill="none"
              stroke="currentColor"
              strokeWidth={1.75}
              viewBox="0 0 24 24"
            >
              <path d={icon} />
            </svg>
            <span className="text-[10px] font-medium">{label}</span>
            {active && <span className="absolute bottom-0 h-0.5 w-8 rounded-t bg-gold" />}
          </a>
        ))}
      </nav>
    </main>
  );
}
