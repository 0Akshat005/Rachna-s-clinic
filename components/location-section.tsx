import Link from "next/link";
import { Icon } from "./icon";
import {
  clinic,
  factsApproved,
  callHref,
  mapsHref,
  whatsappHref,
} from "@/lib/clinic-profile";
export function LocationSection() {
  return (
    <section className="section location-section">
      <div className="container location-grid">
        <div data-reveal>
          <p className="eyebrow">Contact us</p>
          <h2>
            Let’s get you
            <br />
            moving again.
          </h2>
          <div className="location-actions">
            <Link href="/request-appointment" className="button button-primary">
              Request Appointment
              <Icon name="arrow" />
            </Link>
            <a
              href={whatsappHref}
              className="button button-outline"
              target="_blank"
              rel="noopener noreferrer"
            >
              <Icon name="whatsapp" />
              WhatsApp Us
            </a>
          </div>
        </div>
        <div className="location-details" data-reveal data-reveal-delay="80">
          <h3>Visit {clinic.name}</h3>
          <div>
            <Icon name="pin" />
            <div>
              <p>{clinic.address}</p>
              {!factsApproved ? (
                <small>Reference address · confirmation pending</small>
              ) : null}
            </div>
          </div>
          <div>
            <Icon name="clock" />
            <div>
              <p>
                {clinic.hours.length
                  ? clinic.hours.join(" · ")
                  : "Please call to confirm current opening hours."}
              </p>
            </div>
          </div>
          <div>
            <Icon name="phone" />
            <div>
              <a className="location-phone" href={callHref}>
                {clinic.phoneDisplay}
              </a>
            </div>
          </div>
          <a
            className="text-link editorial-link"
            href={mapsHref}
            target="_blank"
            rel="noopener noreferrer"
          >
            Get Directions
            <Icon name="arrow" />
          </a>
        </div>
      </div>
    </section>
  );
}
