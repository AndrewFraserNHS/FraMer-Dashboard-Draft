import { useState } from "react";
import { ButtonLink } from "../../components/ui/Button";
import { DataSection } from "../../components/ui/DataSection";
import { DetailList } from "../../components/ui/DetailList";
import { RecordPage } from "../../components/ui/RecordPage";
import { PromptStatus, ReviewField, ReviewPrompt, ReviewStatus } from "../../components/ui/ReviewField";
import { StatusTag } from "../../components/ui/StatusTag";
import { Subsection } from "../../components/ui/Subsection";
import { cgaDomains, cgaSummary, frailtyConnectedSystems } from "../../data/frailty";
import { Source } from "../../components/record/Source";

export default function FrailtyCga() {
  const [fields, setFields] = useState<Record<string, ReviewStatus>>({});
  const [prompts, setPrompts] = useState<Record<string, PromptStatus>>({});

  const totalFields = cgaDomains.reduce((sum, domain) => sum + domain.fields.length, 0);
  const totalReviewed = cgaDomains.reduce(
    (sum, domain) => sum + domain.fields.filter((field) => (fields[field.id] ?? "pending") !== "pending").length,
    0,
  );

  return (
    <RecordPage
      title="Comprehensive Geriatric Assessment"
      intro="Review and confirm pre-populated data, complete the assessment domains and record new findings."
      systems={frailtyConnectedSystems}
      showSystems={false}
    >
      <p className="cga-progress" role="status">
        {totalReviewed} of {totalFields} items reviewed
      </p>

      <DataSection title="CGA summary output">
        <DetailList rows={cgaSummary} />
      </DataSection>

      {cgaDomains.map((domain) => {
        const reviewed = domain.fields.filter((field) => (fields[field.id] ?? "pending") !== "pending").length;
        return (
          <DataSection
            key={domain.id}
            title={domain.title}
            badge={domain.risk ? <StatusTag tone="red">Risks</StatusTag> : undefined}
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
                      onStatus={(status) => setPrompts((current) => ({ ...current, [prompt.id]: status }))}
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
                    choices={field.kind === "choice" ? field.options : undefined}
                    initialChoice={field.initialChoice}
                    source={field.provenance ? <Source of={field.provenance} /> : undefined}
                    status={fields[field.id] ?? "pending"}
                    onStatus={(status) => setFields((current) => ({ ...current, [field.id]: status }))}
                  />
                ))}
              </div>
            </Subsection>
          </DataSection>
        );
      })}

      <nav className="page-steps" aria-label="Assessment steps">
        <ButtonLink variant="secondary" to="/frailty">
          Back to frailty snapshot
        </ButtonLink>
        <ButtonLink to="/frailty/care-plan">
          Next: care plan
        </ButtonLink>
      </nav>
    </RecordPage>
  );
}
