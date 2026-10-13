import Link from "next/link";
import { Icon } from "./icon";
import { PhotoFeature } from "./photo-feature";
export function PageHero({
  eyebrow,
  title,
  description,
  image,
  alt,
  booking = true,
  breadcrumb = "",
}: {
  eyebrow: string;
  title: string;
  description: string;
  image?: string;
  alt?: string;
  booking?: boolean;
  breadcrumb?: string;
}) {
  return (
    <section className="page-hero">
      <div className={"container " + (image ? "page-hero-grid" : "")}>
        <div>
          <nav className="breadcrumb" aria-label="Breadcrumb">
            <Link href="/">Home</Link>
            <span aria-hidden="true">/</span>
            {breadcrumb ? (
              <>
                <Link href="/services">Services</Link>
                <span aria-hidden="true">/</span>
              </>
            ) : null}
            <span>{breadcrumb || eyebrow}</span>
          </nav>
          <p className="eyebrow">{eyebrow}</p>
          <h1>{title}</h1>
          <p className="lead">{description}</p>
          {booking ? (
            <Link href="/request-appointment" className="button button-primary">
              Request an appointment
              <Icon name="arrow" />
            </Link>
          ) : null}
        </div>
        {image ? (
          <PhotoFeature
            src={image}
            alt={alt || "Illustrative movement reference"}
            className="page-hero-photo"
            priority
          />
        ) : null}
      </div>
    </section>
  );
}
