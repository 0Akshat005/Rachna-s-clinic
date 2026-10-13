"use client";
import Link from "next/link";
import { useState } from "react";
import { Icon } from "./icon";
const concerns = [
  {
    label: "Back / neck",
    title: "Start by exploring Spine Care.",
    description:
      "Learn what an assessment for back, neck and movement concerns can involve.",
    href: "/services/spine-care",
    link: "Explore spine care",
  },
  {
    label: "Sports injury",
    title: "Explore Sports Injury Rehabilitation.",
    description:
      "Bring your activity goals into a conversation about recovery and returning to movement.",
    href: "/services/sports-injury-rehabilitation",
    link: "Explore rehabilitation",
  },
  {
    label: "Stiffness / mobility",
    title: "Begin with a movement assessment.",
    description:
      "Spine Care is one place to learn about discussing stiffness and everyday movement.",
    href: "/services/spine-care",
    link: "Explore movement care",
  },
  {
    label: "Strength / posture",
    title: "Get to know Pilates Training.",
    description:
      "Find out about guided movement, exercise goals and an appropriate starting point.",
    href: "/services/pilates-training",
    link: "Explore Pilates",
  },
  {
    label: "Not sure",
    title: "You don’t need to choose a therapy.",
    description:
      "Start with an individual assessment and a conversation about what matters to you.",
    href: "/request-appointment",
    link: "Request an assessment",
  },
];
export function CareFinder({ compact = false }: { compact?: boolean }) {
  const [index, setIndex] = useState<number | null>(compact ? null : 0);
  const selected = index === null ? null : concerns[index];
  return (
    <section
      className={compact ? "care-navigation" : "section care-section"}
      id="care-finder"
    >
      <div className="container">
        <div className={compact ? "care-navigation-row" : ""}>
          {compact ? (
            <h2>How can we help?</h2>
          ) : (
            <div className="section-heading">
              <div>
                <p className="eyebrow">A place to begin</p>
                <h2>
                  What would you like help
                  <br className="desktop-break" /> moving through?
                </h2>
              </div>
              <p>
                You don’t need to know a treatment name.
                <br />
                Start with what brings you here.
              </p>
            </div>
          )}
          <div
            className={compact ? "concern-options" : "chips"}
            role="group"
            aria-label="Choose a movement concern"
          >
            {concerns.map((concern, i) => (
              <button
                type="button"
                key={concern.label}
                aria-pressed={i === index}
                onClick={() => setIndex(i)}
                className={
                  (compact ? "concern-option " : "chip ") +
                  (i === index ? "selected" : "")
                }
              >
                {concern.label}
              </button>
            ))}
          </div>
        </div>
        <div aria-live="polite" aria-atomic="true">
          {selected ? (
            <>
              <div className={compact ? "concern-response" : "care-result"}>
                {!compact ? (
                  <div className="care-icon">
                    <Icon name="leaf" />
                  </div>
                ) : null}
                <div>
                  <h3>{selected.title}</h3>
                  <p>{selected.description}</p>
                </div>
                <Link href={selected.href} className="text-link">
                  {selected.link}
                  <Icon name="arrow" />
                </Link>
              </div>
              <div className="care-note">
                <p>
                  This finder suggests a service to explore. It does not provide
                  a diagnosis or treatment recommendation.
                </p>
                {!compact ? (
                  <Link href="/request-appointment">
                    Or go straight to an assessment →
                  </Link>
                ) : null}
              </div>
            </>
          ) : null}
        </div>
      </div>
    </section>
  );
}
