# Riddle n Lock

> Solve the riddle. Unlock the pot.

A skill-based riddle game where players solve multi-part puzzles to win USDT prize pots. The first correct solver takes 85% of the pot, paid instantly to their own wallet — no seed phrase needed.

---

## Design

Figma source: [Riddle n Lock](https://www.figma.com/design/Q5CV16AxTGDLluGdouC6oS/Riddle-n-Lock)

**Onboarding & Sign-in flow**

![Onboarding & Sign-in — Figma design](docs/screenshots/figma-onboarding.png)

**Lobby**

![Lobby — Figma design](docs/screenshots/figma-lobby.png)

---

## Live app — Auth screens

<table>
  <tr>
    <td align="center"><b>Sign In</b></td>
    <td align="center"><b>Email entry</b></td>
    <td align="center"><b>OTP verify</b></td>
    <td align="center"><b>Terms</b></td>
  </tr>
  <tr>
    <td><img src="docs/screenshots/app-signin.png" width="180"/></td>
    <td><img src="docs/screenshots/app-email.png" width="180"/></td>
    <td><img src="docs/screenshots/app-verify.png" width="180"/></td>
    <td><img src="docs/screenshots/app-terms.png" width="180"/></td>
  </tr>
</table>

---

## Stack

| Layer         | Technology                                        |
| ------------- | ------------------------------------------------- |
| Web           | Next.js 15 (App Router)                           |
| API           | NestJS 10                                         |
| Database      | MySQL via Prisma 6                                |
| Auth          | JWT (httpOnly cookies) · Email OTP · Google OAuth |
| Payments      | USDT on Polygon PoS / Solana                      |
| Queue         | BullMQ + Redis                                    |
| Design system | Tailwind CSS + Figma tokens                       |
| Monorepo      | pnpm workspaces + Turborepo                       |

---

## Monorepo structure

```
riddlesandlocks/
├── apps/
│   ├── api/          # NestJS backend  → localhost:4000
│   └── web/          # Next.js frontend → localhost:3000
├── packages/
│   ├── ui/           # 31 React components + Storybook (port 6006)
│   ├── shared/       # Zod-validated domain types
│   ├── chain/        # ChainAdapter interface (Polygon / Solana)
│   └── config/       # Shared ESLint + TypeScript configs
└── docs/
    └── FRD.md        # Functional Requirements Document
```

---

## Getting started

### Prerequisites

- Node 20+, pnpm 9+
- MySQL running on port 8889 (MAMP default)
- Redis running on port 6379

### 1. Clone and install

```bash
git clone https://github.com/DanGeorge35/riddlesandlocks.git
cd riddlesandlocks
pnpm install
```

### 2. Configure environment

```bash
cp .env.example .env
```

Edit `.env` and set your credentials:

```env
DATABASE_URL=mysql://root:root@127.0.0.1:8889/riddlesnlock
JWT_SECRET=<at least 32 chars>
JWT_REFRESH_SECRET=<at least 32 chars>

# Optional — Google OAuth
GOOGLE_CLIENT_ID=
GOOGLE_CLIENT_SECRET=
GOOGLE_CALLBACK_URL=http://localhost:4000/api/v1/auth/google/callback
```

### 3. Create the database

Create a schema named `riddlesnlock` in MySQL, then run:

```bash
cd apps/api
pnpm prisma migrate deploy
```

### 4. Start everything

```bash
# From monorepo root
pnpm dev
```

| Service   | URL                          |
| --------- | ---------------------------- |
| Web app   | http://localhost:3000        |
| API       | http://localhost:4000/api/v1 |
| Storybook | http://localhost:6006        |

---

## Auth flow

```
/sign-in
  ├── Google OAuth  →  /auth/google  (redirects back with tokens)
  └── Email         →  POST /auth/email/request
                          ↓ 6-digit OTP printed to API console in dev
                      POST /auth/email/verify
                          ↓
                      POST /auth/terms/accept  (first time only)
                          ↓
                      /lobby
```

**Dev OTP:** when `SMTP_HOST` is empty the API prints the code to its console:

```
[DEV OTP] user@example.com → 482913
```

---

## Player levels

| Level           | Reached by                   | Exhibition entry |
| --------------- | ---------------------------- | ---------------- |
| Novice          | Sign up                      | 1 USDT           |
| Apprentice      | Win 1 Novice Exhibition      | 2 USDT           |
| Riddler         | Win 3 Apprentice Exhibitions | 5 USDT           |
| Enigmatist      | Win 5 Riddler Exhibitions    | 10 USDT          |
| Master of Minds | Win 7 Enigmatist Exhibitions | 25 USDT          |

Practice is always free. AI tools are openly allowed.

---

## Roadmap

- [x] Phase 0 — Monorepo scaffold, design system (31 components), Prisma schema
- [x] Phase 1 — Storybook stories for all components
- [x] Phase 2 — Auth & Onboarding (email OTP + Google OAuth, terms gate)
- [ ] Phase 3 — Ledger, wallet, on-chain USDT (Polygon + Solana)
- [ ] Phase 4 — Riddle engine (pieces, attempts, commit–reveal)
- [ ] Phase 5 — Lobby, Exhibition, Weekly, Legendary flows
- [ ] Phase 6 — Admin panel
- [ ] Phase 7 — PWA, region blocking, referrals

---

## License

Private. All rights reserved — Dan George.
