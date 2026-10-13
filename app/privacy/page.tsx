import Link from "next/link";
import { PageHero } from "@/components/page-hero";
import { callHref, clinic } from "@/lib/clinic-profile";
import { pageMetadata } from "@/lib/seo";
export const metadata = pageMetadata(
  "Privacy Notice",
  "How the Rachana website handles appointment request details, external links and your privacy.",
  "/privacy",
);
export default function Privacy() {
  return (
    <>
      <PageHero
        eyebrow="Privacy notice"
        title="Your details deserve thoughtful care."
        description="This notice explains the website’s appointment-request workflow. The clinic must review and approve this notice before online requests are activated."
        booking={false}
      />
      <article className="container section legal-content">
        <p>Prepared for clinic review: 9 October 2026.</p>
        <h2>Who handles your information?</h2>
        <p>
          {clinic.name}, {clinic.address}. To discuss this notice or make a
          privacy request,{" "}
          <a href={callHref}>contact the clinic on {clinic.phoneDisplay}</a>.
          The clinic’s designated privacy contact and applicable retention
          periods must be confirmed before activation.
        </p>
        <h2>What the form asks for</h2>
        <p>
          The form asks for a name and telephone number. A general area of
          interest and preferred day are optional. It records your agreement to
          be contacted about the request. Do not submit detailed symptoms,
          medical records, diagnostic reports or payment information through
          this form.
        </p>
        <h2>Preview and live requests</h2>
        <p>
          In preview mode, the server validates the sample form and returns a
          preview response. It does not store or deliver the contact details. In
          live mode, the request is sent to the clinic’s configured email inbox
          through Resend, a transactional email processor. The request is
          pending until staff confirm an appointment. No patient account or
          public request database is created.
        </p>
        <h2>How information is used</h2>
        <p>
          Live request details are used to contact you, discuss availability and
          manage the appointment enquiry. They are not used by this website for
          advertising or marketing. Access to the clinic inbox must be
          restricted to authorised staff. The clinic must establish an approved
          retention and deletion schedule for that inbox and processor records
          before live use.
        </p>
        <h2>Security and spam prevention</h2>
        <p>
          The website uses server validation, origin checks, rate limiting and a
          hidden anti-spam field. A keyed hash of a platform-provided IP
          address, where available, is used for short-lived rate limiting in
          Redis; the raw IP address is not stored by this application.
          Rate-limit keys expire after 15 minutes. Hosting and email providers
          may maintain their own operational records. Application logs contain
          event names and opaque request references, rather than names, phone
          numbers or clinical details.
        </p>
        <h2>External services</h2>
        <p>
          Call, WhatsApp and Google Maps links open services with their own
          privacy terms. No map is loaded automatically. Where an approved
          embedded map is available, Google receives a connection only after you
          choose to load it. This website includes no advertising trackers or
          analytics cookies.
        </p>
        <h2>Your choices</h2>
        <p>
          You may contact the clinic directly instead of using the website form.
          For a live request, contact the clinic to ask about access,
          correction, withdrawal or deletion, subject to applicable obligations.
          The clinic must provide a reviewed process for responding to these
          requests before launch.
        </p>
        <h2>Review before launch</h2>
        <p>
          The clinic must confirm the controller/contact details, lawful basis,
          processor arrangements, retention schedule and applicable obligations
          with appropriate local advice. This draft describes the implemented
          workflow and awaits clinic approval.
        </p>
        <Link className="button button-outline" href="/contact">
          Contact the clinic →
        </Link>
      </article>
    </>
  );
}
