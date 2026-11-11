import { MouseEvent, useEffect, useId, useRef } from "react";

export type ErrorSummaryItem = { text: string; /** id of the field the message is about */ fieldId?: string };

/**
 * NHS error summary: a titled box at the top of a form listing what to fix, each linking to its field.
 * It takes focus when it appears, so screen reader users hear it straight away. Choosing a message
 * moves focus into the field itself, because a #hash link alone only scrolls under client-side routing.
 */
export function ErrorSummary({ items }: { items: readonly ErrorSummaryItem[] }) {
  const ref = useRef<HTMLDivElement>(null);
  const titleId = useId();
  useEffect(() => {
    if (items.length) ref.current?.focus();
  }, [items]);
  if (!items.length) return null;

  function focusField(event: MouseEvent, fieldId: string) {
    const target = document.getElementById(fieldId);
    if (!target) return;
    event.preventDefault();
    // A date group is a wrapper; focus its first input
    const control = target.matches("input, select, textarea, button") ? target : target.querySelector<HTMLElement>("input, select, textarea");
    (control ?? target).focus();
    target.scrollIntoView({ block: "center" });
  }

  return (
    <div ref={ref} className="nhsuk-error-summary" role="alert" tabIndex={-1} aria-labelledby={titleId}>
      <h2 className="nhsuk-error-summary__title" id={titleId}>There is a problem</h2>
      <div className="nhsuk-error-summary__body">
        <ul className="nhsuk-list nhsuk-error-summary__list">
          {items.map((item) => (
            <li key={item.text}>
              {item.fieldId ? (
                <a href={`#${item.fieldId}`} onClick={(event) => focusField(event, item.fieldId!)}>{item.text}</a>
              ) : (
                item.text
              )}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
