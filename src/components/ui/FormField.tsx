import { InputHTMLAttributes, ReactNode, SelectHTMLAttributes, TextareaHTMLAttributes, useId } from "react";

type FieldShellProps = {
  label: ReactNode;
  /** Help text shown under the label, instead of leaving the format to a placeholder */
  hint?: ReactNode;
  /** Error message for this field. Shown in text, never by colour alone. */
  error?: string;
};

type Ids = { input: string; hint: string; error: string };

function describedBy(ids: Ids, { hint, error }: FieldShellProps) {
  return [hint && ids.hint, error && ids.error].filter(Boolean).join(" ") || undefined;
}

function FieldShell({ label, hint, error, ids, required, children }: FieldShellProps & { ids: Ids; required?: boolean; children: ReactNode }) {
  return (
    <div className={`nhsuk-form-group${error ? " nhsuk-form-group--error" : ""}`}>
      <label className="nhsuk-label" htmlFor={ids.input}>
        {label}
        {required && <span className="nhs-visually-hidden"> (required)</span>}
      </label>
      {hint && <div id={ids.hint} className="nhsuk-hint">{hint}</div>}
      {error && (
        <p id={ids.error} className="nhsuk-error-message">
          <span className="nhsuk-u-visually-hidden nhs-visually-hidden">Error: </span>
          {error}
        </p>
      )}
      {children}
    </div>
  );
}

function useIds(id?: string): Ids {
  const generated = useId();
  const base = id ?? generated;
  return { input: base, hint: `${base}-hint`, error: `${base}-error` };
}

/** Labelled text input with optional hint and error, following the NHS design system pattern. */
export function TextField({ label, hint, error, id, className = "", ...input }: FieldShellProps & InputHTMLAttributes<HTMLInputElement>) {
  const ids = useIds(id);
  return (
    <FieldShell label={label} hint={hint} error={error} ids={ids} required={input.required}>
      <input
        id={ids.input}
        className={`nhsuk-input${error ? " nhsuk-input--error" : ""} ${className}`.trim()}
        aria-describedby={describedBy(ids, { label, hint, error })}
        aria-invalid={error ? true : undefined}
        {...input}
      />
    </FieldShell>
  );
}

/** Labelled multi-line text input. */
export function TextAreaField({ label, hint, error, id, className = "", ...input }: FieldShellProps & TextareaHTMLAttributes<HTMLTextAreaElement>) {
  const ids = useIds(id);
  return (
    <FieldShell label={label} hint={hint} error={error} ids={ids} required={input.required}>
      <textarea
        id={ids.input}
        className={`nhsuk-textarea${error ? " nhsuk-textarea--error" : ""} ${className}`.trim()}
        aria-describedby={describedBy(ids, { label, hint, error })}
        aria-invalid={error ? true : undefined}
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
export function SelectField({ label, hint, error, id, options, placeholder, className = "", ...select }: SelectFieldProps) {
  const ids = useIds(id);
  return (
    <FieldShell label={label} hint={hint} error={error} ids={ids} required={select.required}>
      <select
        id={ids.input}
        className={`nhsuk-select${error ? " nhsuk-select--error" : ""} ${className}`.trim()}
        aria-describedby={describedBy(ids, { label, hint, error })}
        aria-invalid={error ? true : undefined}
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
