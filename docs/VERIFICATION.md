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

`npm run test:e2e`: **8 passed**, 18.3 seconds. Chrome headless on macOS, production server at port 3100. Test source is in `tests/portfolio.spec.ts`.

1. Real content and candidate corrections, project filters and expansion, case-study navigation, public-code link, locale-preserving switch, valid downloadable PDF.
2. Cmd/Ctrl+K search, technology matching, empty-state feedback, recruiter facts, Escape dismissal, and keyboard focus restored to the recruiter button.
3. Architecture selection and node explanations; actual game completion by keyboard in 12 moves; restart resets state; collision blocks movement without increasing the counter.
4. Explicit activation of the original sculpture preview into a rendered WebGL canvas, model selection, assemble/disassemble state, manual animation pause, and persisted theme preference after reload.
5. All 16 case-study routes return HTTP 200; missing case study returns 404; structured metadata, Open Graph PNG, and all 18 sitemap entries.
6. Russian at a 390x844 viewport, operating-system reduced motion, mobile menu navigation, touch-control movement, and no horizontal overflow.
7. Axe WCAG 2 A/AA and 2.1 A/AA checks: zero automated violations on the initial home page and recruiter dialog in **both dark and light themes**.

8. A browser with WebGL disabled receives a visible preview, a clear fallback message, and disabled 3D-only controls instead of a stuck loading indicator.

## Visual review

The running site was captured and inspected at desktop and phone sizes. The orbital scene rendered successfully, the English and Russian hero copy remained readable, both color themes retained contrast, and real Safar One screenshots were displayed without distortion. No page-level JavaScript errors were recorded in the visual inspection pass.

## Scope and limits

Automated accessibility checks supplement keyboard and visual checks; they are not a complete assistive-technology certification. Browser testing uses Chrome with software WebGL; this is not a physical Android/iPhone GPU benchmark. The supplied career metrics are sourced from the owner’s materials, not independently audited analytics.

Vercel configuration and deployment instructions are included. No Vercel account was linked and no public deployment was performed.

## Additional final browser review

`node scripts/finish-review.mjs` verified widths **320, 390, 768, 1024, 1366, and 1440px**, with no horizontal overflow. Mobile menu search works. The main content, selected project links, and ongoing education remain available with JavaScript disabled. Disabling WebGL produces the completed preview state. No unhandled JavaScript errors were recorded in the standard-page review.

Preview images and the detailed additional-review result are in `docs/preview/`.

## Final Lighthouse measurements

Local production server, Lighthouse 13, Chrome headless. These are lab measurements of the initial page before intentional 3D activation; they are not field Core Web Vitals.

| Category                 | Desktop | Mobile |
| ------------------------ | ------- | ------ |
| Performance              | 100     | 90     |
| Accessibility            | 100     | 100    |
| Best practices           | 100     | 100    |
| SEO                      | 100     | 100    |
| First contentful paint   | 0.2 s   | 0.9 s  |
| Largest contentful paint | 0.7 s   | 3.6 s  |
| Total blocking time      | 0 ms    | 10 ms  |
| Cumulative layout shift  | 0       | 0      |

The mobile LCP is above the 2.5 s target in throttled simulation; the principal content appears earlier. Remaining opportunities are reducing initial JavaScript/font work and further tuning image delivery. Initial shader compilation was removed from page load by the documented intent-based 3D policy, with an original animated preview. All three interactive models remain available and browser-tested.

The complete HTML reports and machine-readable metrics are in `docs/performance/`. After the final accessible-name cleanup, the targeted accessibility test passed again in both themes; the Lighthouse accessible-name diagnostic is also clear.
