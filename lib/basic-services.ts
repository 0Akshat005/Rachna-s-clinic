export type BasicServiceCategory =
  | "Physical modalities"
  | "Manual & Soft tissue"
  | "Rehabilitation & Movement";

export type BasicServiceType =
  | "Treatment Modality"
  | "Rehabilitation Approach"
  | "Manual Therapy";

export type BasicService = {
  slug: string;
  name: string;
  category: BasicServiceCategory;
  type: BasicServiceType;
  number: string;
  summary: string;
  heading: string;
  audience: string;
  assessment: string;
  discussion: string[];
  image: string;
  alt: string;
  caption?: string;
  featuredOnHome?: boolean;
};

export const basicServices: BasicService[] = [
  {
    slug: "taping",
    name: "Taping",
    category: "Manual & Soft tissue",
    type: "Treatment Modality",
    number: "01",
    featuredOnHome: true,
    summary:
      "Application of specialized elastic kinesiology or rigid strapping tape to support joints, ease muscle strain, and enhance movement awareness.",
    heading: "Targeted joint and soft-tissue support during active recovery.",
    audience:
      "Individuals recovering from joint sprains, muscle strains, postural fatigue, or returning to sports and daily activities requiring mechanical support.",
    assessment:
      "Your physiotherapist assesses joint stability, skin sensitivity, and movement patterns to decide whether elastic kinesiology tape or rigid athletic strapping is appropriate.",
    discussion: [
      "Type of taping technique suited to your activity level",
      "Skin care, application wear time, and removal instructions",
      "How taping complements exercise therapy and movement retraining",
    ],
    image: "/images/basic/service-taping.webp",
    alt: "Physiotherapist applying therapeutic kinesiology tape onto an adult patient's shoulder and upper arm.",
    caption: "Clinical kinesiology taping application for joint stabilization",
  },
  {
    slug: "neuro-rehabilitation",
    name: "Neuro Rehabilitation",
    category: "Rehabilitation & Movement",
    type: "Rehabilitation Approach",
    number: "02",
    featuredOnHome: true,
    summary:
      "Structured motor relearning, balance retraining, and gait exercises to improve functional independence following neurological conditions.",
    heading: "Restoring functional independence through structured movement practice.",
    audience:
      "People living with stroke, Parkinson's disease, neuropathy, balance disorders, or spinal cord conditions seeking to improve daily mobility and coordination.",
    assessment:
      "A comprehensive evaluation of muscle tone, reflexes, coordination, balance, and functional task performance. Exercises are graduated to your current abilities.",
    discussion: [
      "Daily functional goals and safe transfer practice",
      "Gait retraining, weight-bearing, and coordination drills",
      "Home exercise routines and caregiver guidance where helpful",
    ],
    image: "/images/basic/service-neuro-rehabilitation.webp",
    alt: "Physiotherapist assisting an adult patient practicing balanced walking between parallel rehabilitation bars.",
    caption: "Guided gait and balance retraining in a clinical rehabilitation setting",
  },
  {
    slug: "pemf-therapy",
    name: "PEMF Therapy",
    category: "Physical modalities",
    type: "Treatment Modality",
    number: "03",
    featuredOnHome: true,
    summary:
      "Low-frequency pulsed electromagnetic field therapy applied locally to support cellular recovery and ease chronic tissue discomfort.",
    heading: "Gentle pulsed magnetic fields to support tissue recovery.",
    audience:
      "Individuals with persistent bone or joint stiffness, delayed healing, or localized musculoskeletal discomfort looking for non-invasive electrophysical support.",
    assessment:
      "Your physiotherapist reviews contraindications (including pacemakers, pregnancy, or electronic implants), examines the affected area, and discusses treatment duration.",
    discussion: [
      "Session frequency and sensation (typically painless or mild warmth)",
      "Contraindication screening and medical device checks",
      "Integration with active physical therapy and mobility work",
    ],
    image: "/images/basic/service-pemf-therapy.webp",
    alt: "Physiotherapist positioning a clinical PEMF pulsed electromagnetic ring applicator around a patient's knee.",
    caption: "Targeted pulsed electromagnetic field therapy applied to a joint",
  },
  {
    slug: "tens",
    name: "TENS",
    category: "Physical modalities",
    type: "Treatment Modality",
    number: "04",
    summary:
      "Gentle electrical impulses delivered through surface pads to stimulate sensory nerves and provide non-pharmacological pain relief.",
    heading: "Non-invasive sensory nerve stimulation for localized comfort.",
    audience:
      "People experiencing acute musculoskeletal pain, post-injury soreness, or chronic joint discomfort seeking drug-free symptomatic relief.",
    assessment:
      "Skin inspection and evaluation of pain distribution. The clinician places surface electrode pads and adjusts pulse frequency and intensity to comfortable tingling sensations.",
    discussion: [
      "Electrode placement and sensation expectations",
      "Short-term pain modulation alongside active rehabilitation",
      "Safe usage guidelines and precautions",
    ],
    image: "/images/basic/service-tens.webp",
    alt: "Physiotherapist placing small square TENS electrode pads on an adult patient's lower back.",
    caption: "Transcutaneous electrical nerve stimulation for localized pain modulation",
  },
  {
    slug: "ift",
    name: "IFT (Interferential Therapy)",
    category: "Physical modalities",
    type: "Treatment Modality",
    number: "05",
    summary:
      "Medium-frequency currents intersecting within deeper tissues to stimulate circulation, relax tense muscles, and alleviate persistent pain.",
    heading: "Deep-penetrating medium-frequency currents for targeted relief.",
    audience:
      "Individuals managing deep muscular spasms, ligament strains, frozen shoulder, osteoarthritis discomfort, or post-traumatic swelling.",
    assessment:
      "Four-pole or two-pole electrode arrangement placed around the problem area to produce a comfortable rhythmic beat frequency penetrating deeper tissue layers.",
    discussion: [
      "Deeper tissue penetration compared to standard surface stimulation",
      "Sensation parameters and tolerance levels",
      "Combining interferential therapy with gentle joint mobilization",
    ],
    image: "/images/basic/service-ift.webp",
    alt: "Physiotherapist applying interferential therapy vacuum electrode cups on an adult patient's upper back.",
    caption: "Interferential therapy applied to deeper muscular structures",
  },
  {
    slug: "ultrasound-therapy",
    name: "Ultrasound Therapy",
    category: "Physical modalities",
    type: "Treatment Modality",
    number: "06",
    summary:
      "High-frequency acoustic sound waves providing micro-massage and deep thermal or non-thermal effects to encourage soft-tissue healing.",
    heading: "Focused acoustic sound waves to assist soft-tissue healing.",
    audience:
      "Patients with tendonitis, bursitis, muscle tears, ligament sprains, or localized scar tissue stiffness.",
    assessment:
      "Application of conductive coupling gel and a moving sound head across the injured tendon or muscle. Pulse ratios and power settings are tailored to tissue depth.",
    discussion: [
      "Acoustic micro-massage and thermal vs pulsed non-thermal modes",
      "Precautions around epiphyseal plates and sensitive bony prominences",
      "Progression to progressive loading and stretching",
    ],
    image: "/images/basic/service-ultrasound-therapy.webp",
    alt: "Physiotherapist applying a therapeutic ultrasound soundhead probe with gel on a patient's forearm.",
    caption: "Therapeutic ultrasound application over soft tissue and tendons",
  },
  {
    slug: "cpm",
    name: "CPM (Continuous Passive Motion)",
    category: "Rehabilitation & Movement",
    type: "Rehabilitation Approach",
    number: "07",
    summary:
      "Motorized passive joint mobilization designed to gently move recovering joints through a controlled range of motion without muscular effort.",
    heading: "Controlled motorized movement to safeguard joint range after surgery.",
    audience:
      "Individuals recovering from knee arthroscopy, total knee replacement, ACL reconstruction, or severe joint stiffness needing early motion.",
    assessment:
      "Evaluation of surgeon guidelines, joint healing stage, and current passive range of motion. The machine's flexion and extension angles are calibrated precisely.",
    discussion: [
      "Graduated angle settings and comfortable speed adjustments",
      "Preventing intra-articular adhesions and promoting joint fluid circulation",
      "Transitioning to active and weight-bearing exercises as healing allows",
    ],
    image: "/images/basic/service-cpm.webp",
    alt: "Patient reclining on an examination table with their knee in a motorized Continuous Passive Motion apparatus.",
    caption: "Continuous passive motion device guiding post-operative knee flexion",
  },
  {
    slug: "mst",
    name: "MST (Muscle Stimulator)",
    category: "Physical modalities",
    type: "Treatment Modality",
    number: "08",
    summary:
      "Galvanic or faradic electrical stimulation to facilitate muscle contraction, re-educate weak muscles, and prevent disuse atrophy.",
    heading: "Electrical muscle stimulation for neuromuscular re-education.",
    audience:
      "Individuals with muscle weakness following prolonged immobilization, peripheral nerve injury, post-surgical inhibition, or motor control deficits.",
    assessment:
      "Testing of motor nerve response and muscle twitch threshold. Target electrodes are placed over motor points to initiate controlled, therapeutic muscle contractions.",
    discussion: [
      "Motor point stimulation and contract-relax timing",
      "Rebuilding voluntary muscle engagement and strength",
      "Coordinating electrical cues with active patient effort",
    ],
    image: "/images/basic/service-mst.webp",
    alt: "Physiotherapist using a diagnostic muscle stimulator probe to stimulate a motor point on a patient's forearm.",
    caption: "Muscle stimulator application for targeted motor point activation",
  },
  {
    slug: "hot-fomentation",
    name: "Hot Fomentation",
    category: "Physical modalities",
    type: "Treatment Modality",
    number: "09",
    summary:
      "Controlled moist heat application to increase local circulation, reduce stiffness, and prepare muscles and joints for exercise or manual therapy.",
    heading: "Therapeutic moist heat to relax tight tissues and ease joint stiffness.",
    audience:
      "Individuals experiencing chronic muscle tightness, morning spinal stiffness, fibrous aches, or preparing for exercise therapy.",
    assessment:
      "Skin temperature check and thermal sensitivity evaluation. Hydrocollator moist heat packs wrapped in protective terry towelling are applied for measured durations.",
    discussion: [
      "Vasodilation and soft-tissue extensibility benefits",
      "Safe temperature monitoring and burn prevention checks",
      "Optimal timing before stretching and manual physical therapy",
    ],
    image: "/images/basic/service-hot-fomentation.webp",
    alt: "Physiotherapist applying a wrapped moist heat hydrocollator pack on an adult patient's shoulder and upper back.",
    caption: "Moist heat thermotherapy for muscular relaxation and stiffness relief",
  },
  {
    slug: "myofascial-release",
    name: "Myofascial Release (MFR)",
    category: "Manual & Soft tissue",
    type: "Manual Therapy",
    number: "10",
    summary:
      "Sustained, gentle manual pressure applied into fascial restrictions to release tension, restore tissue glide, and reduce movement restrictions.",
    heading: "Sustained hands-on pressure to release fascial tension and restore mobility.",
    audience:
      "Patients with chronic myofascial pain syndrome, posture-related tight bands, fibrotic restrictions, or movement limitations following trauma.",
    assessment:
      "Palpation of tissue density, glide, and tender trigger points across muscle groups. The therapist applies prolonged low-load pressure to facilitate release.",
    discussion: [
      "Understanding fascial tissue restrictions and postural strain patterns",
      "Expected sensations during sustained pressure and post-treatment hydration",
      "Integration with postural ergonomics and stretching drills",
    ],
    image: "/images/basic/service-myofascial-release.webp",
    alt: "Physiotherapist performing gentle hands-on myofascial release on an adult patient's upper back.",
    caption: "Hands-on myofascial release technique across the dorsal fascia",
  },
  {
    slug: "muscle-energy-technique",
    name: "Muscle Energy Technique (MET)",
    category: "Manual & Soft tissue",
    type: "Manual Therapy",
    number: "11",
    summary:
      "Active manual technique where the patient provides gentle, controlled muscle contractions against a counterforce to lengthen tight muscles.",
    heading: "Collaborative muscle contractions to restore symmetry and range of motion.",
    audience:
      "Individuals with acute muscle spasm, spinal joint hypomobility, pelvic asymmetry, or restricted joint range of motion.",
    assessment:
      "Assessment of joint motion barriers, muscle length, and pelvic or spinal alignment. The therapist positions the joint and instructs isometric contraction.",
    discussion: [
      "Post-isometric relaxation and reciprocal inhibition mechanisms",
      "Precise direction and gentle effort (typically 20% effort, not forceful)",
      "Reinforcing new joint range through active stabilization exercises",
    ],
    image: "/images/basic/service-muscle-energy-technique.webp",
    alt: "Physiotherapist guiding an adult patient through an active muscle energy technique on the hip and leg.",
    caption: "Active muscle energy technique targeting hip and hamstring length",
  },
  {
    slug: "manual-therapy",
    name: "Manual Therapy",
    category: "Manual & Soft tissue",
    type: "Manual Therapy",
    number: "12",
    summary:
      "Skilled hands-on techniques, including passive joint mobilization, traction, and soft-tissue manipulation, to alleviate stiffness and restore joint mechanics.",
    heading: "Skilled practitioner hands-on care to restore joint and tissue mobility.",
    audience:
      "People dealing with spinal or peripheral joint stiffness, restricted shoulder mobility, cervical tightness, or biomechanical dysfunction.",
    assessment:
      "Detailed physical examination of joint play, end-feel, and physiological versus accessory movements to identify specific hypomobile segments.",
    discussion: [
      "Graded joint mobilizations (Grades I to IV) and passive movement",
      "Immediate symptom modulation and mechanical benefits",
      "Combining hands-on joint release with motor control retraining",
    ],
    image: "/images/basic/service-basic-manual-therapy.webp",
    alt: "Physiotherapist performing skilled hands-on passive joint mobilization on an adult patient's shoulder.",
    caption: "Gentle accessory joint mobilization to improve shoulder range of motion",
  },
];

export const basicServiceCategories = [
  "All",
  "Physical modalities",
  "Manual & Soft tissue",
  "Rehabilitation & Movement",
] as const;

export const featuredBasicServices = basicServices.filter(
  (s) => s.featuredOnHome,
);

export function basicServiceCategoryLabel(category: string) {
  return category;
}
