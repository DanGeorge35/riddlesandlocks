import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  // Seed default EconomySettings (v1)
  const existing = await prisma.economySettings.findUnique({ where: { version: 1 } });
  if (!existing) {
    await prisma.economySettings.create({
      data: {
        version: 1,
        createdBy: 'seed',
        data: {
          // Entry split (§5.1)
          potShareBps: 7000, // 70% → pot
          platformRevenueBps: 1500, // 15% → platform
          gameReserveBps: 1000, // 10% → reserve
          referralHoldBps: 500, // 5% → referral hold

          // Payout (§5.2)
          payoutWinnerBps: 6000, // 60% of pot to winner
          payoutRolloverBps: 4000, // 40% rolls to next riddle

          // Exhibition
          exhibitionMinPlayers: 5,
          exhibitionEntryFeesMicro: [1_000_000n, 2_000_000n, 5_000_000n],

          // Weekly / Legendary seeds (micro-USDT)
          weeklySeedMicro: 50_000_000n,
          legendarySeedMicro: 500_000_000n,

          // Referral
          referralCommissionBps: 500, // 5% of entry fee

          // Withdrawal
          withdrawalMinMicro: 1_000_000n,
          withdrawalMaxMicro: 10_000_000_000n,

          // Game card
          gameCardMaxUsesMicro: 2_000_000n, // up to $2 USDT per card play

          // Piece checks
          pieceChecksPerEntry: 3,
          pieceCheckResetHours: 24,

          // Attempt cooldown
          attemptCooldownMinutes: 5,
          attemptRevealWindowSeconds: 60,
        },
      },
    });
    console.log('EconomySettings v1 seeded');
  }
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(() => void prisma.$disconnect());
