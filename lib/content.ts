// ---------------------------------------------------------------------------
// All editable website content lives in this default object. The admin page
// saves overrides to the database (key "content"); getContent() in lib/store.ts
// merges the saved overrides on top of these defaults, so anything not yet
// edited falls back here.
//
// Colours (defect classes) and icons (architecture, outputs) are assigned by
// position in the code, so those lists can still be edited or extended and new
// items simply cycle through the available colours/icons.
// ---------------------------------------------------------------------------

export type Stat = {
  value: number;
  prefix?: string;
  suffix?: string;
  label: string;
  hint?: string;
  detail?: string;
  source?: string;
  sub?: string;
};

export type SiteContent = {
  project: {
    fullTitle: string;
    footerDescription: string;
    footerInstitutions: string;
  };
  home: {
    heroEyebrow: string;
    heroTitle: string;
    heroSubtitle: string;
    heroStats: Stat[];
    problemEyebrow: string;
    problemTitle: string;
    problemLead: string;
    problemBody: string;
    problemStats: Stat[];
  };
  architecture: {
    eyebrow: string;
    title: string;
    lead: string;
    hardwareNote: string;
    nodes: { name: string; detail: string }[];
  };
  timeline: {
    eyebrow: string;
    title: string;
    phases: { phase: string; months: string; title: string; points: string[] }[];
  };
  machineVision: {
    headerEyebrow: string;
    headerTitle: string;
    headerLead: string;
    pipelineEyebrow: string;
    pipelineTitle: string;
    steps: { title: string; desc: string }[];
    demoEyebrow: string;
    demoTitle: string;
    demoLead: string;
    demoBody: string;
    defectsEyebrow: string;
    defectsTitle: string;
    defectsLead: string;
    defects: { name: string; verdict: string; desc: string }[];
  };
  maintenance: {
    headerEyebrow: string;
    headerTitle: string;
    headerLead: string;
    dashboardEyebrow: string;
    dashboardTitle: string;
    dashboardLead: string;
    caseEyebrow: string;
    caseTitle: string;
    caseLead: string;
    scenario: Stat[];
    outcomes: string[];
    industryNote: string;
  };
  impact: {
    headerEyebrow: string;
    headerTitle: string;
    headerLead: string;
    countersEyebrow: string;
    countersTitle: string;
    countersLead: string;
    stats: Stat[];
    qualitative: { t: string; d: string }[];
    questionsEyebrow: string;
    questionsTitle: string;
    questions: string[];
    outputsEyebrow: string;
    outputsTitle: string;
    outputsLead: string;
    outputs: { title: string; desc: string }[];
  };
  team: {
    headerEyebrow: string;
    headerTitle: string;
    headerLead: string;
    leadsTitle: string;
    coInvestigatorsTitle: string;
    partnersEyebrow: string;
    partnersTitle: string;
    partnersLead: string;
    capacity: { v: string; l: string }[];
  };
  contact: {
    headerEyebrow: string;
    headerTitle: string;
    headerLead: string;
    email: string;
    formTitle: string;
    formLead: string;
    institutions: { name: string; role: string; where: string; lead: string }[];
  };
};

export const defaultContent: SiteContent = {
  project: {
    fullTitle:
      "AI-Driven Machine Vision for Quality Control and Waste Reduction in Small-Scale Food Processing Manufacturing in Rwanda and Malawi",
    footerDescription:
      "AI-Driven Machine Vision for Quality Control and Waste Reduction in Small-Scale Food Processing Manufacturing in Rwanda and Malawi. Hosted by the University of Rwanda with the University of Malawi as collaborating institution.",
    footerInstitutions: "University of Rwanda · University of Malawi",
  },
  home: {
    heroEyebrow: "University of Rwanda · University of Malawi",
    heroTitle:
      "AI machine vision for quality control and waste reduction in food processing",
    heroSubtitle:
      "Cameras and neural networks inspect every maize grain on the production line, while IoT sensors watch the machines themselves. A 24-month research project in Rwanda and Malawi.",
    heroStats: [
      { value: 24, suffix: "", label: "Months", hint: "Three project phases" },
      { value: 2, suffix: "", label: "Countries", hint: "Rwanda and Malawi" },
      { value: 1000, suffix: " kg/h", label: "AI inspection rate", hint: "About 100 kg/h by hand" },
      { value: 10, suffix: "×", label: "Faster than manual", hint: "Same line, fewer errors" },
    ],
    problemEyebrow: "The problem",
    problemTitle: "Manual grain inspection loses food, money and safety",
    problemLead:
      "Workers check maize by eye for mold, discoloration and foreign objects. The method is slow, inconsistent, and misses the contamination that matters most. Aflatoxin, a toxic mold, is linked to liver disease and weakened immunity.",
    problemBody:
      "This project replaces guesswork with an affordable system built for small and medium enterprises: machine vision for sorting, IoT sensors for monitoring, and machine learning to keep equipment running.",
    problemStats: [
      { value: 30, prefix: "15–", suffix: "%", label: "Post-harvest maize losses in sub-Saharan Africa", source: "FAO" },
      { value: 25, suffix: "%", label: "Maize grains affected by aflatoxin in Malawi", source: "National studies" },
      { value: 18, suffix: "%", label: "Processed maize flour samples below national standards in Rwanda", source: "Rwanda Standards Board, 2021" },
    ],
  },
  architecture: {
    eyebrow: "System architecture",
    title: "From camera to decision",
    lead: "Eleven connected components take each grain from the lens to the sorting mechanism, and each machine's data to the maintenance model. Select a component to see what it does.",
    hardwareNote:
      "Hardware: NVIDIA Jetson Xavier NX / Orin Nano · ESP32 · Arduino Mega 2560 · Impinj R700 RFID · DHT22 · HX711 · LoRa RAK3172",
    nodes: [
      { name: "Industrial camera", detail: "High-resolution cameras photograph maize grains as they move along the conveyor, at the points where inspection matters most." },
      { name: "Image acquisition", detail: "Frames are captured continuously in sync with the belt. RFID readers (Impinj R700) track raw material batches through the plant." },
      { name: "Image processing", detail: "Each frame is cleaned and segmented on an edge module (NVIDIA Jetson Xavier NX or Orin Nano) before it reaches the model." },
      { name: "CNN", detail: "A convolutional neural network learns the visual differences between healthy maize and moldy, discolored, broken or contaminated grain." },
      { name: "YOLOv8", detail: "YOLOv8 reads the whole frame in one pass, so detection keeps up with the belt. Older methods like R-CNN scan region by region and fall behind." },
      { name: "Classification", detail: "Each grain is marked healthy (accepted), defective (rejected) or borderline (flagged for a person to review)." },
      { name: "Reject mechanism", detail: "Servo motors and a pneumatic pusher remove rejected grain from the line as soon as it is detected." },
      { name: "IoT sensors", detail: "DHT22 temperature, HX711 weight and vibration sensors report machine and environment data over ESP32 boards and LoRa radio (RAK3172)." },
      { name: "Cloud analytics", detail: "Sensor and inspection data are analyzed centrally for anomalies, energy use and reporting across facilities." },
      { name: "LSTM maintenance", detail: "Long short-term memory networks read the sensor history and estimate each machine's remaining useful life, so service happens before failure." },
      { name: "Dashboard", detail: "Operators see the live camera feed, detection results, throughput and machine health in one place." },
    ],
  },
  timeline: {
    eyebrow: "Timeline",
    title: "Three phases over 24 months",
    phases: [
      { phase: "Phase 1", months: "Months 1–6", title: "Dataset and model training", points: ["Collect and annotate maize images from local plants", "Train CNN and YOLOv8 detection models", "Deploy first IoT sensors"] },
      { phase: "Phase 2", months: "Months 7–12", title: "Pilot deployment", points: ["Install cameras and sensors in selected facilities", "Integrate with production lines", "Test and refine accuracy in real conditions"] },
      { phase: "Phase 3", months: "Months 13–24", title: "Scaling and commercialization", points: ["Expand to more facilities in both countries", "Train operators and staff", "Set up remote monitoring and partnerships"] },
    ],
  },
  machineVision: {
    headerEyebrow: "Machine vision",
    headerTitle: "Automated grain inspection",
    headerLead:
      "Cameras and neural networks check every maize grain on the line. A worker inspects about 100 kg per hour; this system inspects over 1,000 kg per hour with consistent results.",
    pipelineEyebrow: "The pipeline",
    pipelineTitle: "Six steps from camera to decision",
    steps: [
      { title: "Image acquisition", desc: "High-resolution cameras photograph maize on the conveyor at key points in the line." },
      { title: "Preprocessing", desc: "Frames are cleaned and segmented so each kernel can be analyzed separately." },
      { title: "Feature extraction", desc: "A CNN learns what separates healthy maize from moldy, broken or discolored grain." },
      { title: "YOLOv8 detection", desc: "The model reads the whole frame in one pass and locates every grain with a confidence score." },
      { title: "Classification", desc: "Grains are marked accepted, rejected, or flagged for a person to review." },
      { title: "Sorting", desc: "A pneumatic mechanism removes rejected grain from the line automatically." },
    ],
    demoEyebrow: "Real-time detection",
    demoTitle: "Fast enough for a moving belt",
    demoLead:
      "YOLOv8 reads the whole frame in a single pass, so it keeps up with a conveyor carrying 1,000 kg of maize per hour. Older methods like R-CNN and SSD scan region by region and cannot match production speed.",
    demoBody:
      "Clear defects trigger the reject mechanism automatically. Borderline grains are flagged on the operator dashboard for review, so people handle the judgment calls and the machine handles the volume.",
    defectsEyebrow: "Defect classes",
    defectsTitle: "What the model is trained to find",
    defectsLead:
      "The models are trained on thousands of maize images collected in Rwandan and Malawian facilities, so they recognize local grain varieties.",
    defects: [
      { name: "Healthy", verdict: "ACCEPT", desc: "Uniform color, intact kernel. Accepted for production." },
      { name: "Broken", verdict: "REJECT", desc: "Fractured or split kernels, caught by shape." },
      { name: "Mold / Aflatoxin", verdict: "REJECT", desc: "Fungal discoloration that manual sorting often misses." },
      { name: "Discoloration", verdict: "REJECT", desc: "Off-color kernels from spoilage or heat damage." },
      { name: "Foreign object", verdict: "REJECT", desc: "Stones, husks and debris removed before milling." },
    ],
  },
  maintenance: {
    headerEyebrow: "Predictive maintenance",
    headerTitle: "Fixing machines before they fail",
    headerLead:
      "Most small facilities repair equipment only after it breaks, losing production time and raw material with every stoppage. This project uses IoT sensors and LSTM networks to forecast failures and schedule service in advance.",
    dashboardEyebrow: "Dashboard preview",
    dashboardTitle: "The machine's vital signs in one view",
    dashboardLead:
      "A simulation of the operator dashboard. IoT sensors stream temperature, vibration and power data into an LSTM model that estimates when each machine will need service.",
    caseEyebrow: "Case study · Musanze District",
    caseTitle: "What one maize mill stands to gain",
    caseLead:
      "From the project proposal: a milling facility in Rwanda's Musanze District, before and after predictive maintenance.",
    scenario: [
      { value: 5, label: "Milling machines", sub: "3,000 kg of maize per day each" },
      { value: 2, label: "Breakdowns a month", sub: "Each causes a 12-hour delay" },
      { value: 2000, label: "kg of maize wasted", sub: "Per interruption" },
      { value: 600, suffix: "K RWF", label: "Lost every month", sub: "About $480" },
    ],
    outcomes: [
      "Breakdowns drop from twice a month to about once every six months",
      "Over 10 million RWF (about $8,000) saved each year",
      "Production continues and deliveries reach markets on time",
    ],
    industryNote:
      "The approach is proven at industrial scale. BMW and Volkswagen cut unexpected robotic-arm failures by over 25%, Boeing and GE Aviation reduced jet engine maintenance costs by up to 30%, and Siemens and Vestas raised wind farm efficiency by 20% using the same class of models.",
  },
  impact: {
    headerEyebrow: "Impact",
    headerTitle: "What the project changes",
    headerLead:
      "Better sorting means less wasted grain and safer flour. Predictive maintenance means mills keep running. The numbers below come from the project proposal and the studies it cites.",
    countersEyebrow: "Measured impact",
    countersTitle: "The numbers behind the project",
    countersLead: "Figures from the project proposal and the studies it cites.",
    stats: [
      { value: 10, suffix: "×", label: "Faster inspection", detail: "A worker inspects about 100 kg of maize per hour. The machine vision system inspects over 1,000 kg per hour on the same line." },
      { value: 30, prefix: "20–", suffix: "%", label: "Current rejection rate", detail: "Poor sorting and contamination currently reject 20 to 30% of maize. Automated sorting removes only grain that is actually defective." },
      { value: 25, suffix: "%", label: "Aflatoxin exposure in Malawi", detail: "A quarter of Malawian maize carries aflatoxin, a mold linked to liver disease. The system detects contamination that manual checks miss." },
      { value: 10, suffix: "M+ RWF", label: "Saved per facility, per year", detail: "A Musanze milling facility loses about 600,000 RWF a month to breakdowns. Predictive maintenance cuts that to a fraction." },
      { value: 65, suffix: "M RWF", label: "Rwanda activities budget", detail: "Covers research, technology development, deployment, training and scaling in Rwanda. Malawi activities are budgeted at 62 million." },
      { value: 4, prefix: "$", suffix: "B", label: "Regional losses at stake", detail: "Post-harvest food loss costs sub-Saharan Africa about four billion dollars a year. Better sorting directly reduces that loss." },
    ],
    qualitative: [
      { t: "Safer food", d: "Fewer aflatoxin-contaminated grains reach flour, lowering health risks for consumers in both countries." },
      { t: "Lower energy costs", d: "IoT data lets facilities schedule production around actual consumption instead of guesswork." },
      { t: "Less downtime", d: "Machines are serviced before they fail, so mills keep running and deliveries stay on time." },
      { t: "A trained workforce", d: "Postgraduate students and industry staff learn to build and run AI and IoT systems." },
    ],
    questionsEyebrow: "Research questions",
    questionsTitle: "What the project sets out to answer",
    questions: [
      "How can machine vision improve quality control in small-scale food processing?",
      "What role can IoT monitoring play in reducing waste and improving efficiency?",
      "How can predictive maintenance reduce equipment failures and downtime?",
      "How can IoT energy management make production more sustainable?",
      "How can IoT supply chain tracking improve logistics and inventory?",
    ],
    outputsEyebrow: "Research outputs",
    outputsTitle: "What the project produces",
    outputsLead: "Select a card for details.",
    outputs: [
      { title: "Journal publications", desc: "Peer-reviewed papers on the development and deployment of the machine vision and IoT systems." },
      { title: "Annotated maize datasets", desc: "Labeled grain images collected in Rwandan and Malawian facilities, built for defect detection research." },
      { title: "Open training materials", desc: "Case studies and training resources published openly on the project website." },
      { title: "Patents and licensing", desc: "Patentable technologies identified, filed and licensed to industry partners." },
      { title: "Workshops", desc: "Hands-on training for industry staff on operating and maintaining the systems." },
      { title: "Conference papers", desc: "Findings presented at national and international AI, IoT and food processing conferences." },
      { title: "Policy briefs", desc: "Recommendations for government agencies on adopting AI and IoT in manufacturing." },
      { title: "Two research labs", desc: "AI and IoT labs established at the University of Rwanda and the University of Malawi." },
    ],
  },
  team: {
    headerEyebrow: "Team",
    headerTitle: "The people behind the project",
    headerLead:
      "Led by the University of Rwanda with the University of Malawi, supported by industry partners, international institutions and government agencies.",
    leadsTitle: "Project leadership",
    coInvestigatorsTitle: "The research team",
    partnersEyebrow: "Partners",
    partnersTitle: "Industry, government and international collaboration",
    partnersLead:
      "Researchers spend 40 to 50% of their time at industry premises, developing and testing the systems where they will actually run.",
    capacity: [
      { v: "Postgraduate assistantships", l: "Students join system development, testing and deployment." },
      { v: "Two research labs", l: "AI and IoT labs established at UR and UNIMA." },
      { v: "Industry training", l: "Workshops for operators on running and maintaining the systems." },
    ],
  },
  contact: {
    headerEyebrow: "Contact",
    headerTitle: "Get in touch",
    headerLead:
      "We welcome funding agencies, government offices, universities, investors and food manufacturers.",
    email: "info@ur.ac.rw",
    formTitle: "Send a message",
    formLead: "For funding, partnership or research inquiries.",
    institutions: [
      { name: "University of Rwanda", role: "Primary host institution", where: "Kigali, Rwanda", lead: "Dr James Rwigema, Principal Investigator" },
      { name: "University of Malawi", role: "Collaborating institution", where: "Zomba, Malawi", lead: "Dr Dackson Masiyano, Principal Investigator" },
    ],
  },
};

// Fixed design assets assigned by list position (cycled if lists grow).
export const defectColors = ["#2f9e6e", "#e8a020", "#d64545", "#c07f22", "#7c5cbf"];
export const architectureIcons = [
  "camera", "acquisition", "processing", "cnn", "yolo", "classify",
  "reject", "iot", "cloud", "lstm", "dashboard",
];
export const outputIcons = [
  "journal", "dataset", "code", "patent", "training", "conference", "policy", "lab",
];
