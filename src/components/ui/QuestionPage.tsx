import { FormEvent, ReactNode, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { BackLink } from "./BackLink";
import { Button } from "./Button";
import { ErrorSummary, ErrorSummaryItem } from "./ErrorSummary";

type QuestionPageProps = {
  /** Shown in the browser tab and used to move focus. Usually the question. */
  documentTitle: string;
  /** Rendered above the form, normally an AssessmentProgress */
  progress?: ReactNode;
  /** Previous step. Omit on the first. */
  onBack?: () => void;
  backLabel?: string;
  errors?: readonly ErrorSummaryItem[];
  /** Called with a valid submit. Validation is the caller's, so it can set field errors too. */
  onContinue: () => void;
  continueLabel?: string;
  /** Adds a secondary Skip button. The step is marked done without an answer. */
  onSkip?: () => void;
  /** Link for "Save and finish later". Answers are already kept. */
  saveLaterTo?: string;
  children: ReactNode;
};

/**
 * One question per page, as in the NHS question pages pattern: back link, the question as the page h1
 * (supplied by the field), a Continue button, and an error summary when something needs fixing.
 * When the page changes focus moves to the question, so a screen reader user hears it first,
 * and the document title changes so each step is distinct in history and in the tab.
 */
export function QuestionPage({
  documentTitle,
  progress,
  onBack,
  backLabel = "Back",
  errors = [],
  onContinue,
  continueLabel = "Continue",
  onSkip,
  saveLaterTo,
  children,
}: QuestionPageProps) {
  const root = useRef<HTMLDivElement>(null);

  useEffect(() => {
    document.title = `${documentTitle} — Comprehensive Geriatric Assessment`;
    const heading = root.current?.querySelector<HTMLElement>("h1");
    if (heading) {
      heading.tabIndex = -1;
      heading.focus({ preventScroll: false });
    }
  }, [documentTitle]);

  function submit(event: FormEvent) {
    event.preventDefault();
    onContinue();
  }

  return (
    <div className="question-page" ref={root}>
      {onBack && <BackLink onClick={onBack}>{backLabel}</BackLink>}
      {progress}
      <div className="question-page__body">
        <ErrorSummary items={errors} />
        <form onSubmit={submit} noValidate>
          {children}
          <div className="question-page__actions">
            <Button type="submit">{continueLabel}</Button>
            {onSkip && (
              <Button variant="secondary" onClick={onSkip}>
                Skip this question
              </Button>
            )}
          </div>
        </form>
        {saveLaterTo && (
          <p>
            <Link to={saveLaterTo}>Save and finish later</Link>
          </p>
        )}
      </div>
    </div>
  );
}
