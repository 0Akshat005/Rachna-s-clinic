import type { MetadataRoute } from "next";
import { indexingEnabled, siteUrl } from "@/lib/clinic-profile";
export default function robots(): MetadataRoute.Robots {
  return {
    rules: indexingEnabled
      ? {
          userAgent: "*",
          allow: "/",
          disallow: ["/api/", "/request-appointment"],
        }
      : { userAgent: "*", disallow: "/" },
    sitemap: siteUrl + "/sitemap.xml",
  };
}
