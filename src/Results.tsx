import { useState } from "react";
import { DataSection } from "./components/ui/DataSection";
import { DataTable } from "./components/ui/DataTable";
import { FactsGrid } from "./components/ui/DetailList";
import { RecordPage } from "./components/ui/RecordPage";
import { SourceTag, StatusTag, TagTone } from "./components/ui/StatusTag";
import { Subsection } from "./components/ui/Subsection";
import { ToggleGroup } from "./components/ui/ToggleGroup";
import { dateKey } from "./utils/sort";

type Status = "Normal" | "Abnormal" | "Borderline" | "Declined" | "Awaiting";

const statusTone: Record<Status, TagTone> = {
  Normal: "green",
  Abnormal: "red",
  Borderline: "yellow",
  Declined: "grey",
  Awaiting: "blue",
};

/** One status mapping for every table, so a value can never be shown with the wrong status. */
function ResultStatus({ status }: { status: Status }) {
  return <StatusTag tone={statusTone[status]}>{status}</StatusTag>;
}

type LabRow = { test: string; result: string; range: string; status: Status };
type LabGroup = { label: string; rows: readonly LabRow[] };

const normal = (test: string, result: string, range: string): LabRow => ({ test, result, range, status: "Normal" });

const haematology: readonly LabGroup[] = [
  {
    label: "Full blood count",
    rows: [
      normal("Haemoglobin (Hb)", "122 g/L", "115–160 g/L"),
      normal("MCV", "88 fL", "80–100 fL"),
      normal("Platelets (Plt)", "262 × 10⁹/L", "150–400 × 10⁹/L"),
      normal("White cell count (WCC)", "7.8 × 10⁹/L", "4.0–11.0 × 10⁹/L"),
    ],
  },
  {
    label: "Blood group and antibody screen",
    rows: [
      normal("ABO group", "A", "—"),
      normal("Rh factor", "Positive (D+)", "—"),
      normal("Irregular antibodies", "Not detected", "Not detected"),
    ],
  },
  {
    label: "Haemoglobinopathy screening",
    rows: [
      normal("Sickle cell screen", "Negative (AA)", "Negative"),
      normal("Thalassaemia carrier status", "Low risk (MCH >27 pg)", "Low risk"),
    ],
  },
];

const infection: readonly LabGroup[] = [
  {
    label: "Infectious screening",
    rows: [
      normal("Rubella immune status", "Immune", "Immune"),
      normal("Syphilis serology", "Negative", "Negative"),
      normal("HIV status", "Negative", "Negative"),
      normal("Hepatitis B surface antigen", "Negative", "Negative"),
      normal("Hepatitis C antibody", "Negative", "Negative"),
    ],
  },
];

const metabolic: readonly LabGroup[] = [
  { label: "Thyroid function", rows: [normal("TSH", "1.8 mIU/L", "0.3–4.2 mIU/L")] },
];

function LabGroups({ caption, groups }: { caption: string; groups: readonly LabGroup[] }) {
  return (
    <>
      {groups.map((group) => (
        <Subsection key={group.label} title={group.label}>
          <DataTable
            caption={`${caption}: ${group.label}`}
            rows={group.rows}
            rowKey={(row) => row.test}
            columns={[
              { header: "Test", cell: (r) => <strong>{r.test}</strong>, sort: (r) => r.test },
              { header: "Result", cell: (r) => r.result },
              { header: "Reference range", cell: (r) => r.range },
              { header: "Status", cell: (r) => <ResultStatus status={r.status} />, sort: (r) => r.status },
            ]}
          />
        </Subsection>
      ))}
    </>
  );
}

const attention = [
  { name: "Fasting glucose from oral glucose tolerance test", value: "5.6 mmol/L (reference range below 5.1)", date: "5 September 2026", note: "Gestational diabetes mellitus confirmed. Referred to the Diabetes Antenatal Clinic.", status: "Abnormal" as const },
  { name: "2-hour glucose from oral glucose tolerance test", value: "8.7 mmol/L (reference range below 7.8)", date: "5 September 2026", note: "Glucose monitoring started 4 times a day.", status: "Abnormal" as const },
  { name: "HbA1c", value: "41 mmol/mol (reference range below 42)", date: "5 September 2026", note: "Borderline elevated. Continue monitoring via diabetes clinic.", status: "Borderline" as const },
  { name: "Urine dipstick glucose", value: "+1", date: "12 September 2026", note: "Consistent with gestational diabetes mellitus. Continue glucose monitoring.", status: "Borderline" as const },
];

const antenatal = [
  { test: "Combined first trimester screening", detail: "T21: 1:5400 · T18: 1:12000 · T13: < 1:20000", date: "2 August 2026", result: "Low risk", source: "Screening Service", status: "Normal" as const },
  { test: "NIPT (cfDNA)", detail: "Not requested — combined screening low risk", date: "—", result: "Not performed", source: "—", status: "Normal" as const },
  { test: "Quadruple test", detail: "Not applicable — combined screening completed", date: "—", result: "Not performed", source: "—", status: "Normal" as const },
  { test: "Oral glucose tolerance test (75 g)", detail: "Fasting 5.6 mmol/L (reference below 5.1) · 2-hour 8.7 mmol/L (reference below 7.8). Gestational diabetes mellitus confirmed.", date: "5 September 2026", result: "Abnormal", source: "UHMB Biochemistry", status: "Abnormal" as const },
  { test: "Group B Strep (GBS)", detail: "Patient declined GBS screening", date: "—", result: "Declined", source: "BadgerNet Maternity", status: "Declined" as const },
];

const dipstick = [
  { date: "15 August 2026", protein: "Negative", glucose: "Negative", leucocytes: "Negative", nitrites: "Negative", clinician: "Midwife J. Davies", raised: "" },
  { date: "5 September 2026", protein: "Negative", glucose: "Trace", leucocytes: "Negative", nitrites: "Negative", clinician: "Phlebotomy Team", raised: "yellow" },
  { date: "12 September 2026", protein: "Negative", glucose: "+1", leucocytes: "Negative", nitrites: "Negative", clinician: "Dr James Chen", raised: "red" },
] as const;

const scans = [
  { title: "Dating scan", dept: "Ultrasound department", status: "", date: "2 August 2026", gestation: "9 weeks and 0 days", centre: "UHMB Ultrasound department", reporter: "Sonographer K. Patel", findings: "Single intrauterine pregnancy. CRL consistent with dates. FH seen.", measurements: ["CRL: 23.4 mm"] },
  { title: "Nuchal translucency", dept: "Screening Service", status: "", date: "2 August 2026", gestation: "12 weeks and 4 days", centre: "UHMB Ultrasound department", reporter: "Sonographer K. Patel", findings: "NT measurement within normal limits. Nasal bone present.", measurements: ["CRL: 61 mm", "NT: 1.5 mm"] },
  { title: "Anomaly scan (20w)", dept: "Ultrasound department", status: "Awaiting", date: "2 September 2026", gestation: "20 weeks and 1 day", centre: "UHMB Ultrasound department", reporter: "Sonographer K. Patel", findings: "Booked — awaiting", measurements: [] as string[] },
  { title: "Growth scan (28w)", dept: "Ultrasound department", status: "Awaiting", date: "25 September 2026", gestation: "28 weeks and 0 days", centre: "UHMB Ultrasound department", reporter: "Sonographer M. Hussain", findings: "Scheduled (gestational diabetes mellitus pathway)", measurements: [] as string[] },
];

const awaiting = [
  { test: "Growth scan (36w)", due: "16 October 2026", requested: "25 September 2026", by: "Midwife J. Davies", source: "Ultrasound department" },
  { test: "Repeat full blood count (34w)", due: "5 October 2026", requested: "15 August 2026", by: "Midwife J. Davies", source: "UHMB Haematology" },
  { test: "Antibody re-screen (34w)", due: "5 October 2026", requested: "15 August 2026", by: "Midwife J. Davies", source: "UHMB Blood Bank" },
];

const cervical = [
  { item: "Most recent smear", result: "Normal (negative cytology) (22 June 2024)", source: "GP record" },
  { item: "HPV status", result: "HPV not detected", source: "GP record" },
  { item: "Colposcopy referral", result: "Not referred", source: "GP record" },
] as const;

type View = "all" | "attention" | "awaiting";

export default function Results() {
  const [view, setView] = useState<View>("all");
  const show = (section: "attention" | "awaiting" | "other") =>
    view === "all" || (view === "attention" && section === "attention") || (view === "awaiting" && section === "awaiting");

  const viewDescription: Record<View, string> = {
    all: "Showing all results",
    attention: "Showing abnormal and borderline results",
    awaiting: "Showing awaiting results",
  };

  return (
    <RecordPage title="Results">
      <ToggleGroup
        label="Show results"
        value={view}
        onChange={setView}
        options={[
          { value: "all", label: "All results" },
          { value: "attention", label: "Abnormal and borderline", count: attention.length },
          { value: "awaiting", label: "Awaiting results", count: awaiting.length },
        ]}
      />
      <p role="status" className="nhs-visually-hidden">{viewDescription[view]}</p>

      {show("attention") && (
        <DataSection
          title="Results requiring attention"
          badge={<StatusTag tone="red">Action needed</StatusTag>}
          summary="2 abnormal · 2 borderline"
        >
          <ul className="record-card-list">
            {attention.map((item) => (
              <li key={item.name} className="record-card">
                <p className="record-card__heading">
                  {item.name}
                  <span className="record-card__status"><ResultStatus status={item.status} /></span>
                </p>
                <p>{item.value}</p>
                <p>{item.note}</p>
                <small>{item.date}</small>
              </li>
            ))}
          </ul>
        </DataSection>
      )}

      {show("other") && (
        <>
          <DataSection title="Haematology" defaultOpen={false}>
            <LabGroups caption="Haematology" groups={haematology} />
          </DataSection>

          <DataSection title="Infection screen" defaultOpen={false}>
            <LabGroups caption="Infection screen" groups={infection} />
          </DataSection>

          <DataSection title="Metabolic and endocrine" defaultOpen={false}>
            <LabGroups caption="Metabolic and endocrine" groups={metabolic} />
          </DataSection>

          <DataSection
            title="Antenatal screening"
            badge={<StatusTag tone="red">Attention</StatusTag>}
            summary={`${antenatal.length} tests`}
            defaultOpen={false}
          >
            <DataTable
              caption="Antenatal screening"
              rows={antenatal}
              rowKey={(row) => row.test}
              columns={[
                {
                  header: "Test",
                  sort: (r) => r.test,
                  cell: (r) => (
                    <>
                      <strong>{r.test}</strong>
                      <small>{r.detail}</small>
                    </>
                  ),
                },
                { header: "Status", cell: (r) => <ResultStatus status={r.status} />, sort: (r) => r.status },
                { header: "Date", cell: (r) => r.date, sort: (r) => dateKey(r.date) },
                { header: "Result", cell: (r) => r.result, sort: (r) => r.result },
                { header: "Source", cell: (r) => (r.source === "—" ? "—" : <SourceTag>{r.source}</SourceTag>), sort: (r) => (r.source === "—" ? null : r.source) },
              ]}
            />
          </DataSection>

          <DataSection title="Urinalysis" summary={`${dipstick.length} dipstick entries`} defaultOpen={false}>
            <Subsection title="Urine culture">
              <FactsGrid facts={[["No growth", "15 August 2026"]]} />
            </Subsection>
            <Subsection title="Dipstick history">
              <DataTable
                caption="Urine dipstick history"
                rows={dipstick}
                rowKey={(row) => row.date}
                columns={[
                  { header: "Date", cell: (r) => r.date, sort: (r) => dateKey(r.date) },
                  { header: "Protein", cell: (r) => r.protein },
                  {
                    header: "Glucose",
                    cell: (r) =>
                      r.raised ? (
                        <StatusTag tone={r.raised as TagTone}>{r.glucose} (raised)</StatusTag>
                      ) : (
                        r.glucose
                      ),
                  },
                  { header: "Leucocytes", cell: (r) => r.leucocytes },
                  { header: "Nitrites", cell: (r) => r.nitrites },
                  { header: "Clinician", cell: (r) => r.clinician },
                ]}
              />
            </Subsection>
          </DataSection>

          <DataSection title="Imaging" summary={`${scans.length} scans`} defaultOpen={false}>
            {scans.map((scan) => (
              <Subsection
                key={scan.title}
                title={scan.title}
                aside={
                  <>
                    {scan.status && <ResultStatus status={scan.status as Status} />} {scan.dept}
                  </>
                }
              >
                <FactsGrid
                  facts={[
                    ["Date", scan.date],
                    ["Gestation at scan", scan.gestation],
                    ["Centre", scan.centre],
                    ["Reporter", scan.reporter],
                    ["Findings", scan.findings],
                    ["Measurements", scan.measurements.length ? scan.measurements.join(" · ") : undefined],
                  ]}
                />
              </Subsection>
            ))}
          </DataSection>

          <DataSection title="Cervical screening" defaultOpen={false}>
            <DataTable
              caption="Cervical screening"
              rows={cervical}
              rowKey={(row) => row.item}
              columns={[
                { header: "Screening", cell: (r) => <strong>{r.item}</strong>, sort: (r) => r.item },
                { header: "Result", cell: (r) => r.result },
                { header: "Source", cell: (r) => <SourceTag>{r.source}</SourceTag>, sort: (r) => r.source },
              ]}
            />
          </DataSection>
        </>
      )}

      {show("awaiting") && (
        <DataSection title="Awaiting results" summary={`${awaiting.length} awaiting`} defaultOpen={view === "awaiting"}>
          <DataTable
            caption="Awaiting results"
            rows={awaiting}
            rowKey={(row) => row.test}
            columns={[
              { header: "Test", cell: (r) => <strong>{r.test}</strong>, sort: (r) => r.test },
              { header: "Due date", cell: (r) => r.due, sort: (r) => dateKey(r.due) },
              { header: "Date requested", cell: (r) => r.requested, sort: (r) => dateKey(r.requested) },
              { header: "Requested by", cell: (r) => r.by, sort: (r) => r.by },
              { header: "Source", cell: (r) => <SourceTag>{r.source}</SourceTag>, sort: (r) => r.source },
            ]}
            defaultSort={{ header: "Due date", direction: "ascending" }}
          />
        </DataSection>
      )}
    </RecordPage>
  );
}
