import { clinic } from "@/lib/clinic-profile";
const questions = [
  [
    "What should I bring to my first visit?",
    "Choose comfortable clothing that allows easy movement. Ask the clinic whether to bring relevant reports or previous prescriptions. Bring any questions you would like to discuss.",
  ],
  ["Do I need a referral?", clinic.referralPolicy],
  ["How long does a session take?", clinic.sessionDuration],
  ["How much does an appointment cost?", clinic.fees],
  [
    "How is my appointment confirmed?",
    "A website submission is an appointment request. The clinic will contact you to discuss availability. Your preferred day is not reserved or confirmed when you submit.",
  ],
  ["Can I change or cancel my appointment?", clinic.cancellationPolicy],
];
export function FaqAccordion({
  title = "Before your first visit.",
}: {
  title?: string;
}) {
  return (
    <section className="section faq-section">
      <div className="container faq-grid">
        <div>
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
