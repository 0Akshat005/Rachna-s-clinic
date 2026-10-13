import Link from "next/link";
import Image from "next/image";
import media from "@/content/media.json";
import { Icon } from "./icon";
import { clinic, factsApproved } from "@/lib/clinic-profile";
export function DoctorSection({ compact = false }: { compact?: boolean }) {
  const approved = factsApproved && clinic.practitioner.displayName;
  const hasPortrait = media.doctor.approved && media.doctor.src;
  if (compact || !hasPortrait)
    return (
      <section className="section practitioner-band">
        <div className="container practitioner-grid">
          <div>
            <p className="eyebrow">Your physiotherapist</p>
            <h2>
              Care that starts
              <br />
              with understanding.
            </h2>
          </div>
          <div className="practitioner-copy">
            <h3>
              {approved
                ? clinic.practitioner.title +
                  " " +
                  clinic.practitioner.displayName
                : "A personal approach to your care."}
            </h3>
            <p>
              Your movement, needs and everyday goals are the starting point.
              Care begins with listening and an individual assessment.
            </p>
            {!compact ? (
              <p>
                Discuss what feels difficult, what you miss doing, and what you
                hope to return to. Your physiotherapist can explain the proposed
                next steps and make room for your questions.
              </p>
            ) : null}
            {approved && clinic.practitioner.qualifications.length ? (
              <p>{clinic.practitioner.qualifications.join(" · ")}</p>
            ) : null}
            {compact ? (
              <Link href="/about" className="text-link editorial-link">
                About our approach
                <Icon name="arrow" />
              </Link>
            ) : null}
          </div>
        </div>
      </section>
    );
  return (
    <section className="section practitioner-band">
      <div className="container doctor-grid">
        <div className="portrait-placeholder">
          <Image
            src={media.doctor.src}
            alt={media.doctor.alt}
            fill
            sizes="(max-width: 767px) 100vw, 42vw"
            style={{ objectFit: "cover" }}
          />
        </div>
        <div className="practitioner-copy">
          <p className="eyebrow">The person behind your care</p>
          <h2>
            Care that starts
            <br />
            with listening.
          </h2>
          {approved ? (
            <h3>
              {clinic.practitioner.title} {clinic.practitioner.displayName}
            </h3>
          ) : null}
          <p>
            Your everyday life is the starting point. What feels difficult, what
            you miss doing, and what you hope to return to all belong in the
            conversation.
          </p>
          <p>
            At Rachana, the approach begins with an individual assessment and a
            clear discussion of the next steps.
          </p>
          {approved && clinic.practitioner.qualifications.length ? (
            <p>{clinic.practitioner.qualifications.join(" · ")}</p>
          ) : null}
        </div>
      </div>
    </section>
  );
}
