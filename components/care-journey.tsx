const steps = [
  [
    "Listen",
    "Share your concerns, daily routine and the activities that matter to you.",
  ],
  [
    "Assess",
    "Understand your movement assessment and discuss what the findings mean.",
  ],
  [
    "Plan",
    "Talk through suitable choices and agree on practical next steps together.",
  ],
  [
    "Review",
    "Revisit your goals and discuss whether your plan needs to change.",
  ],
];
export function CareJourney() {
  return (
    <section className="section journey-section">
      <div className="container">
        <p className="eyebrow">Our approach</p>
        <h2>A clear plan, at your pace.</h2>
        <ol className="journey-grid">
          {steps.map(([title, body], index) => (
            <li key={title}>
              <span className="step-number">0{index + 1}</span>
              <h3>{title}</h3>
              <p>{body}</p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
