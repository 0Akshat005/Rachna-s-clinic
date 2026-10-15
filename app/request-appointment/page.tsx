import { AppointmentEnquiry } from "@/components/appointment-enquiry";
import { PageHero } from "@/components/page-hero";
import { FaqAccordion } from "@/components/faq-accordion";
import { pageMetadata } from "@/lib/seo";

export const dynamic = "force-dynamic";
export const metadata = pageMetadata(
  "Request an Appointment",
  "Prepare a WhatsApp appointment enquiry for Rachana in Manish Nagar, Nagpur. Share basic contact details and a preferred day; the clinic confirms availability.",
  "/request-appointment",
);
export default function RequestAppointment() {
  return (
    <>
      <PageHero
        eyebrow="Your next step"
        title="Let’s find a starting point that works for you."
        description="Prepare your appointment enquiry, then review and send it on WhatsApp. You can leave the choice of therapy for a conversation with your physiotherapist."
        booking={false}
      />
      <AppointmentEnquiry />
      <FaqAccordion />
    </>
  );
}
