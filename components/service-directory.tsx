"use client";
import { useState } from "react";
import { services, serviceCategories } from "@/lib/services";
import { ServiceCard } from "./service-card";
export function ServiceDirectory() {
  const [filter, setFilter] = useState<string>("All");
  const visible = services.filter(
    (s) => filter === "All" || s.category === filter,
  );
  return (
    <>
      <div
        className="chips service-filters"
        role="group"
        aria-label="Filter services"
      >
        {serviceCategories.map((category) => (
          <button
            type="button"
            key={category}
            className={"chip " + (category === filter ? "selected" : "")}
            aria-pressed={filter === category}
            onClick={() => setFilter(category)}
          >
            {category}
          </button>
        ))}
      </div>
      <p className="directory-count" role="status">
        {visible.length} {visible.length === 1 ? "service" : "services"} to
        explore
      </p>
      <div className="directory-grid">
        {visible.map((service) => (
          <ServiceCard key={service.slug} service={service} />
        ))}
      </div>
    </>
  );
}
