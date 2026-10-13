# Verification record

Reverified after the finalized-reference design revision on 9 October 2026 in the local production preview at http://localhost:3000.

Story: a visitor explores the clinic, finds a relevant service and requests an assessment through the form. The server validates it and either returns an explicit preview response or submits a pending request notification through the configured provider.

| Check                       | Result                                                                                                                                                                                   |
| --------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Next.js production build    | Passed; all marketing and seven service routes generated                                                                                                                                 |
| TypeScript                  | Passed                                                                                                                                                                                   |
| ESLint                      | Passed; no warnings or errors                                                                                                                                                            |
| Server/security tests       | 12 passed                                                                                                                                                                                |
| Browser tests               | 9 passed                                                                                                                                                                                 |
| Automated accessibility     | No violations for the checked WCAG 2.0, 2.1 and 2.2 A/AA tags across all 13 pages at 390px and 1440px                                                                                    |
| Responsive layout           | Homepage at 320, 390, 768, 1024, 1440 and 1920px; verified 5% desktop gutters and hero imagery reaching the right edge; key secondary pages at 320 and 640px without horizontal overflow |
| Keyboard                    | Skip link, focusable controls, mobile menu Enter/Escape with focus return, native disclosures and form validation                                                                        |
| Booking preview             | Real UI → POST endpoint → validated preview response → accessible completion state                                                                                                       |
| Failed delivery UI          | Error displayed; original form values retained                                                                                                                                           |
| Live notification adapter   | Retry, stable idempotency payload, fail-closed configuration and safe audits tested with test doubles                                                                                    |
| Production dependency audit | No known vulnerabilities                                                                                                                                                                 |

## Lighthouse mobile

Final isolated local run with concurrent build/test processes stopped:

- Performance: **95**
- Accessibility: **100**
- Best practices: **100**
- SEO: **69**, because the clinic preview deliberately emits noindex/nofollow and robots Disallow until approval.
- Lab LCP: 2.9 seconds; TBT: 50 ms; CLS: 0.

The earlier design scored 91 in an isolated run. Earlier runs during concurrent local activity scored 80–89 for performance. Results vary with host load. The final run meets the brief's Lighthouse performance/accessibility goals. These are local laboratory measurements, not field Core Web Vitals or a claim that the 75th-percentile LCP target is already met. Recheck PageSpeed Insights and actual field data after deployment; original image sizes, hosting and device/network conditions will affect results.

## Visual QA and evidence

Desktop, wide-screen and mobile Home, the Services directory and the appointment page were visually inspected. Screenshots and lighthouse-editorial-mobile.json are in ignored artifacts/. The revised design follows the supplied finalized image: fluid 5% desktop gutters (72px at 1440px and 96px at 1920px), an edge-to-edge hero photograph, a compact concern navigation strip, a sage practitioner band, seven numbered service rows, a dark four-step approach band, split FAQ/contact sections and a reference-inspired footer. Mobile uses 20px gutters, reducing to 18px at the narrowest size. The desktop image reaches the viewport edge. Tests assert this geometry at 768, 1024, 1440 and 1920px.

The production build, TypeScript, lint, all 12 server tests and all 9 browser tests passed again after this revision.

Original supplied images remain labelled illustrative. Unapproved practitioner and clinic photograph placeholders are omitted from the homepage. The About page can display an approved authentic portrait and clinic photographs once supplied. Nothing represents an invented practitioner, qualification, testimonial or outcome.

## Footer reference revision

The shared footer now includes brand/tagline, existing quick links, all seven service routes, the supplied full address, both supplied telephone numbers, directions, weekday/Sunday reference hours, privacy policy, the general-awareness line and the exact credit “Designed & Developed by BizLeap”. BizLeap links to https://www.bizleap.in/ as supplied by the client, with its existing underlined styling.

The five-column desktop layout was visually checked at 1440px, the tablet layout at 1024px and mobile at 390px. Width checks at 320, 390, 768, 1024, 1440 and 1920px showed no horizontal overflow. Footer screenshots are in artifacts/footer-1440.png, footer-1024.png and footer-390.png. The fixed mobile dock is hidden only in these isolated footer captures.

Reference hours are stored separately from the still-pending approved openingHours data. They are explicitly marked for telephone confirmation in the preview. No clinic approval or indexing flag was enabled.

## Outstanding production validation

No real patient information was used. Live provider calls use test doubles. The release checker correctly fails until clinic approvals, original photos, credentials and the final domain are supplied.

The full dependency audit reports five high-severity findings along the development-only eslint-config-next → fast-glob → micromatch → braces chain. npm suggests an incompatible Next lint configuration downgrade; it was not applied. Production dependencies audit clean. Recheck for an upstream patch when updating tooling.

Automated checks are evidence, not full WCAG certification. Genuine 200% browser zoom and screen-reader testing, physical-device call/WhatsApp behavior, exact map pin, clinical copy approval, privacy/retention approval, real mail reception and bounce monitoring, custom-domain SEO, Rich Results Test, Search Console and post-launch field performance remain deployment QA items.

## Spine Care image replacement — 13 October 2026

Replaced the Spine Care screenshot crop with the client-supplied square illustration. The original is preserved in assets/source/spine-care-illustration.png and an optimized WebP is served from public/illustrations/spine-care-illustration.webp. The complete image is shown at its 1:1 aspect ratio on desktop and mobile, with descriptive alt text and an illustrative caption. The asset preparation script reproduces the WebP from the saved source.

Production build and TypeScript passed. Browser verification at 390px and 1440px confirmed that the replacement loads, remains square and introduces no horizontal overflow. Both rendered layouts were visually reviewed; screenshots are in artifacts/spine-care-390.png and artifacts/spine-care-1440.png.

## Hijama / Cupping Therapy image addition — 13 October 2026

Replaced the generic fitness equipment placeholder on the Hijama / Cupping Therapy service route with the client-supplied clinical cupping procedure photograph. The original is preserved in assets/source/cupping-therapy.jpg and optimized modern WebP files are saved in public/illustrations/cupping-therapy.webp and public/images/cupping-therapy.webp. The image is rendered with a balanced 1.4 aspect ratio, focal centering on the clinical suction cups, descriptive accessibility alt text, and clinical procedure caption. Open Graph and Twitter metadata for the service route also incorporates this image for rich social sharing previews. Tested at 1440px and 390px viewports; all tests and build pass cleanly.

