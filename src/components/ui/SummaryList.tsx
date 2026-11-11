import { ReactNode } from "react";
import { Link } from "react-router-dom";

export type SummaryRow = {
  key: string;
  label: string;
  value: ReactNode;
  /** Where to change this answer */
  changeTo?: string;
};

/**
 * NHS summary list with a Change link per row, for "Check your answers" pages.
 * The link's visible text is "Change" with the question as hidden text, so each link is unique out of context.
 */
export function SummaryList({ rows }: { rows: readonly SummaryRow[] }) {
  return (
    <dl className="nhsuk-summary-list">
      {rows.map((row) => (
        <div key={row.key} className="nhsuk-summary-list__row">
          <dt className="nhsuk-summary-list__key">{row.label}</dt>
          <dd className="nhsuk-summary-list__value">{row.value}</dd>
          <dd className="nhsuk-summary-list__actions">
            {row.changeTo && (
              <Link to={row.changeTo}>
                Change<span className="nhs-visually-hidden"> {row.label}</span>
              </Link>
            )}
          </dd>
        </div>
      ))}
    </dl>
  );
}
