import { ReactNode, useRef, useState } from "react";
import { formatDate, risks } from "../../data/patient";
import type { DetailPanel } from "../../hooks/useDetailPanel";
type SafetyFlagKind =
  | "allergies"
  | "dnacpr"
  | "adjustment"
  | "safeguarding"
  | "pregnant"
  | "gestationalDiabetes"
  | "bodyMassIndex"
  | "mentalHealth"
  | "medicine";

// Flag labels come from the shared risk data (src/data/patient.ts) so the
// banners, the risks card and this strip cannot drift apart.
const flagDetails: Record<string, { kind: SafetyFlagKind; status: string }> = {
  "gestational-diabetes": { kind: "gestationalDiabetes", status: "Active" },
  "penicillin-allergy": { kind: "allergies", status: "Confirmed allergy" },
  "body-mass-index": { kind: "bodyMassIndex", status: "Active" },
  "mental-health": { kind: "mentalHealth", status: "Currently managed" },
  sertraline: { kind: "medicine", status: "Active medicine" },
  language: { kind: "adjustment", status: "Active" },
  safeguarding: { kind: "safeguarding", status: "1 active concern" },
};

export const safetyFlags: ReadonlyArray<{
  id: string;
  level: (typeof risks)[number]["level"];
  label: string;
  title: string;
  tone: DetailPanel["tone"];
  kind: SafetyFlagKind;
  status?: string;
}> = risks.map((risk) => ({
  id: risk.id,
  level: risk.level,
  label: risk.title,
  title: risk.title,
  tone: "blue" as const,
  ...flagDetails[risk.id],
}));

type SafetyDocument = {
  title: string;
  type: string;
  organisation: string;
  author: string;
  specialty: string;
  date: string;
  content: ReactNode;
  restricted?: boolean;
};

const allergyDocuments: SafetyDocument[] = [
  {
    title: "Medication and allergy review",
    type: "Clinical review",
    organisation: "Central City Practice",
    author: "Dr Anita Shah",
    specialty: "General practice",
    date: formatDate("2026-08-12"),
    content: (
      <>
        <p>
          Penicillin allergy reviewed with Leila. She described a widespread
          raised rash after oral penicillin in childhood. No breathing
          difficulty, facial swelling or collapse was recalled.
        </p>
        <p>
          Continue to avoid penicillin-class antibiotics. Consider specialist
          allergy assessment if future treatment options are significantly
          restricted.
        </p>
      </>
    ),
  },
  {
    title: "Hospital discharge summary",
    type: "Discharge summary",
    organisation: "Lancaster Women’s Hospital",
    author: "Dr Grace Patel",
    specialty: "Maternity",
    date: formatDate("2026-06-18"),
    content: (
      <p>
        Penicillin allergy noted on admission. No allergic reaction occurred
        during this encounter.
      </p>
    ),
  },
];

const adjustmentDocuments: SafetyDocument[] = [
  {
    title: "Reasonable adjustment record",
    type: "Reasonable adjustment record",
    organisation: "Central City Practice",
    author: "Nadia Hussain",
    specialty: "General practice",
    date: formatDate("2026-02-20"),
    content: (
      <p>
        Urdu is the patient’s preferred language for complex clinical
        discussions. Arrange a professional interpreter and provide written
        follow-up information in plain English where translated material is
        unavailable.
      </p>
    ),
  },
];

const safeguardingDocuments: SafetyDocument[] = [
  {
    title: "Safeguarding referral",
    type: "Referral",
    organisation: "Lancaster Women’s Hospital",
    author: "Safeguarding maternity team",
    specialty: "Safeguarding",
    date: formatDate("2026-09-02"),
    restricted: true,
    content: null,
  },
  {
    title: "Strategy meeting notes",
    type: "Meeting record",
    organisation: "Lancaster Family Services",
    author: "Not supplied by source",
    specialty: "Children and families",
    date: formatDate("2026-09-08"),
    restricted: true,
    content: null,
  },
];

const clinicalRiskPanels: Partial<
  Record<
    SafetyFlagKind,
    {
      status: string;
      summary: string;
      rows: ReadonlyArray<readonly [string, ReactNode]>;
      actions: readonly string[];
      source: {
        organisation: string;
        system: string;
        identifier: string;
        recorded: string;
        recordedBy: string;
        role: string;
        updated: string;
      };
    }
  >
> = {
  gestationalDiabetes: {
    status: "Active gestational diabetes mellitus",
    summary:
      "Diagnosed following an abnormal oral glucose tolerance test. Metformin and regular glucose monitoring are in place.",
    rows: [
      ["Date diagnosed", formatDate("2026-09-05")],
      ["Current medicine", "Metformin 500 mg"],
      ["Monitoring", "Blood glucose four times daily"],
      ["Responsible service", "Diabetes antenatal clinic"],
      ["Applies to", "Current pregnancy"],
    ],
    actions: [
      "Review the current glucose-monitoring record.",
      "Follow the agreed gestational diabetes maternity pathway.",
      "Escalate persistently abnormal readings to the diabetes antenatal team.",
    ],
    source: {
      organisation: "Diabetes Antenatal Clinic",
      system: "Lab results",
      identifier: "GDM-4857772910-2026",
      recorded: formatDate("2026-09-05"),
      recordedBy: "Diabetes antenatal team",
      role: "Maternity diabetes service",
      updated: `${formatDate("2026-09-12")} at 2:10pm`,
    },
  },
  bodyMassIndex: {
    status: "Active pregnancy risk factor",
    summary:
      "Body mass index recorded as 32 at maternity booking and included in the current pregnancy risk assessment.",
    rows: [
      ["Body mass index", "32"],
      ["Clinical status", "Active"],
      ["Date recorded", formatDate("2026-08-15")],
      ["Applies to", "Current pregnancy"],
      ["Responsible service", "Community maternity team"],
    ],
    actions: [
      "Use the current maternity risk assessment when planning care.",
      "Review thrombosis and anaesthetic risk where clinically relevant.",
    ],
    source: {
      organisation: "Lancaster Women’s Hospital",
      system: "BadgerNet Maternity",
      identifier: "BMI-4857772910-2026",
      recorded: formatDate("2026-08-15"),
      recordedBy: "Community maternity team",
      role: "Maternity service",
      updated: `${formatDate("2026-08-15")} at 11:20am`,
    },
  },
  mentalHealth: {
    status: "History recorded — currently managed",
    summary:
      "Depression and anxiety are recorded in the clinical history. Current support is provided by the perinatal mental health team.",
    rows: [
      ["Clinical status", "Currently managed"],
      ["Recorded since", "2022"],
      ["Responsible service", "Perinatal mental health team"],
      ["Current medicine", "Sertraline 50 mg once daily"],
      ["Current review status", "Stable with ongoing support"],
    ],
    actions: [
      "Review the current wellbeing and safety plan.",
      "Contact the perinatal mental health team if symptoms or risk change.",
    ],
    source: {
      organisation: "Central City Practice",
      system: "GP record",
      identifier: "MH-4857772910-2022",
      recorded: "2022",
      recordedBy: "Not supplied by source",
      role: "General practice",
      updated: `${formatDate("2026-10-05")} at 8:45am`,
    },
  },
  medicine: {
    status: "Active medicine in pregnancy",
    summary:
      "Sertraline 50 mg once daily is recorded as a current medicine and has been reviewed in the context of this pregnancy.",
    rows: [
      ["Medicine", "Sertraline"],
      ["Dose", "50 mg"],
      ["Directions", "Once daily"],
      ["Clinical indication", "Depression and anxiety"],
      ["Pregnancy review", "Reviewed for current pregnancy"],
      ["Prescribing service", "Central City Practice"],
    ],
    actions: [
      "Do not stop treatment abruptly without clinical review.",
      "Confirm the current prescription and review plan before changing treatment.",
    ],
    source: {
      organisation: "Central City Practice",
      system: "GP record",
      identifier: "MED-4857772910-SER",
      recorded: "Not supplied by source",
      recordedBy: "Dr Sarah Wilson",
      role: "General practitioner",
      updated: `${formatDate("2026-10-05")} at 8:45am`,
    },
  },
};

function StructuredDetails({
  rows,
}: {
  rows: ReadonlyArray<readonly [string, ReactNode]>;
}) {
  return (
    <dl className="safety-detail-list">
      {rows.map(([label, value]) => (
        <div key={label}>
          <dt>{label}</dt>
          <dd>{value || "Not supplied by source"}</dd>
        </div>
      ))}
    </dl>
  );
}

function SourceInformation({
  organisation,
  system,
  identifier,
  recorded,
  recordedBy,
  role,
  updated,
  sharing = "Available through connected care records",
  missing = false,
}: {
  organisation: string;
  system: string;
  identifier: string;
  recorded: string;
  recordedBy: string;
  role: string;
  updated: string;
  sharing?: string;
  missing?: boolean;
}) {
  return (
    <section className="safety-panel-section">
      <h3>Source information</h3>
      {missing && (
        <div className="safety-callout warning">
          <strong>Some source details are missing.</strong> Check the originating
          record before making a clinical decision.
        </div>
      )}
      <StructuredDetails
        rows={[
          ["Source organisation", organisation],
          ["Source system", system],
          ["Record identifier", identifier],
          ["Date recorded", recorded],
          ["Recorded by", recordedBy],
          ["Recorder role", role],
          ["Last updated by the source", updated],
          ["Last refreshed by NCRS", `${formatDate("2026-09-18")} at 9:42am`],
          ["Data-sharing status", sharing],
        ]}
      />
    </section>
  );
}

function LinkedDocuments({
  documents,
  onOpen,
}: {
  documents: SafetyDocument[];
  onOpen: (document: SafetyDocument) => void;
}) {
  if (!documents.length) return null;
  return (
    <section className="safety-panel-section">
      <h3>Linked documents</h3>
      <ul className="safety-document-list">
        {documents.map((document) => (
          <li key={`${document.title}-${document.date}`}>
            <button
              type="button"
              disabled={document.restricted}
              onClick={() => onOpen(document)}
            >
              <span>
                <strong>{document.title}</strong>
                <small>
                  {document.type} · {document.organisation}
                </small>
                <small>
                  {document.author} · {document.date}
                </small>
                {document.restricted && (
                  <b>Access restricted — contact the safeguarding team to request access</b>
                )}
              </span>
              <i aria-hidden="true">›</i>
            </button>
          </li>
        ))}
      </ul>
    </section>
  );
}

export function SafetyFlagPanel({ kind }: { kind: SafetyFlagKind }) {
  const [document, setDocument] = useState<SafetyDocument | null>(null);
  const contentRoot = useRef<HTMLDivElement | null>(null);
  const savedScrollPosition = useRef(0);

  function openDocument(nextDocument: SafetyDocument) {
    const scroller = contentRoot.current?.closest<HTMLElement>(
      ".record-panel-content",
    );
    savedScrollPosition.current = scroller?.scrollTop ?? 0;
    setDocument(nextDocument);
    if (scroller) scroller.scrollTop = 0;
  }

  function returnToFlag() {
    setDocument(null);
    requestAnimationFrame(() => {
      const scroller = contentRoot.current?.closest<HTMLElement>(
        ".record-panel-content",
      );
      if (scroller) scroller.scrollTop = savedScrollPosition.current;
    });
  }

  if (document) {
    return (
      <div className="safety-panel-body" ref={contentRoot}>
        <button className="safety-back-button" type="button" onClick={returnToFlag}>
          Back
        </button>
        <p className="safety-document-type">{document.type}</p>
        <h3 className="safety-document-title">{document.title}</h3>
        <StructuredDetails
          rows={[
            ["Organisation", document.organisation],
            ["Author", document.author],
            ["Specialty", document.specialty],
            ["Encounter or document date", document.date],
            ["Patient", "Leila Khan"],
            ["NHS number", "485 777 2910"],
            ["Date of birth", "14 June 1995"],
          ]}
        />
        <section className="safety-panel-section document-content">
          <h3>Document content</h3>
          {document.content}
        </section>
        <SourceInformation
          organisation={document.organisation}
          system="Connected document service"
          identifier="Not supplied by source"
          recorded={document.date}
          recordedBy={document.author}
          role={document.specialty}
          updated="Not supplied by source"
          missing
        />
      </div>
    );
  }

  const clinicalRisk = clinicalRiskPanels[kind];
  if (clinicalRisk) {
    return (
      <div className="safety-panel-body" ref={contentRoot}>
        <section className="safety-panel-section">
          <h3>Current status</h3>
          <div className="safety-status-card">
            <strong>{clinicalRisk.status}</strong>
            <span>{clinicalRisk.summary}</span>
          </div>
        </section>
        <section className="safety-panel-section">
          <h3>Important clinical detail</h3>
          <StructuredDetails rows={clinicalRisk.rows} />
        </section>
        <section className="safety-panel-section">
          <h3>Actions and instructions</h3>
          <ul className="safety-action-list">
            {clinicalRisk.actions.map((action) => (
              <li key={action}>{action}</li>
            ))}
          </ul>
        </section>
        <SourceInformation {...clinicalRisk.source} />
      </div>
    );
  }

  if (kind === "allergies") {
    return (
      <div className="safety-panel-body" ref={contentRoot}>
        <section className="safety-panel-section">
          <h3>Current status</h3>
          <div className="safety-status-card critical">
            <strong>Confirmed allergy: penicillin</strong>
            <span>Active clinical record — avoid penicillin-class antibiotics</span>
          </div>
        </section>
        <section className="safety-panel-section">
          <h3>Important clinical detail</h3>
          <StructuredDetails
            rows={[
              ["Substance", "Penicillin"],
              ["Record type", "Allergy"],
              ["Reaction", "Widespread raised rash"],
              ["Severity", "Moderate"],
              ["Clinical status", "Active and confirmed"],
              ["Date first recorded", formatDate("2011-03-04")],
              ["Source organisation", "Central City Practice"],
              ["Source system", "GP Connect"],
              ["Recording clinician", "Dr Anita Shah"],
              ["Recorder role", "General practitioner"],
            ]}
          />
        </section>
        <section className="safety-panel-section">
          <h3>Connected source records (2)</h3>
          <div className="safety-callout warning">
            <strong>Discrepancies were found between connected records.</strong>{" "}
            Review the originating records before making a clinical decision.
          </div>
          <article className="safety-record-card">
            <h4>Central City Practice</h4>
            <StructuredDetails
              rows={[
                ["Source system", "GP Connect"],
                ["Reaction", "Widespread raised rash"],
                ["Severity", "Moderate"],
                ["Clinician", "Dr Anita Shah"],
                ["Date recorded", formatDate("2026-08-12")],
                ["Notes", "Patient recalled reaction occurring in childhood"],
              ]}
            />
          </article>
          <article className="safety-record-card">
            <h4>Lancaster Women’s Hospital</h4>
            <StructuredDetails
              rows={[
                ["Source system", "Maternity EPR"],
                ["Reaction", "Rash"],
                ["Severity", "Not supplied by source"],
                ["Clinician", "Dr Grace Patel"],
                ["Date recorded", formatDate("2026-06-18")],
                ["Notes", "Copied from patient-reported admission history"],
              ]}
            />
          </article>
        </section>
        <section className="safety-panel-section">
          <h3>Contextual medicine exposure</h3>
          <div className="safety-callout warning">
            <strong>Cefalexin was prescribed on {formatDate("2026-06-22")}.</strong> No reaction
            was recorded, but absence of a recorded reaction does not establish
            tolerance or invalidate the penicillin allergy.
          </div>
          <StructuredDetails
            rows={[
              ["Prescriber", "Dr Grace Patel"],
              ["Source system", "Maternity EPR"],
              ["Recorded outcome", "No outcome supplied by source"],
            ]}
          />
        </section>
        <LinkedDocuments documents={allergyDocuments} onOpen={openDocument} />
        <SourceInformation
          organisation="Central City Practice"
          system="GP Connect"
          identifier="ALG-4857772910-01"
          recorded={formatDate("2011-03-04")}
          recordedBy="Dr Anita Shah"
          role="General practitioner"
          updated={`${formatDate("2026-08-12")} at 3:18pm`}
        />
      </div>
    );
  }

  if (kind === "dnacpr") {
    return (
      <div className="safety-panel-body" ref={contentRoot}>
        <section className="safety-panel-section">
          <h3>Current status</h3>
          <div className="safety-status-card neutral">
            <strong>No active DNACPR or ReSPECT form is recorded</strong>
            <span>CPR recommendation and treatment-escalation status are not supplied.</span>
          </div>
        </section>
        <section className="safety-panel-section">
          <h3>Clinical summary</h3>
          <StructuredDetails
            rows={[
              ["Patient wishes", "Not supplied by source"],
              ["Treatment priorities", "Not supplied by source"],
              ["Preferred place of care", "Not supplied by source"],
              ["Escalation limits", "Not supplied by source"],
              ["Emergency treatment recommendations", "Not supplied by source"],
              ["People involved in the decision", "Not supplied by source"],
              ["Representative or lasting power of attorney", "Not supplied by source"],
            ]}
          />
        </section>
        <SourceInformation
          organisation="Not supplied by source"
          system="NCRS connected records"
          identifier="Not supplied by source"
          recorded="Not supplied by source"
          recordedBy="Not supplied by source"
          role="Not supplied by source"
          updated="Not supplied by source"
          missing
        />
      </div>
    );
  }

  if (kind === "adjustment") {
    return (
      <div className="safety-panel-body" ref={contentRoot}>
        <section className="safety-panel-section">
          <h3>Current status</h3>
          <div className="safety-status-card adjustment">
            <strong>Professional Urdu interpreter required</strong>
            <span>Applies to complex clinical discussions and consent.</span>
          </div>
        </section>
        <section className="safety-panel-section">
          <h3>Structured adjustment details</h3>
          <StructuredDetails
            rows={[
              ["Mobility and transport", "No adjustment recorded"],
              ["Communication", "Book a professional Urdu interpreter; do not rely on family members"],
              ["Cognitive or mental disability", "No adjustment recorded"],
              ["Sensory requirements", "No adjustment recorded"],
              ["Carers or advocates", "May attend at the patient’s request"],
              ["Appointment requirements", "Allow additional time for interpreted discussion"],
              ["Accessible information", "Provide written follow-up information and confirm understanding"],
              ["Other adjustments", "Ask the patient whether an interpreter is needed for each contact"],
            ]}
          />
        </section>
        <section className="safety-panel-section">
          <h3>People and contacts</h3>
          <StructuredDetails
            rows={[
              ["Named carer or advocate", "Not supplied by source"],
              ["Relationship", "Not supplied by source"],
              ["Contact information", "Not supplied by source"],
              ["Lasting power of attorney", "Not supplied by source"],
              ["Preferred contact method", "Written message followed by telephone contact with an interpreter"],
            ]}
          />
        </section>
        <LinkedDocuments documents={adjustmentDocuments} onOpen={openDocument} />
        <SourceInformation
          organisation="Central City Practice"
          system="GP Connect"
          identifier="RA-4857772910-02"
          recorded={formatDate("2026-02-20")}
          recordedBy="Nadia Hussain"
          role="Practice nurse"
          updated={`${formatDate("2026-02-20")} at 11:06am`}
        />
      </div>
    );
  }

  if (kind === "safeguarding") {
    return (
      <div className="safety-panel-body" ref={contentRoot}>
        <section className="safety-panel-section">
          <h3>Safeguarding summary</h3>
          <div className="safety-status-card caution">
            <strong>3 concerns on record — 1 active</strong>
            <span>
              Contact the safeguarding maternity team before sharing information
              outside the direct care team.
            </span>
          </div>
          <StructuredDetails
            rows={[
              ["Immediate instructions", "Follow the maternity safeguarding plan and verify the caller’s identity"],
              ["Disclosure restrictions", "Do not disclose the patient’s location without safeguarding-team approval"],
            ]}
          />
        </section>
        <section className="safety-panel-section">
          <h3>Concern records</h3>
          <article className="safety-record-card active">
            <h4>Domestic abuse risk <span>Active</span></h4>
            <StructuredDetails
              rows={[
                ["Responsible organisation", "Lancaster Women’s Hospital"],
                ["Concern date", formatDate("2026-09-02")],
                ["End date", "Ongoing"],
                ["Named team", "Safeguarding maternity team"],
                ["Contact", "Via hospital switchboard"],
                ["Instructions", "Speak with Leila alone at each attendance"],
                ["Restrictions", "Do not disclose appointment information to third parties"],
                ["Summary", "Active maternity safeguarding plan"],
                ["Outcome", "Ongoing review"],
              ]}
            />
          </article>
          <article className="safety-record-card historic">
            <h4>Housing instability <span>Historical</span></h4>
            <StructuredDetails
              rows={[
                ["Responsible organisation", "Lancaster Family Services"],
                ["Concern date", formatDate("2025-01-10")],
                ["End date", formatDate("2025-05-28")],
                ["Named team", "Early help service"],
                ["Summary", "Temporary accommodation support"],
                ["Outcome", "Closed following stable accommodation"],
              ]}
            />
          </article>
          <article className="safety-record-card historic">
            <h4>Financial vulnerability <span>Closed</span></h4>
            <StructuredDetails
              rows={[
                ["Responsible organisation", "Central City Practice"],
                ["Concern date", formatDate("2024-11-04")],
                ["End date", formatDate("2025-02-12")],
                ["Named team", "Social prescribing team"],
                ["Summary", "Referral for benefits and debt advice"],
                ["Outcome", "Support completed"],
              ]}
            />
          </article>
        </section>
        <LinkedDocuments documents={safeguardingDocuments} onOpen={openDocument} />
        <SourceInformation
          organisation="Lancaster Women’s Hospital"
          system="Maternity EPR"
          identifier="SG-4857772910-2026"
          recorded={formatDate("2026-09-02")}
          recordedBy="Safeguarding maternity team"
          role="Specialist safeguarding service"
          updated={`${formatDate("2026-09-16")} at 4:30pm`}
          sharing="Restricted — direct care team only"
        />
      </div>
    );
  }

  return (
    <div className="safety-panel-body" ref={contentRoot}>
      <section className="safety-panel-section">
        <h3>Current status</h3>
        <div className="safety-status-card pregnancy">
          <strong>Pregnant — 34 weeks and 1 day</strong>
          <span>Estimated date of delivery: {formatDate("2026-11-15")}</span>
        </div>
      </section>
      <section className="safety-panel-section">
        <h3>Important clinical detail</h3>
        <StructuredDetails
          rows={[
            ["Pregnancy status", "Ongoing"],
            ["Gestation", "34 weeks and 1 day"],
            ["Estimated date of delivery", formatDate("2026-11-15")],
            ["Lead organisation", "Lancaster Women’s Hospital"],
            ["Named team", "Community maternity team"],
            ["Current risk", "Gestational diabetes requiring glucose monitoring"],
          ]}
        />
      </section>
      <section className="safety-panel-section">
        <h3>Actions and instructions</h3>
        <ul className="safety-action-list">
          <li>Check pregnancy status before prescribing, imaging or treatment.</li>
          <li>Contact the maternity assessment unit for pregnancy-related urgent concerns.</li>
          <li>Review the current maternity care plan before admission or transfer.</li>
        </ul>
      </section>
      <SourceInformation
        organisation="Lancaster Women’s Hospital"
        system="Maternity EPR"
        identifier="MAT-4857772910-2026"
        recorded={formatDate("2026-03-12")}
        recordedBy="Community maternity team"
        role="Maternity service"
        updated={`${formatDate("2026-09-18")} at 8:55am`}
      />
    </div>
  );
}
