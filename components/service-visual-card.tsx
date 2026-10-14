import Image from "next/image";
import Link from "next/link";
import media from "@/content/media.json";
import type { Service } from "@/lib/services";
import { serviceCategoryLabel } from "@/lib/services";
import { Icon } from "./icon";
import styles from "./service-directory.module.css";

type CardMedia = {
  src: string;
  alt: string;
  approved: boolean;
  cardPosition?: string;
  objectPosition?: string;
};

export function ServiceVisualCard({
  service,
  wide = false,
}: {
  service: Service;
  wide?: boolean;
}) {
  const imageKey = service.cardImage || service.image;
  const asset = (media.features as Record<string, CardMedia>)[imageKey];
  const titleId = service.slug + "-title";
  const summaryId = service.slug + "-summary";
  return (
    <article className={styles.card} aria-labelledby={titleId} data-wide={wide}>
      <Link
        href={"/services/" + service.slug}
        className={styles.cardLink}
        aria-labelledby={titleId}
        aria-describedby={summaryId}
        prefetch={false}
      >
        <div className={styles.imageFrame}>
          <Image
            src={asset.src}
            alt={asset.alt}
            fill
            className={styles.photo}
            sizes={
              wide
                ? "(max-width: 900px) 90vw, 54vw"
                : "(max-width: 900px) 90vw, 44vw"
            }
            style={{
              objectPosition:
                asset.cardPosition || asset.objectPosition || "center 30%",
            }}
          />
        </div>
        <div className={styles.cardTop}>
          <span className={styles.category}>
            {serviceCategoryLabel(service.category)}
          </span>
          <span className={styles.number} aria-hidden="true">
            {service.number}
          </span>
        </div>
        <div className={styles.cardContent}>
          <h3 id={titleId}>{service.name}</h3>
          <p id={summaryId} className={styles.summary}>
            {service.summary}
          </p>
          <span className={styles.action}>
            Explore this service
            <Icon name="arrow" />
          </span>
          {service.cardImageNote ? (
            <span className={styles.imageNote}>
              {service.cardImageNote}
            </span>
          ) : null}
        </div>
      </Link>
    </article>
  );
}
