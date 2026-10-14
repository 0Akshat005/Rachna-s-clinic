"use client";
import Link from "next/link";
import Image from "next/image";
import media from "@/content/media.json";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { Icon } from "./icon";
import { callHref, clinic } from "@/lib/clinic-profile";
const links = [
  ["Home", "/"],
  ["Services", "/services"],
  ["About", "/about"],
  ["Contact", "/contact"],
];
export function Brand({ dark = false }: { dark?: boolean }) {
  return (
    <Link
      href="/"
      prefetch={false}
      className={"brand" + (dark ? " brand-dark" : "")}
    >
      <Image src={media.brand.src} alt="" width={48} height={51} />
      <span>
        <strong>
          Rachana<span>Physiotherapy Clinic</span>
        </strong>
        <small>MANISH NAGAR · NAGPUR</small>
      </span>
    </Link>
  );
}
export function SiteHeader() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const trigger = useRef<HTMLButtonElement>(null);
  const header = useRef<HTMLElement>(null);
  const sentinel = useRef<HTMLSpanElement>(null);
  useEffect(() => {
    if (!sentinel.current || !("IntersectionObserver" in window)) return;
    const observer = new IntersectionObserver(([entry]) => {
      if (header.current)
        header.current.dataset.scrolled = String(!entry.isIntersecting);
    });
    observer.observe(sentinel.current);
    return () => observer.disconnect();
  }, []);
  useEffect(() => {
    if (!open) return;
    const close = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setOpen(false);
        trigger.current?.focus();
      }
    };
    document.addEventListener("keydown", close);
    return () => document.removeEventListener("keydown", close);
  }, [open]);
  return (
    <>
      <div className="topbar">
        <div className="container topbar-inner">
          <Link href="/contact">
            <Icon name="clock" />
            Clinic timings & visit information
          </Link>
          <a href={callHref}>
            {clinic.phoneDisplay}
            <Icon name="arrow" />
          </a>
        </div>
      </div>
      <span ref={sentinel} className="header-sentinel" aria-hidden="true" />
      <header ref={header} className="site-header">
        <div className="container header-inner">
          <Brand />
          <nav
            aria-label="Primary navigation"
            id="primary-navigation"
            className={"navigation " + (open ? "navigation-open" : "")}
          >
            {links.map(([name, href]) => (
              <Link
                key={href}
                href={href}
                prefetch={href === "/" ? false : undefined}
                aria-current={
                  pathname === href ||
                  (href !== "/" && pathname.startsWith(href))
                    ? "page"
                    : undefined
                }
                onClick={() => setOpen(false)}
              >
                {name}
              </Link>
            ))}
          </nav>
          <div className="header-actions">
            <a href={callHref} className="button button-outline">
              <Icon name="phone" />
              Call
            </a>
            <Link href="/request-appointment" className="button button-primary">
              Request appointment
              <Icon name="arrow" />
            </Link>
          </div>
          <button
            ref={trigger}
            className="menu-toggle"
            type="button"
            aria-label={open ? "Close navigation" : "Open navigation"}
            aria-expanded={open}
            aria-controls="primary-navigation"
            onClick={() => setOpen(!open)}
          >
            <Icon name={open ? "close" : "menu"} />
          </button>
        </div>
      </header>
    </>
  );
}
