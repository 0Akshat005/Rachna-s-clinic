"use client";
import { useState } from "react";
import { clinic, mapsHref } from "@/lib/clinic-profile";
import { Icon } from "./icon";
export function ClinicMap() {
  const [loaded, setLoaded] = useState(false);
  const valid = clinic.mapEmbedUrl.startsWith(
    "https://www.google.com/maps/embed",
  );
  return (
    <div className="map-shell">
      {loaded && valid ? (
        <iframe
          src={clinic.mapEmbedUrl}
          title="Rachana clinic location on Google Maps"
          loading="lazy"
          referrerPolicy="no-referrer"
          allowFullScreen
        />
      ) : (
        <div className="map-placeholder">
          <Icon name="pin" />
          <h3>Manish Nagar, Nagpur</h3>
          <p>
            {valid
              ? "Load the map to share a connection with Google. Google’s privacy policy applies to the embedded map."
              : "Open Google Maps to search for the clinic and check your route. An exact map pin awaits clinic verification."}
          </p>
          {valid ? (
            <button
              type="button"
              className="button button-outline"
              onClick={() => setLoaded(true)}
            >
              Load Google map
              <Icon name="arrow" />
            </button>
          ) : (
            <a
              className="button button-outline"
              href={mapsHref}
              target="_blank"
              rel="noopener noreferrer"
            >
              Get directions
              <Icon name="arrow" />
            </a>
          )}
        </div>
      )}
    </div>
  );
}
