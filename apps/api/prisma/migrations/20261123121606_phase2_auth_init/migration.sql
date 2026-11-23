-- CreateTable
CREATE TABLE `User` (
    `id` VARCHAR(191) NOT NULL,
    `email` VARCHAR(191) NOT NULL,
    `googleSub` VARCHAR(191) NULL,
    `username` VARCHAR(191) NOT NULL,
    `phoneE164` VARCHAR(191) NULL,
    `phoneVerifiedAt` DATETIME(3) NULL,
    `ageConfirmedAt` DATETIME(3) NULL,
    `termsVersion` VARCHAR(191) NULL,
    `countryCode` VARCHAR(191) NULL,
    `level` ENUM('NOVICE', 'APPRENTICE', 'RIDDLER', 'ENIGMATIST', 'MASTER_OF_MINDS') NOT NULL DEFAULT 'NOVICE',
    `exhibitionWinsAtLevel` INTEGER NOT NULL DEFAULT 0,
    `practiceCompleted` BOOLEAN NOT NULL DEFAULT false,
    `gameCardGrantedAt` DATETIME(3) NULL,
    `referralCode` VARCHAR(191) NULL,
    `referredById` VARCHAR(191) NULL,
    `bonusAttempts` INTEGER NOT NULL DEFAULT 0,
    `weeklyLimitMicro` BIGINT NULL,
    `breakUntil` DATETIME(3) NULL,
    `showOnWinnersWall` BOOLEAN NOT NULL DEFAULT true,
    `showWinAmount` BOOLEAN NOT NULL DEFAULT true,
    `allowStory` BOOLEAN NOT NULL DEFAULT false,
    `frozenAt` DATETIME(3) NULL,
    `role` VARCHAR(191) NOT NULL DEFAULT 'PLAYER',
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    UNIQUE INDEX `User_email_key`(`email`),
    UNIQUE INDEX `User_googleSub_key`(`googleSub`),
    UNIQUE INDEX `User_username_key`(`username`),
    UNIQUE INDEX `User_phoneE164_key`(`phoneE164`),
    UNIQUE INDEX `User_referralCode_key`(`referralCode`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `RefreshToken` (
    `id` VARCHAR(191) NOT NULL,
    `userId` VARCHAR(191) NOT NULL,
    `tokenHash` VARCHAR(191) NOT NULL,
    `expiresAt` DATETIME(3) NOT NULL,
    `revoked` BOOLEAN NOT NULL DEFAULT false,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    UNIQUE INDEX `RefreshToken_tokenHash_key`(`tokenHash`),
    INDEX `RefreshToken_userId_idx`(`userId`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Wallet` (
    `id` VARCHAR(191) NOT NULL,
    `userId` VARCHAR(191) NOT NULL,
    `chain` ENUM('POLYGON', 'SOLANA') NOT NULL,
    `address` VARCHAR(191) NOT NULL,
    `tokenAccount` VARCHAR(191) NULL,
    `derivationIdx` INTEGER NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    UNIQUE INDEX `Wallet_address_key`(`address`),
    UNIQUE INDEX `Wallet_userId_chain_key`(`userId`, `chain`),
    UNIQUE INDEX `Wallet_chain_derivationIdx_key`(`chain`, `derivationIdx`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `PayoutVerification` (
    `id` VARCHAR(191) NOT NULL,
    `withdrawalId` VARCHAR(191) NOT NULL,
    `payoutWalletId` VARCHAR(191) NOT NULL,
    `testAmountHash` VARCHAR(191) NOT NULL,
    `testAmountMicro` BIGINT NOT NULL,
    `testTxId` VARCHAR(191) NULL,
    `remainderTxId` VARCHAR(191) NULL,
    `state` VARCHAR(191) NOT NULL,
    `tries` INTEGER NOT NULL DEFAULT 0,
    `testSends` INTEGER NOT NULL DEFAULT 0,
    `expiresAt` DATETIME(3) NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    UNIQUE INDEX `PayoutVerification_withdrawalId_key`(`withdrawalId`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `PayoutWallet` (
    `id` VARCHAR(191) NOT NULL,
    `userId` VARCHAR(191) NOT NULL,
    `chain` ENUM('POLYGON', 'SOLANA') NOT NULL,
    `address` VARCHAR(191) NOT NULL,
    `isPreferred` BOOLEAN NOT NULL DEFAULT false,
    `verifiedAt` DATETIME(3) NOT NULL,
    `holdUntil` DATETIME(3) NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    UNIQUE INDEX `PayoutWallet_userId_chain_key`(`userId`, `chain`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `ReserveSnapshot` (
    `id` VARCHAR(191) NOT NULL,
    `chain` ENUM('POLYGON', 'SOLANA') NOT NULL,
    `reserveMicro` BIGINT NOT NULL,
    `hotMicro` BIGINT NOT NULL,
    `minRequiredMicro` BIGINT NOT NULL,
    `headroomMicro` BIGINT NOT NULL,
    `breakdown` JSON NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `EconomySettings` (
    `id` VARCHAR(191) NOT NULL,
    `version` INTEGER NOT NULL,
    `data` JSON NOT NULL,
    `createdBy` VARCHAR(191) NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    UNIQUE INDEX `EconomySettings_version_key`(`version`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Riddle` (
    `id` VARCHAR(191) NOT NULL,
    `number` INTEGER NOT NULL,
    `title` VARCHAR(191) NOT NULL,
    `story` TEXT NOT NULL,
    `mode` ENUM('PRACTICE', 'EXHIBITION', 'WEEKLY', 'LEGENDARY', 'SPONSORED') NOT NULL,
    `level` ENUM('NOVICE', 'APPRENTICE', 'RIDDLER', 'ENIGMATIST', 'MASTER_OF_MINDS') NULL,
    `status` ENUM('DRAFT', 'IN_REVIEW', 'APPROVED', 'REJECTED', 'SCHEDULED', 'FILLING', 'LIVE', 'SOLVED', 'ROLLED_OVER', 'REFUNDED', 'CLOSED_UNSOLVED', 'PAUSED') NOT NULL DEFAULT 'DRAFT',
    `difficulty` VARCHAR(191) NOT NULL,
    `finalHash` VARCHAR(191) NOT NULL,
    `salt` VARCHAR(191) NOT NULL,
    `answerLength` INTEGER NOT NULL,
    `solutionCipher` LONGBLOB NULL,
    `solverCheck` VARCHAR(191) NULL,
    `startsAt` DATETIME(3) NULL,
    `endsAt` DATETIME(3) NULL,
    `entryFeesMicro` JSON NOT NULL,
    `prizeMicro` BIGINT NULL,
    `minPlayers` INTEGER NULL,
    `potMicro` BIGINT NOT NULL DEFAULT 0,
    `sponsorId` VARCHAR(191) NULL,
    `settingsVersion` INTEGER NOT NULL,
    `winnerEntryId` VARCHAR(191) NULL,
    `solvedAt` DATETIME(3) NULL,
    `rolledFromId` VARCHAR(191) NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    UNIQUE INDEX `Riddle_number_key`(`number`),
    UNIQUE INDEX `Riddle_winnerEntryId_key`(`winnerEntryId`),
    INDEX `Riddle_mode_status_idx`(`mode`, `status`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Piece` (
    `id` VARCHAR(191) NOT NULL,
    `riddleId` VARCHAR(191) NOT NULL,
    `order` INTEGER NOT NULL,
    `category` ENUM('MATHS', 'HISTORY', 'LOGIC', 'CIPHER', 'SOCIAL_CLUE') NOT NULL,
    `title` VARCHAR(191) NOT NULL,
    `question` TEXT NOT NULL,
    `answerHash` VARCHAR(191) NOT NULL,
    `dropAt` DATETIME(3) NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    UNIQUE INDEX `Piece_riddleId_order_key`(`riddleId`, `order`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Entry` (
    `id` VARCHAR(191) NOT NULL,
    `riddleId` VARCHAR(191) NOT NULL,
    `userId` VARCHAR(191) NOT NULL,
    `feeMicro` BIGINT NOT NULL,
    `source` ENUM('USDT', 'GAME_CARD', 'FREE') NOT NULL,
    `attemptsLeft` INTEGER NOT NULL DEFAULT 3,
    `nextAttemptAt` DATETIME(3) NULL,
    `refundedAt` DATETIME(3) NULL,
    `idempotencyKey` VARCHAR(191) NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    UNIQUE INDEX `Entry_idempotencyKey_key`(`idempotencyKey`),
    INDEX `Entry_riddleId_userId_idx`(`riddleId`, `userId`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `PieceProgress` (
    `userId` VARCHAR(191) NOT NULL,
    `pieceId` VARCHAR(191) NOT NULL,
    `solvedAt` DATETIME(3) NULL,
    `checksUsed` INTEGER NOT NULL DEFAULT 0,
    `checksResetAt` DATETIME(3) NULL,
    `notes` TEXT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    PRIMARY KEY (`userId`, `pieceId`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Attempt` (
    `id` VARCHAR(191) NOT NULL,
    `entryId` VARCHAR(191) NOT NULL,
    `commit` VARCHAR(191) NOT NULL,
    `committedAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `revealedAt` DATETIME(3) NULL,
    `result` ENUM('PENDING_REVEAL', 'CORRECT', 'WRONG', 'EXPIRED') NOT NULL DEFAULT 'PENDING_REVEAL',
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    INDEX `Attempt_entryId_idx`(`entryId`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `LedgerLine` (
    `id` VARCHAR(191) NOT NULL,
    `txGroupId` VARCHAR(191) NOT NULL,
    `account` ENUM('USER_AVAILABLE', 'USER_PROMO', 'WITHDRAWAL_PENDING', 'PAYOUT_PENDING', 'REFERRAL_PENDING', 'POT', 'PLATFORM_REVENUE', 'GAME_RESERVE', 'SPONSOR_ESCROW', 'DEPOSIT_CLEARING') NOT NULL,
    `ownerId` VARCHAR(191) NULL,
    `amount` BIGINT NOT NULL,
    `kind` VARCHAR(191) NOT NULL,
    `refType` VARCHAR(191) NULL,
    `refId` VARCHAR(191) NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    INDEX `LedgerLine_account_ownerId_idx`(`account`, `ownerId`),
    INDEX `LedgerLine_txGroupId_idx`(`txGroupId`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `ChainTx` (
    `id` VARCHAR(191) NOT NULL,
    `chain` ENUM('POLYGON', 'SOLANA') NOT NULL,
    `direction` VARCHAR(191) NOT NULL,
    `userId` VARCHAR(191) NULL,
    `hash` VARCHAR(191) NOT NULL,
    `logIndex` INTEGER NULL,
    `fromAddr` VARCHAR(191) NOT NULL,
    `toAddr` VARCHAR(191) NOT NULL,
    `amountMicro` BIGINT NOT NULL,
    `blockNumber` INTEGER NULL,
    `confirmations` INTEGER NOT NULL DEFAULT 0,
    `status` ENUM('DETECTED', 'CONFIRMED', 'FAILED', 'BROADCAST', 'SENT') NOT NULL,
    `ledgerGroupId` VARCHAR(191) NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    UNIQUE INDEX `ChainTx_hash_key`(`hash`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Withdrawal` (
    `id` VARCHAR(191) NOT NULL,
    `userId` VARCHAR(191) NOT NULL,
    `chain` ENUM('POLYGON', 'SOLANA') NOT NULL,
    `kind` VARCHAR(191) NOT NULL,
    `toAddr` VARCHAR(191) NOT NULL,
    `amountMicro` BIGINT NOT NULL,
    `status` VARCHAR(191) NOT NULL,
    `chainTxId` VARCHAR(191) NULL,
    `idempotencyKey` VARCHAR(191) NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    UNIQUE INDEX `Withdrawal_idempotencyKey_key`(`idempotencyKey`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Sponsor` (
    `id` VARCHAR(191) NOT NULL,
    `name` VARCHAR(191) NOT NULL,
    `logoUrl` VARCHAR(191) NOT NULL,
    `url` VARCHAR(191) NOT NULL,
    `terms` TEXT NOT NULL,
    `escrowAddress` VARCHAR(191) NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `SocialClue` (
    `id` VARCHAR(191) NOT NULL,
    `pieceId` VARCHAR(191) NOT NULL,
    `platform` VARCHAR(191) NOT NULL,
    `text` TEXT NOT NULL,
    `imageUrl` VARCHAR(191) NULL,
    `dropAt` DATETIME(3) NOT NULL,
    `status` VARCHAR(191) NOT NULL,
    `postUrl` VARCHAR(191) NULL,
    `archivedAt` DATETIME(3) NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Story` (
    `id` VARCHAR(191) NOT NULL,
    `entryId` VARCHAR(191) NOT NULL,
    `type` VARCHAR(191) NOT NULL,
    `videoUrl` VARCHAR(191) NULL,
    `quote` VARCHAR(191) NULL,
    `status` VARCHAR(191) NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    UNIQUE INDEX `Story_entryId_key`(`entryId`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Notification` (
    `id` VARCHAR(191) NOT NULL,
    `userId` VARCHAR(191) NOT NULL,
    `type` VARCHAR(191) NOT NULL,
    `title` VARCHAR(191) NOT NULL,
    `body` TEXT NOT NULL,
    `readAt` DATETIME(3) NULL,
    `data` JSON NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `NotificationPref` (
    `userId` VARCHAR(191) NOT NULL,
    `type` VARCHAR(191) NOT NULL,
    `push` BOOLEAN NOT NULL,
    `email` BOOLEAN NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    PRIMARY KEY (`userId`, `type`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `OtpCode` (
    `id` VARCHAR(191) NOT NULL,
    `target` VARCHAR(191) NOT NULL,
    `purpose` VARCHAR(191) NOT NULL,
    `codeHash` VARCHAR(191) NOT NULL,
    `expiresAt` DATETIME(3) NOT NULL,
    `tries` INTEGER NOT NULL DEFAULT 0,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    INDEX `OtpCode_target_purpose_idx`(`target`, `purpose`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `AuditLog` (
    `id` VARCHAR(191) NOT NULL,
    `actorId` VARCHAR(191) NOT NULL,
    `action` VARCHAR(191) NOT NULL,
    `target` VARCHAR(191) NULL,
    `before` JSON NULL,
    `after` JSON NULL,
    `ip` VARCHAR(191) NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `RefreshToken` ADD CONSTRAINT `RefreshToken_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `User`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Wallet` ADD CONSTRAINT `Wallet_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `User`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Piece` ADD CONSTRAINT `Piece_riddleId_fkey` FOREIGN KEY (`riddleId`) REFERENCES `Riddle`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Entry` ADD CONSTRAINT `Entry_riddleId_fkey` FOREIGN KEY (`riddleId`) REFERENCES `Riddle`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Attempt` ADD CONSTRAINT `Attempt_entryId_fkey` FOREIGN KEY (`entryId`) REFERENCES `Entry`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
