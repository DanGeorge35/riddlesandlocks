'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { apiFetch } from '../../../lib/api';

export default function EmailSignInPage() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError('');
    setLoading(true);
    try {
      await apiFetch('/auth/email/request', {
        method: 'POST',
        body: JSON.stringify({ email }),
      });
      router.push(`/sign-in/verify?email=${encodeURIComponent(email)}`);
    } catch (err) {
      setError((err as Error).message);
    } finally {
      setLoading(false);
    }
  }

  return (
    <main className="flex min-h-screen flex-col items-center justify-center bg-vault px-4">
      <div className="w-full max-w-sm space-y-8">
        <div className="space-y-1">
          <button
            onClick={() => router.back()}
            className="mb-4 flex items-center gap-2 text-sm text-muted hover:text-body"
          >
            <svg
              className="size-4"
              fill="none"
              stroke="currentColor"
              strokeWidth={2}
              viewBox="0 0 24 24"
            >
              <line x1="19" y1="12" x2="5" y2="12" />
              <polyline points="12 19 5 12 12 5" />
            </svg>
            Back
          </button>
          <h1 className="font-sans text-2xl font-bold text-header">Enter your email</h1>
          <p className="text-sm text-muted">We&apos;ll send you a 6-digit code.</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-1.5">
            <label htmlFor="email" className="text-xs font-medium text-body">
              Email address
            </label>
            <input
              id="email"
              type="email"
              required
              autoFocus
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="you@example.com"
              className="h-12 w-full rounded-input border border-stroke bg-surface px-4 text-sm text-header placeholder:text-muted focus:border-gold focus:outline-none"
            />
          </div>

          {error && <p className="text-sm text-error">{error}</p>}

          <button
            type="submit"
            disabled={loading || !email}
            className="flex h-12 w-full items-center justify-center rounded-button bg-gradient-to-r from-gold to-[#F2D27A] text-sm font-semibold text-vault disabled:opacity-50"
          >
            {loading ? 'Sending…' : 'Send code'}
          </button>
        </form>
      </div>
    </main>
  );
}
