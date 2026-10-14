"use client";
import { useEffect } from "react";
import { usePathname } from "next/navigation";

/** Progressive enhancement: content is always visible, even without JavaScript. */
export function SiteMotion() {
  const pathname = usePathname();
  useEffect(() => {
    const preference = window.matchMedia("(prefers-reduced-motion: reduce)");
    const targets =
      document.querySelectorAll<HTMLElement>("main [data-reveal]");
    const played = new WeakSet<Element>();
    const animations = new Map<Element, Animation>();
    let observer: IntersectionObserver | undefined;
    const cancel = () => {
      animations.forEach((animation) => animation.cancel());
      animations.clear();
    };
    const observe = () => {
      observer?.disconnect();
      if (preference.matches || !("IntersectionObserver" in window)) return;
      observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (!entry.isIntersecting || played.has(entry.target)) return;
            played.add(entry.target);
            observer?.unobserve(entry.target);
            const target = entry.target as HTMLElement;
            target.dataset.revealed = "true";
            if (preference.matches || target.contains(document.activeElement))
              return;
            const animation = target.animate(
              [
                { transform: "translate3d(0, 18px, 0)" },
                { transform: "translate3d(0, 0, 0)" },
              ],
              {
                duration: 620,
                delay: Math.min(Number(target.dataset.revealDelay) || 0, 210),
                easing: "cubic-bezier(0.22, 1, 0.36, 1)",
              },
            );
            animations.set(target, animation);
            animation.finished.then(
              () => animations.delete(target),
              () => animations.delete(target),
            );
          });
        },
        { rootMargin: "0px 0px -6% 0px", threshold: 0.08 },
      );
      targets.forEach((target) => {
        if (!played.has(target)) observer?.observe(target);
      });
    };
    const onPreferenceChange = () => {
      cancel();
      observe();
    };
    const onFocus = (event: FocusEvent) => {
      if (!(event.target instanceof Element)) return;
      animations.forEach((animation, target) => {
        if (target.contains(event.target as Element)) animation.cancel();
      });
    };
    observe();
    preference.addEventListener("change", onPreferenceChange);
    document.addEventListener("focusin", onFocus);
    return () => {
      observer?.disconnect();
      cancel();
      preference.removeEventListener("change", onPreferenceChange);
      document.removeEventListener("focusin", onFocus);
    };
  }, [pathname]);
  return null;
}
