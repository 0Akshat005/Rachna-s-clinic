import Image from "next/image";
import media from "@/content/media.json";
export function ClinicGallery({
  onlyApproved = false,
}: {
  onlyApproved?: boolean;
}) {
  const approved = media.gallery.filter((photo) => photo.approved && photo.src);
  if (!approved.length) {
    if (onlyApproved) return null;
    return (
      <section className="gallery-pending">
        <div className="container">
          <p className="eyebrow">Inside Rachana</p>
          <p>
            Original clinic photography will be added after approval. Contact
            the clinic to learn more about your first visit.
          </p>
        </div>
      </section>
    );
  }
  return (
    <section className="section gallery-section">
      <div className="container">
        <p className="eyebrow">Inside Rachana</p>
        <h2>
          Get to know our clinic
          <br />
          before your first visit.
        </h2>
        <div className="clinic-gallery">
          {approved.map((photo) => (
            <figure key={photo.src} className="photo-feature">
              <div className="photo-inner">
                <Image
                  src={photo.src}
                  alt={photo.alt}
                  fill
                  sizes="(max-width: 767px) 100vw, 55vw"
                  style={{ objectFit: "cover" }}
                />
              </div>
              <figcaption>{photo.caption}</figcaption>
            </figure>
          ))}
        </div>
      </div>
    </section>
  );
}
