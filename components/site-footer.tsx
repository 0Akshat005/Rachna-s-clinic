import Link from "next/link";
import { Brand } from "./site-header";
import { Icon } from "./icon";
import {
  callHref,
  clinic,
  factsApproved,
  mapsHref,
} from "@/lib/clinic-profile";
import { services } from "@/lib/services";
import styles from "./site-footer.module.css";

const quickLinks = [
  ["Home", "/"],
  ["About", "/about"],
  ["Services", "/services"],
  ["Contact", "/contact"],
  ["Request appointment", "/request-appointment"],
];
export function SiteFooter() {
  return (
    <>
      <footer className={styles.footer}>
        <div className="container">
          <div className={styles.main}>
            <div className={styles.brandColumn}>
              <Brand dark />
              <p className={styles.tagline}>Helping Nagpur move better.</p>
              <Link href="/request-appointment" className={styles.brandCta}>
                Book appointment
                <Icon name="arrow" />
              </Link>
            </div>
            <nav className={styles.column} aria-label="Footer quick links">
              <h2>Quick links</h2>
              <div className={styles.links}>
                {quickLinks.map(([name, href]) => (
                  <Link key={href} href={href}>
                    {name}
                  </Link>
                ))}
              </div>
            </nav>
            <nav className={styles.column} aria-label="Footer services">
              <h2>Services</h2>
              <div className={styles.links}>
                {services.map((service) => {
                  const label =
                    service.slug === "osteopathy-matrix-rhythm-therapy"
                      ? "Osteopathy & Matrix Therapy"
                      : service.slug === "sports-injury-rehabilitation"
                        ? "Sports Injury Rehab"
                        : service.name;
                  return (
                    <Link key={service.slug} href={"/services/" + service.slug}>
                      {label}
                    </Link>
                  );
                })}
              </div>
            </nav>
            <div className={styles.contact}>
              <h2>Contact</h2>
              <address>
                <div className={styles.addressBlock}>
                  <p className={styles.addressStreet}>
                    59, Nagar Vikas Society, beside Indian Bank
                  </p>
                  <p className={styles.addressLocality}>
                    Manish Nagar, Nagpur — 440015
                  </p>
                </div>
                <div className={styles.phones}>
                  <a href={callHref} aria-label={"Call " + clinic.phoneDisplay}>
                    {clinic.phoneDisplay}
                  </a>
                </div>
                <a
                  className={styles.directions}
                  href={mapsHref}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Get directions
                  <Icon name="arrow" />
                </a>
              </address>
            </div>
            <div className={styles.hours}>
              <h2>Hours</h2>
              {clinic.hours.length ? (
                <div className={styles.confirmedHours}>
                  {clinic.hours.map((hours) => (
                    <p key={hours}>{hours}</p>
                  ))}
                </div>
              ) : (
                <dl className={styles.scheduleList}>
                  {clinic.referenceOpeningHours.map((schedule) => (
                    <div key={schedule.days} className={styles.scheduleRow}>
                      <dt>{schedule.days}</dt>
                      <dd>
                        {schedule.sessions.map((time) => (
                          <span key={time}>{time}</span>
                        ))}
                      </dd>
                    </div>
                  ))}
                </dl>
              )}
              {!factsApproved ? (
                <p className={styles.note}>
                  Call ahead to confirm before visiting.
                </p>
              ) : null}
            </div>
          </div>
        </div>
        <div className={styles.bottom}>
          <div className="container">
            <div className={styles.meta}>
              <div className={styles.metaLeft}>
                <p className={styles.copyright}>
                  © {new Date().getFullYear()} {clinic.name}. All rights
                  reserved.
                </p>
                <span className={styles.separator} aria-hidden="true">
                  •
                </span>
                <p className={styles.credit}>
                  Designed &amp; Developed by{" "}
                  <a href="https://www.bizleap.in/">BizLeap</a>
                </p>
              </div>
              <Link className={styles.privacy} href="/privacy">
                Privacy Policy
              </Link>
            </div>
            <p className={styles.legal}>
              Information on this site is for general awareness and does not
              replace a professional medical assessment.
            </p>
          </div>
        </div>
      </footer>
      <nav className="mobile-dock" aria-label="Quick appointment actions">
        <a className="button button-outline" href={callHref}>
          <Icon name="phone" />
          Call
        </a>
        <Link className="button button-primary" href="/request-appointment">
          Request appointment
          <Icon name="arrow" />
        </Link>
      </nav>
    </>
  );
}
