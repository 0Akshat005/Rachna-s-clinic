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
