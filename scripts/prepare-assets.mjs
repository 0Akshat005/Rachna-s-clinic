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
    "Homepage.png",
    "logo-reference.webp",
    { left: 33, top: 34, width: 56, height: 59 },
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


