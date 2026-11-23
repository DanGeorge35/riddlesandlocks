/**
 * FR-PLAY-07: strip everything outside A–Z and 0–9, then uppercase.
 * Used on both server (hash comparison) and client (preview display).
 */
export function normaliseAnswer(raw: string): string {
  return raw.toUpperCase().replace(/[^A-Z0-9]/g, '');
}
