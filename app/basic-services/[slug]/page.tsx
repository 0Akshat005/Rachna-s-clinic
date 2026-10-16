import { notFound } from "next/navigation";
import { basicServices } from "@/lib/basic-services";
import { pageMetadata } from "@/lib/seo";
import { PageHero } from "@/components/page-hero";
import { CareJourney } from "@/components/care-journey";
import { BookingBanner } from "@/components/booking-banner";
import { FaqAccordion } from "@/components/faq-accordion";
import { BasicServiceCard } from "@/components/basic-service-card";
import { Icon } from "@/components/icon";
import styles from "@/components/basic-service-directory.module.css";

export const dynamicParams = false;

export function generateStaticParams() {
  return basicServices.map((service) => ({ slug: service.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const service = basicServices.find((s) => s.slug === slug);
  if (!service) return {};

  return pageMetadata(
    service.name + " in Nagpur",
    service.summary +
      " Learn about assessment, procedure, and clinical care at Rachana Physiotherapy Clinic, Manish Nagar.",
    "/basic-services/" + slug,
    { url: service.image, alt: service.alt },
  );
}

export default async function BasicServiceDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const service = basicServices.find((s) => s.slug === slug);
  if (!service) notFound();

  const related = basicServices
    .filter((s) => s.slug !== slug)
    .slice(0, 3);

  return (
    <>
      <PageHero
        eyebrow={service.name}
        breadcrumb={service.name}
        parentHref="/basic-services"
        parentLabel="Basic Services"
        title={service.heading}
        description={service.summary}
        image={service.image}
        alt={service.alt}
      />
      <section className="section">
        <div className="container service-detail-grid">
          <div>
            <p className="eyebrow">Start with your concerns</p>
            <h2>
              Who might come
              <br />
              to discuss this?
            </h2>
            <p>{service.audience}</p>
          </div>
          <div>
            <p className="eyebrow">Understand the next step</p>
            <h2>
              What happens
              <br />
              at an assessment?
            </h2>
            <p>{service.assessment}</p>
            <ul className="discussion-list">
              {service.discussion.map((point) => (
                <li key={point}>
                  <Icon name="check" />
                  {point}
                </li>
              ))}
            </ul>
          </div>
        </div>
        <div className="container">
          <p className="content-note">
            Suitability, benefits, limitations, and risks must be discussed with
            an appropriately qualified physiotherapist. This introductory page
            does not provide personalized medical advice. Treatments and
            modalities are administered following individual clinical assessment
            and informed consent.
          </p>
        </div>
      </section>
      <CareJourney />
      <FaqAccordion title="Questions before your treatment." />
      <BookingBanner />
      <section className="section">
        <div className="container">
          <p className="eyebrow">Keep exploring</p>
          <h2>Other foundational therapies.</h2>
          <div className={styles.grid} style={{ marginTop: "32px" }}>
            {related.map((item) => (
              <BasicServiceCard key={item.slug} service={item} />
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
