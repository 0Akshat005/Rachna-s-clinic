import Link from "next/link";
import { PageHero } from "@/components/page-hero";
import { callHref, clinic } from "@/lib/clinic-profile";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata(
  "Privacy Notice",
  "How the Rachana website prepares WhatsApp appointment enquiries and handles external links and your privacy.",
  "/privacy",
);
export default function Privacy() {
  return (
    <>
      <PageHero
        eyebrow="Privacy notice"
        title="Your details deserve thoughtful care."
        description="How your details are prepared for an enquiry and shared when you choose to continue to WhatsApp. This notice remains subject to clinic review."
        booking={false}
      />
      <article className="container section legal-content">
        <p>Updated for clinic review: 15 October 2026.</p>
        <h2>Who handles your information?</h2>
        <p>
          {clinic.name}, {clinic.address}. To discuss this notice or make a
          privacy request,{" "}
          <a href={callHref}>contact the clinic on {clinic.phoneDisplay}</a>.
          The clinic’s designated privacy contact and retention periods are
          awaiting confirmation.
        </p>
        <h2>What the enquiry form asks for</h2>
        <p>
          The form asks for your name and callback number. A general area of
          interest and preferred day are optional. You must agree to share the
          details with WhatsApp and the clinic before continuing. Please keep
          detailed symptoms, medical reports, diagnostic information and payment
          details for an appropriate conversation with your practitioner.
        </p>
        <h2>How the WhatsApp enquiry works</h2>
        <p>
          The form prepares a message in your browser. Choosing Continue to
          WhatsApp opens a chat link for {clinic.phoneDisplay} with those
          details included. WhatsApp may process the information when you open
          that link, under its own privacy terms. Review the prepared message
          and tap Send in WhatsApp to share it with the clinic. Opening the chat
          does not send a message or confirm an appointment.
        </p>
        <h2>Where your form details are kept</h2>
        <p>
          This enquiry form does not send your details to the website’s server,
          store them in a website database or browser storage, or email them.
          The entered details remain in the form while the page is open so you
          can correct or retry the enquiry. WhatsApp and your browser may handle
          chat links, messages and history according to their own settings and
          policies.
        </p>
        <h2>How the clinic uses your message</h2>
        <p>
          After you send the message in WhatsApp, the clinic can use it to
          discuss availability and arrange your visit. An appointment is
          confirmed only after you agree the details with the clinic. The clinic
          must confirm who can access its WhatsApp account and establish its
          retention, deletion and privacy-request procedures.
        </p>
        <h2>External services</h2>
        <p>
          Calls, WhatsApp and Google Maps use services with their own privacy
          terms. The Contact page includes an embedded Google Maps map, which
          may load automatically as you browse the page and connect your browser
          to Google. Google’s own privacy terms apply to that map. The website
          itself includes no additional advertising trackers or analytics
          cookies.
        </p>
        <h2>Your choices</h2>
        <p>
          You can edit the prepared message, decide not to send it, or call the
          clinic instead. Contact the clinic about access, correction,
          withdrawal or deletion of a message you have shared, subject to
          applicable obligations.
        </p>
        <h2>Clinic review</h2>
        <p>
          The clinic must review its contact details, privacy responsibilities,
          processor arrangements and retention procedures. This draft describes
          the implemented enquiry workflow and awaits clinic approval.
        </p>
        <Link className="button button-outline" href="/contact">
          Contact the clinic →
        </Link>
      </article>
    </>
  );
}
