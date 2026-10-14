import { PageHero } from "@/components/page-hero";
import { ServiceDirectory } from "@/components/service-directory";
import { CareFinder } from "@/components/care-finder";
import { CareJourney } from "@/components/care-journey";
import { BookingBanner } from "@/components/booking-banner";
import { FaqAccordion } from "@/components/faq-accordion";
import { pageMetadata } from "@/lib/seo";
import styles from "@/components/service-directory.module.css";

export const metadata = pageMetadata(
  "Physiotherapy Services in Nagpur",
  "Explore Spine Care, sports rehabilitation, Pilates and specialist therapies at Rachana. Start with an individual assessment in Manish Nagar, Nagpur.",
  "/services",
);
export default function ServicesPage() {
  return (
    <>
      <PageHero
        eyebrow="Our services"
        title="Find the care that fits your needs."
        description="Explore movement assessments, hands-on techniques, specialist therapies and guided exercise. Your physiotherapist will help you understand which approach suits your needs."
        image="service-guided-pilates.webp"
        alt="Illustrative scene of a physiotherapist guiding a controlled mat exercise"
      />
      <section className="section" aria-labelledby="service-directory-heading">
        <div className="container">
          <p className="eyebrow">The service directory</p>
          <div className={styles.intro}>
            <h2 id="service-directory-heading">
              What does each
              <br />
              service involve?
            </h2>
            <p>
              See the approach in practice, read a short introduction, then
              explore what to expect.
            </p>
          </div>
          <ServiceDirectory />
          <p className={"content-note " + styles.note}>
            An assessment comes first. These introductions explain the
            techniques; suitability and your care plan are discussed with your
            physiotherapist.
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
