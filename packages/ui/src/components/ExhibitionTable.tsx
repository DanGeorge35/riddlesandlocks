import { Button } from './Button';
import { LevelBadge } from './LevelBadge';
import type { Level } from './LevelBadge';

export type ExhibitionState = 'open' | 'filling' | 'entered' | 'locked';

interface ExhibitionTableProps {
  level: Level;
  title: string;
  entryFeeUsdt: string;
  prizeUsdt: string;
  state: ExhibitionState;
  playersText?: string;
  timeText?: string;
  progressFraction?: number;
  lockReason?: string;
  gameCardPlaysLeft?: number;
  onJoin?: () => void;
  onOpen?: () => void;
  className?: string;
}

export function ExhibitionTable({
  level,
  title,
  entryFeeUsdt,
  prizeUsdt,
  state,
  playersText,
  timeText,
  progressFraction = 0,
  lockReason,
  gameCardPlaysLeft,
  onJoin,
  onOpen,
  className = '',
}: ExhibitionTableProps) {
  const isLocked = state === 'locked';
  const isEntered = state === 'entered';
  const isFilling = state === 'filling';

  return (
    <div
      className={`flex flex-col gap-3 rounded-card border p-4 ${
        isEntered
          ? 'border-gold bg-gold-light/20'
          : isLocked
            ? 'border-stroke bg-surface opacity-80'
            : 'border-stroke bg-surface-2'
      } ${className}`}
    >
      <div className="flex items-center justify-between">
        <LevelBadge level={level} size="small" />
        {state === 'open' && (
          <span className="inline-flex items-center gap-1.5 rounded-chip bg-success/15 px-2.5 py-1 text-xs font-semibold text-success">
            <svg
              className="size-3"
              fill="none"
              stroke="currentColor"
              strokeWidth={2.5}
              viewBox="0 0 24 24"
            >
              <circle cx="12" cy="12" r="10" />
              <polyline points="9 12 11 14 15 10" />
            </svg>
            OPEN
          </span>
        )}
        {state === 'filling' && (
          <span className="inline-flex items-center gap-1.5 rounded-chip bg-warning/15 px-2.5 py-1 text-xs font-semibold text-warning">
            <svg
              className="size-3"
              fill="none"
              stroke="currentColor"
              strokeWidth={2.5}
              viewBox="0 0 24 24"
            >
              <circle cx="12" cy="12" r="10" />
              <line x1="12" y1="8" x2="12" y2="12" />
              <line x1="12" y1="16" x2="12.01" y2="16" />
            </svg>
            FILLING
          </span>
        )}
        {state === 'entered' && (
          <span className="inline-flex items-center gap-1.5 rounded-chip bg-gold/15 px-2.5 py-1 text-xs font-semibold text-gold">
            ENTERED
          </span>
        )}
        {state === 'locked' && (
          <svg
            className="size-5 text-muted"
            fill="none"
            stroke="currentColor"
            strokeWidth={1.75}
            viewBox="0 0 24 24"
          >
            <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
            <path d="M7 11V7a5 5 0 0 1 10 0v4" />
          </svg>
        )}
      </div>

      <h3 className="font-sans text-base font-semibold text-header">{title}</h3>

      <div className="flex gap-3">
        <div className="flex flex-1 flex-col gap-0.5 rounded-button bg-surface px-3 py-2">
          <span className="font-sans text-[11px] font-semibold uppercase tracking-[0.08em] text-muted">
            ENTRY
          </span>
          <span className="font-sans text-base font-semibold text-header">{entryFeeUsdt} USDT</span>
        </div>
        <div className="flex flex-1 flex-col gap-0.5 rounded-button bg-surface px-3 py-2">
          <span className="font-sans text-[11px] font-semibold uppercase tracking-[0.08em] text-muted">
            PRIZE
          </span>
          <span className="font-sans text-base font-semibold text-gold">{prizeUsdt} USDT</span>
        </div>
      </div>

      {(playersText || timeText) && (
        <div className="flex flex-col gap-1.5">
          <div className="flex items-center justify-between font-sans text-xs text-muted">
            <span>{playersText}</span>
            <span>{timeText}</span>
          </div>
          {!isLocked && (
            <div className="h-1.5 w-full rounded-full bg-stroke">
              <div
                className="h-full rounded-full bg-teal transition-all"
                style={{ width: `${Math.round(progressFraction * 100)}%` }}
              />
            </div>
          )}
        </div>
      )}

      {lockReason && (
        <p className="flex items-center gap-1.5 font-sans text-xs text-muted">
          <svg
            className="size-4 shrink-0"
            fill="none"
            stroke="currentColor"
            strokeWidth={1.75}
            viewBox="0 0 24 24"
          >
            <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
            <path d="M7 11V7a5 5 0 0 1 10 0v4" />
          </svg>
          {lockReason}
        </p>
      )}

      {!isLocked && (
        <div className="flex flex-col gap-2">
          {isEntered ? (
            <Button variant="secondary" onClick={onOpen}>
              <svg
                className="size-4"
                fill="none"
                stroke="currentColor"
                strokeWidth={2}
                viewBox="0 0 24 24"
              >
                <circle cx="12" cy="12" r="9" />
                <path d="M9 12.5a1 1 0 0 1 .5-.87l5-2.89a1 1 0 0 1 1.5.87v5.78a1 1 0 0 1-1.5.87l-5-2.89a1 1 0 0 1-.5-.87z" />
              </svg>
              Open riddle
            </Button>
          ) : (
            <>
              <Button variant="primary" onClick={onJoin}>
                <svg
                  className="size-4"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth={2.5}
                  viewBox="0 0 24 24"
                >
                  <line x1="12" y1="5" x2="12" y2="19" />
                  <line x1="5" y1="12" x2="19" y2="12" />
                </svg>
                Join for {entryFeeUsdt} USDT
              </Button>
              {gameCardPlaysLeft != null && gameCardPlaysLeft > 0 && (
                <button className="flex items-center gap-1.5 font-sans text-xs text-teal transition-opacity hover:opacity-80">
                  <svg
                    className="size-3.5"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth={2}
                    viewBox="0 0 24 24"
                  >
                    <rect x="2" y="6" width="20" height="12" rx="2" />
                    <path d="M22 10H2" />
                  </svg>
                  Or use your game card · {gameCardPlaysLeft} plays left
                </button>
              )}
            </>
          )}
        </div>
      )}
    </div>
  );
}
