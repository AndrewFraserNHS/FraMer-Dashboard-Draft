import type { Priority } from "./patient";
import { createScenarioClock } from "../utils/dates";

/** The scenario treats 7 February 2026 as today (see the "N days ago" provenance labels). */
export const frailtyClock = createScenarioClock("2026-02-07");
export const formatFrailtyDate = frailtyClock.long;
export const formatFrailtyShortDate = frailtyClock.short;

/** Frailty record view: Harold Bennett. Single source for every frailty page, flag and banner. */

export const frailtyPatient = {
  name: "Harold BENNETT",
  age: 80,
  sex: "Male",
  dob: "15 June 1945",
  nhsNumber: "485 777 4136",
  address: "14 Elm Grove, Bromley, BR1 3PQ",
  gp: "Dr Sarah Wilson · Central City Practice",
  occupation: "Retired warehouse supervisor",
  nextOfKin: "Nick Bennett (son) · 07700 900 123",
  homeVisitFlags: "Animals in home: 2 dogs. Behavioural concern: wary of strangers. Firearms: no known firearm access.",
} as const;

// ── Provenance ───────────────────────────────────────────────────────────────

export type SourceKey = "gp" | "community" | "acute" | "social" | "urgent" | "mental-health";

export const sourceMeta: Record<SourceKey, { label: string; tone: "blue" | "green" | "orange" | "purple" | "grey" }> = {
  gp: { label: "GP", tone: "blue" },
  community: { label: "Community", tone: "green" },
  acute: { label: "Acute", tone: "orange" },
  social: { label: "Social", tone: "purple" },
  urgent: { label: "111", tone: "grey" },
  "mental-health": { label: "Mental health", tone: "green" },
};

export type Provenance = {
  source: SourceKey;
  org: string;
  setting: string;
  system: string;
  pulled: string;
  by: string;
};

const woodside = { source: "gp", org: "Woodside Health Centre", setting: "Primary care", system: "EMIS GP" } as const;
const communityOrg = { source: "community", org: "Community Health Services", setting: "Community care" } as const;
const acuteOrg = { source: "acute", org: "Croydon University Hospital", setting: "Acute care", system: "Oracle Health" } as const;
const socialOrg = { source: "social", org: "Croydon Council Adult Social Care", setting: "Social care", system: "Liquidlogic" } as const;

export const prov = {
  gpPatel: (pulled = "3 days ago"): Provenance => ({ ...woodside, pulled, by: "Dr Patel (GP)" }),
  gpPharmacist: { ...woodside, pulled: "3 days ago", by: "Hannah Green (GP pharmacist)" } as Provenance,
  gpNurse: { ...woodside, pulled: "3 days ago", by: "Emily Brown (Practice nurse)" } as Provenance,
  acute: (pulled = "7 days ago"): Provenance => ({ ...acuteOrg, pulled, by: "Dr Williams (Acute clinician)" }),
  socialWorker: (pulled = "2 weeks ago"): Provenance => ({ ...socialOrg, pulled, by: "Aisha Khan (Social worker)" }),
  safeguarding: { ...socialOrg, pulled: "5 days ago", by: "Mark Ellis (Safeguarding lead)" } as Provenance,
  districtNurse: (system = "EMIS Community", pulled = "2 weeks ago"): Provenance => ({ ...communityOrg, system, pulled, by: "Jane Smith (District nurse)" }),
  mdt: { ...communityOrg, system: "Frailty MDT notes", pulled: "3 days ago", by: "Jane Smith (District nurse)" } as Provenance,
  physio: { ...communityOrg, system: "Community therapy notes", pulled: "2 weeks ago", by: "Tom Edwards (Physiotherapist)" } as Provenance,
  urgent: { source: "urgent", org: "NHS 111 / South East London ICS", setting: "Urgent care", system: "NHS Pathways", pulled: "7 days ago", by: "NHS 111 clinician" } as Provenance,
  cmht: { source: "mental-health", org: "Croydon Mental Health Services", setting: "Community care", system: "ePJS", pulled: "7 days ago", by: "CMHT discharge record" } as Provenance,
} as const;

/** One line a screen reader or keyboard user can read without opening anything. */
export function provenanceLine(p: Provenance): string {
  return `${p.by}, ${p.org} · ${p.system} · pulled ${p.pulled}`;
}

// ── Snapshot ─────────────────────────────────────────────────────────────────

export const frailtyScale = {
  score: 6,
  previous: 5,
  label: "Moderately frail",
  updated: `${formatFrailtyShortDate("2026-02-06")}, 14:23`,
  provenance: prov.mdt,
} as const;

export const patientOverview = {
  paragraphs: [
    "80-year-old widower living alone with a 3x/day care package. CFS has increased recently with recurrent falls and breathlessness. Wife Dorothy passed away in 2022.",
    "Key risks: falls (4 in 3 months), safeguarding self-neglect flagged, FRAX overdue.",
    "Support: son (Nick Bennett) is primary carer and proxy; moderate carer strain reported. Daughter Rachel lives in Manchester.",
  ],
  assembledFrom: [prov.gpPatel(), prov.socialWorker("5 days ago"), prov.mdt],
} as const;

export type FrailtyRisk = {
  id: string;
  level: Priority;
  title: string;
  /** Short status shown as the callout title suffix, e.g. "Elevated" */
  status: string;
  detail?: string;
  /** Longer explanation, previously a hover tooltip */
  explanation?: string;
  provenance: Provenance;
};

export const frailtyRisks: readonly FrailtyRisk[] = [
  { id: "falls", level: "high", title: "Falls risk", status: "High", detail: "4 falls in the last 3 months", provenance: prov.gpPatel() },
  { id: "safeguarding", level: "high", title: "Safeguarding concerns", status: "Self-neglect flagged", provenance: prov.safeguarding },
  { id: "polypharmacy", level: "high", title: "Polypharmacy", status: "5 medications", provenance: prov.gpPharmacist },
  {
    id: "admission",
    level: "high",
    title: "Risk of admission",
    status: "Elevated",
    detail: "2 LAS calls in 3 months · Known to frailty team",
    explanation:
      `London Ambulance Service calls: 2 in the last 3 months. Known to frailty team: yes. Recent hospital contact: ED attendance ${formatFrailtyDate("2026-01-22")} (fall, no fracture). Recent change in care package: yes, increased to 3 visits a day.`,
    provenance: prov.acute(),
  },
  { id: "delirium", level: "medium", title: "Delirium risk", status: "Moderate", detail: `4AT score 2 (possible cognitive impairment), ${formatFrailtyDate("2026-01-28")}`, provenance: prov.acute() },
  {
    id: "carer",
    level: "medium",
    title: "Carer insights",
    status: "Moderate",
    detail: "Formal carer: no · Informal carer: yes (son, Nick Bennett)",
    explanation:
      "An informal carer is a family member or friend. A formal carer is from the voluntary sector, social care or similar. Son (Nick) reports reduced availability because of work commitments; moderate strain noted.",
    provenance: prov.socialWorker(),
  },
  { id: "bone", level: "medium", title: "Bone health risk", status: "FRAX overdue", provenance: prov.gpPatel() },
  {
    id: "bladder-bowel",
    level: "medium",
    title: "Bladder and bowel risk",
    status: "Risks noted",
    explanation: "Urinary incontinence, bowel incontinence, constipation and urinary retention are noted as risks being managed.",
    provenance: prov.districtNurse(),
  },
];

export type ServiceStatus = "Active care" | "Referral pending — awaiting further detail" | "Recently discharged";

export const services: readonly { name: string; status: ServiceStatus }[] = [
  { name: "Primary care", status: "Active care" },
  { name: "Social care", status: "Active care" },
  { name: "Community nursing", status: "Active care" },
  { name: "Community frailty service", status: "Active care" },
  { name: "Community therapy (OT/PT)", status: "Referral pending — awaiting further detail" },
  { name: "Falls service", status: "Referral pending — awaiting further detail" },
  { name: "Mental health services", status: "Recently discharged" },
];

export const serviceTone: Record<ServiceStatus, "green" | "orange" | "grey"> = {
  "Active care": "green",
  "Referral pending — awaiting further detail": "orange",
  "Recently discharged": "grey",
};

export type Trend = "up" | "down" | "stable";

export type Vital = {
  key: string;
  label: string;
  value: string;
  unit: string;
  trend: Trend;
  /** True when the direction of travel is clinically worrying. A rise or fall is not good or bad by itself. */
  concern?: boolean;
  trendNote: string;
  updated: string;
  provenance: Provenance;
  readings: readonly {
    date: string;
    value: string;
    by: string;
    system: string;
    height?: string;
    weight?: string;
  }[];
  summary6m: string;
  summary1y: string;
};

export const vitals: readonly Vital[] = [
  {
    key: "postural-bp",
    label: "Postural blood pressure",
    value: "116/72",
    concern: true,
    unit: "mmHg",
    trend: "down",
    trendNote: "Orthostatic drop when standing from 136/82",
    updated: formatFrailtyShortDate("2026-01-22"),
    provenance: prov.districtNurse(),
    summary6m: "Orthostatic drop recorded when standing",
    summary1y: "Postural hypotension risk persists and is being monitored",
    readings: [
      {
        date: formatFrailtyShortDate("2026-01-22"),
        value: "116/72 mmHg",
        by: "District nurse",
        system: "EMIS Community",
      },
      {
        date: formatFrailtyShortDate("2025-12-15"),
        value: "120/74 mmHg",
        by: "Practice nurse",
        system: "EMIS GP",
      },
      {
        date: formatFrailtyShortDate("2025-11-15"),
        value: "128/78 mmHg",
        by: "GP",
        system: "EMIS GP",
      },
    ],
  },
  {
    key: "pulse",
    label: "Pulse",
    value: "62",
    unit: "bpm",
    trend: "stable",
    trendNote: "Stable, 60 to 68 bpm range",
    updated: formatFrailtyShortDate("2026-01-22"),
    provenance: prov.districtNurse(),
    summary6m: "Pulse stable, 60 to 68 bpm range",
    summary1y: "No significant change over 1 year",
    readings: [
      {
        date: formatFrailtyShortDate("2026-01-22"),
        value: "62 bpm",
        by: "District nurse",
        system: "EMIS Community",
      },
      {
        date: formatFrailtyShortDate("2026-01-08"),
        value: "65 bpm",
        by: "District nurse",
        system: "EMIS Community",
      },
      {
        date: formatFrailtyShortDate("2025-12-15"),
        value: "68 bpm",
        by: "Practice nurse",
        system: "EMIS GP",
      },
      {
        date: formatFrailtyShortDate("2025-12-01"),
        value: "66 bpm",
        by: "Practice nurse",
        system: "EMIS GP",
      },
      {
        date: formatFrailtyShortDate("2025-11-01"),
        value: "63 bpm",
        by: "GP",
        system: "EMIS GP",
      },
      {
        date: formatFrailtyShortDate("2025-01-22"),
        value: "64 bpm",
        by: "GP",
        system: "EMIS GP",
      },
    ],
  },
  {
    key: "bmi",
    label: "BMI",
    value: "24.7",
    unit: "kg/m²",
    trend: "stable",
    trendNote: "Stable and within healthy range",
    updated: formatFrailtyShortDate("2026-01-22"),
    provenance: prov.gpNurse,
    summary6m: "BMI stable and in the healthy range",
    summary1y: "No significant change in BMI over the past year",
    readings: [
      {
        date: formatFrailtyShortDate("2026-01-22"),
        value: "24.7 kg/m²",
        by: "Practice nurse",
        system: "EMIS GP",
        weight: "80.2kg",
        height: "6'2\"",
      },
      {
        date: formatFrailtyShortDate("2025-12-01"),
        value: "25.1 kg/m²",
        by: "Practice nurse",
        system: "EMIS GP",
        weight: "80.2kg",
        height: "6'2\"",
      },
      {
        date: formatFrailtyShortDate("2025-10-01"),
        value: "25.4 kg/m²",
        by: "GP",
        system: "EMIS GP",
        weight: "80.2kg",
        height: "6'2\"",
      },
    ],
  },
  {
    key: "skin-integrity",
    label: "Skin integrity",
    value: "Grade 1",
    unit: "pressure damage",
    trend: "down",
    trendNote: "Skin remains intact with no new breakdown",
    updated: formatFrailtyShortDate("2026-01-22"),
    provenance: prov.districtNurse(),
    summary6m: "No new pressure damage or skin breakdown",
    summary1y: "Skin integrity has remained stable over the last year",
    readings: [
      {
        date: formatFrailtyShortDate("2026-01-22"),
        value: "Grade 1 pressure damage",
        by: "District nurse",
        system: "EMIS Community",
      },
      {
        date: formatFrailtyShortDate("2025-12-15"),
        value: "Grade 1 pressure damage",
        by: "Practice nurse",
        system: "EMIS GP",
      },
      {
        date: formatFrailtyShortDate("2025-10-01"),
        value: "Intact skin",
        by: "District nurse",
        system: "EMIS Community",
      },
    ],
  },
  {
    key: "glucose",
    label: "Blood glucose",
    value: "7.2",
    concern: true,
    unit: "mmol/L",
    trend: "up",
    trendNote: "Risen from about 6.4 to 7.2 mmol/L",
    updated: formatFrailtyShortDate("2026-01-22"),
    provenance: prov.gpNurse,
    summary6m: "Glucose risen from about 6.4 to 7.2 mmol/L",
    summary1y: "Upward trend, approaching the diabetic threshold",
    readings: [
      {
        date: formatFrailtyShortDate("2026-01-22"),
        value: "7.2 mmol/L",
        by: "Practice nurse",
        system: "EMIS GP",
      },
      {
        date: formatFrailtyShortDate("2025-12-01"),
        value: "7.0 mmol/L",
        by: "Practice nurse",
        system: "EMIS GP",
      },
      {
        date: formatFrailtyShortDate("2025-10-01"),
        value: "6.8 mmol/L",
        by: "GP",
        system: "EMIS GP",
      },
      {
        date: formatFrailtyShortDate("2025-08-01"),
        value: "6.6 mmol/L",
        by: "GP",
        system: "EMIS GP",
      },
      {
        date: formatFrailtyShortDate("2025-06-01"),
        value: "6.4 mmol/L",
        by: "GP",
        system: "EMIS GP",
      },
      {
        date: formatFrailtyShortDate("2025-01-22"),
        value: "6.3 mmol/L",
        by: "GP",
        system: "EMIS GP",
      },
    ],
  },
  {
    key: "ecg-bp",
    label: "ECG",
    value: "132/80",
    concern: true,
    unit: "mmHg",
    trend: "up",
    trendNote: "Mildly elevated compared with previous ECG readings",
    updated: formatFrailtyShortDate("2026-01-15"),
    provenance: prov.acute(),
    summary6m: "Slightly elevated compared with earlier ECG readings",
    summary1y: "ECG trend remains slightly above baseline",
    readings: [
      {
        date: formatFrailtyShortDate("2026-01-15"),
        value: "132/80 mmHg",
        by: "Cardiology nurse",
        system: "Oracle Health",
      },
      {
        date: formatFrailtyShortDate("2025-09-21"),
        value: "127/76 mmHg",
        by: "Cardiology team",
        system: "Oracle Health",
      },
      {
        date: formatFrailtyShortDate("2025-05-10"),
        value: "124/74 mmHg",
        by: "Cardiology team",
        system: "Oracle Health",
      },
    ],
  },
];

export type FrailtyCondition = { name: string; since: string; source: SourceKey };

export const frailtyConditions: readonly FrailtyCondition[] = [
  { name: "Type 2 diabetes mellitus", since: "2012", source: "gp" },
  { name: "Hypertension", since: "2008", source: "gp" },
  { name: "Chronic heart failure", since: "2019", source: "gp" },
  { name: "Chronic kidney disease stage 3a", since: "2020", source: "gp" },
  { name: "Dementia (mixed type)", since: "2024", source: "gp" },
];

export type FrailtyMedicine = {
  name: string;
  status: "Optimised" | "Review needed";
  frequency: string;
  reviewed?: string;
  provenance: Provenance;
};

export const frailtyMedicines: readonly FrailtyMedicine[] = [
  { name: "Amlodipine 5mg", status: "Optimised", frequency: "Once daily", reviewed: formatFrailtyShortDate("2025-12-10"), provenance: prov.gpPharmacist },
  { name: "Atorvastatin 20mg", status: "Optimised", frequency: "Once daily at night", reviewed: formatFrailtyShortDate("2025-12-10"), provenance: prov.gpPatel() },
  { name: "Aspirin 75mg", status: "Review needed", frequency: "Once daily", provenance: prov.gpPatel() },
  { name: "Ramipril 2.5mg", status: "Optimised", frequency: "Once daily", reviewed: formatFrailtyShortDate("2025-12-10"), provenance: prov.gpPatel() },
  { name: "Bisoprolol 2.5mg", status: "Review needed", frequency: "Once daily", provenance: prov.acute() },
];

export type TimelineEvent = { date: string; title: string; description: string; provenance: Provenance };

export const timeline: readonly TimelineEvent[] = [
  { date: formatFrailtyShortDate("2026-02-05"), title: "Virtual ward", description: "Remote monitoring via virtual ward for 3 days following increased breathlessness and fall risk.", provenance: { ...prov.mdt, pulled: "2 days ago", by: "Claire Hobbs (Virtual ward nurse)" } },
  { date: formatFrailtyShortDate("2026-02-04"), title: "Community visit", description: "District nurse wound care review.", provenance: prov.districtNurse("EMIS Community", "3 days ago") },
  { date: formatFrailtyShortDate("2026-02-02"), title: "Social work involvement", description: "Social worker reviewed care package and logged safeguarding concern.", provenance: prov.socialWorker("5 days ago") },
  { date: formatFrailtyShortDate("2026-01-31"), title: "Carer change", description: "Son (Nick Bennett) availability reduced (work commitments). Review requested.", provenance: prov.socialWorker("7 days ago") },
  { date: formatFrailtyShortDate("2026-01-29"), title: "111 call", description: "Patient called about increased breathlessness.", provenance: prov.urgent },
  { date: formatFrailtyShortDate("2026-01-22"), title: "ED visit", description: "Fall at home, no fracture.", provenance: prov.acute() },
  { date: formatFrailtyShortDate("2026-01-18"), title: "Therapy appointment", description: "Physiotherapy mobility assessment.", provenance: prov.physio },
];

export type FrailtyAppointment = {
  title: string;
  service: string;
  date: string;
  time: string;
  location: string;
  description: string;
  booked: string;
  provenance: Provenance;
};

export const frailtyAppointments: readonly FrailtyAppointment[] = [
  {
    title: "OT home assessment", service: "OT / Community therapy", date: formatFrailtyShortDate("2026-02-20"), time: "10:30", location: "Patient's home",
    description: "Home assessment for equipment review and environmental hazard reduction following recurrent falls.",
    booked: `Booked ${formatFrailtyShortDate("2026-02-06")} by Sarah Linton (OT co-ordinator)`,
    provenance: { ...prov.physio, pulled: "1 day ago", by: "Sarah Linton (OT co-ordinator)" },
  },
  {
    title: "Frailty MDT review", service: "Frailty team", date: formatFrailtyShortDate("2026-03-05"), time: "14:00", location: "Virtual (MS Teams)",
    description: "Follow-up multi-disciplinary review to reassess CFS score, medication optimisation and the falls prevention plan.",
    booked: `Booked ${formatFrailtyShortDate("2026-02-07")} by Laura Chen (Frailty co-ordinator)`,
    provenance: { ...prov.mdt, pulled: "1 day ago", by: "Laura Chen (Frailty co-ordinator)" },
  },
];

// ── Quick filters ────────────────────────────────────────────────────────────

export type SnapshotPanel =
  | "falls" | "mobility" | "household" | "carer" | "vitals" | "conditions" | "medicines" | "timeline" | "appointments";

export const snapshotFilters = [
  { value: "all", label: "All", panels: null },
  { value: "clinical", label: "Clinical", panels: ["vitals", "conditions", "medicines"] },
  { value: "functional", label: "Functional", panels: ["falls", "mobility", "household"] },
  { value: "social", label: "Social / carer", panels: ["carer", "household"] },
  { value: "risks", label: "Risks", panels: ["falls", "conditions", "medicines"] },
  { value: "medication", label: "Medication", panels: ["medicines"] },
  { value: "events", label: "Events", panels: ["timeline", "appointments"] },
] as const satisfies readonly { value: string; label: string; panels: readonly SnapshotPanel[] | null }[];

// ── CGA ──────────────────────────────────────────────────────────────────────

export const cfsOptions = [
  { value: "1", label: "1: Very fit", hint: "Robust, active, energetic and motivated. Exercise regularly and are among the fittest for their age." },
  { value: "2", label: "2: Well", hint: "No active disease symptoms but less fit than category 1. Often exercise or are very active occasionally." },
  { value: "3", label: "3: Managing well", hint: "Medical problems are well controlled, even if not regularly active beyond routine walking." },
  { value: "4", label: "4: Vulnerable", hint: "Not dependent on others for daily help, but symptoms often limit activities. Common complaint is being slowed up or tired." },
  { value: "5", label: "5: Mildly frail", hint: "More evident slowing and need help with high-order activities of daily living (finances, transportation, heavy housework)." },
  { value: "6", label: "6: Moderately frail", hint: "Need help with all outside activities and with keeping house. Inside, they often have problems with stairs and need help with bathing." },
  { value: "7", label: "7: Severely frail", hint: "Completely dependent for personal care from whatever cause (physical or cognitive). Even so, they seem stable and not at high risk of dying." },
  { value: "8", label: "8: Very severely frail", hint: "Completely dependent, approaching the end of life. Typically, they could not recover even from a minor illness." },
  { value: "9", label: "9: Terminally ill", hint: "Approaching the end of life. Applies to people with a life expectancy under 6 months who are not otherwise evidently frail." },
] as const;

export const mustOptions = [
  { value: "0", label: "0: Low risk" },
  { value: "1", label: "1: Moderate risk" },
  { value: "2", label: "2 or more: High risk" },
] as const;

export const yesNo = [
  { value: "yes", label: "Yes" },
  { value: "no", label: "No" },
] as const;

export type CgaOption = { value: string; label: string; hint?: string };

export type CgaField = {
  id: string;
  title: string;
  /** Free text, a single choice, or a set of radios */
  kind: "text" | "choice";
  /** Pre-populated from a connected system. Needs the clinician to accept, edit or reject. */
  prefill?: string;
  provenance?: Provenance;
  /** Guidance shown as visible hint text (never placeholder-only) */
  hint?: string;
  options?: readonly CgaOption[];
  initialChoice?: string;
  /** Flags the field as relating to a risk */
  risk?: boolean;
  /** Free-text fields that were prefilled can be edited; the rest are typed into directly */
  editable?: boolean;
  /** Cannot be skipped or removed in the step-by-step assessment */
  mandatory?: boolean;
};

export type CgaDomain = {
  id: string;
  title: string;
  risk?: boolean;
  prompts?: readonly { id: string; text: string }[];
  fields: readonly CgaField[];
};

const t = (id: string, title: string, hint?: string, extra: Partial<CgaField> = {}): CgaField => ({ id, title, kind: "text", hint, ...extra });
const p = (id: string, title: string, prefill: string, provenance: Provenance, hint?: string, extra: Partial<CgaField> = {}): CgaField => ({
  id, title, kind: "text", prefill, provenance, hint, editable: true, ...extra,
});

export const cgaSummary = [
  ["Clinical Frailty Scale", "6: Moderately frail"],
  ["Key issues", "Recurrent falls (4 in 3 months), polypharmacy (5 medications), declining weight, rising blood glucose, dementia (mixed type), delirium risk, self-neglect safeguarding concern, deteriorating hearing, dental concerns, carer strain escalating"],
  ["Recommended actions", "Falls prevention programme, OT home assessment (scheduled 20 February), pharmacist medication review, glycaemic management review, mental health support, carer strain assessment, audiological referral, dental assessment, ophthalmology follow-up"],
] as const;

export const cgaDomains: readonly CgaDomain[] = [
  {
    id: "physical",
    title: "Physical",
    risk: true,
    prompts: [
      { id: "ai-phys-1", text: "Recurrent falls pattern detected (4 falls in 3 months). High risk of serious injury. Recommend urgent falls prevention referral." },
      { id: "ai-phys-2", text: "Declining weight trend noted over the last 3 months (about 3 kg loss). MUST score elevated. Consider dietitian referral." },
      { id: "ai-phys-3", text: "Deteriorating hearing detected from carer reports. Consider referral for audiological assessment or hearing aids." },
      { id: "ai-phys-4", text: "Rising blood glucose values over the last 3 readings. Glycaemic management review recommended." },
    ],
    fields: [
      { id: "cfs", title: "Clinical Frailty Scale", kind: "choice", options: cfsOptions, initialChoice: "6", provenance: prov.mdt, mandatory: true },
      p("active-conditions", "Active conditions", "Type 2 diabetes (2012), hypertension (2008), chronic heart failure (2019), CKD stage 3a (2020), dementia, mixed type (2024)", prov.gpPatel()),
      p("history-presenting", "History of presenting condition", `80-year-old male with moderate frailty (CFS 6). 4 falls in the last 3 months, most recent ${formatFrailtyDate("2026-01-22")} resulting in ED attendance (no fracture). Episode of increased breathlessness ${formatFrailtyDate("2026-01-29")}, contact via 111 and subsequent virtual ward monitoring. Background of dementia (mixed type, 2024), chronic heart failure and type 2 diabetes. Carer strain noted; son's availability has recently reduced.`, prov.mdt),
      p("current-diagnosis", "Current diagnosis", "Type 2 diabetes mellitus (2012) · Hypertension (2008) · Chronic heart failure (2019) · Chronic kidney disease stage 3a (2020) · Dementia, mixed type (2024)", prov.gpPatel(), undefined, { editable: false }),
      t("past-medical", "Other significant past medical history", "Anything not captured in active conditions."),
      t("medication-review", "Medication review", "Document medication review findings here.", { risk: true }),
      t("smoking-drugs", "Smoking, drugs and alcohol", "Smoking status, alcohol intake, recreational drug use and history."),
      { id: "vital-signs", title: "Vital signs observations", kind: "choice", options: yesNo, hint: "Have vital signs been observed?" },
      t("ecg", "ECG", "ECG findings and interpretation."),
      p("weight-bmi", "Weight, height and BMI", "Weight: 54 kg (lost about 3 kg over 6 months). Height: not recorded. BMI: unable to calculate.", prov.districtNurse(), undefined, { editable: false }),
      p("bloods", "Bloods of note", "HbA1c: 68 mmol/mol (raised, reviewed by GP). eGFR: reduced, consistent with CKD stage 3a. No recent full blood count on record.", prov.gpPatel(), undefined, { editable: false }),
      p("falls-history", "Falls history", `4 falls in the last 3 months. Most recent: ${formatFrailtyDate("2026-01-22")}, ED attendance, no fracture. Previous falls on record via community and acute. Multifactorial falls intervention in place. Physiotherapy strength and balance programme ongoing (fortnightly).`, prov.acute(), "Add further detail here.", { risk: true, editable: false }),
      t("pain", "Pain", "Describe pain location, type and severity. Consider a pain scale such as PAINAD, Abbey or visual analogue scale."),
      t("pain-expression", "Differences expressing pain", "Any difficulties or differences in how the patient expresses pain."),
      t("eating-drinking", "Eating and drinking", "Eating and drinking habits, independence, any concerns."),
      t("appetite", "Appetite", "Current appetite and any recent changes."),
      t("swallowing", "Swallowing", "Any swallowing difficulties or concerns. Is speech and language therapy involved?"),
      t("feeding-equipment", "Feeding equipment", "Any specialised feeding equipment in use."),
      { id: "must-score", title: "MUST score", kind: "choice", options: mustOptions, hint: "Malnutrition Universal Screening Tool" },
      t("bladder", "Bladder function", "Bladder function details. Align with the catheter care section."),
      { id: "catheter", title: "Catheter", kind: "choice", options: yesNo },
      t("catheter-care", "Catheter care", "Type, size, date inserted, next change due."),
      t("bowel", "Bowel function", "Frequency, consistency, any concerns."),
      t("skin", "Skin integrity", "Skin integrity assessment. Include ulcer grades where applicable."),
      t("risk-score", "Risk score", "Consider Purpose T, Waterlow or Braden scale."),
      t("bone-health", "Bone health", "Bone health findings, DEXA results, fracture risk."),
      t("eyesight", "Eyesight", "Eyesight findings and any referrals required."),
      t("hearing", "Hearing", "Hearing assessment findings, aids in use, any referrals."),
      t("dental", "Dental health", "Dental health, dentures, oral hygiene, last review."),
      t("other-physical", "Other physical assessment findings", "Any other physical assessment findings not captured above."),
      t("physical-additional", "Additional details", "Any other relevant physical information."),
    ],
  },
  {
    id: "psychological",
    title: "Psychological",
    risk: true,
    prompts: [
      { id: "ai-psych-1", text: "PHQ-9 score 14 (moderate depression). Antidepressant therapy not currently prescribed. Consider mental health review." },
      { id: "ai-psych-2", text: "BPSD symptoms escalating: agitation and nocturnal wandering reported by carer. Consider non-pharmacological strategies first." },
    ],
    fields: [
      p("cognitive", "Cognitive assessment", "Dementia (mixed type) diagnosed 2024. Cognitive impairment noted by GP and community team. Formal cognitive testing to be completed during assessment.", prov.gpPatel(), "Add further detail here."),
      p("mood", "Mood and mental health", `Previously under community mental health for low mood following bereavement (wife Dorothy, deceased 2022). Discharged from CMHT with advice and a self-management plan (${frailtyClock.month("2025-12-10")}). No current mental health input. Carer strain from son may be contributing to low mood. Further assessment required.`, prov.cmht, "Add further detail here."),
      t("bpsd", "Behavioural and psychological symptoms", "To be completed during assessment."),
    ],
  },
  {
    id: "functional",
    title: "Functional",
    prompts: [
      { id: "ai-func-1", text: "Barthel Index score declining over the past 3 assessments. OT home assessment overdue, scheduled for 20 February but not yet completed." },
    ],
    fields: [
      p("mobility", "Mobility and transfers", `Indoors: walking stick. Outdoors: wheeled zimmer frame. Transfers: requires assistance of 1. Physio mobility assessment completed ${formatFrailtyDate("2026-01-18")} by Tom Edwards (physiotherapist).`, prov.physio, "Add further detail here."),
      t("adls", "Activities of daily living (ADLs)", "To be completed during assessment."),
      t("ot-home", "OT home assessment", "To be completed during assessment."),
    ],
  },
  {
    id: "social",
    title: "Social",
    risk: true,
    prompts: [
      { id: "ai-soc-1", text: "Carer strain indicators present. Zarit Burden score moderate. Explore respite care options urgently." },
      { id: "ai-soc-2", text: "Self-neglect safeguarding concern raised by community nurse. Adult safeguarding referral recommended." },
    ],
    fields: [
      p("carer-insights", "Carer insights", "Primary carer: son Nick Bennett (07700 900 123), lives locally. Contingency carer: daughter Rachel Bennett (07700 900 456), lives in Manchester. Formal: no. Informal: yes. Carer strain: moderate; son reporting reduced availability due to work commitments. Care package in place: 3 visits a day.", prov.socialWorker(), "Add further detail here.", { risk: true }),
      p("safeguarding", "Safeguarding", `Self-neglect risk flagged. Concern logged ${formatFrailtyDate("2026-02-02")} by Aisha Khan (social worker) following care package review. Patient declining some care visits. Safeguarding referral made to Croydon Council Adult Social Care. Status: under review.`, prov.safeguarding, "Add further detail here.", { risk: true }),
      p("isolation", "Social isolation and support networks", "Lives alone. Wife deceased (2022). Limited social contact noted. Son visits when work allows; daughter in Manchester. No voluntary sector input currently in place. Warm referral to Age UK suggested for social isolation support (status: pending).", prov.socialWorker("5 days ago"), "Add further detail here."),
    ],
  },
  {
    id: "personal",
    title: "Personal information",
    fields: [
      p("personal-main", "Personal information", "Preferred name: Harold. Language: English. Religion: Christian. Ethnicity: White British. Next of kin: Nick Bennett (son) · 07700 900 123.", prov.gpPatel()),
      t("able-phone", "Able to use phone", "To be completed during assessment."),
      t("preferred-contact", "Preferred method of contact", "Add any further detail here."),
      t("comms-support", "Support with communication", "Communication support needs, hearing aids, interpreter and so on."),
      p("contacts", "Personal contacts", "Son: Nick Bennett (primary carer) · 07700 900 123 · lives locally. Daughter: Rachel Bennett · 07700 900 456 · Manchester. Social worker: Aisha Khan · Croydon Council Adult Social Care.", prov.socialWorker("5 days ago"), undefined, { editable: false }),
      p("professionals", "Health and social care professionals or services", "GP: Dr Patel · Woodside Health Centre. District nurse: Jane Smith · Community Health Services. Social worker: Aisha Khan · Croydon Council Adult Social Care. Physiotherapist: Tom Edwards · Community Health Services. Frailty team: Laura Chen (co-ordinator). OT: Sarah Linton (co-ordinator), awaiting allocation.", prov.mdt),
      t("personal-additional", "Additional details", "Any other relevant personal information."),
    ],
  },
  {
    id: "environmental",
    title: "Environmental",
    fields: [
      p("lives-with", "Who they live with", "Lives alone. Son Nick Bennett (primary carer) lives locally. Daughter Rachel Bennett lives in Manchester. Care package: 3 visits a day.", prov.socialWorker()),
      t("access", "Access to property", "Steps, ramps, key access and so on."),
      p("accommodation", "Type of accommodation", "Ground floor flat. Council property (Croydon Council). No steps at entrance. Support required for transport.", prov.socialWorker()),
      t("property-issues", "Issues identified with this property", "Damp, disrepair, hazards, accessibility issues and so on.", { risk: true }),
      t("housing-plan", "Plan to address housing issues", "Plans to resolve any identified housing issues."),
      t("evacuation", "Emergency evacuation plan", "Details of the emergency evacuation plan."),
      p("key-safe", "Key safe details", "Key safe present. Location: front door, left of frame. Code held by the district nursing team. Confirm the code with Jane Smith (district nurse) before the visit.", prov.districtNurse("EMIS Community", "3 days ago")),
      t("pets", "Pets", "Details of any pets in the home."),
      t("keeping-safe", "Keeping safe at home and in the community", "Safety concerns, telecare, assistive technology, community safety and so on.", { risk: true }),
      t("environmental-additional", "Additional details", "Any other relevant environmental information."),
    ],
  },
  {
    id: "wishes",
    title: "Future wishes",
    fields: [
      p("dnacpr", "DNACPR", `DNACPR in place. Decision made ${formatFrailtyDate("2025-11-14")} by Dr Patel (GP) following discussion with patient and family. Documented in EMIS GP. Copy held at Woodside Health Centre.`, prov.gpPatel("5 days ago")),
      t("place-of-care", "Preferred place of care and death", "To be completed during assessment."),
      p("lpa", "Lasting power of attorney", "LPA status: not confirmed on record. To be verified with patient and family during assessment. Son Nick Bennett (07700 900 123) may hold authority.", prov.gpPatel()),
    ],
  },
  {
    id: "goals",
    title: "Patient goals",
    fields: [
      t("daily-life", "Daily life and interests", "What does their day look like? Hobbies, routines, activities they enjoy."),
      t("important", "What is important to them, and their preferences and wishes", "To be completed during assessment."),
      t("concerns", "Concerns and wellbeing", "Any concerns the patient has about their health, wellbeing or situation."),
      t("goals", "Goals", "Specific goals the patient would like to work towards."),
      t("goals-additional", "Additional details", "Any other relevant information about the patient's goals."),
    ],
  },
];

// ── Care plan ────────────────────────────────────────────────────────────────

export type ActionStatus = "Pending" | "Active" | "Suggested" | "Referred" | "Completed";

export const actionTone: Record<ActionStatus, "orange" | "green" | "purple" | "blue"> = {
  Pending: "orange",
  Active: "green",
  Suggested: "purple",
  Referred: "blue",
  Completed: "green",
};

export type CarePlanAction = {
  title: string;
  status: ActionStatus;
  owner: string;
  timescale: string;
  service: string;
};

export type CarePlanDomain = {
  id: string;
  title: string;
  risk?: Priority;
  text: string;
  actions: readonly CarePlanAction[];
};

export const carePlanDomains: readonly CarePlanDomain[] = [
  {
    id: "falls", title: "Falls prevention", risk: "high",
    text: "Multifactorial falls intervention in place. Patient requires:\n• Ongoing physiotherapy strength and balance programme (fortnightly)\n• OT home assessment for equipment review and environmental hazard reduction\n• Medication review focusing on postural hypotension risk\n• Evening and night safety measures: sensor lighting, bed rail assessment\n• Footwear assessment and advice\n• Weight monitoring (weekly)",
    actions: [
      { title: "Occupational therapy home assessment", status: "Referred", owner: "Community OT", timescale: "At home visit", service: "Community OT" },
      { title: "Physiotherapy: strength and balance programme", status: "Active", owner: "Community physio", timescale: "Fortnightly", service: "Community physio" },
      { title: "Medication review: postural hypotension risk", status: "Pending", owner: "GP / pharmacist", timescale: "At home visit", service: "Primary care" },
      { title: "Sensor lighting and bed rail assessment", status: "Suggested", owner: "Community OT", timescale: "With OT visit", service: "Community OT" },
    ],
  },
  {
    id: "medical", title: "Medical management", risk: "high",
    text: "Active medical management priorities:\n• Polypharmacy review with deprescribing where appropriate, focusing on falls-related medications\n• Glycaemic management review: HbA1c recheck, dietary input if needed\n• Heart failure monitoring (weight, fluid balance, symptoms)\n• CKD stage 3a: renal function monitoring (6-monthly)\n• Ophthalmology follow-up: cataract progression assessment and falls contribution\n• Audiological referral: formal hearing assessment based on carer concerns\n• Dental assessment: urgent referral to community dental service",
    actions: [
      { title: "Polypharmacy review with deprescribing", status: "Pending", owner: "GP", timescale: "1 week", service: "Primary care" },
      { title: "Diabetes and heart failure monitoring", status: "Active", owner: "Practice nurse", timescale: "Monthly", service: "Primary care" },
      { title: "Ophthalmology referral: cataract assessment", status: "Suggested", owner: "GP", timescale: "2 weeks", service: "Secondary care" },
      { title: "Audiological assessment referral", status: "Suggested", owner: "GP", timescale: "2 weeks", service: "Audiology" },
      { title: "Community dental service referral", status: "Suggested", owner: "GP / district nurse", timescale: "1 week", service: "Community dental" },
    ],
  },
  {
    id: "mental", title: "Mental health and wellbeing", risk: "medium",
    text: "Mental health and cognitive support plan:\n• IAPT referral for low mood management, adapted for cognitive impairment\n• Social prescribing: reconnect with community activities, reduce isolation\n• Delirium prevention: hydration, sleep hygiene, medication review\n• Sundowning management: structured evening routine, lighting adjustments\n• Regular mood monitoring by district nurse and social worker\n• Bereavement support consideration: wife passed 2022, ongoing grief",
    actions: [
      { title: "IAPT referral for low mood management", status: "Pending", owner: "GP", timescale: "2 weeks", service: "IAPT / talking therapies" },
      { title: "Social prescribing: community reconnection", status: "Suggested", owner: "Social prescriber", timescale: "Within 1 month", service: "Primary care network" },
      { title: "Delirium prevention plan implementation", status: "Active", owner: "District nurse / GP", timescale: "Ongoing", service: "Community / primary care" },
      { title: "Sundowning management protocol", status: "Suggested", owner: "District nurse", timescale: "At next home visit", service: "Community nursing" },
    ],
  },
  {
    id: "functional", title: "Functional independence",
    text: "Functional independence support plan:\n• Rollator with seat in use; environmental modifications completed\n• Ongoing physiotherapy strength and balance programme (fortnightly)\n• ADL support from home carer 3 times a day: personal care, dressing, meal preparation\n• Raised toilet seat ordered; installation pending\n• Monthly OT check-in to monitor home safety and equipment needs",
    actions: [
      { title: "OT home assessment", status: "Completed", owner: "Community OT", timescale: `Completed ${formatFrailtyDate("2026-02-24")}`, service: "Community OT" },
      { title: "Physiotherapy: ongoing mobility programme", status: "Active", owner: "Community physio", timescale: "Fortnightly", service: "Community physio" },
    ],
  },
  {
    id: "social", title: "Carer support and social", risk: "high",
    text: "Carer and social support plan:\n• Care package confirmed: 3 visits a day (morning, midday, evening)\n• Safeguarding concern (self-neglect) logged and under review\n• Carer assessment for son arranged through social worker\n• Social isolation support: warm referral to Age UK day service\n• Emergency plan in place: son as named emergency contact",
    actions: [
      { title: "Adult safeguarding referral: self-neglect", status: "Referred", owner: "Aisha Khan (social worker)", timescale: "Urgent, within 5 days", service: "Croydon Adult Social Care" },
      { title: "Carer assessment and respite support", status: "Referred", owner: "Social work team", timescale: "Within 2 weeks", service: "Local authority" },
      { title: "Age UK social isolation referral", status: "Suggested", owner: "Social prescriber", timescale: "Within 1 month", service: "Voluntary sector" },
    ],
  },
  {
    id: "goals", title: "Patient goals and future wishes", risk: "low",
    text: "Patient goals and advance care plan:\n• Remain at home with support; preferred place of care documented\n• DNACPR in place and reviewed with patient and son\n• LPA (health and welfare) status unconfirmed, to be verified with family\n• Faith community visits welcomed; chaplain referral offered\n• Priority: reduce falls, maintain independence with personal care",
    actions: [
      { title: "Advance care planning: preferred place of care documentation", status: "Pending", owner: "Dr Patel (GP)", timescale: "Next MDT review", service: "Frailty team" },
      { title: "Spiritual / pastoral care referral", status: "Suggested", owner: "Frailty co-ordinator", timescale: "Within 2 weeks", service: "Chaplaincy / voluntary" },
    ],
  },
];

export const riskTone: Record<Priority, "red" | "orange" | "green"> = { high: "red", medium: "orange", low: "green" };
export const riskLabel: Record<Priority, string> = { high: "High risk", medium: "Moderate risk", low: "Low risk" };

export const ownerOptions = ["GP", "GP / pharmacist", "District nurse", "Community OT", "Community physio", "Social worker", "Frailty co-ordinator"] as const;
export const serviceOptions = ["Primary care", "Community nursing", "Community OT", "Community physio", "Adult social care", "Frailty team", "Voluntary sector"] as const;
export const timescaleOptions = ["Urgent, within 5 days", "Within 1 week", "Within 2 weeks", "Within 1 month", "At next home visit", "Next MDT review", "Ongoing"] as const;

export type PlanVersion = {
  title: string;
  status: "Active" | "Completed" | "Superseded" | "Discharged";
  date: string;
  description: string;
  files: readonly string[];
};

export const planHistory: readonly PlanVersion[] = [
  { title: `Care plan (${formatFrailtyShortDate("2026-02-06")})`, status: "Active", date: `Last updated ${formatFrailtyShortDate("2026-02-06")}`, description: "Auto-generated from CGA. Pending MDT sign-off.", files: ["CGA_Summary_060226.pdf", "Frailty_Snapshot_060226.pdf"] },
  { title: `Falls prevention plan (${formatFrailtyShortDate("2025-12-12")})`, status: "Completed", date: `Last updated ${formatFrailtyShortDate("2025-12-12")}`, description: "", files: ["Physio_Report_121225.pdf"] },
  { title: `Social care support plan (${formatFrailtyShortDate("2025-10-03")})`, status: "Superseded", date: `Last updated ${formatFrailtyShortDate("2025-10-03")}`, description: "Care package increased to 3 visits a day; carer review requested.", files: ["Social_Care_Review_031025.pdf", "Carer_Assessment_031025.pdf"] },
  { title: `Mental health support plan (${formatFrailtyShortDate("2025-12-15")})`, status: "Discharged", date: `Last updated ${formatFrailtyShortDate("2025-12-15")}`, description: "CMHT involvement ended; advice and self-management plan.", files: ["CMHT_Discharge_151225.pdf"] },
];

export const planStatusTone: Record<PlanVersion["status"], "green" | "grey"> = {
  Active: "green", Completed: "green", Superseded: "grey", Discharged: "grey",
};

export const frailtyConnectedSystems = [
  { name: "EMIS GP (Woodside Health Centre)", updated: `${formatFrailtyDate("2026-02-06")}, 9:12am`, status: "primary" },
  { name: "EMIS Community", updated: `${formatFrailtyDate("2026-02-05")}, 4:20pm`, status: "connected" },
  { name: "Frailty MDT notes", updated: `${formatFrailtyDate("2026-02-06")}, 2:23pm`, status: "connected" },
  { name: "Community therapy notes", updated: `${formatFrailtyDate("2026-02-05")}, 11:40am`, status: "connected" },
  { name: "Oracle Health (Croydon University Hospital)", updated: `${formatFrailtyDate("2026-01-31")}, 8:05am`, status: "connected" },
  { name: "Liquidlogic (Adult Social Care)", updated: `${formatFrailtyDate("2026-02-02")}, 3:30pm`, status: "connected" },
  { name: "NHS Pathways (111)", updated: `${formatFrailtyDate("2026-01-29")}, 10:15am`, status: "connected" },
  { name: "Mental health (ePJS)", updated: `${formatFrailtyDate("2026-01-30")}, 9:00am`, status: "partial", gap: "care coordinator notes and crisis plans are not shared with this record" },
] as const;
