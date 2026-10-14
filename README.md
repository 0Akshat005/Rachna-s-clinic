# Rachana Physiotherapy Clinic

A complete Next.js 16 App Router website, built in this project from the eight supplied reference files. The original reference files are preserved.

## Local preview

Dependencies are installed. From this project folder:

```powershell
npm run dev
```

Open [http://localhost:3000](http://localhost:3000). If the production preview started by Codex is still running, view that URL directly or stop it before starting another server.

Production preview:

```powershell
npm run build
npm run start
```

Node.js 20.9+ is required. Use Node 22 or a current supported LTS. Fonts are bundled locally; the website makes no Google Fonts requests.

## What is implemented

- Original navy, sage and warm-white design with Manrope headings and Inter body text.
- Responsive homepage, service directory, seven unique service detail routes, About, Contact, request form and privacy page.
- Non-diagnostic Care Finder; accessible service category filters; native keyboard-accessible FAQ disclosures.
- Call and neutral WhatsApp enquiries; exact listing directions; a lazy-loaded Google Maps embed on Contact using the clinic link supplied on 14 October 2026.
- Mobile Call / Request appointment dock with safe-area padding.
- Server-rendered marketing content, local optimized images, page-specific metadata, canonical URLs, sitemap and robots.
- Secure request route: shared Zod validation, explicit consent, JSON/origin checks, bounded body, honeypot, rate limiting, opaque tickets, safe audit events, delivery retries and email idempotency.
- No fabricated credentials, reviews, outcomes, fees or hours. No patient accounts, uploads, medical record collection, advertising trackers or unsolicited admin dashboard.

## Finalized design reference

The layout was revised around the supplied finalized homepage inspiration. Marketing pages use a fluid grid with 5% desktop side gutters rather than a centered 1280px cap. Home combines a full-bleed hero image, compact concern navigation, a sage introduction band, numbered service rows, a navy process section, split FAQ/contact sections and a reference-inspired footer with quick links, all seven services, full address, two contact numbers, weekday/Sunday hours and the exact Designed & Developed by BizLeap credit. Mobile adapts to 20px/18px gutters and stacked content. The working booking flow remains available throughout.

Shared foundations live in app/globals.css; homepage sections live in app/editorial.css; the panoramic banner lives in app/home-hero.css and components/hero-media.tsx; the expanded footer is scoped in components/site-footer.module.css. Interaction styling lives in app/motion.css, with a small route-aware components/site-motion.tsx controller. The numbered home services use components/service-showcase.tsx for image previews on hover/focus and previous/next controls on touch or keyboard. The supplied footer screenshot's hours are held separately in clinic.json referenceOpeningHours while approved hours remain pending. The approved service images and client-supplied Spine Care illustration are preserved. The panoramic hero is labelled as an illustrative generated scene; authentic clinic photography remains a production asset requirement.

Motion uses native browser APIs and CSS without an animation dependency. Marketing content is readable before JavaScript runs; text stays at full opacity during transitions. Entrances play once as sections come into view, focus cancels an entrance on the focused region, and changes to the reduced-motion preference cancel active movement and image fades. The hero image retains its existing responsive art direction and preload behavior. FAQs remain native keyboard-accessible details/summary controls.

The About page uses its own server-rendered editorial layout in app/about/page.tsx and app/about/about.module.css. It explains the clinic's purpose, connects patient concerns to care options and provides a native first-visit disclosure guide. Its image is registered in content/media.json and explicitly labelled illustrative. Verified practitioner information appears when the existing clinic approval settings and profile are supplied. Reproduce six-width visual captures with `node scripts/review-about.mjs`.

## Booking modes

The default is **preview**. The real API validates the form, but does not store or deliver contact details. The form and completion message state this explicitly.

Live mode sends an appointment request to the clinic's authorised inbox through Resend. A successful response means the provider accepted the notification, **not that an appointment is confirmed or that delivery to the inbox is guaranteed**. Staff use the inbox to contact the patient and manage pending/contacted/confirmed/closed enquiries. No application database is required for this MVP.

Resend deduplicates identical notification retries for 24 hours. Retries use the same key and email body. The form preserves the key after failure when the visitor retains the same details. A changed form creates a new key. Monitor the email provider for bounces and delivery failures; configure the clinic's operational response process before launch.

## Activate production requests

1. Copy `.env.example` to `.env.local`; on Vercel enter the corresponding values in the project's production environment.
2. Set `SITE_URL` to the approved HTTPS domain.
3. Provide `RESEND_API_KEY`, a verified sender in `BOOKING_FROM_EMAIL`, and the approved staff inbox in `BOOKING_TO_EMAIL`.
4. Provide `UPSTASH_REDIS_REST_URL` and `UPSTASH_REDIS_REST_TOKEN`.
5. Generate a private random `BOOKING_HASH_SECRET` of at least 32 characters. Never put it in a public variable.
6. Have the clinic review the facts, clinical copy, privacy notice and retention/deletion workflow. Update `content/clinic.json`; only then set `NEXT_PUBLIC_CLINIC_FACTS_APPROVED=true` and `BOOKING_MODE=live`.
7. Replace every illustrative image and placeholder using `content/media.json`, with approved original images in `public/images`.
8. Set `NEXT_PUBLIC_INDEXING_ENABLED=true` only when ready for public indexing. Rebuild after changing public variables.
9. Run `npm run check:release`, all checks below, and one authorised live email delivery test. Verify reception in the clinic inbox, mobile telephone/WhatsApp links and the map pin.
10. Deploy the reviewed project to Vercel with HTTPS. Complete Search Console verification and submit the sitemap.

The release checker deliberately fails in the supplied preview configuration. It does not make up missing clinic information.

The live endpoint also fails closed when core credentials or content/privacy approvals are absent. It trusts Vercel's platform IP header only when running on Vercel. Other hosts use a restrictive shared limiter; integrate that host's trusted proxy mechanism before broader traffic. Rate limiting on live Vercel is five submissions per client within 15 minutes. Preview allows 20 requests within 15 minutes.

## Still needed from the clinic

- Final trading name and logo artwork; exact address and map pin; phone/WhatsApp; current hours including Sunday.
- Approved practitioner name/title, qualifications, registration where authorised, biography and any first-person quote.
- Approval of the seven services and all patient-facing clinical descriptions.
- Fees, duration, referral/cancellation policies and first-visit guidance.
- Six to ten authentic photos and documented patient/model consent.
- Reviewed privacy contact, legal basis, processor arrangements, email access rules and retention/deletion policy.
- Email/Redis credentials, sender domain and production URL.
- Translated and reviewed Marathi/Hindi content if localization is commissioned.

See [content review](docs/CONTENT_REVIEW.md), [image checklist](docs/ASSET_CHECKLIST.md), and [verification notes](docs/VERIFICATION.md).

## Architecture and content editing

`app/` contains pages and the public POST route. `components/` contains focused custom UI. `lib/` contains clinic configuration, metadata, service content, validation and the testable delivery handler.

Edit clinic facts and policies in `content/clinic.json`; image paths and approval flags in `content/media.json`; service copy in `lib/services.ts`; FAQs in `components/faq-accordion.tsx`. Preview, review and rebuild after every content change. Secrets stay server-only.

The optional `/conditions` page is intentionally deferred under the primary brief until condition-specific clinical content is approved. Care Finder appears on both Home and Services. `/terms` and localization are also deferred until their operational requirements or reviewed translations exist.

JSON-LD business/provider fields are emitted only after clinic fact approval. Opening hours and qualifications are never inferred. Open Graph images use an approved original hero asset when available; the preview does not advertise illustrative imagery as authentic clinic photography.

## Checks

```powershell
npm run typecheck
npm run lint
npm test
npx playwright install chromium
npm run build
npm run test:e2e
npm audit --omit=dev
```

For service-directory crops, six viewport widths, filtering, reduced motion and browsing without JavaScript, run `node scripts/review-services.mjs` while the local preview is running. Generated service images and their built-in imagegen prompts are recorded in `assets/source/service-image-prompts.json`; originals and optimized WebPs are saved in the project.

For settled desktop/mobile screenshots and service/FAQ interaction captures, run `node scripts/review-motion.mjs` while the local preview is running.

Browser tests expect preview mode at `http://localhost:3000` and start the production server if necessary. Screenshots are saved under ignored `artifacts/`. Use sample contact details for preview testing.

A provider API/Redis test double verifies live delivery paths without contacting a real staff inbox. Real delivery, physical-device call behavior, exact map location and field Core Web Vitals require production setup.

## Reference documentation

- [Next.js App Router](https://nextjs.org/docs/app/getting-started/installation)
- [Resend email API and idempotency](https://resend.com/docs/api-reference/emails/send-email)
- [Upstash Redis REST API](https://upstash.com/docs/redis/features/restapi)
- [WCAG 2.2](https://www.w3.org/TR/WCAG22/)
- [Local business structured data](https://developers.google.com/search/docs/appearance/structured-data/local-business)
