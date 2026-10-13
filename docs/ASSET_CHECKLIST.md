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

The original practitioner name and credentials are purposely not inferred from draft screenshots. Update the approved practitioner fields independently of photography.

After replacement, inspect desktop and mobile crops and run the release checker. The clinic gallery automatically switches to photographs when its configured entries are approved; the About-page doctor slot switches to the supplied portrait. The homepage keeps the compact text introduction from the finalized design. Approved homepage photography is also used in social metadata.

## Homepage hero update — 13 October 2026

The homepage now uses a high-resolution AI-generated illustrative physiotherapy scene, saved as assets/source/hero-physiotherapy.png and optimized into public/illustrations/hero-physiotherapy.webp. The complete built-in generation prompt is recorded in assets/source/hero-physiotherapy-prompt.md. It depicts fictional people and premises and is labelled as an illustrative AI-generated scene; it is not presented as the clinic's staff or facilities. The movement-reference.webp configuration key now points to this new asset. Other supplied service photographs remain unchanged.

The desktop transition is limited to clamp(60px, 7vw, 135px). At widths of 900px or below, copy and image stack with no fade. Tablet uses the full 3:2 image; phone uses a 4:3 crop that keeps both people and the assisted movement visible.
