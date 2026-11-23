import { z } from 'zod';

// ─── Auth ──────────────────────────────────────────────────────────────────

export const GoogleAuthDto = z.object({
  idToken: z.string().min(1),
});

export const EmailStartDto = z.object({
  email: z.string().email(),
});

export const EmailVerifyDto = z.object({
  email: z.string().email(),
  code: z.string().length(6),
});

export const AgreeTermsDto = z.object({
  ageConfirmed: z.literal(true),
  termsVersion: z.string().min(1),
});

// ─── Entry ─────────────────────────────────────────────────────────────────

export const CreateEntryDto = z.object({
  feeMicro: z.bigint().positive(),
  source: z.enum(['USDT', 'GAME_CARD', 'FREE']),
});

// ─── Piece Check ───────────────────────────────────────────────────────────

export const PieceCheckDto = z.object({
  entryId: z.string().uuid(),
  answer: z.string().min(1).max(200),
});

// ─── Attempts ──────────────────────────────────────────────────────────────

export const CommitDto = z.object({
  commit: z.string().regex(/^[0-9a-f]{64}$/, 'Must be sha256 hex'),
});

export const RevealDto = z.object({
  answer: z.string().min(1).max(200),
  nonce: z.string().min(1),
});

// ─── Wallet ────────────────────────────────────────────────────────────────

export const DepositAddressDto = z.object({
  chain: z.enum(['POLYGON', 'SOLANA']),
});

export const WithdrawalDto = z.object({
  chain: z.enum(['POLYGON', 'SOLANA']),
  toAddr: z.string().min(1),
  amountMicro: z.bigint().positive(),
  emailCode: z.string().length(6).optional(),
});

export const SavePayoutWalletDto = z.object({
  address: z.string().min(1),
  emailCode: z.string().length(6),
});

// ─── Profile ───────────────────────────────────────────────────────────────

export const UpdateMeDto = z.object({
  username: z.string().min(3).max(30).optional(),
  showOnWinnersWall: z.boolean().optional(),
  showWinAmount: z.boolean().optional(),
  allowStory: z.boolean().optional(),
});

export const SetLimitDto = z.object({
  weeklyLimitMicro: z.bigint().nonnegative().nullable(),
});

// ─── Types ─────────────────────────────────────────────────────────────────

export type GoogleAuthDto = z.infer<typeof GoogleAuthDto>;
export type EmailStartDto = z.infer<typeof EmailStartDto>;
export type EmailVerifyDto = z.infer<typeof EmailVerifyDto>;
export type AgreeTermsDto = z.infer<typeof AgreeTermsDto>;
export type CreateEntryDto = z.infer<typeof CreateEntryDto>;
export type PieceCheckDto = z.infer<typeof PieceCheckDto>;
export type CommitDto = z.infer<typeof CommitDto>;
export type RevealDto = z.infer<typeof RevealDto>;
export type DepositAddressDto = z.infer<typeof DepositAddressDto>;
export type WithdrawalDto = z.infer<typeof WithdrawalDto>;
export type SavePayoutWalletDto = z.infer<typeof SavePayoutWalletDto>;
export type UpdateMeDto = z.infer<typeof UpdateMeDto>;
export type SetLimitDto = z.infer<typeof SetLimitDto>;
