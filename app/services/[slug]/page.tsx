import { notFound } from "next/navigation";
import { services } from "@/lib/services";
import { pageMetadata } from "@/lib/seo";
import { PageHero } from "@/components/page-hero";
import { CareJourney } from "@/components/care-journey";
import { BookingBanner } from "@/components/booking-banner";
import { FaqAccordion } from "@/components/faq-accordion";
import { ServiceCard } from "@/components/service-card";
import { Icon } from "@/components/icon";
export const dynamicParams = false;
export function generateStaticParams() {
  return services.map((service) => ({ slug: service.slug }));
}
export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const service = services.find((s) => s.slug === slug);
  if (!service) return {};
  return pageMetadata(
    service.name + " in Nagpur",
    service.summary +
      " Explore assessment and first-visit expectations at Rachana, Manish Nagar.",
    "/services/" + slug,
  );
}
export default async function ServicePage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const service = services.find((s) => s.slug === slug);
  if (!service) notFound();
  const related = services.filter((s) => s.slug !== slug).slice(0, 2);
  return (
    <>
      <PageHero
        eyebrow={service.name}
        breadcrumb={service.name}
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
            Suitability, benefits, limitations and risks must be discussed with
            an appropriately qualified practitioner. This introductory page does
            not provide personalised medical advice. Detailed clinical content
            and service availability await clinic approval.
          </p>
        </div>
      </section>
      <CareJourney />
      <FaqAccordion title={"Questions before your assessment."} />
      <BookingBanner />
      <section className="section">
        <div className="container">
          <p className="eyebrow">Keep exploring</p>
          <h2>Other care options.</h2>
          <div className="related-grid">
            {related.map((item) => (
              <ServiceCard key={item.slug} service={item} />
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
