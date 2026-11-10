import { ReactNode } from "react";

type RecordCardProps = {
  heading: ReactNode;
  /** Shown at the right of the heading, e.g. a StatusTag */
  status?: ReactNode;
  /** Body text under the heading */
  children?: ReactNode;
  /** Small print line: a date, source or category */
  meta?: ReactNode;
};

/** One record in a RecordCardList. */
export function RecordCard({ heading, status, children, meta }: RecordCardProps) {
  return (
    <li className="record-card">
      <p className="record-card__heading">
        {heading}
        {status && <span className="record-card__status">{status}</span>}
      </p>
      {children && <p>{children}</p>}
      {meta && <small>{meta}</small>}
    </li>
  );
}

/** A plain list of read-only record summaries. Use ExpandableRow when the record has detail to reveal. */
export function RecordCardList({ children }: { children: ReactNode }) {
  return <ul className="record-card-list">{children}</ul>;
}
