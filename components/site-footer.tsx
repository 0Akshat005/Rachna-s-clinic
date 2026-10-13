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
              <p>Helping Nagpur move better.</p>
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
                {services.map((service) => (
                  <Link key={service.slug} href={"/services/" + service.slug}>
                    {service.name}
                  </Link>
                ))}
              </div>
            </nav>
            <div className={styles.contact}>
              <h2>Contact</h2>
              <address>
                <p>{clinic.address}</p>
                <div className={styles.phones}>
                  <a href={callHref}>{clinic.phoneDisplay}</a>
                  <a href={"tel:" + clinic.secondaryPhone}>
                    {clinic.secondaryPhoneDisplay}
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
                <dl>
                  {clinic.referenceOpeningHours.map((schedule) => (
                    <div key={schedule.days}>
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
                  Reference hours. Please call to confirm before visiting.
                </p>
              ) : null}
            </div>
          </div>
        </div>
        <div className={styles.bottom}>
          <div className="container">
            <div className={styles.meta}>
              <p className={styles.copyright}>
                © {new Date().getFullYear()} {clinic.name}. All rights reserved.
              </p>
              <span className={styles.separator} aria-hidden="true">
                •
              </span>
              <p className={styles.credit}>
                Designed &amp; Developed by{" "}
                <a href="https://www.bizleap.in/">BizLeap</a>
              </p>
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
