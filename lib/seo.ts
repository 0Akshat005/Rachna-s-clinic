import type { Metadata } from "next";
import media from "@/content/media.json";
import {
  clinic,
  factsApproved,
  practitionerApproved,
  indexingEnabled,
  siteUrl,
} from "./clinic-profile";
const hero = media.features["movement-reference.webp"];
const ogImages = hero.approved ? [{ url: hero.src, alt: hero.alt }] : undefined;
export function pageMetadata(
  title: string,
  description: string,
  pathname: string,
  image?: { url: string; alt: string },
): Metadata {
  const images = image ? [image] : ogImages;
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
      images,
    },
    twitter: {
      card: images ? "summary_large_image" : "summary",
      title,
      description,
      images: images?.map((img) => img.url),
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
    logo: new URL(media.brand.src, siteUrl).toString(),
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
    ...(practitionerApproved
      ? {
          employee: {
            "@type": "Person",
            name: clinic.practitioner.displayName,
            ...(clinic.practitioner.designation
              ? { honorificSuffix: clinic.practitioner.designation }
              : {}),
            ...(clinic.practitioner.title
              ? { honorificPrefix: clinic.practitioner.title }
              : {}),
          },
        }
      : {}),
  };
}
