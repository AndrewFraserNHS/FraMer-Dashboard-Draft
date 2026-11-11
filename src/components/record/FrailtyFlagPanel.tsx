import { ReactNode } from "react";
import { Link } from "react-router-dom";
import { DetailList } from "../ui/DetailList";
import { formatFrailtyDate, frailtyRisks, prov, provenanceLine, type FrailtyRisk } from "../../data/frailty";
import type { Priority } from "../../data/patient";

export type FrailtyFlag = {
  id: string;
  level: Priority;
  label: string;
  status: string;
  rows: ReadonlyArray<readonly [string, ReactNode | undefined]>;
};

const dnacpr: FrailtyFlag = {
  id: "dnacpr",
  level: "high",
  label: "DNACPR in place",
  status: "In place",
  rows: [
    ["Recorded risk or assessment", "DNACPR decision in place"],
    [
      "Evidence",
      "Documented discussion with patient and family; copy held in GP record.",
    ],
    ["Score or tool", "Not applicable (clinical decision)"],
    ["Assessment date", formatFrailtyDate("2025-11-14")],
    ["Source", provenanceLine(prov.gpPatel("5 days ago"))],
    ["Current status", "Active and visible in shared frailty record"],
    ["Priority rationale", "High priority because resuscitation status changes emergency treatment decisions."],
    ["Linked action", <Link to="/frailty/care-plan">View advance care plan and DNACPR context</Link>],
  ],
};

const riskAssessmentDetails: Record<
  FrailtyRisk["id"],
  {
    recordedRisk: string;
    evidence: string;
    scoreTool?: string;
    assessmentDate?: string;
    linkedAction: ReactNode;
    rationale: string;
  }
> = {
  falls: {
    recordedRisk: "Recurrent falls risk",
    evidence: "4 falls in the last 3 months, including one ED attendance.",
    scoreTool: "Falls review and MDT frailty risk screen",
    assessmentDate: formatFrailtyDate("2026-01-22"),
    linkedAction: "Falls prevention programme and OT home assessment follow-up.",
    rationale: "High priority due to immediate injury risk and recent repeat incidents.",
  },
  safeguarding: {
    recordedRisk: "Self-neglect safeguarding concern",
    evidence: "Social care record flagged self-neglect with active monitoring.",
    scoreTool: "Adult safeguarding triage",
    assessmentDate: formatFrailtyDate("2026-02-02"),
    linkedAction: "Safeguarding review with social worker and care package checks.",
    rationale: "High priority because unresolved safeguarding concerns may lead to harm.",
  },
  polypharmacy: {
    recordedRisk: "Polypharmacy",
    evidence: "5 active medicines with frailty and falls context.",
    scoreTool: "Primary care medication risk review",
    assessmentDate: formatFrailtyDate("2026-02-06"),
    linkedAction: "Pharmacist-led medication optimisation and deprescribing review.",
    rationale: "High priority because medicine burden may contribute to falls and deconditioning.",
  },
  admission: {
    recordedRisk: "Risk of admission",
    evidence: "2 recent 111/urgent contacts and recent ED visit.",
    scoreTool: "Frailty MDT risk of deterioration assessment",
    assessmentDate: formatFrailtyDate("2026-02-05"),
    linkedAction: "Continue virtual ward follow-up and monitor breathlessness escalation.",
    rationale: "High priority because there is evidence of recent deterioration and acute contacts.",
  },
  delirium: {
    recordedRisk: "Delirium risk",
    evidence: "Possible cognitive impairment with acute fluctuation risk factors.",
    scoreTool: "4AT score 2",
    assessmentDate: formatFrailtyDate("2026-01-28"),
    linkedAction: "Delirium prevention plan and hydration/observation prompts in community care.",
    rationale: "Moderate priority as risk is present but currently managed in the community.",
  },
  carer: {
    recordedRisk: "Carer strain impacting continuity of care",
    evidence: "Primary carer reports reduced availability and increasing strain.",
    scoreTool: "Carer strain review (social care)",
    assessmentDate: formatFrailtyDate("2026-01-31"),
    linkedAction: "Carer assessment and respite planning through social care.",
    rationale: "Moderate priority because support remains in place but is fragile.",
  },
  bone: {
    recordedRisk: "Bone health risk",
    evidence: "FRAX review overdue with recurrent falls history.",
    scoreTool: "FRAX risk assessment (overdue)",
    assessmentDate: formatFrailtyDate("2026-02-06"),
    linkedAction: "Complete FRAX and osteoporosis review in primary care.",
    rationale: "Moderate priority due to elevated fracture vulnerability if falls continue.",
  },
  "bladder-bowel": {
    recordedRisk: "Bladder and bowel risk",
    evidence: "Incontinence and constipation concerns recorded in community care notes.",
    scoreTool: "Continence and bowel risk review",
    assessmentDate: formatFrailtyDate("2026-02-04"),
    linkedAction: "Continence management update and skin integrity monitoring.",
    rationale: "Moderate priority due to impact on dignity, skin breakdown risk and care burden.",
  },
};

const fromRisk = (risk: FrailtyRisk): FrailtyFlag => ({
  id: risk.id,
  level: risk.level,
  label: risk.title,
  status: risk.status,
  ...(() => {
    const detail = riskAssessmentDetails[risk.id];
    return {
      rows: [
        ["Recorded risk or assessment", detail.recordedRisk],
        ["Evidence", detail.evidence],
        ["Score or tool", detail.scoreTool ?? "Not recorded"],
        ["Assessment date", detail.assessmentDate ?? "Not recorded"],
        ["Source", provenanceLine(risk.provenance)],
        ["Current status", risk.status],
        ["Priority rationale", detail.rationale],
        ["Linked action", detail.linkedAction],
        ["About this flag", risk.explanation],
      ],
    };
  })(),
});

/** Alerts for the frailty view: DNACPR first, then the clinical risk indicators. Same data as the page. */
export const frailtyFlags: readonly FrailtyFlag[] = [dnacpr, ...frailtyRisks.map(fromRisk)];

export function FrailtyFlagPanel({ flag }: { flag: FrailtyFlag }) {
  return <DetailList rows={flag.rows.filter(([, value]) => value)} />;
}
