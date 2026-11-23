# Riddle n Lock — Functional Requirements Document (FRD)

|                   |                                                                                                                       |
| ----------------- | --------------------------------------------------------------------------------------------------------------------- |
| **Product**       | Riddle n Lock — skill-based riddle game with USDT prize pots                                                          |
| **Version**       | 1.4 (build spec) — test-payment wallet verification before prize payouts                                              |
| **Date**          | 23 Nov 2026                                                                                                           |
| **Owner**         | Dan George                                                                                                            |
| **Stack**         | Next.js (web) · NestJS (API) · PostgreSQL (SQL) · ethers.js v6 (Polygon USDT) · @solana/kit + SPL Token (Solana USDT) |
| **Design source** | Figma: `https://www.figma.com/design/Q5CV16AxTGDLluGdouC6oS/Riddle-n-Lock`                                            |

---

## 1. Product overview

Riddle n Lock is a skill game. Each riddle locks a USDT prize. Players solve **pieces** (maths, history, logic, cipher, social clue), combine them into a **final answer**, and the first correct solver unlocks the prize.

- Brand: dark mystery with gold — a vault, a treasure hunt, a jackpot.
- Platforms: responsive web app. Mobile (393 design width) and desktop (1440 design width). Every player screen has both.
- Money: USDT on **Polygon PoS or Solana** — the player chooses the network for every deposit and withdrawal. Prizes are paid straight to the player's own wallet. Players log in with Google or email, never see a seed phrase and never pay network fees.
- AI tools are openly allowed. Answers are never stored in plain text after approval.
- Launch market: Nigeria first (WAT, UTC+1). Region blocking for disallowed jurisdictions.

### 1.1 Goals

- A new player can sign up, finish Practice and play their first paid Exhibition in under 10 minutes.
- Every money movement is traceable in an append-only ledger and, for on-chain movements, by transaction hash.
- No hard-coded economics: all fees, prizes, seeds and thresholds come from admin-editable settings.

### 1.2 Out of scope for v1

- Native mobile apps (the web app must be installable as a PWA).
- Tokens other than USDT, chains other than Polygon and Solana.
- Fiat on/off-ramp inside the app (show a Naira estimate only).
- Head-to-head and team riddles.

---

## 2. Glossary

| Term                  | Meaning                                                                                                  |
| --------------------- | -------------------------------------------------------------------------------------------------------- |
| **Riddle**            | A puzzle with a story, 3–6 pieces and one final answer.                                                  |
| **Piece**             | A sub-puzzle with its own answer. Categories: `MATHS`, `HISTORY`, `LOGIC`, `CIPHER`, `SOCIAL_CLUE`.      |
| **Final answer**      | The combined answer that unlocks the prize. Only the final answer can win.                               |
| **Normalised answer** | Answer converted to `A–Z` and `0–9` only, uppercase, no spaces or punctuation.                           |
| **Entry**             | A paid (or free/game-card) ticket to a riddle. Gives 3 final-answer attempts.                            |
| **Attempt**           | One final-answer submission. 5-minute cooldown between attempts.                                         |
| **Piece check**       | A free check of one piece answer, limited per piece per entry.                                           |
| **Mode**              | Practice, Exhibition, Weekly, Legendary, Sponsored.                                                      |
| **Level**             | Player rank: Novice, Apprentice, Riddler, Enigmatist, Master of Minds.                                   |
| **Table**             | One Exhibition riddle instance for one level on one day.                                                 |
| **Pot**               | Prize amount of a Weekly or Legendary riddle. Grows with entries.                                        |
| **Seed**              | Platform-funded starting amount of a pot.                                                                |
| **Game card**         | Non-withdrawable promo credit (2 USD) given to a Novice after first Practice completion.                 |
| **Ledger**            | Append-only table of every balance change. Source of truth for balances.                                 |
| **Commit–reveal**     | Final answer is first _sealed_ (hash committed), then _revealed_; the commit time decides who was first. |
| **WAT**               | West Africa Time, UTC+1. All schedules use WAT.                                                          |

---

## 3. Users, roles and levels

### 3.1 Roles

| Role            | Description                                                                              |
| --------------- | ---------------------------------------------------------------------------------------- |
| **Guest**       | Not signed in. Can browse Landing, How it works, Lobby (read-only), Winners Wall, Rules. |
| **Player**      | Signed in, 18+, accepted terms. Has a level.                                             |
| **Admin**       | Internal staff. Manages riddles, clues, rounds, sponsors, treasury, settings.            |
| **Super admin** | Admin + can change economy settings and treasury wallets.                                |

### 3.2 Levels and progression

| Level               | How it is reached                 | Exhibition entry                     | Exhibition prize | Weekly & Legendary |
| ------------------- | --------------------------------- | ------------------------------------ | ---------------- | ------------------ |
| **Novice**          | Sign up                           | 1 USDT (after Practice is completed) | 5 USDT           | Locked             |
| **Apprentice**      | Win **1** Novice Exhibition       | 2 USDT                               | 10 USDT          | Locked             |
| **Riddler**         | Win **3** Apprentice Exhibitions  | 5 USDT                               | 20 USDT          | **Unlocked**       |
| **Enigmatist**      | Win **5** Riddler Exhibitions     | 10 USDT                              | 50 USDT          | Unlocked           |
| **Master of Minds** | Win **10** Enigmatist Exhibitions | 20 USDT                              | 100 USDT         | Unlocked           |

- **FR-LVL-01** Every new player starts as Novice with `practiceCompleted = false`.
- **FR-LVL-02** A player can only join the Exhibition table of **their own level**. Higher tables are shown **visible but locked** (greyed, padlock, reason text, not clickable). Lower tables are hidden after promotion.
- **FR-LVL-03** Promotion is automatic and immediate when the win count for the current level reaches the threshold. Win counters are per level (`exhibitionWinsAtLevel`). The counter resets to 0 on promotion.
- **FR-LVL-04** Levels never drop.
- **FR-LVL-05** Weekly and Legendary riddles require level ≥ Riddler. For lower levels they are shown locked with the current prize visible and the text "Weekly & Legendary unlock at Riddler".
- **FR-LVL-06** Sponsored riddles are open to every level once `practiceCompleted = true`.
- **FR-LVL-07** On promotion the app shows the **Promotion** celebration screen once, sends a notification and records a `LEVEL_CHANGED` audit event.
- **FR-LVL-08** All thresholds, fees and prizes in the table above are read from `economy_settings`, not hard-coded.
- **FR-LVL-09** Only players at **Riddler or above** get a referral link. Below Riddler the Referrals page shows a locked state: "Reach Riddler to unlock your invite link" (no rates or amounts shown).

---

## 4. Game modes

### 4.1 Practice

- **FR-PRAC-01** Free riddles with no pot, graded Easy / Medium / Hard. Same piece-check and final-answer flow as paid modes, without money.
- **FR-PRAC-02** Practice can be replayed any number of times.
- **FR-PRAC-03** The **first** time a player solves any Practice riddle: set `practiceCompleted = true`, unlock the Novice Exhibition, and show the **Practice Complete {Game Card Reward}** modal.
- **FR-PRAC-04** Practice solves never count toward promotion.

### 4.2 Exhibition (short daily riddle)

- **FR-EXH-01** Every day at 00:00 WAT the system opens **one table per level** (5 tables). Each table has its own riddle. Tables close at 23:59:59 WAT.
- **FR-EXH-02** Entry fee and prize come from settings (defaults in 3.2). The prize is **fixed**.
- **FR-EXH-03** A table needs at least `minPlayers` (default **5**) entries. States:
  - `FILLING` — fewer than `minPlayers` entries. Entrants see "x of 5 players needed". The riddle content stays hidden.
  - `LIVE` — `minPlayers` reached. The riddle is revealed to every entrant at the same moment and answers are accepted. Late entrants can still join until close.
  - `SOLVED` — first correct final answer committed. Prize paid. No more entries.
  - `REFUNDED` — closed while still `FILLING`. Every entry is refunded to its original source (USDT balance or game card play).
  - `CLOSED_UNSOLVED` — closed while `LIVE` and nobody solved it (see open decision OD-04).
- **FR-EXH-04** Winner = first correct final answer by **commit time** (Section 6.4). Each entry gets 3 attempts with a 5-minute cooldown.
- **FR-EXH-05** A player can hold only **one entry per table**. Re-entry after 3 failed attempts is allowed for a new fee.
- **FR-EXH-06** A win increments `exhibitionWinsAtLevel` and may trigger promotion (FR-LVL-03).
- **FR-EXH-07** Novice tables accept payment by **game card play** or USDT balance. Other tables accept USDT balance only.
- **FR-EXH-08** The fixed Exhibition prize goes 100% to the winner. Exhibition **entry fees** do earn referral commission for the entrant's referrer (Section 5.3).

### 4.3 Weekly riddles

- **FR-WK-01** Admin schedules weekly riddles (start, end, entry fee options). Several MAY run in parallel.
- **FR-WK-02** Each weekly pot starts at the **seed** (default **200 USDT**, platform-funded).
- **FR-WK-03** **50%** of every entry fee is added to the pot **at the moment the entry is confirmed** (`potShareOfEntry = 0.5`). The other 50% is platform revenue.
- **FR-WK-04** Entry fee options per round: subset of 1, 2, 5, 10 USDT. Higher fees MAY grant extra free piece checks (setting `extraChecksByFee`).
- **FR-WK-05** If the round ends unsolved, the **whole pot rolls into the next weekly riddle** (added on top of that riddle's seed). The round shows "Rolled over".
- **FR-WK-06** On solve: winner gets **60%** of the internal pot; **40% goes to the game reserve**, which funds future seeds (Section 5.2). There is no referral cut at payout (referrals are paid from entries).
- **FR-WK-07** Players only ever see the **prize** = the amount the winner will receive (60% of the internal pot). The internal pot, the 40% reserve and the entry split are never shown (Section 6.12).

### 4.4 Legendary riddle

- **FR-LEG-01** Exactly one Legendary riddle is live at any time. It has no end date.
- **FR-LEG-02** Seed **500 USDT**. **50%** of every Legendary entry fee is added to the pot as it arrives.
- **FR-LEG-03** It ends only when solved. Payout as FR-WK-06 and display as FR-WK-07. After a solve, admin launches the next Legendary riddle with a new seed funded from the game reserve.

### 4.5 Sponsored riddles

- **FR-SPN-01** Created by admin for a sponsor. Free entry. Open to all levels after Practice.
- **FR-SPN-02** The sponsor funds the **full prize**. The riddle cannot go live until the prize is deposited into the **sponsor escrow** account (on-chain transfer confirmed, ledger credit to `SPONSOR_ESCROW`).
- **FR-SPN-03** Winner receives 100% of the prize. Entry is free, so no referral commission. No platform cut (platform charges the sponsor off-platform).
- **FR-SPN-04** UI uses **Teal** accents and a "Sponsored" chip, never Gold, so it is not mistaken for a player-funded pot. Shows sponsor name, logo, link and sponsor terms.
- **FR-SPN-05** If unsolved at end date, the escrow is returned to the sponsor (or rolled into a new sponsored riddle if the sponsor agrees — admin action).

---

## 5. Economy rules and formulas

All amounts are stored as **integer micro-USDT** (`BIGINT`, 6 decimals, 1 USDT = 1,000,000). Never use floats for money.

### 5.1 Entry split (internal only — never shown to players)

```
on paid entry confirmed (USDT, any mode):
  referral        = entrant has an eligible referrer ? floor(entryFee * referralRate(entryFee)) : 0   // 5.3
  potIncrement    = mode in (WEEKLY, LEGENDARY) ? floor(entryFee * potShareOfEntry) : 0             // default 0.5
  platformRevenue = entryFee - potIncrement - referral
  pot.amount     += potIncrement
```

Referral commission comes out of the platform's share, so it never reduces the pot.
Example (Weekly, referred player, 5 USDT entry): pot +2.50, referrer +0.50, platform +2.00.

### 5.2 Solve payout (Weekly, Legendary) and what players see

```
displayedPrize = floor(pot * payoutWinner)          // payoutWinner = 0.60  -> the ONLY number players see
on solve:
  winner      = displayedPrize
  gameReserve = pot - winner                        // 40% + rounding remainder -> GAME_RESERVE
```

Seeds: the admin enters the **starting prize players should see** (Legendary 500, Weekly 200). The internal pot is
opened at `startingPrize / payoutWinner` (833.33 / 333.33), funded from `GAME_RESERVE`, so the displayed prize
starts at exactly 500 / 200 and is always 60% of the internal pot. (See OD-09 for the alternative.)
Example: internal pot 1,284.50 → players see prize **770.70 USDT** → winner receives 770.70, reserve +513.80.
Rolled-over weekly pots move whole (internal pot) into the next weekly riddle.

### 5.3 Referral commission (from entries)

- Paid on **every paid USDT entry** (Exhibition, Weekly, Legendary) made by a **direct** invitee, for as long as the
  referrer is eligible. Not paid on game-card plays, free/sponsored entries or practice.
- The referrer must be **Riddler or above at the time of the entry**. Invitees can be any level.

```
referralRate(entryFee):            // tiers are rows in EconomySettings.referralTiers, editable in admin
  entryFee <  50 USDT  -> 10%
  entryFee < 100 USDT  ->  5%
  entryFee >= 100 USDT ->  2.5%
```

- **FR-REF-06 Tiers are editable** by a Super admin in _Game Economy Settings_: add/remove rows, change the upper bound and
  rate of each row, change the minimum referrer level. Rules: bounds strictly increasing, last row open-ended, rates 0–20%.
  Saving creates a new settings version; entries use the version of the round they belong to.
- **FR-REF-07 Rewards are held until the game ends.** On entry the commission moves to `REFERRAL_PENDING`
  (owner = referrer, ref = entry). It is settled when the round/table reaches a final state:
  - round/table **finished normally** (`SOLVED`, `ROLLED_OVER`, `CLOSED_UNSOLVED`) → pending → referrer `USER_AVAILABLE`;
  - round/table **cancelled or refunded** (`REFUNDED`, admin cancel) → pending → the **entrant**, as part of their refund;
  - referrer account **frozen/flagged for referral abuse** at settlement → pending → entrant (entry fee portion returned) and logged for review.
- Legendary has no end date (by design), so its pending referral rewards settle only when it is solved. The referrer sees them as pending until then.
- Player view: the referrer sees "Pending rewards" (amount only) and "Earned"; nothing about why or how it settles.

### 5.4 Exhibition

```
on table SOLVED: winner += prize (fixed, from settings)
on table REFUNDED: each entry refunded to its source (commission reversed)
```

Break-even per table at default min 5 players: Novice 5×1 = 5 = prize; Apprentice 5×2 = 10; Riddler 5×5 = 25 > 20; Enigmatist 50 = 50; Master 100 = 100.

### 5.5 Game card

- **FR-ECO-01** Value 2 USD = 2 Novice Exhibition plays. Granted once per person on first Practice completion, **only after phone verification** (one phone number per account).
- **FR-ECO-02** Card credit is a separate balance type (`PROMO`). It cannot be withdrawn, transferred or used outside Novice Exhibition.
- **FR-ECO-03** Winnings from a game-card play are normal withdrawable USDT.
- **FR-ECO-04** A refunded game-card play returns the play to the card, not USDT.

### 5.6 Settings (all editable by Super admin, versioned)

`legendaryStartingPrize=500`, `weeklyStartingPrize=200`, `potShareOfEntry=0.5`, `payoutWinner=0.60` (rest to game reserve), `referralTiers=[{below:50,rate:0.10},{below:100,rate:0.05},{below:null,rate:0.025}]`, `referralMinLevel=RIDDLER`, `payoutTest={percent:0.02, min:0.10, max:25, randomCents:true, maxTries:5, maxTestSends:3, expiryHours:72, verifyEveryPayout:false, verifyWithdrawalAbove:20}`, `exhibition[level]={fee, prize, minPlayers=5, winsToPromote}`, `gameCard={value=2, plays=2, requirePhone=true}`, `attemptsPerEntry=3`, `attemptCooldownSec=300`, `pieceChecksPerEntry=5`, `pieceCheckResetHours=6`, `largeWithdrawalThreshold=200`, `minDeposit=1`, `minWithdrawal=5`.

- **FR-ECO-06** Settings changes apply to **new** rounds/tables only. A round stores a snapshot of the settings it started with (`settings_version_id`).

---

## 6. Functional requirements by module

### 6.1 Authentication and onboarding

| ID         | Requirement                                                                                                                                                                                                                                                                    |
| ---------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| FR-AUTH-01 | Sign in with **Google OAuth** or **email one-time code** (6 digits, 10-minute expiry, max 5 tries, resend after 45 s).                                                                                                                                                         |
| FR-AUTH-02 | First sign-in creates the user, a **Polygon** deposit address (Section 10) and level Novice. The **Solana** deposit address is created the first time the player selects Solana on the Deposit screen (saves the one-off token-account cost for players who never use Solana). |
| FR-AUTH-03 | Before any play: **Age & Terms** screen. Both checkboxes ("I am 18 or older", "I agree to the Rules and Terms") required; button disabled until both ticked. Store `ageConfirmedAt`, `termsVersionAccepted`.                                                                   |
| FR-AUTH-04 | **Region check** at sign-up and on every money action using IP geolocation. Blocked countries (setting) see "Region Not Available".                                                                                                                                            |
| FR-AUTH-05 | Sessions: short-lived JWT access token (15 min) + rotating refresh token (30 days) in `httpOnly`, `Secure`, `SameSite=Lax` cookies.                                                                                                                                            |
| FR-AUTH-06 | **Intro**: first visit plays the cinematic intro (Rive/Lottie, < 300 KB, muted by default, Skip always visible). Returning visitors land on the final frame. `prefers-reduced-motion` shows the static frame.                                                                  |
| FR-AUTH-07 | Invite links `/r/{code}` set a 30-day referral cookie and show the **Invite Landing {Friend View}**. Referrer is fixed at account creation and cannot be changed.                                                                                                              |
| FR-AUTH-08 | Phone verification (SMS OTP) is required to claim the game card and for withdrawals above the large-withdrawal threshold. One verified phone per account.                                                                                                                      |

### 6.2 Profile, levels and progress

| ID         | Requirement                                                                                                                        |
| ---------- | ---------------------------------------------------------------------------------------------------------------------------------- |
| FR-PROF-01 | Username: 3–20 chars, `a–z 0–9 . _`, unique, editable once every 30 days. Real names are never shown publicly.                     |
| FR-PROF-02 | **Levels & Progress** page shows all five levels, requirement, unlocks, current level and progress bar ("1 of 3 Apprentice wins"). |
| FR-PROF-03 | The level badge appears in the Lobby header, Account and on Winners Wall cards.                                                    |

### 6.3 Lobby

| ID        | Requirement                                                                                                                                                                                               |
| --------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| FR-LOB-01 | Lobby content depends on level and state: **Guest**, **Novice (Practice not done)**, **Novice/Apprentice**, **Riddler+**. Match Figma frames `Lobby {…}`.                                                 |
| FR-LOB-02 | Sections: greeting + level badge, level card (next step + progress), Today's Exhibition tables, Sponsored riddle card (if any), Legendary hero, Live weekly riddles, Recent winners, Next clue countdown. |
| FR-LOB-03 | Locked items are visible with padlock and reason; never clickable.                                                                                                                                        |
| FR-LOB-04 | Empty wallet shows a Warning notice "Your wallet is empty. Add USDT to enter a riddle." with Deposit link. No live riddles shows the empty state with countdown and "Turn on alerts".                     |
| FR-LOB-05 | Prizes, countdowns and player counts update live (WebSocket/SSE, Section 8.3). Skeleton loading state while fetching.                                                                                     |

### 6.4 Riddles, pieces and play

| ID         | Requirement                                                                                                                                                                                                                                                                                                                                                                                                                                               |
| ---------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| FR-PLAY-01 | **Riddle Detail {Not Entered}**: title, chips, **prize** (winner amount, FR-WK-07), countdown, info rows (entry fee, attempts per entry, players), blurred story preview with padlock, CTA "Enter for X USDT". No percentages.                                                                                                                                                                                                                            |
| FR-PLAY-02 | **Entry flow**: (fee bottom sheet if multiple fees) → **Review & Confirm** (riddle, entry fee, network fee "Free", balance after, non-refundable checkbox — no "adds to pot" or split) → Processing → Success pop-up. Insufficient balance → Error pop-up with Deposit.                                                                                                                                                                                   |
| FR-PLAY-03 | Entry debit is atomic: ledger debit, entry row and pot increment happen in **one DB transaction**. Idempotency key required on the request.                                                                                                                                                                                                                                                                                                               |
| FR-PLAY-04 | **Workspace**: story, attempts meter, list of pieces with states `LOCKED`, `AVAILABLE`, `CHECKING`, `CORRECT`, `WRONG`, `LIMIT_REACHED`. Desktop uses the 3-column focus layout (320 / flexible / 360), no sidebar.                                                                                                                                                                                                                                       |
| FR-PLAY-05 | **Piece check**: free, `pieceChecksPerEntry` per piece (default 5). Server normalises the input and compares against the piece hash. When the limit is hit, the piece is `LIMIT_REACHED` and resets after `pieceCheckResetHours` (default 6 h). Correct pieces stay correct and show a copy button.                                                                                                                                                       |
| FR-PLAY-06 | **Notes** per piece are saved privately per user (autosave, max 2,000 chars).                                                                                                                                                                                                                                                                                                                                                                             |
| FR-PLAY-07 | **Answer normalisation** (same code on client and server, in `packages/shared`): uppercase, remove everything except `A–Z` and `0–9`. Client shows a live preview "What we'll check: …" and a character counter.                                                                                                                                                                                                                                          |
| FR-PLAY-08 | **Final answer — commit–reveal**: (1) client generates a random 32-byte `nonce`, sends `commit = SHA-256(normalised + ":" + nonce + ":" + entryId)`; server stores it with server timestamp → UI step "Sealing your answer" done. (2) client sends `normalised` + `nonce`; server verifies the commit, then checks the answer → step "Revealing it safely". The **commit timestamp** decides who was first. Reveal must arrive within 60 s of the commit. |
| FR-PLAY-09 | Each attempt consumes 1 of 3. Wrong → Error pop-up "That's not the key" with attempts left and cooldown. Cooldown (`attemptCooldownSec`, default 300 s) disables the button with a live countdown.                                                                                                                                                                                                                                                        |
| FR-PLAY-10 | Out of attempts → warning card with "Re-enter for X USDT" (new entry, 3 new attempts, solved pieces stay solved) and "Watch the pot".                                                                                                                                                                                                                                                                                                                     |
| FR-PLAY-11 | **Solve**: in one transaction with `SELECT … FOR UPDATE` on the riddle row: verify status is `LIVE`, mark `SOLVED`, set `winnerEntryId`, write payout ledger lines (Section 5.2), queue the on-chain-free internal credit. Other players get the **Someone Else Won** pop-up in real time.                                                                                                                                                                |
| FR-PLAY-12 | **Win** flow: Win {Celebration} (unverified wallet → _Verify your wallet_ flow, 10.6.1; verified wallet → "Sending to your Polygon wallet…" → "Sent to your wallet") → Win Receipt (riddle, **amount won**, date, network, wallet address shortened, tx hash + explorer link: Polygonscan or Solscan) → Share Your Story. The receipt shows no pot total, percentages or split.                                                                           |
| FR-PLAY-13 | **Round end unsolved** (Weekly): "Rolled over" screen, then Solution Reveal becomes available.                                                                                                                                                                                                                                                                                                                                                            |
| FR-PLAY-14 | **Solution Reveal** is published after a riddle closes: each piece answer + explanation, assembly order, final answer. Requires admin to store a separate, encrypted solution write-up (the plaintext answer itself is deleted at approval, Section 6.15).                                                                                                                                                                                                |
| FR-PLAY-15 | All riddle content (story, pieces) for paid modes is only returned by the API to players holding an entry (and, for Exhibition, only once the table is `LIVE`).                                                                                                                                                                                                                                                                                           |

### 6.5 Social clues

| ID         | Requirement                                                                                                                                                                                                            |
| ---------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| FR-CLUE-01 | A piece of category `SOCIAL_CLUE` is `LOCKED` until its scheduled drop time; the UI shows platform, drop time, countdown, "Follow @riddlenlock" and an "Alert me when it drops" toggle.                                |
| FR-CLUE-02 | At drop time a job posts the clue to the configured platform (X first; Instagram/TikTok via admin-uploaded manual post if no API), unlocks the piece, sends notifications and shows the toast "New clue just dropped". |
| FR-CLUE-03 | 24 h after the drop, the clue is copied into the in-app **Clue Archive** (image + text).                                                                                                                               |
| FR-CLUE-04 | Failed posts show `FAILED` in the Clue Schedule with "Retry post". The piece still unlocks in-app on time.                                                                                                             |

### 6.6 Wallet

| ID        | Requirement                                                                                                                                                                                                                                                                                                                                                                                                               |
| --------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| FR-WAL-01 | **Balance** = sum of ledger lines for account `USER_AVAILABLE`. Show USDT big with decimals small, and a ≈ ₦ estimate (rate from a cached FX feed, refreshed hourly, marked as an estimate).                                                                                                                                                                                                                              |
| FR-WAL-02 | Separate display of **game card** plays left (`USER_PROMO`).                                                                                                                                                                                                                                                                                                                                                              |
| FR-WAL-03 | Transactions list with filters All / Entries / Winnings / Referrals; each row has icon, title, subtitle (riddle or network + date), signed amount (green + for money in) and status chip.                                                                                                                                                                                                                                 |
| FR-WAL-04 | **Deposit**: network picker **Polygon                                                                                                                                                                                                                                                                                                                                                                                     | Solana** (remembers the last choice). Shows that network's deposit address (QR + copy + share), network chip, warning "Send only USDT on the {network} network. Other tokens or networks may be lost.", minimum deposit 1 USDT. Both networks credit the same single balance.                                                                                                                                                                                                    |
| FR-WAL-05 | Deposit detection: watcher credits after `confirmations ≥ 30` (setting). States: `DETECTED` (toast + Pending row "confirming…") → `CONFIRMED` (Success pop-up "X USDT added"). Deposits below minimum are credited but flagged; non-USDT tokens are ignored (shown in support only).                                                                                                                                      |
| FR-WAL-06 | **Withdraw**: network picker **Polygon                                                                                                                                                                                                                                                                                                                                                                                    | Solana**, amount (with Max), destination address (prefilled with the player's saved payout wallet for that network; paste allowed). Validation per network: Polygon = EVM checksum, not a contract, not one of our deposit addresses; Solana = valid base58 public key on the ed25519 curve (not a token account or program), not one of our deposit addresses. "Network fee: covered". Continue disabled until valid. Error "This doesn't look like a valid {network} address." |
| FR-WAL-07 | Withdraw review → confirm. Above `largeWithdrawalThreshold` require email code **and** verified phone ("Security check").                                                                                                                                                                                                                                                                                                 |
| FR-WAL-08 | On confirm: ledger moves amount `USER_AVAILABLE → WITHDRAWAL_PENDING`, job sends USDT from the hot wallet, stores tx hash; on success → `WITHDRAWN`, Success pop-up with hash in dashed box; on failure → reverse the hold and notify.                                                                                                                                                                                    |
| FR-WAL-10 | **Payout wallets**: in Account → Payout wallet the player saves their own USDT wallet address for Polygon and/or Solana and picks a **preferred payout network**. Saving or changing an address requires an email code; after a change, payouts to the new address are held for 24 h (anti-takeover). Our own deposit addresses and known exchange-deposit patterns are rejected with a warning to use a personal wallet. |
| FR-WAL-11 | **Prize payouts go on-chain automatically** to the saved payout wallet on the preferred network (Section 10.6). If the player has no payout wallet yet, the prize is credited to their in-app balance and they see "Add a payout wallet to receive your prize"; it pays out as soon as they add one (or they can spend/withdraw it normally). Referral rewards and refunds stay in the in-app balance.                    |
| FR-WAL-09 | Withdrawals are blocked while a player is in self-exclusion only if a setting says so (default: withdrawals always allowed).                                                                                                                                                                                                                                                                                              |

### 6.7 Referrals

| ID        | Requirement                                                                                                                                                                                                                                                                                     |
| --------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| FR-REF-01 | Players at **Riddler or above** get a referral code and link `riddlenlock.com/r/{CODE}` with copy and share (WhatsApp, X, Telegram, copy). The code is created on promotion to Riddler. Below Riddler: locked state (FR-LVL-09).                                                                |
| FR-REF-02 | Stats: friends joined, friends playing, **pending rewards** and **total earned** (amounts only). List of invited friends with status chip (Playing / Not played) and amount earned from each. No rates, percentages or formulas anywhere in the player UI.                                      |
| FR-REF-03 | Referrer earns a commission on every paid entry by a **direct** invitee (Section 5.3). One level only. Held as **pending** until the game ends (FR-REF-07), then released automatically; shown as a "Referral reward" transaction (Pending → Successful) with the amount and friend's username. |
| FR-REF-04 | Player-facing copy (example): "Invite friends and earn a reward every time they play." Never state the rate. (The v1.0 bonus-attempt reward is removed.)                                                                                                                                        |
| FR-REF-05 | Self-referral and referral loops are blocked (same device fingerprint, phone, payout address or IP subnet within 30 days → no reward, flagged for review).                                                                                                                                      |

### 6.8 Community

| ID        | Requirement                                                                                                                                                                                                    |
| --------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| FR-COM-01 | **Winners Wall**: grid of winner cards — username or "Anonymous solver", level badge, amount, riddle, date, optional video thumbnail or quote, "Verified on-chain" link. Filters All / This month / Legendary. |
| FR-COM-02 | **Share Your Story** after a win: video (≤ 30 s, admin-moderated), quote (≤ 280 chars), or anonymous (default). Toggle "Show my username".                                                                     |
| FR-COM-03 | **Past Riddles** with filters All / Solved / Rolled over and "See solution".                                                                                                                                   |
| FR-COM-04 | **Clue Archive** (FR-CLUE-03). **Practice Mode** list with difficulty chips.                                                                                                                                   |

### 6.9 Notifications

| ID        | Requirement                                                                                                                                                                                                                                                           |
| --------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| FR-NOT-01 | Channels: in-app inbox, web push (PWA), email. Per-type toggles: New clue dropped, Riddle ending soon (2 h before, entered riddles only), Pot passed a milestone (1k/5k/10k), You won (always on), Friend joined, Exhibition table is live, Table refunded, Level up. |
| FR-NOT-02 | Inbox grouped Today / Earlier with unread dots. Bell shows a red dot when unread > 0.                                                                                                                                                                                 |

### 6.10 Account, privacy and responsible play

| ID        | Requirement                                                                                                                                                                                                                                                                                                                                                                                                                           |
| --------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| FR-ACC-01 | Account menu: Profile, Privacy, Notifications, Play limits, Your level, Rules & fair play, Help & support, Terms, Log out.                                                                                                                                                                                                                                                                                                            |
| FR-ACC-02 | **Privacy** toggles: Show username on Winners Wall (default on), Show win amount (default on), Allow story to be shared (default off). Wallet addresses and real names are never public.                                                                                                                                                                                                                                              |
| FR-ACC-03 | **Play limits**: weekly entry limit in USDT (decrease takes effect immediately, increase after 24 h). **Take a break**: 24 h / 7 days / 30 days — blocks new entries; withdrawals still allowed.                                                                                                                                                                                                                                      |
| FR-ACC-04 | **Rules & Fair Play** page explains what a player can do and win: answer checking (in plain words), attempts and cooldowns, AI allowed, prizes shown are what the winner receives, unsolved weekly prizes carry over, Legendary, Weekly, Levels, Exhibition, game card, Sponsored, referral rewards (no rates). It never describes splits, reserves, sweeps or wallets. CMS-editable; legal terms live in the Terms page (see OD-11). |
| FR-ACC-05 | Account deletion request: freezes the account, pays out the remaining balance to a verified address, anonymises personal data after legal retention period.                                                                                                                                                                                                                                                                           |

### 6.11 Admin (desktop only)

| ID        | Requirement                                                                                                                                                                                                                                                                                                                                   |
| --------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| FR-ADM-01 | Admin sidebar groups: RIDDLES (Review queue, Live rounds, Archive), CLUES (Clue schedule), MONEY (Treasury, Payouts), SYSTEM (Workflows, Game economy, Settings). Separate admin login with mandatory 2FA (TOTP).                                                                                                                             |
| FR-ADM-02 | **Review queue**: AI-generated riddles with ID, title, pieces, difficulty, solver check (Passed/Failed), created time, actions.                                                                                                                                                                                                               |
| FR-ADM-03 | **Riddle generation pipeline** (Workflows): an LLM generates a riddle JSON (story, pieces, answers, explanations, social clue posts). A second, independent model solves it without the answers; result stored as `solverCheck` (`PASSED` if its normalised final answer matches).                                                            |
| FR-ADM-04 | **Review Riddle {Detail}**: full story and pieces on the left; answers, final answer (mono), solver result, answer length + strength meter, scheduled clues on the right. Actions: Approve & lock, Regenerate, Reject. Warning "After approval, the plain answer is deleted. Only its hash is kept."                                          |
| FR-ADM-05 | **Approve & lock** (confirm pop-up): compute and store `HMAC-SHA256(pepper, riddleSalt + normalised)` for every piece and the final answer, encrypt the solution write-up with a key that is only released at riddle close (KMS), delete plaintext answers, set status `APPROVED`. Irreversible. Requires 2 admins for Legendary (four-eyes). |
| FR-ADM-06 | Assign approved riddles to a mode and schedule: Exhibition (level + date), Weekly (start/end/fees), Legendary, Sponsored (sponsor + escrow).                                                                                                                                                                                                  |
| FR-ADM-07 | **Live rounds**: stat tiles (total pots, entries today, players, avg solve time) and a rounds table with pot, entries, ends in, status, Manage. Manage allows pause (incident only, logged with reason) and extend end time.                                                                                                                  |
| FR-ADM-08 | **Clue schedule**: week strip + table (platform, riddle/piece, drop time, status Scheduled/Posted/Archived/Failed, action).                                                                                                                                                                                                                   |
| FR-ADM-09 | **Treasury**: per network (Polygon, Solana) hot/cold/gas balances and **Reserve health** (Section 10.7), game-fee wallet balance, paid to winners, referral commissions paid, game reserve balance, internal pot vs displayed prize per round, payouts table with tx links.                                                                   |
| FR-ADM-10 | **Game economy settings** (Super admin): every value in 5.6, Exhibition table per level, game card rules, winner share / game reserve, referral tiers and minimum level, sponsored rules. Saving creates a new settings version; audit logged.                                                                                                |
| FR-ADM-11 | **Sponsors**: create sponsor (name, logo, URL, terms), create sponsored riddle, show escrow deposit address and status; go-live is blocked until escrow is confirmed.                                                                                                                                                                         |
| FR-ADM-12 | **Users**: search, view ledger, level, flags; adjust level (with reason); freeze/unfreeze; manual ledger adjustment requires two admins.                                                                                                                                                                                                      |
| FR-ADM-13 | Every admin action is written to `audit_log` (who, what, before/after, IP, time).                                                                                                                                                                                                                                                             |

### 6.12 Information boundary — what players can and cannot see

Players see **amounts and outcomes only**. They never see how money is calculated, split or moved.

| ID        | Requirement                                                                                                                                                                                                                                                                                                                                                                                                  |
| --------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| FR-VIS-01 | **Visible to players:** entry fee, prize (amount the winner receives), their balance, amounts they won, referral rewards they earned (amount + friend), refunds, deposit/withdrawal amounts and their own tx hashes, countdowns, player counts.                                                                                                                                                              |
| FR-VIS-02 | **Never visible to players** (UI, API responses, error messages, notifications, emails, page source, analytics events sent to third parties): internal pot, pot share of entries, winner %, game reserve, platform revenue, referral rates/tiers, seeds/starting-pot mechanics, sweeps, treasury/hot/cold wallet addresses or balances, ledger account names, settings versions, solver checks, fraud flags. |
| FR-VIS-03 | **Separate DTOs.** Player endpoints return purpose-built response DTOs (e.g. `PublicRiddleDto { id, number, title, prizeMicro, endsAt, players, status }`) mapped with an explicit allow-list. Never serialise Prisma models directly. Admin DTOs live in a separate `admin` namespace and are only served under `/admin/*`.                                                                                 |
| FR-VIS-04 | **Computation stays on the server.** Prize, commission and payout are calculated in the API (`packages/shared` holds only display helpers such as `formatUSDT`; economy formulas live in `apps/api/src/economy`, never in `apps/web` or any client bundle).                                                                                                                                                  |
| FR-VIS-05 | **Errors are generic for players** (`INSUFFICIENT_BALANCE`, `RIDDLE_SOLVED`, `TEMPORARY_ISSUE`) and never leak stack traces, account names or internal states. Detailed reasons are logged server-side with a correlation ID shown to the player for support.                                                                                                                                                |
| FR-VIS-06 | **Copy review.** Player-facing copy uses plain outcome language ("Prize", "You won", "Referral reward", "Refunded"). Words like pot share, split, reserve, sweep, ledger, treasury, %, commission rate are banned in player copy; a lint check scans `apps/web/messages/*.json` for them.                                                                                                                    |
| FR-VIS-07 | **Code comments are for engineers.** Economy, ledger, payout and chain code MUST carry clear comments explaining the business rule and FRD ID (e.g. `// FR-WK-06: winner gets payoutWinner of internal pot; remainder -> GAME_RESERVE`). The web build strips comments and source maps are not publicly served in production.                                                                                |

---

## 7. Data model (PostgreSQL via Prisma)

Money columns are `BigInt` micro-USDT. All tables have `createdAt`, `updatedAt`. IDs are UUID v7 (`String @id @default(uuid(7))`).

```prisma
enum Level        { NOVICE APPRENTICE RIDDLER ENIGMATIST MASTER_OF_MINDS }
enum Mode         { PRACTICE EXHIBITION WEEKLY LEGENDARY SPONSORED }
enum RiddleStatus { DRAFT IN_REVIEW APPROVED REJECTED SCHEDULED FILLING LIVE SOLVED ROLLED_OVER REFUNDED CLOSED_UNSOLVED PAUSED }
enum PieceCategory{ MATHS HISTORY LOGIC CIPHER SOCIAL_CLUE }
enum EntrySource  { USDT GAME_CARD FREE }
enum AttemptResult{ PENDING_REVEAL CORRECT WRONG EXPIRED }
enum LedgerAccount{ USER_AVAILABLE USER_PROMO WITHDRAWAL_PENDING PAYOUT_PENDING REFERRAL_PENDING POT PLATFORM_REVENUE GAME_RESERVE SPONSOR_ESCROW DEPOSIT_CLEARING }
enum TxStatus     { DETECTED CONFIRMED FAILED BROADCAST SENT }

model User {
  id                 String   @id @default(uuid(7))
  email              String   @unique
  googleSub          String?  @unique
  username           String   @unique
  phoneE164          String?  @unique
  phoneVerifiedAt    DateTime?
  ageConfirmedAt     DateTime?
  termsVersion       String?
  countryCode        String?
  level              Level    @default(NOVICE)
  exhibitionWinsAtLevel Int   @default(0)
  practiceCompleted  Boolean  @default(false)
  gameCardGrantedAt  DateTime?
  referralCode       String?  @unique        // created on promotion to Riddler (FR-REF-01)
  referredById       String?
  bonusAttempts      Int      @default(0)
  weeklyLimitMicro   BigInt?
  breakUntil         DateTime?
  showOnWinnersWall  Boolean  @default(true)
  showWinAmount      Boolean  @default(true)
  allowStory         Boolean  @default(false)
  frozenAt           DateTime?
  role               String   @default("PLAYER") // PLAYER | ADMIN | SUPER_ADMIN
  wallet             Wallet?
}

enum Chain { POLYGON SOLANA }

model Wallet {            // custodial deposit address per user per network
  id            String @id @default(uuid(7))
  userId        String
  chain         Chain
  address       String @unique      // EVM checksummed / Solana base58 owner address
  tokenAccount  String?             // Solana USDT ATA
  derivationIdx Int
  @@unique([userId, chain])
  @@unique([chain, derivationIdx])
}

model PayoutVerification {   // FR-VER, one per prize payout to an unverified wallet
  id               String   @id @default(uuid(7))
  withdrawalId     String   @unique
  payoutWalletId   String
  testAmountHash   String   // hash of expected amount; plain amount never logged
  testAmountMicro  BigInt   // encrypted at rest
  testTxId         String?
  remainderTxId    String?
  state            String   // READY | TEST_SENT | AWAITING_PLAYER | VERIFIED | REMAINDER_SENT | COMPLETE | MISMATCH | EXPIRED | SUPPORT
  tries            Int      @default(0)
  testSends        Int      @default(0)
  expiresAt        DateTime
}

model PayoutWallet {      // player's OWN wallet for receiving prizes and withdrawals
  id          String   @id @default(uuid(7))
  userId      String
  chain       Chain
  address     String
  isPreferred Boolean  @default(false)
  verifiedAt  DateTime                 // email-code confirmed
  holdUntil   DateTime?                // 24 h hold after change (FR-WAL-10)
  @@unique([userId, chain])
}

model ReserveSnapshot {   // FR-RES: written every 5 min, admin only
  id             String   @id @default(uuid(7))
  chain          Chain
  reserveMicro   BigInt
  hotMicro       BigInt
  minRequiredMicro BigInt
  headroomMicro  BigInt
  breakdown      Json
  createdAt      DateTime @default(now())
}

model EconomySettings {   // versioned; never update, always insert
  id        String   @id @default(uuid(7))
  version   Int      @unique
  data      Json     // all values from Section 5.6
  createdBy String
}

model Riddle {
  id              String       @id @default(uuid(7))
  number          Int          @unique         // public "Riddle #12"
  title           String
  story           String
  mode            Mode
  level           Level?                       // Exhibition only
  status          RiddleStatus @default(DRAFT)
  difficulty      String                       // EASY | MEDIUM | HARD | LEGENDARY
  finalHash       String                       // HMAC (FR-ADM-05)
  salt            String
  answerLength    Int
  solutionCipher  Bytes?                       // encrypted write-up, released at close
  solverCheck     String?                      // PASSED | FAILED
  startsAt        DateTime?
  endsAt          DateTime?                    // null for Legendary
  entryFeesMicro  BigInt[]                     // allowed fees
  prizeMicro      BigInt?                      // Exhibition / Sponsored fixed prize
  minPlayers      Int?                         // Exhibition
  potMicro        BigInt       @default(0)     // INTERNAL pot. Never returned to players; they get prizeMicro = floor(pot * payoutWinner)
  sponsorId       String?
  settingsVersion Int
  winnerEntryId   String?      @unique
  solvedAt        DateTime?
  rolledFromId    String?
  pieces          Piece[]
  entries         Entry[]
  @@index([mode, status])
}

model Piece {
  id          String        @id @default(uuid(7))
  riddleId    String
  order       Int
  category    PieceCategory
  title       String
  question    String
  answerHash  String
  dropAt      DateTime?     // SOCIAL_CLUE only
  @@unique([riddleId, order])
}

model Entry {
  id            String      @id @default(uuid(7))
  riddleId      String
  userId        String
  feeMicro      BigInt
  source        EntrySource
  attemptsLeft  Int         @default(3)
  nextAttemptAt DateTime?
  refundedAt    DateTime?
  idempotencyKey String     @unique
  @@index([riddleId, userId])
}

model PieceProgress {     // per user per piece (survives re-entry)
  userId      String
  pieceId     String
  solvedAt    DateTime?
  checksUsed  Int       @default(0)
  checksResetAt DateTime?
  notes       String?   @db.VarChar(2000)
  @@id([userId, pieceId])
}

model Attempt {
  id          String        @id @default(uuid(7))
  entryId     String
  commit      String        // sha256 hex
  committedAt DateTime      @default(now())   // ordering key for "first"
  revealedAt  DateTime?
  result      AttemptResult @default(PENDING_REVEAL)
  @@index([entryId])
}

model LedgerLine {        // append-only. Balance = SUM(amount) per (account, ownerId)
  id         String        @id @default(uuid(7))
  txGroupId  String        // all lines of one business event; must sum to 0
  account    LedgerAccount
  ownerId    String?       // userId, riddleId (POT), sponsorId…
  amount     BigInt        // + credit / − debit
  kind       String        // ENTRY_FEE, POT_SHARE, WIN, GAME_RESERVE_RETURN, REFERRAL_HOLD, REFERRAL_RELEASE, REFERRAL_RETURN, DEPOSIT, WITHDRAWAL, REFUND, SEED, GAME_CARD, SPONSOR_FUND, ADJUSTMENT
  refType    String?
  refId      String?
  createdAt  DateTime      @default(now())
  @@index([account, ownerId])
  @@index([txGroupId])
}

model ChainTx {
  id          String   @id @default(uuid(7))
  chain       Chain
  direction   String   // IN | OUT | SWEEP | PAYOUT | REBALANCE
  userId      String?
  hash        String   @unique
  logIndex    Int?
  fromAddr    String
  toAddr      String
  amountMicro BigInt
  blockNumber Int?
  confirmations Int    @default(0)
  status      TxStatus
  ledgerGroupId String?
}

model Withdrawal { id String @id @default(uuid(7)); userId String; chain Chain; kind String /* WITHDRAWAL | PRIZE_PAYOUT */; toAddr String; amountMicro BigInt; status String; chainTxId String?; idempotencyKey String @unique }
model Sponsor    { id String @id @default(uuid(7)); name String; logoUrl String; url String; terms String; escrowAddress String }
model SocialClue { id String @id @default(uuid(7)); pieceId String; platform String; text String; imageUrl String?; dropAt DateTime; status String; postUrl String?; archivedAt DateTime? }
model Story      { id String @id @default(uuid(7)); entryId String @unique; type String; videoUrl String?; quote String?; status String }
model Notification { id String @id @default(uuid(7)); userId String; type String; title String; body String; readAt DateTime?; data Json? }
model NotificationPref { userId String; type String; push Boolean; email Boolean; @@id([userId, type]) }
model OtpCode    { id String @id @default(uuid(7)); target String; purpose String; codeHash String; expiresAt DateTime; tries Int @default(0) }
model AuditLog   { id String @id @default(uuid(7)); actorId String; action String; target String?; before Json?; after Json?; ip String?; createdAt DateTime @default(now()) }
```

**Rules**

- **FR-DATA-01** Every money event writes a ledger group whose lines sum to **0** (double-entry). A DB check (deferred constraint or trigger) rejects unbalanced groups.
- **FR-DATA-02** `LedgerLine` is insert-only (DB role has no `UPDATE`/`DELETE` on it).
- **FR-DATA-03** `Riddle.potMicro` is a cached value; the truth is `SUM(ledger POT where ownerId = riddleId)`. A nightly job reconciles and alerts on mismatch.

---

## 8. API specification (NestJS, REST + realtime)

Base URL `/api/v1`. JSON. Errors use `{ code, message, details? }` with stable `code` strings (e.g. `INSUFFICIENT_BALANCE`, `LEVEL_LOCKED`, `COOLDOWN_ACTIVE`, `ATTEMPTS_EXHAUSTED`, `TABLE_NOT_LIVE`, `RIDDLE_SOLVED`). All POSTs that move money require header `Idempotency-Key`.

### 8.1 Player endpoints

| Method & path                                                                  | Purpose                                                                                                                 |
| ------------------------------------------------------------------------------ | ----------------------------------------------------------------------------------------------------------------------- |
| `POST /auth/google`                                                            | Exchange Google ID token → session cookies                                                                              |
| `POST /auth/email/start` · `POST /auth/email/verify`                           | Email OTP                                                                                                               |
| `POST /auth/refresh` · `POST /auth/logout`                                     | Session                                                                                                                 |
| `POST /onboarding/age-terms`                                                   | FR-AUTH-03                                                                                                              |
| `POST /phone/start` · `POST /phone/verify`                                     | SMS OTP                                                                                                                 |
| `GET /me`                                                                      | Profile, level, progress, flags, balances                                                                               |
| `PATCH /me`                                                                    | Username, privacy toggles                                                                                               |
| `GET /me/levels`                                                               | Levels & Progress data                                                                                                  |
| `GET /lobby`                                                                   | Everything the lobby needs for this user (Section 6.3)                                                                  |
| `GET /riddles?mode=&status=`                                                   | List — `PublicRiddleDto` only (prize, never internal pot)                                                               |
| `GET /riddles/:id`                                                             | Detail; story/pieces only if entered (FR-PLAY-15)                                                                       |
| `POST /riddles/:id/entries`                                                    | `{ feeMicro, source }` → entry                                                                                          |
| `GET /entries/:id`                                                             | Workspace state (pieces, progress, attempts, cooldown)                                                                  |
| `POST /pieces/:id/check`                                                       | `{ entryId, answer }` → `{ correct, checksLeft, resetAt }`                                                              |
| `PUT /pieces/:id/notes`                                                        | Save notes                                                                                                              |
| `POST /entries/:id/attempts/commit`                                            | `{ commit }` → `{ attemptId, committedAt }`                                                                             |
| `POST /attempts/:id/reveal`                                                    | `{ answer, nonce }` → `{ result, attemptsLeft, nextAttemptAt, amountWonMicro? }`                                        |
| `GET /exhibition/today`                                                        | 5 tables with state, counts, lock reasons for this user                                                                 |
| `GET /practice` · `POST /practice/:id/...`                                     | Same check/attempt endpoints, no money                                                                                  |
| `GET /wallet`                                                                  | Balance (available), game-card plays, ≈ ₦, deposit addresses per network (Solana only if created), saved payout wallets |
| `POST /wallet/deposit-address`                                                 | `{ chain }` → creates the Solana address + ATA on first use                                                             |
| `GET /payouts/:id`                                                             | Payout status incl. verification step (no test amount before verification)                                              |
| `POST /payouts/:id/send-test`                                                  | Player confirms the wallet → test is sent                                                                               |
| `POST /payouts/:id/confirm`                                                    | `{ amountReceived }` → `VERIFIED` (remainder sent) or `{ triesLeft }`                                                   |
| `PUT /me/payout-wallets/:chain`                                                | `{ address, emailCode }` save/replace; `PUT /me/payout-wallets/preferred` `{ chain }`                                   |
| `GET /wallet/transactions?filter=`                                             | Paged list                                                                                                              |
| `POST /wallet/withdrawals`                                                     | `{ chain, toAddr, amountMicro, emailCode? }`                                                                            |
| `GET /referrals`                                                               | Locked flag (below Riddler) or link, friends joined/playing, total earned, per-friend earned amounts                    |
| `GET /winners` · `GET /winners/:id`                                            | Winners Wall, story                                                                                                     |
| `POST /stories`                                                                | Share Your Story                                                                                                        |
| `GET /past-riddles` · `GET /riddles/:id/solution`                              | After close                                                                                                             |
| `GET /clues/archive`                                                           | Clue Archive                                                                                                            |
| `GET /notifications` · `POST /notifications/read` · `PUT /notifications/prefs` | Inbox + prefs                                                                                                           |
| `PUT /me/limits` · `POST /me/break`                                            | Play limits                                                                                                             |
| `GET /content/rules`                                                           | CMS rules                                                                                                               |

### 8.2 Admin endpoints (`/admin/*`, role-guarded, 2FA)

`GET/POST /admin/riddles` (generate, list, review), `POST /admin/riddles/:id/approve|reject|regenerate`, `POST /admin/riddles/:id/schedule`, `GET /admin/rounds`, `POST /admin/rounds/:id/pause|extend`, `GET/POST /admin/clues`, `POST /admin/clues/:id/retry`, `GET /admin/treasury`, `GET /admin/reserves` (Section 10.7), `POST /admin/reserves/rebalance`, `GET /admin/payouts`, `GET/POST /admin/settings` (versions), `GET/POST /admin/sponsors`, `GET /admin/users`, `POST /admin/users/:id/freeze|level|adjust`, `GET /admin/audit`.

### 8.3 Realtime

Socket.IO namespace `/live` (or SSE). Rooms: `riddle:{id}`, `user:{id}`, `lobby`. Events: `prize.updated {riddleId, prizeMicro}` (never the internal pot), `riddle.solved {riddleId, winnerUsername}`, `table.state {tableId, state, players}`, `clue.dropped {pieceId}`, `deposit.detected|confirmed`, `withdrawal.sent`, `notification.new`, `level.changed`.

---

## 9. Background jobs (BullMQ + Redis)

| Job                           | Schedule                                       | Does                                                                                            |
| ----------------------------- | ---------------------------------------------- | ----------------------------------------------------------------------------------------------- |
| `exhibition.open`             | 00:00 WAT daily                                | Create 5 tables from scheduled Exhibition riddles, state `FILLING`                              |
| `exhibition.close`            | 23:59:59 WAT daily                             | `FILLING` → `REFUNDED` (refund all), `LIVE` unsolved → `CLOSED_UNSOLVED`                        |
| `weekly.close`                | At each `endsAt`                               | Unsolved → `ROLLED_OVER`, move pot to next weekly, release solution                             |
| `clue.drop`                   | At each `dropAt`                               | Post to platform, unlock piece, notify                                                          |
| `clue.archive`                | `dropAt + 24 h`                                | Copy to archive                                                                                 |
| `chain.watchDeposits.polygon` | Every 10 s (WebSocket logs + polling fallback) | Detect USDT `Transfer` to user addresses, track confirmations, credit ledger                    |
| `chain.sweep`                 | Every 15 min                                   | Move deposits from user addresses to the treasury (gas top-up first)                            |
| `chain.sendWithdrawal`        | On demand                                      | Sign + broadcast from hot wallet, track receipt                                                 |
| `referral.settle`             | On every round/table final state               | Release or return `REFERRAL_PENDING` lines (FR-REF-07); idempotent per entry                    |
| `chain.watchDeposits.solana`  | Streaming + 15 s polling                       | Detect USDT transfers into user ATAs, wait for `finalized`, credit ledger                       |
| `chain.sendPayout`            | On solve                                       | Send prize to the winner's payout wallet on the preferred network (10.6)                        |
| `payout.verification`         | Every minute                                   | Advance FR-VER states: detect test finality, send remainder after match, reminders, 72 h expiry |
| `reserve.monitor`             | Every 5 min + on entry/solve                   | Compute 10.7 per network, write `ReserveSnapshot`, raise alerts, enforce guard rails            |
| `chain.gasMonitor`            | Every 5 min                                    | Alert if hot-wallet POL or USDT below thresholds                                                |
| `ledger.reconcile`            | Nightly                                        | Pots, balances vs on-chain treasury; alert on drift                                             |
| `notify.endingSoon`           | Every 10 min                                   | 2 h warnings for entered riddles                                                                |
| `attempt.expireReveals`       | Every 30 s                                     | Commits without reveal after 60 s → `EXPIRED` (attempt consumed)                                |
| `fx.refresh`                  | Hourly                                         | USDT→NGN estimate                                                                               |
| `riddle.generate`             | Admin-triggered                                | LLM generation + independent solver check                                                       |

All jobs MUST be idempotent and safe to retry.

---

## 10. Blockchain integration (Polygon PoS + Solana, USDT)

### 10.1 Custody model

**Custodial with per-user deposit addresses on each network.** This gives "Google login, no seed phrase, no network fees".

- One master seed per network, generated and stored in a **KMS / HSM** (AWS KMS, GCP KMS or Vault). Never in `.env` in production.
- Player balances live in the **ledger** and are network-agnostic: 10 USDT deposited on Solana and 10 on Polygon is one 20 USDT balance.
- The chain is only used for: deposits in, sweeps to treasury, **prize payouts out**, withdrawals out, treasury rebalancing.
- Per network the treasury has: **hot wallet** (pays prizes and withdrawals), **cold wallet** (multisig: Safe on Polygon, Squads on Solana), **gas tank** (POL / SOL for fees), **sponsor escrow**.

> Legal note: holding player funds is custody. Get Nigerian legal advice (gaming licence and VASP rules) before mainnet.

### 10.2 Constants

| Item               | Polygon PoS                                                                            | Solana                                                                                       |
| ------------------ | -------------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------- |
| Network id         | chainId **137** (test: Amoy 80002)                                                     | mainnet-beta (test: devnet / `solana-test-validator`)                                        |
| USDT               | `0xc2132D05D31c914a87C6611C10748AEb04B58e8F` (now USDT0, same address), **6 decimals** | SPL mint `Es9vMFrzaCERmJfrF4H2FYD4KCoNkY11McCe8BenwNYB`, **6 decimals**                      |
| Library            | ethers.js v6                                                                           | `@solana/kit` + `@solana-program/token` (or `@solana/web3.js` + `@solana/spl-token`)         |
| Address derivation | BIP-44 `m/44'/60'/0'/0/{i}` (derivable from xpub in the API)                           | SLIP-10 ed25519 `m/44'/501'/{i}'/0'` (hardened only → derived **inside the signer service**) |
| Credit after       | 30 confirmations (setting)                                                             | `finalized` commitment                                                                       |
| Fees               | Platform tops up POL before sweeps                                                     | Platform's gas tank is the **fee payer** on every tx (no top-up needed)                      |
| Explorer           | polygonscan.com                                                                        | solscan.io                                                                                   |

Verify both token addresses on the official Tether/explorer pages before deploy.

### 10.3 Deposits

- **FR-CHAIN-01** Polygon: subscribe to USDT `Transfer` logs filtered by `to ∈ user deposit addresses`; polling `getLogs` fallback.
- **FR-CHAIN-02** Solana: each user deposit address has a USDT **associated token account (ATA)**, created when the player first selects Solana (platform pays the rent). Watch ATAs with `logsSubscribe`/`accountSubscribe` and reconcile with `getSignaturesForAddress` polling; parse `transferChecked` / `transfer` instructions for the USDT mint only.
- **FR-CHAIN-03** Store `ChainTx(chain, hash/signature, logIndex/instructionIndex)` once (unique). Credit the ledger only when final (10.2). Reorg/rollback before finality → `FAILED`.
- **FR-CHAIN-04** Credit = `DEPOSIT_CLEARING → USER_AVAILABLE`. Non-USDT tokens are ignored (support can manually recover).

### 10.4 Sweeps

- **FR-CHAIN-05** When a deposit address holds ≥ 5 USDT (setting), move it to that network's hot wallet (overflow above the hot-wallet target goes to cold). Polygon: send POL for gas first. Solana: gas tank signs as fee payer. Log as `ChainTx(direction=SWEEP)`.

### 10.5 Withdrawals (player-initiated)

- **FR-CHAIN-06** Validate per network (FR-WAL-06). Polygon: one nonce manager for the hot wallet (single worker + Redis lock), EIP-1559 with cap, replace if stuck > 5 min. Solana: recent blockhash + priority fee, retry with a new blockhash until confirmed or expired; create the recipient's USDT ATA if missing (platform pays).
- **FR-CHAIN-07** Daily per-user and global caps (settings). If the network's hot wallet can't cover it → queue and alert ops (10.7).

### 10.6 Prize payouts (automatic)

- **FR-CHAIN-08** On solve, the winner's prize is credited (`POT → USER_AVAILABLE`), then immediately moved `USER_AVAILABLE → PAYOUT_PENDING` and sent on-chain to the player's **saved payout wallet on their preferred network** (FR-WAL-10). If that wallet is **not yet verified**, the payout runs the test-payment flow in 10.6.1 first. On confirmation: `PAYOUT_PENDING → (out)`, tx hash stored on the receipt. On failure: retry 3× then return to `USER_AVAILABLE` and alert ops.
- **FR-CHAIN-09** Never pay to the address a deposit came _from_ (it is often an exchange hot wallet and funds can be lost). Only pay to an address the player saved in Payout wallet.
- **FR-CHAIN-10** Exhibition prizes are paid the same way. Sponsored prizes are paid from the sponsor escrow on the network the escrow was funded on (the player's payout wallet on that network; if missing, credited to balance).

### 10.6.1 Wallet verification by test payment

Blockchain transfers cannot be reversed, so before the first prize goes to a wallet we prove the player controls it.

**When it runs**

- **FR-VER-01** The first payout to any payout wallet, and the first payout after a wallet is added or changed. Once a wallet is verified, later payouts to it go straight through. (Setting `verifyEveryPayout`, default off.)
- **FR-VER-02** SHOULD also run for the first player-initiated withdrawal to a new address above `verifyWithdrawalAbove` (default 20 USDT).

**Test amount**

```
testAmount = clamp(round2(prize × testPercent), testMin, testMax) + randomCents(0.01–0.09)   // engineer-only formula
defaults: testPercent = 2%, testMin = 0.10 USDT, testMax = 25.00 USDT  (admin-editable)
remaining  = prize − testAmount
```

- The random cents make every test amount unique, so it can only be known by looking at the wallet.
- The test amount is **part of the prize**, not extra. If the address turns out to be wrong, only the test amount is at risk.

**Flow (state machine on `Withdrawal.kind = PRIZE_PAYOUT`)**
`READY → TEST_SENT → TEST_CONFIRMED_ONCHAIN → AWAITING_PLAYER → VERIFIED → REMAINDER_SENT → COMPLETE`
with side states `PLAYER_MISMATCH`, `WALLET_CHANGED`, `EXPIRED`, `SUPPORT`.

| ID        | Step                                                                                                                                                                                                                                                                                                                                                                                                                    |
| --------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| FR-VER-03 | **Explain first.** Before anything is sent, show _Verify your wallet_ — 3 steps: (1) we send a small test amount, (2) you check your wallet and type the exact amount you received, (3) we send the rest. Show network + shortened address with a "This is my wallet, send test" button and a "Change wallet" link. Warn: "If this address is wrong, the test amount cannot be recovered."                              |
| FR-VER-04 | **Send the test.** Worker sends `testAmount` (Solana: create the recipient's USDT token account first if missing, platform pays). The player sees _Test sent — check your wallet_ with network, shortened address and "usually arrives in under a minute (Solana) / about 2 minutes (Polygon)". **Do not show the test amount or a transaction link at this stage** (an explorer link would reveal the amount).         |
| FR-VER-05 | **Player confirms.** Input "Amount you received" (USDT, 2 decimals). Match = exact. 5 tries; after 5 wrong entries → `SUPPORT`. Errors: "That doesn't match the amount we sent. Check the USDT balance in this wallet on {network}."                                                                                                                                                                                    |
| FR-VER-06 | **Help if not received.** _Didn't get it?_ screen: (a) wait — show live status "Confirmed on {network}" once final; (b) "My wallet doesn't show USDT" → how to add/show the USDT token on that network; (c) "I entered the wrong address" → change wallet (email code), a new test is sent from the remaining amount; the earlier test amount is lost; (d) contact support. Max 3 test sends per prize, then `SUPPORT`. |
| FR-VER-07 | **Send the rest.** On a correct match: mark the wallet `verifiedAt`, send `remaining`, then show _Wallet verified_ with a summary: test amount + rest = prize, both transaction links.                                                                                                                                                                                                                                  |
| FR-VER-08 | **Timeouts.** If the player doesn't confirm within 72 h, send reminders at 1 h, 24 h and 48 h; after 72 h → `EXPIRED`: the remaining amount moves back to the player's in-app balance (they can withdraw or retry verification later).                                                                                                                                                                                  |
| FR-VER-09 | **Ledger.** `PAYOUT_PENDING → out (test)` when the test is final on-chain; `remaining` stays in `PAYOUT_PENDING` until verified; on `EXPIRED` → `USER_AVAILABLE`. Reserve monitor counts the held remainder as a pending outflow.                                                                                                                                                                                       |
| FR-VER-10 | **Security.** Verification codes and amounts are never logged in plain analytics; the expected amount is stored hashed. Changing the wallet during verification needs an email code and restarts the 24 h hold (FR-WAL-10).                                                                                                                                                                                             |
| FR-VER-11 | **Copy rules.** Players see "a small test amount from your prize", never the % formula or random-cents logic. After verification they see the exact amounts.                                                                                                                                                                                                                                                            |

### 10.7 Treasury reserve tracking (admin)

The platform must always hold enough USDT on each network to pay every prize currently on offer, every player balance and every pending payout.

**Liabilities (network-agnostic)**

```
openPrizes        = Σ displayed prize of every LIVE/FILLING riddle or table that can still be won
                    (Weekly + Legendary: floor(pot × payoutWinner); Exhibition: fixed prize per open table)
                    // Sponsored prizes are excluded: they are covered by their own escrow
playerBalances    = Σ USER_AVAILABLE (withdrawable, excludes USER_PROMO game-card credit)
pendingReferrals  = Σ REFERRAL_PENDING
pendingOutflows   = Σ WITHDRAWAL_PENDING + Σ PAYOUT_PENDING
totalRequired     = openPrizes + playerBalances + pendingReferrals + pendingOutflows
```

**Minimum per network** (a winner may choose either network, so each must cover the largest single prize):

```
share[n]          = players' preferred-payout-network share (rolling 30 days; default 50/50)
minRequired[n]    = largestOpenPrize + ceil((totalRequired − largestOpenPrize) × share[n]) + safetyBuffer[n]
reserve[n]        = hot[n] + cold[n] USDT balance on network n (on-chain, read live)
headroom[n]       = reserve[n] − minRequired[n]          // the "amount − reserve − min amount" figure
hotHeadroom[n]    = hot[n] − (largestOpenPrize + pendingOutflows on n + hotBuffer[n])
```

- **FR-RES-01** Admin **Treasury → Reserve health** shows, for Polygon and Solana side by side: reserve balance, minimum required, **headroom** (green ≥ 0, amber < 10% of min, red < 0), hot-wallet balance vs hot-wallet minimum, gas balance (POL/SOL), and the breakdown (open prizes by mode, player balances, pending referrals, pending payouts/withdrawals).
- **FR-RES-02** A table lists every open riddle/table with its current prize and which ones drive the largest-prize requirement.
- **FR-RES-03** Alerts (email + Slack/Telegram) when any headroom turns amber/red, when hot headroom < 0, or when gas < threshold. Recompute every 5 minutes and on every entry/solve event.
- **FR-RES-04** **Guard rails:** a new riddle/table cannot be scheduled live, and admin cannot raise a starting prize, if it would make total headroom negative. Payout/withdrawal workers never send more than the hot wallet holds; they queue instead.
- **FR-RES-05** **Rebalance** action (Super admin, four-eyes): move USDT between networks (via the platform's exchange account or an approved bridge) and between hot/cold. Every move is logged with tx hashes.
- **FR-RES-06** `safetyBuffer` and `hotBuffer` per network are settings (default 10% of min and 500 USDT).
- Reserve data is admin-only (FR-VIS-02).

## 11. Security and anti-abuse

| ID     | Requirement                                                                                                                                                                                                                       |
| ------ | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| SEC-01 | Answers: only `HMAC-SHA256(pepper, salt + normalised)` stored. Pepper lives in KMS. Plain answers are deleted at approval and never logged.                                                                                       |
| SEC-02 | Rate limits (Redis): piece checks per entry (FR-PLAY-05), attempts (cooldown), OTP sends (5/hour), auth (10/min/IP), withdrawals (3/day).                                                                                         |
| SEC-03 | Commit–reveal ordering uses **server** time only. Reveal window 60 s.                                                                                                                                                             |
| SEC-04 | Multi-account protection for the game card and referrals: one verified phone per account, device fingerprint, IP/ASN heuristics, same payout address across accounts → flag. Flagged accounts cannot claim promos until reviewed. |
| SEC-05 | Idempotency keys on every money POST; DB unique constraints back them.                                                                                                                                                            |
| SEC-06 | Solve race: `SELECT … FOR UPDATE` on the riddle; the first committed correct attempt wins; later correct reveals receive `RIDDLE_SOLVED`.                                                                                         |
| SEC-07 | Admin: separate auth, mandatory TOTP 2FA, IP allow-list, four-eyes on Legendary approval and manual ledger adjustments.                                                                                                           |
| SEC-08 | OWASP ASVS L2: CSP, Helmet, CSRF protection for cookie auth, input validation with zod/class-validator, parameterised SQL (Prisma), secrets in a secret manager.                                                                  |
| SEC-09 | Audit log for auth events, money events, admin actions. Retain 5 years.                                                                                                                                                           |
| SEC-10 | Cheating stance: AI tools allowed. Sharing answers is not technically preventable; the commit–reveal design prevents copying a sealed answer in flight.                                                                           |

---

## 12. Non-functional requirements

| ID     | Requirement                                                                                                                                                                                                  |
| ------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| NFR-01 | **Performance**: Lobby LCP < 2.5 s on a mid-range Android over 3G-Fast (Nigeria). JS for first route < 200 KB gzipped. Intro animation < 300 KB.                                                             |
| NFR-02 | **Availability**: 99.9% API. Deposit detection delay < 2 min after required confirmations.                                                                                                                   |
| NFR-03 | **Scalability**: 10k concurrent players, 200 solves/sec spike on a riddle drop (commit endpoint must be cheap; reveal can queue).                                                                            |
| NFR-04 | **Accessibility**: WCAG 2.2 AA. Contrast already checked in Figma (Design System → Developer Handoff). Tap targets ≥ 44 px. Status never by colour alone. Full keyboard support on desktop.                  |
| NFR-05 | **Time**: store UTC, display WAT (configurable later). Countdowns sync from server time (`/time` offset).                                                                                                    |
| NFR-06 | **Observability**: OpenTelemetry traces, structured JSON logs (no answers, no PII in logs), Sentry for web and API, metrics dashboard (entries/min, solves, deposits, withdrawal queue, hot-wallet balance). |
| NFR-07 | **Privacy**: NDPA 2023 (Nigeria) compliance — consent, data minimisation, deletion requests, DPO contact.                                                                                                    |
| NFR-08 | **Browsers**: last 2 versions of Chrome, Safari, Firefox, Edge; Android Chrome 10+, iOS Safari 16+. PWA installable.                                                                                         |
| NFR-09 | **i18n-ready**: all copy in message files (English first). Money formatted with thousands separators: whole amount large, `.decimals USDT` small and grey.                                                   |

---

## 13. Frontend (Next.js) architecture and design mapping

### 13.1 Tech

Next.js 15+ App Router, TypeScript strict, Tailwind CSS v4 (tokens as CSS variables), TanStack Query for server state, Zustand for small client state, zod for forms (react-hook-form), Socket.IO client for realtime, `next-intl` for copy, Rive or Lottie for the intro and win animation, `qrcode.react` for deposit QR, PWA via `next-pwa` or the built-in manifest.

### 13.2 Design tokens (from Figma → Design System → Developer Handoff)

- Copy the CSS variables block into `packages/ui/src/tokens.css` and map them in the Tailwind theme (`--primary-gold`, `--secondary-ink`, `--secondary-surface`, … `--radius-button: 10px`, `--shadow-card`, `--glow-gold`, `--focus-ring`).
- Fonts: **Cinzel** (logo only), **Inter** (UI), **JetBrains Mono** (answers, hashes, addresses) via `next/font/google`.
- Text styles become Tailwind utilities/components: `display-logo`, `display-pot`, `h1…h4`, `body-lg/md/reg/sm`, `button`, `overline`, `mono-answer`, `mono-sm`.
- **Never** use raw hex in components. Use tokens only.

### 13.3 Component library (`packages/ui`) — 1:1 with Figma _Components_ page

`Button` (Primary/Secondary/Ghost/Danger × Default/Hover/Disabled/Loading, icon slot) · `Input` (Default/Active/Error/Disabled/With icon/Search/Mono) · `AnswerInput` (64 px, counter, normalised preview) · `Chip` (Live, Ending soon, Solved, Rolled over, Legendary, Pending, Successful, Failed, Scheduled, Neutral — always icon + text) · `PotCard` (Hero/Compact) · `PieceRow` (6 states) · `AttemptsMeter` · `Countdown` (Default/Small, server-synced) · `Popup` (Success/Error/Warning/Confirm, optional copy box) · `BottomSheet` (mobile) ↔ `Modal` (desktop) · `Toast` · `NoticeBar` · `MobileTabBar` (Lobby/Play/Wallet/Account) · `DesktopSidebar` · `DesktopTopBar` · `AdminSidebar` · `TransactionRow` · `Toggle` · `Checkbox` · `Radio` · `SegmentedTabs` · `KeyValueRow` · `ListRow` · `MobileNavHeader` · `LevelBadge` (5 levels × Default/Small) · `ExhibitionTable` (Open/Filling/Entered/Locked) · `SponsoredRiddleCard` · `Money` (whole + decimals rule) · `Icon` (64 icons, 24 px, 2 px stroke — export as SVG sprite) · `Skeleton`.

### 13.4 Routes and Figma frames

| Route                                                  | Screens (Figma page → frame names)                                                                                                            |
| ------------------------------------------------------ | --------------------------------------------------------------------------------------------------------------------------------------------- |
| `/` (first visit)                                      | 00 Intro → `Intro {1…6b}`, `Intro {Reduced Motion}`                                                                                           |
| `/welcome`                                             | 01 Onboarding → `Landing {Guest}`, `How It Works`, `Splash`                                                                                   |
| `/signin`, `/signin/code`                              | `Sign In`, `Email Code {Default                                                                                                               | Error}`                                                        |
| `/onboarding/age-terms`                                | `Age & Terms {Disabled                                                                                                                        | Default}`, `Creating Wallet {Loading}`, `Region Not Available` |
| `/lobby`                                               | 02 Lobby → `Lobby {Logged In                                                                                                                  | Guest                                                          | Empty Wallet                 | No Live Riddles                              | Loading}`; 11 → `Lobby {Novice · Practice Not Done}`, `Lobby {Apprentice}` |
| `/riddles/[id]`                                        | 03 Enter Riddle → `Riddle Detail {Not Entered}`, `Entry Fee {Bottom Sheet}`, `Review & Confirm Entry`, `Entry {Processing                     | Success                                                        | Insufficient Balance}`       |
| `/play/[entryId]`                                      | 04 Play → `Riddle Workspace {Default}`, `Piece Detail {Available                                                                              | Correct                                                        | Wrong                        | Check Limit Reached}`, `Social Clue {Waiting | Dropped}`                                                                  |
| `/play/[entryId]/final`                                | `Final Answer {Ready                                                                                                                          | Sealing                                                        | Wrong                        | Cooldown                                     | Out of Attempts                                                            | Someone Else Won}` |
| `/win/[entryId]`                                       | 05 → `Win {Celebration}`, `Win Receipt`, `Share Your Story`                                                                                   |
| `/riddles/[id]/result`, `/riddles/[id]/solution`       | `Round Ended {Rolled Over}`, `Solution Reveal`                                                                                                |
| `/exhibition`                                          | 11 → `Exhibition {Novice}`, `Exhibition {Table Refunded}`                                                                                     |
| `/practice`                                            | 08 → `Practice Mode`; 11 → `Practice Complete {Game Card Reward}`, `Verify Phone {Game Card}`                                                 |
| `/levels`                                              | 11 → `Levels & Progress`, `Promotion {Apprentice}` (modal on level-up)                                                                        |
| `/sponsored/[id]`                                      | 11 → `Sponsored Riddle {Detail}`                                                                                                              |
| `/wallet`, `/wallet/deposit`, `/wallet/withdraw`       | 06 Wallet → `Wallet {Balance                                                                                                                  | Empty}`, `Deposit`, `Deposit {Pending                          | Confirmed}`, `Withdraw {Form | Form · Valid                                 | Address Error}`, `Withdraw Review`, `Withdraw {Security Check              | Success}`          |
| `/referrals`                                           | 07 → `Referrals {Default                                                                                                                      | Empty}`, `Share Riddle {Bottom Sheet}`, `Referral Rules`       |
| `/r/[code]`                                            | `Invite Landing {Friend View}`                                                                                                                |
| `/winners`, `/winners/[id]`, `/past-riddles`, `/clues` | 08 Community → `Winners Wall`, `Winner Story`, `Past Riddles`, `Clue Archive`                                                                 |
| `/account/*`                                           | 09 → `Account`, `Privacy`, `Play Limits`, `Notifications`, `Notifications Inbox`, `Rules & Fair Play`                                         |
| `/admin/*` (separate app or route group, desktop only) | 10 Admin → `Review Queue`, `Review Riddle {Detail}`, `Approve {Confirm}`, `Clue Schedule`, `Live Rounds`, `Treasury`, `Game Economy Settings` |

Every player route has a mobile frame (393) and a desktop frame (1440). Breakpoint: `< 1024 px` mobile layout (2-column grids from 768 px), `≥ 1024 px` desktop shell (sidebar 240 + top bar 72). Play screens use the desktop focus layout without the sidebar.

### 13.5 UX rules (apply everywhere)

- Every async action has a loading state; every outcome has a pop-up or toast.
- Inputs that need a choice use a **Bottom Sheet** on mobile and a centred **Modal** on desktop.
- Disabled primary buttons stay visible until the form is valid.
- Copy buttons next to every address, hash and referral link.
- Locked content: visible, greyed, padlock + reason, not focusable as a button.
- Money: always `1,284` big + `.50 USDT` small grey.

---

## 14. Project setup

### 14.1 Repository

```
riddle-n-lock/
├─ apps/
│  ├─ web/          # Next.js player app (+ /admin route group or separate apps/admin)
│  └─ api/          # NestJS API + workers (separate process entry for BullMQ workers)
├─ packages/
│  ├─ ui/           # tokens.css, Tailwind preset, components, icons
│  ├─ shared/       # zod schemas, DTO types, error codes, normaliseAnswer(), money utils
│  ├─ chain/        # common ChainAdapter interface + polygon/ (ethers v6) + solana/ (@solana/kit) adapters
│  └─ config/       # eslint, tsconfig, prettier
├─ prisma/          # schema.prisma, migrations, seed.ts
├─ docs/FRD.md
├─ .github/copilot-instructions.md   # Appendix A
├─ .vscode/mcp.json                  # Figma MCP
├─ docker-compose.yml                # postgres 16, redis 7, mailpit
└─ turbo.json, pnpm-workspace.yaml
```

### 14.2 NestJS modules

`AuthModule`, `UsersModule`, `LevelsModule`, `SettingsModule`, `RiddlesModule`, `PlayModule` (entries, checks, attempts), `ExhibitionModule`, `PotsModule`, `SponsorsModule`, `LedgerModule`, `WalletModule`, `ChainModule` (watcher, sweeper, sender), `ReferralsModule`, `CluesModule`, `CommunityModule`, `NotificationsModule`, `RealtimeModule` (gateway), `AdminModule`, `AuditModule`, `GenerationModule` (LLM + solver), `HealthModule`.

### 14.3 Environment variables

Secrets (keys, seeds, peppers) live in the secret manager / KMS in production. `.env` is for local development only.

```bash
# ---------- Core ----------
NODE_ENV=development
DATABASE_URL=postgresql://user:pass@localhost:5432/riddlenlock
REDIS_URL=redis://localhost:6379
JWT_SECRET=
JWT_REFRESH_SECRET=
NEXT_PUBLIC_API_URL=http://localhost:4000/api/v1
NEXT_PUBLIC_WS_URL=ws://localhost:4000/live

# ---------- Auth, email, SMS ----------
GOOGLE_CLIENT_ID=
GOOGLE_CLIENT_SECRET=
EMAIL_PROVIDER_KEY=
SMS_PROVIDER_KEY=                     # e.g. Termii / Twilio

# ---------- Key management (KMS) ----------
KMS_KEY_ID=                           # wraps the answer pepper and the solution-encryption key
ANSWER_PEPPER_KMS_REF=
SOLUTION_KEY_KMS_REF=

# ---------- Polygon (EVM, ethers.js v6) ----------
POLYGON_ENABLED=true
POLYGON_CHAIN_ID=137                  # Amoy testnet: 80002
POLYGON_RPC_PRIMARY=
POLYGON_RPC_FALLBACK=
POLYGON_WS_URL=
POLYGON_USDT_ADDRESS=0xc2132D05D31c914a87C6611C10748AEb04B58e8F   # USDT0, 6 decimals (verify before deploy)
POLYGON_CONFIRMATIONS=30
POLYGON_HD_SEED_KMS_REF=              # master seed for user deposit addresses (m/44'/60'/0'/0/i)
POLYGON_DEPOSIT_XPUB=                 # API derives deposit addresses from this; private keys stay in the signer
POLYGON_HOT_WALLET_KMS_REF=           # signs prize payouts and withdrawals
POLYGON_HOT_WALLET_ADDRESS=
POLYGON_COLD_WALLET_ADDRESS=          # Safe multisig
POLYGON_GAS_TANK_KMS_REF=             # POL for sweep gas top-ups
POLYGON_GAS_TANK_ADDRESS=
POLYGON_GAME_FEE_ADDRESS=
POLYGON_SPONSOR_ESCROW_ADDRESS=
POLYGON_EXPLORER_URL=https://polygonscan.com

# ---------- Solana (@solana/kit + SPL Token) ----------
SOLANA_ENABLED=true
SOLANA_CLUSTER=mainnet-beta           # devnet / localnet for testing
SOLANA_RPC_PRIMARY=
SOLANA_RPC_FALLBACK=
SOLANA_WS_URL=
SOLANA_USDT_MINT=Es9vMFrzaCERmJfrF4H2FYD4KCoNkY11McCe8BenwNYB    # 6 decimals (verify before deploy)
SOLANA_COMMITMENT=finalized
SOLANA_HD_SEED_KMS_REF=               # master seed for user deposit addresses (m/44'/501'/i'/0'), derived in the signer only
SOLANA_HOT_WALLET_KMS_REF=            # signs prize payouts and withdrawals
SOLANA_HOT_WALLET_ADDRESS=
SOLANA_COLD_WALLET_ADDRESS=           # Squads multisig
SOLANA_FEE_PAYER_KMS_REF=             # pays all Solana transaction fees + token-account rent
SOLANA_FEE_PAYER_ADDRESS=
SOLANA_GAME_FEE_ADDRESS=
SOLANA_SPONSOR_ESCROW_ADDRESS=
SOLANA_PRIORITY_FEE_MICROLAMPORTS=    # optional cap for priority fees
SOLANA_EXPLORER_URL=https://solscan.io

# ---------- Alerts (reserve health, gas, stuck payouts) ----------
ALERT_EMAIL_TO=
ALERT_SLACK_WEBHOOK=
ALERT_TELEGRAM_BOT_TOKEN=
ALERT_TELEGRAM_CHAT_ID=

# ---------- Social clues, AI, misc ----------
X_API_KEY=
X_API_SECRET=
LLM_API_KEY=                          # riddle generator
SOLVER_LLM_API_KEY=                   # independent solver check
FX_API_KEY=                           # USDT -> NGN estimate
GEOIP_DB_PATH=
SENTRY_DSN=
```

Game economics (prize %, referral tiers, test-payment %, reserve buffers, confirmation thresholds that admins may tune) are **not** env vars. They live in `EconomySettings` (Section 5.6) so admins can change them without a deploy.

### 14.4 Seed data

`prisma/seed.ts` creates: settings v1 (Section 5.6), 1 admin, 3 practice riddles, 5 Exhibition riddles for today, 2 weekly riddles (#12, #13) with the Figma copy, 1 Legendary (displayed prize 48,920), 1 sponsored riddle, demo users at every level. Riddle answers in seed are hashed with the dev pepper.

---

## 15. Build plan (phases, tasks, acceptance)

Give your AI agent one task at a time. Ask it to write tests with every task.

### Phase 0 — Foundation (week 1)

1. Monorepo (pnpm + Turborepo), TypeScript strict, ESLint/Prettier, Husky, CI (lint, typecheck, test, build).
2. docker-compose: Postgres 16, Redis 7, Mailpit.
3. Prisma schema (Section 7), first migration, seed.
4. `packages/shared`: `normaliseAnswer`, money helpers (`toMicro`, `formatUSDT`), error codes, zod DTOs.
5. `packages/ui`: tokens from Figma, fonts, Tailwind preset, Storybook.

**Done when** `pnpm dev` runs web + api, `/api/v1/health` is green, Storybook shows the token page matching Figma Design System.

### Phase 1 — Design system in code (week 2)

Build every component in 13.3 from the Figma _Components_ page (use the Figma MCP with each component set link). Stories for every variant. Visual check against Figma screenshots.

**Done when** all variants exist in Storybook, keyboard and screen-reader checks pass, no raw hex in `packages/ui`.

### Phase 2 — Auth & onboarding (week 3)

FR-AUTH-01…08, Intro (static frame first, Rive later), Landing, How It Works, Sign In, Email Code, Age & Terms, Creating Wallet, Region block. Custodial deposit address generated at sign-up (testnet).

**Done when** a new user can sign in with Google and email on mobile and desktop, accept terms, and lands on Lobby {Novice · Practice Not Done}.

### Phase 3 — Ledger, wallet and chain (weeks 4–5)

LedgerModule (double-entry, balance queries, reconcile job), Wallet screens, ChainAdapter interface with Polygon and Solana adapters, deposit watchers (Amoy mock USDT + Solana devnet mock mint), network pickers, payout wallets, automatic prize payouts, reserve monitor, sweeps, withdrawals with nonce manager, security check, transaction list, ≈ ₦.

**Done when** a test deposit on Amoy shows Pending then Confirmed, the balance is correct, a withdrawal is sent and its hash shown, and ledger groups always sum to 0 (property tests).

### Phase 4 — Riddles & play engine (weeks 5–7)

Riddle/piece models, piece checks with limits and reset, notes, entry flow with idempotency, attempts with commit–reveal, cooldown, re-entry, solve transaction with row lock, payouts, realtime events, Win flow, Someone Else Won, Rolled over, Solution Reveal. Practice mode on the same engine.

**Done when** load test: 500 concurrent correct reveals → exactly one winner, ledger balanced; all Play frames implemented for mobile and desktop.

### Phase 5 — Levels, Exhibition, Weekly, Legendary, Sponsored (weeks 7–9)

Levels & promotion, Practice completion + game card + phone verification, Exhibition daily tables (open/close jobs, FILLING→LIVE reveal, refund), Weekly pots with 50% growth and rollover, Legendary, Sponsored with escrow, lobby variants per level.

**Done when** an end-to-end test takes one user from Novice to Riddler on seeded tables, a table under 5 players refunds both USDT and game-card plays, and weekly rollover moves the full pot.

### Phase 6 — Social, community, notifications, account (weeks 9–10)

Clue schedule & drop & archive, referrals (entry commissions, editable tiers, pending hold + settlement, Riddler gate, anti-abuse), information-boundary checks (FR-VIS), Winners Wall, stories (moderation), Past Riddles, Clue Archive, notifications (inbox, web push, email), privacy, play limits, take a break, Rules CMS.

### Phase 7 — Admin (weeks 10–11)

Admin app with 2FA: generation pipeline + solver check, review & approve (hash + delete plaintext + encrypt solution), scheduling, live rounds, clue schedule, treasury, game economy settings (versioned), sponsors, users, audit log.

### Phase 8 — Hardening & launch (weeks 12–13)

Security review (SEC-01…10), pen test, load tests (NFR-03), accessibility audit (NFR-04), Lighthouse on low-end Android (NFR-01), mainnet dry run with small amounts, monitoring and alerts, runbooks (stuck withdrawal, RPC outage, hot-wallet refill, incident pause), legal sign-off.

---

## 16. Testing strategy

| Layer       | Tool                                                            | Must cover                                                                                                                                                                                                          |
| ----------- | --------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Unit        | Vitest (shared, ui), Jest (Nest)                                | `normaliseAnswer`, money math (rounding to reserve/platform), 60/40 payout, referral tiers, displayed prize = floor(pot × 0.6), DTO allow-lists never leak internal fields, promotion thresholds, settings snapshot |
| Property    | fast-check                                                      | Every ledger group sums to 0; balances never negative                                                                                                                                                               |
| Integration | Testcontainers (Postgres, Redis)                                | Entry → pot increment; solve race; refunds; rollover; game card                                                                                                                                                     |
| Chain       | Anvil fork + mock USDT; `solana-test-validator` + mock SPL mint | Deposits on both networks, finality/reorg, sweeps, ATA creation, payouts, withdrawal retry, reserve formula (10.7)                                                                                                  |
| E2E         | Playwright (mobile 393 + desktop 1440 viewports)                | Novice → Riddler journey; deposit → enter → solve → withdraw; admin approve                                                                                                                                         |
| Visual      | Playwright screenshots vs Figma exports                         | Key screens per page                                                                                                                                                                                                |
| Load        | k6                                                              | Riddle drop spike, commit/reveal throughput                                                                                                                                                                         |
| A11y        | axe-core in Playwright                                          | All routes, zero serious violations                                                                                                                                                                                 |

---

## 17. Open decisions (confirm before or during Phase 5)

| ID    | Question                                                                                                                                                  | Current default                                                                              |
| ----- | --------------------------------------------------------------------------------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------- |
| OD-01 | Custodial (ledger + HD deposit addresses) vs non-custodial embedded wallets + paymaster                                                                   | Custodial (Section 10.1)                                                                     |
| OD-02 | Where the other 50% of Weekly/Legendary entries goes                                                                                                      | Platform revenue, minus referral commission                                                  |
| OD-03 | Does the 60/40 rule also apply to Exhibition prizes?                                                                                                      | No — Exhibition prizes are fixed                                                             |
| OD-04 | Exhibition table `LIVE` but unsolved at close: refund, keep, or carry the prize to tomorrow                                                               | Keep entries, no prize paid (needs your call)                                                |
| OD-05 | Can a player re-enter the same Exhibition table after 3 wrong attempts?                                                                                   | Yes, new fee                                                                                 |
| OD-06 | Weekly fee tiers per round and extra checks per tier                                                                                                      | 1/2/5/10, +1 check per tier above 1                                                          |
| OD-07 | Licensing: Nigerian gaming licence + VASP registration                                                                                                    | Get legal advice before mainnet                                                              |
| OD-08 | KYC beyond phone verification (BVN/NIN) for large withdrawals                                                                                             | Not in v1; threshold-triggered review                                                        |
| OD-09 | Starting prize: shown prize starts at 500/200 (internal pot opened at ÷0.6) **or** 60/40 applies only to entry-funded growth and the seed is paid in full | First option (Section 5.2)                                                                   |
| OD-11 | Legal disclosure: gaming rules in Nigeria may require the Terms to state how prizes are funded even if the app UI does not                                | Keep full prize terms in the Terms page; get legal advice                                    |
| OD-12 | Referral commission paid for the lifetime of the invitee or for a limited period (e.g. 12 months)                                                         | Lifetime while referrer is Riddler+                                                          |
| OD-14 | How USDT is moved between Polygon and Solana when one side runs low (exchange account vs bridge)                                                          | Exchange account, manual, four-eyes                                                          |
| OD-13 | Legendary pending referral rewards                                                                                                                        | **Decided:** Legendary has no end date; its referral rewards stay pending until it is solved |

---

## Appendix A — Agent instructions (`.github/copilot-instructions.md` or `CLAUDE.md`)

```md
# Riddle n Lock — rules for the coding agent

You are building Riddle n Lock. The full spec is docs/FRD.md. Read the relevant section before every task and cite requirement IDs in commit messages.

Stack: pnpm + Turborepo monorepo. apps/web = Next.js App Router + Tailwind + TanStack Query. apps/api = NestJS + Prisma + PostgreSQL + BullMQ/Redis + Socket.IO. packages/chain = one ChainAdapter interface (getDepositAddress, watchDeposits, sweep, send, getBalance) with a Polygon adapter (ethers v6) and a Solana adapter (@solana/kit + SPL token). USDT has 6 decimals on both. Game code never imports a chain library directly. TypeScript strict everywhere.

Design: Figma file https://www.figma.com/design/Q5CV16AxTGDLluGdouC6oS/Riddle-n-Lock via the Figma MCP server.

- For UI tasks, I will paste a frame link. Use get_design_context and get_screenshot on that node only.
- Reuse components from packages/ui. Never create one-off styled markup if a component exists.
- Use design tokens (CSS variables / Tailwind theme). Never hard-code hex colours, font sizes or spacing.
- Build mobile (393) and desktop (1440) for every player screen. Breakpoint 1024 px.
- Money display: big whole amount with thousands separators + small grey ".50 USDT".

Money and security rules (never break these):

- Money is BigInt micro-USDT (6 decimals). No floats. Rounding remainders go to the platform.
- Every balance change is a balanced LedgerLine group (sum = 0). LedgerLine is insert-only.
- Money POST endpoints require Idempotency-Key and run in one DB transaction.
- Never store, log or return plain answers. Use normaliseAnswer() from packages/shared and HMAC with the pepper.
- Final answers use commit–reveal; the server commit time decides the winner; lock the riddle row when solving.
- Read economics (fees, prizes, seeds, %s, thresholds) from EconomySettings, never hard-code.
- Players see amounts and outcomes only (FRD 6.12). Never send internal pot, splits, reserve, referral rates, wallet/treasury internals or ledger names to the web app. Use explicit allow-list DTOs; never return Prisma models.
- Economy formulas live only in apps/api/src/economy. The web app displays numbers it receives; it never computes prizes or commissions.
- Comment economy, ledger, payout and chain code generously for engineers, citing FRD IDs. Keep player-facing copy free of internal terms.
- Validate all input with zod (web) and class-validator/zod pipes (api).

Workflow:

- One task at a time. Write or update tests with every change. Run lint, typecheck and tests before saying done.
- If the FRD is unclear or conflicts with Figma, stop and ask; list the options.
```

---

_End of FRD v1.4_
