# Verification

Verified on September 11, 2026 against a local **production build**, not only the development server.

## Build and source checks

- `npm run build`: PASS. Next.js 16.3.4 generates both home routes and all 16 localized case-study routes, plus metadata routes.
- `npm run lint`: PASS, no errors or warnings.
- `npm run typecheck`: PASS.
- Installed dependency audit: zero reported vulnerabilities at installation.
- Corrected PDF in `public` matches the user-approved source PDF.
- Current role is Middle. WIUT remains ongoing. Removed app/user/crash-free claims are absent from website source content.

## Browser test suite

`npm run test:e2e`: **7 passed**, 22.5 seconds. Chrome headless on macOS, production server at port 3100. Test source is in `tests/portfolio.spec.ts`.

1. Real content and candidate corrections, project filters and expansion, case-study navigation, public-code link, locale-preserving switch, valid downloadable PDF.
2. Cmd/Ctrl+K search, technology matching, empty-state feedback, recruiter facts, Escape dismissal, and keyboard focus restored to the recruiter button.
3. Architecture selection and node explanations; actual game completion by keyboard in 12 moves; restart resets state; collision blocks movement without increasing the counter.
4. A rendered WebGL canvas, model selection, assemble/disassemble state, manual animation pause, and persisted theme preference after reload.
5. All 16 case-study routes return HTTP 200; missing case study returns 404; structured metadata, Open Graph PNG, and all 18 sitemap entries.
6. Russian at a 390x844 viewport, operating-system reduced motion, mobile menu navigation, touch-control movement, and no horizontal overflow.
7. Axe WCAG 2 A/AA and 2.1 AA checks: zero automated violations on the initial home page and recruiter dialog in **both dark and light themes**.

## Visual review

The running site was captured and inspected at desktop and phone sizes. The orbital scene rendered successfully, the English and Russian hero copy remained readable, both color themes retained contrast, and real Safar One screenshots were displayed without distortion. No page-level JavaScript errors were recorded in the visual inspection pass.

## Scope and limits

Automated accessibility checks supplement keyboard and visual checks; they are not a complete assistive-technology certification. Browser testing uses Chrome with software WebGL; this is not a physical Android/iPhone GPU benchmark. The supplied career metrics are sourced from the owner’s materials, not independently audited analytics.

Vercel configuration and deployment instructions are included. No Vercel account was linked and no public deployment was performed.
