import profile from "@/content/clinic.json";
import { whatsappChatUrl } from "./whatsapp";
export const clinic = profile;
export const practitionerApproved =
  clinic.practitioner.approved === true &&
  !!clinic.practitioner.displayName &&
  clinic.practitioner.qualifications.length > 0;
export const practitionerName =
  [clinic.practitioner.title, clinic.practitioner.displayName]
    .filter(Boolean)
    .join(" ") +
  (clinic.practitioner.designation
    ? " (" + clinic.practitioner.designation + ")"
    : "");
export const factsApproved =
  process.env.NEXT_PUBLIC_CLINIC_FACTS_APPROVED === "true";
export const indexingEnabled =
  factsApproved && process.env.NEXT_PUBLIC_INDEXING_ENABLED === "true";
export const siteUrl = process.env.SITE_URL || "http://localhost:3000";
export const callHref = `tel:${clinic.phone}`;
export const whatsappHref = whatsappChatUrl(
  "Hello, I would like to enquire about an appointment at Rachana Physiotherapy Clinic.",
);
export const mapsHref =
  clinic.mapUrl ||
  "https://www.google.com/maps/search/?api=1&query=" +
    encodeURIComponent(clinic.name + " " + clinic.address);
