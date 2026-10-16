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
  parentHref = "/services",
  parentLabel = "Services",
}: {
  eyebrow: string;
  title: string;
  description: string;
  image?: string;
  alt?: string;
  booking?: boolean;
  breadcrumb?: string;
  parentHref?: string;
  parentLabel?: string;
}) {
  return (
    <section className="page-hero">
      <div className={"container " + (image ? "page-hero-grid" : "")}>
        <div>
          <nav className="breadcrumb" aria-label="Breadcrumb">
            <Link href="/" prefetch={false}>
              Home
            </Link>
            <span aria-hidden="true">/</span>
            {breadcrumb ? (
              <>
                <Link href={parentHref}>{parentLabel}</Link>
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
