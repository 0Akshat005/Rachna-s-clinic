import Image, { getImageProps } from "next/image";
import media from "@/content/media.json";

export function HeroMedia() {
  const hero = media.features["movement-reference.webp"];
  const common = { alt: hero.alt, fill: true, sizes: "100vw" };
  const desktop = getImageProps({ ...common, src: hero.src }).props;
  const tablet = getImageProps({ ...common, src: hero.tabletSrc }).props;
  const mobile = getImageProps({ ...common, src: hero.mobileSrc }).props;

  return (
    <figure className="photo-feature movement-hero-photo">
      <link
        rel="preload"
        as="image"
        href={mobile.src}
        imageSrcSet={mobile.srcSet}
        imageSizes="100vw"
        media="(max-width: 767px)"
      />
      <link
        rel="preload"
        as="image"
        href={tablet.src}
        imageSrcSet={tablet.srcSet}
        imageSizes="100vw"
        media="(min-width: 768px) and (max-width: 1100px)"
      />
      <link
        rel="preload"
        as="image"
        href={desktop.src}
        imageSrcSet={desktop.srcSet}
        imageSizes="100vw"
        media="(min-width: 1101px)"
      />
      <div className="photo-inner">
        <picture>
          <source
            media="(max-width: 767px)"
            srcSet={mobile.srcSet}
            sizes="100vw"
          />
          <source
            media="(max-width: 1100px)"
            srcSet={tablet.srcSet}
            sizes="100vw"
          />
          <Image
            src={hero.src}
            alt={hero.alt}
            fill
            sizes="100vw"
            loading="eager"
            fetchPriority="high"
            style={{ objectFit: "cover" }}
          />
        </picture>
      </div>
      {hero.caption ? <figcaption>{hero.caption}</figcaption> : null}
    </figure>
  );
}
