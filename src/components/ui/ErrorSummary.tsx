import { useEffect, useRef } from "react";

export type ErrorSummaryItem = { text: string; /** id of the field the message is about */ fieldId?: string };

/**
 * NHS error summary: a titled box at the top of a form listing what to fix, each linking to its field.
 * It takes focus when it appears, so screen reader users hear it straight away.
 */
export function ErrorSummary({ items }: { items: readonly ErrorSummaryItem[] }) {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    if (items.length) ref.current?.focus();
  }, [items]);
  if (!items.length) return null;
  return (
    <div ref={ref} className="nhsuk-error-summary" role="alert" tabIndex={-1} aria-labelledby="error-summary-title">
      <h2 className="nhsuk-error-summary__title" id="error-summary-title">There is a problem</h2>
      <div className="nhsuk-error-summary__body">
        <ul className="nhsuk-list nhsuk-error-summary__list">
          {items.map((item) => (
            <li key={item.text}>{item.fieldId ? <a href={`#${item.fieldId}`}>{item.text}</a> : item.text}</li>
          ))}
        </ul>
      </div>
    </div>
  );
}
