import type { Metadata } from "next";
import media from "@/content/media.json";
import {
  clinic,
  factsApproved,
  indexingEnabled,
  siteUrl,
} from "./clinic-profile";
const hero = media.features["movement-reference.webp"];
const ogImages = hero.approved ? [{ url: hero.src, alt: hero.alt }] : undefined;
export function pageMetadata(
  title: string,
  description: string,
  pathname: string,
): Metadata {
  return {
    title,
    description,
    alternates: { canonical: pathname },
    openGraph: {
      title,
      description,
      url: pathname,
      type: "website",
      locale: "en_IN",
      siteName: clinic.name,
      images: ogImages,
    },
    twitter: {
      card: ogImages ? "summary_large_image" : "summary",
      title,
      description,
      images: ogImages?.map((image) => image.url),
    },
    robots: { index: indexingEnabled, follow: indexingEnabled },
  };
}
export function localBusinessSchema() {
  if (!factsApproved) return null;
  return {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    "@id": siteUrl + "/#clinic",
    name: clinic.name,
    url: siteUrl,
    telephone: clinic.phone,
    address: {
      "@type": "PostalAddress",
      streetAddress: clinic.address,
      addressLocality: clinic.city,
      addressRegion: clinic.region,
      postalCode: clinic.postalCode,
      addressCountry: "IN",
    },
    ...(clinic.hours.length ? { openingHours: clinic.hours } : {}),
    ...(hero.approved ? { image: new URL(hero.src, siteUrl).toString() } : {}),
    ...(clinic.practitioner.displayName
      ? {
          employee: {
            "@type": "Person",
            name: clinic.practitioner.displayName,
            ...(clinic.practitioner.title
              ? { jobTitle: clinic.practitioner.title }
              : {}),
          },
        }
      : {}),
  };
}
