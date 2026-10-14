"use client";
import { useState } from "react";
import {
  services,
  serviceCategories,
  serviceCategoryLabel,
} from "@/lib/services";
import { ServiceVisualCard } from "./service-visual-card";
import styles from "./service-directory.module.css";

export function ServiceDirectory() {
  const [filter, setFilter] = useState<string>("All");
  const visible = services.filter(
    (service) => filter === "All" || service.category === filter,
  );
  return (
    <>
      <div
        className={"chips service-filters " + styles.filters}
        role="group"
        aria-label="Filter services"
      >
        {serviceCategories.map((category) => (
          <button
            type="button"
            key={category}
            className={"chip " + (category === filter ? "selected" : "")}
            aria-pressed={filter === category}
            aria-controls="service-directory-results"
            onClick={() => setFilter(category)}
          >
            {serviceCategoryLabel(category)}
          </button>
        ))}
      </div>
      <p
        className={"directory-count " + styles.count}
        role="status"
        aria-atomic="true"
      >
        {visible.length} {visible.length === 1 ? "service" : "services"} to
        explore
      </p>
      <div
        id="service-directory-results"
        className={"directory-grid " + styles.grid}
      >
        {visible.map((service, index) => (
          <ServiceVisualCard
            key={service.slug}
            service={service}
            wide={visible.length % 2 === 1 && index === visible.length - 1}
          />
        ))}
      </div>
    </>
  );
}
