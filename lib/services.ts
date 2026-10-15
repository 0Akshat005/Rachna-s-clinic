export type ServiceCategory =
  | "Spine & movement"
  | "Rehabilitation"
  | "Specialist modalities"
  | "Strength & Pilates";
export type Service = {
  slug: string;
  name: string;
  category: ServiceCategory;
  summary: string;
  heading: string;
  audience: string;
  assessment: string;
  discussion: string[];
  image: string;
  cardImage?: string;
  cardImageNote?: string;
  alt: string;
  number: string;
};
export const services: Service[] = [
  {
    slug: "spine-care",
    name: "Spine Care",
    category: "Spine & movement",
    number: "01",
    summary:
      "Back and neck movement assessment, with a discussion of suitable physiotherapy and exercises.",
    heading: "Make space for easier everyday movement.",
    audience:
      "People who would like to discuss back or neck discomfort, stiffness, or difficulties with everyday movement can ask about a spine assessment.",
    assessment:
      "Start with your concerns, previous care and the activities you want to return to. Your physiotherapist can explain any proposed movement assessment and discuss next steps with you.",
    discussion: [
      "Your daily routine and movement goals",
      "Any relevant reports or previous care",
      "Assessment findings and suitable next steps",
    ],
    image: "spine-reference.webp",
    cardImage: "service-spine-assessment.webp",
    alt: "Illustration of a person holding their neck and lower back, with a highlighted spine and neck, back, disc health and mobility callouts.",
  },
  {
    slug: "osteopathy-matrix-rhythm-therapy",
    name: "Osteopathy & Matrix Rhythm Therapy",
    category: "Specialist modalities",
    number: "02",
    summary:
      "Hands-on movement techniques (osteopathy) and rhythmic, device-assisted soft-tissue work (Matrix Rhythm Therapy).",
    heading: "Understand your options before choosing care.",
    audience:
      "People curious about hands-on care or Matrix Rhythm Therapy can discuss their questions with the clinic. You do not need to select a technique before an assessment.",
    assessment:
      "The conversation starts with your movement concerns and preferences. Ask the practitioner about their qualifications, the proposed approach, alternatives and whether it is appropriate for your circumstances.",
    discussion: [
      "What each proposed technique involves",
      "Practitioner qualifications and suitability",
      "Alternatives, limitations and your preferences",
    ],
    image: "service-manual-therapy.webp",
    cardImageNote: "Hands-on care shown",
    alt: "Illustrative scene of a physiotherapist gently supporting a patient's ankle during a hands-on movement assessment.",
  },
  {
    slug: "dry-needling",
    name: "Dry Needling",
    category: "Specialist modalities",
    number: "03",
    summary:
      "Fine needles placed into muscle tissue, following an assessment and your informed consent.",
    heading: "A considered conversation about specialist care.",
    audience:
      "People who want to understand dry needling can discuss it with a qualified practitioner. An interest in a technique does not establish that it is suitable for you.",
    assessment:
      "Your practitioner should assess your circumstances and explain what the procedure involves, possible risks and alternatives before seeking your informed consent. You can ask questions or decline a proposed technique.",
    discussion: [
      "The purpose of any proposed procedure",
      "Suitability, risks and alternatives",
      "Your questions and informed consent",
    ],
    image: "dry-needling.webp",
    alt: "Physiotherapist performing targeted dry needling procedure on upper back trigger points",
  },
  {
    slug: "cupping-therapy",
    name: "Hijama / Cupping Therapy",
    category: "Specialist modalities",
    number: "04",
    summary:
      "Cups create suction on the skin. Ask which form of cupping is offered and what it involves.",
    heading: "Ask questions. Make an informed choice.",
    audience:
      "People with questions about cupping can speak with the clinic about the exact technique offered. Different procedures require different qualifications and suitability checks.",
    assessment:
      "Ask which form of cupping is proposed, what it involves, who performs it, and what risks or limitations apply. Any decision should follow individual assessment and informed consent.",
    discussion: [
      "The specific technique offered by the clinic",
      "Practitioner training and suitability checks",
      "Risks, limitations and other options",
    ],
    image: "cupping-therapy.webp",
    alt: "Clinical cupping therapy procedure with suction cups applied along a patient's back by a practitioner",
  },
  {
    slug: "laser-therapy",
    name: "Laser Therapy",
    category: "Specialist modalities",
    number: "05",
    summary:
      "Targeted light energy applied to joint and soft-tissue areas, selected following a clinical assessment.",
    heading: "Focused light energy to support tissue recovery.",
    audience:
      "People wanting to explore non-invasive light therapy for persistent joint discomfort, tendon irritation or localized inflammation can discuss suitability with the clinic.",
    assessment:
      "Your physiotherapist evaluates joint movement, tissue sensitivity and relevant history. They explain how targeted light interacts with cells, the expected sensation, precautions and appropriate alternatives.",
    discussion: [
      "The clinical role and mechanism of laser therapy",
      "Suitability, safety checks and contraindications",
      "Follow-up milestones and complementary exercises",
    ],
    image: "laser-therapy.webp",
    cardImageNote: "Clinical laser procedure shown",
    alt: "Physiotherapist administering targeted laser therapy to a patient's knee using specialized equipment",
  },
  {
    slug: "tecar-therapy",
    name: "TECAR Therapy",
    category: "Specialist modalities",
    number: "06",
    summary:
      "High-frequency radiofrequency energy generating deep cellular warmth to support muscle and soft-tissue relaxation.",
    heading: "Targeted radiofrequency warmth for deep tissue recovery.",
    audience:
      "People seeking relief from chronic muscle tightness, stiff tendons, joint soreness or acute sports strains can explore whether TECAR therapy fits their treatment plan.",
    assessment:
      "Your physiotherapist examines tissue depth, muscle tone and contraindications. They discuss the difference between capacitive (soft tissue) and resistive (tendon/joint) modes and describe what you will feel during treatment.",
    discussion: [
      "Capacitive and resistive radiofrequency modes",
      "Expected soothing warmth and safety checks",
      "How TECAR pairs with active rehabilitation",
    ],
    image: "service-tecar-therapy.webp",
    cardImageNote: "TECAR procedure shown",
    alt: "Physiotherapist applying specialized TECAR radiofrequency therapy probe to a patient's shoulder",
  },
  {
    slug: "sports-injury-rehabilitation",
    name: "Sports Injury Rehabilitation",
    category: "Rehabilitation",
    number: "07",
    summary:
      "Guided exercises and movement practice for a return to sport or regular activity.",
    heading: "Your next chapter of movement starts here.",
    audience:
      "People returning to sport or regular activity after an injury can discuss their current abilities, prior treatment and activity goals with the clinic.",
    assessment:
      "Talk about the injury, your current activities and what you hope to return to. Your practitioner can explain appropriate movement checks and discuss a plan and review points suited to your circumstances.",
    discussion: [
      "The activities you want to return to",
      "Current movement and previous treatment",
      "A practical plan with agreed review points",
    ],
    image: "service-sports-rehabilitation.webp",
    alt: "Illustrative scene of a physiotherapist supervising a controlled low step-up exercise.",
  },
  {
    slug: "pilates-training",
    name: "Pilates Training",
    category: "Strength & Pilates",
    number: "08",
    summary:
      "Controlled, guided exercises focused on strength, posture and body awareness, adapted to your starting point.",
    heading: "Build a thoughtful relationship with movement.",
    audience:
      "People interested in guided exercise can discuss their goals and current movement needs with the clinic. Ask about the format of Pilates sessions and the supervision available.",
    assessment:
      "Share your experience with exercise, any current concerns and what you would like to work towards. The practitioner can discuss a suitable starting point, modifications and follow-up.",
    discussion: [
      "Your goals and experience with exercise",
      "Session format and supervision",
      "A starting point that fits your circumstances",
    ],
    image: "service-guided-pilates.webp",
    alt: "Illustrative scene of a physiotherapist guiding a controlled bent-knee mat exercise.",
  },
];
export const serviceCategories = [
  "All",
  "Spine & movement",
  "Rehabilitation",
  "Specialist modalities",
  "Strength & Pilates",
] as const;
export const featuredServices = [services[0], services[6], services[7]];

export function serviceCategoryLabel(category: string) {
  return category === "Specialist modalities"
    ? "Specialist therapies"
    : category;
}
