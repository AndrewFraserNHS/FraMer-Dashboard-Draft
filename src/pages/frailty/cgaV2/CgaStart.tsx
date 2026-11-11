import { Link } from "react-router-dom";
import { Button, ButtonLink } from "../../../components/ui/Button";
import { Callout } from "../../../components/ui/Callout";
import { DataTable } from "../../../components/ui/DataTable";
import { RecordPage } from "../../../components/ui/RecordPage";
import { StatusTag, meaningTone } from "../../../components/ui/StatusTag";
import { frailtyConnectedSystems } from "../../../data/frailty";
import { checkPath, firstUnfinished, questionPath, sectionsFor, totalQuestions } from "./model";
import { useCgaAnswers } from "./useCgaAnswers";

/** Start of the step-by-step assessment: what it covers, how far along it is, and where to carry on. */
export default function CgaStart() {
  const { answers, complete, reset } = useCgaAnswers();
  const sections = sectionsFor(answers);
  const done = sections.reduce((sum, section) => sum + section.done, 0);
  const next = firstUnfinished(answers);
  const started = done > 0;

  return (
    <RecordPage
      title="Comprehensive Geriatric Assessment"
      intro="Answer one question at a time. Your answers are kept as you go, so you can stop and come back."
      systems={frailtyConnectedSystems}
      showSystems={false}
    >
      {complete && (
        <Callout tone="blue" title="This assessment is complete" label="Information: ">
          You can still change any answer from <Link to={checkPath}>Check your answers</Link>.
        </Callout>
      )}

      <p className="cga-progress" role="status">
        {done} of {totalQuestions} questions done
      </p>

      <DataTable
        caption="Assessment sections"
        rows={sections}
        rowKey={(section) => section.id}
        columns={[
          { header: "Section", cell: (section) => <strong>{section.title}</strong> },
          { header: "Questions", cell: (section) => section.total },
          {
            header: "Progress",
            cell: (section) =>
              section.done >= section.total ? (
                <StatusTag tone={meaningTone.ok}>Done</StatusTag>
              ) : section.done > 0 ? (
                <StatusTag tone={meaningTone.warning}>{section.done} of {section.total} done</StatusTag>
              ) : (
                <StatusTag tone={meaningTone.neutral}>Not started</StatusTag>
              ),
          },
          {
            header: "Go to",
            cell: (section) => (
              <Link to={section.to}>
                {section.done >= section.total ? "Review" : section.done > 0 ? "Continue" : "Start"}
                <span className="nhs-visually-hidden"> {section.title}</span>
              </Link>
            ),
          },
        ]}
      />

      <div className="page-steps">
        {next ? (
          <ButtonLink to={questionPath(next.id)}>{started ? "Continue assessment" : "Start assessment"}</ButtonLink>
        ) : (
          <ButtonLink to={checkPath}>Check your answers</ButtonLink>
        )}
        <ButtonLink variant="secondary" to="/frailty/cga">
          Use the single-page version
        </ButtonLink>
        {started && (
          <Button variant="secondary" onClick={reset}>
            Clear all answers
          </Button>
        )}
      </div>
    </RecordPage>
  );
}
