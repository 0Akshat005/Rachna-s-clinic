import { PageHero } from "@/components/page-hero";
import { BasicServiceDirectory } from "@/components/basic-service-directory";
import { CareFinder } from "@/components/care-finder";
import { CareJourney } from "@/components/care-journey";
import { BookingBanner } from "@/components/booking-banner";
import { FaqAccordion } from "@/components/faq-accordion";
import { pageMetadata } from "@/lib/seo";
import styles from "@/components/basic-service-directory.module.css";

export const metadata = pageMetadata(
  "Basic Physiotherapy Services in Nagpur",
  "Explore foundational physical modalities, electrotherapy, manual therapy, and rehabilitation at Rachana. Start with an individual assessment in Manish Nagar, Nagpur.",
  "/basic-services",
);

export default function BasicServicesPage() {
  return (
    <>
      <PageHero
        eyebrow="Basic physiotherapy"
        breadcrumb="Basic Services"
        parentHref="/services"
        parentLabel="All Services"
        title="Essential care for everyday recovery."
        description="Explore foundational physical modalities, electrotherapy, supportive taping, and active rehabilitation techniques. Start with an individual assessment to find the appropriate approach for your movement and recovery."
        image="/images/basic/service-taping.webp"
        alt="Physiotherapist applying therapeutic kinesiology tape in a clinical setting"
      />
      <section
        className="section"
        aria-labelledby="basic-service-directory-heading"
      >
        <div className="container">
          <p className="eyebrow">The basic service catalogue</p>
          <div className={styles.intro}>
            <h2 id="basic-service-directory-heading">
              What does each
              <br />
              modality involve?
            </h2>
            <p>
              Browse our complete catalogue of foundational modalities,
              electrotherapies, and manual techniques.
            </p>
          </div>
          <BasicServiceDirectory />
          <p className={"content-note " + styles.note}>
            An assessment comes first. Modalities and manual techniques are
            selected based on individual evaluation, safety screening, and
            clinical judgment. Your physiotherapist will discuss suitability
            before proceeding with any treatment.
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
