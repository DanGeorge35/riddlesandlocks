# Graph Report - riddlesandlocks (2026-11-23)

## Corpus Check

- 42 files · ~16,810 words
- Verdict: corpus is large enough that graph structure adds value.

## Summary

- 582 nodes · 667 edges · 61 communities (32 shown, 29 thin omitted)
- Extraction: 100% EXTRACTED · 0% INFERRED · 0% AMBIGUOUS · INFERRED: 3 edges (avg confidence: 0.75)
- Token cost: 0 input · 0 output

## Community Hubs (Navigation)

- UI Components & Tailwind
- FRD: Architecture & Jobs
- API TypeScript Config
- Cross-App Dependencies
- Docker Compose Services
- Root Package Config
- Shared: Answer & DTOs
- TypeScript Type Deps
- API Package Dev Config
- Turborepo Pipeline
- Prisma Seed Config
- API Runtime Dependencies
- Base TypeScript Config
- Chain Adapter Interface
- Shared Package Config
- Play Engine & Security
- Root TS Config
- NestJS App Bootstrap
- Config Package Exports
- Next.js TS Config
- UI Package Dev Config
- UI Package Exports
- API-Config Linkage
- React DOM Deps
- Web Dev Config
- API Scripts
- NestJS CLI Config
- Prisma Client & Seed
- UI Storybook Scripts
- API Prisma Config
- DB Models: Game
- React Type Deps
- Class Transformer Dep
- Class Validator Dep
- JWT Module Dep
- Passport Module Dep
- Schedule Module Dep
- Swagger Module Dep
- Passport-JWT Dep
- Reflect Metadata Dep
- RxJS Dep
- BullMQ Dep
- Helmet Dep
- NestJS Core Dep
- Zod Dep
- Ethers v6 Dep
- SPL Token Dep
- Entry & Attempt Concepts
- FRD Economy Core
- Level Progression
- Game Modes
- Auth System
- Wallet & Chain
- Admin & Moderation
- Design Tokens CSS
- Tailwind Preset
- Money & LevelBadge
- DB Models: Finance

## God Nodes (most connected - your core abstractions)

1. `compilerOptions` - 13 edges
2. `typescript` - 12 edges
3. `compilerOptions` - 10 edges
4. `@riddlesandlocks/config` - 10 edges
5. `compilerOptions` - 9 edges
6. `tasks` - 8 edges
7. `scripts` - 8 edges
8. `scripts` - 8 edges
9. `ChainAdapter` - 8 edges
10. `compilerOptions` - 7 edges

## Surprising Connections (you probably didn't know these)

- `typescript@^5.7.3` --declares--> `typescript` [EXTRACTED]
  apps/web/package.json → package.json
- `typescript@^5.7.3` --declares--> `typescript` [EXTRACTED]
  packages/chain/package.json → package.json
- `@riddlesandlocks/config@workspace:*` --declares--> `@riddlesandlocks/config` [EXTRACTED]
  packages/chain/package.json → apps/api/package.json
- `typescript@^5.7.3` --declares--> `typescript` [EXTRACTED]
  apps/api/package.json → package.json
- `typescript@^5.7.3` --declares--> `typescript` [EXTRACTED]
  packages/shared/package.json → package.json

## Import Cycles

- None detected.

## Hyperedges (group relationships)

- **Core Economy Rules** — docs_frd_economy_entry_split, docs_frd_economy_payout, docs_frd_referral_commission, docs_frd_micro_usdt, docs_frd_double_entry [EXTRACTED 1.00]
- **Monorepo Package Architecture** — docs_frd_pkg_shared, docs_frd_pkg_ui, docs_frd_pkg_chain, docs_frd_app_web, docs_frd_app_api [EXTRACTED 1.00]
- **Core Security Mechanisms** — docs_frd_hmac_answer, docs_frd_commit_reveal, docs_frd_idempotency, docs_frd_solve_race [EXTRACTED 1.00]

## Communities (61 total, 29 thin omitted)

### Community 0 - "UI Components & Tailwind"

Cohesion: 0.05
Nodes (24): config, AnswerInput(), AnswerInputProps, ButtonProps, Size, Variant, variantClasses, ChipProps (+16 more)

### Community 1 - "FRD: Architecture & Jobs"

Cohesion: 0.06
Nodes (34): apps/api (NestJS + Prisma), apps/web (Next.js 15 App Router), BullMQ + Redis (job queue), ChainAdapter Interface, Component Library (Button, Input, Chip, PotCard...), Design Tokens (CSS variables from Figma), Game Card (promo credit), Job: chain.watchDeposits (+26 more)

### Community 2 - "API TypeScript Config"

Cohesion: 0.06
Nodes (31): compilerOptions, baseUrl, paths, exclude, extends, include, compilerOptions, baseUrl (+23 more)

### Community 3 - "Cross-App Dependencies"

Cohesion: 0.07
Nodes (29): @riddlesandlocks/shared@workspace:_, @riddlesandlocks/shared, nextConfig, dependencies, next@15.3.0, react@^19.0.0, @riddlesandlocks/shared@workspace:_, @riddlesandlocks/ui@workspace:* (+21 more)

### Community 4 - "Docker Compose Services"

Cohesion: 0.07
Nodes (31): MP_MAX_MESSAGES, POSTGRES_DB, POSTGRES_PASSWORD, POSTGRES_USER, interval, retries, test, timeout (+23 more)

### Community 5 - "Root Package Config"

Cohesion: 0.08
Nodes (29): devDependencies, husky@^9.1.7, lint-staged@^15.4.3, prettier@^3.5.3, turbo@^2.5.4, @turbo/gen@^2.5.4, typescript@^5.8.3, engines (+21 more)

### Community 6 - "Shared: Answer & DTOs"

Cohesion: 0.08
Nodes (17): AgreeTermsDto, CommitDto, CreateEntryDto, DepositAddressDto, EmailStartDto, EmailVerifyDto, GoogleAuthDto, PieceCheckDto (+9 more)

### Community 7 - "TypeScript Type Deps"

Cohesion: 0.10
Nodes (23): @types/node@^22.0.0, @types/node, @types/node@^22.0.0, dependencies, ethers@^6.13.4, @solana/kit@^2.1.0, @solana/spl-token@^0.4.9, devDependencies (+15 more)

### Community 8 - "API Package Dev Config"

Cohesion: 0.12
Nodes (22): devDependencies, jest@^29.7.0, @nestjs/cli@^10.4.9, @nestjs/testing@^10.4.15, prisma@^6.2.1, ts-jest@^29.2.5, ts-node@^10.9.2, @types/express@^5.0.0 (+14 more)

### Community 9 - "Turborepo Pipeline"

Cohesion: 0.09
Nodes (22): dependsOn, inputs, outputs, outputs, cache, persistent, dependsOn, $schema (+14 more)

### Community 10 - "Prisma Seed Config"

Cohesion: 0.10
Nodes (18): compilerOptions, module, moduleResolution, outDir, extends, include, compilerOptions, emitDecoratorMetadata (+10 more)

### Community 11 - "API Runtime Dependencies"

Cohesion: 0.11
Nodes (18): dependencies, bullmq@^5.37.0, helmet@^8.0.0, @nestjs/common@^10.4.15, @nestjs/core@^10.4.15, @nestjs/websockets@^10.4.15, passport@^0.7.0, @riddlesandlocks/chain@workspace:* (+10 more)

### Community 12 - "Base TypeScript Config"

Cohesion: 0.13
Nodes (14): compilerOptions, declaration, declarationMap, esModuleInterop, forceConsistentCasingInFileNames, isolatedModules, lib, moduleResolution (+6 more)

### Community 13 - "Chain Adapter Interface"

Cohesion: 0.22
Nodes (5): ChainAdapter, ChainId, ChainTransfer, DepositAddress, SendResult

### Community 14 - "Shared Package Config"

Cohesion: 0.17
Nodes (12): dependencies, zod@^3.24.1, exports, zod, main, name, private, scripts (+4 more)

### Community 15 - "Play Engine & Security"

Cohesion: 0.17
Nodes (9): Admin Approve & Lock (hash + delete), Final Answer, normaliseAnswer() — A-Z 0-9 uppercase, Phase 4: Riddles & Play Engine, Piece (sub-puzzle), Piece Check (free, limited), Riddle, Social Clue (drop + archive) (+1 more)

### Community 16 - "Root TS Config"

Cohesion: 0.17
Nodes (11): compilerOptions, esModuleInterop, isolatedModules, lib, moduleResolution, noUncheckedIndexedAccess, resolveJsonModule, skipLibCheck (+3 more)

### Community 17 - "NestJS App Bootstrap"

Cohesion: 0.25
Nodes (3): AppModule, HealthController, @nestjs/common

### Community 18 - "Config Package Exports"

Cohesion: 0.18
Nodes (10): exports, ./eslint, ./eslint-next, ./prettier, ./tsconfig.json, ./tsconfig.nest.json, ./tsconfig.nextjs.json, name (+2 more)

### Community 19 - "Next.js TS Config"

Cohesion: 0.18
Nodes (10): compilerOptions, jsx, lib, module, paths, plugins, target, extends (+2 more)

### Community 20 - "UI Package Dev Config"

Cohesion: 0.18
Nodes (11): devDependencies, postcss@^8.5.1, storybook@^8.5.3, @storybook/addon-essentials@^8.5.3, @storybook/react@^8.5.3, vite@^6.0.7, postcss, storybook (+3 more)

### Community 21 - "UI Package Exports"

Cohesion: 0.20
Nodes (9): @storybook/react-vite@^8.5.3, exports, ./tokens.css, main, name, private, types, version (+1 more)

### Community 22 - "API-Config Linkage"

Cohesion: 0.22
Nodes (9): @riddlesandlocks/config@workspace:_, typescript@^5.7.3, @riddlesandlocks/config, devDependencies, @riddlesandlocks/config@workspace:_, typescript@^5.7.3, @riddlesandlocks/config@workspace:*, typescript@^5.7.3 (+1 more)

### Community 23 - "React DOM Deps"

Cohesion: 0.25
Nodes (9): react-dom@^19.0.0, react-dom, dependencies, react@^19.0.0, react-dom@^19.0.0, react, peerDependencies, react@^19.0.0 (+1 more)

### Community 24 - "Web Dev Config"

Cohesion: 0.22
Nodes (9): devDependencies, autoprefixer@^10.4.20, @riddlesandlocks/config@workspace:*, tailwindcss@^3.4.17, typescript@^5.7.3, autoprefixer, tailwindcss, autoprefixer@^10.4.20 (+1 more)

### Community 25 - "API Scripts"

Cohesion: 0.25
Nodes (8): scripts, build, dev, lint, start:prod, test, test:e2e, typecheck

### Community 26 - "NestJS CLI Config"

Cohesion: 0.29
Nodes (6): collection, compilerOptions, deleteOutDir, plugins, $schema, sourceRoot

### Community 27 - "Prisma Client & Seed"

Cohesion: 0.40
Nodes (3): @prisma/client@^6.2.1, prisma, @prisma/client

### Community 28 - "UI Storybook Scripts"

Cohesion: 0.40
Nodes (5): scripts, build-storybook, lint, storybook, typecheck

### Community 29 - "API Prisma Config"

Cohesion: 0.33
Nodes (4): @nestjs/platform-express@^10.4.15, prisma, seed, @nestjs/platform-express

### Community 30 - "DB Models: Game"

Cohesion: 0.50
Nodes (4): DB Model: Attempt, DB Model: Entry, DB Model: Piece, DB Model: Riddle

### Community 31 - "React Type Deps"

Cohesion: 0.67
Nodes (3): @types/react@^19.0.0, @types/react, @types/react@^19.0.0

## Knowledge Gaps

- **34 isolated node(s):** `./tsconfig.json`, `DB Model: Attempt`, `DB Model: Piece`, `Attempt`, `Entry (paid ticket)` (+29 more)
  These have ≤1 connection - possible missing edges. (Counts symbols only; 286 node(s) total have ≤1 connection when file, concept and rationale nodes are included.)
- **29 thin communities (<3 nodes) omitted from report** — run `graphify query` to explore isolated nodes.

## Suggested Questions

_Questions this graph is uniquely positioned to answer:_

- **Why does `typescript` connect `API-Config Linkage` to `Cross-App Dependencies`, `Root Package Config`, `TypeScript Type Deps`, `API Package Dev Config`, `Shared Package Config`, `UI Package Exports`, `Web Dev Config`?**
  _High betweenness centrality (0.074) - this node is a cross-community bridge._
- **What connects `./tsconfig.json`, `DB Model: Attempt`, `DB Model: Piece` to the rest of the system?**
  _34 weakly-connected nodes found - possible missing edges._
- **Should `UI Components & Tailwind` be split into smaller, more focused modules?**
  _Cohesion score 0.051515151515151514 - nodes in this community are weakly interconnected._
- **Why does `@riddlesandlocks/config` connect `API-Config Linkage` to `Cross-App Dependencies`, `TypeScript Type Deps`, `API Package Dev Config`, `Shared Package Config`, `UI Package Exports`, `Web Dev Config`?**
  _High betweenness centrality (0.036) - this node is a cross-community bridge._
- **Should `FRD: Architecture & Jobs` be split into smaller, more focused modules?**
  _Cohesion score 0.06153846153846154 - nodes in this community are weakly interconnected._
- **Why does `dependencies` connect `API Runtime Dependencies` to `Class Transformer Dep`, `Class Validator Dep`, `JWT Module Dep`, `Passport Module Dep`, `Schedule Module Dep`, `Swagger Module Dep`, `Passport-JWT Dep`, `API Package Dev Config`, `Reflect Metadata Dep`, `Cross-App Dependencies`, `RxJS Dep`, `Prisma Client & Seed`, `API Prisma Config`?**
  _High betweenness centrality (0.016) - this node is a cross-community bridge._
- **Should `API TypeScript Config` be split into smaller, more focused modules?**
  _Cohesion score 0.05555555555555555 - nodes in this community are weakly interconnected._
