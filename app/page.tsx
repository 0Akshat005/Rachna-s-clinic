import Link from "next/link";
import { Icon } from "@/components/icon";
import { PhotoFeature } from "@/components/photo-feature";
import { HeroMedia } from "@/components/hero-media";
import { ServiceShowcase } from "@/components/service-showcase";
import media from "@/content/media.json";
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
        <HeroMedia />
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
        <ServiceShowcase
          items={services.map((service) => {
            const image =
              media.features[service.image as keyof typeof media.features];
            return {
              slug: service.slug,
              number: service.number,
              name: service.name,
              category: service.category,
              summary: service.summary,
              src: "mobileSrc" in image ? image.mobileSrc : image.src,
              alt: image.alt || service.alt,
              caption: image.caption || "",
              objectPosition:
                "objectPosition" in image ? image.objectPosition : "center",
            };
          })}
        />
      </section>
      <CareJourney />
      <section className="section specialist-section">
        <div className="container specialist-grid">
          <div data-reveal>
            <p className="eyebrow">Specialist care</p>
            <h2>Support for your recovery.</h2>
            <p className="supporting">
              Explore care options through an individual assessment. Your
              physiotherapist can explain which approaches may suit your needs.
            </p>
            <div className="therapy-links">
              <Link href="/services/laser-therapy">Laser Therapy</Link>
              <Link href="/services/tecar-therapy">TECAR Therapy</Link>
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
          />
        </div>
      </section>
      <ClinicGallery onlyApproved />
      <FaqAccordion />
      <LocationSection />
    </>
  );
}
