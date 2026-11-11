import { Link } from "react-router-dom";

export type ProgressSection = {
  id: string;
  title: string;
  /** Questions finished (answered or deliberately skipped) */
  done: number;
  total: number;
  /** Where this section starts, so a section can be jumped to */
  to: string;
};

type AssessmentProgressProps = {
  sections: readonly ProgressSection[];
  /** The section the user is in. Omit on the check answers page. */
  currentId?: string;
  /** Position inside the current section, from 1 */
  questionInSection?: number;
  /** Position in the whole assessment, from 1 */
  questionOverall?: number;
  totalQuestions: number;
};

/**
 * Progress through a long assessment, split into its sections. One segment per section, filled by how
 * much of it is done, with the current section marked. Meaning is never colour alone: each section has
 * text saying how many questions are done, and the current section says so. Sections are links, so
 * a clinician can jump between them (the answers are kept).
 */
export function AssessmentProgress({ sections, currentId, questionInSection, questionOverall, totalQuestions }: AssessmentProgressProps) {
  const index = sections.findIndex((section) => section.id === currentId);
  const current = sections[index];
  const doneTotal = sections.reduce((sum, section) => sum + section.done, 0);

  return (
    <nav className="assessment-progress" aria-label="Assessment progress">
      <p className="assessment-progress__summary">
        {current ? (
          <>
            <strong>
              Section {index + 1} of {sections.length}: {current.title}
            </strong>
            {questionInSection ? ` · Question ${questionInSection} of ${current.total}` : ""}
            {questionOverall ? ` · ${questionOverall} of ${totalQuestions} overall` : ""}
          </>
        ) : (
          <strong>Check your answers</strong>
        )}
        <span className="assessment-progress__done"> · {doneTotal} of {totalQuestions} questions done</span>
      </p>
      <ol className="assessment-progress__sections">
        {sections.map((section) => {
          const complete = section.done >= section.total;
          const isCurrent = section.id === currentId;
          const state = isCurrent ? "current section" : complete ? "complete" : section.done > 0 ? "started" : "not started";
          return (
            <li key={section.id} className={`assessment-progress__section${isCurrent ? " is-current" : ""}${complete ? " is-complete" : ""}`}>
              <Link to={section.to} aria-current={isCurrent ? "step" : undefined}>
                <span className="assessment-progress__bar" aria-hidden="true">
                  <span style={{ width: `${Math.round((section.done / Math.max(section.total, 1)) * 100)}%` }} />
                </span>
                <span className="assessment-progress__label">
                  {section.title}
                  <span className="nhs-visually-hidden">
                    , {section.done} of {section.total} done, {state}
                  </span>
                </span>
              </Link>
            </li>
          );
        })}
      </ol>
    </nav>
  );
}
