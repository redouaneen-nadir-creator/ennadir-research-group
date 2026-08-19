# Dr. En-Nadir's Group — Website

A modern, multilingual research-group website: research areas, projects,
publications, people, and a resources hub (simulations, code, media,
documents, datasets), plus news and events — all statically generated and
deployable to **GitHub Pages** for free, with no backend and no API keys.

Publisher: **PSyPro** · Contact: radouaneennadir@gmail.com

> **This repository currently ships with sample placeholder content** so you
> can see every page working end to end. Replace it with real data — see
> [Content management](#content-management) below. Placeholders are marked
> `[ADD CONTENT]` / `[Add Name]` throughout the data files and UI.

---

## Tech stack

- **React 18** + **TypeScript**
- **Vite** — build tool and dev server
- **React Router v6** — client-side routing (with a GitHub Pages SPA fallback, see below)
- **Tailwind CSS** — styling
- Zero runtime API calls, zero required API keys — content lives in versioned JSON files under `src/data/`

## Project structure

```
src/
  components/       Reusable UI: layout (Navbar/Footer), cards, form controls, icons
  data/              Sample content as JSON, one file per entity + index.ts (typed exports, lookups, search index)
  i18n/              Translation dictionaries (en/fr/ar) + LanguageContext (locale, RTL, t()/lt())
  pages/             One folder per site section, matching the routes in App.tsx
  types/             TypeScript interfaces for every content entity
  utils/             Formatting, visibility filtering, global search index

public/
  404.html           GitHub Pages SPA fallback (see "Client-side routing on GitHub Pages")
  icons/, images/    Favicon and Open Graph image (SVG, no binary assets)
  .nojekyll          Disables Jekyll processing on GitHub Pages

.github/workflows/deploy.yml   Build + deploy to GitHub Pages via GitHub Actions
```

## Development

```bash
npm install
npm run dev
```

Opens the dev server (default `http://localhost:5173`).

## Build

```bash
npm run build
```

Type-checks the project and produces a static production build in `dist/`.
Preview it locally with:

```bash
npm run preview
```

## Deployment to GitHub Pages

This repo deploys via **GitHub Actions** — no manual `gh-pages` branch pushes.

1. Push this repository to GitHub (create it under your account/org first).
2. In the repo settings: **Settings → Pages → Build and deployment → Source**, select **GitHub Actions**.
3. Push to `main` (or run the workflow manually from the **Actions** tab). The
   [`deploy.yml`](.github/workflows/deploy.yml) workflow builds the site and
   publishes `dist/` to Pages automatically.
4. Your site will be live at `https://<your-username>.github.io/<repo-name>/`.

**Vite base path:** the workflow builds with
`VITE_BASE_PATH=/${{ github.event.repository.name }}/`, so the production
build automatically uses the correct base path for *whatever* repository
name you chose — you don't need to hardcode it anywhere. Local dev (`npm run
dev`) always serves from `/`.

**Using a custom domain instead?** Add a `CNAME` file to `public/` with your
domain, set `VITE_BASE_PATH` to `/` (edit the workflow env), and configure
the domain in the Pages settings.

### Client-side routing on GitHub Pages

GitHub Pages has no server-side rewrites, so a hard refresh on e.g.
`/projects/gan-on-si-power-devices` would normally 404. This repo uses the
standard [spa-github-pages](https://github.com/rafgraph/spa-github-pages)
technique:

- `public/404.html` redirects any unknown path to `/?/<path>`
- `index.html` has a small inline script that decodes that back into the
  real path via `history.replaceState` before React Router mounts

You don't need to touch either file unless you rename the repository *and*
serve it as something other than a standard project page (`pathSegmentsToKeep`
in `public/404.html` assumes `https://user.github.io/repo-name/...`).

## Content management

All content lives in `src/data/*.json`. There is **no database and no admin
UI yet** — content is data, versioned in Git, and rendered by generic
list/detail page components. Every entity is typed in `src/types/index.ts`,
so an editor's mistakes (e.g. a wrong `category` value) show up as a
TypeScript build error rather than a silent bug.

Entities cross-reference each other by **string IDs** (`researchAreaIds`,
`projectIds`, `authorPersonIds`, …) — set these to link a publication to its
project, a project to its researchers, and so on. See `src/data/index.ts`
(`lookup`, `resolveResources`, `projectsForPerson`, `publicationsForPerson`)
for how those relationships are resolved at render time.

### Add a publication

Edit `src/data/publications.json` and append an object matching the
`Publication` interface (`src/types/index.ts`):

```json
{
  "id": "pub-7",
  "slug": "your-publication-slug",
  "title": "Full publication title",
  "type": "journal",
  "authors": [{ "name": "R. En-Nadir", "personId": "p-pi-1" }],
  "abstract": "…",
  "journal": "Journal name",
  "year": 2026,
  "doi": "10.xxxx/xxxxx",
  "volume": "1",
  "pages": "1-10",
  "keywords": ["GaN", "HEMT"],
  "researchAreaIds": ["ra-semiconductor-materials"],
  "projectIds": ["proj-1"],
  "pdfUrl": "",
  "supplementaryUrl": "",
  "datasetIds": [],
  "codeIds": [],
  "figureIds": [],
  "externalLinks": [],
  "visibility": "public"
}
```

It immediately appears in `/publications`, its research area's page, and any
linked project/person pages.

### Add a project

Same idea in `src/data/projects.json` — see the `Project` interface. `name`
and `summary` are **localized** (`{ "en": "...", "fr": "...", "ar": "..." }`);
`fr`/`ar` are optional and fall back to `en` if omitted.

### Add a person

`src/data/people.json` — `category` must be one of `pi`, `researcher`,
`postdoc`, `phd`, `msc`, `engineer`, `collaborator`, `alumni`, which controls
which section of `/people` they appear under. Photos are optional — without
one, the UI shows an initials avatar.

### Add a simulation / code entry / dataset / document

`src/data/simulations.json`, `codes.json`, `datasets.json`, `documents.json`
respectively — each has its own typed interface. For code, link to the real
GitHub repository via `repositoryUrl` rather than duplicating source files
in this repo.

### Add a media item (SEM/TEM/AFM/XRD/… image)

`src/data/media.json`. Leave `imageUrl` empty to show a styled placeholder
tile (used throughout the sample data, since no real micrographs are
included); set it to an image path under `public/images/` once you have a
real file, keeping images reasonably sized/compressed.

### Add news / an event

`src/data/news.json` / `events.json`. Dates use `YYYY-MM-DD`. Events with an
`endDate` in the past are shown under "Past events" on `/events`.

### Visibility

Every entity has a `"visibility"` field: `"public" | "group" | "private"`.
Only `"public"` items render anywhere in the app (`src/utils/visibility.ts`
filters everything at load time). **Because GitHub Pages serves this entire
repository as public static files, `group`/`private` is an app-level
filter only — it is not real access control.** Do not commit confidential
research, unpublished drafts, or private data to this repository at all,
regardless of the `visibility` value you'd set.

## Future admin dashboard

The data layer is deliberately decoupled from the UI: pages read from
`src/data/index.ts`, never from the raw JSON files directly. That means a
private admin dashboard (add/edit/delete project, publish/unpublish, upload
image, etc.) can later be built against a real database and either (a)
regenerate these JSON files as part of a build step, or (b) replace
`src/data/index.ts`'s exports with API calls — without touching any page or
component. This repository does not implement that dashboard or a fake
database; only the static, Git-versioned data source described above.

## Internationalization (EN / FR / AR)

- UI strings live in `src/i18n/locales/{en,fr,ar}.ts` as flat `"namespace.key"` dictionaries.
- `useLanguage()` (`src/i18n/LanguageContext.tsx`) exposes `t(key)` for UI strings and `lt(localizedText)` for content fields that carry per-locale text (e.g. project names, research area titles).
- Arabic renders right-to-left automatically (`dir="rtl"` is set on `<html>` when the locale is `ar`); layout uses Tailwind's logical properties (`ps-`, `pe-`, `text-start`, RTL-aware icon flips) rather than hardcoded left/right so it mirrors correctly.
- The selected language persists in `localStorage` and is also inferred from the browser on first visit.
- To add a new UI string: add the same key to all three files in `src/i18n/locales/`. To add a fourth language: create a new dictionary file, add its locale code to `src/i18n/types.ts` (`LOCALES`, `LOCALE_LABELS`, `LOCALE_SHORT`, and `RTL_LOCALES` if it's RTL), and register it in `LanguageContext.tsx`.

## Search

`/search` and the navbar search box query a client-side index built from
every public entity (`src/utils/search.ts`) — no external search service.
Results are grouped by content type.

## SEO & accessibility

- Per-page `<title>` and meta description via `src/components/Seo.tsx`
- Open Graph tags, favicon, semantic headings
- Keyboard-navigable menus, a "skip to content" link, visible focus rings, labelled form controls and landmarks

## Security

No API keys, secrets, or credentials are required or used anywhere in this
project. Before publishing changes, double-check `src/data/*.json` and any
files you add under `public/` for anything confidential — see
[Visibility](#visibility) above.

`npm audit` currently reports moderate/high advisories against `vite`
(dev-server-only CORS issue, fixed only in Vite 8) and `react-router-dom`
(SSR-hydration deserialization and backslash open-redirect, fixed only in
v7). Neither applies to this deployment: there's no SSR here (pure
client-side rendering), and the only place user input reaches router
navigation (`NavSearch`, `Search.tsx`) inserts it as an already-encoded
query-string value, never at the start of a path, so the open-redirect
pattern isn't reachable. Upgrading to Vite 8 / React Router 7 is a
reasonable future task but involves breaking changes outside this project's
current scope — run `npm audit` periodically and re-evaluate.

## License

Add your preferred license (e.g. MIT) in a `LICENSE` file before publishing.
