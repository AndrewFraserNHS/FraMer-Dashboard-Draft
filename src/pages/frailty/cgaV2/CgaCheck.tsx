import { useNavigate } from "react-router-dom";
import { AssessmentProgress } from "../../../components/ui/AssessmentProgress";
import { Callout } from "../../../components/ui/Callout";
import { QuestionPage } from "../../../components/ui/QuestionPage";
import { StatusTag, meaningTone } from "../../../components/ui/StatusTag";
import { SummaryList, SummaryRow } from "../../../components/ui/SummaryList";
import { Link } from "react-router-dom";
import { cgaDomains } from "../../../data/frailty";
import {
  Answer,
  Answers,
  CGA_BASE,
  donePath,
  firstUnfinished,
  optionLabel,
  Prompts,
  questionPath,
  sectionsFor,
  Step,
  steps,
  systemValue,
  totalQuestions,
} from "./model";
import { useCgaAnswers } from "./useCgaAnswers";

function describe(step: Step, answer: Answer | undefined, prompts: Prompts) {
  if (step.kind === "suggestions") {
    const list = step.domain.prompts ?? [];
    const count = (status: string) => list.filter((prompt) => (prompts[prompt.id] ?? "pending") === status).length;
    return `${count("confirmed")} confirmed, ${count("dismissed")} dismissed, ${count("pending")} not decided`;
  }
  const field = step.field!;
  if (!answer) return <StatusTag tone={meaningTone.warning}>Not answered</StatusTag>;
  if (answer.skipped) return <StatusTag tone={meaningTone.neutral}>Skipped</StatusTag>;
  const held = systemValue(field);
  if (answer.review === "confirmed") return <>Confirmed as correct: {held}</>;
  if (answer.review === "rejected") return <>Removed: this does not apply</>;
  if (answer.review === "changed") return <>Changed to: {answer.choice ? optionLabel(field, answer.choice) : answer.text}</>;
  return answer.choice ? optionLabel(field, answer.choice) : answer.text;
}

/** NHS "check answers" page: everything in one place, each with a Change link, before completing. */
export default function CgaCheck() {
  const navigate = useNavigate();
  const { answers, prompts, finish } = useCgaAnswers();
  const unanswered = steps.filter((step) => step.kind === "field" && (!answers[step.id] || answers[step.id].skipped));
  const first = firstUnfinished(answers);

  return (
    <QuestionPage
      documentTitle="Check your answers"
      progress={
        <AssessmentProgress sections={sectionsFor(answers)} totalQuestions={totalQuestions} />
      }
      onBack={() => navigate(questionPath(steps[steps.length - 1].id))}
      continueLabel="Complete assessment"
      saveLaterTo={CGA_BASE}
      onContinue={() => {
        finish();
        navigate(donePath);
      }}
    >
      <h1 className="nhsuk-heading-l">Check your answers before completing the assessment</h1>

      {unanswered.length > 0 && (
        <Callout tone="amber" title={`${unanswered.length} ${unanswered.length === 1 ? "question has" : "questions have"} no answer`} label="Warning: ">
          You can complete the assessment without them, and come back later.
          {first && <> <Link to={questionPath(first.id)}>Go to the first unanswered question</Link>.</>}
        </Callout>
      )}

      {cgaDomains.map((domain) => {
        const rows: SummaryRow[] = steps
          .filter((step) => step.domain.id === domain.id)
          .map((step) => ({
            key: step.id,
            label: step.kind === "suggestions" ? "Suggestions to review" : step.field!.title,
            value: describe(step, answers[step.id], prompts),
            changeTo: questionPath(step.id),
          }));
        return (
          <section key={domain.id} aria-labelledby={`check-${domain.id}`} className="question-page__group">
            <h2 id={`check-${domain.id}`} className="nhsuk-heading-m">{domain.title}</h2>
            <SummaryList rows={rows} />
          </section>
        );
      })}
    </QuestionPage>
  );
}

export type { Answers };
