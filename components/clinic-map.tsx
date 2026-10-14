import { clinic } from "@/lib/clinic-profile";

export function ClinicMap() {
  return (
    <div className="map-shell">
      <iframe
        src={clinic.mapEmbedUrl}
        title="Google Maps: Rachana Physiotherapy Clinic, Manish Nagar, Nagpur"
        width="100%"
        height="340"
        loading="lazy"
        referrerPolicy="strict-origin-when-cross-origin"
        allowFullScreen
      />
    </div>
  );
}
