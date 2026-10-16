import Image from "next/image";
import Link from "next/link";
import type { BasicService } from "@/lib/basic-services";
import { Icon } from "./icon";
import styles from "./basic-service-directory.module.css";

export function BasicServiceCard({ service }: { service: BasicService }) {
  const titleId = service.slug + "-title";
  const summaryId = service.slug + "-summary";

  return (
    <article
      id={service.slug}
      className={styles.card}
      aria-labelledby={titleId}
    >
      <div className={styles.imageFrame}>
        <Image
          src={service.image}
          alt={service.alt}
          fill
          sizes="(max-width: 680px) 92vw, (max-width: 1100px) 46vw, 30vw"
          className={styles.photo}
        />
        <div className={styles.imageOverlay}>
          <span className={styles.typeTag}>{service.type}</span>
          <span className={styles.number} aria-hidden="true">
            {service.number}
          </span>
        </div>
      </div>
      <div className={styles.content}>
        <div className={styles.metaRow}>
          <span className={styles.category}>{service.category}</span>
        </div>
        <h3 id={titleId} className={styles.title}>
          <Link
            href={"/basic-services/" + service.slug}
            className={styles.titleLink}
          >
            {service.name}
          </Link>
        </h3>
        <p id={summaryId} className={styles.summary}>
          {service.summary}
        </p>
        <div className={styles.footer}>
          <Link
            href={"/basic-services/" + service.slug}
            className={styles.actionLink}
          >
            <span>Explore service details</span>
            <Icon name="arrow" />
          </Link>
        </div>
      </div>
    </article>
  );
}
