# Research and provenance

Research date: September 10-11, 2026. No personal data is fetched by the deployed site. Source material is reviewed at development time.

## Career evidence

All original Markdown documents in the parent CV directory were considered. Primary content comes from CV_Sherzod_Akhmedov_Complete_RU.html (corrected through user feedback), PORTFOLIO_AUDIT_AND_PROJECTS.md, and CAREER_ANALYSIS_AND_ROADMAP.md. Earlier English and Russian CVs contributed descriptions and technology names. Job-search advice, salary estimates, candidate rankings, and application-template claims are not presented as achievements.

The updated user-approved PDF is copied to public/Sherzod-Akhmedov-CV-RU.pdf. To update it later, replace that file.

Additional public sources reviewed:

- [Safar One repository](https://github.com/leofilllium/Taxi-Application): role-specific mobility flows, Flutter/BLoC/Maps/Express architecture, real app screenshots.
- [Lawyer AI Mobile repository](https://github.com/leofilllium/AI-UZ-Lawyer-Mobile): legal consultation modes, contracts, streaming, tasks, team access, and layered Flutter architecture.
- [MediTrack repository](https://github.com/leofilllium/00013219-CW-DSCC): academic project, actual data model, authentication, Docker/Nginx/Gunicorn, pytest, and GitHub Actions.
- [Flutter Gambling Studio](https://github.com/leofilllium/flutter-gambling-studio): public tooling for virtual-currency game workflows and verification. The portfolio describes it accurately in the game-tooling case study.
- [GitHub public repository API](https://api.github.com/users/leofilllium/repos?per_page=100): confirmed which code links are public. No repository-count inflation; the earlier 58-repository audit includes private material.

Quantitative claims such as the 36,000-document corpus, four Safar One roles, 15+ modules/builds, and finalist status are supplied by the local career records. The website does not represent this as an independent analytics audit. Unnecessary retention/latency/QA percentage claims were not used in the site copy.

## Online design prompts and engineering references

These were researched and synthesized into the original project prompt in HYPER_PORTFOLIO_PROMPT.md. They are not a claim that unrelated prompts were blindly concatenated or installed.

1. [Taste Skill](https://github.com/Leonxlnx/taste-skill), MIT. Applied the installed design-taste-frontend skill: deliberate layout direction, typography, restrained palette, mobile collapse, readable recruiter content, and motion controls.
2. [Vercel React Best Practices](https://github.com/vercel-labs/agent-skills/tree/main/skills/react-best-practices), MIT. Used static routes, dynamically loaded heavy rendering, local state, stable references, and minimal serialization. No runtime calls to the source repository.
3. [Vercel Web Interface Guidelines](https://github.com/vercel-labs/web-interface-guidelines): reference for keyboard controls, focus visibility, honest link destinations, and reduced-motion behavior.
4. [React Bits](https://github.com/DavidHDev/react-bits): inspiration for magnetic hover, 3D card tilt, and responsive motion. These components are original implementations using Motion values rather than per-frame React state. No React Bits source files are vendored or redistributed. Its project currently uses MIT plus Commons Clause, so it is described as source-available rather than an unrestricted component library.
5. [Motion scroll animation documentation](https://motion.dev/docs/react-scroll-animations): scoped scroll progress and transforms; effects avoid React state updates on continuous scroll.
6. [React Three Fiber performance guide](https://r3f.docs.pmnd.rs/advanced/scaling-performance): on-demand rendering, rendering-cost control, and reusable procedural geometry.
7. [React Three Fiber introduction](https://r3f.docs.pmnd.rs/getting-started/introduction): compatible React renderer versions. Installation selected React 19.2.8 because fiber 9.7.0 declares React >=19 and <19.3.
8. [Next.js installation](https://nextjs.org/docs/app/getting-started/installation) and [Next.js on Vercel](https://vercel.com/docs/frameworks/full-stack/nextjs): App Router, local build, static generation, and framework-native deployment.

## Asset provenance

- public/images/safar-home.png: https://github.com/user-attachments/assets/cfaae51f-518c-429b-b15c-916c310adb08
- public/images/safar-trip.png: https://github.com/user-attachments/assets/bc07c793-edcd-4bc8-9196-233a1de9b757
- Both screenshots were published in the owner’s Safar One README and are reused for the same owner’s portfolio.
- public/images/orbital-poster.png: a transparent browser capture of the original local Three.js sculpture, made with scripts/capture-art.mjs. It is used before the visitor activates WebGL.
- Font and direct-dependency license notices are saved under docs/licenses.
- All other 3D objects and project illustrations are authored in this repository. No externally hosted GLB, HDR, stock imagery, or undocumented screenshot placeholders.
- Icons: Phosphor, via its installed package. Fonts: Google Fonts through Next.js self-hosting; the package supplies font licensing.

## Privacy and hosting

The app stores only display preferences in localStorage. No tracking cookies, analytics, API keys, scraped personal-data feed, or contact-form backend. Contact actions launch the visitor’s email client or the owner’s linked profiles. Search works locally against the project data.

## Performance decision

A first Lighthouse pass identified initial WebGL shader startup as the primary CPU cost. The final site renders an animated image captured from its own original scene first, and initializes Three.js only on mouse exploration, a model-control action, explicit activation, or keyboard rotation. This is an actual loading policy used for all visitors, not audit-specific code. All case-study content remains directly readable without WebGL. Shader compilation still happens when the visitor activates 3D, so its cost has been moved to an intentional interaction rather than hidden or claimed to disappear.
