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

## Dry Needling image replacement — 13 October 2026

Replaced the generic strengthening equipment placeholder on the Dry Needling service route with the client-supplied clinical dry needling photograph with trigger points callout. The original is preserved in assets/source/dry-needling.jpg and optimized modern WebP files are saved in public/illustrations/dry-needling.webp and public/images/dry-needling.webp. The image is rendered with its native 4:3 (1.33) aspect ratio, centered framing, descriptive accessibility alt text, and clinical procedure caption. Open Graph and Twitter metadata for the route automatically utilizes this approved asset. Tested at 1440px and 390px viewports; all tests and build pass cleanly.

## Homepage hero and blend revision — 13 October 2026

Replaced the low-resolution solo stretching image with a 1536×1024 generated illustrative scene showing guided physiotherapy. The optimized WebP is 109,846 bytes. Both people and the treatment interaction stay visible. The desktop edge transition is now 60–135px (7vw within those limits), replacing a wash across 32% of the photograph. At 900px and below the hero stacks; tablet uses the native 3:2 composition and phone uses a 4:3 crop with no fade. Responsive sizes match the breakpoint.

The final production build, TypeScript, lint and all 9 existing browser tests passed. No automated WCAG-tag violations were found across all 13 routes at 390px and 1440px. Homepage geometry was checked at 320, 390, 768, 1024, 1440 and 1920px. Desktop, wide, tablet and mobile renders were visually reviewed. Other service images and the booking backend were preserved. An older Next.js preview from this project was verified by its process command line and replaced; localhost and 127.0.0.1 now serve the same current assets.

Local Lighthouse mobile: performance 96, accessibility 100, best practices 100, SEO 69. LCP 2.8 s, TBT 50 ms, CLS 0. SEO remains reduced by deliberate preview noindex. Results are laboratory measurements, not field Core Web Vitals. Report: artifacts/lighthouse-hero-mobile.json.

The original source and final prompt are preserved in assets/source/hero-physiotherapy.png and assets/source/hero-physiotherapy-prompt.md. The public image is labelled as AI-generated illustration and does not identify invented people or premises as authentic clinic staff/facilities.

## TECAR & Laser Therapy image replacement — 13 October 2026

Replaced the generic strengthening equipment placeholder on the TECAR & Laser Therapy service route with the client-supplied clinical laser therapy photograph. The original is preserved in assets/source/tecar-laser-therapy.jpg and optimized modern WebP files are saved in public/illustrations/tecar-laser-therapy.webp and public/images/tecar-laser-therapy.webp (~76.8 KB). The image is framed with a 1.4 aspect ratio and centered focal positioning, descriptive accessibility alt text, and clinical procedure caption. Open Graph and Twitter metadata for the route automatically incorporates this approved asset. Tested at 1440px and 390px viewports; all tests and build pass cleanly.

## Continuous hero blend refinement — 13 October 2026

Replaced the narrow colour overlay with an eased transparency mask that reveals the hero's shared background colour. The photo begins at 38% of the desktop viewport and reaches full opacity before the treatment interaction. Tablet and mobile retain the stacked composition with a short top-edge transition. Responsive image sizes reflect the wider 62vw desktop photo field. The actual image asset is unchanged.

The production build and TypeScript passed. Desktop at 1440px and 1920px and phone at 390px were visually reviewed. The existing responsive-layout and automated accessibility browser checks passed, covering all required homepage widths and all 13 routes on desktop/mobile. The verified older clinic preview was restarted to serve the current CSS.

## Panoramic hero rebuild — 13 October 2026

Current hero: one full-width 1983×793 photographic panorama with a quiet wall for copy on the left and the physiotherapy interaction on the right. The image itself supplies continuous colour, texture and light; previous desktop masks and overlay gradients have been removed. Home hero styles are separated into app/home-hero.css. A server-rendered HeroMedia component uses the installed Next.js art-direction API, native picture sources and mutually exclusive preload media queries. No animation or new client state was added.

Dedicated tablet and phone crops improve local detail and reduce transfer. Network inspection at 390, 768, 1024, 1440 and 1920px showed exactly one matching image request for each viewport. All widths had no horizontal overflow. CTA buttons stay together where space allows, and narrow phone layouts stack them. Text and border contrast were strengthened against the photographed background. Desktop, laptop, tablet and phone screenshots were visually reviewed after image decoding; evidence is in artifacts/final-cinematic-*.png.

The final production build, TypeScript, lint and all 9 browser tests passed. Automated WCAG-tag checks returned no violations on all 13 routes at 390px and 1440px. Existing booking preview, failure handling, service filtering, menu keyboard behavior and canonical paths remained healthy. Other clinic imagery and booking configuration were preserved.

Local Lighthouse mobile: performance 93, accessibility 100, best practices 100, SEO 69. LCP 3.1 s, TBT 110 ms, CLS 0. The SEO score reflects deliberate preview noindex. These are local laboratory measurements rather than field Core Web Vitals. Report: artifacts/lighthouse-cinematic-mobile.json. Earlier sections record previous hero designs and measurements.

## Purposeful interaction and motion — 14 October 2026

The visitor flow now includes a home service explorer: numbered direct service links update a matching image and short description on pointer hover or keyboard focus, and persistent previous/next buttons support touch and keyboard browsing. The current image stays visible until its replacement loads, then crossfades. Image paths, captions and approval states come from the existing media registry; no clinic assets or reference files were replaced. The controls sit beside the category and keep their position when descriptive copy changes.

Shared navigation is sticky with a subtle scrolled shadow and responsive link indicators. A small route-aware IntersectionObserver controller introduces one-time section entrances and staggered care steps; native CSS handles hero copy, service filters, care-finder feedback and FAQ transitions. Text remains fully opaque during all motion after an initial fading experiment was caught by the contrast checks and corrected. The panoramic image keeps its previous art direction and preload behavior.

No animation library was added. Server-rendered content stays readable before JavaScript runs. Focus cancels a running entrance on its region. CSS and browser animations respect reduced-motion preferences, including changes during an interaction. Native details/summary FAQs remain usable when advanced size interpolation is unsupported. Cleanup removes observers, timers, animations and preference listeners on unmount or route change.

Final production build (including TypeScript) and lint passed. All 11 browser tests passed, including 13 routes at 390px and 1440px with no automated WCAG-tag violations, required homepage widths from 320px through 1920px, service filters, preview booking and error handling, mobile navigation, preview browsing with persistent keyboard focus, and touch/reduced-motion operation. A separate browser check confirmed readable content and working direct service links without JavaScript, plus zero active animations after enabling reduced motion during a preview change. Visual captures and browser-console inspection returned no page errors. Evidence: artifacts/motion-home-desktop.png, motion-home-mobile.png, motion-services-overview.png, motion-services-laser.png, motion-preview-mobile.png and motion-faq-open.png. Reproduce with node scripts/review-motion.mjs against the running preview.

Local Lighthouse mobile: performance 95, accessibility 100, best practices 100, SEO 69; LCP 2.9 s, TBT 50 ms, CLS 0. SEO reflects the deliberate preview noindex setting. These are laboratory measurements, not field Core Web Vitals. Report: artifacts/lighthouse-motion-mobile.json.

Booking delivery configuration, clinic approval flags, footer contact/hours content and the BizLeap link remain as previously configured. This frontend enhancement needs no additional credentials.

## About page: clearer purpose and patient guidance — 14 October 2026

Replaced the repeated abstract personal-care headings, values grid and pending gallery/location blocks with an original server-rendered editorial page. The opening states what the clinic offers and where it is based. A treatment illustration balances the text; a three-part page index leads to the clinic purpose, patient-oriented care options and first-visit guidance. A navy purpose band explains the assessment-first approach. Four ruled care links connect concrete visitor concerns to existing services. Native details/summary steps explain the visit and follow-up, alongside practical preparation and clear appointment-request actions.

The layout uses the existing Manrope/Inter typography, navy/sage/ivory palette and fluid side gutters. Care descriptions and visit guidance use 16px desktop / 15px mobile body text. Desktop care-section context stays visible while browsing the longer list. Links have accessible names that include their visible headings, with supporting descriptions associated separately. Section anchors move focus to their destination; native disclosures support keyboard operation and the existing reduced-motion rules. No new client widget or dependency was introduced. Page-specific styles are isolated in app/about/about.module.css.

The existing generated treatment scene is reused through the new about-therapy.webp media-registry entry and explicitly labelled illustrative / AI-generated. It does not identify the fictional therapist as clinic staff. Practitioner information appears through the existing reviewed-profile condition; no name, biography, credential or outcome was invented. Clinic-specific wording comes from the client brief and existing service copy. General assessment framing was checked against the [NHS physiotherapy overview](https://www.nhs.uk/tests-and-treatments/physiotherapy/); it does not establish clinic-specific facts. About copy remains listed for clinic review in docs/CONTENT_REVIEW.md.

The production build, TypeScript and lint passed. All 12 browser tests passed in the final run, including all 13 routes, automated WCAG-tag checks at 390px/1440px, existing booking preview and failure handling, service discovery, navigation and motion support. About was added to the 320px/640px responsive checks. Its page-index focus behavior, assessment CTA, service links and keyboard disclosure operation have a dedicated regression check. Visual review at 320, 390, 768, 1024, 1440 and 1920px found no horizontal overflow or browser page errors. Evidence: artifacts/about-redesign-_.png and artifacts/about-first-visit-_.png; reproduce with node scripts/review-about.mjs.

The initial mobile audit identified unnecessary homepage downloads during About navigation prefetch. Automatic home-route prefetch was removed from brand/primary-home links and the About breadcrumb. The About image now uses eager loading and high fetch priority, following the installed Next.js guide, with sizes matched to its actual desktop column. The final audit downloaded only the About hero image rather than also fetching the homepage panorama.

Final local Lighthouse mobile on /about: performance 96, accessibility 100, best practices 100, SEO 69; LCP 2.8 s, TBT 60 ms, CLS 0. Preview noindex explains the SEO score. These are laboratory results, not field Core Web Vitals. Report: artifacts/lighthouse-about-mobile.json. Booking delivery configuration and production approval requirements remain as documented.

## Service directory: visual explanations — 14 October 2026

Replaced the two-column text-only directory with seven service-specific image cards. Each card has a category, service title, concise explanation of the technique and one direct service link. Copy remains live HTML rather than rasterized text. An opaque navy gradient protects contrast while the treatment action stays visible above it. Desktop uses two columns and a wider final card; screens at or below 900px use one column. Intrinsic card growth prevents long headings from obscuring the manual technique on narrow phones. The wide card height adapts to larger screens so the therapist's face and guided exercise remain visible.

Four illustrative scenes were generated with the built-in image_gen tool and saved as PNG originals and optimized WebPs. Sources, output paths and the full prompt set are recorded in assets/source/service-image-prompts.json. These images are explicitly labelled illustrative / AI-generated and remain unapproved in the media registry. Existing client-supplied needling, cupping and laser images remain in use. Spine Care's supplied detail-page graphic is preserved through a separate directory-image field. Combined-service labels identify the actual pictured procedure. The new manual-care, sports and Pilates imagery also improves their existing detail heroes and homepage previews. The Services hero now shows guided exercise.

The installed Next.js image guidance was followed: hero images use eager loading with high fetch priority rather than combining preload with fetch priority. Directory images stay lazy, use sizes matched to the normal and wide columns, and avoid automatic detail-route prefetch. The shared PageHero home breadcrumb also avoids prefetching the unrelated homepage panorama. No new dependency, external integration or credential was needed.

The production build and TypeScript passed; lint and the complete 12-test browser suite passed. After the final wide-image crop adjustment, all four affected navigation, imagery, responsive and accessibility browser checks passed again. Automated WCAG-tag checks covered all 13 routes at 390px and 1440px with no violations. Visual checks at 320, 390, 768, 1024, 1440 and 1920px confirmed healthy images, a single direct action per card, titles contained within the cards, no horizontal overflow and no browser page errors. Filtering retained keyboard focus; reduced motion yielded zero running animations. All seven cards and direct navigation also worked without JavaScript.

Evidence: artifacts/services-visual-_.png, artifacts/service-card-_.png and artifacts/service-wide-*.png. Reproduce with node scripts/review-services.mjs against the running production preview. Fixed header and mobile dock visibility are suppressed only for isolated card screenshots, not in the website.

Local mobile Lighthouse on /services measured performance 94, accessibility 100, best practices 100 and SEO 69; LCP 3.0 s, TBT 70 ms and CLS 0. The SEO score reflects deliberate preview noindex. These are laboratory measurements rather than field Core Web Vitals. Report: artifacts/lighthouse-services-mobile.json. The final adjustment only changes the below-fold wide card's height; image source and sizes are unchanged. Production booking and clinic-content approval requirements remain as documented.

## Exact Google Maps location — 14 October 2026

Replaced the Contact map placeholder with Google's own embed obtained from the user-supplied [share link](https://share.google/2SjWHQuwtEqvgvxbY). The listing was opened in Google Maps and checked against the existing address and phone. Its pin is 21.0973897, 79.0727365; Google feature ID 0x3bd4bf73290ebbbf:0x2645c2a352999593. The original share URL, embed URL and canonical exact-listing URL are saved in content/clinic.json. All shared directions links now target that listing instead of an address search.

The existing map width, square corners, border, section spacing and surrounding typography are retained. The desktop placeholder's measured 340px outer height is preserved; the existing 290px mobile size is retained. The iframe fills the available inner box. It has a descriptive title, native lazy loading, fullscreen support and Google's recommended strict-origin-when-cross-origin referrer policy. No Maps API key or new dependency is required for this Google-provided share embed. Existing CSP already permits Google Maps frames.

The explicit request to replace the placeholder is implemented as a directly displayed map, with no additional load-map step. The privacy notice and README now accurately describe automatic/lazy Google-map loading. Earlier verification notes about an interaction-only placeholder are historical. Other clinic-content approvals, indexing and booking settings are unchanged.

Production build with TypeScript, lint and all 12 browser tests passed. The regression checks verify the exact feature ID, iframe title, absence of the old placeholder, 340px/290px sizing, updated directions and continuing preview noindex. Automated accessibility checks cover website-owned content and the iframe title; Google's cross-origin internal UI is not included in that automated audit. Native map controls, the live clinic marker and rendered tiles were visually verified in the browser. Desktop/mobile captures also waited for Google's live Open in Maps control. Neither width had horizontal overflow. Evidence: artifacts/clinic-map-1280.png, clinic-map-390.png and clinic-map-checks.json; reproduce with node scripts/review-map.mjs.
