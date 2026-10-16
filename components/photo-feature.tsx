import Image from "next/image";
import media from "@/content/media.json";
export function PhotoFeature({
  src,
  alt,
  priority = false,
  className = "",
  sizes = "(max-width: 767px) 100vw, 45vw",
  caption,
}: {
  src: string;
  alt: string;
  priority?: boolean;
  className?: string;
  sizes?: string;
  caption?: string;
}) {
  const selected = media.features[src as keyof typeof media.features];
  const approved = selected?.approved;
  const imageSrc =
    selected?.src || (src.startsWith("/") ? src : "/illustrations/" + src);
  const aspectRatio =
    selected && "aspectRatio" in selected ? selected.aspectRatio : undefined;
  const objectPosition =
    selected && "objectPosition" in selected
      ? (selected.objectPosition as string)
      : undefined;
  const displayCaption = caption ?? (selected?.caption || "");
  return (
    <figure className={"photo-feature " + className}>
      <div
        className="photo-inner"
        style={aspectRatio ? { aspectRatio } : undefined}
      >
        <Image
          src={imageSrc}
          alt={approved ? selected.alt : alt}
          fill
          sizes={sizes}
          loading={priority ? "eager" : "lazy"}
          fetchPriority={priority ? "high" : undefined}
          style={{ objectFit: "cover", objectPosition }}
        />
      </div>
      {displayCaption ? <figcaption>{displayCaption}</figcaption> : null}
    </figure>
  );
}
