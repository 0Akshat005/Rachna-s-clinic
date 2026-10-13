import { PageHero } from "@/components/page-hero";
import { ServiceDirectory } from "@/components/service-directory";
import { CareFinder } from "@/components/care-finder";
import { CareJourney } from "@/components/care-journey";
import { BookingBanner } from "@/components/booking-banner";
import { FaqAccordion } from "@/components/faq-accordion";
import { pageMetadata } from "@/lib/seo";
export const metadata = pageMetadata(
  "Physiotherapy Services in Nagpur",
  "Explore Spine Care, sports rehabilitation, Pilates and specialist modalities at Rachana. Start with an individual assessment in Manish Nagar, Nagpur.",
  "/services",
);
export default function ServicesPage() {
  return (
    <>
      <PageHero
        eyebrow="Our services"
        title="Find the care that fits your needs."
        description="From everyday movement to returning to activity, your care starts with a conversation. Explore the options, then let an assessment guide the next step."
        image="pilates-reference.webp"
        alt="Illustrative exercise ball, mat and bands"
      />
      <section className="section">
        <div className="container">
          <p className="eyebrow">The service directory</p>
          <h2>
            Different approaches.
            <br />
            One individual starting point.
          </h2>
          <ServiceDirectory />
          <p className="content-note">
            These service descriptions are introductory information from the
            supplied clinic brief. They do not recommend a treatment for a
            diagnosis. Service availability, practitioner qualifications and
            clinical content require clinic review.
          </p>
        </div>
      </section>
      <CareFinder />
      <CareJourney />
      <BookingBanner unsure />
      <FaqAccordion title="Before you choose care." />
    </>
  );
}
