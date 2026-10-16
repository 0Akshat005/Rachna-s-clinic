import sharp from "sharp";
import { readdirSync, mkdirSync, copyFileSync } from "node:fs";
import { join } from "node:path";

const map = {
  service_taping: "service-taping",
  service_neuro_rehab: "service-neuro-rehabilitation",
  service_pemf: "service-pemf-therapy",
  service_tens: "service-tens",
  service_ift: "service-ift",
  service_ultrasound: "service-ultrasound-therapy",
  service_cpm: "service-cpm",
  service_mst: "service-mst",
  service_fomentation: "service-hot-fomentation",
  service_mfr: "service-myofascial-release",
  service_met: "service-muscle-energy-technique",
  service_manual_care: "service-basic-manual-therapy",
};

const brainDir =
  "C:/Users/aksha/.gemini/antigravity/brain/f8f4c682-b8dc-4f50-99bd-106cd45a43f1";
const files = readdirSync(brainDir).filter(
  (f) => f.startsWith("service_") && f.endsWith(".jpg"),
);

mkdirSync("public/images/basic", { recursive: true });
mkdirSync("public/illustrations/basic", { recursive: true });
mkdirSync("assets/source/basic", { recursive: true });

async function run() {
  for (const [prefix, outName] of Object.entries(map)) {
    const match = files.find((f) => f.startsWith(prefix));
    if (!match) {
      console.error("Missing file for prefix:", prefix);
      continue;
    }
    const inputPath = join(brainDir, match);
    copyFileSync(inputPath, join("assets/source/basic", outName + ".jpg"));

    await sharp(inputPath)
      .resize({ width: 1440, withoutEnlargement: true })
      .webp({ quality: 88 })
      .toFile(join("public/images/basic", outName + ".webp"));

    await sharp(inputPath)
      .resize({ width: 1440, withoutEnlargement: true })
      .webp({ quality: 88 })
      .toFile(join("public/illustrations/basic", outName + ".webp"));

    console.log("Processed:", outName);
  }
}
run();
