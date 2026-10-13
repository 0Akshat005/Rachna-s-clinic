import { BookingForm } from "@/components/booking-form";
import { PageHero } from "@/components/page-hero";
import { FaqAccordion } from "@/components/faq-accordion";
import { callHref, clinic } from "@/lib/clinic-profile";
import { pageMetadata } from "@/lib/seo";
export const dynamic = "force-dynamic";
export const metadata = pageMetadata(
  "Request an Appointment",
  "Request a physiotherapy assessment at Rachana in Manish Nagar, Nagpur. Share basic contact details and a preferred day; availability is confirmed by the clinic.",
  "/request-appointment",
);
export default function RequestAppointment() {
  const mode = process.env.BOOKING_MODE === "live" ? "live" : "preview";
  return (
    <>
      <PageHero
        eyebrow="Your next step"
        title="Let’s find a starting point that works for you."
        description="Request an appointment in a few simple steps. You can leave the choice of therapy for a conversation with your physiotherapist."
        booking={false}
      />
      <section className="section">
        <div className="container booking-layout">
          <div className="booking-info">
            <p className="eyebrow">A request, then a conversation</p>
            <h2>What happens next?</h2>
            <ol>
              {[
                [
                  "Share a few details",
                  "Your name, a phone number and, if you like, a preferred day.",
                ],
                [
                  "The clinic gets in touch",
                  "Availability and any first-visit questions can be discussed with you.",
                ],
                [
                  "Confirm your appointment",
                  "Your appointment is confirmed only when the clinic agrees the details with you.",
                ],
              ].map(([title, body]) => (
                <li key={title}>
                  <div>
                    <strong>{title}</strong>
                    <p>{body}</p>
                  </div>
                </li>
              ))}
            </ol>
            <p className="supporting text-sm">Prefer to speak with someone?</p>
            <a href={callHref} className="text-link">
              {clinic.phoneDisplay} →
            </a>
          </div>
          <BookingForm mode={mode} />
        </div>
      </section>
      <FaqAccordion />
    </>
  );
}
