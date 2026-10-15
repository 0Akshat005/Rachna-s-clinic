import Link from "next/link";
import { Icon } from "./icon";
import {
  clinic,
  practitionerApproved,
  practitionerName,
} from "@/lib/clinic-profile";
import styles from "./doctor-section.module.css";

const credentialGroups = [
  { id: "academic", title: "Academic qualifications" },
  { id: "specialist", title: "Specialist training" },
  { id: "roles", title: "Additional training & roles" },
] as const;

export function DoctorSection({ compact = false }: { compact?: boolean }) {
  const credentials = clinic.practitioner.qualifications;
  if (compact) {
    return (
      <section className="section practitioner-band">
        <div className="container practitioner-grid">
          <div data-reveal>
            <p className="eyebrow">Your physiotherapist</p>
            <h2>
              Care that starts
              <br />
              with understanding.
            </h2>
          </div>
          <div className="practitioner-copy" data-reveal data-reveal-delay="80">
            <h3>
              {practitionerApproved
                ? practitionerName
                : "A personal approach to your care."}
            </h3>
            <p>
              Your movement, needs and everyday goals are the starting point.
              Care begins with listening and an individual assessment.
            </p>
            {practitionerApproved ? (
              <p className={styles.compactCredentials}>
                {credentials
                  .filter((credential) => credential.group === "academic")
                  .map((credential) => credential.label)
                  .join(" · ")}
              </p>
            ) : null}
            <Link href="/about" className="text-link editorial-link">
              {practitionerApproved
                ? "About " + practitionerName
                : "About our approach"}
              <Icon name="arrow" />
            </Link>
          </div>
        </div>
      </section>
    );
  }
  if (!practitionerApproved) return null;
  return (
    <section
      id="doctor-qualifications"
      className={styles.section}
      aria-labelledby="doctor-qualifications-heading"
      tabIndex={-1}
    >
      <div className="container">
        <div className={styles.heading}>
          <div>
            <p className="eyebrow">Professional background</p>
            <h2 id="doctor-qualifications-heading">
              Qualifications & training.
            </h2>
          </div>
          <p>
            Academic qualifications, specialist training and additional
            professional roles.
          </p>
        </div>
        <div className={styles.grid}>
          {credentialGroups.map((group) => (
            <section
              key={group.id}
              className={
                styles.group +
                (group.id === "academic" ? " " + styles.academic : "")
              }
              aria-labelledby={"credentials-" + group.id}
            >
              <h3 id={"credentials-" + group.id}>{group.title}</h3>
              <ul role="list" className={styles.list}>
                {credentials
                  .filter((credential) => credential.group === group.id)
                  .map((credential) => (
                    <li key={credential.label}>
                      <span>{credential.label}</span>
                    </li>
                  ))}
              </ul>
            </section>
          ))}
        </div>
      </div>
    </section>
  );
}
