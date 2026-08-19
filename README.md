# Portfolio / CV site

Bilingual (PT/EN), animated résumé site. React + Vite + TypeScript + Tailwind CSS v4 + Framer Motion, deployed to GitHub Pages via GitHub Actions.

## Working on this from any machine

```bash
git clone <this-repo-url>
cd 1git_profile
npm install
npm run dev
```

Opens at `http://localhost:5173`.

```bash
npm run build     # production build to dist/
npm run preview   # preview the production build locally
npm run lint       # oxlint
```

## Where the content lives

All page copy is in `src/locales/en.json` and `src/locales/pt.json`, mirrored key-for-key. **Everything marked `TODO` still needs your real content** — name, role, tagline, experience, skills, projects, education, contact info. Edit both files together so the two languages never drift apart.

Also add your résumé PDF at `public/resume.pdf` — the hero's "Download CV" button links to `/resume.pdf`.

## Structure

```
src/
  components/            one file per page section, plus Nav/Footer/shared bits
  components/originkit/  vendored Originkit components (globe, keycap button, pixeldrift)
  hooks/useGeoCompanion  tracks which section is in view, for the globe
  lib/geoStops.ts        section id -> real-world coordinates the globe flies to
  locales/               en.json, pt.json — all copy
  i18n.ts                react-i18next setup (browser-language detection + localStorage)
  index.css              Tailwind import + color/font tokens
public/geo/              land polygons the globe renders from (vendored, not fetched remotely)
```

Section components read their copy via `useTranslation()` — to add or reorder a section, add the JSON block, add the component, and drop it into `src/App.tsx`.

The globe on the right is driven by scroll only: `lib/geoStops.ts` maps each section to a place, and `GlobeCompanion` spins the globe to it as that section comes into view. Adding a stop means adding an id there plus a matching `geoStops.<id>` entry in **both** locale files.

## Deploying

Push to `main` — `.github/workflows/deploy.yml` builds and deploys to GitHub Pages automatically. One-time setup on GitHub: **Settings → Pages → Build and deployment → Source: GitHub Actions**.

This repo is set up as a **user page** (`vite.config.ts` has `base: '/'`): [github.com/JoaoCarlos134/joaocarlos134.github.io](https://github.com/JoaoCarlos134/joaocarlos134.github.io), served at `https://joaocarlos134.github.io/`. If you ever fork this into a differently-named repo (a project page), change `base` in `vite.config.ts` to `'/<repo-name>/'`.

## Notes for this machine / a new machine

- Requires Node 20+.
- If `npm install` fails with `SELF_SIGNED_CERT_IN_CHAIN`, the machine is behind a TLS-inspecting corporate proxy (e.g. Kaspersky Endpoint Security). Fix: export that root CA and run `npm config set cafile <path-to-cert>.pem` — see git history / ask for the steps used on the original machine.
