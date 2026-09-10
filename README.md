# Sherzod Akhmedov · Interactive portfolio

A bilingual Next.js portfolio with an original interactive 3D sculpture, eight project case studies, a systems architecture lab, a playable orbit mission, project search, and a recruiter summary.

## Run locally

Requires Node.js 22 or newer.

```bash
npm ci
npm run dev
```

Open http://localhost:3000. English is at `/`, Russian at `/ru`.

```bash
npm run typecheck
npm run lint
npm run build
npm start
```

## Deploy to Vercel

1. Push this `portfolio` folder to a Git repository, either as the repository root or inside this CV repository.
2. Import the repository in Vercel.
3. If the repository contains the parent CV documents, set **Root Directory** to `portfolio`. If this folder is the repository root, leave the root setting as `.`.
4. Use the automatically detected **Next.js** preset and Node.js 22 or 24. Build command: `npm run build`; install command: `npm ci`. Keep the default output directory.
5. Deploy. No API keys, database, paid 3D assets, or required environment variables.
6. For a custom domain, set optional `NEXT_PUBLIC_SITE_URL=https://your-domain.example` and redeploy so canonical social metadata and sitemap use it. Vercel’s production URL is picked up automatically otherwise.

Alternative, from this directory with your Vercel account authenticated:

```bash
npx vercel
npx vercel --prod
```

The project is prepared for deployment. Building it locally does not publish it to Vercel.

## Edit content

- `src/lib/content.ts`: identity, contacts, bilingual project data, experience, skills.
- `src/components/home-page.tsx`: biography, education, and home-page narrative.
- `src/components/navigation.tsx`: recruiter summary and search.
- `public/Sherzod-Akhmedov-CV-RU.pdf`: the corrected downloadable CV.
- `src/app/globals.css`: design tokens, layouts, responsive rules, and reduced-motion fallbacks.
- `src/components/orbital-scene.tsx`: original Three.js geometry and materials.
- `src/components/playground.tsx`: architecture explorer and fully local mini-game.

The role is **Middle**. WIUT is **ongoing**. The removed six-apps / active-users / crash-free claim is absent. These corrections take precedence over the older CV files in the parent directory.

## Features

- Animated original sculpture preview with intent-loaded, rotatable 3D world, mobile device, and modular system; assemble/disassemble and keyboard rotation controls.
- Static, readable initial HTML and a WebGL failure fallback.
- Eight bilingual case studies (18 primary content routes).
- Public source-code links; honest handling of private projects.
- Real Safar One screenshots from the owner’s repository.
- Filterable project gallery and `Cmd/Ctrl + K` project search.
- Accessible recruiter dialog with PDF download.
- Systems lab explaining real project architectures.
- Keyboard/touch orbit game with completion and reset states.
- System-aware light/dark themes, manual motion pause, reduced-motion support.
- Local clipboard copy with a manual fallback, email and social contact links.
- Metadata, generated Open Graph image, sitemap, robots file, and not-found/error pages.

## Verification

```bash
npm run test:e2e
```

Tests run against a production server at `127.0.0.1:3100` (or `PORTFOLIO_TEST_URL`). Set `PLAYWRIGHT_CHROME_PATH` to an installed Chrome binary, or run `npx playwright install chromium` to use Playwright’s browser. See `docs/VERIFICATION.md` for the actual completed checks and limits.

Design decisions and online inspiration are documented in `docs/DESIGN.md`, `docs/RESEARCH_AND_SOURCES.md`, and `docs/HYPER_PORTFOLIO_PROMPT.md`.
