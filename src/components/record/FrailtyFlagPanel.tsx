import { DetailList } from "../ui/DetailList";
import { formatFrailtyDate, frailtyRisks, prov, provenanceLine, type FrailtyRisk } from "../../data/frailty";
import type { Priority } from "../../data/patient";

export type FrailtyFlag = {
  id: string;
  level: Priority;
  label: string;
  status: string;
  rows: ReadonlyArray<readonly [string, string | undefined]>;
};

const dnacpr: FrailtyFlag = {
  id: "dnacpr",
  level: "high",
  label: "DNACPR in place",
  status: "In place",
  rows: [
    ["Decision", "Do not attempt CPR"],
    ["Recorded", formatFrailtyDate("2025-11-14")],
    ["Made by", "Dr Patel (GP), following discussion with the patient and family"],
    ["Source", provenanceLine(prov.gpPatel("5 days ago"))],
  ],
};

const fromRisk = (risk: FrailtyRisk): FrailtyFlag => ({
  id: risk.id,
  level: risk.level,
  label: risk.title,
  status: risk.status,
  rows: [
    ["Status", risk.status],
    ["Detail", risk.detail],
    ["About this flag", risk.explanation],
    ["Source", provenanceLine(risk.provenance)],
  ],
});

/** Alerts for the frailty view: DNACPR first, then the clinical risk indicators. Same data as the page. */
export const frailtyFlags: readonly FrailtyFlag[] = [dnacpr, ...frailtyRisks.map(fromRisk)];

export function FrailtyFlagPanel({ flag }: { flag: FrailtyFlag }) {
  return <DetailList rows={flag.rows.filter(([, value]) => value)} />;
}
