import { PageHero } from "@/components/page-hero";
import { DoctorSection } from "@/components/doctor-section";
import { CareJourney } from "@/components/care-journey";
import { ClinicGallery } from "@/components/clinic-gallery";
import { BookingBanner } from "@/components/booking-banner";
import { LocationSection } from "@/components/location-section";
import { pageMetadata } from "@/lib/seo";
export const metadata = pageMetadata(
  "About the Clinic & Our Approach",
  "Get to know Rachana Physiotherapy Clinic in Manish Nagar, Nagpur. Individual assessment, clear conversations and a care plan built around your movement goals.",
  "/about",
);
export default function About() {
  return (
    <>
      <PageHero
        eyebrow="About Rachana"
        title="Personal care. Built around your movement."
        description="Your movement goals belong to your everyday life. Our approach begins with understanding the person, before discussing a plan."
        booking={false}
      />
      <DoctorSection />
      <section className="section">
        <div className="container">
          <p className="eyebrow">The little things that matter</p>
          <h2>
            A conversation.
            <br />A clearer way forward.
          </h2>
          <div className="values-grid">
            {[
              [
                "We listen.",
                "Your concerns, routine and questions help shape the conversation. There is space to tell us what matters to you.",
              ],
              [
                "We explain.",
                "Ask what an assessment involves and why a particular next step is proposed. Care choices should make sense to you.",
              ],
              [
                "We personalise.",
                "Discuss a starting point that considers your goals and circumstances, with review points as appropriate.",
              ],
            ].map(([title, body]) => (
              <div key={title}>
                <h3>{title}</h3>
                <p>{body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
      <CareJourney />
      <ClinicGallery />
      <LocationSection />
      <BookingBanner />
    </>
  );
}
