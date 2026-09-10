# Ideas into new worlds

An interactive portfolio for Sherzod Akhmedov, a Middle Flutter and full-stack developer.

## Design read

A project expedition for recruiters and technical leads. The visual language is a contemporary engineering exhibition: large geometric typography, orbital objects, real project screens, restrained instrumentation, and a mineral palette.

DESIGN_VARIANCE: 9 / MOTION_INTENSITY: 8 / VISUAL_DENSITY: 4.

The motion is purposeful: an explorable orbital sculpture introduces the breadth of the work; project tilt invites opening a case study; the systems lab explains architecture; a short keyboard/touch game demonstrates stateful interaction. Recruiters can bypass exploration using the summary dialog, direct CV download, project search, and case-study links.

## System

- Space Grotesk display, Manrope body (including Cyrillic), IBM Plex Mono annotations. Self-hosted by next/font.
- Dark: ink #10120f, mineral #eff1e8, lime #c4e98d.
- Light: mineral #eff0e9, ink #22271e, forest #385917. The accent gets darker to retain accessible contrast.
- Pill buttons; 16px visual panels; 10px internal interactive controls. Original brand glyph.
- All motion respects the system reduced-motion setting and the manual pause control.
- No ambient audio, forced intro, scroll hijacking, or game required to see the work.
- Desktop asymmetry collapses to a single-column mobile reading flow.

## Rendering

The home and case-study routes are statically generated. Content remains present in the initial HTML. Client components own their specific interactions. An animated transparent render of the actual sculpture appears first. Three.js loads on pointer exploration, explicit activation, model selection, or keyboard rotation in an isolated canvas with original procedural geometry, no external model requests, capped pixel ratio, no shadow maps, and on-demand rendering when paused/offscreen. Failure to initialize WebGL falls back to a CSS orbital illustration.

## Content corrections

Current user instructions override the earlier career files:

- Middle, never Senior in the current role.
- WIUT: 2021-present, studies ongoing. No graduation claim.
- Exclude the entire six-apps / 10,000 active users / 99.8% crash-free claim, including summary duplicates.
- Use career start January 2024 rather than the unsupported 3+ years claim.
- Do not link private repositories as if publicly accessible.
- Safar One screenshots are real assets from its public README. Other project artwork is an original conceptual illustration, not a product screenshot.
