import type { Metadata } from "next";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import { clinic, siteUrl, indexingEnabled } from "@/lib/clinic-profile";
import { localBusinessSchema } from "@/lib/seo";
import "./globals.css";
import "./editorial.css";
import { bodyFont, headingFont } from "./fonts";
export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "Physiotherapy Clinic in Manish Nagar, Nagpur | Rachana",
    template: "%s | Rachana",
  },
  description:
    "Thoughtful physiotherapy and rehabilitation in Manish Nagar, Nagpur. Explore care options and request an individual assessment at Rachana Physiotherapy Clinic.",
  icons: { icon: "/icon.svg" },
  robots: { index: indexingEnabled, follow: indexingEnabled },
  openGraph: { siteName: clinic.name, locale: "en_IN", type: "website" },
  twitter: { card: "summary" },
};
export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const schema = localBusinessSchema();
  return (
    <html lang="en" className={bodyFont.variable + " " + headingFont.variable}>
      <body>
        <a href="#main-content" className="skip-link">
          Skip to content
        </a>
        <SiteHeader />
        <main id="main-content" tabIndex={-1}>
          {children}
        </main>
        <SiteFooter />
        {schema ? (
          <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{
              __html: JSON.stringify(schema).replace(/</g, "\\u003c"),
            }}
          />
        ) : null}
      </body>
    </html>
  );
}
