import Image from "next/image";
import media from "@/content/media.json";
export function PhotoFeature({
  src,
  alt,
  priority = false,
  className = "",
  sizes = "(max-width: 767px) 100vw, 45vw",
  caption = "Illustrative image from the supplied design reference",
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
  const imageSrc = selected?.src || "/illustrations/" + src;
  const aspectRatio =
    selected && "aspectRatio" in selected ? selected.aspectRatio : undefined;
  const objectPosition =
    selected && "objectPosition" in selected
      ? (selected.objectPosition as string)
      : undefined;
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
      <figcaption>
        {approved ? selected.caption : selected?.caption || caption}
      </figcaption>
    </figure>
  );
}
