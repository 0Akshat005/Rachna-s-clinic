# Original photography checklist

The six reference PNGs are design/content references. Optimized crops live in public/illustrations and are labelled illustrative on the website. No generated portrait is presented as the practitioner.

Place approved WebP/AVIF photographs under public/images and update content/media.json. Set each asset's approved flag only after its authenticity, copyright and any model/patient consent are checked. Original photos should be natural-light, clear and lightly edited.

| Slot                                        | Image required                                          | Suggested crop                         |
| ------------------------------------------- | ------------------------------------------------------- | -------------------------------------- |
| brand                                       | Original approved logo                                  | SVG or high-resolution transparent PNG |
| doctor                                      | Real professional portrait                              | 4:5 vertical                           |
| features / movement-reference.webp          | Consented movement assessment, homepage hero            | 4:3 landscape with mobile crop room    |
| features / spine-reference.webp             | Consented spine/movement assessment                     | 4:3 landscape                          |
| features / pilates-reference.webp           | Guided exercise or genuine Pilates equipment            | 4:3 landscape                          |
| features / pilates-editorial-reference.webp | Genuine Pilates equipment for the homepage service list | 1:1 square                             |
| features / strength-reference.webp          | Genuine equipment or strengthening context              | 3:2 landscape                          |
| gallery / 0                                 | Reception, exterior or treatment room                   | 16:9 / 4:3 landscape                   |
| gallery / 1                                 | Consented guided exercise or assessment                 | 4:3 landscape                          |

Use meaningful plain alt text and a short caption for original photos. Retain originals and consent records in restricted clinic storage, rather than the public website. All media paths must start with /images/ for release.

The client has supplied the practitioner name and nine credentials directly; these are now recorded in content/clinic.json. Their approval is independent of photography. The existing approved About image at /images/aboutimg.webp is retained with its supplied alt text and crop; no new portrait or identity claim has been created.

After replacement, inspect desktop and mobile crops and run the release checker. The clinic gallery automatically switches to photographs when its configured entries are approved. The About hero uses features / about-therapy.webp, currently pointing to the existing approved /images/aboutimg.webp photo; the separate doctor portrait slot remains optional and unconfigured. The homepage keeps its compact text introduction. Approved homepage photography is also used in social metadata.

## Homepage hero update — 13 October 2026

The homepage now uses a high-resolution AI-generated illustrative physiotherapy scene, saved as assets/source/hero-physiotherapy.png and optimized into public/illustrations/hero-physiotherapy.webp. The complete built-in generation prompt is recorded in assets/source/hero-physiotherapy-prompt.md. It depicts fictional people and premises and is labelled as an illustrative AI-generated scene; it is not presented as the clinic's staff or facilities. The movement-reference.webp configuration key now points to this new asset. Other supplied service photographs remain unchanged.

The current desktop photo starts at 38% of the viewport, with an eased transparency mask across its first 28%. This reveals the same hero background beneath the image rather than painting a narrow opaque overlay, removing the visible vertical seam. People and the guided movement remain in the clear portion of the photograph. At widths of 900px or below, copy and image stack with a short 12px top-edge blend. Tablet uses the full 3:2 image; phone uses a 4:3 crop that keeps both people and the assisted movement visible.

## Current panoramic hero — 13 October 2026

The current homepage uses a single generated panoramic room image behind both the copy and the treatment scene. It has no desktop split panel, opacity mask or horizontal overlay. The room's actual wall, light and texture create continuity. The banner is labelled as AI-generated illustration and does not depict real clinic staff or premises.

Source: assets/source/hero-cinematic.png (1983×793). Final generation prompt: assets/source/hero-cinematic-prompt.md. Optimized desktop, tablet and phone assets are public/illustrations/hero-cinematic.webp, hero-cinematic-tablet.webp (1348×793) and hero-cinematic-mobile.webp (1057×793). Previous assets are retained.

HeroMedia uses the installed Next.js getImageProps API and a native picture element with viewport-specific image hints. Each checked viewport requests exactly one hero image. Tablet and phone use focused crops rather than scaling the entire panorama into a small frame. Future approved photography must update src, tabletSrc and mobileSrc together in content/media.json. The responsive variants are reproducible with npm run prepare:assets.
