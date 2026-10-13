# Rachana Physiotherapy Clinic — Codex / Antigravity Build Brief

## Status and reference hierarchy

This document is a production-oriented implementation brief, not a record of a completed build. Source design references: the two screenshots supplied by the client (`Homepage.png`, `Services Page.png`), then the client's explicit theme, then verified clinic-approved facts. The Google document/link mentioned in the request was not supplied here. Never infer missing information or fabricate credentials, awards, patient reviews, fees, opening hours, or treatment outcomes.

A self-contained interactive design prototype is provided separately in `rachana_design_prototype.html`. The photo areas in that prototype are deliberate placeholders, not photos of the actual clinician or clinic. Its appointment form is demonstration-only and submits no information.

## Business goal

Build a fast, original, trustworthy and welcoming physiotherapy clinic website for Rachana Physiotherapy Clinic, Manish Nagar, Nagpur. Primary conversion: qualified appointment requests. Secondary conversions: click to call, WhatsApp enquiries and Google Maps directions. Tertiary conversion: patients exploring service descriptions and first-visit details without unnecessary confusion.

**Design philosophy: Modern Clinical Luxury**. Avoid generic hospital-blue themes, mass-market cards, gradients on every section, fake 3D medical illustrations, busy timelines, jargon-heavy copy, fabricated reviews and heavy motion.

## Brand design tokens

| Token | Value | Usage |
|---|---|---|
| `--background` | `#F8F9F7` | Main page canvas |
| `--surface` | `#FFFFFF` | Navbar and cards |
| `--navy` | `#142536` | Headlines, primary CTA, footer |
| `--sage` | `#E4EBE5` | Limited section contrast |
| `--slate` | `#647078` | Body supporting text; verify contrast on exact surfaces |
| `--bronze` | `#A7804F` | Accent lines and small nonessential decoration only |

Typography: Manrope 600/700/800 for headings and Inter 400/500/600 for body and controls. Body 16px desktop and >=15px mobile; text scale and controls must remain readable at 200% zoom. Responsive heading sizes via `clamp`. Desktop container max width 1240–1280px; 12-column grid; section vertical padding 72–112px desktop / 52–72px mobile; card radius 12–16px; buttons 8–10px. Shadows are low-opacity and used sparingly. Real imagery is not to be colorized strongly. Use `prefers-reduced-motion` and avoid motion-dependent understanding.

## Design differentiation and user experience

1. **Care Finder**: a row of compact, accessible concern chips: Back/neck, Sports injury, Stiffness/mobility, Strength/posture, Not sure. Selection highlights a relevant *service to explore*, never an AI diagnosis, patient risk score or promised treatment. Default: Back/neck. Provide an escape route to directly book a consultation.
2. **Human-first treatment explanations**: each service page begins with 'Who might come to discuss this?' and 'What happens at an assessment?' rather than selling a machine or modality. Detail benefits, eligibility, limitations and risks only with clinician approval.
3. **First-visit journey**: four short steps: Listen → Assess → Plan → Review. Add a practical FAQ and reasonable expectations about clothing, reports, session duration and follow-up (actual policy to be approved).
4. **Doctor-forward identity**: a genuine professional portrait, precise credentials, qualifications and registration displayed only after review, and a calm first-person quote if provided by the clinician.
5. **Reality-based imagery**: 6–10 original natural-light photos: exterior/reception, doctor portrait, consented doctor–patient assessment, treatment room, guided exercise, equipment in context, optional clinic staff. Obtain written model/patient consent and optimize files to WebP/AVIF with descriptive alt text. Never pass a synthetic portrait as the actual practitioner.
6. **Two booking pathways**: 'Request appointment' from the site and direct Call/WhatsApp. Unless synchronized schedules and slot locking exist, avoid showing or promising instantly confirmed appointments.
7. **Mobile dock**: accessible sticky `Call` + `Request appointment` buttons with safe-area support, no overlay of content or cookie/privacy notices.

## Page map

- `/` — Homepage
- `/services` — All services and filterable discovery
- `/services/spine-care`
- `/services/osteopathy-matrix-rhythm-therapy`
- `/services/dry-needling`
- `/services/cupping-therapy`
- `/services/tecar-laser-therapy`
- `/services/sports-injury-rehabilitation`
- `/services/pilates-training`
- `/conditions` — Optional, only after clinician-approved condition-specific content is available
- `/about` — Practitioner and clinic background
- `/contact` — Contact, verified hours, location and enquiry options
- `/request-appointment` — Accessible form and appointment request process
- `/privacy` — Privacy notice
- `/terms` — Only if legally or operationally required

Use the condition browsing component on the homepage and services page even if `/conditions` is deferred. Do not generate dozens of low-quality near-duplicate location or condition pages for SEO.

## Homepage order (desktop)

1. **Header**: actual approved logo; concise navigation Home | Services | About | Contact; Call outline + Book solid. Sticky only after user scroll if needed. Secondary bar optional: location and languages.
2. **Hero**: 52% text, 48% authentic photograph. Eyebrow `PHYSIOTHERAPY & REHABILITATION · NAGPUR`; H1 `Move with confidence. Live with comfort.`; intro `Personalised physiotherapy focused on understanding your concerns, assessing movement and planning appropriate care.`; primary `Request an Appointment`; secondary `Explore Services`. Underneath: address, genuine practitioner credentials *if confirmed* and clear patient-friendly expectation.
3. **Micro trust strip**: 'Individual assessment' / 'Based in Manish Nagar' / 'Clear care plan'. Do not invent quantitative results.
4. **Care Finder**: patient concern chips and visible suggested service description with clear non-diagnostic disclaimer.
5. **Core services**: 3 editorial cards; Spine Care, Sports Injury Rehabilitation, Pilates Training. All services link.
6. **Doctor story**: dark midnight-navy section with true portrait and 2 short paragraphs. Confirm all qualifications and professional titles before launch.
7. **Four-step approach**: Listen, Assess, Plan, Review, with actionable language.
8. **Actual clinic gallery**: asymmetrical photo grid with natural snapshots; short alt texts.
9. **Strong booking banner**: book request, call and WhatsApp; distinguish enquiry from confirmation.
10. **FAQs**: first visit, referral policy, fees if approved, session length, cancellation and booking.
11. **Location/contact**: address, verified hours, phone, directions, optional consent-safe embedded map loaded after interaction.
12. **Footer**: real logo, useful navigation, contacts, privacy policy and accurate copyright.

## Services page

Large editorial heading; patient-friendly intro; real treatment photo; accessible filters (All, Spine & movement, Rehabilitation, Specialist modalities, Strength & Pilates); responsive service directory; each card: short clinical summary, what it may involve (if reviewed), link to details, CTA to request assessment. A high-friction 'Choose your therapy' flow is discouraged: patient should not be asked to self-prescribe dry needling, cupping or TECAR. End with 'Not sure where to start?' assessment CTA and appropriate informational FAQ.

### Service naming from draft — all require clinic approval

- Spine Care
- Osteopathy & Matrix Rhythm Therapy
- Dry Needling
- Hijama / Cupping Therapy
- TECAR & Laser Therapy
- Sports Injury Rehabilitation
- Pilates Training

Draft also mentions TENS, IFT, ultrasound and traction. Keep these as clinician-reviewed modality references rather than hero-level advertised solutions. For low-back pain, NICE guideline NG59 specifically advises against traction, ultrasound, TENS and interferential therapy; do not claim these are broadly evidence-based treatments for low-back pain. See https://www.nice.org.uk/guidance/ng59/chapter/Recommendations . Clinical team to review eligibility statements for all indications.

## Suggested approved-style copy (examples, not medical outcomes)

Hero: `Move with confidence. Live with comfort.`
Subheading: `From everyday aches to rehabilitation after an injury, we begin by understanding your goals and movement needs.`
Doctor heading: `Care that starts with listening.`
Service heading: `Find the care that fits your needs.`
Care Finder question: `What would you like help moving through?`
Primary CTA: `Request an Appointment`
Secondary CTA: `Explore Care Options`
Booking footnote: `The clinic will contact you to confirm availability.`
Gallery heading: `Get to know our clinic before your first visit.`
Contact heading: `Take the next step towards more comfortable movement.`
Avoid: `100% recovery`, `guaranteed pain-free`, `best in Nagpur`, `state-of-the-art` unless substantiated, or claims that a specific modality cures conditions.

## Stack and architecture

**Recommended MVP:** Next.js App Router, TypeScript, Tailwind CSS, Server Components for marketing pages, limited motion via Motion/Framer Motion for selected subtle interactions. Deploy on Vercel. Keep SEO content server-rendered and critical images optimized with Next/Image. Use fonts via legitimate hosted files or appropriate font integrations. No heavy UI kit default look: implement 6–8 reusable components with the custom brand token system.

**If appointment requests are in scope:** Next.js server route handlers or Node API; Zod for server-side validation; secure transactional email provider; PostgreSQL (e.g., Neon) only if persistent request tracking/admin status is required. Otherwise a secure forms backend can make the MVP simpler. Build a protected admin dashboard only if staff truly need status management, not because 'dynamic' sounds attractive.

Suggested server modules:

```
app/
  (marketing)/page.tsx
  services/page.tsx
  services/[slug]/page.tsx
  about/page.tsx
  contact/page.tsx
  request-appointment/page.tsx
  privacy/page.tsx
  api/appointment-requests/route.ts
components/
  site-header.tsx, mobile-booking-dock.tsx, care-finder.tsx
  service-card.tsx, doctor-section.tsx, faq-accordion.tsx
  booking-form.tsx, photo-feature.tsx
lib/
  clinic-profile.ts, services.ts, validation.ts, seo.ts
public/
  images/ (approved original files only)
```

Potential DB table `appointment_requests`: `id`, `name`, `phone`, `service_interest` nullable, `preferred_day` nullable, `consent_timestamp`, `source`, `status` (`new/contacted/confirmed/closed`), `created_at`, `updated_at`; encrypt appropriately, restrict access and define retention/deletion. Do **not** collect detailed symptoms, reports or medical records in the marketing form. Confirm legal basis and privacy obligations with appropriate local advice. Keep admin session cookies secure and role-restricted. On production endpoints: Zod validation; rate limit; honeypot/CAPTCHA; safe logging without contact details; CSRF protections; authorization; error states; retries; idempotent notification events; staff-facing audit log; secure backup.

User flow: open CTA → 4-field form (name, phone, optional general area and preferred day) → validate → explicit privacy notice and consent as applicable → secure POST → ticket created → notification to clinic → status pending → staff responds to confirm. Do not promise availability or send 'confirmed booking' until staff/slot system actually confirms.

For site enquiries over WhatsApp, use a prefilled neutral enquiry sentence; do not append diagnostic information to WhatsApp URLs. Phone `tel:` links and Map links should be checked on real devices. Offer EN / मराठी / हिंदी only after proper translations and content QA exist; preserve language via routes (`/en`, `/mr`, `/hi`) and hreflang/canonical localization.

## SEO and content integrity

- Unique, intent-driven titles, descriptions and single H1 per page; descriptive slugs and canonical URLs.
- Example Home title: `Physiotherapy Clinic in Manish Nagar, Nagpur | Rachana`.
- Example Services title: `Physiotherapy Services in Nagpur | Rachana Physiotherapy Clinic`.
- Unique, reviewer-approved service and condition content; no spun SEO text, false experience, invented testimonials or outcomes.
- `sitemap.xml`, `robots.txt`, correct indexability, Next.js metadata, Open Graph with authentic brand assets, Search Console validation.
- Add `LocalBusiness` or a suitable specific subtype and provider profile structured data with verified name/address/phone/hours/URL/images; no fabricated ratings or self-serving review markup. Validate JSON-LD against Google's current Rich Results Test and structured data guidelines.
- Align official website with Google Business Profile on NAP (name, address, phone), hours, directions, photos and booking links; compare local directory discrepancies and correct them where authorized.
- Real images: descriptive filenames and alt text. Do not make every image keyword-stuffed.
- Do not publish clinician registration details without explicit confirmation. Clinic website must feature an accessible review/edit workflow for keeping information current.
- Track Search Console impressions, organic clicks, calls, appointment-request conversions and error rates. Never put patient names, phone numbers or health concerns in analytics events/URLs.

## Accessibility / device standards

Target WCAG 2.2 AA. Test 320px to 1920px widths; navigation by keyboard alone; logical heading order; all interactive controls labelled; minimum 4.5:1 contrast for normal text and 3:1 for large text; meaningful focus indicators; 24 CSS px minimum target-size rule with spacing exceptions, ideally >=44px touch targets; no content loss at 200% zoom; appropriate `aria-expanded` and `aria-live` for dynamic components; keyboard-trapped dialog focus with ESC close and focus return; correct accessible accordions, forms and validation; preferred reduced motion; mobile safe areas; no autoplay media. Do not use bronze for essential small text without verifying color contrast.

## Performance acceptance targets

Initial load fast on mid-range Android over mobile networks. Optimize and preload the single LCP hero image without adding unnecessary JS. Set dimensions/aspect ratios on images; lazy-load gallery and map. Field Core Web Vitals targets at the 75th percentile: LCP <=2.5 seconds, INP <=200ms, CLS <=0.1. Lighthouse mobile accessibility >=95 and performance >=90 are *QA goals*, not prelaunch guarantees. Validate with PageSpeed Insights and field data after launch.

## Image shoot list

1. Portrait of Dr. Priyanka near a real treatment space (vertical 4:5)
2. Doctor guiding a patient through a movement assessment (landscape 4:3, with written consent)
3. Clinic entrance or reception (landscape 16:9)
4. Treatment room overview (landscape 4:3)
5. Supervised strengthening exercise (landscape 4:3, with consent)
6. Equipment details relevant to actual services (small landscape 3:2)
7. Optional team portrait and accessibility entry photograph

Export WebP/AVIF plus reasonable JPEG fallback; optimize to realistic display widths, avoid oversharpening, artificial faces and unrelated generic treatment scenes. The current photos in the supplied reference images are illustrative and should be replaced by authentic assets for launch.

## Release sequence

### Phase 0 — Clinic fact approval (blocker)
Clinic confirms approved trading name/spelling, logo, doctor display name and title, degree/registration/experience, exact current address/map pin, phone/WhatsApp contact, hours including Sunday, services and qualifications, consultation fees, referral policy, languages supported, photo/testimonial consent, availability workflow and privacy policy contact.

### Phase 1 — Design foundation
Build responsive header/footer, token library, typography, button/field states, layout grid and photo crop system. Prototype at 1440px, 1024px, 768px, 390px, 320px.

### Phase 2 — Content pages
Build homepage, services directory/detail pages, doctor/about, contact and FAQ. Add navigation-based Care Finder; use draft copy as placeholder until practitioner approval.

### Phase 3 — Conversion flow
Implement secure appointment-request backend if commissioned; staff notifications and status lifecycle; call and WhatsApp links. Add spam mitigation and ensure successful/failure states. Don't collect unnecessary medical detail.

### Phase 4 — SEO, accessibility, QA and launch
Review clinical text, add validated structured data, finish localization if approved, run keyboard/assistive-technology checks, verify mobile button tap targets, validate OG and sitemaps, connect analytics without PII, deploy Vercel, verify custom domain/SSL and Search Console. Monitor errors and bookings after launch.

## Acceptance checklist

- [ ] Home and Services layouts feel deliberately custom, not a copied template.
- [ ] Actual consented clinic, practitioner and treatment photographs replace placeholders.
- [ ] The services directory works at mobile sizes and does not imply a symptom diagnosis.
- [ ] Header, footer, anchors and all CTAs lead to expected pages/actions.
- [ ] Appointment CTA is explicitly a **request** until confirmed by staff or an integrated scheduling system.
- [ ] All copy and practitioner details have been approved by the clinic.
- [ ] Name, address, phone and hours are correct and match Google Business Profile.
- [ ] WCAG 2.2 AA requirements have been tested; dialog focus is trapped appropriately in the production version.
- [ ] Mobile layout remains fully usable at 320px and 200% zoom.
- [ ] LocalBusiness metadata and public content match verified real-world data.
- [ ] Website contains valid privacy/contact/legal information appropriate to the actual workflows.
- [ ] Form anti-spam, server validation, access control and error behavior are tested.
- [ ] Site is indexed after Search Console/sitemap validation and deployed using HTTPS.

## Master implementation prompt to paste into Codex or Antigravity

> You are a senior product designer and full-stack Next.js developer. Build an original, high-quality physiotherapy clinic website for **Rachana Physiotherapy Clinic, Manish Nagar, Nagpur** following this entire brief and the accompanying HTML prototype. Use the supplied screenshots only as information architecture references; do not reproduce their layout mechanically. Implement the specified Modern Clinical Luxury design tokens, Manrope and Inter typography, mobile-first responsive grids, subtle motion, and real-photography placeholders with an explicit asset checklist. Prioritize clarity, credibility, speed and accessible booking. Implement a clinician-reviewed, **non-diagnostic** Care Finder, services directory, doctor profile, first-visit flow, FAQ, contact, and mobile Call/Request Appointment dock. Do not fabricate factual clinic claims, testimonials, ratings, medical outcomes, credentials, prices or hours. Do not use generated faces as authentic clinic imagery. Build homepage, services and service detail pages first; use semantic HTML, TypeScript, Next.js App Router, Tailwind and lightweight components. Keep critical pages server-rendered, use metadata, canonical URLs, sitemap, robots and correct LocalBusiness schema after real data are verified. Implement a working booking-request endpoint only when explicitly commissioned; otherwise visually mark the form as a non-submitting demo. Respect WCAG 2.2 AA and reduced-motion preferences, include keyboard navigation and proper dialog focus handling, validate real mobile devices, and keep the output clean and production-readable. Work in small checkpoints: first design-system skeleton, then homepage, then services and other pages, then backend integration, then SEO/security/accessibility/performance QA. Show changed files and tests after each checkpoint.

## Supporting reference reading

- Rachana clinician public listing: https://www.practo.com/nagpur/doctor/priyancka-chaitanya-halwatkkar-physiotherapist?practice_id=1324603
- WCAG 2.2: https://www.w3.org/TR/WCAG22/
- LocalBusiness structured data: https://developers.google.com/search/docs/appearance/structured-data/local-business
- Google people-first content: https://developers.google.com/search/docs/fundamentals/creating-helpful-content
- NHS Physiotherapy overview: https://www.nhs.uk/tests-and-treatments/physiotherapy/
- NICE NG59 low-back guidance: https://www.nice.org.uk/guidance/ng59/chapter/Recommendations
- Google Web Vitals: https://web.dev/articles/vitals
- Hinge Health patient care UX example: https://www.hingehealth.com/how-it-works/care/
