// Describes every editable content field for the admin "Website content" editor.
// Each section maps to a top-level key of SiteContent. "lines" fields hold a
// list of short strings, one per line (used for bullet points and questions).

export type FieldType = "text" | "textarea" | "number" | "lines";
export type Field = { key: string; label: string; type: FieldType };
export type ListDef = { key: string; label: string; itemNoun: string; item: Field[] };
export type Section = {
  key: string;
  title: string;
  blurb?: string;
  fields?: Field[];
  lists?: ListDef[];
};

export const contentSchema: Section[] = [
  {
    key: "home",
    title: "Home page",
    fields: [
      { key: "heroEyebrow", label: "Hero small line (above the headline)", type: "text" },
      { key: "heroTitle", label: "Hero headline", type: "textarea" },
      { key: "heroSubtitle", label: "Hero subheading", type: "textarea" },
      { key: "problemEyebrow", label: "\"The problem\" small line", type: "text" },
      { key: "problemTitle", label: "\"The problem\" heading", type: "text" },
      { key: "problemLead", label: "\"The problem\" lead paragraph", type: "textarea" },
      { key: "problemBody", label: "\"The problem\" second paragraph", type: "textarea" },
    ],
    lists: [
      {
        key: "heroStats",
        label: "Hero statistics (the four boxes)",
        itemNoun: "statistic",
        item: [
          { key: "value", label: "Number", type: "number" },
          { key: "suffix", label: "After the number (e.g. %, ×, kg/h)", type: "text" },
          { key: "label", label: "Label", type: "text" },
          { key: "hint", label: "Small note", type: "text" },
        ],
      },
      {
        key: "problemStats",
        label: "Problem statistics",
        itemNoun: "statistic",
        item: [
          { key: "prefix", label: "Before the number (e.g. 15–, $)", type: "text" },
          { key: "value", label: "Number", type: "number" },
          { key: "suffix", label: "After the number (e.g. %)", type: "text" },
          { key: "label", label: "Description", type: "textarea" },
          { key: "source", label: "Source", type: "text" },
        ],
      },
    ],
  },
  {
    key: "architecture",
    title: "System architecture (home)",
    fields: [
      { key: "eyebrow", label: "Small line", type: "text" },
      { key: "title", label: "Heading", type: "text" },
      { key: "lead", label: "Intro paragraph", type: "textarea" },
      { key: "hardwareNote", label: "Hardware note (bottom line)", type: "textarea" },
    ],
    lists: [
      {
        key: "nodes",
        label: "Components (each step in the diagram)",
        itemNoun: "component",
        item: [
          { key: "name", label: "Name", type: "text" },
          { key: "detail", label: "What it does", type: "textarea" },
        ],
      },
    ],
  },
  {
    key: "timeline",
    title: "Timeline (home)",
    fields: [
      { key: "eyebrow", label: "Small line", type: "text" },
      { key: "title", label: "Heading", type: "text" },
    ],
    lists: [
      {
        key: "phases",
        label: "Phases",
        itemNoun: "phase",
        item: [
          { key: "phase", label: "Phase label (e.g. Phase 1)", type: "text" },
          { key: "months", label: "Months (e.g. Months 1–6)", type: "text" },
          { key: "title", label: "Title", type: "text" },
          { key: "points", label: "Bullet points (one per line)", type: "lines" },
        ],
      },
    ],
  },
  {
    key: "machineVision",
    title: "Machine Vision page",
    fields: [
      { key: "headerEyebrow", label: "Page header small line", type: "text" },
      { key: "headerTitle", label: "Page header title", type: "text" },
      { key: "headerLead", label: "Page header lead", type: "textarea" },
      { key: "pipelineEyebrow", label: "Pipeline small line", type: "text" },
      { key: "pipelineTitle", label: "Pipeline heading", type: "text" },
      { key: "demoEyebrow", label: "Demo small line", type: "text" },
      { key: "demoTitle", label: "Demo heading", type: "text" },
      { key: "demoLead", label: "Demo lead paragraph", type: "textarea" },
      { key: "demoBody", label: "Demo second paragraph", type: "textarea" },
      { key: "defectsEyebrow", label: "Defects small line", type: "text" },
      { key: "defectsTitle", label: "Defects heading", type: "text" },
      { key: "defectsLead", label: "Defects intro", type: "textarea" },
    ],
    lists: [
      {
        key: "steps",
        label: "Pipeline steps",
        itemNoun: "step",
        item: [
          { key: "title", label: "Title", type: "text" },
          { key: "desc", label: "Description", type: "textarea" },
        ],
      },
      {
        key: "defects",
        label: "Defect classes",
        itemNoun: "defect class",
        item: [
          { key: "name", label: "Name", type: "text" },
          { key: "verdict", label: "Verdict (ACCEPT or REJECT)", type: "text" },
          { key: "desc", label: "Description", type: "textarea" },
        ],
      },
    ],
  },
  {
    key: "maintenance",
    title: "Predictive Maintenance page",
    fields: [
      { key: "headerEyebrow", label: "Page header small line", type: "text" },
      { key: "headerTitle", label: "Page header title", type: "text" },
      { key: "headerLead", label: "Page header lead", type: "textarea" },
      { key: "dashboardEyebrow", label: "Dashboard small line", type: "text" },
      { key: "dashboardTitle", label: "Dashboard heading", type: "text" },
      { key: "dashboardLead", label: "Dashboard intro", type: "textarea" },
      { key: "caseEyebrow", label: "Case study small line", type: "text" },
      { key: "caseTitle", label: "Case study heading", type: "text" },
      { key: "caseLead", label: "Case study intro", type: "textarea" },
      { key: "outcomes", label: "Outcomes (one per line)", type: "lines" },
      { key: "industryNote", label: "Industry note paragraph", type: "textarea" },
    ],
    lists: [
      {
        key: "scenario",
        label: "Case-study figures",
        itemNoun: "figure",
        item: [
          { key: "value", label: "Number", type: "number" },
          { key: "suffix", label: "After the number", type: "text" },
          { key: "label", label: "Label", type: "text" },
          { key: "sub", label: "Small note", type: "text" },
        ],
      },
    ],
  },
  {
    key: "impact",
    title: "Impact page",
    fields: [
      { key: "headerEyebrow", label: "Page header small line", type: "text" },
      { key: "headerTitle", label: "Page header title", type: "text" },
      { key: "headerLead", label: "Page header lead", type: "textarea" },
      { key: "countersEyebrow", label: "Figures small line", type: "text" },
      { key: "countersTitle", label: "Figures heading", type: "text" },
      { key: "countersLead", label: "Figures intro", type: "textarea" },
      { key: "questionsEyebrow", label: "Questions small line", type: "text" },
      { key: "questionsTitle", label: "Questions heading", type: "text" },
      { key: "questions", label: "Research questions (one per line)", type: "lines" },
      { key: "outputsEyebrow", label: "Outputs small line", type: "text" },
      { key: "outputsTitle", label: "Outputs heading", type: "text" },
      { key: "outputsLead", label: "Outputs intro", type: "textarea" },
    ],
    lists: [
      {
        key: "stats",
        label: "Impact figures (big numbers)",
        itemNoun: "figure",
        item: [
          { key: "prefix", label: "Before the number", type: "text" },
          { key: "value", label: "Number", type: "number" },
          { key: "suffix", label: "After the number", type: "text" },
          { key: "label", label: "Label", type: "text" },
          { key: "detail", label: "Detail", type: "textarea" },
        ],
      },
      {
        key: "qualitative",
        label: "Benefit points (four small boxes)",
        itemNoun: "benefit",
        item: [
          { key: "t", label: "Title", type: "text" },
          { key: "d", label: "Description", type: "textarea" },
        ],
      },
      {
        key: "outputs",
        label: "Research outputs",
        itemNoun: "output",
        item: [
          { key: "title", label: "Title", type: "text" },
          { key: "desc", label: "Description", type: "textarea" },
        ],
      },
    ],
  },
  {
    key: "team",
    title: "Team page (text)",
    blurb: "People and partners are edited in the Collaborators and Partners tabs. This edits the headings.",
    fields: [
      { key: "headerEyebrow", label: "Page header small line", type: "text" },
      { key: "headerTitle", label: "Page header title", type: "text" },
      { key: "headerLead", label: "Page header lead", type: "textarea" },
      { key: "leadsTitle", label: "Leadership heading", type: "text" },
      { key: "coInvestigatorsTitle", label: "Research team heading", type: "text" },
      { key: "partnersEyebrow", label: "Partners small line", type: "text" },
      { key: "partnersTitle", label: "Partners heading", type: "text" },
      { key: "partnersLead", label: "Partners intro", type: "textarea" },
    ],
    lists: [
      {
        key: "capacity",
        label: "Capacity building (three boxes)",
        itemNoun: "item",
        item: [
          { key: "v", label: "Title", type: "text" },
          { key: "l", label: "Description", type: "textarea" },
        ],
      },
    ],
  },
  {
    key: "contact",
    title: "Contact page",
    fields: [
      { key: "headerEyebrow", label: "Page header small line", type: "text" },
      { key: "headerTitle", label: "Page header title", type: "text" },
      { key: "headerLead", label: "Page header lead", type: "textarea" },
      { key: "email", label: "Contact email (form sends here)", type: "text" },
      { key: "formTitle", label: "Form heading", type: "text" },
      { key: "formLead", label: "Form intro", type: "textarea" },
    ],
    lists: [
      {
        key: "institutions",
        label: "Institutions shown",
        itemNoun: "institution",
        item: [
          { key: "name", label: "Name", type: "text" },
          { key: "role", label: "Role", type: "text" },
          { key: "where", label: "Location", type: "text" },
          { key: "lead", label: "Lead / contact person", type: "text" },
        ],
      },
    ],
  },
  {
    key: "project",
    title: "Footer",
    fields: [
      { key: "fullTitle", label: "Full project title", type: "textarea" },
      { key: "footerDescription", label: "Footer description", type: "textarea" },
      { key: "footerInstitutions", label: "Footer copyright line", type: "text" },
    ],
  },
];
