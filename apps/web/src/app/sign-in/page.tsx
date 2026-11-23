'use client';

export default function SignInPage() {
  const API = process.env['NEXT_PUBLIC_API_URL'] ?? 'http://localhost:4000/api/v1';

  return (
    <main className="flex min-h-screen flex-col items-center justify-center bg-vault px-4">
      <div className="w-full max-w-sm space-y-8">
        {/* Logo */}
        <div className="flex flex-col items-center gap-3">
          <svg
            className="size-12 text-gold"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth={1.5}
          >
            <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
          </svg>
          <h1 className="font-display text-3xl font-bold text-gold">Riddle n Lock</h1>
          <p className="text-center text-sm text-muted">Solve riddles. Win USDT.</p>
        </div>

        {/* Auth options */}
        <div className="space-y-3">
          <a
            href={`${API}/auth/google`}
            className="flex h-12 w-full items-center justify-center gap-3 rounded-button border border-stroke bg-surface text-sm font-medium text-header transition-colors hover:bg-surface-2"
          >
            <GoogleIcon />
            Continue with Google
          </a>

          <div className="flex items-center gap-3">
            <div className="h-px flex-1 bg-stroke" />
            <span className="text-xs text-muted">or</span>
            <div className="h-px flex-1 bg-stroke" />
          </div>

          <a
            href="/sign-in/email"
            className="flex h-12 w-full items-center justify-center gap-3 rounded-button border border-stroke bg-surface text-sm font-medium text-header transition-colors hover:bg-surface-2"
          >
            <svg
              className="size-5 text-muted"
              fill="none"
              stroke="currentColor"
              strokeWidth={1.75}
              viewBox="0 0 24 24"
            >
              <rect x="2" y="4" width="20" height="16" rx="2" />
              <path d="m2 7 10 7 10-7" />
            </svg>
            Continue with Email
          </a>
        </div>

        <p className="text-center text-xs text-muted">
          By signing in you agree to our{' '}
          <a href="/rules" className="text-gold hover:underline">
            Rules &amp; Terms
          </a>
          .
        </p>
      </div>
    </main>
  );
}

function GoogleIcon() {
  return (
    <svg className="size-5" viewBox="0 0 24 24">
      <path
        fill="#4285F4"
        d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
      />
      <path
        fill="#34A853"
        d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
      />
      <path
        fill="#FBBC05"
        d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
      />
      <path
        fill="#EA4335"
        d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
      />
    </svg>
  );
}
