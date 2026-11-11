import { InputHTMLAttributes, ReactNode, SelectHTMLAttributes, TextareaHTMLAttributes, useId } from "react";

type FieldShellProps = {
  label: ReactNode;
  /** Help text shown under the label, instead of leaving the format to a placeholder */
  hint?: ReactNode;
  /** Error message for this field. Shown in text, never by colour alone. */
  error?: string;
  /** NHS guidance: mark the fields that are optional, not the ones that are required */
  optional?: boolean;
};

type Ids = { input: string; hint: string; error: string };

function describedBy(ids: Ids, { hint, error }: Pick<FieldShellProps, "hint" | "error">) {
  return [hint && ids.hint, error && ids.error].filter(Boolean).join(" ") || undefined;
}

/** Hint and error, shared by every field so they cannot drift apart. */
function FieldMessages({ ids, hint, error }: { ids: Ids; hint?: ReactNode; error?: string }) {
  return (
    <>
      {hint && <div id={ids.hint} className="nhsuk-hint">{hint}</div>}
      {error && (
        <p id={ids.error} className="nhsuk-error-message">
          <span className="nhs-visually-hidden">Error: </span>
          {error}
        </p>
      )}
    </>
  );
}

const OptionalMark = () => <span className="ncrs-optional"> (optional)</span>;

function FieldShell({ label, hint, error, optional, ids, children }: FieldShellProps & { ids: Ids; children: ReactNode }) {
  return (
    <div className={`nhsuk-form-group${error ? " nhsuk-form-group--error" : ""}`}>
      <label className="nhsuk-label" htmlFor={ids.input}>
        {label}
        {optional && <OptionalMark />}
      </label>
      <FieldMessages ids={ids} hint={hint} error={error} />
      {children}
    </div>
  );
}

function useIds(id?: string): Ids {
  const generated = useId();
  const base = id ?? generated;
  return { input: base, hint: `${base}-hint`, error: `${base}-error` };
}

/** Attributes every control gets: described by its hint and error, flagged invalid, and required announced to assistive technology. */
function controlProps(ids: Ids, { hint, error }: Pick<FieldShellProps, "hint" | "error">, required?: boolean) {
  return {
    id: ids.input,
    "aria-describedby": describedBy(ids, { hint, error }),
    "aria-invalid": error ? true : undefined,
    "aria-required": required || undefined,
  } as const;
}

/** Labelled text input with optional hint and error, following the NHS design system pattern. */
export function TextField({ label, hint, error, optional, id, className = "", ...input }: FieldShellProps & InputHTMLAttributes<HTMLInputElement>) {
  const ids = useIds(id);
  return (
    <FieldShell label={label} hint={hint} error={error} optional={optional} ids={ids}>
      <input
        className={`nhsuk-input${error ? " nhsuk-input--error" : ""} ${className}`.trim()}
        {...controlProps(ids, { hint, error }, input.required)}
        {...input}
      />
    </FieldShell>
  );
}

/** Labelled multi-line text input. */
export function TextAreaField({ label, hint, error, optional, id, className = "", ...input }: FieldShellProps & TextareaHTMLAttributes<HTMLTextAreaElement>) {
  const ids = useIds(id);
  return (
    <FieldShell label={label} hint={hint} error={error} optional={optional} ids={ids}>
      <textarea
        className={`nhsuk-textarea${error ? " nhsuk-textarea--error" : ""} ${className}`.trim()}
        {...controlProps(ids, { hint, error }, input.required)}
        {...input}
      />
    </FieldShell>
  );
}

type SelectFieldProps = FieldShellProps &
  SelectHTMLAttributes<HTMLSelectElement> & {
    options: readonly string[];
    /** Text of a disabled first option that prompts a choice, e.g. "Select" */
    placeholder?: string;
  };

/** Labelled native select. Native controls keep keyboard, screen reader and mobile behaviour for free. */
export function SelectField({ label, hint, error, optional, id, options, placeholder, className = "", ...select }: SelectFieldProps) {
  const ids = useIds(id);
  return (
    <FieldShell label={label} hint={hint} error={error} optional={optional} ids={ids}>
      <select
        className={`nhsuk-select${error ? " nhsuk-select--error" : ""} ${className}`.trim()}
        {...controlProps(ids, { hint, error }, select.required)}
        {...select}
      >
        {placeholder && (
          <option value="" disabled>
            {placeholder}
          </option>
        )}
        {options.map((option) => (
          <option key={option}>{option}</option>
        ))}
      </select>
    </FieldShell>
  );
}

export type DateParts = { day: string; month: string; year: string };
export const emptyDate: DateParts = { day: "", month: "", year: "" };

/** yyyy-mm-dd, or "" when the parts are not a real date. */
export function datePartsToIso({ day, month, year }: DateParts): string {
  const [d, m, y] = [Number(day), Number(month), Number(year)];
  const date = new Date(Date.UTC(y, m - 1, d));
  const real = year.length === 4 && date.getUTCFullYear() === y && date.getUTCMonth() === m - 1 && date.getUTCDate() === d;
  return real ? `${year}-${String(m).padStart(2, "0")}-${String(d).padStart(2, "0")}` : "";
}

/**
 * NHS date input: three labelled number fields in a fieldset, instead of the native date picker,
 * which differs between browsers and is hard to use for a date of birth.
 */
export function DateField({
  legend,
  hint = "For example, 14 6 1995",
  error,
  optional,
  id,
  value,
  onChange,
}: Omit<FieldShellProps, "label"> & { legend: ReactNode; id: string; value: DateParts; onChange: (value: DateParts) => void }) {
  const ids: Ids = { input: `${id}-day`, hint: `${id}-hint`, error: `${id}-error` };
  const field = (key: keyof DateParts, label: string, width: number) => (
    <div className="nhsuk-date-input__item">
      <div className="nhsuk-form-group">
        <label className="nhsuk-label nhsuk-date-input__label" htmlFor={`${id}-${key}`}>{label}</label>
        <input
          id={`${id}-${key}`}
          className={`nhsuk-input nhsuk-date-input__input nhsuk-input--width-${width}${error ? " nhsuk-input--error" : ""}`}
          inputMode="numeric"
          autoComplete={key === "day" ? "bday-day" : key === "month" ? "bday-month" : "bday-year"}
          aria-invalid={error ? true : undefined}
          value={value[key]}
          onChange={(event) => onChange({ ...value, [key]: event.target.value.replace(/\D/g, "") })}
        />
      </div>
    </div>
  );
  return (
    <div className={`nhsuk-form-group${error ? " nhsuk-form-group--error" : ""}`}>
      <fieldset className="nhsuk-fieldset" aria-describedby={describedBy(ids, { hint, error })}>
        <legend className="nhsuk-fieldset__legend">
          {legend}
          {optional && <OptionalMark />}
        </legend>
        <FieldMessages ids={ids} hint={hint} error={error} />
        <div className="nhsuk-date-input" id={id}>
          {field("day", "Day", 2)}
          {field("month", "Month", 2)}
          {field("year", "Year", 4)}
        </div>
      </fieldset>
    </div>
  );
}

/** Set when the control's label is the page's one h1, as in the NHS question pages pattern. */
export type PageHeading = { /** Small text above the question, e.g. "Physical · Question 2 of 9" */ caption?: string };

function HeadingLabel({ caption, children }: { caption?: string; children: ReactNode }) {
  return (
    <h1 className="nhsuk-label-wrapper">
      <span className="nhsuk-label nhsuk-label--l">
        {caption && <span className="nhsuk-caption-l">{caption}<span className="nhs-visually-hidden">: </span></span>}
        {children}
      </span>
    </h1>
  );
}

/** Multi-line text where the label is the page heading (one question per page). */
export function TextAreaQuestion({ question, caption, hint, error, optional, id, ...input }: Omit<FieldShellProps, "label"> & PageHeading & { question: ReactNode } & TextareaHTMLAttributes<HTMLTextAreaElement>) {
  const ids = useIds(id);
  return (
    <div className={`nhsuk-form-group${error ? " nhsuk-form-group--error" : ""}`}>
      <label htmlFor={ids.input}>
        <HeadingLabel caption={caption}>
          {question}
          {optional && <OptionalMark />}
        </HeadingLabel>
      </label>
      <FieldMessages ids={ids} hint={hint} error={error} />
      <textarea
        className={`nhsuk-textarea${error ? " nhsuk-textarea--error" : ""}`}
        rows={6}
        {...controlProps(ids, { hint, error }, input.required)}
        {...input}
      />
    </div>
  );
}

export type RadioOption = {
  value: string;
  label: string;
  hint?: string;
  /** Content revealed under this option while it is selected (NHS conditional reveal) */
  reveal?: ReactNode;
};

type RadioFieldProps = Omit<FieldShellProps, "label"> & {
  legend: ReactNode;
  name: string;
  options: readonly RadioOption[];
  value: string;
  onChange: (value: string) => void;
  /** Makes the legend the page's h1 */
  asPageHeading?: PageHeading;
  /** Smaller radios for a nested question */
  small?: boolean;
  id?: string;
  /** Shown between the question and the options, e.g. the value a system holds */
  before?: ReactNode;
};

/**
 * NHS radios: a fieldset whose legend is the question. With asPageHeading the legend is the page h1,
 * so the question is the first thing a screen reader announces. Options can reveal more content.
 */
export function RadioField({ legend, name, hint, error, optional, id, options, value, onChange, asPageHeading, small, before }: RadioFieldProps) {
  const generated = useId();
  const base = id ?? generated;
  const ids: Ids = { input: `${base}-${options[0]?.value}`, hint: `${base}-hint`, error: `${base}-error` };
  const legendBody = (
    <>
      {asPageHeading?.caption && <span className="nhsuk-caption-l">{asPageHeading.caption}<span className="nhs-visually-hidden">: </span></span>}
      {legend}
      {optional && <OptionalMark />}
    </>
  );
  return (
    <div className={`nhsuk-form-group${error ? " nhsuk-form-group--error" : ""}`} id={base}>
      <fieldset className="nhsuk-fieldset" aria-describedby={describedBy(ids, { hint, error })}>
        <legend className={`nhsuk-fieldset__legend${asPageHeading ? " nhsuk-fieldset__legend--l" : ""}`}>
          {asPageHeading ? <h1 className="nhsuk-fieldset__heading">{legendBody}</h1> : legendBody}
        </legend>
        <FieldMessages ids={ids} hint={hint} error={error} />
        {before}
        <div className={`nhsuk-radios${small ? " nhsuk-radios--small" : ""}`}>
          {options.map((option) => {
            const optionId = `${base}-${option.value}`;
            const selected = value === option.value;
            return (
              <div key={option.value}>
                <div className="nhsuk-radios__item">
                  <input
                    className="nhsuk-radios__input"
                    id={optionId}
                    name={name}
                    type="radio"
                    value={option.value}
                    checked={selected}
                    onChange={() => onChange(option.value)}
                    aria-describedby={option.hint ? `${optionId}-hint` : undefined}
                    aria-controls={option.reveal ? `${optionId}-reveal` : undefined}
                  />
                  <label className="nhsuk-label nhsuk-radios__label" htmlFor={optionId}>
                    {option.label}
                  </label>
                  {option.hint && (
                    <div id={`${optionId}-hint`} className="nhsuk-hint nhsuk-radios__hint">
                      {option.hint}
                    </div>
                  )}
                </div>
                {option.reveal && (
                  <div id={`${optionId}-reveal`} className="nhsuk-radios__conditional" hidden={!selected}>
                    {option.reveal}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </fieldset>
    </div>
  );
}
