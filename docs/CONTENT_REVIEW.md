# Clinic review and editing workflow

The Markdown brief is the primary requirements source. Screenshots and the prototype are draft references, not approval of real-world facts.

1. Edit the appropriate files below. Make changes in a branch or keep a backup before replacing approved text.
2. Preview every affected page, including mobile; check wording and corresponding links.
3. Record the clinician/clinic reviewer, approval date, reviewed revision and any photo consent record in a private clinic-controlled register.
4. Set approval flags only for the reviewed revision. Recheck after any subsequent edit.
5. Run the release checker and build before publishing.

| Information                            | Editable source                                    | Current status                                                                                 |
| -------------------------------------- | -------------------------------------------------- | ---------------------------------------------------------------------------------------------- |
| Name, phone, address, hours, policies  | content/clinic.json                                | Draft contact details from screenshots; hours and policies require confirmation                |
| Practitioner biography and credentials | content/clinic.json, components/doctor-section.tsx | No unapproved name or credentials displayed                                                    |
| Service names and descriptions         | lib/services.ts                                    | Introductory copy awaiting clinical review                                                     |
| Homepage copy and care journey         | app/page.tsx, components/care-journey.tsx          | Review required                                                                                |
| About page and first-visit guide       | app/about/page.tsx                                 | Introductory patient copy awaiting clinic review; practitioner identity remains approval-gated |
| FAQs                                   | components/faq-accordion.tsx                       | General guidance; exact policies come from clinic.json                                         |
| Photography and alt text               | content/media.json                                 | Supplied references are labelled illustrative                                                  |
| Privacy workflow                       | app/privacy/page.tsx                               | Approval, designated contact and retention periods required                                    |
| Indexing and live booking              | Environment variables                              | Preview/noindex by default                                                                     |

The screenshots give varying location descriptions and unapproved hours, and the public clinician listing could not be retrieved. Do not silently treat these as verified facts. Do not add testimonials or quantitative outcomes without an approved source.

Conditions content, localization and legally required terms can be added after their content and operational basis are supplied. The primary brief permits deferring them.

## Service imagery and introductory definitions — 14 October 2026

The directory now pairs each service with a relevant image and a concise explanation of what the technique involves. Four fictional clinical/exercise scenes were generated using the built-in image_gen tool for spine assessment, hands-on manual care, sports rehabilitation and guided Pilates. Their PNG originals and prompts are in assets/source/service-image-prompts.json, with optimized WebPs under public/illustrations. These entries remain unapproved and explicitly labelled illustrative / AI-generated. They do not identify actual staff, patients, premises, clinic equipment or exact treatment protocols. Replace or approve them through the existing media workflow.

Client-supplied dry needling, cupping and laser procedure images are retained. The supplied Spine Care graphic remains on its detail page; a separate assessment image serves the directory. The combined osteopathy / Matrix Rhythm card explicitly labels the pictured technique as hands-on care; it does not depict or invent a Matrix device. The TECAR / laser card identifies the pictured procedure as laser.

General technique descriptions were checked against primary sources: [NHS physiotherapy](https://www.nhs.uk/tests-and-treatments/physiotherapy/), [NHS Wales osteopathy](https://111.wales.nhs.uk/encyclopaedia/o/article/osteopathy?locale=en), [Cleveland Clinic dry needling](https://my.clevelandclinic.org/health/treatments/16542-dry-needling), [Cleveland Clinic cupping](https://my.clevelandclinic.org/health/treatments/16554-cupping), [MaRhyThe system developer](https://marhythe-systems.de/en/resonance-based-medicine/) and [Winback TECAR manufacturer](https://winback.us/). Only descriptions of the physical technique are used; manufacturer efficacy claims, recovery times and regulatory assertions are not transferred to the clinic. Introductory content still requires clinician review, including exact cupping technique, equipment, qualifications, availability and suitability guidance. Existing clinic facts, indexing and booking approval flags remain unchanged.

## Location map confirmed from the clinic share link — 14 October 2026

The user supplied https://share.google/2SjWHQuwtEqvgvxbY as the exact clinic location. It resolves to the Google listing at 21.0973897, 79.0727365 (feature ID 0x3bd4bf73290ebbbf:0x2645c2a352999593), with the address beside Indian (Allahabad) Bank in Nagar Vikas Society and phone 092092 91738. The embed was obtained directly through Google Maps → Share → Embed a map. URLs are recorded in content/clinic.json; the Contact placeholder and address-search direction links are replaced. This confirms the specific map location only and does not activate approval of unrelated hours, practitioner credentials, clinical wording, photography, privacy policy, indexing or live appointment delivery.
