import {
  createContext,
  FormEvent,
  ReactNode,
  useContext,
  useEffect,
  useRef,
  useState,
} from "react";
import { NavLink, useLocation, useNavigate } from "react-router-dom";
import { BreadcrumbProvider, BreadcrumbNav } from "./BreadcrumbNav";
import { DetailPanel as DetailPanelComponent } from "./DetailPanel";
import { Dialog } from "./components/ui/Dialog";
import { DisclosureGroup } from "./components/ui/DisclosureGroup";
import { ServiceHeader } from "./components/shell/ServiceHeader";
import { PatientBar } from "./components/shell/PatientBar";
import { AlertsBand } from "./components/shell/AlertsBand";
import { OptionsSidebar, TextSize } from "./components/shell/OptionsSidebar";
import { MenuButton } from "./components/shell/MenuButton";
import { defaultSectionOrder, SectionOrderContext } from "./components/ui/SectionOrder";
import { risks } from "./data/patient";
import { FrailtyFlagPanel, frailtyFlags } from "./frailty/FlagPanel";
import { allViewLabels, recordViews, viewForPath } from "./views";

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

const safetyFlags: ReadonlyArray<{
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

function ReorderModal({
  isOpen,
  onClose,
  cards,
  onReorder,
}: {
  isOpen: boolean;
  onClose: () => void;
  cards: readonly string[];
  onReorder: (newOrder: string[]) => void;
}) {
  return (
    <Dialog open={isOpen} title="Reorder sections" onClose={onClose}>
      {/* Mounted only while open, so the working order resets each time */}
      <ReorderList cards={cards} onApply={(order) => { onReorder(order); onClose(); }} onCancel={onClose} />
    </Dialog>
  );
}

function ReorderList({
  cards,
  onApply,
  onCancel,
}: {
  cards: readonly string[];
  onApply: (order: string[]) => void;
  onCancel: () => void;
}) {
  const [order, setOrder] = useState<string[]>([...cards]);
  const [announcement, setAnnouncement] = useState("");
  const list = useRef<HTMLUListElement | null>(null);
  const refocus = useRef<{ card: string; direction: "up" | "down" } | null>(null);

  useEffect(() => {
    const target = refocus.current;
    if (!target) return;
    refocus.current = null;
    const row = list.current?.querySelector<HTMLElement>(`[data-card="${CSS.escape(target.card)}"]`);
    const buttons = row?.querySelectorAll<HTMLButtonElement>("button");
    if (!buttons) return;
    const [up, down] = [buttons[0], buttons[1]];
    // Keep focus on the button that was pressed; if it is now disabled, use the other one
    const preferred = target.direction === "up" ? up : down;
    (preferred.disabled ? (target.direction === "up" ? down : up) : preferred).focus();
  }, [order]);

  function move(index: number, direction: "up" | "down") {
    const next = [...order];
    const target = direction === "up" ? index - 1 : index + 1;
    if (target < 0 || target >= next.length) return;
    [next[index], next[target]] = [next[target], next[index]];
    refocus.current = { card: order[index], direction };
    setOrder(next);
    setAnnouncement(`${order[index]} moved to position ${target + 1} of ${next.length}`);
  }

  return (
    <>
      <p>Use the arrow buttons to change the order of the sections on the Summary page.</p>
      <ul className="reorder-list" ref={list}>
        {order.map((card, index) => (
          <li key={card} data-card={card}>
            <span>{card}</span>
            <div className="reorder-buttons">
              <button
                type="button"
                className="nhsuk-button nhsuk-button--secondary"
                onClick={() => move(index, "up")}
                disabled={index === 0}
                aria-label={`Move ${card} up`}
              >
                <span aria-hidden="true">↑</span>
              </button>
              <button
                type="button"
                className="nhsuk-button nhsuk-button--secondary"
                onClick={() => move(index, "down")}
                disabled={index === order.length - 1}
                aria-label={`Move ${card} down`}
              >
                <span aria-hidden="true">↓</span>
              </button>
            </div>
          </li>
        ))}
      </ul>
      <p role="status" className="nhs-visually-hidden">{announcement}</p>
      <div className="ncrs-dialog__footer">
        <button type="button" className="nhsuk-button nhsuk-button--secondary" onClick={onCancel}>
          Cancel
        </button>
        <button type="button" className="nhsuk-button" onClick={() => onApply(order)}>
          Apply
        </button>
      </div>
    </>
  );
}

export default function MaternityShell({ children }: { children: ReactNode }) {
  const location = useLocation();
  const navigate = useNavigate();
  const view = recordViews[viewForPath(location.pathname)];
  const tabs = view.tabs;
  const currentTabLabel =
    tabs.find(([, path]) => path === location.pathname)?.[0] ?? tabs[0][0];
  const [viewAnnouncement, setViewAnnouncement] = useState("");
  const previousView = useRef(view.key);
  const [appView, setAppView] = useState<"search" | "confirm" | "record">(
    "record",
  );
  const [accessToastVisible, setAccessToastVisible] = useState(false);
  const [textSize, setTextSize] = useState<TextSize>(
    "small",
  );
  const [filtersOpen, setFiltersOpen] = useState(false);
  const [optionsOpen, setOptionsOpen] = useState(
    () => typeof window === "undefined" || window.innerWidth >= 1200,
  );
  const [showReorderModal, setShowReorderModal] = useState(false);
  const [cardOrder, setCardOrder] = useState<string[]>([...defaultSectionOrder]);
  const [panel, setPanel] = useState<DetailPanel | null>(null);
  const panelTrigger = useRef<HTMLElement | null>(null);
  const savedScrollPosition = useRef(0);

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
    document.title = `${currentTabLabel} — ${view.patient.name} — NHS National Care Records Service`;
    setPanel(null);
  }, [location.pathname, currentTabLabel, view]);

  // Changing view changes the patient on screen, so say so, and move focus to the new content.
  useEffect(() => {
    if (previousView.current === view.key) return;
    previousView.current = view.key;
    setViewAnnouncement(`Now viewing ${view.patient.name}, ${view.label} record.`);
    requestAnimationFrame(() => document.getElementById("main-content")?.focus());
  }, [view]);

  const patientMenu = (
    <MenuButton
      label={<>Patient: {view.patient.name.split(" ")[0]}</>}
      items={Object.values(recordViews).map((item) => ({
        label: item.patient.name,
        hint: `${item.label} record`,
        current: item.key === view.key,
        onSelect: () => item.key !== view.key && navigate(item.home),
      }))}
    />
  );

  const viewMenu = (
    <MenuButton
      label={<>Record view: {view.label}</>}
      items={allViewLabels.map((label) => ({
        label,
        current: label === view.label,
        disabled: label !== view.label,
        hint: label === view.label ? undefined : `No ${label.toLowerCase()} data for this patient`,
        onSelect: () => {},
      }))}
    />
  );

  const flags =
    view.key === "frailty"
      ? frailtyFlags.map((flag) => ({
          id: flag.id,
          label: flag.label,
          level: flag.level,
          onOpen: () =>
            openPanel({
              eyebrow: "Clinical alert",
              title: flag.label,
              status: flag.status,
              tone: flag.level === "high" ? "red" : "amber",
              content: <FrailtyFlagPanel flag={flag} />,
            }),
        }))
      : safetyFlags.map((flag) => ({
          id: flag.id,
          label: flag.label,
          level: flag.level,
          onOpen: () =>
            openPanel({
              eyebrow: "Clinical alert",
              title: flag.title,
              status: flag.status,
              tone: flag.tone,
              content: <SafetyFlagPanel kind={flag.kind} />,
            }),
        }));

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
    <BreadcrumbProvider>
      <DisclosureGroup>
      <SectionOrderContext.Provider value={cardOrder}>
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
          <ServiceHeader onFindPatient={() => setAppView("search")} patientMenu={patientMenu} />
          <PatientBar key={view.key} patient={view.patient} viewMenu={viewMenu} />
          <AlertsBand key={`alerts-${view.key}`} flags={flags} />
          <p role="status" className="nhs-visually-hidden">{viewAnnouncement}</p>
          <nav aria-label="Patient record sections" className="ncrs-tabs">
            <ul>
              {tabs.map(([label, path]) => (
                <li key={path}>
                  <NavLink to={path} end={path === "/"}>
                    {label}
                  </NavLink>
                </li>
              ))}
            </ul>
          </nav>

        {view.hasFilters && filtersOpen && <section className="record-filterbar" aria-label="Record filters">
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
          <OptionsSidebar
            open={optionsOpen}
            onOpenChange={setOptionsOpen}
            textSize={textSize}
            onTextSize={setTextSize}
            filtersOpen={filtersOpen}
            onToggleFilters={view.hasFilters ? () => setFiltersOpen((value) => !value) : undefined}
            onReorder={view.canReorder ? () => setShowReorderModal(true) : undefined}
          />
          <main
            id="main-content"
            className="maternity-content"
            tabIndex={-1}
          >
            <DetailPanelContext.Provider value={openPanel}>
              <BreadcrumbNav />
              <div style={{ display: panel ? 'none' : 'block' }}>
                {children}
              </div>
              <DetailPanelComponent 
                isOpen={!!panel}
                title={panel?.title || ""}
                eyebrow={panel?.eyebrow}
                status={panel?.status}
                tone={panel?.tone}
                content={panel?.content}
                onClose={closePanel}
                backLabel={`Back to ${currentTabLabel}`}
              />
            </DetailPanelContext.Provider>
          </main>
        </div>
        <ReorderModal 
          isOpen={showReorderModal} 
          onClose={() => setShowReorderModal(false)} 
          cards={cardOrder}
          onReorder={setCardOrder}
        />
      </div>
      </div>
      </SectionOrderContext.Provider>
      </DisclosureGroup>
    </BreadcrumbProvider>
  );
}
