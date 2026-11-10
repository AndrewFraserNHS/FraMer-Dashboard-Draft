import { patient as maternityPatient } from "./data/patient";
import { frailtyPatient } from "./data/frailty";
import type { FilterDefinition } from "./components/shell/RecordFilterBar";

/**
 * Record views. Each view is configuration: who the patient is, which tabs it has, and which
 * page tools apply. The shell reads this, so adding a view means adding an entry, not editing the shell.
 */
export type ViewKey = "maternity" | "frailty";

export type PatientSummary = {
  name: string;
  age: number;
  sex: string;
  dob: string;
  nhsNumber: string;
  address: string;
  gp: string;
  nextOfKin: string;
  /** When both are set and differ, the patient bar shows the cross-boundary notice */
  registeredIcb?: string;
  viewingIcb?: string;
};

export type RecordViewConfig = {
  key: ViewKey;
  /** Name shown in the Record view control */
  label: string;
  /** Where the view lands */
  home: string;
  tabs: ReadonlyArray<readonly [label: string, path: string]>;
  patient: PatientSummary;
  /** Section reordering is only meaningful where the Summary page is a list of reorderable cards */
  canReorder: boolean;
  /** Filter bar contents. Omit when the view has no filters. */
  filters?: readonly FilterDefinition[];
};

export const recordViews: Record<ViewKey, RecordViewConfig> = {
  maternity: {
    key: "maternity",
    label: "Maternity",
    home: "/",
    patient: maternityPatient,
    canReorder: true,
    filters: [
      { label: "Care setting", options: ["All care settings", "Community maternity", "Antenatal clinic", "Outpatient", "Inpatient"] },
      { label: "Event type", options: ["All event types", "Appointments", "Scans", "Investigations", "Reviews"] },
      { label: "Organisation", options: ["All organisations", "BadgerNet Maternity", "Central City Practice", "Community Perinatal Service", "Diabetes Antenatal Clinic"] },
      { label: "Specialty", options: ["All specialties", "Maternity", "Diabetes", "Perinatal mental health", "Ultrasound"] },
      { label: "Date range", options: ["All time", "Last 7 days", "Last 30 days", "This pregnancy"] },
    ],
    tabs: [
      ["Summary", "/"],
      ["Pregnancy", "/pregnancy"],
      ["Appointments", "/appointments"],
      ["Results", "/results"],
      ["Conditions", "/comorbidities"],
      ["Care plans", "/care-plans"],
      ["Documents", "/documents"],
      ["Audit", "/audit"],
    ],
  },
  frailty: {
    key: "frailty",
    label: "Frailty",
    home: "/frailty",
    patient: frailtyPatient,
    canReorder: false,
    tabs: [
      ["Frailty snapshot", "/frailty"],
      ["CGA", "/frailty/cga"],
      ["Care plan", "/frailty/care-plan"],
    ],
  },
};

/** The route decides the view. A path under /frailty is the frailty record; everything else is maternity. */
export function viewForPath(pathname: string): ViewKey {
  return pathname === "/frailty" || pathname.startsWith("/frailty/") ? "frailty" : "maternity";
}

export const viewByLabel = (label: string): RecordViewConfig | undefined =>
  Object.values(recordViews).find((view) => view.label === label);

/** Every NCRS record view. Only some have data for a given patient. */
export const allViewLabels = [
  "Core record", "Cancer", "Children and young people", "Diagnostics", "Frailty",
  "Long-term conditions", "Maternity", "Mental health", "Planned and elective care",
] as const;
