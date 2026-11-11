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
