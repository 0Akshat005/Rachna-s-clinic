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
};

export function ServiceShowcase({ items }: { items: ServicePreview[] }) {
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

  return (
    <div className="container editorial-services-grid service-showcase">
      <div data-reveal>
        <p className="eyebrow">Our services</p>
        <h2>
          Specialised care.
          <br />
          Personal attention.
        </h2>
        <ol className="service-index">
          {items.map((service, i) => (
            <li key={service.slug}>
              <Link
                href={"/services/" + service.slug}
                data-preview-active={i === index}
                onPointerEnter={() => previewOnHover(i)}
                onPointerLeave={() => {
                  if (hoverTimer.current) clearTimeout(hoverTimer.current);
                }}
                onFocus={() => select(i)}
              >
                <span className="index-number">{service.number}</span>
                <span>{service.name}</span>
                <Icon name="arrow" />
              </Link>
            </li>
          ))}
        </ol>
        <Link href="/services" className="text-link editorial-link">
          Explore All Services
          <Icon name="arrow" />
        </Link>
      </div>
      <div
        className="service-preview"
        id="service-preview"
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
              aria-label="Browse service previews"
            >
              <span className="service-preview-count" aria-hidden="true">
                {selected.number}
                <span> / {String(items.length).padStart(2, "0")}</span>
              </span>
              <button
                type="button"
                aria-label="Preview previous service"
                aria-controls="service-preview"
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
                aria-label="Preview next service"
                aria-controls="service-preview"
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
            <Link href={"/services/" + selected.slug} className="text-link">
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
