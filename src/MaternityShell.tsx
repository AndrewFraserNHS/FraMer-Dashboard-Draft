import {
  createContext,
  FormEvent,
  ReactNode,
  useContext,
  useEffect,
  useRef,
  useState,
} from "react";
import { NavLink, useLocation } from "react-router-dom";

export type DetailPanel = {
  title: string;
  eyebrow?: string;
  status?: string;
  tone?: "red" | "purple" | "blue" | "amber";
  content: ReactNode;
};

const DetailPanelContext = createContext<((panel: DetailPanel) => void) | null>(null);

export function useDetailPanel() {
  const openPanel = useContext(DetailPanelContext);
  if (!openPanel) {
    throw new Error("useDetailPanel must be used within MaternityShell");
  }
  return openPanel;
}

const tabs = [
  ["Summary", "/"],
  ["Pregnancy", "/pregnancy"],
  ["Appointments", "/appointments"],
  ["Results", "/results"],
  ["Conditions", "/comorbidities"],
  ["Care plans", "/care-plans"],
  ["Documents", "/documents"],
  ["Audit", "/audit"],
] as const;

const recordViews = [
  "Core record",
  "Cancer",
  "Children and young people",
  "Diagnostics",
  "Frailty",
  "Long-term conditions",
  "Maternity",
  "Mental health",
  "Planned and elective care",
] as const;

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

const safetyFlags: ReadonlyArray<{
  label: string;
  title: string;
  tone: DetailPanel["tone"];
  kind: SafetyFlagKind;
  status?: string;
}> = [
  {
    label: "Gestational diabetes",
    title: "Gestational diabetes",
    tone: "blue",
    kind: "gestationalDiabetes",
    status: "Active",
  },
  {
    label: "Penicillin allergy",
    title: "Penicillin allergy",
    tone: "blue",
    kind: "allergies",
    status: "Confirmed allergy",
  },
  {
    label: "High body mass index (32)",
    title: "High body mass index (32)",
    tone: "blue",
    kind: "bodyMassIndex",
    status: "Active",
  },
  {
    label: "Depression and anxiety (history)",
    title: "Depression and anxiety (history)",
    tone: "blue",
    kind: "mentalHealth",
    status: "Currently managed",
  },
  {
    label: "Sertraline in pregnancy",
    title: "Sertraline in pregnancy",
    tone: "blue",
    kind: "medicine",
    status: "Active medicine",
  },
  {
    label: "Language need",
    title: "Language need",
    tone: "blue",
    kind: "adjustment",
    status: "Active",
  },
  {
    label: "Safeguarding",
    title: "Safeguarding",
    tone: "blue",
    kind: "safeguarding",
    status: "1 active concern",
  },
];

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
    date: "12 August 2026",
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
    date: "18 June 2026",
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
    date: "20 February 2026",
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
    date: "2 September 2026",
    restricted: true,
    content: null,
  },
  {
    title: "Strategy meeting notes",
    type: "Meeting record",
    organisation: "Lancaster Family Services",
    author: "Not supplied by source",
    specialty: "Children and families",
    date: "8 September 2026",
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
      ["Date diagnosed", "5 September 2026"],
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
      recorded: "5 September 2026",
      recordedBy: "Diabetes antenatal team",
      role: "Maternity diabetes service",
      updated: "12 September 2026 at 2:10pm",
    },
  },
  bodyMassIndex: {
    status: "Active pregnancy risk factor",
    summary:
      "Body mass index recorded as 32 at maternity booking and included in the current pregnancy risk assessment.",
    rows: [
      ["Body mass index", "32"],
      ["Clinical status", "Active"],
      ["Date recorded", "15 August 2026"],
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
      recorded: "15 August 2026",
      recordedBy: "Community maternity team",
      role: "Maternity service",
      updated: "15 August 2026 at 11:20am",
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
      updated: "5 October 2026 at 8:45am",
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
      updated: "5 October 2026 at 8:45am",
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
          ["Last refreshed by NCRS", "18 September 2026 at 9:42am"],
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

function SafetyFlagPanel({ kind }: { kind: SafetyFlagKind }) {
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
              ["Date first recorded", "4 March 2011"],
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
                ["Date recorded", "12 August 2026"],
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
                ["Date recorded", "18 June 2026"],
                ["Notes", "Copied from patient-reported admission history"],
              ]}
            />
          </article>
        </section>
        <section className="safety-panel-section">
          <h3>Contextual medicine exposure</h3>
          <div className="safety-callout warning">
            <strong>Cefalexin was prescribed on 22 June 2026.</strong> No reaction
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
          recorded="4 March 2011"
          recordedBy="Dr Anita Shah"
          role="General practitioner"
          updated="12 August 2026 at 3:18pm"
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
          recorded="20 February 2026"
          recordedBy="Nadia Hussain"
          role="Practice nurse"
          updated="20 February 2026 at 11:06am"
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
                ["Concern date", "2 September 2026"],
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
                ["Concern date", "10 January 2025"],
                ["End date", "28 May 2025"],
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
                ["Concern date", "4 November 2024"],
                ["End date", "12 February 2025"],
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
          recorded="2 September 2026"
          recordedBy="Safeguarding maternity team"
          role="Specialist safeguarding service"
          updated="16 September 2026 at 4:30pm"
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
          <span>Estimated date of delivery: 15 November 2026</span>
        </div>
      </section>
      <section className="safety-panel-section">
        <h3>Important clinical detail</h3>
        <StructuredDetails
          rows={[
            ["Pregnancy status", "Ongoing"],
            ["Gestation", "34 weeks and 1 day"],
            ["Estimated date of delivery", "15 November 2026"],
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
        recorded="12 March 2026"
        recordedBy="Community maternity team"
        role="Maternity service"
        updated="18 September 2026 at 8:55am"
      />
    </div>
  );
}

function PatientSearchScreen({
  onFound,
  onCancel,
}: {
  onFound: () => void;
  onCancel: () => void;
}) {
  const [mode, setMode] = useState<"NHS number" | "Demographics">("NHS number");
  const [nhsNumber, setNhsNumber] = useState("");
  const [fullName, setFullName] = useState("");
  const [dob, setDob] = useState("");
  const [error, setError] = useState("");
  const [searching, setSearching] = useState(false);

  function search(event: FormEvent) {
    event.preventDefault();
    const valid =
      mode === "NHS number"
        ? nhsNumber.replace(/\s/g, "") === "4857772910"
        : fullName.trim().toLowerCase().includes("leila") &&
          dob === "1995-06-14";
    if (!valid) {
      setError(
        mode === "NHS number"
          ? "Enter the fictional NHS number 485 777 2910."
          : "Enter Leila Khan and 14 June 1995.",
      );
      return;
    }
    setError("");
    setSearching(true);
    window.setTimeout(() => {
      setSearching(false);
      onFound();
    }, 450);
  }

  return (
    <div className="patient-search-screen">
      <header>
        <span className="record-nhs-logo">NHS</span>
        <strong>National Care Records Service</strong>
      </header>
      <main>
        <button className="back-link" onClick={onCancel}>
          Back to patient record
        </button>
        <div className="patient-search-card">
          <h1>Find a patient</h1>
          <p>Search for a patient before accessing their national care record.</p>
          <div
            className="search-methods"
            role="group"
            aria-label="Search method"
          >
            {(["NHS number", "Demographics"] as const).map((item) => (
              <button
                key={item}
                aria-pressed={mode === item}
                onClick={() => {
                  setMode(item);
                  setError("");
                }}
              >
                {item}
              </button>
            ))}
          </div>
          <form onSubmit={search}>
            {mode === "NHS number" ? (
              <label>
                NHS number <span aria-label="required">*</span>
                <input
                  inputMode="numeric"
                  autoComplete="off"
                  value={nhsNumber}
                  onChange={(event) => setNhsNumber(event.target.value)}
                  placeholder="For example, 485 777 2910"
                />
              </label>
            ) : (
              <>
                <label>
                  Full name <span aria-label="required">*</span>
                  <input
                    autoComplete="off"
                    value={fullName}
                    onChange={(event) => setFullName(event.target.value)}
                    placeholder="For example, Leila Khan"
                  />
                </label>
                <label>
                  Date of birth <span aria-label="required">*</span>
                  <input
                    type="date"
                    value={dob}
                    onChange={(event) => setDob(event.target.value)}
                  />
                </label>
              </>
            )}
            {error && (
              <div className="search-error" role="alert">
                <strong>There is a problem</strong>
                <span>{error}</span>
              </div>
            )}
            <button className="record-primary-button" disabled={searching}>
              {searching ? "Searching…" : "Search"}
            </button>
          </form>
        </div>
      </main>
    </div>
  );
}

function PatientConfirmScreen({
  onConfirm,
  onBack,
}: {
  onConfirm: () => void;
  onBack: () => void;
}) {
  return (
    <div className="patient-search-screen">
      <header>
        <span className="record-nhs-logo">NHS</span>
        <strong>National Care Records Service</strong>
      </header>
      <main>
        <button className="back-link" onClick={onBack}>
          Back to search
        </button>
        <div className="patient-search-card patient-confirm-card">
          <p className="confirm-eyebrow">Patient found</p>
          <h1>Confirm patient details</h1>
          <dl>
            <div>
              <dt>Name</dt>
              <dd>Leila KHAN</dd>
            </div>
            <div>
              <dt>Date of birth</dt>
              <dd>14 June 1995 (31 years)</dd>
            </div>
            <div>
              <dt>NHS number</dt>
              <dd>485 777 2910</dd>
            </div>
            <div>
              <dt>Address</dt>
              <dd>14 Ryelands Crescent, Lancaster, LA1 3PQ</dd>
            </div>
          </dl>
          <div className="confirm-warning">
            Only access this record when you have a legitimate relationship
            with the patient. Access will be recorded in the audit log.
          </div>
          <div className="record-panel-actions">
            <button className="record-primary-button" onClick={onConfirm}>
              Confirm and open record
            </button>
            <button onClick={onBack}>Back</button>
          </div>
        </div>
      </main>
    </div>
  );
}

export default function MaternityShell({ children }: { children: ReactNode }) {
  const location = useLocation();
  const [appView, setAppView] = useState<"search" | "confirm" | "record">(
    "record",
  );
  const [accessToastVisible, setAccessToastVisible] = useState(false);
  const [textSize, setTextSize] = useState<"small" | "medium" | "large">(
    "small",
  );
  const [filtersOpen, setFiltersOpen] = useState(false);
  const [allExpanded, setAllExpanded] = useState(false);
  const [selectedRecordView, setSelectedRecordView] = useState("Maternity");
  const [viewMenuOpen, setViewMenuOpen] = useState(false);
  const [panel, setPanel] = useState<DetailPanel | null>(null);
  const panelTrigger = useRef<HTMLElement | null>(null);
  const savedScrollPosition = useRef(0);
  const closeButton = useRef<HTMLButtonElement | null>(null);
  const viewMenu = useRef<HTMLDivElement | null>(null);
  const viewMenuTrigger = useRef<HTMLButtonElement | null>(null);

  function openPanel(nextPanel: DetailPanel) {
    panelTrigger.current = document.activeElement as HTMLElement;
    savedScrollPosition.current =
      document.querySelector<HTMLElement>(".maternity-content")?.scrollTop ?? 0;
    setPanel(nextPanel);
  }

  function closePanel() {
    setPanel(null);
    requestAnimationFrame(() => {
      const content =
        document.querySelector<HTMLElement>(".maternity-content");
      if (content) content.scrollTop = savedScrollPosition.current;
      panelTrigger.current?.focus();
    });
  }

  useEffect(() => {
    if (!panel) return;
    closeButton.current?.focus();
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") closePanel();
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [panel]);

  useEffect(() => {
    if (!viewMenuOpen) return;
    const handlePointerDown = (event: PointerEvent) => {
      if (!viewMenu.current?.contains(event.target as Node)) setViewMenuOpen(false);
    };
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key !== "Escape") return;
      setViewMenuOpen(false);
      viewMenuTrigger.current?.focus();
    };
    window.addEventListener("pointerdown", handlePointerDown);
    window.addEventListener("keydown", handleKeyDown);
    return () => {
      window.removeEventListener("pointerdown", handlePointerDown);
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [viewMenuOpen]);

  useEffect(() => {
    const current =
      tabs.find(([, path]) => path === location.pathname)?.[0] ?? "Summary";
    document.title = `${current} — Leila Khan — NHS National Care Records Service`;
    setPanel(null);
  }, [location.pathname]);

  useEffect(() => {
    if (location.pathname === "/" || location.pathname === "/audit") return;
    const main = document.querySelector<HTMLElement>(".maternity-content .ncrs-main");
    if (!main) return;

    const decorateRecords = () => {
      main.querySelectorAll<HTMLElement>("[data-section-toggle]").forEach((button) => {
        const title = button
          .querySelector<HTMLElement>("p, span")
          ?.innerText.trim() || "section";
        const action = button.getAttribute("aria-expanded") === "true" ? "Hide" : "Show";
        button.setAttribute("aria-label", `${action} ${title}`);
      });

      main.querySelectorAll<HTMLTableElement>("table").forEach((table, index) => {
        table.querySelectorAll<HTMLTableCellElement>("th").forEach((heading) => {
          if (!heading.innerText.trim()) heading.setAttribute("aria-label", "Actions");
        });
        if (table.hasAttribute("aria-label") || table.querySelector("caption")) return;
        const sectionTitle = table
          .closest<HTMLElement>("[class*='border']")
          ?.querySelector<HTMLElement>("button[data-section-toggle] p, button[data-section-toggle] span")
          ?.innerText.trim();
        table.setAttribute(
          "aria-label",
          sectionTitle || `${tabs.find(([, path]) => path === location.pathname)?.[0] ?? "Clinical"} records table ${index + 1}`,
        );
      });

      main.querySelectorAll<HTMLElement>(
        "tbody tr, ul li, div[class*='border'][class*='px-'][class*='py-']",
      ).forEach((item) => {
        if (item.matches("div") && item.querySelector("table, ul, button[data-section-toggle]")) return;
        const interactiveChild = item.querySelector<HTMLElement>("button, a[href]");
        if (interactiveChild) {
          item.classList.add("specialist-detail-parent");
          interactiveChild.classList.add("specialist-detail-trigger");
          interactiveChild.setAttribute("aria-label", `View details for ${item.innerText.trim().split("\n")[0] || "record"}`);
        } else {
          item.classList.add("specialist-detail-trigger");
          item.setAttribute("role", "button");
          item.setAttribute("tabindex", "0");
          item.setAttribute("aria-label", `View details for ${item.innerText.trim().split("\n")[0] || "record"}`);
        }
      });
    };

    decorateRecords();
    const observer = new MutationObserver(decorateRecords);
    observer.observe(main, {
      childList: true,
      subtree: true,
      attributes: true,
      attributeFilter: ["aria-expanded"],
    });
    return () => observer.disconnect();
  }, [location.pathname]);

  function openSpecialistDetail(item: HTMLElement) {
    const cells = Array.from(item.querySelectorAll<HTMLElement>("td"));
    const table = item.closest("table");
    const headings = table
      ? Array.from(table.querySelectorAll<HTMLElement>("thead th")).map((heading) => heading.innerText.trim())
      : [];
    const values = cells.length
      ? cells.map((cell) => cell.innerText.trim()).filter(Boolean)
      : item.innerText.split("\n").map((value) => value.trim()).filter(Boolean);
    const rows = values.map((value, index) => [
      headings[index] || (index === 0 ? "Record detail" : `Detail ${index + 1}`),
      value,
    ]);
    const title = values[2] || values[1] || values[0] || "Record detail";

    openPanel({
      eyebrow: `${tabs.find(([, path]) => path === location.pathname)?.[0] ?? "Clinical"} detail`,
      title: title.length > 80 ? `${title.slice(0, 77)}…` : title,
      content: <dl className="panel-detail-list">
        {rows.map(([label, value], index) => <div key={`${label}-${index}`}><dt>{label}</dt><dd>{value}</dd></div>)}
        <div><dt>Patient</dt><dd>Leila Khan</dd></div>
        <div><dt>Record source</dt><dd>Shared maternity record</dd></div>
      </dl>,
    });
  }

  function toggleAllSections() {
    const nextExpanded = !allExpanded;
    const toggles = document.querySelectorAll<HTMLElement>(
      ".maternity-content [data-section-toggle]",
    );

    toggles.forEach((button) => {
      if ((button.getAttribute("aria-expanded") === "true") !== nextExpanded) {
        button.click();
      }
    });
    setAllExpanded(nextExpanded);
  }

  if (appView === "search") {
    return (
      <PatientSearchScreen
        onFound={() => setAppView("confirm")}
        onCancel={() => setAppView("record")}
      />
    );
  }

  if (appView === "confirm") {
    return (
      <PatientConfirmScreen
        onBack={() => setAppView("search")}
        onConfirm={() => {
          setAppView("record");
          setAccessToastVisible(true);
          window.setTimeout(() => setAccessToastVisible(false), 4000);
        }}
      />
    );
  }

  return (
    <div className={`record-shell text-${textSize}`}>
      <a className="record-skip-link" href="#main-content">
        Skip to main content
      </a>

      <div className="record-frame">
        {accessToastVisible && (
          <div className="access-toast" role="status" aria-live="polite">
            Access logged — this record access has been recorded for audit
          </div>
        )}
        <header className="record-header">
          <div className="record-brand">
            <img
              className="record-nhs-logo-image"
              src="/assets/1b6bd.png"
              alt="NHS"
            />
            <span>National Care Records Service</span>
          </div>
          <nav aria-label="Service navigation" className="record-utilities">
            <button className="tablet-preview" type="button">
              Tablet preview
            </button>
            <div className="record-patient-switcher">
              <strong>Patient</strong>
              <button type="button">
                Existing patient
                <span aria-hidden="true" />
              </button>
            </div>
            <button
              onClick={() => setAppView("search")}
            >
              Find patient
            </button>
            <button onClick={() => {}}>
              List birth notifications
            </button>
            <button onClick={() => {}}>
              Change role
            </button>
            <button onClick={() => {}}>
              What’s new
            </button>
            <button onClick={() => {}}>
              Give feedback
            </button>
            <button onClick={() => {}}>
              Log out
            </button>
          </nav>
        </header>

        <section className="record-patient-banner" aria-label="Patient identity">
          <div className="record-demographics">
            <h1>Leila KHAN</h1>
            <span>31 years old</span>
            <i>|</i>
            <span>Female</span>
            <i>|</i>
            <span>
              DoB: <strong>14 June 1995</strong>
            </span>
            <i>|</i>
            <span>
              NHS number: <strong>485 777 2910</strong>
            </span>
            <i>|</i>
            <span>
              Address:{" "}
              <strong>14 Ryelands Crescent, Lancaster, LA1 3PQ</strong>
            </span>
          </div>
          <div className="record-context-ribbon" aria-label="Maternity context">
            <strong>
              Cross-boundary: registered with Surrey Heartlands Integrated Care
              Board (ICB) — viewing clinician is NHS South East London ICB
            </strong>
          </div>

          <div className="record-tabs-row">
            <nav aria-label="Patient record sections" className="record-tabs">
              {tabs.map(([label, path]) => (
                <NavLink
                  key={path}
                  to={path}
                  end={path === "/"}
                  className={({ isActive }) => (isActive ? "active" : "")}
                >
                  {label}
                </NavLink>
              ))}
            </nav>
            <div className="record-tab-tools">
              <fieldset className="text-size-control">
                <legend>Text size</legend>
                {(["small", "medium", "large"] as const).map((size) => (
                  <label key={size}>
                    <input
                      type="radio"
                      name="record-text-size"
                      checked={textSize === size}
                      onChange={() => setTextSize(size)}
                    />
                    {size[0].toUpperCase() + size.slice(1)}
                  </label>
                ))}
              </fieldset>
              <div className="record-view-menu" ref={viewMenu}>
                <button
                  ref={viewMenuTrigger}
                  type="button"
                  className="record-view-trigger"
                  aria-haspopup="menu"
                  aria-expanded={viewMenuOpen}
                  onClick={() => setViewMenuOpen((open) => !open)}
                  onKeyDown={(event) => {
                    if (event.key !== "ArrowDown") return;
                    event.preventDefault();
                    setViewMenuOpen(true);
                    requestAnimationFrame(() => {
                      viewMenu.current?.querySelector<HTMLButtonElement>("[role^='menuitem']")?.focus();
                    });
                  }}
                >
                  View: {selectedRecordView}
                </button>
                {viewMenuOpen && <div
                  className="record-view-options"
                  role="menu"
                  aria-label="Choose record view"
                  onKeyDown={(event) => {
                    if (!["ArrowDown", "ArrowUp", "Home", "End"].includes(event.key)) return;
                    event.preventDefault();
                    const items = Array.from(event.currentTarget.querySelectorAll<HTMLButtonElement>("[role^='menuitem']"));
                    const current = items.indexOf(document.activeElement as HTMLButtonElement);
                    const next = event.key === "Home"
                      ? 0
                      : event.key === "End"
                        ? items.length - 1
                        : event.key === "ArrowDown"
                          ? (current + 1) % items.length
                          : (current - 1 + items.length) % items.length;
                    items[next]?.focus();
                  }}
                >
                  {recordViews.map((view, index) => <div key={view}>
                    {(index === 1 || index === 7) && <div className="record-view-separator" role="separator" />}
                    {view === "Core record" || view === "Frailty" ? <a
                      href={view === "Frailty"
                        ? "https://nhs-ncrs-frailty.figma.site/"
                        : "https://nhs-ncrs-core-record.figma.site"}
                      role="menuitem"
                    >
                      {view}
                    </a> : <button
                      type="button"
                      role="menuitemradio"
                      aria-checked={selectedRecordView === view}
                      className={selectedRecordView === view ? "active" : ""}
                      onClick={() => {
                        setSelectedRecordView(view);
                        setViewMenuOpen(false);
                        viewMenuTrigger.current?.focus();
                      }}
                    >
                      {view}
                    </button>}
                  </div>)}
                  <div className="record-view-separator" role="separator" />
                  <button
                    type="button"
                    role="menuitem"
                    onClick={() => setViewMenuOpen(false)}
                  >
                    All views (16)
                  </button>
                </div>}
              </div>
            </div>
          </div>
        </section>

        <section className="record-safety-strip" aria-label="Safety flags">
          <strong className="safety-label">
            Safety flags:
          </strong>
          <div className="safety-flags">
            {safetyFlags.map((flag) => (
              <button
                key={flag.label}
                className={`safety-flag ${flag.tone}`}
                onClick={() =>
                  openPanel({
                    eyebrow: "Clinical alert",
                    title: flag.title,
                    status: flag.status,
                    tone: flag.tone,
                    content: <SafetyFlagPanel kind={flag.kind} />,
                  })
                }
              >
                {flag.label}
              </button>
            ))}
          </div>
          <div className="record-tools">
            <button type="button" onClick={toggleAllSections}>
              {allExpanded ? "Collapse all sections" : "Expand all sections"}
            </button>
            <button
              type="button"
              aria-expanded={filtersOpen}
              onClick={() => setFiltersOpen((value) => !value)}
            >
              {filtersOpen ? "Hide filters" : "Show filters"}
            </button>
          </div>
        </section>

        {filtersOpen && <section className="record-filterbar" aria-label="Record filters">
          <label>
            Care setting
            <select defaultValue="all">
              <option value="all">All care settings</option>
              <option>Community maternity</option>
              <option>Antenatal clinic</option>
              <option>Outpatient</option>
              <option>Inpatient</option>
            </select>
          </label>
          <label>
            Event type
            <select defaultValue="all">
              <option value="all">All event types</option>
              <option>Appointments</option>
              <option>Scans</option>
              <option>Investigations</option>
              <option>Reviews</option>
            </select>
          </label>
          <label>
            Organisation
            <select defaultValue="all">
              <option value="all">All organisations</option>
              <option>BadgerNet Maternity</option>
              <option>Central City Practice</option>
              <option>Community Perinatal Service</option>
              <option>Diabetes Antenatal Clinic</option>
            </select>
          </label>
          <label>
            Specialty
            <select defaultValue="all">
              <option value="all">All specialties</option>
              <option>Maternity</option>
              <option>Diabetes</option>
              <option>Perinatal mental health</option>
              <option>Ultrasound</option>
            </select>
          </label>
          <label>
            Date range
            <select defaultValue="all">
              <option value="all">All time</option>
              <option>Last 7 days</option>
              <option>Last 30 days</option>
              <option>This pregnancy</option>
            </select>
          </label>
        </section>}

        <div className="record-workspace">
          <nav className="tablet-section-nav" aria-label="Record sections">
            <strong>Record sections</strong>
            {tabs.map(([label, path]) => (
              <NavLink
                key={path}
                to={path}
                end={path === "/"}
                className={({ isActive }) => (isActive ? "active" : "")}
              >
                {label}
              </NavLink>
            ))}
            <fieldset>
              <legend>Text size</legend>
              {(["small", "medium", "large"] as const).map((size) => (
                <button
                  key={size}
                  aria-pressed={textSize === size}
                  onClick={() => setTextSize(size)}
                >
                  {size[0].toUpperCase() + size.slice(1)}
                </button>
              ))}
            </fieldset>
          </nav>
          <main
            id="main-content"
            className="maternity-content"
            tabIndex={-1}
            onClickCapture={(event) => {
              const trigger = (event.target as HTMLElement).closest<HTMLElement>(".specialist-detail-trigger");
              if (!trigger) return;
              const item = trigger.closest<HTMLElement>(".specialist-detail-parent") || trigger;
              event.preventDefault();
              openSpecialistDetail(item);
            }}
            onKeyDownCapture={(event) => {
              if (event.key !== "Enter" && event.key !== " ") return;
              const trigger = (event.target as HTMLElement).closest<HTMLElement>(".specialist-detail-trigger");
              if (!trigger || event.target !== trigger || trigger.matches("button, a[href]")) return;
              event.preventDefault();
              openSpecialistDetail(trigger);
            }}
          >
            <DetailPanelContext.Provider value={openPanel}>
              {children}
            </DetailPanelContext.Provider>
          </main>
          {panel && (
            <aside className="record-detail-panel" role="region" aria-labelledby="record-detail-panel-title">
              <div className={`record-panel-heading tone-${panel.tone || "blue"}`}>
                <div>
                  {panel.eyebrow && <span>{panel.eyebrow}</span>}
                  <h2 id="record-detail-panel-title">{panel.title}</h2>
                  {panel.status && <b className="record-panel-status">{panel.status}</b>}
                </div>
                <button
                  ref={closeButton}
                  onClick={closePanel}
                  aria-label={`Close ${panel.title} details`}
                >
                  ×
                </button>
              </div>
              <div className="record-panel-content">{panel.content}</div>
            </aside>
          )}
        </div>
      </div>
    </div>
  );
}
