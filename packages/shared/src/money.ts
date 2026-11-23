const MICRO = 1_000_000n;

/** Convert a human USDT string (e.g. "1.50") to micro-USDT BigInt. */
export function toMicro(usdt: string): bigint {
  const [whole = '0', frac = ''] = usdt.split('.');
  const paddedFrac = frac.slice(0, 6).padEnd(6, '0');
  return BigInt(whole) * MICRO + BigInt(paddedFrac);
}

/** Format micro-USDT BigInt to a human-readable string with 2 decimal places. */
export function formatUSDT(micro: bigint): string {
  const whole = micro / MICRO;
  const remainder = micro % MICRO;
  const frac = remainder.toString().padStart(6, '0').slice(0, 2);
  return `${whole.toString()}.${frac}`;
}

/** Sum an array of micro-USDT values. */
export function sumMicro(values: bigint[]): bigint {
  return values.reduce((acc, v) => acc + v, 0n);
}

/** Assert a double-entry ledger group sums to zero. Throws if not. */
export function assertBalanced(amounts: bigint[]): void {
  const sum = sumMicro(amounts);
  if (sum !== 0n) {
    throw new Error(`Ledger group unbalanced: sum=${sum}`);
  }
}
