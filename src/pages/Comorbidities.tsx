import { RecordCard, RecordCardList } from "../components/ui/RecordCardList";
import { formatDate } from "../data/patient";
import { Link } from "react-router-dom";
import { DataSection } from "../components/ui/DataSection";
import { DataTable } from "../components/ui/DataTable";
import { DetailList } from "../components/ui/DetailList";
import { Callout } from "../components/ui/Callout";
import { RecordPage } from "../components/ui/RecordPage";
import { SourceTag, StatusTag, TagTone } from "../components/ui/StatusTag";
import { Subsection } from "../components/ui/Subsection";
import { dateKey } from "../utils/sort";

const riskFactors = [
  { factor: "Ethnicity", detail: "Asian / Asian British — Pakistani", note: "South Asian ethnicity is classified as high-risk for gestational diabetes mellitus per NICE NG3", source: "Demographics", flagged: true },
  { factor: "Body mass index ≥ 30", detail: "Body mass index 32 (Obesity)", source: "Booking", flagged: true },
  { factor: "Family history of Type 2 diabetes", detail: "Mother: Type 2 Diabetes", source: "GP record", flagged: true },
  { factor: "Previous gestational diabetes mellitus", detail: "Not applicable for first pregnancy", source: "BadgerNet", flagged: false },
] as const;

const glucoseResults = [
  { test: "Fasting glucose (pre-pregnancy)", result: "5.2 mmol/L", range: "< 5.6 mmol/L", date: formatDate("2024-08-14"), source: "GP record" },
  { test: "HbA1c (pre-pregnancy)", result: "37 mmol/mol", range: "< 42 mmol/mol", date: formatDate("2024-08-14"), source: "GP record" },
] as const;

const assessments = [
  { date: formatDate("2026-08-15"), tool: "Edinburgh Postnatal Depression Scale", score: "11/30", risk: "Borderline – follow up", clinician: "Booking", notes: "Patient reports low mood and poor sleep. Denies self-harm." },
  { date: formatDate("2026-09-15"), tool: "GAD-7", score: "9/21", risk: "Moderate anxiety", clinician: "Perinatal mental health team", notes: "Anxiety related to health + language barrier." },
  { date: formatDate("2026-09-15"), tool: "Risk review", score: "N/A", risk: "No immediate risk disclosed", clinician: "Perinatal mental health team", notes: "Safety plan reviewed; emergency contacts confirmed." },
] as const;

const contacts = [
  { date: formatDate("2026-09-15"), service: "Perinatal mental health", type: "Telephone assessment", clinician: "Perinatal mental health practitioner", interpreter: "Urdu (Booked)", outcome: "Wellbeing assessment completed. Safety plan reviewed. Follow-up offered in 2–4 weeks." },
  { date: formatDate("2026-09-22"), service: "Perinatal mental health", type: "Advice to midwifery", clinician: "Perinatal mental health team", interpreter: "N/A", outcome: "Shared key points for booking: private discussion recommended; confirm support network; review Sertraline continuation." },
] as const;

const mentalHealthHistory = [
  { item: "Anxiety history", detail: "Previous anxiety leading to panic attacks — recorded in GP/Rio", source: "GP and Rio" },
  { item: "CMHT involvement", detail: "No current CMHT involvement recorded", source: "Connected record" },
  { item: "Current psychiatric medications", detail: "No current psychiatric medications recorded", source: "Connected record" },
  { item: "To confirm", detail: "Has the patient been prescribed anxiolytics or antidepressants previously?", source: "" },
] as const;

const safetyContacts = [
  { item: "Crisis line", detail: "Local crisis line (24/7) — demo number 0800 000 000", source: "Connected record" },
  { item: "Maternity triage", detail: "Maternity triage — demo number 01524 555 999", source: "BadgerNet" },
] as const;

const wellbeingPlan = [
  "Continue Sertraline 50mg (review risks/benefits; avoid abrupt stopping)",
  "Identify a named contact in maternity for questions between visits",
  "Offer information in Urdu where available",
  "Agree safety plan: who to call if mood worsens",
  "Screen again at 16w and 28w, earlier if concerns",
];

const safetyPlanActions = [
  "Ask about thoughts of self-harm in a private setting (with interpreter).",
  "Confirm patient knows how to access urgent support.",
];

const suggestedActions = [
  { title: "Complete private wellbeing discussion with interpreter (incl. safety questions)", category: "Booking", priority: "High" as const },
  { title: "Confirm Sertraline plan in pregnancy and document shared decision", category: "Medication", priority: "Moderate" as const, link: { to: "/care-plans", label: "View care plans" } },
  { title: "Book a follow-up mental health check-in with the routine appointment", category: "Follow-up", priority: "Moderate" as const, link: { to: "/appointments", label: "View in Appointments" } },
];

const socialFacts = [
  { label: "Previous children's services involvement", value: "Unknown", tone: "orange" as const },
  { label: "Current children's services involvement", value: "No", tone: "green" as const },
  { label: "Previous domestic violence", value: "Unknown", tone: "orange" as const },
];

const medicines = [
  { name: "Sertraline", dose: "50 mg", frequency: "Once daily", prescriber: "Dr Sarah Wilson (GP)", source: "GP record" },
  { name: "Prenatal Vitamins", dose: "Standard", frequency: "Once daily", prescriber: "Midwife", source: "BadgerNet" },
] as const;

const mentalHealthRiskTone = (risk: string): TagTone => {
  if (risk.includes("No immediate")) return "green";
  if (risk.includes("Moderate")) return "orange";
  if (risk.includes("Borderline")) return "yellow";
  return "grey";
};

export default function Comorbidities() {
  return (
    <RecordPage title="Conditions">
      <DataSection
        title="Endocrine and metabolic"
        badge={<StatusTag tone="red">At risk</StatusTag>}
        defaultOpen={false}
      >
        <Callout tone="red" title="Gestational diabetes — at risk">
          <p>
            Risk factors identified from connected records. Diagnosis may or may
            not be confirmed.
          </p>
        </Callout>

        <Subsection title="Risk factors (auto-detected)">
          <DataTable
            caption="Risk factors for gestational diabetes"
            rows={riskFactors}
            rowKey={(row) => row.factor}
            columns={[
              {
                header: "Factor",
                cell: (r) => <strong>{r.factor}</strong>,
                sort: (r) => r.factor,
              },
              {
                header: "Detail",
                cell: (r) => (
                  <>
                    {r.detail}
                    {"note" in r && <small>{r.note}</small>}
                  </>
                ),
              },
              {
                header: "Source",
                cell: (r) => <SourceTag>{r.source}</SourceTag>,
                sort: (r) => r.source,
              },
              {
                header: "Flagged",
                cell: (r) => (
                  <StatusTag tone={r.flagged ? "red" : "grey"}>
                    {r.flagged ? "Yes" : "No"}
                  </StatusTag>
                ),
                sort: (r) => (r.flagged ? "Yes" : "No"),
              },
            ]}
          />
        </Subsection>

        <Callout tone="blue" title="Recommended action">
          <p>
            Refer for GTT at 24–28 weeks. Advise on dietary modification with
            interpreter support.{" "}
            <Link className="nhsuk-link" to="/results">
              View the Results tab
            </Link>
          </p>
        </Callout>

        <Subsection
          title="Previous glucose and HbA1c results (GP record)"
          aside={
            <Link className="nhsuk-link" to="/results">
              All results
            </Link>
          }
        >
          <DataTable
            caption="Previous glucose and HbA1c results from the GP record"
            rows={glucoseResults}
            rowKey={(row) => row.test}
            columns={[
              {
                header: "Test",
                cell: (r) => <strong>{r.test}</strong>,
                sort: (r) => r.test,
              },
              { header: "Result", cell: (r) => r.result },
              { header: "Reference range", cell: (r) => r.range },
              {
                header: "Date",
                cell: (r) => r.date,
                sort: (r) => dateKey(r.date),
              },
              {
                header: "Source",
                cell: (r) => <SourceTag>{r.source}</SourceTag>,
                sort: (r) => r.source,
              },
            ]}
          />
        </Subsection>
      </DataSection>

      <DataSection
        title="Mental health"
        badge={<StatusTag tone="orange">Screening due</StatusTag>}
        defaultOpen={false}
      >
        <Callout
          tone="amber"
          title="Formal perinatal mental health screening has not yet been completed. Complete at this appointment."
        />

        <Subsection title="History and current involvement">
          <DataTable
            caption="Mental health history and current involvement"
            rows={mentalHealthHistory}
            rowKey={(row) => row.item}
            columns={[
              {
                header: "Item",
                cell: (r) => <strong>{r.item}</strong>,
                sort: (r) => r.item,
              },
              { header: "Detail", cell: (r) => r.detail },
              {
                header: "Source",
                cell: (r) =>
                  r.source ? <SourceTag>{r.source}</SourceTag> : "—",
                sort: (r) => r.source || null,
              },
            ]}
          />
        </Subsection>

        <Subsection title="Screening and assessments">
          <DataTable
            caption="Mental health screening and assessments"
            rows={assessments}
            rowKey={(row) => `${row.date}-${row.tool}`}
            columns={[
              {
                header: "Date",
                cell: (r) => r.date,
                sort: (r) => dateKey(r.date),
              },
              {
                header: "Tool",
                cell: (r) => <strong>{r.tool}</strong>,
                sort: (r) => r.tool,
              },
              { header: "Score", cell: (r) => r.score },
              {
                header: "Risk level",
                cell: (r) => <StatusTag tone={mentalHealthRiskTone(r.risk)}>{r.risk}</StatusTag>,
                sort: (r) => r.risk,
              },
              {
                header: "Clinician",
                cell: (r) => r.clinician,
                sort: (r) => r.clinician,
              },
              { header: "Notes", cell: (r) => r.notes },
            ]}
          />
        </Subsection>

        <Subsection title="Contact history">
          <DataTable
            caption="Mental health contact history"
            rows={contacts}
            rowKey={(row) => `${row.date}-${row.type}`}
            columns={[
              {
                header: "Date",
                cell: (r) => r.date,
                sort: (r) => dateKey(r.date),
              },
              {
                header: "Service",
                cell: (r) => <strong>{r.service}</strong>,
                sort: (r) => r.service,
              },
              { header: "Type", cell: (r) => r.type, sort: (r) => r.type },
              {
                header: "Clinician",
                cell: (r) => r.clinician,
                sort: (r) => r.clinician,
              },
              { header: "Interpreter", cell: (r) => r.interpreter },
              { header: "Outcome", cell: (r) => r.outcome },
            ]}
          />
        </Subsection>

        <Subsection
          title="Wellbeing support plan (summary)"
          aside={
            <>
              Last updated: {formatDate("2026-09-15")} ·{" "}
              <Link className="nhsuk-link" to="/care-plans">
                View care plans
              </Link>
            </>
          }
        >
          <ul className="bullet-list">
            {wellbeingPlan.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </Subsection>

        <Subsection title="Safety plan">
          <DataTable
            caption="Safety plan contacts"
            rows={safetyContacts}
            rowKey={(row) => row.item}
            columns={[
              {
                header: "Contact",
                cell: (r) => <strong>{r.item}</strong>,
                sort: (r) => r.item,
              },
              { header: "Detail", cell: (r) => r.detail },
              {
                header: "Source",
                cell: (r) => <SourceTag>{r.source}</SourceTag>,
                sort: (r) => r.source,
              },
            ]}
          />
          <ul className="bullet-list">
            {safetyPlanActions.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </Subsection>

        <Callout tone="grey" title="Clinical note">
          <p>
            Mental health history may be under-reported due to language barrier
            and limited prior NHS engagement — clinical judgement required.
          </p>
        </Callout>

        <Subsection title="Suggested actions (connected record)">
          <RecordCardList>
            {suggestedActions.map((action) => (
              <RecordCard
                key={action.title}
                heading={action.title}
                status={
                  <StatusTag tone={action.priority === "High" ? "red" : "orange"}>{action.priority} priority</StatusTag>
                }
                meta={
                  <>
                    Category: {action.category}
                    {"link" in action && action.link && (
                      <>
                        {" "}
                        ·{" "}
                        <Link className="nhsuk-link" to={action.link.to}>
                          {action.link.label}
                        </Link>
                      </>
                    )}
                  </>
                }
              />
            ))}
          </RecordCardList>
        </Subsection>
      </DataSection>

      <DataSection title="Social Context" defaultOpen={false}>
        <DetailList
          rows={socialFacts.map((fact) => [
            fact.label,
            <StatusTag key={fact.label} tone={fact.tone}>
              {fact.value}
            </StatusTag>,
          ])}
        />
        <Callout tone="amber" title="Cause for concern" source="GP Referral">
          <p>
            Social context flagged in referral (language barrier, limited
            extended family locally)
          </p>
        </Callout>
      </DataSection>

      <DataSection
        title="Current medicines"
        summary={`${medicines.length} active`}
        defaultOpen={false}
      >
        <DataTable
          caption="Current medicines"
          rows={medicines}
          rowKey={(row) => row.name}
          columns={[
            {
              header: "Medication",
              cell: (r) => <strong>{r.name}</strong>,
              sort: (r) => r.name,
            },
            { header: "Dose", cell: (r) => r.dose },
            { header: "Frequency", cell: (r) => r.frequency },
            {
              header: "Prescriber",
              cell: (r) => r.prescriber,
              sort: (r) => r.prescriber,
            },
            {
              header: "Source",
              cell: (r) => <SourceTag>{r.source}</SourceTag>,
              sort: (r) => r.source,
            },
          ]}
        />
      </DataSection>
    </RecordPage>
  );
}
