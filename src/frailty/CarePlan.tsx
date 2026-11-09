import { FormEvent, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { DataSection } from "../components/ui/DataSection";
import { DataTable } from "../components/ui/DataTable";
import { RecordPage } from "../components/ui/RecordPage";
import { StatusTag } from "../components/ui/StatusTag";
import { Subsection } from "../components/ui/Subsection";
import {
  actionTone,
  carePlanDomains,
  CarePlanAction,
  CarePlanDomain,
  frailtyConnectedSystems,
  ownerOptions,
  planHistory,
  planStatusTone,
  riskLabel,
  riskTone,
  serviceOptions,
  timescaleOptions,
} from "../data/frailty";
import { dateKey } from "../utils/sort";

/** Splits "Intro:\n• a\n• b" into a lead-in line and its bullets. */
function PlanText({ text }: { text: string }) {
  const [lead, ...rest] = text.split("\n");
  const items = rest.map((line) => line.replace(/^•\s*/, "")).filter(Boolean);
  return (
    <>
      <p>{lead}</p>
      {items.length > 0 && (
        <ul className="bullet-list">
          {items.map((item) => (
            <li key={item}>{item}</li>
          ))}
        </ul>
      )}
    </>
  );
}

const blankAction = { owner: "", service: "", timescale: "", notes: "" };

function DomainPanel({ domain, onEdited }: { domain: CarePlanDomain; onEdited: () => void }) {
  const [text, setText] = useState(domain.text);
  const [editing, setEditing] = useState(false);
  const [adding, setAdding] = useState(false);
  const [added, setAdded] = useState<CarePlanAction[]>([]);
  const [draft, setDraft] = useState(blankAction);
  const [message, setMessage] = useState("");
  const addButton = useRef<HTMLButtonElement>(null);

  const actions = [...domain.actions, ...added];
  const referred = actions.filter((a) => a.status === "Referred").length;
  const pending = actions.filter((a) => a.status === "Pending").length;

  function save(event: FormEvent) {
    event.preventDefault();
    setAdded((current) => [
      ...current,
      { title: draft.notes.trim(), status: "Suggested", owner: draft.owner, service: draft.service, timescale: draft.timescale },
    ]);
    setDraft(blankAction);
    setAdding(false);
    setMessage("Action added as suggested.");
    addButton.current?.focus();
  }

  const field = (key: keyof typeof blankAction) => ({
    value: draft[key],
    onChange: (event: { target: { value: string } }) => setDraft((current) => ({ ...current, [key]: event.target.value })),
  });

  return (
    <DataSection
      title={domain.title}
      defaultOpen={false}
      badge={
        <>
          {domain.risk && <StatusTag tone={riskTone[domain.risk]}>{riskLabel[domain.risk]}</StatusTag>}
          {referred > 0 && <StatusTag tone="blue">{referred} referred</StatusTag>}
          {pending > 0 && <StatusTag tone="orange">{pending} pending</StatusTag>}
        </>
      }
      summary={`${actions.length} actions`}
    >
      <Subsection
        title="Detailed care plan"
        aside={
          <button
            type="button"
            className="review-button"
            aria-pressed={editing}
            onClick={() => {
              if (editing) {
                onEdited();
                setMessage("Changes saved to the patient record.");
              }
              setEditing((value) => !value);
            }}
          >
            {editing ? "Save" : "Edit"}
            <span className="nhs-visually-hidden"> {domain.title} care plan</span>
          </button>
        }
      >
        {editing ? (
          <>
            <label className="nhs-visually-hidden" htmlFor={`${domain.id}-plan`}>
              Detailed care plan: {domain.title}
            </label>
            <textarea
              id={`${domain.id}-plan`}
              className="nhsuk-textarea"
              rows={9}
              value={text}
              onChange={(event) => setText(event.target.value)}
              autoFocus
            />
            <p className="review-field__hint">Review your changes, then select Save.</p>
          </>
        ) : (
          <PlanText text={text} />
        )}
      </Subsection>

      <Subsection
        title="Recommended actions"
        aside={
          <button
            ref={addButton}
            type="button"
            className="review-button"
            aria-expanded={adding}
            onClick={() => setAdding((value) => !value)}
          >
            Add action<span className="nhs-visually-hidden"> to {domain.title}</span>
          </button>
        }
      >
        {adding && (
          <form className="action-form" onSubmit={save}>
            <h4 className="action-form__title">Add action</h4>
            {[
              ["owner", "Owner", ownerOptions],
              ["service", "Service", serviceOptions],
              ["timescale", "Timescale", timescaleOptions],
            ].map(([key, label, options]) => (
              <div className="nhsuk-form-group" key={key as string}>
                <label className="nhsuk-label" htmlFor={`${domain.id}-${key}`}>{label as string}</label>
                <select
                  id={`${domain.id}-${key}`}
                  className="nhsuk-select"
                  required
                  {...field(key as keyof typeof blankAction)}
                >
                  <option value="" disabled>Select</option>
                  {(options as readonly string[]).map((option) => (
                    <option key={option}>{option}</option>
                  ))}
                </select>
              </div>
            ))}
            <div className="nhsuk-form-group">
              <label className="nhsuk-label" htmlFor={`${domain.id}-notes`}>Action details</label>
              <textarea id={`${domain.id}-notes`} className="nhsuk-textarea" rows={3} required {...field("notes")} />
            </div>
            <div className="page-steps">
              <button type="submit" className="nhsuk-button">Save action</button>
              <button type="button" className="nhsuk-button nhsuk-button--secondary" onClick={() => setAdding(false)}>
                Cancel
              </button>
            </div>
          </form>
        )}
        <DataTable
          caption={`Recommended actions: ${domain.title}`}
          columns={[
            { header: "Action", cell: (a) => <strong>{a.title}</strong>, sort: (a) => a.title },
            { header: "Status", cell: (a) => <StatusTag tone={actionTone[a.status]}>{a.status}</StatusTag>, sort: (a) => a.status },
            { header: "Owner", cell: (a) => a.owner, sort: (a) => a.owner },
            { header: "Timescale", cell: (a) => a.timescale, sort: (a) => a.timescale },
            { header: "Service", cell: (a) => a.service, sort: (a) => a.service },
          ]}
          rows={actions}
          rowKey={(a, index) => `${a.title}-${index}`}
        />
      </Subsection>
      <p className="nhs-visually-hidden" role="status">{message}</p>
      {message && <p className="review-field__hint" aria-hidden="true">{message}</p>}
    </DataSection>
  );
}

export default function FrailtyCarePlan() {
  const [saved, setSaved] = useState(false);

  return (
    <RecordPage
      title="Personalised care plan"
      intro="Generated from the CGA. Each domain pairs the written plan with the actions that deliver it."
      systems={frailtyConnectedSystems}
    >
      <DataSection title="Care plan history and attachments" summary={`${planHistory.length} plans`}>
        <DataTable
          caption="Care plan history and attachments"
          columns={[
            {
              header: "Plan",
              cell: (p) => (
                <>
                  <strong>{p.title}</strong>
                  {p.description && <small className="cell-note">{p.description}</small>}
                </>
              ),
              sort: (p) => p.title,
            },
            { header: "Status", cell: (p) => <StatusTag tone={planStatusTone[p.status]}>{p.status}</StatusTag>, sort: (p) => p.status },
            { header: "Date", cell: (p) => p.date, sort: (p) => dateKey(p.date) },
            {
              header: "Attachments",
              cell: (p) => (
                <ul className="plain-list">
                  {p.files.map((file) => (
                    <li key={file}>{file}</li>
                  ))}
                </ul>
              ),
            },
          ]}
          rows={planHistory}
          rowKey={(p) => p.title}
          defaultSort={{ header: "Date", direction: "descending" }}
        />
      </DataSection>

      {carePlanDomains.map((domain) => (
        <DomainPanel key={domain.id} domain={domain} onEdited={() => setSaved(false)} />
      ))}

      <div className="page-steps">
        <button type="button" className="nhsuk-button" onClick={() => setSaved(true)}>
          Save care plan
        </button>
        <Link className="nhsuk-button nhsuk-button--secondary" to="/frailty">
          Return to frailty snapshot
        </Link>
        <p role="status" className="page-steps__status">{saved ? "Care plan saved." : ""}</p>
      </div>
    </RecordPage>
  );
}
