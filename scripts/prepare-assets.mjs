import sharp from "sharp";
import { mkdir } from "node:fs/promises";
await mkdir("public/illustrations", { recursive: true });
const sources = [
  [
    "Homepage.png",
    "pilates-editorial-reference.webp",
    { left: 392, top: 763, width: 346, height: 334 },
  ],
  [
    "Homepage.png",
    "movement-reference.webp",
    { left: 392, top: 99, width: 370, height: 382 },
  ],
  [
    "Services Page.png",
    "pilates-reference.webp",
    { left: 463, top: 103, width: 374, height: 267 },
  ],
  [
    "Homepage.png",
    "strength-reference.webp",
    { left: 392, top: 1374, width: 345, height: 153 },
  ],

  [
    "Spine Care Page.png",
    "spine-reference.webp",
    { left: 491, top: 96, width: 350, height: 302 },
  ],
];
for (const [source, name, crop] of sources) {
  const meta = await sharp("References/" + source).metadata();
  console.log(source, meta.width, meta.height);
  await sharp("References/" + source)
    .extract(crop)
    .webp({ quality: 88 })
    .toFile("public/illustrations/" + name);
}

// Preserve the complete client-supplied Spine Care illustration.
await sharp("assets/source/spine-care-illustration.png")
  .webp({ quality: 92 })
  .toFile("public/illustrations/spine-care-illustration.webp");

// Preserve the client-supplied Cupping Therapy photo.
await mkdir("public/images", { recursive: true });
await sharp("assets/source/cupping-therapy.jpg")
  .webp({ quality: 90 })
  .toFile("public/illustrations/cupping-therapy.webp");
await sharp("assets/source/cupping-therapy.jpg")
  .webp({ quality: 90 })
  .toFile("public/images/cupping-therapy.webp");

// Preserve the client-supplied Dry Needling photo.
await sharp("assets/source/dry-needling.jpg")
  .webp({ quality: 90 })
  .toFile("public/illustrations/dry-needling.webp");
await sharp("assets/source/dry-needling.jpg")
  .webp({ quality: 90 })
  .toFile("public/images/dry-needling.webp");

// Homepage art direction: a generated illustrative physiotherapy scene.
await sharp("assets/source/hero-physiotherapy.png")
  .webp({ quality: 88 })
  .toFile("public/illustrations/hero-physiotherapy.webp");

// Preserve the client-supplied TECAR & Laser Therapy photo.
await sharp("assets/source/tecar-laser-therapy.jpg")
  .webp({ quality: 90 })
  .toFile("public/illustrations/tecar-laser-therapy.webp");
await sharp("assets/source/tecar-laser-therapy.jpg")
  .webp({ quality: 90 })
  .toFile("public/images/tecar-laser-therapy.webp");

// Panoramic hero: preserve the continuous room and its text-safe wall.
await sharp("assets/source/hero-cinematic.png")
  .webp({ quality: 88 })
  .toFile("public/illustrations/hero-cinematic.webp");

// Encode the same art-directed crops used on smaller screens.
const heroDimensions = await sharp(
  "assets/source/hero-cinematic.png",
).metadata();
for (const [device, ratio] of [
  ["mobile", 4 / 3],
  ["tablet", 1.7],
]) {
  const cropWidth = Math.round(heroDimensions.height * ratio);
  await sharp("assets/source/hero-cinematic.png")
    .extract({
      left: heroDimensions.width - cropWidth,
      top: 0,
      width: cropWidth,
      height: heroDimensions.height,
    })
    .webp({ quality: 88 })
    .toFile("public/illustrations/hero-cinematic-" + device + ".webp");
}

// Service-specific illustrative scenes; retain the original generated PNGs.
for (const name of [
  "service-spine-assessment",
  "service-manual-therapy",
  "service-sports-rehabilitation",
  "service-guided-pilates",
]) {
  await sharp("assets/source/" + name + ".png")
    .resize({ width: 1440, withoutEnlargement: true })
    .webp({ quality: 86 })
    .toFile("public/illustrations/" + name + ".webp");
}

// Client-approved vector-style brand logo
const logoTrimmed = await sharp("assets/source/rachana-logo.png").trim().toBuffer();
const logoMeta = await sharp(logoTrimmed).metadata();
const logoMaxDim = Math.max(logoMeta.width, logoMeta.height);
const logoPadding = Math.round(logoMaxDim * 0.05);
const logoCanvasSize = logoMaxDim + logoPadding * 2;
const centeredLogo = await sharp({
  create: {
    width: logoCanvasSize,
    height: logoCanvasSize,
    channels: 4,
    background: { r: 0, g: 0, b: 0, alpha: 0 },
  },
})
  .composite([{ input: logoTrimmed, gravity: "center" }])
  .png()
  .toBuffer();

await sharp(centeredLogo)
  .resize(1024, 1024)
  .webp({ quality: 96, alphaQuality: 100 })
  .toFile("public/images/logo.webp");
await sharp(centeredLogo)
  .resize(1024, 1024)
  .png({ compressionLevel: 9 })
  .toFile("public/images/logo.png");
await sharp(centeredLogo)
  .resize(512, 512)
  .webp({ quality: 95, alphaQuality: 100 })
  .toFile("public/illustrations/logo-reference.webp");
await sharp(centeredLogo).resize(192, 192).png().toFile("public/icon-192.png");
await sharp(centeredLogo).resize(512, 512).png().toFile("public/icon-512.png");
await sharp(centeredLogo).resize(48, 48).png().toFile("public/favicon.png");

