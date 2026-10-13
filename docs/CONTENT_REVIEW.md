# Clinic review and editing workflow

The Markdown brief is the primary requirements source. Screenshots and the prototype are draft references, not approval of real-world facts.

1. Edit the appropriate files below. Make changes in a branch or keep a backup before replacing approved text.
2. Preview every affected page, including mobile; check wording and corresponding links.
3. Record the clinician/clinic reviewer, approval date, reviewed revision and any photo consent record in a private clinic-controlled register.
4. Set approval flags only for the reviewed revision. Recheck after any subsequent edit.
5. Run the release checker and build before publishing.

| Information                            | Editable source                                    | Current status                                                                  |
| -------------------------------------- | -------------------------------------------------- | ------------------------------------------------------------------------------- |
| Name, phone, address, hours, policies  | content/clinic.json                                | Draft contact details from screenshots; hours and policies require confirmation |
| Practitioner biography and credentials | content/clinic.json, components/doctor-section.tsx | No unapproved name or credentials displayed                                     |
| Service names and descriptions         | lib/services.ts                                    | Introductory copy awaiting clinical review                                      |
| Homepage copy and care journey         | app/page.tsx, components/care-journey.tsx          | Review required                                                                 |
| FAQs                                   | components/faq-accordion.tsx                       | General guidance; exact policies come from clinic.json                          |
| Photography and alt text               | content/media.json                                 | Supplied references are labelled illustrative                                   |
| Privacy workflow                       | app/privacy/page.tsx                               | Approval, designated contact and retention periods required                     |
| Indexing and live booking              | Environment variables                              | Preview/noindex by default                                                      |

The screenshots give varying location descriptions and unapproved hours, and the public clinician listing could not be retrieved. Do not silently treat these as verified facts. Do not add testimonials or quantitative outcomes without an approved source.

Conditions content, localization and legally required terms can be added after their content and operational basis are supplied. The primary brief permits deferring them.
