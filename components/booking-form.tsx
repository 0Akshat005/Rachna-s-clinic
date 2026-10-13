"use client";
import Link from "next/link";
import { useRef, useState } from "react";
import { appointmentSchema, indiaToday, interests } from "@/lib/validation";
import { Icon } from "./icon";
type Errors = Record<string, string>;
export function BookingForm({ mode }: { mode: "preview" | "live" }) {
  const form = useRef<HTMLFormElement>(null);
  const status = useRef<HTMLDivElement>(null);
  const key = useRef<string>("");
  const [errors, setErrors] = useState<Errors>({});
  const [busy, setBusy] = useState(false);
  const [message, setMessage] = useState("");
  const [success, setSuccess] = useState(false);
  async function submit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (busy) return;
    setMessage("");
    setSuccess(false);
    const data = new FormData(event.currentTarget);
    const parsed = appointmentSchema.safeParse({
      name: data.get("name"),
      phone: data.get("phone"),
      interest: data.get("interest") || "",
      preferredDay: data.get("preferredDay") || "",
      consent: data.get("consent") === "on",
      website: data.get("website") || "",
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
    setBusy(true);
    key.current ||= crypto.randomUUID();
    try {
      const response = await fetch("/api/appointment-requests", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Idempotency-Key": key.current,
        },
        body: JSON.stringify(parsed.data),
        signal: AbortSignal.timeout(20000),
      });
      const result = await response.json();
      if (!response.ok) {
        if (result.errors) setErrors(result.errors);
        throw new Error(
          result.message ||
            "We could not send your request. Please try again or call the clinic.",
        );
      }
      setSuccess(true);
      setMessage(
        result.message +
          (result.preview ? "" : " Your reference: " + result.ticket + "."),
      );
      form.current?.reset();
      key.current = "";
    } catch (error) {
      setSuccess(false);
      setMessage(
        error instanceof Error && error.name !== "TimeoutError"
          ? error.message
          : "Your request could not be completed. Please try again using the same details, or call the clinic.",
      );
    } finally {
      setBusy(false);
      setTimeout(() => status.current?.focus(), 0);
    }
  }
  return (
    <form
      ref={form}
      className="booking-form"
      onSubmit={submit}
      onChange={() => {
        key.current = "";
      }}
      noValidate
      aria-busy={busy}
    >
      <h2>A few details to begin.</h2>
      <p className="booking-form-intro">
        Only your contact details are needed here. Please keep medical reports
        and detailed concerns for your consultation.
      </p>
      {mode === "preview" ? (
        <div className="form-note">
          Preview mode: this form validates your details, but no request is
          delivered or stored. Use sample details to try it.
        </div>
      ) : null}
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
            disabled={busy}
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
            disabled={busy}
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
            disabled={busy}
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
            disabled={busy}
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
      <div className="honeypot" aria-hidden="true">
        <label htmlFor="booking-website">Leave this field empty</label>
        <input
          id="booking-website"
          name="website"
          tabIndex={-1}
          autoComplete="off"
        />
      </div>
      <label className="consent-field">
        <input
          name="consent"
          type="checkbox"
          required
          disabled={busy}
          aria-invalid={!!errors.consent}
          aria-describedby={errors.consent ? "consent-error" : undefined}
        />
        <span>
          {mode === "preview"
            ? "I understand this is a preview and no request will be sent. I have read the "
            : "I agree that the clinic may use these details to contact me about this appointment request, as described in the "}
          <Link href="/privacy">privacy notice</Link>.
        </span>
      </label>
      {errors.consent ? (
        <p className="field-error" id="consent-error">
          {errors.consent}
        </p>
      ) : null}
      <button className="button button-primary" type="submit" disabled={busy}>
        {busy
          ? "Submitting…"
          : mode === "preview"
            ? "Preview appointment request"
            : "Send appointment request"}
        <Icon name="arrow" />
      </button>
      <p className="field-hint mt-4 mb-0">
        An appointment is confirmed only after the clinic contacts you.
      </p>
      {message ? (
        <div
          ref={status}
          className={"form-status " + (!success ? "form-status-error" : "")}
          role={success ? "status" : "alert"}
          tabIndex={-1}
        >
          <h3>
            {success
              ? mode === "preview"
                ? "Preview complete."
                : "Request received."
              : "Please try again."}
          </h3>
          <p>{message}</p>
        </div>
      ) : null}
    </form>
  );
}
