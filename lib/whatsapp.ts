import clinic from "@/content/clinic.json";
import type { AppointmentInput } from "./validation";

export const clinicWhatsAppNumber = clinic.phone.replace(/\D/g, "");

export function whatsappChatUrl(message: string) {
  return (
    "https://wa.me/" +
    clinicWhatsAppNumber +
    "?text=" +
    encodeURIComponent(message)
  );
}

export function appointmentWhatsAppMessage(
  details: Pick<
    AppointmentInput,
    "name" | "phone" | "interest" | "preferredDay"
  >,
) {
  const phone = details.phone.startsWith("+")
    ? details.phone
    : "+91 " + details.phone;
  const preferredDay = details.preferredDay
    ? new Intl.DateTimeFormat("en-IN", {
        weekday: "long",
        day: "numeric",
        month: "long",
        year: "numeric",
        timeZone: "Asia/Kolkata",
      }).format(new Date(details.preferredDay + "T12:00:00+05:30"))
    : "Flexible — please suggest an available day";
  return [
    "*Appointment enquiry | Rachana Physiotherapy Clinic*",
    "",
    "Hello Doctor, I would like to enquire about an appointment.",
    "",
    "*Name:* " + details.name,
    "*Callback number:* " + phone,
    "*General area of interest:* " + (details.interest || "Please guide me"),
    "*Preferred day:* " + preferredDay,
    "",
    "Please let me know the available appointment times and any preparation needed for my visit.",
    "I understand that my appointment is confirmed only after the clinic replies.",
    "",
    "Enquiry prepared through the clinic website.",
  ].join("\n");
}
