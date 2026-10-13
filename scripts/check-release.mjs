import { readFile, access } from "node:fs/promises";
import { resolve } from "node:path";
import env from "@next/env";
env.loadEnvConfig(process.cwd());
const clinic = JSON.parse(await readFile("content/clinic.json", "utf8"));
const media = JSON.parse(await readFile("content/media.json", "utf8"));
const missing = [];
const required = [
  "SITE_URL",
  "RESEND_API_KEY",
  "BOOKING_FROM_EMAIL",
  "BOOKING_TO_EMAIL",
  "UPSTASH_REDIS_REST_URL",
  "UPSTASH_REDIS_REST_TOKEN",
  "BOOKING_HASH_SECRET",
];
for (const key of required) if (!process.env[key]) missing.push(key);
if (process.env.BOOKING_MODE !== "live")
  missing.push("BOOKING_MODE must be live");
if (!process.env.SITE_URL?.startsWith("https://"))
  missing.push("SITE_URL must be the approved HTTPS domain");
if (process.env.NEXT_PUBLIC_CLINIC_FACTS_APPROVED !== "true")
  missing.push("Clinic fact approval");
if (process.env.NEXT_PUBLIC_INDEXING_ENABLED !== "true")
  missing.push("Indexing approval");
for (const key of [
  "approvedLogo",
  "photosApproved",
  "privacyApproved",
  "clinicalContentApproved",
])
  if (!clinic[key]) missing.push("clinic.json: " + key);
if (!clinic.hours.length) missing.push("Approved current opening hours");
if (
  !clinic.practitioner.displayName ||
  !clinic.practitioner.title ||
  !clinic.practitioner.qualifications.length
)
  missing.push("Approved practitioner display name, title and qualifications");
if ((process.env.BOOKING_HASH_SECRET || "").length < 32)
  missing.push("BOOKING_HASH_SECRET must have at least 32 characters");
for (const [name, asset] of Object.entries({
  brand: media.brand,
  doctor: media.doctor,
  ...media.features,
  ...Object.fromEntries(
    media.gallery.map((asset, i) => ["gallery-" + i, asset]),
  ),
})) {
  if (!asset.approved || !asset.src.startsWith("/images/")) {
    missing.push("Approved original asset: " + name);
    continue;
  }
  if (name !== "brand" && !asset.alt)
    missing.push("Descriptive alt text: " + name);
  const assetPath = resolve("public", "." + asset.src);
  const imagesRoot = resolve("public/images");
  if (
    !assetPath.startsWith(imagesRoot + "\\") &&
    !assetPath.startsWith(imagesRoot + "/")
  ) {
    missing.push("Invalid original asset path: " + name);
    continue;
  }
  try {
    await access(assetPath);
  } catch {
    missing.push("Missing image file: " + name);
  }
}
if (missing.length) {
  console.error(
    "Production activation still needs:\n" +
      missing.map((value) => " - " + value).join("\n"),
  );
  process.exitCode = 1;
} else {
  console.log(
    "Configuration and original assets are ready for final clinic review and live delivery smoke testing.",
  );
}
