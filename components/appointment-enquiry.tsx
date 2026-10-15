import { BookingForm } from "./booking-form";
import { callHref, clinic } from "@/lib/clinic-profile";

export function AppointmentEnquiry() {
  return (
    <section
      className="section"
      id="contact-enquiry"
      aria-labelledby="appointment-enquiry-heading"
    >
      <div className="container booking-layout">
        <div className="booking-info">
          <p className="eyebrow">An enquiry, then a conversation</p>
          <h2 id="appointment-enquiry-heading">
            Let’s plan your visit
            <br />
            on WhatsApp.
          </h2>
          <ol>
            {[
              [
                "Add your details",
                "Your name, callback number and, if you like, a general area of interest and preferred day.",
              ],
              [
                "Review and send in WhatsApp",
                "We prepare a clear message for the clinic. Tap Send in WhatsApp when you are ready.",
              ],
              [
                "Hear from the clinic",
                "The clinic will discuss availability with you. Your appointment is confirmed only after you agree the details.",
              ],
            ].map(([title, body]) => (
              <li key={title}>
                <div>
                  <strong>{title}</strong>
                  <p>{body}</p>
                </div>
              </li>
            ))}
          </ol>
          <p className="supporting text-sm">Prefer to speak with someone?</p>
          <a href={callHref} className="text-link">
            {clinic.phoneDisplay} →
          </a>
        </div>
        <BookingForm />
      </div>
    </section>
  );
}
