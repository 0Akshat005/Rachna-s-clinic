"use client";
import { useState } from "react";
import {
  basicServices,
  basicServiceCategories,
} from "@/lib/basic-services";
import { BasicServiceCard } from "./basic-service-card";
import styles from "./basic-service-directory.module.css";

export function BasicServiceDirectory() {
  const [filter, setFilter] = useState<string>("All");
  const visible = basicServices.filter(
    (service) => filter === "All" || service.category === filter,
  );

  return (
    <div className={styles.directory}>
      <div
        className={"chips " + styles.filters}
        role="group"
        aria-label="Filter basic services"
      >
        {basicServiceCategories.map((category) => (
          <button
            type="button"
            key={category}
            className={"chip " + (category === filter ? "selected" : "")}
            aria-pressed={filter === category}
            aria-controls="basic-service-directory-results"
            onClick={() => setFilter(category)}
          >
            {category}
          </button>
        ))}
      </div>
      <p
        className={"directory-count " + styles.count}
        role="status"
        aria-atomic="true"
      >
        {visible.length} {visible.length === 1 ? "service" : "services"} in this
        catalogue
      </p>
      <div id="basic-service-directory-results" className={styles.grid}>
        {visible.map((service) => (
          <BasicServiceCard key={service.slug} service={service} />
        ))}
      </div>
    </div>
  );
}
