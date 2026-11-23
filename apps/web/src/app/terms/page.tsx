'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { apiFetch } from '../../lib/api';

export default function TermsPage() {
  const router = useRouter();
  const [ageChecked, setAgeChecked] = useState(false);
  const [termsChecked, setTermsChecked] = useState(false);
  const [loading, setLoading] = useState(false);
  const canContinue = ageChecked && termsChecked;

  async function handleAccept() {
    if (!canContinue) return;
    setLoading(true);
    try {
      await apiFetch('/auth/terms/accept', { method: 'POST' });
      router.push('/lobby');
    } catch {
      setLoading(false);
    }
  }

  return (
    <main className="flex min-h-screen flex-col items-center justify-center bg-vault px-4">
      <div className="w-full max-w-sm space-y-8">
        <div className="space-y-1">
          <div className="mb-4 flex size-14 items-center justify-center rounded-full bg-gold-light">
            <svg
              className="size-7 text-gold"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth={1.75}
            >
              <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
            </svg>
          </div>
          <h1 className="font-sans text-2xl font-bold text-header">Before you play</h1>
          <p className="text-sm text-muted">Please confirm the following to continue.</p>
        </div>

        <div className="space-y-4 rounded-card border border-stroke bg-surface p-5">
          <label className="flex cursor-pointer items-start gap-3">
            <div
              role="checkbox"
              aria-checked={ageChecked}
              tabIndex={0}
              onClick={() => setAgeChecked(!ageChecked)}
              onKeyDown={(e) => e.key === ' ' && setAgeChecked(!ageChecked)}
              className={`mt-0.5 flex size-5 shrink-0 items-center justify-center rounded border transition-colors ${
                ageChecked ? 'border-gold bg-gold' : 'border-stroke bg-input'
              }`}
            >
              {ageChecked && (
                <svg
                  className="size-3 text-vault"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth={3}
                  viewBox="0 0 24 24"
                >
                  <polyline points="20 6 9 17 4 12" />
                </svg>
              )}
            </div>
            <span className="text-sm text-body">I am 18 years of age or older.</span>
          </label>

          <label className="flex cursor-pointer items-start gap-3">
            <div
              role="checkbox"
              aria-checked={termsChecked}
              tabIndex={0}
              onClick={() => setTermsChecked(!termsChecked)}
              onKeyDown={(e) => e.key === ' ' && setTermsChecked(!termsChecked)}
              className={`mt-0.5 flex size-5 shrink-0 items-center justify-center rounded border transition-colors ${
                termsChecked ? 'border-gold bg-gold' : 'border-stroke bg-input'
              }`}
            >
              {termsChecked && (
                <svg
                  className="size-3 text-vault"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth={3}
                  viewBox="0 0 24 24"
                >
                  <polyline points="20 6 9 17 4 12" />
                </svg>
              )}
            </div>
            <span className="text-sm text-body">
              I agree to the{' '}
              <a href="/rules" className="text-gold hover:underline">
                Rules &amp; Terms
              </a>
              .
            </span>
          </label>
        </div>

        <button
          onClick={handleAccept}
          disabled={!canContinue || loading}
          className="flex h-12 w-full items-center justify-center rounded-button bg-gradient-to-r from-gold to-[#F2D27A] text-sm font-semibold text-vault disabled:opacity-40"
        >
          {loading ? 'Saving…' : 'Continue to Riddle n Lock'}
        </button>
      </div>
    </main>
  );
}
