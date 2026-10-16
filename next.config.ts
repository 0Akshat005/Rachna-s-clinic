import type { NextConfig } from "next";
const nextConfig: NextConfig = {
  poweredByHeader: false,
  images: { formats: ["image/avif", "image/webp"] },
  async redirects() {
    return [
      {
        source: "/services/tecar-laser-therapy",
        destination: "/services/laser-therapy",
        permanent: true,
      },
      {
        source: "/services/basic",
        destination: "/basic-services",
        permanent: true,
      },
      {
        source: "/services/basic-services",
        destination: "/basic-services",
        permanent: true,
      },
    ];
  },
  async headers() {
    const scripts =
      process.env.NODE_ENV === "development" ? " 'unsafe-eval'" : "";
    return [
      {
        source: "/:path*",
        headers: [
          { key: "X-Content-Type-Options", value: "nosniff" },
          { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
          { key: "X-Frame-Options", value: "DENY" },
          {
            key: "Permissions-Policy",
            value: "camera=(), microphone=(), geolocation=()",
          },
          {
            key: "Content-Security-Policy",
            value:
              "default-src 'self'; script-src 'self' 'unsafe-inline'" +
              scripts +
              "; style-src 'self' 'unsafe-inline'; img-src 'self' data: blob:; font-src 'self'; connect-src 'self'; frame-src https://www.google.com; object-src 'none'; base-uri 'self'; form-action 'self'; frame-ancestors 'none'",
          },
        ],
      },
    ];
  },
};
export default nextConfig;
