// Single source of truth for the (fictional) patient record shown on the Summary page.
// Risks feed the alert banners, the "Clinical risks and alerts" card and the safety-flag strip,
// so they can never disagree with each other.

export type Priority = "high" | "medium" | "low";

export type Risk = {
  id: string;
  level: Priority;
  title: string;
  /** Secondary line shown in lists */
  detail: string;
  /** Originating record, shown in the expanded detail */
  source: string;
  /** Present only for risks promoted to the alert banners at the top of the page */
  banner?: string;
};

export const risks: readonly Risk[] = [
  { id: "gestational-diabetes", level: "high", title: "Gestational diabetes", detail: "Diagnosed 5 September 2026 · Lab results", source: "Lab results", banner: "Diagnosed 5 September 2026" },
  { id: "penicillin-allergy", level: "high", title: "Penicillin allergy", detail: "Reaction: rash · GP record", source: "GP record", banner: "Reaction: rash" },
  { id: "body-mass-index", level: "medium", title: "High body mass index (32)", detail: "Added to record 15 August 2026 · BadgerNet Maternity", source: "BadgerNet Maternity", banner: "BMI 32 - requires monitoring" },
  { id: "mental-health", level: "medium", title: "Depression and anxiety (history)", detail: "Currently managed by Perinatal mental health team", source: "Maternity record", banner: "Currently managed by Perinatal mental health team" },
  { id: "sertraline", level: "medium", title: "Sertraline in pregnancy", detail: "50mg once daily · GP record", source: "GP record" },
  { id: "language", level: "medium", title: "Language need", detail: "Urdu interpreter required", source: "Maternity record" },
  { id: "safeguarding", level: "low", title: "Safeguarding", detail: "3 concerns on record · 1 active", source: "Maternity record" },
];

export const priorityLabel: Record<Priority, string> = {
  high: "High priority",
  medium: "Medium priority",
  low: "Low priority",
};

export type Condition = {
  name: string;
  status: string;
  source: string;
  recorded: string;
  recorder: string;
};

export const conditions: readonly Condition[] = [
  { name: "Gestational diabetes mellitus", status: "Active · Diagnosed 5 September 2026", source: "Lab results", recorded: "5 September 2026", recorder: "Maternity clinical team" },
  { name: "Depression and anxiety (history)", status: "Currently managed · Since 2022", source: "GP record", recorded: "15 August 2026", recorder: "Dr Sarah Wilson" },
  { name: "Obesity (body mass index 32)", status: "Active · Since 15 August 2026", source: "BadgerNet Maternity", recorded: "15 August 2026", recorder: "Maternity clinical team" },
];

export type Medicine = {
  name: string;
  dose: string;
  direction: string;
  source: string;
  /** ISO date, used for sorting only */
  started: string;
};

export const medicines: readonly Medicine[] = [
  { name: "Metformin", dose: "500mg", direction: "gestational diabetes mellitus management", source: "Diabetes service", started: "2026-09-12" },
  { name: "Sertraline", dose: "50mg", direction: "Once daily", source: "Dr Sarah Wilson (GP)", started: "2022-01-01" },
  { name: "Prenatal Vitamins", dose: "Standard", direction: "Once daily", source: "Midwife", started: "2026-08-15" },
];

export type ResultTone = "high" | "medium" | "low";

export type TestResult = {
  test: string;
  value: string;
  /** ISO date */
  date: string;
  status: string;
  tone: ResultTone;
};

export const results: readonly TestResult[] = [
  { test: "Oral glucose tolerance test (75 g)", value: "Fasting 5.6 · 2-hour 8.7 mmol/L", date: "2026-09-05", status: "Abnormal", tone: "high" },
  { test: "HbA1c", value: "41 mmol/mol", date: "2026-09-05", status: "Borderline", tone: "medium" },
  { test: "Full blood count", value: "Hb 122 · WCC 7.8 · Plt 262", date: "2026-08-15", status: "Normal", tone: "low" },
  { test: "HIV, hepatitis B and syphilis", value: "Negative", date: "2026-08-15", status: "Normal", tone: "low" },
  { test: "ABO blood group and rhesus D status", value: "A+", date: "2026-08-15", status: "Added to record", tone: "low" },
];

export type CarePlan = {
  title: string;
  updated: string;
  service: string;
  summary: string;
  planText: string;
  rows: ReadonlyArray<readonly [string, string]>;
};

export const carePlans: readonly CarePlan[] = [
  {
    title: "Wellbeing Support Plan",
    updated: "15 September 2026",
    service: "Perinatal mental health team",
    summary: "Regular contact; safety plan in place; partner involved; social services aware and supportive.",
    planText: "Safety plan in place; partner involved; social services aware and supportive.",
    rows: [
      ["Status", "Active"],
      ["Last updated", "15 September 2026"],
      ["Responsible service", "Perinatal mental health team"],
      ["Review frequency", "Regular contact"],
    ],
  },
  {
    title: "Gestational diabetes management",
    updated: "12 September 2026",
    service: "Diabetes service",
    summary: "Metformin 500mg; glucose monitoring 4 times a day; dietitian referral requested.",
    planText: "Metformin 500mg; glucose monitoring four times daily; dietitian referral requested.",
    rows: [
      ["Status", "Active"],
      ["Last updated", "12 September 2026"],
      ["Responsible service", "Diabetes service"],
      ["Lead clinician", "Dr James Chen"],
    ],
  },
];

export type ClinicalEvent = {
  date: string;
  setting: string;
  event: string;
  reason: string;
  organisation: string;
  clinician: string;
  source: string;
};

export const events: readonly ClinicalEvent[] = [
  { date: "15 September 2026", setting: "Community", event: "Perinatal mental health assessment", reason: "Wellbeing assessment completed. Safety plan reviewed.", organisation: "Community Perinatal Service", clinician: "Perinatal mental health team", source: "Perinatal mental health" },
  { date: "12 September 2026", setting: "Outpatient", event: "Gestational diabetes management", reason: "Metformin commenced. Glucose monitoring 4 times a day.", organisation: "Diabetes Antenatal Clinic", clinician: "Dr James Chen", source: "Diabetes service" },
  { date: "5 September 2026", setting: "Antenatal clinic", event: "Glucose tolerance test", reason: "Gestational diabetes mellitus confirmed following an abnormal oral glucose tolerance test.", organisation: "Antenatal Clinic", clinician: "Phlebotomy", source: "Lab results" },
  { date: "15 August 2026", setting: "Community", event: "Antenatal booking", reason: "Baseline observations and risk assessment completed.", organisation: "Community Midwifery - Central", clinician: "Midwife J. Davies", source: "BadgerNet Maternity" },
];

export type ClinicalDocument = {
  name: string;
  type: string;
  date: string;
  source: string;
  status: string;
  confidentiality: string;
};

export const documents: readonly ClinicalDocument[] = [
  { name: "Structured referral (GP)", type: "GP structured referral", date: "25 July 2026", source: "GP Referral", status: "Received", confidentiality: "Clinical" },
  { name: "Booking appointment summary", type: "Booking summary", date: "15 August 2026", source: "BadgerNet", status: "Document filed", confidentiality: "Clinical" },
  { name: "Diabetes clinic letter", type: "Clinic letter", date: "12 September 2026", source: "Diabetes service", status: "Document filed", confidentiality: "Clinical" },
  { name: "Wellbeing support plan", type: "Care plan", date: "15 September 2026", source: "Perinatal mental health team", status: "Document filed", confidentiality: "Clinical" },
  { name: "Interpreter booking confirmation", type: "Admin note", date: "20 September 2026", source: "Booking Office", status: "Document filed", confidentiality: "Admin" },
];

export const socialContext: ReadonlyArray<readonly [string, string]> = [
  ["Pregnancy", "Third pregnancy, 1 previous birth · 34 weeks and 1 day · estimated due date 15 November 2026"],
  ["Language", "Urdu · Interpreter required"],
  ["Living situation", "Lives with partner, Imran Khan"],
  ["Employment", "Retail assistant (part-time)"],
  ["Safeguarding", "No active concern recorded"],
  ["Next of kin", "Imran Khan · 07811 223344"],
  ["Phone", "07980782416"],
  ["Email", "leila.khan@example.com"],
  ["GP", "Dr Sarah Wilson · Central City Practice"],
  ["Ethnicity", "Asian / Asian British - Pakistani"],
  ["Blood group", "A+"],
  ["Previous pregnancies", "2 · No stillbirths"],
  ["Vaccinations", "Seasonal Flu and Pertussis completed"],
  ["Disability", "None recorded"],
];

export type UpcomingCare = {
  title: string;
  when: string;
  summary: string;
  rows: ReadonlyArray<readonly [string, string]>;
};

export const upcomingCare: readonly UpcomingCare[] = [
  {
    title: "34-week routine review",
    when: "5 October 2026, 9am",
    summary: "Community Midwifery - Central · Urdu interpreter booked",
    rows: [
      ["Date and time", "5 October 2026, 9am"],
      ["Care setting", "Community"],
      ["Organisation", "Community Midwifery - Central"],
      ["Clinician", "Midwife J. Davies"],
      ["Interpreter", "Urdu interpreter booked"],
      ["Status", "Scheduled"],
    ],
  },
  {
    title: "36-week growth scan",
    when: "16 October 2026, 11:10am",
    summary: "Ultrasound department · Scheduled due to gestational diabetes mellitus pathway",
    rows: [
      ["Date and time", "16 October 2026, 11:10am"],
      ["Care setting", "Outpatient"],
      ["Organisation", "Ultrasound Department"],
      ["Reason", "Scheduled due to gestational diabetes mellitus pathway"],
      ["Preparation", "Attend with maternity notes"],
      ["Status", "Scheduled"],
    ],
  },
];

export const careTeam: ReadonlyArray<readonly [name: string, service: string, detail: string]> = [
  ["Midwife J. Davies", "Community Midwifery - Central", "Last contact: 15 August 2026"],
  ["Dr James Chen", "Diabetes Antenatal Clinic", "Last contact: 12 September 2026"],
  ["Dr Sarah Wilson", "Central City Practice · GP", "Record updated: 5 October 2026"],
  ["Perinatal mental health team", "Community Perinatal Service", "Last contact: 15 September 2026"],
  ["Social services", "Supportive involvement", "Last update: 2 October 2026"],
  ["University Hospitals of Morecambe Bay", "Maternity hospital service", "Active service"],
];

const longDate = new Intl.DateTimeFormat("en-GB", { day: "numeric", month: "long", year: "numeric" });

/** Format an ISO date (yyyy-mm-dd) for display, e.g. "5 September 2026". */
export function formatDate(iso: string): string {
  return longDate.format(new Date(`${iso}T00:00:00`));
}

export const patient = {
  name: "Leila KHAN",
  age: 31,
  sex: "Female",
  dob: "14 June 1995",
  nhsNumber: "485 777 2910",
  address: "14 Ryelands Crescent, Lancaster, LA1 3PQ",
  gp: "Dr Sarah Wilson · Central City Practice",
  nextOfKin: "Imran Khan · 07811 223344",
  registeredIcb: "Surrey Heartlands Integrated Care Board (ICB)",
  viewingIcb: "NHS South East London ICB",
} as const;
