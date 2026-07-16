# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```sh
yarn dev          # start dev server (Vite, port 8080, --host)
yarn build         # tsc typecheck + vite build
yarn start         # preview a production build
yarn lint          # eslint src/**/*.{js,jsx,ts,tsx}
yarn lint:fix       # eslint --fix
yarn fm:check       # prettier --check
yarn fm:fix         # prettier --write
node scripts/generate-dashboard-spa2-pages.mjs   # (re)generate src/pages/dashboard/spa2/*.tsx boilerplate
```

There is no test framework/script configured in this repo (no `test` entry in package.json, no `*.test.*`/`*.spec.*` files).

Node 20.x is required (`engines.node`). Yarn 1.22.22 is the declared package manager, but README also documents an npm flow.

## Big-picture architecture

This is the **minimal-kit vite-ts** admin template (React 18 + TypeScript + MUI + Vite), customized into a real project: a spa business site called **spa2**, consisting of a public marketing site plus a matching admin CMS. The repo also still contains many other demo storefront templates (`spa1`, `spa3`...`spa28`, `spas-listing`, etc.) under `src/pages/*` / `src/sections/*` — these are unrelated Minimal Kit demo templates, not part of the active spa2 work.

**Imports**: absolute imports are written as `src/...` (not the `@/` tsconfig path alias, which exists but isn't the convention actually used in code). The `src(.+)` alias is defined via regex in `vite.config.ts`.

**Routing**: `src/routes/paths.ts` centralizes every route as a plain string or path-builder function (e.g. `paths.spa2.blogDetails(slug)`, `paths.dashboard.spa2...`). Route trees themselves live in `src/routes/sections/*.tsx` (`dashboard.tsx`, `dashboard-spa2.tsx`, `auth.tsx`, `auth-demo.tsx`, `main.tsx`, `components.tsx`), composed in `src/routes/sections/index.tsx`.

**Auth**: pluggable auth backends (`jwt` | `amplify` | `firebase` | `supabase` | `auth0`), selected via `CONFIG.auth.method` in `src/config-global.ts`. Each backend's context/provider lives under `src/auth/context/<method>/`; `src/auth/context/auth-context.tsx` is the shared context shape. Related env vars (Firebase/Amplify/Auth0/Supabase keys, `VITE_SERVER_URL`, `VITE_MAPBOX_API_KEY`) are read in `config-global.ts`.

### spa2 data layer — page-key driven config

Every spa2 page (public or admin) is identified by a `Spa2PageKey` string literal (`'about'`, `'services'`, `'blog'`, `'policy'`, `'gallery'`, ... see the full union in `src/api/spa2/types.ts`). `src/api/spa2/pages-config.ts` maps each key to:
- its public URL (`publicPath`, built from `src/routes/paths.ts`)
- its API endpoint (`src/api/spa2/endpoints.ts`)
- its mock data (`src/api/spa2/mock/`)

`src/api/spa2/fetch-spa2-data.ts` resolves which source (api vs mock) to use for a given key at runtime. Adding a new spa2 page means adding a key to the `Spa2PageKey` union and a matching case in each of these files.

### spa2 dashboard (admin) pages

`src/pages/dashboard/spa2/*.tsx` are thin generated files — each just calls `createDashboardSpa2Page('<pageKey>')` (see `src/sections/dashboard/spa2/create-dashboard-spa2-page.tsx`). They are produced by `scripts/generate-dashboard-spa2-pages.mjs`'s `PAGE_MAP`; add a new admin page by adding an entry there and rerunning the script rather than hand-writing the page file.

The actual admin UI lives in `src/sections/dashboard/spa2/manage/`, in two patterns:
1. **Generic CRUD** — `spa2-generic-manage-view.tsx` renders any content type driven entirely by a `Spa2ManageConfig` object (title, table fields, status presets, seed rows) declared in `spa2-manage-configs.ts`. Prefer adding a config entry here for a new simple content type instead of writing a new view component.
2. **Bespoke views** — content types with custom editing UX (about, blog, careers, services, staff, service editor, etc.) each get their own `spa2-<name>-manage-view.tsx`, re-exported from `src/sections/dashboard/spa2/manage/index.ts`.

Both patterns are wrapped in `Spa2ManageShell` (`spa2-manage-shell.tsx`), which renders the shared breadcrumb + teal gradient header (colors from `src/sections/spa2/spa2-pages-data.ts`) and an optional "Xem public" link out to the live public page.

Admin-facing copy (labels, status names, seed data) in `spa2-manage-configs.ts` and the manage views is written in Vietnamese — follow that convention for new spa2 CMS content.

**Mock data**: `src/_mock/_spa2/index.ts` holds spa2-specific mock content; `src/_mock/assets.ts` etc. hold generic ids/titles shared across the whole template.

## Code style

ESLint extends `airbnb` / `airbnb-typescript` / `airbnb/hooks` + `prettier`, plus the `perfectionist` plugin, which enforces import ordering/grouping (see `.eslintrc.cjs`): style → type → builtin/external → `custom-mui` (`@mui/**`) → `custom-routes` (`src/routes/**`) → `custom-hooks` (`src/hooks/**`) → `custom-utils` (`src/utils/**`) → internal (`src/**`) → `custom-components` (`src/components/**`) → `custom-sections` (`src/sections/**`) → `custom-auth` (`src/auth/**`) → `custom-types` (`src/types/**`) → relative → relative-type, each group sorted ascending by line length.
