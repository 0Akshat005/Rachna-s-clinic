import Image from "next/image";
import Link from "next/link";
import { Icon } from "@/components/icon";
import { DoctorSection } from "@/components/doctor-section";
import {
  clinic,
  callHref,
  factsApproved,
  mapsHref,
} from "@/lib/clinic-profile";
import { pageMetadata } from "@/lib/seo";
import media from "@/content/media.json";
import styles from "./about.module.css";

export const metadata = pageMetadata(
  "About Rachana & Your First Physiotherapy Visit",
  "Understand Rachana Physiotherapy Clinic in Manish Nagar, Nagpur: the care you can explore, how assessment starts and what to expect at your first visit.",
  "/about",
);

const careOptions = [
  {
    title: "Back or neck concerns",
    body: "Discuss discomfort, stiffness or difficulty with everyday movement.",
    href: "/services/spine-care",
    link: "Explore Spine Care",
  },
  {
    title: "Getting back to sport or activity",
    body: "Talk about an injury, your current movement and the activities you want to return to.",
    href: "/services/sports-injury-rehabilitation",
    link: "Explore Sports Injury Rehabilitation",
  },
  {
    title: "Strength, posture and guided exercise",
    body: "Explore Pilates and a starting point that fits your experience and movement goals.",
    href: "/services/pilates-training",
    link: "Explore Pilates Training",
  },
  {
    title: "Questions about specialist therapies",
    body: "Understand the approaches available, what they involve and whether they may suit you.",
    href: "/services",
    link: "Explore all care options",
  },
];

const visitSteps = [
  {
    title: "Tell us what feels difficult.",
    body: "Talk about your concern, how it affects your day and the activities you want to get back to. Share relevant previous care and bring your questions.",
  },
  {
    title: "Understand your movement assessment.",
    body: "Your physiotherapist can explain the proposed movement checks, what they are looking at and what the findings mean for you.",
  },
  {
    title: "Discuss the next steps together.",
    body: "Ask about suitable care options, alternatives and what each approach involves. You do not need to choose a therapy before your assessment.",
  },
  {
    title: "Review how the plan is working.",
    body: "If follow-up is advised, discuss when to review your progress and whether your plan needs to change. Ask the clinic about session length and costs.",
  },
];

export default function About() {
  const image = media.features["about-therapy.webp"];
  const hasPractitioner = factsApproved && clinic.practitioner.displayName;
  return (
    <>
      <section className={styles.hero} aria-labelledby="about-heading">
        <div className="container">
          <nav
            className={"breadcrumb " + styles.breadcrumb}
            aria-label="Breadcrumb"
          >
            <Link href="/" prefetch={false}>
              Home
            </Link>
            <span aria-hidden="true">/</span>
            <span>About Rachana</span>
          </nav>
          <div className={styles.heroGrid}>
            <div className={styles.heroCopy}>
              <p className="eyebrow">About Rachana</p>
              <h1 id="about-heading">Physiotherapy for everyday movement.</h1>
              <p className={styles.intro}>
                At Rachana Physiotherapy Clinic in Manish Nagar, Nagpur, we
                offer care for back and neck concerns, injury rehabilitation and
                guided movement.
              </p>
              <p className={styles.heroPurpose}>
                Our aim is to help you understand your care and work towards the
                everyday activities that matter to you.
              </p>
              <div className={styles.heroActions}>
                <Link
                  href="/request-appointment"
                  className="button button-primary"
                >
                  Request an assessment
                  <Icon name="arrow" />
                </Link>
                <a
                  href="#your-first-visit"
                  className={"text-link " + styles.visitLink}
                >
                  Your first visit
                  <Icon name="arrow" />
                </a>
              </div>
            </div>
            <figure className={styles.heroPhoto}>
              <div className={styles.heroImage}>
                <Image
                  src={image.src}
                  alt={image.alt}
                  fill
                  sizes="(max-width: 767px) calc(100vw - 40px), (max-width: 900px) 90vw, 41vw"
                  loading="eager"
                  fetchPriority="high"
                  style={{ objectFit: "cover", objectPosition: "center" }}
                />
              </div>
              <figcaption>{image.caption}</figcaption>
            </figure>
          </div>
          <nav className={styles.pageIndex} aria-label="Explore the About page">
            <p>On this page</p>
            {[
              ["01", "The clinic", "#the-clinic"],
              ["02", "Care options", "#care-options"],
              ["03", "Your first visit", "#your-first-visit"],
            ].map(([number, label, href]) => (
              <a href={href} key={href}>
                <span aria-hidden="true">{number}</span>
                {label}
                <Icon name="arrow" />
              </a>
            ))}
          </nav>
        </div>
      </section>

      <section
        className={styles.purpose}
        id="the-clinic"
        tabIndex={-1}
        aria-labelledby="clinic-purpose-heading"
      >
        <div className={"container " + styles.purposeGrid}>
          <p className={styles.sectionLabel}>
            01 <span>The clinic</span>
          </p>
          <h2 id="clinic-purpose-heading" data-reveal>
            An assessment first.
            <br />A plan you understand.
          </h2>
          <div
            className={styles.purposeCopy}
            data-reveal
            data-reveal-delay="70"
          >
            <p>
              Everyday movement means something different to each person:
              sitting through a workday, walking comfortably or returning to
              sport. Your routine helps us understand what you want care to
              support.
            </p>
            <p>
              Your starting point is an individual assessment. Your
              physiotherapist explains the findings, discusses suitable options
              and agrees on the next steps with you.
            </p>
          </div>
        </div>
      </section>

      <section
        className={styles.careSection}
        id="care-options"
        tabIndex={-1}
        aria-labelledby="care-options-heading"
      >
        <div className={"container " + styles.careGrid}>
          <div className={styles.sectionIntro} data-reveal>
            <p className="eyebrow">02 · Care options</p>
            <h2 id="care-options-heading">
              What brings
              <br />
              you here?
            </h2>
            <p>
              Start with the activity or movement that feels difficult. These
              are some of the reasons to explore an assessment at Rachana.
            </p>
            <Link href="/services" className="text-link editorial-link">
              View all services
              <Icon name="arrow" />
            </Link>
          </div>
          <ol className={styles.careList}>
            {careOptions.map((option, index) => (
              <li key={option.href} data-reveal data-reveal-delay={index * 45}>
                <Link
                  href={option.href}
                  className={styles.careLink}
                  aria-labelledby={
                    "about-care-title-" + index + " about-care-link-" + index
                  }
                  aria-describedby={"about-care-description-" + index}
                >
                  <span className={styles.careNumber} aria-hidden="true">
                    {String(index + 1).padStart(2, "0")}
                  </span>
                  <div>
                    <h3 id={"about-care-title-" + index}>{option.title}</h3>
                    <p id={"about-care-description-" + index}>{option.body}</p>
                    <span
                      id={"about-care-link-" + index}
                      className={styles.careDestination}
                    >
                      {option.link}
                    </span>
                  </div>
                  <Icon name="arrow" />
                </Link>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {hasPractitioner ? <DoctorSection /> : null}

      <section
        className={styles.visitSection}
        id="your-first-visit"
        tabIndex={-1}
        aria-labelledby="first-visit-heading"
      >
        <div className={"container " + styles.visitGrid}>
          <div className={styles.sectionIntro} data-reveal>
            <p className="eyebrow">03 · Your first visit</p>
            <h2 id="first-visit-heading">
              Know what to expect.
              <br />
              Know what to ask.
            </h2>
            <p>
              Your first assessment is a conversation and a chance to understand
              the next steps. You can ask questions throughout.
            </p>
            <div className={styles.visitPreparation}>
              <Icon name="calendar" />
              <div>
                <h3>A little preparation</h3>
                <p>
                  Choose clothing you can move in. Ask the clinic whether to
                  bring relevant reports or previous prescriptions.
                </p>
              </div>
            </div>
          </div>
          <div className={"faq-list " + styles.visitSteps}>
            {visitSteps.map((step, index) => (
              <details key={step.title} open={index === 0}>
                <summary>
                  <span className={styles.stepNumber} aria-hidden="true">
                    {String(index + 1).padStart(2, "0")}
                  </span>
                  <h3>{step.title}</h3>
                  <span aria-hidden="true" className="faq-symbol" />
                </summary>
                <p className={styles.stepBody}>{step.body}</p>
              </details>
            ))}
            <p className={styles.visitNote}>
              For current timings, fees or referral requirements,{" "}
              <a href={callHref}>call the clinic</a>.
            </p>
          </div>
        </div>
      </section>

      <section className={styles.nextStep} aria-labelledby="about-next-step">
        <div className={"container " + styles.nextStepGrid}>
          <div data-reveal>
            <p className="eyebrow">Your next step</p>
            <h2 id="about-next-step">Arrange your first assessment.</h2>
            <p>
              Tell us you would like a visit. The clinic will contact you to
              discuss availability and confirm your appointment.
            </p>
            <a
              href={mapsHref}
              className="text-link"
              target="_blank"
              rel="noopener noreferrer"
            >
              Find us in {clinic.locality}, {clinic.city}
              <Icon name="arrow" />
            </a>
          </div>
          <div className={styles.nextStepActions}>
            <Link href="/request-appointment" className="button button-primary">
              Request an appointment
              <Icon name="arrow" />
            </Link>
            <a href={callHref} className="button button-outline">
              <Icon name="phone" />
              Call the clinic
            </a>
            <p>A request is confirmed after you hear from the clinic.</p>
          </div>
        </div>
      </section>
    </>
  );
}
