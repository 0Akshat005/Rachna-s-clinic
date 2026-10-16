"use client";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { Icon } from "./icon";

export type ServicePreview = {
  slug: string;
  number: string;
  name: string;
  category: string;
  summary: string;
  src: string;
  alt: string;
  caption: string;
  objectPosition: string;
  href?: string;
};

export type ServiceShowcaseProps = {
  items: ServicePreview[];
  eyebrow?: string;
  badge?: string;
  title?: React.ReactNode;
  description?: string;
  ctaText?: string;
  ctaHref?: string;
  previewId?: string;
  linkPrefix?: string;
  variant?: "advanced" | "basic";
};

export function ServiceShowcase({
  items,
  eyebrow = "Our services",
  badge,
  title = (
    <>
      Specialised care.
      <br />
      Personal attention.
    </>
  ),
  description,
  ctaText = "Explore All Services",
  ctaHref = "/services",
  previewId = "service-preview",
  linkPrefix = "/services/",
  variant = "advanced",
}: ServiceShowcaseProps) {
  const [index, setIndex] = useState(0);
  const [displayedIndex, setDisplayedIndex] = useState(0);
  const requestedIndex = useRef(0);
  const hoverTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const fade = useRef<Animation | null>(null);
  const [announcement, setAnnouncement] = useState("");
  const selected = items[index];
  const displayed = items[displayedIndex];

  useEffect(() => {
    const preference = window.matchMedia("(prefers-reduced-motion: reduce)");
    const onChange = () => {
      if (!preference.matches) return;
      fade.current?.cancel();
      setDisplayedIndex(requestedIndex.current);
    };
    preference.addEventListener("change", onChange);
    return () => {
      if (hoverTimer.current) clearTimeout(hoverTimer.current);
      fade.current?.cancel();
      preference.removeEventListener("change", onChange);
    };
  }, []);

  function select(next: number, announce = false) {
    if (hoverTimer.current) clearTimeout(hoverTimer.current);
    if (next === requestedIndex.current) return;
    fade.current?.cancel();
    requestedIndex.current = next;
    setIndex(next);
    if (announce)
      setAnnouncement(
        items[next].name + ", " + (next + 1) + " of " + items.length,
      );
  }

  function previewOnHover(next: number) {
    if (!window.matchMedia("(hover: hover) and (pointer: fine)").matches)
      return;
    if (hoverTimer.current) clearTimeout(hoverTimer.current);
    hoverTimer.current = setTimeout(() => select(next), 90);
  }

  function revealImage(image: HTMLImageElement, next: number) {
    if (requestedIndex.current !== next) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setDisplayedIndex(next);
      return;
    }
    const animation = image.animate([{ opacity: 0 }, { opacity: 1 }], {
      duration: 380,
      easing: "ease-out",
      fill: "forwards",
    });
    fade.current = animation;
    animation.finished.then(
      () => {
        if (requestedIndex.current === next) setDisplayedIndex(next);
      },
      () => {},
    );
  }

  const getHref = (service: ServicePreview) =>
    service.href || linkPrefix + service.slug;

  return (
    <div
      className={`container editorial-services-grid service-showcase ${
        variant === "basic" ? "service-showcase-basic" : ""
      }`}
    >
      <div data-reveal>
        {badge ? <span className="basic-services-badge">{badge}</span> : null}
        <p className="eyebrow">{eyebrow}</p>
        <h2>{title}</h2>
        {description ? (
          <p className="service-showcase-description">{description}</p>
        ) : null}
        <ol className="service-index">
          {items.map((service, i) => (
            <li key={service.slug}>
              <Link
                href={getHref(service)}
                data-preview-active={i === index}
                onPointerEnter={() => previewOnHover(i)}
                onPointerLeave={() => {
                  if (hoverTimer.current) clearTimeout(hoverTimer.current);
                }}
                onFocus={() => select(i)}
                onPointerDown={(e) => {
                  if (
                    typeof window !== "undefined" &&
                    window.matchMedia("(hover: none) or (pointer: coarse)")
                      .matches
                  ) {
                    if (i !== index) {
                      e.preventDefault();
                      select(i, true);
                    }
                  }
                }}
              >
                <span className="index-number">{service.number}</span>
                <span>{service.name}</span>
                <Icon name="arrow" />
              </Link>
            </li>
          ))}
        </ol>
        <Link href={ctaHref} className="text-link editorial-link">
          {ctaText}
          <Icon name="arrow" />
        </Link>
      </div>
      <div
        className="service-preview"
        id={previewId}
        data-reveal
        data-reveal-delay="90"
      >
        <figure className="photo-feature service-preview-photo">
          <div className="photo-inner">
            <Image
              key={displayed.slug}
              src={displayed.src}
              alt={displayed.alt}
              fill
              sizes="(max-width: 767px) 90vw, 43vw"
              style={{
                objectFit: "cover",
                objectPosition: displayed.objectPosition,
              }}
            />
            {index !== displayedIndex ? (
              <Image
                key={"incoming-" + selected.slug}
                src={selected.src}
                alt=""
                aria-hidden="true"
                fill
                sizes="(max-width: 767px) 90vw, 43vw"
                className="service-preview-incoming"
                style={{
                  objectFit: "cover",
                  objectPosition: selected.objectPosition,
                }}
                onLoad={(event) => revealImage(event.currentTarget, index)}
              />
            ) : null}
          </div>
          {displayed.caption ? (
            <figcaption>{displayed.caption}</figcaption>
          ) : null}
        </figure>
        <div className="service-preview-detail">
          <div className="service-preview-toolbar">
            <p className="eyebrow">{selected.category}</p>
            <div
              className="service-preview-controls"
              role="group"
              aria-label={`Browse ${variant === "basic" ? "basic " : ""}service previews`}
            >
              <span className="service-preview-count" aria-hidden="true">
                {selected.number}
                <span> / {String(items.length).padStart(2, "0")}</span>
              </span>
              <button
                type="button"
                aria-label={`Preview previous ${variant === "basic" ? "basic " : ""}service`}
                aria-controls={previewId}
                onClick={() =>
                  select((index + items.length - 1) % items.length, true)
                }
              >
                <span className="previous-arrow">
                  <Icon name="arrow" />
                </span>
              </button>
              <button
                type="button"
                aria-label={`Preview next ${variant === "basic" ? "basic " : ""}service`}
                aria-controls={previewId}
                onClick={() => select((index + 1) % items.length, true)}
              >
                <Icon name="arrow" />
              </button>
            </div>
          </div>
          <div className="service-preview-copy" key={selected.slug}>
            <h3>{selected.name}</h3>
            <p className="service-preview-summary">{selected.summary}</p>
          </div>
          <div className="service-preview-bottom">
            <Link href={getHref(selected)} className="text-link">
              Explore this care
              <Icon name="arrow" />
            </Link>
          </div>
        </div>
        <p className="sr-only" role="status">
          {announcement}
        </p>
      </div>
    </div>
  );
}
