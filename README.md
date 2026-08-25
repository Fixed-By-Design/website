# Fixed by Design

The official website for [Fixed by Design](https://github.com/Fixed-By-Design), an opinionated Fabric modpack that redesigns Minecraft Survival.

The site is the project's understanding and decision layer. GitHub stays the development layer, Minecraft the playtesting layer, Modrinth the distribution layer.

## Stack

Nuxt 4 with TypeScript strict mode, Nuxt UI 4 on Tailwind CSS 4, Nuxt Content 3 for Git-based documentation, Drizzle ORM on PostgreSQL for runtime data, and nuxt-auth-utils for GitHub OAuth.

## Where things live

Anything a maintainer authors as prose lives in Git under `content/` and is edited by opening a pull request. Anything the application mutates at runtime lives in PostgreSQL.

| Content | Where |
| :-- | :-- |
| Features | `content/features/*.md` |
| Wiki | `content/wiki/*.md` |
| Design decisions | `content/design/*.md` |
| Changelog | `content/changelog/*.md` |
| Standalone pages | `content/pages/*.md` |
| Feedback, problems, roadmap, users, API keys | PostgreSQL |

Collection schemas are defined in `content.config.ts`. The database schema is `server/database/schema.ts`.

## Running it

```bash
pnpm install
cp .env.example .env          # then fill it in
createdb fixed_by_design
pnpm db:migrate
pnpm db:seed
pnpm dev
```

`.env` needs a `NUXT_SESSION_PASSWORD` of at least 32 characters, a `NUXT_DATABASE_URL`, and a GitHub OAuth application with `http://localhost:3000/auth/github` as its callback URL. Put your own GitHub login in `NUXT_ADMIN_GITHUB_LOGINS` to be promoted to admin on first sign-in.

The seed script prints a development server API key you can use against the Minecraft endpoint.

## Commands

| | |
| :-- | :-- |
| `pnpm dev` | Development server |
| `pnpm build` | Production build |
| `pnpm test` | Unit tests |
| `pnpm lint` | ESLint |
| `pnpm typecheck` | Type check |
| `pnpm db:generate` | Generate a migration from the schema |
| `pnpm db:migrate` | Apply migrations |
| `pnpm db:seed` | Reset and reseed the database |
| `pnpm db:studio` | Drizzle Studio |

## Adding content

**A wiki page.** Create `content/wiki/<order>.<slug>.md` with `title`, `description`, `section` and `order` in the frontmatter. The numeric prefix sets ordering and is stripped from the URL. The sidebar groups by `section` automatically.

**A feature.** Create `content/features/<slug>.md`. Required frontmatter: `title`, `summary`, `category`, `pillar`, `mod`, `status`, `vanilla`, `problem`, `solution`. Setting `featured: true` puts it on the homepage. No application code changes.

**A design decision.** Create `content/design/<slug>.md` with `title`, `summary` and `decidedOn`. Follow the Problem, Evidence, Constraints, Considered solutions, Decision, Consequences structure.

**A roadmap item.** Roadmap items live in the database. In this version the seed script is the editor; edit `server/database/seed.ts` and re-run `pnpm db:seed`.

## The Minecraft feedback API

```
POST /api/v1/feedback
Authorization: Bearer <server api key>
```

```json
{
  "message": "Villages feel too common",
  "player": "PlayerName",
  "playerUuid": "...",
  "version": "1.8.0",
  "server": "playtest",
  "dimension": "minecraft:overworld",
  "x": 120.5,
  "y": 68,
  "z": -348.2
}
```

`id`, `createdAt`, `status` and `source` are generated server-side. Keys are stored as a SHA-256 hash plus a lookup prefix, verified in constant time, rate limited per key, and revocable through the `revoked_at` column.

## Roles

`visitor`, `player`, `contributor`, `maintainer`, `admin`. Every check runs server-side through `requireRole` in `server/utils/auth.ts`. Frontend visibility is a convenience, never the boundary.

## Object boundaries

These are deliberately separate and should stay that way.

**Feature** is something that exists in the game. **Wiki page** is documentation for using it. **Feedback** is a raw player observation. **Problem** is a structured synthesis of an actual design problem, built from many feedback entries. **Proposal** is one possible solution. **Design decision** is the accepted solution and its reasoning. **Roadmap item** is a public initiative. **GitHub issue** is concrete development work, and lives on GitHub.

Feedback never becomes a GitHub issue automatically, and one problem is never one feedback entry.

## What is deliberately not built

No Discord clone, no GitHub Issues clone, no Modrinth clone, no generic CMS. External systems are referenced, not rebuilt.

## Not yet implemented

GitHub issue synchronisation, automatic Modrinth release fetching, a proposal and design decision editor, and contributor assignment. The schema and routing are prepared for all of them; the current implementation uses external links and Git-based content.
