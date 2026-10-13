import Link from "next/link";
import { Icon } from "./icon";
import { PhotoFeature } from "./photo-feature";
import type { Service } from "@/lib/services";
export function ServiceCard({
  service,
  photo = false,
}: {
  service: Service;
  photo?: boolean;
}) {
  return (
    <article className={"service-card " + (photo ? "service-card-photo" : "")}>
      {photo ? <PhotoFeature src={service.image} alt={service.alt} /> : null}
      <div className="service-card-content">
        <span className="service-number">
          {service.number}
          <span> / {service.category}</span>
        </span>
        <h3>
          <Link href={"/services/" + service.slug}>{service.name}</Link>
        </h3>
        <p>{service.summary}</p>
        <Link
          href={"/services/" + service.slug}
          className="text-link"
          aria-label={"Explore this service: " + service.name}
        >
          Explore this service
          <Icon name="arrow" />
        </Link>
        {!photo ? (
          <Link href="/request-appointment" className="service-assessment">
            Request an assessment →
          </Link>
        ) : null}
      </div>
    </article>
  );
}
