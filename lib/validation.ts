import { z } from "zod";
export const interests = [
  "",
  "Back / neck",
  "Sports rehabilitation",
  "Strength / Pilates",
  "General assessment",
] as const;
export function indiaToday(now = new Date()) {
  return new Date(now.getTime() + 330 * 60 * 1000).toISOString().slice(0, 10);
}
export const appointmentSchema = z
  .object({
    name: z
      .string()
      .trim()
      .min(2, "Please enter your full name.")
      .max(80, "Please use 80 characters or fewer.")
      .refine(
        (v) => !/[\u0000-\u001f\u007f]/.test(v),
        "Please enter a name without control characters.",
      ),
    phone: z
      .string()
      .trim()
      .max(24)
      .transform((v) => v.replace(/[ ()-]/g, ""))
      .refine(
        (v) => /^[6-9]\d{9}$/.test(v) || /^\+[1-9]\d{7,14}$/.test(v),
        "Enter a 10-digit Indian mobile number or an international number with country code.",
      ),
    interest: z.enum(interests).default(""),
    preferredDay: z
      .string()
      .default("")
      .refine(
        (v) =>
          !v ||
          (/^\d{4}-\d{2}-\d{2}$/.test(v) &&
            !Number.isNaN(Date.parse(v)) &&
            new Date(v).toISOString().slice(0, 10) === v &&
            v >= indiaToday() &&
            Date.parse(v) <= Date.parse(indiaToday()) + 180 * 86400000),
        "Choose today or a valid date within the next six months.",
      ),
    consent: z.literal(true, {
      error:
        "Please agree to the privacy notice so the clinic can contact you.",
    }),
    website: z.string().max(200).default(""),
  })
  .strict();
export type AppointmentInput = z.infer<typeof appointmentSchema>;
