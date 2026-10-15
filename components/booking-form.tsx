"use client";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import clinic from "@/content/clinic.json";
import { appointmentSchema, indiaToday, interests } from "@/lib/validation";
import { appointmentWhatsAppMessage, whatsappChatUrl } from "@/lib/whatsapp";
import { Icon } from "./icon";

type Errors = Record<string, string>;

export function BookingForm() {
  const form = useRef<HTMLFormElement>(null);
  const status = useRef<HTMLDivElement>(null);
  const [errors, setErrors] = useState<Errors>({});
  const [preparedHref, setPreparedHref] = useState<string | null>(null);

  useEffect(() => {
    if (preparedHref) status.current?.focus({ preventScroll: true });
  }, [preparedHref]);

  function submit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setPreparedHref(null);
    const data = new FormData(event.currentTarget);
    const parsed = appointmentSchema.safeParse({
      name: data.get("name"),
      phone: data.get("phone"),
      interest: data.get("interest") || "",
      preferredDay: data.get("preferredDay") || "",
      consent: data.get("consent") === "on",
      website: "",
    });
    if (!parsed.success) {
      const issues: Errors = {};
      for (const issue of parsed.error.issues) {
        const name = String(issue.path[0]);
        issues[name] ??= issue.message;
      }
      setErrors(issues);
      const first = Object.keys(issues)[0];
      (form.current?.elements.namedItem(first) as HTMLElement | null)?.focus();
      return;
    }
    setErrors({});
    const href = whatsappChatUrl(appointmentWhatsAppMessage(parsed.data));
    setPreparedHref(href);
    try {
      window.open(href, "_blank", "noopener,noreferrer");
    } catch {
      // Keep the real link and entered details available when an app handoff is unavailable.
    }
  }

  return (
    <form
      ref={form}
      className="booking-form"
      onSubmit={submit}
      onChange={() => setPreparedHref(null)}
      noValidate
      aria-labelledby="booking-form-heading"
    >
      <h2 id="booking-form-heading">A few details to begin.</h2>
      <p className="booking-form-intro">
        Share your contact details and preferences. Please keep medical reports
        and detailed concerns for your consultation.
      </p>
      <div className="form-note" id="whatsapp-handoff-note">
        Your message opens in WhatsApp for{" "}
        <strong>{clinic.phoneDisplay}</strong>. Review it and tap{" "}
        <strong>Send</strong> to share it with the clinic.
      </div>
      <div className="form-fields">
        <div className="field field-full">
          <label htmlFor="booking-name">Full name</label>
          <input
            id="booking-name"
            name="name"
            required
            autoComplete="name"
            maxLength={80}
            aria-invalid={!!errors.name}
            aria-describedby={errors.name ? "name-error" : undefined}
          />
          {errors.name ? (
            <span className="field-error" id="name-error">
              {errors.name}
            </span>
          ) : null}
        </div>
        <div className="field field-full">
          <label htmlFor="booking-phone">Phone number</label>
          <input
            id="booking-phone"
            name="phone"
            type="tel"
            inputMode="tel"
            required
            autoComplete="tel"
            maxLength={24}
            placeholder="10-digit mobile number"
            aria-invalid={!!errors.phone}
            aria-describedby={errors.phone ? "phone-error" : "phone-hint"}
          />
          <span className="field-hint" id="phone-hint">
            For international numbers, include the country code.
          </span>
          {errors.phone ? (
            <span className="field-error" id="phone-error">
              {errors.phone}
            </span>
          ) : null}
        </div>
        <div className="field">
          <label htmlFor="booking-interest">
            General area <span className="font-normal">(optional)</span>
          </label>
          <select
            id="booking-interest"
            name="interest"
            defaultValue=""
            aria-invalid={!!errors.interest}
            aria-describedby={errors.interest ? "interest-error" : undefined}
          >
            <option value="">I’m not sure yet</option>
            {interests.filter(Boolean).map((interest) => (
              <option key={interest}>{interest}</option>
            ))}
          </select>
          {errors.interest ? (
            <span className="field-error" id="interest-error">
              {errors.interest}
            </span>
          ) : null}
        </div>
        <div className="field">
          <label htmlFor="booking-day">
            Preferred day <span className="font-normal">(optional)</span>
          </label>
          <input
            id="booking-day"
            name="preferredDay"
            type="date"
            min={indiaToday()}
            aria-invalid={!!errors.preferredDay}
            aria-describedby={errors.preferredDay ? "day-error" : "day-hint"}
          />
          <span className="field-hint" id="day-hint">
            A preference, not a reserved appointment.
          </span>
          {errors.preferredDay ? (
            <span className="field-error" id="day-error">
              {errors.preferredDay}
            </span>
          ) : null}
        </div>
      </div>
      <label className="consent-field">
        <input
          name="consent"
          type="checkbox"
          required
          aria-invalid={!!errors.consent}
          aria-describedby={errors.consent ? "consent-error" : undefined}
        />
        <span>
          I agree to share these details with WhatsApp and the clinic for this
          appointment enquiry, as described in the{" "}
          <Link href="/privacy">privacy notice</Link>.
        </span>
      </label>
      {errors.consent ? (
        <p className="field-error" id="consent-error">
          {errors.consent}
        </p>
      ) : null}
      <button
        className="button button-primary"
        type="submit"
        aria-describedby="whatsapp-handoff-note"
      >
        Continue to WhatsApp
        <Icon name="whatsapp" />
      </button>
      <p className="field-hint mt-4 mb-0">
        The clinic confirms availability after receiving your WhatsApp message.
      </p>
      {preparedHref ? (
        <div ref={status} className="form-status" role="status" tabIndex={-1}>
          <h3>Your message is ready.</h3>
          <p>
            Tap Send in WhatsApp to share it with {clinic.name}. Opening
            WhatsApp does not send the message or confirm an appointment.
          </p>
          <a
            className="text-link"
            href={preparedHref}
            target="_blank"
            rel="noopener noreferrer"
          >
            Open WhatsApp again <Icon name="arrow" />
          </a>
        </div>
      ) : null}
      <noscript>
        <p className="form-note">
          Enable JavaScript to prepare your message, or call{" "}
          <a href={"tel:" + clinic.phone}>{clinic.phoneDisplay}</a>.
        </p>
      </noscript>
    </form>
  );
}
