import { ReactNode } from "react";

export const NOT_SUPPLIED = "Not supplied by source";

export type DetailRow = readonly [label: string, value?: ReactNode];

/**
 * Label/value pairs as a description list. Missing values are shown explicitly
 * so a gap in a merged record is never mistaken for "none".
 */
export function DetailList({ rows }: { rows: readonly DetailRow[] }) {
  return (
    <dl className="panel-detail-list">
      {rows.map(([label, value]) => (
        <div key={label}>
          <dt>{label}</dt>
          <dd>{value || NOT_SUPPLIED}</dd>
        </div>
      ))}
    </dl>
  );
}

export type Fact = readonly [label: string, value?: ReactNode];

/** Compact multi-column label/value pairs. Provenance belongs in a table column, not inline. */
export function FactsGrid({ facts }: { facts: readonly Fact[] }) {
  return (
    <dl className="facts-grid">
      {facts.map(([label, value]) => (
        <div key={label}>
          <dt>{label}</dt>
          <dd>{value || NOT_SUPPLIED}</dd>
        </div>
      ))}
    </dl>
  );
}
