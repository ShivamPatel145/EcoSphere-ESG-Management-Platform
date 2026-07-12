# EcoSphere — Agent Guide (read this first)

EcoSphere is an **ESG Management Platform**: it unifies environmental data (carbon), employee action (CSR + governance), and gamified engagement (challenges/badges/rewards) into one system of record, with a live **department ESG score**.

**Demo pitch:** _approve a participation → watch the ESG score move._ An HR/ESG manager approves a pending CSR participation or challenge proof in the Approval Queue; that awards XP, updates the leaderboard, and recomputes the department score on the dashboard.

---

## Tech stack

- **Next.js 15** (App Router) + **TypeScript (strict)**
- **Tailwind CSS** + **shadcn/ui** (moss-green primary `#4F7A5A`, warm paper `#FAF9F5`, dark ink `#1F2937`)
- **Drizzle ORM** + **Neon serverless Postgres** (`drizzle-orm/neon-http` + `@neondatabase/serverless`)
- **drizzle-kit `push`** workflow — no migration files
- **Auth.js v5** (next-auth beta), Credentials provider + JWT sessions
- **Zod**, **@tanstack/react-query**, **recharts**, **lucide-react**, **bcryptjs**

---

## Golden rules

1. **Each dev edits ONLY their owned folders** (see ownership table). Cross-boundary edits are limited to the two sanctioned cases below.
2. **`src/db/schema.ts` is FROZEN** — schema changes go through **Shivam** only. Never edit tables/enums/columns yourself.
3. **Shared components in `src/components/shared` are edited only by their owner (Shivam).** Consume them; don't fork them.
4. **Conventional commits** `type(scope): message` (e.g. `feat(carbon): add drawer`). **No squash** — keep history granular.
5. **Rebase on `dev` before every PR.** PRs target **`dev`**, never **`main`**.
6. **Two hard cuts stay cut:** (a) **manual carbon entry only** — no ERP/auto-ingest; (b) **4 standard reports** (Environmental, Social, Governance, ESG Summary) — no custom report builder.

---

## Ownership

| Owner | Modules / folders |
|-------|-------------------|
| **Shivam** (platform) | Foundation, auth, RBAC, app shell, shared UI kit, **scoring engine**, **dashboard**, **notifications**, **departments**, **esg-config**, `src/db/schema.ts` |
| **Mitesh** | **Environmental** (emission factors, product ESG profiles, carbon transactions, environmental goals) + **categories** |
| **Hetvi** | **Social** (CSR activities, participation, diversity) + **Governance** (policies, acknowledgements, audits, compliance issues) + **ApprovalQueue** |
| **Shreya** | **Gamification** (challenges, participation, badges, rewards, leaderboard) + **Reports** (4 standard) |

---

## Two sanctioned cross-boundary edits

1. **Provider registration one-liners** — module owners add a single `registerProvider(...)` line in `src/server/scoring.ts` → `registerProviders()`. That's the only edit allowed there.
2. **Shreya's badge hook** — Shreya wires the badge-award hook into Hetvi's approval flow at the `// TODO(shreya)` marker in the social/governance approval code. Only that marker line.

---

## Key conventions

- **Every API route** wraps `withAuth()` (from `src/server/api-helpers.ts`) **and** calls `requirePermission(session, entity, action)` (from `src/server/permissions.ts`). `withAuth` maps `ZodError → 422`, permission `Response → 403`, unknown → 500.
- **Validate all input with Zod** before touching the DB.
- **List + slide-over Drawer is the standard CRUD pattern** for every module. Reference implementation: **Carbon Transactions**. Use `DataTable` for the list and `RecordDrawer` for create/edit; `FormField` for inputs.
- **Status colors** come from `StatusPill` (`src/components/shared/status-pill.tsx`): DRAFT grey; ACTIVE/CONFIRMED/APPROVED/RESOLVED green; VALIDATED blue; NEEDS_REVIEW/REJECTED red; UNDER_REVIEW/PENDING amber; ARCHIVED zinc.
- **XP vs points:** **XP = lifetime** (drives levels + leaderboard, never decreases). **points = spendable** (`totalXp − sum(redemptions)`), used for rewards. The `xp_ledger` table records both (redemptions are negative rows sourced `redeem:<id>`).
- **Levels** come from `LEVELS` in the schema, resolved via `getLevel(totalXp)` in `src/lib/levels.ts`: Sprout 0 · Grower 500 · Steward 1500 · Champion 3000 · Guardian 6000.
- **Scoring:** call `ScoreProvider.getScore(deptId, period)` → `0..100`. Weighted by esg_config (env 0.4 / soc 0.3 / gov 0.3).

---

## ScoreProvider contract

Defined in `src/server/scoring.ts`:

```ts
interface ScoreProvider {
  pillar: 'environmental' | 'social' | 'governance'
  name: string
  getScore(deptId: string, period: string): Promise<number> // 0..100
}
```

- Register your provider with `registerProvider(provider)` inside `registerProviders()`.
- The engine fans in across all registered providers per pillar (averaged), then applies esg_config weights → department total (0..100).
- `getScore(deptId, period)` in the same file is the public entry the dashboard calls.

---

## Commands

```bash
npm run db:push   # push FROZEN schema to Neon (drizzle-kit push)
npm run db:seed   # seed rich demo data (idempotent, safe to re-run)
npm run dev       # dev server → http://localhost:3000
npm run build     # production build / type-check
```

Requires `.env` with `DATABASE_URL` and `AUTH_SECRET` (see `.env.example`). **Never commit `.env`.**

---

## Login table (all password `demo1234`)

| Email | Role |
|-------|------|
| admin@ecosphere.dev | ADMIN |
| esg@ecosphere.dev | ESG_MANAGER |
| hr@ecosphere.dev | HR_MANAGER |
| auditor@ecosphere.dev | AUDITOR |
| compliance@ecosphere.dev | COMPLIANCE_OFFICER |
| priya@ecosphere.dev | EMPLOYEE |
| karan@ecosphere.dev | EMPLOYEE |
| aditi@ecosphere.dev | EMPLOYEE |

---

## Where to look

- **Schema (FROZEN):** `src/db/schema.ts`
- **DB client:** `src/db/index.ts` · **Seed:** `src/db/seed.ts`
- **Permissions matrix + `requirePermission`:** `src/server/permissions.ts`
- **API wrapper `withAuth`:** `src/server/api-helpers.ts`
- **Scoring engine + ScoreProvider:** `src/server/scoring.ts`
- **Shared UI kit:** `src/components/shared` (DataTable, RecordDrawer, FormField, StatusPill, ConfirmDialog, EmptyState, KpiTile, ChartCard, FilterBar)
- **App shell:** `src/components/app-shell` (sidebar, topbar)
- **Auth config:** `src/auth.ts` · **Middleware:** `src/middleware.ts`
- **Levels helper:** `src/lib/levels.ts`
