import type { ReactNode } from "react";
import { clinic } from "@/lib/clinic-profile";
const questions: [string, ReactNode][] = [
  [
    "What should I bring to my first visit?",
    "Choose comfortable clothing that allows easy movement. Ask the clinic whether to bring relevant reports or previous prescriptions. Bring any questions you would like to discuss.",
  ],
  ["Do I need a referral?", clinic.referralPolicy],
  [
    "How long does a session take?",
    <>
      Each session lasts <strong>1 hour</strong>, allowing sufficient time for
      your appointment.
    </>,
  ],
  [
    "How much does an appointment cost?",
    <>
      The appointment fee is <strong>₹400</strong>. Full payment must be made in
      advance before your appointment can be scheduled.
    </>,
  ],
  [
    "How is my appointment confirmed?",
    <>
      Fill the enquiry form in the <strong>Contact</strong> section, then review
      the prepared message and tap <strong>Send</strong> in WhatsApp. The clinic
      will reply to discuss availability and confirm your appointment.
    </>,
  ],
];
export function FaqAccordion({
  title = "Before your first visit.",
}: {
  title?: string;
}) {
  return (
    <section className="section faq-section">
      <div className="container faq-grid">
        <div data-reveal>
          <p className="eyebrow">A few helpful answers</p>
          <h2>{title}</h2>
          <p className="supporting">
            A little clarity before you take
            <br />
            the next step.
          </p>
        </div>
        <div className="faq-list">
          {questions.map(([question, answer]) => (
            <details key={question}>
              <summary>
                {question}
                <span aria-hidden="true" className="faq-symbol" />
              </summary>
              <p>{answer}</p>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
}
