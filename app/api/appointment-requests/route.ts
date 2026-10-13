import { createAppointmentHandler } from "@/lib/appointment-handler";
import profile from "@/content/clinic.json";
export const runtime = "nodejs";
export const maxDuration = 30;
export async function POST(request: Request) {
  const handler = createAppointmentHandler(
    {
      mode: process.env.BOOKING_MODE === "live" ? "live" : "preview",
      origin: process.env.SITE_URL || "http://localhost:3000",
      approved:
        process.env.NEXT_PUBLIC_CLINIC_FACTS_APPROVED === "true" &&
        profile.privacyApproved &&
        profile.clinicalContentApproved,
      apiKey: process.env.RESEND_API_KEY,
      from: process.env.BOOKING_FROM_EMAIL,
      to: process.env.BOOKING_TO_EMAIL,
      redisUrl: process.env.UPSTASH_REDIS_REST_URL,
      redisToken: process.env.UPSTASH_REDIS_REST_TOKEN,
      hashSecret: process.env.BOOKING_HASH_SECRET,
      trustedVercelProxy: process.env.VERCEL === "1",
    },
    {
      audit: (event, ticket) =>
        console.info(JSON.stringify({ event, ...(ticket ? { ticket } : {}) })),
    },
  );
  return handler(request);
}
