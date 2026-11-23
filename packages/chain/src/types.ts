export type ChainId = 'POLYGON' | 'SOLANA';

export interface DepositAddress {
  chain: ChainId;
  address: string;
  tokenAccount?: string;
  derivationIdx: number;
}

export interface ChainTransfer {
  hash: string;
  fromAddr: string;
  toAddr: string;
  amountMicro: bigint;
  blockNumber?: number;
  logIndex?: number;
  confirmedAt?: Date;
}

export interface SendResult {
  hash: string;
  status: 'BROADCAST' | 'SENT';
}

export interface ChainAdapter {
  readonly chain: ChainId;

  /** Derive the deposit address for user index i (read-only, no key). */
  deriveDepositAddress(index: number): Promise<DepositAddress>;

  /** Watch for USDT transfers to the given addresses. */
  watchDeposits(
    addresses: string[],
    onTransfer: (transfer: ChainTransfer) => Promise<void>,
  ): Promise<void>;

  /** Send USDT from the hot wallet to a target address. */
  sendUsdt(toAddr: string, amountMicro: bigint): Promise<SendResult>;

  /** Get current USDT balance of an address in micro-USDT. */
  getBalance(address: string): Promise<bigint>;

  /** Confirm a transfer has the required confirmation count. */
  getConfirmations(hash: string): Promise<number>;

  /** Sweep USDT from a deposit address to the treasury. */
  sweep(fromAddr: string, amountMicro: bigint): Promise<SendResult>;
}
