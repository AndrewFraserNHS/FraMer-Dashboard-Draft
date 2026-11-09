import { Callout } from "./components/ui/Callout";
import { DataSection } from "./components/ui/DataSection";
import { DataTable } from "./components/ui/DataTable";
import { FactsGrid } from "./components/ui/DetailList";
import { RecordPage } from "./components/ui/RecordPage";
import { SourceTag, StatusTag } from "./components/ui/StatusTag";
import { Subsection } from "./components/ui/Subsection";
import { dateKey } from "./utils/sort";

const currentPregnancy = [
  ["Gestation", "34 weeks and 1 day"],
  ["Estimated due date", "15 November 2026"],
  ["Parity", "Third pregnancy, 1 previous birth · no previous caesarean birth"],
  ["Blood group", "A+"],
  ["Body mass index", "32"],
  ["Booking", "9w (15 August 2026)"],
] as const;

const obstetricHistory = [
  { date: "2023", gestation: "39 weeks and 4 days", mode: "Spontaneous vaginal birth (SVB)", outcome: "Live birth", name: "Amina", status: "Alive and well", sex: "Female", weight: "3.28 kg", centile: "50th" },
  { date: "2021", gestation: "8 weeks and 3 days", mode: "N/A", outcome: "Miscarriage", name: "—", status: "—", sex: "—", weight: "—", centile: "—" },
] as const;

const healthHistory = [
  { item: "Blood transfusions", detail: "No", source: "GP record" },
  { item: "Infections", detail: "No significant infections recorded", source: "GP record" },
  { item: "Anaesthetic history", detail: "No previous anaesthetic", source: "BadgerNet Maternity" },
  { item: "Cardiac history", detail: "No cardiac conditions", source: "GP record" },
  { item: "Gynaecological history", detail: "No gynaecological conditions recorded", source: "GP record" },
  { item: "Family history", detail: "Mother: Type 2 Diabetes", source: "GP record" },
  { item: "Smoking status", detail: "Non-smoker", source: "GP record" },
  { item: "Alcohol use", detail: "None in pregnancy", source: "Booking" },
  { item: "Substance use", detail: "None recorded", source: "GP record" },
  { item: "Body mass index", detail: "32 (Obesity) — Dietitian referral pending", source: "BadgerNet Maternity" },
  { item: "Mental health", detail: "History of depression/anxiety (2022–2024) — Treated with sertraline 50mg", source: "Perinatal mental health" },
  { item: "Allergies", detail: "Penicillin (rash)", source: "GP record" },
] as const;

const diagnoses = [
  { name: "Gestational diabetes mellitus (O24.4)", meta: "Active · 5 September 2026 · Lab results" },
  { name: "Obesity (body mass index 32) (E66.0)", meta: "Active · 15 August 2026 · BadgerNet Maternity" },
  { name: "Depression and anxiety — History (F41.9)", meta: "Currently managed · 2022 · GP record" },
] as const;

const referrals = [
  { service: "Diabetes Antenatal Clinic", reason: "Gestational diabetes mellitus confirmed — management plan", date: "12 September 2026", status: "Referral reviewed", tone: "green" as const },
  { service: "Perinatal mental health", reason: "Wellbeing assessment and support plan", date: "15 September 2026", status: "Referral reviewed", tone: "green" as const },
  { service: "Dietitian", reason: "Weight management and gestational diabetes mellitus dietary advice", date: "", status: "Pending", tone: "yellow" as const },
] as const;

const plan = [
  "Continue glucose monitoring 4 times a day with dietitian input",
  "Growth scans from 28w (gestational diabetes mellitus pathway)",
  "Perinatal mental health follow-up aligned to routine appointments",
  "Review Sertraline risks/benefits — shared decision documented",
  "Interpreter at every clinical contact",
  "Discuss birth preferences at 20–28w review",
];

const screening = [
  { test: "Growth scan (36w)", date: "16 October 2026", gestation: "36 weeks", accepted: false, result: "Booked — upcoming", source: "Ultrasound department" },
  { test: "Growth scan (28w)", date: "25 September 2026", gestation: "28 weeks", accepted: true, result: "Growth appropriate. Amniotic fluid index normal. Presentation cephalic.", source: "Ultrasound department" },
  { test: "Oral glucose tolerance test (75 g)", date: "5 September 2026", gestation: "28 weeks", accepted: true, result: "Abnormal — gestational diabetes mellitus confirmed", source: "Lab results" },
  { test: "Anomaly scan (20w)", date: "2 September 2026", gestation: "20 weeks and 1 day", accepted: true, result: "No structural anomalies detected. Growth appropriate.", source: "Ultrasound department" },
  { test: "HIV, hepatitis B and syphilis", date: "15 August 2026", gestation: "9 weeks", accepted: true, result: "Negative", source: "Lab results" },
  { test: "Sickle cell and thalassaemia", date: "15 August 2026", gestation: "9 weeks", accepted: true, result: "Low risk — no further action", source: "Lab results" },
  { test: "Combined screening (T21/T18/T13)", date: "2 August 2026", gestation: "12 weeks and 4 days", accepted: true, result: "Low risk (1:5400 T21, 1:12000 T18)", source: "Screening service" },
  { test: "Dating scan", date: "2 August 2026", gestation: "9 weeks", accepted: true, result: "CRL consistent with dates. Singleton.", source: "Ultrasound department" },
  { test: "Group B Strep", date: "—", gestation: "Not recorded", accepted: false, result: "Declined", source: "BadgerNet Maternity" },
] as const;

const previousPregnancies = [
  {
    title: "2023 — Live birth at 39 weeks and 4 days",
    source: "BadgerNet Maternity",
    facts: [
      ["Year", "2023"],
      ["Gestation at delivery or loss", "39 weeks and 4 days"],
      ["Outcome", "Live birth"],
      ["Place of delivery", "University Hospitals of Morecambe Bay"],
      ["Mode of birth", "Spontaneous vaginal birth (SVB)"],
      ["Sex", "Female"],
      ["Name of child", "Amina"],
      ["Birth weight", "3.28 kg"],
      ["Birth centile", "50th"],
      ["APGAR scores", "1 min: 9 · 5 min: 10"],
      ["NICU admission", "No"],
      ["Feeding method", "Breastfed"],
      ["Current status", "Alive and well"],
      ["Uterine surgery", "None recorded"],
      ["Complications", "No complications recorded"],
    ],
  },
  {
    title: "2021 — Miscarriage at 8 weeks and 3 days",
    source: "GP record",
    facts: [
      ["Year", "2021"],
      ["Gestation at delivery or loss", "8 weeks and 3 days"],
      ["Outcome", "Miscarriage"],
      ["Place of delivery", "Central City Practice (managed in community)"],
      ["Uterine surgery", "None recorded"],
      ["Complications", "No complications recorded"],
    ],
  },
] as const;

export default function Pregnancy() {
  return (
    <RecordPage title="Pregnancy">
      <section aria-labelledby="current-pregnancy-heading">
        <h2 id="current-pregnancy-heading" className="nhs-visually-hidden">Current pregnancy</h2>
        <dl className="summary-bar">
          {currentPregnancy.map(([label, value]) => (
            <div key={label}>
              <dt>{label}</dt>
              <dd>{value}</dd>
            </div>
          ))}
        </dl>
      </section>

      <section aria-labelledby="pregnancy-risks-heading" className="pregnancy-risks">
        <div className="subsection__header">
          <h2 id="pregnancy-risks-heading" className="subsection__title">
            Risk factors in pregnancy
          </h2>
          <StatusTag tone="red">Active risks present</StatusTag>
        </div>
        <div className="callout-stack">
          <Callout tone="red" title="Gestational diabetes — confirmed" source="Lab results">
            <p>
              The oral glucose tolerance test was abnormal on 5 September 2026. The diabetes
              clinic is providing care. Glucose is monitored 4 times a day and metformin 500mg
              has started.
            </p>
          </Callout>
          <Callout tone="blue" title="Previous caesarean section — no" source="BadgerNet Maternity">
            <p>Previous birth was a spontaneous vaginal birth (SVB) in 2023.</p>
          </Callout>
          <Callout tone="amber" title="Venous thromboembolism score — 3" source="BadgerNet Maternity">
            <p>
              Body mass index ≥30 (+1), age 25–35 (+1), parity ≥1 (+1). Total = 3. Reassess at
              28w and postnatally.
            </p>
          </Callout>
          <Callout tone="amber" title="Mental health — history, monitored" source="Perinatal mental health">
            <p>
              Depression/anxiety 2022–2024. Currently on Sertraline 50mg. Wellbeing plan in
              place. Edinburgh Postnatal Depression Scale 11/30 at booking.
            </p>
          </Callout>
        </div>
      </section>

      <DataSection title="Obstetric history" summary={`${obstetricHistory.length} pregnancies`} defaultOpen={false}>
        <DataTable
          caption="Obstetric history"
          rows={obstetricHistory}
          rowKey={(row) => row.date}
          columns={[
            { header: "Date", cell: (r) => r.date, sort: (r) => dateKey(r.date) },
            { header: "Gestation", cell: (r) => r.gestation, sort: (r) => parseInt(r.gestation, 10) || null },
            { header: "Mode of birth", cell: (r) => r.mode, sort: (r) => r.mode },
            { header: "Outcome", cell: (r) => <strong>{r.outcome}</strong>, sort: (r) => r.outcome },
            { header: "Name", cell: (r) => r.name, sort: (r) => (r.name === "—" ? null : r.name) },
            { header: "Status", cell: (r) => r.status, sort: (r) => (r.status === "—" ? null : r.status) },
            { header: "Sex", cell: (r) => r.sex, sort: (r) => (r.sex === "—" ? null : r.sex) },
            { header: "Weight", cell: (r) => r.weight, sort: (r) => parseFloat(r.weight) || null },
            { header: "Birth centile", cell: (r) => r.centile, sort: (r) => parseInt(r.centile, 10) || null },
          ]}
          defaultSort={{ header: "Date", direction: "descending" }}
        />
      </DataSection>

      <DataSection title="Health history at booking" defaultOpen={false}>
        <DataTable
          caption="Health history at booking"
          rows={healthHistory}
          rowKey={(row) => row.item}
          columns={[
            { header: "History", cell: (r) => <strong>{r.item}</strong>, sort: (r) => r.item },
            { header: "Detail", cell: (r) => r.detail },
            { header: "Source", cell: (r) => <SourceTag>{r.source}</SourceTag>, sort: (r) => r.source },
          ]}
        />
      </DataSection>

      <DataSection
        title="Diagnoses and clinical history"
        summary={`${diagnoses.length} diagnoses`}
        defaultOpen={false}
      >
        <Subsection title="Diagnoses">
          <ul className="record-card-list">
            {diagnoses.map((diagnosis) => (
              <li key={diagnosis.name} className="record-card">
                <p className="record-card__heading">{diagnosis.name}</p>
                <small>{diagnosis.meta}</small>
              </li>
            ))}
          </ul>
        </Subsection>

        <Subsection title="Previous referrals">
          <ul className="record-card-list">
            {referrals.map((referral) => (
              <li key={referral.service} className="record-card">
                <p className="record-card__heading">
                  {referral.service}
                  <span className="record-card__status">
                    <StatusTag tone={referral.tone}>{referral.status}</StatusTag>
                  </span>
                </p>
                <p>{referral.reason}</p>
                <small>{referral.date || "Date pending"}</small>
              </li>
            ))}
          </ul>
        </Subsection>

        <Subsection title="Tokophobia">
          <p>Not reported. Previous spontaneous vaginal birth (SVB) with good experience noted.</p>
        </Subsection>

        <Subsection title="Plan">
          <ul className="bullet-list">
            {plan.map((item) => <li key={item}>{item}</li>)}
          </ul>
        </Subsection>
      </DataSection>

      <DataSection
        title="Screening"
        badge={<StatusTag tone="red">7 attention</StatusTag>}
        defaultOpen={false}
      >
        <DataTable
          caption="Antenatal screening and investigations"
          rows={screening}
          rowKey={(row) => row.test}
          columns={[
            { header: "Test", cell: (r) => <strong>{r.test}</strong>, sort: (r) => r.test },
            { header: "Date", cell: (r) => r.date, sort: (r) => dateKey(r.date) },
            { header: "Gestation", cell: (r) => r.gestation, sort: (r) => parseInt(r.gestation, 10) || null },
            { header: "Accepted", cell: (r) => <StatusTag tone={r.accepted ? "green" : "red"}>{r.accepted ? "Yes" : "No"}</StatusTag>, sort: (r) => (r.accepted ? "Yes" : "No") },
            { header: "Result", cell: (r) => r.result, sort: (r) => r.result },
            { header: "Source", cell: (r) => <SourceTag>{r.source}</SourceTag>, sort: (r) => r.source },
          ]}
          defaultSort={{ header: "Date", direction: "descending" }}
        />
      </DataSection>

      <DataSection
        title="Previous pregnancies"
        summary={`${previousPregnancies.length} pregnancies`}
        defaultOpen={false}
      >
        {previousPregnancies.map((pregnancy) => (
          <Subsection
            key={pregnancy.title}
            title={pregnancy.title}
            aside={<SourceTag>{pregnancy.source}</SourceTag>}
          >
            <FactsGrid facts={pregnancy.facts} />
          </Subsection>
        ))}
      </DataSection>
    </RecordPage>
  );
}
