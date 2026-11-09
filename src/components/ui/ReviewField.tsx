import { ReactNode, useEffect, useId, useRef, useState } from "react";
import { StatusTag } from "./StatusTag";

export type ReviewStatus = "pending" | "accepted" | "edited" | "rejected";

const statusTag = {
  pending: { tone: "orange", text: "Pending review" },
  accepted: { tone: "green", text: "Accepted" },
  edited: { tone: "blue", text: "Edited and saved" },
  rejected: { tone: "grey", text: "Rejected" },
} as const;

/** Moves focus when a state change would otherwise leave it on a button that has just vanished. */
function useFocusOnChange<T extends HTMLElement>(status: ReviewStatus) {
  const rejectedAction = useRef<T>(null);
  const previous = useRef(status);
  const restore = useRef<HTMLElement | null>(null);
  useEffect(() => {
    if (status === "rejected" && previous.current !== "rejected") rejectedAction.current?.focus();
    if (previous.current === "rejected" && status !== "rejected") restore.current?.focus();
    previous.current = status;
  }, [status]);
  return { rejectedAction, restore };
}

type Choice = { value: string; label: string; hint?: string };

type ReviewFieldProps = {
  title: string;
  /** Visible guidance. Never rely on placeholder text alone. */
  hint?: string;
  status: ReviewStatus;
  onStatus: (status: ReviewStatus) => void;
  /** Flags the item as relating to a clinical risk. States "Risk" in text. */
  risk?: boolean;
  /** Content pulled from a connected system, awaiting review */
  prefill?: string;
  /** Prefilled free text may be edited before it is accepted */
  editable?: boolean;
  /** Where the prefill came from (a ProvenanceTag) */
  source?: ReactNode;
  /** Renders radios instead of free text */
  choices?: readonly Choice[];
  initialChoice?: string;
};

/**
 * One assessment item the clinician reviews: read what the system found, accept, edit or reject it.
 * The title is the label of the control. Reject is reversible and moves focus to Undo, so
 * nothing vanishes without the user knowing.
 */
export function ReviewField({
  title,
  hint,
  status,
  onStatus,
  risk,
  prefill,
  editable,
  source,
  choices,
  initialChoice,
}: ReviewFieldProps) {
  const uid = useId();
  const hintId = `${uid}-hint`;
  const [editing, setEditing] = useState(false);
  const [text, setText] = useState(prefill ?? "");
  const [choice, setChoice] = useState(initialChoice ?? "");
  const { rejectedAction, restore } = useFocusOnChange<HTMLButtonElement>(status);
  const tag = statusTag[status];
  const showsTextarea = !choices && (!prefill || editing);

  if (status === "rejected") {
    return (
      <div className="review-field review-field--rejected">
        <div className="review-field__head">
          <p className="review-field__title">{title}</p>
          <StatusTag tone={tag.tone}>{tag.text}</StatusTag>
        </div>
        <p className="review-field__note">This item will not be added to the assessment.</p>
        <button ref={rejectedAction} type="button" className="review-button" onClick={() => onStatus("pending")}>
          Undo<span className="nhs-visually-hidden"> rejecting {title}</span>
        </button>
      </div>
    );
  }

  return (
    <div className="review-field" data-status={status}>
      <div className="review-field__head">
        {choices ? (
          <p className="review-field__title" id={`${uid}-legend`}>{title}</p>
        ) : showsTextarea ? (
          <label className="review-field__title" htmlFor={`${uid}-text`}>{title}</label>
        ) : (
          <p className="review-field__title">{title}</p>
        )}
        {risk && <StatusTag tone="red">Risk</StatusTag>}
        <StatusTag tone={tag.tone}>{tag.text}</StatusTag>
      </div>

      {hint && (showsTextarea || choices) && (
        <p id={hintId} className="review-field__hint">
          {hint}
        </p>
      )}

      {choices && (
        <div
          className="nhsuk-radios nhsuk-radios--small review-field__choices"
          role="radiogroup"
          aria-labelledby={`${uid}-legend`}
          aria-describedby={hint ? hintId : undefined}
        >
          {choices.map((option) => (
            <div className="nhsuk-radios__item" key={option.value}>
              <input
                className="nhsuk-radios__input"
                type="radio"
                id={`${uid}-${option.value}`}
                name={`${uid}-choice`}
                checked={choice === option.value}
                onChange={() => setChoice(option.value)}
                aria-describedby={option.hint ? `${uid}-${option.value}-hint` : undefined}
              />
              <label className="nhsuk-label nhsuk-radios__label" htmlFor={`${uid}-${option.value}`}>
                {option.label}
              </label>
              {option.hint && (
                <div className="nhsuk-hint nhsuk-radios__hint" id={`${uid}-${option.value}-hint`}>
                  {option.hint}
                </div>
              )}
            </div>
          ))}
        </div>
      )}

      {prefill && !editing && <p className="review-field__value">{text}</p>}

      {showsTextarea && (
        <textarea
          id={`${uid}-text`}
          className="nhsuk-textarea review-field__textarea"
          rows={prefill ? 5 : 3}
          value={text}
          onChange={(event) => setText(event.target.value)}
          aria-describedby={hint ? hintId : undefined}
        />
      )}

      {source && <div className="review-field__source">{source}</div>}

      <div className="review-field__actions" role="group" aria-label={`Review ${title}`}>
        <button
          type="button"
          className="review-button review-button--accept"
          aria-pressed={status === "accepted"}
          onClick={() => onStatus(status === "accepted" ? "pending" : "accepted")}
          ref={(node) => {
            restore.current = node;
          }}
        >
          Accept<span className="nhs-visually-hidden"> {title}</span>
        </button>
        <button type="button" className="review-button" onClick={() => onStatus("rejected")}>
          Reject<span className="nhs-visually-hidden"> {title}</span>
        </button>
        {editable && prefill && (
          <button
            type="button"
            className="review-button"
            aria-pressed={editing}
            onClick={() => {
              if (editing) onStatus("edited");
              setEditing((value) => !value);
            }}
          >
            {editing ? "Save" : "Edit"}
            <span className="nhs-visually-hidden"> {title}</span>
          </button>
        )}
      </div>
    </div>
  );
}

export type PromptStatus = "pending" | "confirmed" | "dismissed";

/**
 * A suggestion raised from the record for the clinician to confirm, edit or dismiss.
 * Dismissing is reversible.
 */
export function ReviewPrompt({
  text: initial,
  status,
  onStatus,
}: {
  text: string;
  status: PromptStatus;
  onStatus: (status: PromptStatus) => void;
}) {
  const uid = useId();
  const [text, setText] = useState(initial);
  const [editing, setEditing] = useState(false);
  const undo = useRef<HTMLButtonElement>(null);
  const first = useRef(true);
  useEffect(() => {
    if (first.current) {
      first.current = false;
      return;
    }
    if (status === "dismissed") undo.current?.focus();
  }, [status]);

  const tag =
    status === "confirmed"
      ? ({ tone: "green", text: "Confirmed" } as const)
      : status === "dismissed"
        ? ({ tone: "grey", text: "Dismissed" } as const)
        : ({ tone: "orange", text: "Pending review" } as const);

  return (
    <li className="review-prompt" data-status={status}>
      <div className="review-field__head">
        <StatusTag tone={tag.tone}>{tag.text}</StatusTag>
      </div>
      {status === "dismissed" ? (
        <>
          <p className="review-field__note">Suggestion dismissed.</p>
          <button ref={undo} type="button" className="review-button" onClick={() => onStatus("pending")}>
            Undo<span className="nhs-visually-hidden"> dismissing this suggestion</span>
          </button>
        </>
      ) : (
        <>
          {editing ? (
            <>
              <label className="nhs-visually-hidden" htmlFor={`${uid}-text`}>Edit suggestion</label>
              <textarea
                id={`${uid}-text`}
                className="nhsuk-textarea review-field__textarea"
                rows={4}
                value={text}
                onChange={(event) => setText(event.target.value)}
              />
            </>
          ) : (
            <p className="review-field__value">{text}</p>
          )}
          <div className="review-field__actions" role="group" aria-label="Review suggestion">
            <button
              type="button"
              className="review-button review-button--accept"
              aria-pressed={status === "confirmed"}
              onClick={() => onStatus(status === "confirmed" ? "pending" : "confirmed")}
            >
              Confirm<span className="nhs-visually-hidden"> suggestion</span>
            </button>
            <button type="button" className="review-button" aria-pressed={editing} onClick={() => setEditing((value) => !value)}>
              {editing ? "Save" : "Edit"}
              <span className="nhs-visually-hidden"> suggestion</span>
            </button>
            <button type="button" className="review-button" onClick={() => onStatus("dismissed")}>
              Dismiss<span className="nhs-visually-hidden"> suggestion</span>
            </button>
          </div>
        </>
      )}
    </li>
  );
}
