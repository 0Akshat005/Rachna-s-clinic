import type { MetadataRoute } from "next";
import { siteUrl } from "@/lib/clinic-profile";
import { services } from "@/lib/services";
import { basicServices } from "@/lib/basic-services";
export default function sitemap(): MetadataRoute.Sitemap {
  return [
    "",
    "/services",
    "/basic-services",
    "/about",
    "/contact",
    "/privacy",
    ...services.map((s) => "/services/" + s.slug),
    ...basicServices.map((s) => "/basic-services/" + s.slug),
  ].map((route) => ({
    url: siteUrl + route,
    changeFrequency: route ? "monthly" : "weekly",
    priority: route ? 0.7 : 1,
  }));
}
