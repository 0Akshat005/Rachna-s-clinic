import Link from "next/link";
import { PageHero } from "@/components/page-hero";
import { Icon } from "@/components/icon";
import { ClinicMap } from "@/components/clinic-map";
import { FaqAccordion } from "@/components/faq-accordion";
import { LocationSection } from "@/components/location-section";
import { clinic, callHref, whatsappHref } from "@/lib/clinic-profile";
import { pageMetadata } from "@/lib/seo";
export const metadata = pageMetadata(
  "Contact & Visit Rachana in Manish Nagar",
  "Call Rachana Physiotherapy Clinic, enquire on WhatsApp, request an appointment or find directions to Manish Nagar, Nagpur.",
  "/contact",
);
export default function Contact() {
  return (
    <>
      <PageHero
        eyebrow="Contact Rachana"
        title="Take the next step towards more comfortable movement."
        description="Ask a question, plan your visit, or request an assessment. You don’t need to choose a therapy before speaking with the clinic."
        booking={false}
      />
      <section className="section">
        <div className="container contact-options">
          <article className="contact-option">
            <Icon name="phone" />
            <h2>Call the clinic.</h2>
            <p>
              Speak with the clinic about availability, fees and what to expect
              from your visit.
            </p>
            <a className="text-link" href={callHref}>
              {clinic.phoneDisplay}
              <Icon name="arrow" />
            </a>
          </article>
          <article className="contact-option">
            <Icon name="message" />
            <h2>A quick enquiry.</h2>
            <p>
              Use WhatsApp for a general appointment enquiry. Please avoid
              sending medical records through this link.
            </p>
            <a
              className="text-link"
              href={whatsappHref}
              target="_blank"
              rel="noopener noreferrer"
            >
              Enquire on WhatsApp
              <Icon name="arrow" />
            </a>
          </article>
          <article className="contact-option">
            <Icon name="calendar" />
            <h2>Request a time.</h2>
            <p>
              Share a few basic contact details. The clinic will respond to
              discuss an available appointment.
            </p>
            <Link className="text-link" href="/request-appointment">
              Request an appointment
              <Icon name="arrow" />
            </Link>
          </article>
        </div>
      </section>
      <LocationSection />
      <section className="section">
        <div className="container">
          <div className="section-heading">
            <div>
              <p className="eyebrow">Your route to Rachana</p>
              <h2>
                Find us in
                <br />
                Manish Nagar.
              </h2>
            </div>
            <p>
              Check opening hours with the clinic
              <br />
              before making your visit.
            </p>
          </div>
          <div className="mt-8">
            <ClinicMap />
          </div>
        </div>
      </section>
      <FaqAccordion />
    </>
  );
}
