import Link from "next/link";
import { Icon } from "@/components/icon";
import { PhotoFeature } from "@/components/photo-feature";
import { CareFinder } from "@/components/care-finder";
import { DoctorSection } from "@/components/doctor-section";
import { CareJourney } from "@/components/care-journey";
import { ClinicGallery } from "@/components/clinic-gallery";
import { FaqAccordion } from "@/components/faq-accordion";
import { LocationSection } from "@/components/location-section";
import { services } from "@/lib/services";
import { whatsappHref } from "@/lib/clinic-profile";
import { pageMetadata } from "@/lib/seo";
export const metadata = pageMetadata(
  "Physiotherapy Clinic in Manish Nagar, Nagpur",
  "Personalised physiotherapy focused on understanding your concerns, assessing movement and planning appropriate care at Rachana, Manish Nagar, Nagpur.",
  "/",
);
export default function Home() {
  return (
    <>
      <section className="movement-hero">
        <PhotoFeature
          src="movement-reference.webp"
          alt="Illustrative scene of a physiotherapist supporting a seated patient’s shoulder movement in a bright treatment room."
          className="movement-hero-photo"
          sizes="(max-width: 900px) 100vw, 57vw"
          caption="Illustrative therapy scene · AI-generated"
          priority
        />
        <div className="container movement-hero-inner">
          <div className="movement-hero-copy">
            <p className="eyebrow">Physiotherapy & rehabilitation</p>
            <h1>
              Move better.
              <br />
              Live comfortably.
            </h1>
            <p className="lead">
              Personalised physiotherapy and rehabilitation
              <br className="desktop-break" /> in Manish Nagar, Nagpur.
            </p>
            <div className="hero-buttons">
              <Link
                href="/request-appointment"
                className="button button-primary"
              >
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
            <p className="movement-hero-note">
              Manish Nagar, Nagpur · Care begins with an assessment
            </p>
          </div>
        </div>
      </section>
      <CareFinder compact />
      <DoctorSection compact />
      <section className="section editorial-services">
        <div className="container editorial-services-grid">
          <div>
            <p className="eyebrow">Our services</p>
            <h2>
              Specialised care.
              <br />
              Personal attention.
            </h2>
            <ol className="service-index">
              {services.map((service) => (
                <li key={service.slug}>
                  <Link href={"/services/" + service.slug}>
                    <span className="index-number">{service.number}</span>
                    <span>{service.name}</span>
                    <Icon name="arrow" />
                  </Link>
                </li>
              ))}
            </ol>
            <Link href="/services" className="text-link editorial-link">
              Explore All Services
              <Icon name="arrow" />
            </Link>
          </div>
          <PhotoFeature
            src="pilates-editorial-reference.webp"
            alt="Illustrative Pilates ball, exercise mat and stretching strap"
            className="editorial-services-photo"
            caption="Illustrative equipment image"
          />
        </div>
      </section>
      <CareJourney />
      <section className="section specialist-section">
        <div className="container specialist-grid">
          <div>
            <p className="eyebrow">Specialist care</p>
            <h2>Support for your recovery.</h2>
            <p className="supporting">
              Explore care options through an individual assessment. Your
              physiotherapist can explain which approaches may suit your needs.
            </p>
            <div className="therapy-links">
              <Link href="/services/tecar-laser-therapy">Tecar & Laser</Link>
              <Link href="/services/dry-needling">Dry Needling</Link>
              <Link href="/services/osteopathy-matrix-rhythm-therapy">
                Osteopathy & Matrix Rhythm
              </Link>
            </div>
          </div>
          <PhotoFeature
            src="strength-reference.webp"
            alt="Illustrative exercise equipment with dumbbells and a foam roller"
            className="specialist-photo"
            caption="Illustrative equipment image"
          />
        </div>
      </section>
      <ClinicGallery onlyApproved />
      <FaqAccordion />
      <LocationSection />
    </>
  );
}
