import Link from "next/link";
import { Icon } from "./icon";
import { callHref, whatsappHref } from "@/lib/clinic-profile";
export function BookingBanner({ unsure = false }: { unsure?: boolean }) {
  return (
    <section className="booking-banner">
      <div className="container booking-banner-inner">
        <div>
          <p className="eyebrow">
            {unsure ? "Not sure where to start?" : "Your next step"}
          </p>
          <h2>
            {unsure
              ? "Begin with a conversation."
              : "Let’s move forward, together."}
          </h2>
          <p>
            You don’t have to figure it all out first.
            <br />
            The clinic will contact you to confirm availability.
          </p>
        </div>
        <div>
          <Link href="/request-appointment" className="button button-light">
            Request an appointment
            <Icon name="arrow" />
          </Link>
          <div className="banner-secondary">
            <a href={callHref}>Call the clinic</a>
            <span aria-hidden="true">/</span>
            <a href={whatsappHref} target="_blank" rel="noopener noreferrer">
              WhatsApp enquiry ↗
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
