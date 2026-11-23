'use client';

import { useState, useRef, Suspense } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { apiFetch } from '../../../lib/api';

function VerifyForm() {
  const router = useRouter();
  const params = useSearchParams();
  const email = params.get('email') ?? '';
  const [code, setCode] = useState(['', '', '', '', '', '']);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const inputs = useRef<(HTMLInputElement | null)[]>([]);

  function handleDigit(index: number, value: string) {
    const digit = value.replace(/\D/g, '').slice(-1);
    const next = [...code];
    next[index] = digit;
    setCode(next);
    if (digit && index < 5) inputs.current[index + 1]?.focus();
  }

  function handleKeyDown(index: number, e: React.KeyboardEvent) {
    if (e.key === 'Backspace' && !code[index] && index > 0) {
      inputs.current[index - 1]?.focus();
    }
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    const fullCode = code.join('');
    if (fullCode.length < 6) return;
    setError('');
    setLoading(true);
    try {
      const res = await apiFetch<{ ok: boolean; requiresTerms: boolean }>('/auth/email/verify', {
        method: 'POST',
        body: JSON.stringify({ email, code: fullCode }),
      });
      router.push(res.requiresTerms ? '/terms' : '/lobby');
    } catch (err) {
      setError((err as Error).message);
      setCode(['', '', '', '', '', '']);
      inputs.current[0]?.focus();
    } finally {
      setLoading(false);
    }
  }

  async function resend() {
    setError('');
    try {
      await apiFetch('/auth/email/request', { method: 'POST', body: JSON.stringify({ email }) });
    } catch (err) {
      setError((err as Error).message);
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
          <h1 className="font-sans text-2xl font-bold text-header">Check your email</h1>
          <p className="text-sm text-muted">
            We sent a 6-digit code to <span className="text-body">{email}</span>.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="flex justify-between gap-2">
            {code.map((digit, i) => (
              <input
                key={i}
                ref={(el) => {
                  inputs.current[i] = el;
                }}
                type="text"
                inputMode="numeric"
                maxLength={1}
                value={digit}
                onChange={(e) => handleDigit(i, e.target.value)}
                onKeyDown={(e) => handleKeyDown(i, e)}
                className="h-14 w-12 rounded-input border border-stroke bg-surface text-center font-mono text-xl text-header focus:border-gold focus:outline-none"
              />
            ))}
          </div>

          {error && <p className="text-sm text-error">{error}</p>}

          <button
            type="submit"
            disabled={loading || code.join('').length < 6}
            className="flex h-12 w-full items-center justify-center rounded-button bg-gradient-to-r from-gold to-[#F2D27A] text-sm font-semibold text-vault disabled:opacity-50"
          >
            {loading ? 'Verifying…' : 'Verify code'}
          </button>

          <p className="text-center text-sm text-muted">
            Didn&apos;t receive it?{' '}
            <button type="button" onClick={resend} className="text-gold hover:underline">
              Resend
            </button>
          </p>
        </form>
      </div>
    </main>
  );
}

export default function VerifyPage() {
  return (
    <Suspense>
      <VerifyForm />
    </Suspense>
  );
}
