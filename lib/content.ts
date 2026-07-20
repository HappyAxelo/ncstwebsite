export const project = {
  title: "AI-Driven Machine Vision for Quality Control and Waste Reduction",
  fullTitle:
    "AI-Driven Machine Vision for Quality Control and Waste Reduction in Small-Scale Food Processing Manufacturing in Rwanda and Malawi",
  subtitle:
    "A research project of the University of Rwanda and the University of Malawi applying artificial intelligence, machine vision and IoT to small-scale food processing.",
  institutions: {
    primary: "University of Rwanda",
    collaborating: "University of Malawi",
  },
};

export const heroStats = [
  { value: 24, suffix: "", label: "Months", hint: "Three project phases" },
  { value: 2, suffix: "", label: "Countries", hint: "Rwanda and Malawi" },
  { value: 1000, suffix: " kg/h", label: "AI inspection rate", hint: "About 100 kg/h by hand" },
  { value: 10, suffix: "×", label: "Faster than manual", hint: "Same line, fewer errors" },
];

export const problemStats = [
  {
    value: 30,
    prefix: "15–",
    suffix: "%",
    label: "Post-harvest maize losses in sub-Saharan Africa",
    source: "FAO",
  },
  {
    value: 25,
    suffix: "%",
    label: "Maize grains affected by aflatoxin in Malawi",
    source: "National studies",
  },
  {
    value: 18,
    suffix: "%",
    label: "Processed maize flour samples below national standards in Rwanda",
    source: "Rwanda Standards Board, 2021",
  },
];

export const impactStats = [
  {
    value: 10,
    suffix: "×",
    label: "Faster inspection",
    detail:
      "A worker inspects about 100 kg of maize per hour. The machine vision system inspects over 1,000 kg per hour on the same line.",
  },
  {
    value: 30,
    prefix: "20–",
    suffix: "%",
    label: "Current rejection rate",
    detail:
      "Poor sorting and contamination currently reject 20 to 30% of maize. Automated sorting removes only grain that is actually defective.",
  },
  {
    value: 25,
    suffix: "%",
    label: "Aflatoxin exposure in Malawi",
    detail:
      "A quarter of Malawian maize carries aflatoxin, a mold linked to liver disease. The system detects contamination that manual checks miss.",
  },
  {
    value: 10,
    suffix: "M+ RWF",
    label: "Saved per facility, per year",
    detail:
      "A Musanze milling facility loses about 600,000 RWF a month to breakdowns. Predictive maintenance cuts that to a fraction.",
  },
  {
    value: 65,
    suffix: "M RWF",
    label: "Rwanda activities budget",
    detail:
      "Covers research, technology development, deployment, training and scaling in Rwanda. Malawi activities are budgeted at 62 million.",
  },
  {
    value: 4,
    prefix: "$",
    suffix: "B",
    label: "Regional losses at stake",
    detail:
      "Post-harvest food loss costs sub-Saharan Africa about four billion dollars a year. Better sorting directly reduces that loss.",
  },
];

export const impactQualitative = [
  {
    t: "Safer food",
    d: "Fewer aflatoxin-contaminated grains reach flour, lowering health risks for consumers in both countries.",
  },
  {
    t: "Lower energy costs",
    d: "IoT data lets facilities schedule production around actual consumption instead of guesswork.",
  },
  {
    t: "Less downtime",
    d: "Machines are serviced before they fail, so mills keep running and deliveries stay on time.",
  },
  {
    t: "A trained workforce",
    d: "Postgraduate students and industry staff learn to build and run AI and IoT systems.",
  },
];

export const phases = [
  {
    phase: "Phase 1",
    months: "Months 1–6",
    title: "Dataset and model training",
    points: [
      "Collect and annotate maize images from local plants",
      "Train CNN and YOLOv8 detection models",
      "Deploy first IoT sensors",
    ],
  },
  {
    phase: "Phase 2",
    months: "Months 7–12",
    title: "Pilot deployment",
    points: [
      "Install cameras and sensors in selected facilities",
      "Integrate with production lines",
      "Test and refine accuracy in real conditions",
    ],
  },
  {
    phase: "Phase 3",
    months: "Months 13–24",
    title: "Scaling and commercialization",
    points: [
      "Expand to more facilities in both countries",
      "Train operators and staff",
      "Set up remote monitoring and partnerships",
    ],
  },
];

export const architecture = [
  {
    id: "camera",
    name: "Industrial camera",
    detail:
      "High-resolution cameras photograph maize grains as they move along the conveyor, at the points where inspection matters most.",
  },
  {
    id: "acquisition",
    name: "Image acquisition",
    detail:
      "Frames are captured continuously in sync with the belt. RFID readers (Impinj R700) track raw material batches through the plant.",
  },
  {
    id: "processing",
    name: "Image processing",
    detail:
      "Each frame is cleaned and segmented on an edge module (NVIDIA Jetson Xavier NX or Orin Nano) before it reaches the model.",
  },
  {
    id: "cnn",
    name: "CNN",
    detail:
      "A convolutional neural network learns the visual differences between healthy maize and moldy, discolored, broken or contaminated grain.",
  },
  {
    id: "yolo",
    name: "YOLOv8",
    detail:
      "YOLOv8 reads the whole frame in one pass, so detection keeps up with the belt. Older methods like R-CNN scan region by region and fall behind.",
  },
  {
    id: "classify",
    name: "Classification",
    detail:
      "Each grain is marked healthy (accepted), defective (rejected) or borderline (flagged for a person to review).",
  },
  {
    id: "reject",
    name: "Reject mechanism",
    detail:
      "Servo motors and a pneumatic pusher remove rejected grain from the line as soon as it is detected.",
  },
  {
    id: "iot",
    name: "IoT sensors",
    detail:
      "DHT22 temperature, HX711 weight and vibration sensors report machine and environment data over ESP32 boards and LoRa radio (RAK3172).",
  },
  {
    id: "cloud",
    name: "Cloud analytics",
    detail:
      "Sensor and inspection data are analyzed centrally for anomalies, energy use and reporting across facilities.",
  },
  {
    id: "lstm",
    name: "LSTM maintenance",
    detail:
      "Long short-term memory networks read the sensor history and estimate each machine's remaining useful life, so service happens before failure.",
  },
  {
    id: "dashboard",
    name: "Dashboard",
    detail:
      "Operators see the live camera feed, detection results, throughput and machine health in one place.",
  },
];

export const defectClasses = [
  {
    name: "Healthy",
    color: "#2f9e6e",
    desc: "Uniform color, intact kernel. Accepted for production.",
    verdict: "ACCEPT",
  },
  {
    name: "Broken",
    color: "#e8a020",
    desc: "Fractured or split kernels, caught by shape.",
    verdict: "REJECT",
  },
  {
    name: "Mold / Aflatoxin",
    color: "#d64545",
    desc: "Fungal discoloration that manual sorting often misses.",
    verdict: "REJECT",
  },
  {
    name: "Discoloration",
    color: "#c07f22",
    desc: "Off-color kernels from spoilage or heat damage.",
    verdict: "REJECT",
  },
  {
    name: "Foreign object",
    color: "#7c5cbf",
    desc: "Stones, husks and debris removed before milling.",
    verdict: "REJECT",
  },
];

export const outputs = [
  {
    title: "Journal publications",
    icon: "journal",
    desc: "Peer-reviewed papers on the development and deployment of the machine vision and IoT systems.",
  },
  {
    title: "Annotated maize datasets",
    icon: "dataset",
    desc: "Labeled grain images collected in Rwandan and Malawian facilities, built for defect detection research.",
  },
  {
    title: "Open training materials",
    icon: "code",
    desc: "Case studies and training resources published openly on the project website.",
  },
  {
    title: "Patents and licensing",
    icon: "patent",
    desc: "Patentable technologies identified, filed and licensed to industry partners.",
  },
  {
    title: "Workshops",
    icon: "training",
    desc: "Hands-on training for industry staff on operating and maintaining the systems.",
  },
  {
    title: "Conference papers",
    icon: "conference",
    desc: "Findings presented at national and international AI, IoT and food processing conferences.",
  },
  {
    title: "Policy briefs",
    icon: "policy",
    desc: "Recommendations for government agencies on adopting AI and IoT in manufacturing.",
  },
  {
    title: "Two research labs",
    icon: "lab",
    desc: "AI and IoT labs established at the University of Rwanda and the University of Malawi.",
  },
];

export const researchQuestions = [
  "How can machine vision improve quality control in small-scale food processing?",
  "What role can IoT monitoring play in reducing waste and improving efficiency?",
  "How can predictive maintenance reduce equipment failures and downtime?",
  "How can IoT energy management make production more sustainable?",
  "How can IoT supply chain tracking improve logistics and inventory?",
];
