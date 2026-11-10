/**
 * Decorative chevron for a row that navigates to, or opens a modal for, more detail.
 * Rows that expand in place use ExpandableRow's plus and minus instead, so the two behaviours look different.
 * Hidden from assistive technology: the row's own name and role say what it does.
 */
export function RowChevron() {
  return <span className="side-panel-chevron" aria-hidden="true" />;
}
