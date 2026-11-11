import { useState } from "react";
import { Navigate, useNavigate, useParams } from "react-router-dom";
import { AssessmentProgress } from "../../../components/ui/AssessmentProgress";
import { RadioField, TextAreaQuestion, TextAreaField } from "../../../components/ui/FormField";
import { QuestionPage } from "../../../components/ui/QuestionPage";
import { StatusTag } from "../../../components/ui/StatusTag";
import type { ErrorSummaryItem } from "../../../components/ui/ErrorSummary";
import type { Provenance } from "../../../data/frailty";
import { sourceMeta } from "../../../data/frailty";
import {
  Answer,
  CGA_BASE,
  checkPath,
  questionPath,
  Review,
  sectionsFor,
  Step,
  stepIndex,
  steps,
  systemValue,
  totalQuestions,
} from "./model";
import { useCgaAnswers } from "./useCgaAnswers";

/** One page of the assessment. The URL says which, so Back, reload and links all work. */
export default function CgaQuestion() {
  const { stepId } = useParams();
  const index = stepIndex(stepId);
  if (index < 0) return <Navigate to={CGA_BASE} replace />;
  // key resets the page's own state when the step changes
  return <StepPage key={steps[index].id} index={index} />;
}

function StepPage({ index }: { index: number }) {
  const navigate = useNavigate();
  const store = useCgaAnswers();
  const step = steps[index];
  const next = steps[index + 1];
  const previous = steps[index - 1];
  const goNext = () => navigate(next ? questionPath(next.id) : checkPath);

  const progress = (
    <AssessmentProgress
      sections={sectionsFor(store.answers)}
      currentId={step.domain.id}
      questionInSection={step.inSection}
      questionOverall={step.number}
      totalQuestions={totalQuestions}
    />
  );
  const caption = `${step.domain.title} · Question ${step.inSection} of ${step.sectionTotal}`;
  const common = {
    progress,
    saveLaterTo: CGA_BASE,
    onBack: () => navigate(previous ? questionPath(previous.id) : CGA_BASE),
    backLabel: previous ? "Back" : "Back to the assessment",
  };

  if (step.kind === "prompt") return <PromptPage step={step} caption={caption} common={common} store={store} goNext={goNext} />;

  return <FieldPage step={step} caption={caption} common={common} store={store} goNext={goNext} />;
}

function PromptPage({
  step,
  caption,
  common,
  store,
  goNext,
}: {
  step: Step;
  caption: string;
  common: Omit<React.ComponentProps<typeof QuestionPage>, "documentTitle" | "onContinue" | "children">;
  store: ReturnType<typeof useCgaAnswers>;
  goNext: () => void;
}) {
  const prompt = step.prompt!;
  const saved = store.answers[step.id];
  const [review, setReview] = useState<Review | "">(saved?.review ?? "");
  const [text, setText] = useState(saved?.text ?? prompt.text);
  const [error, setError] = useState<{ message: string; fieldId: string }>();
  const base = `q-${step.id}`;

  const editedSuggestion = (
    <TextAreaField
      id={`${base}-edit`}
      label="Edit the suggested action"
      rows={5}
      value={text}
      onChange={(event) => setText(event.target.value)}
      error={error?.fieldId === `${base}-edit` ? error.message : undefined}
    />
  );

  return (
    <QuestionPage
      {...common}
      documentTitle="Review suggested action"
      errors={error ? [{ text: error.message, fieldId: error.fieldId }] : []}
      onContinue={() => {
        if (!review) {
          setError({ message: "Select whether to confirm or edit this suggestion", fieldId: `${base}-review` });
          return;
        }
        if (review === "changed" && !text.trim()) {
          setError({ message: "Enter the edited suggestion", fieldId: `${base}-edit` });
          return;
        }
        store.setAnswer(step.id, {
          done: true,
          review,
          text: review === "changed" ? text.trim() : prompt.text,
        });
        goNext();
      }}
    >
      <RadioField
        id={`${base}-review`}
        name={`${base}-review`}
        legend="Is this suggested action appropriate?"
        asPageHeading={{ caption }}
        before={
          <div className="nhsuk-inset-text question-page__existing">
            <p className="question-page__existing-label">Suggested action</p>
            <p>{prompt.text}</p>
          </div>
        }
        error={error?.fieldId === `${base}-review` ? error.message : undefined}
        value={review}
        onChange={(value) => {
          setReview(value as Review);
          setError(undefined);
        }}
        options={[
          { value: "confirmed", label: "Yes, confirm this suggestion" },
          { value: "changed", label: "No, edit this suggestion", reveal: editedSuggestion },
        ]}
      />
    </QuestionPage>
  );
}

type FieldPageProps = {
  step: Step;
  caption: string;
  common: Omit<React.ComponentProps<typeof QuestionPage>, "documentTitle" | "onContinue" | "children">;
  store: ReturnType<typeof useCgaAnswers>;
  goNext: () => void;
};

function FieldPage({ step, caption, common, store, goNext }: FieldPageProps) {
  const field = step.field!;
  const saved = store.answers[step.id];
  const existing = systemValue(field);
  const [review, setReview] = useState<Review | "">(saved?.review ?? "");
  const [text, setText] = useState(saved?.text ?? (field.kind === "text" ? "" : ""));
  const [choice, setChoice] = useState(saved?.choice ?? "");
  const [errors, setErrors] = useState<{ review?: string; value?: string }>({});
  const base = `q-${step.id}`;
  const heading = { caption };

  const risk = field.risk ? <StatusTag tone="red">Risk</StatusTag> : null;
  const options = field.options ?? [];

  function validate(): Answer | null {
    const found: typeof errors = {};
    if (existing) {
      if (!review) found.review = "Select whether this is correct";
      else if (review === "changed" && field.kind === "text" && !text.trim()) found.value = "Enter the corrected answer";
      else if (review === "changed" && field.kind === "choice" && !choice) found.value = "Select the correct answer";
    } else if (field.kind === "choice" && !choice) {
      found.value = field.mandatory ? "Select an answer. This question cannot be skipped" : "Select an answer, or skip this question";
    }
    setErrors(found);
    if (Object.keys(found).length) return null;
    if (existing) {
      return { done: true, review: review as Review, text: review === "changed" ? text.trim() : undefined, choice: review === "changed" ? choice : undefined };
    }
    if (field.kind === "text" && !text.trim()) return { done: true, skipped: true };
    return { done: true, text: field.kind === "text" ? text.trim() : undefined, choice: field.kind === "choice" ? choice : undefined };
  }

  const summary: ErrorSummaryItem[] = [
    ...(errors.review ? [{ text: errors.review, fieldId: base }] : []),
    ...(errors.value ? [{ text: errors.value, fieldId: existing ? `${base}-change` : base }] : []),
  ];

  const replacement =
    field.kind === "choice" ? (
      <RadioField
        id={`${base}-change`}
        name={`${base}-choice`}
        legend="Select the correct answer"
        small
        options={options}
        value={choice}
        onChange={setChoice}
        error={errors.value}
      />
    ) : (
      <TextAreaField
        id={`${base}-change`}
        label="Your corrected answer"
        rows={5}
        value={text}
        onChange={(event) => setText(event.target.value)}
        error={errors.value}
      />
    );

  return (
    <QuestionPage
      {...common}
      documentTitle={field.title}
      errors={summary}
      onContinue={() => {
        const answer = validate();
        if (answer) {
          store.setAnswer(step.id, answer);
          goNext();
        }
      }}
      onSkip={field.mandatory ? undefined : () => {
        store.setAnswer(step.id, { done: true, skipped: true });
        goNext();
      }}
    >
      {existing ? (
        <RadioField
            id={base}
            name={`${base}-review`}
            legend={
              <>
                {field.title}: is this correct? {risk}
              </>
            }
            asPageHeading={heading}
            hint={field.hint}
            before={<ExistingValue value={existing} source={field.provenance} />}
            error={errors.review}
            value={review}
            onChange={(value) => setReview(value as Review)}
            options={[
              { value: "confirmed", label: "Yes, this is correct" },
              { value: "changed", label: "No, I want to change it", reveal: replacement },
            ]}
          />
      ) : field.kind === "choice" ? (
        <RadioField
          id={base}
          name={`${base}-choice`}
          legend={<>{field.title} {risk}</>}
          asPageHeading={heading}
          hint={field.hint}
          error={errors.value}
          options={options}
          value={choice}
          onChange={setChoice}
        />
      ) : (
        <TextAreaQuestion
          id={base}
          question={<>{field.title} {risk}</>}
          caption={caption}
          hint={field.hint}
          optional
          value={text}
          onChange={(event) => setText(event.target.value)}
        />
      )}
    </QuestionPage>
  );
}

/** Shown above a pre-filled question: what the record currently says, and where it came from. */
function existingFacts(value: string): Array<{ label: string; detail: string }> {
  const pairs = Array.from(value.matchAll(/([^:.;\n]+):\s*([^.;\n]+)(?:[.;]|$)/g)).map((match) => ({
    label: match[1].trim(),
    detail: match[2].trim(),
  }));
  if (pairs.length < 2) return [];
  const covered = pairs.reduce((sum, pair) => sum + pair.label.length + pair.detail.length + 2, 0);
  return covered >= Math.floor(value.length * 0.55) ? pairs : [];
}

export function ExistingValue({ value, source }: { value: string; source?: React.ReactNode }) {
  const facts = existingFacts(value);
  const sourceLine =
    source && typeof source !== "string" && "by" in source
      ? `${(source as Provenance).by} · ${(source as Provenance).org} · ${(source as Provenance).system} · pulled ${(source as Provenance).pulled}`
      : undefined;
  const sourceLabel =
    source && typeof source !== "string" && "source" in source
      ? sourceMeta[(source as Provenance).source].label
      : undefined;
  return (
    <div className="nhsuk-inset-text question-page__existing">
      <p className="question-page__existing-label">The record currently says</p>
      {facts.length > 0 ? (
        <dl className="question-page__existing-facts">
          {facts.map((fact) => (
            <div key={fact.label}>
              <dt>{fact.label}</dt>
              <dd>{fact.detail}</dd>
            </div>
          ))}
        </dl>
      ) : (
        <p className="question-page__existing-text">{value}</p>
      )}
      {sourceLine && (
        <div className="question-page__existing-source">
          <span className="question-page__existing-source-label">Source</span>
          <p className="question-page__existing-source-text">
            {sourceLabel ? `${sourceLabel}: ` : ""}
            {sourceLine}
          </p>
        </div>
      )}
      <p className="review-field__notice">Pre-filled from another system. Not checked yet.</p>
    </div>
  );
}
