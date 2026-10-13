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
      "A conversation about your back, neck and the everyday movements that matter to you.",
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
    alt: "Illustration of a person holding their neck and lower back, with a highlighted spine and neck, back, disc health and mobility callouts.",
  },
  {
    slug: "osteopathy-matrix-rhythm-therapy",
    name: "Osteopathy & Matrix Rhythm Therapy",
    category: "Specialist modalities",
    number: "02",
    summary:
      "Explore hands-on and specialist care options through an individual assessment.",
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
    image: "strength-reference.webp",
    alt: "Illustrative exercise equipment on a mat",
  },
  {
    slug: "dry-needling",
    name: "Dry Needling",
    category: "Specialist modalities",
    number: "03",
    summary:
      "Discuss suitability, alternatives and informed consent before considering this technique.",
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
      "A discussion of the specific technique, individual suitability and available alternatives.",
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
    slug: "tecar-laser-therapy",
    name: "TECAR & Laser Therapy",
    category: "Specialist modalities",
    number: "05",
    summary:
      "Learn about equipment-based options in the context of an assessment and care plan.",
    heading: "Your assessment comes before the equipment.",
    audience:
      "People who would like to understand TECAR or laser therapy can ask about the equipment and its intended role. The availability of a device is not a recommendation to use it.",
    assessment:
      "Your physiotherapist can discuss why an equipment-based technique is being considered, whether it is suitable, and what alternatives exist. Ask about the relevant precautions and expected review process.",
    discussion: [
      "Why a device is being considered",
      "Precautions and individual suitability",
      "Other options and when the plan is reviewed",
    ],
    image: "tecar-laser-therapy.webp",
    alt: "Physiotherapist administering targeted laser therapy to a patient's knee using specialized equipment",
  },
  {
    slug: "sports-injury-rehabilitation",
    name: "Sports Injury Rehabilitation",
    category: "Rehabilitation",
    number: "06",
    summary:
      "Bring your activity goals into a discussion about recovery and returning to movement.",
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
    image: "movement-reference.webp",
    alt: "Illustrative image of a woman stretching her shoulder",
  },
  {
    slug: "pilates-training",
    name: "Pilates Training",
    category: "Strength & Pilates",
    number: "07",
    summary:
      "Explore guided movement and goals around strength, posture and body awareness.",
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
    image: "pilates-reference.webp",
    alt: "Illustrative Pilates ball, mat and exercise bands",
  },
];
export const serviceCategories = [
  "All",
  "Spine & movement",
  "Rehabilitation",
  "Specialist modalities",
  "Strength & Pilates",
] as const;
export const featuredServices = [services[0], services[5], services[6]];
