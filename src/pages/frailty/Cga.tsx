import { usePersistentState } from "../../hooks/usePersistentState";
import { Link } from "react-router-dom";
import { Callout } from "../../components/ui/Callout";
import { ButtonLink } from "../../components/ui/Button";
import { DataSection } from "../../components/ui/DataSection";
import { DataTable } from "../../components/ui/DataTable";
import { DetailList } from "../../components/ui/DetailList";
import { RecordPage } from "../../components/ui/RecordPage";
import { PromptStatus, ReviewField, ReviewPrompt, ReviewStatus } from "../../components/ui/ReviewField";
import { StatusTag } from "../../components/ui/StatusTag";
import { Subsection } from "../../components/ui/Subsection";
import { cgaDomains, cgaSummary, formatFrailtyShortDate, frailtyConnectedSystems, prov } from "../../data/frailty";
import { Source } from "../../components/record/Source";
import { dateKey } from "../../utils/sort";

const previouslyCompleted = [
  {
    assessment: "Comprehensive Geriatric Assessment",
    completed: formatFrailtyShortDate("2025-12-12"),
    outcome: "Falls prevention and medication review actions opened",
    completedBy: "Jane Smith (District nurse)",
    source: prov.districtNurse(),
  },
  {
    assessment: "Multidisciplinary frailty review",
    completed: formatFrailtyShortDate("2025-10-03"),
    outcome: "Care package increased to 3 visits per day",
    completedBy: "Laura Chen (Frailty co-ordinator)",
    source: prov.mdt,
  },
  {
    assessment: "Annual frailty review",
    completed: formatFrailtyShortDate("2025-07-09"),
    outcome: "CFS recorded as 4 (vulnerable), community monitoring advised",
    completedBy: "Dr Patel (GP)",
    source: prov.gpPatel(),
  },
] as const;

export default function FrailtyCga() {
  const [fields, setFields] = usePersistentState<Record<string, ReviewStatus>>("ncrs.cga.fields", {}, "session");
  const [prompts, setPrompts] = usePersistentState<Record<string, PromptStatus>>("ncrs.cga.prompts", {}, "session");

  const totalFields = cgaDomains.reduce((sum, domain) => sum + domain.fields.length, 0);
  const totalReviewed = cgaDomains.reduce(
    (sum, domain) => sum + domain.fields.filter((field) => (fields[field.id] ?? "pending") !== "pending").length,
    0,
  );

  return (
    <RecordPage
      title="Comprehensive Geriatric Assessment"
      systems={frailtyConnectedSystems}
      showSystems={false}
    >
      <Callout
        tone="blue"
        title="Try the step-by-step version"
        label="Information: "
      >
        One question per page, with progress through each section.{" "}
        <Link to="/frailty/cga/v2">Open version 2 of the assessment</Link>.
      </Callout>

      <p className="cga-progress" role="status">
        {totalReviewed} of {totalFields} items reviewed
      </p>

      <DataSection title="CGA summary output">
        <DetailList rows={cgaSummary} />
      </DataSection>

      {cgaDomains.map((domain) => {
        const reviewed = domain.fields.filter(
          (field) => (fields[field.id] ?? "pending") !== "pending",
        ).length;
        return (
          <DataSection
            key={domain.id}
            title={domain.title}
            badge={
              domain.risk ? <StatusTag tone="red">Risks</StatusTag> : undefined
            }
            summary={`${reviewed} of ${domain.fields.length} reviewed`}
            defaultOpen={false}
          >
            {domain.prompts && (
              <Subsection title={`Review prompts: ${domain.title}`}>
                <ul className="review-prompts">
                  {domain.prompts.map((prompt) => (
                    <ReviewPrompt
                      key={prompt.id}
                      text={prompt.text}
                      status={prompts[prompt.id] ?? "pending"}
                      onStatus={(status) =>
                        setPrompts((current) => ({
                          ...current,
                          [prompt.id]: status,
                        }))
                      }
                    />
                  ))}
                </ul>
              </Subsection>
            )}
            <Subsection title={`${domain.title} assessment`}>
              <div className="review-fields">
                {domain.fields.map((field) => (
                  <ReviewField
                    key={field.id}
                    title={field.title}
                    hint={field.hint}
                    risk={field.risk}
                    prefill={field.prefill}
                    editable={field.editable}
                    choices={
                      field.kind === "choice" ? field.options : undefined
                    }
                    initialChoice={field.initialChoice}
                    source={
                      field.provenance ? (
                        <Source of={field.provenance} />
                      ) : undefined
                    }
                    status={fields[field.id] ?? "pending"}
                    onStatus={(status) =>
                      setFields((current) => ({
                        ...current,
                        [field.id]: status,
                      }))
                    }
                  />
                ))}
              </div>
            </Subsection>
          </DataSection>
        );
      })}

      <DataSection
        title="Previously completed"
        summary={`${previouslyCompleted.length} prior assessments`}
        defaultOpen={false}
      >
        <DataTable
          caption="Previously completed assessments"
          rows={previouslyCompleted}
          rowKey={(row) => `${row.assessment}-${row.completed}`}
          columns={[
            {
              header: "Assessment",
              cell: (row) => <strong>{row.assessment}</strong>,
              sort: (row) => row.assessment,
            },
            {
              header: "Date completed",
              cell: (row) => row.completed,
              sort: (row) => dateKey(row.completed),
            },
            { header: "Outcome", cell: (row) => row.outcome },
            {
              header: "Completed by",
              cell: (row) => row.completedBy,
              sort: (row) => row.completedBy,
            },
            { header: "Source", cell: (row) => <Source of={row.source} /> },
          ]}
          defaultSort={{ header: "Date completed", direction: "descending" }}
        />
      </DataSection>

      <nav className="page-steps" aria-label="Assessment steps">
        <ButtonLink variant="secondary" to="/frailty">
          Back to frailty snapshot
        </ButtonLink>
        <ButtonLink to="/frailty/care-plan">Next: care plan</ButtonLink>
      </nav>
    </RecordPage>
  );
}
