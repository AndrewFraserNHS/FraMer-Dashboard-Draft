import { ReactNode, useId, useState } from "react";

/** Decorative chevron. Hidden from assistive technology. */
export function RowChevron() {
  return <span className="side-panel-chevron" aria-hidden="true" />;
}

type ExpandableRowProps = {
  /** Always-visible row content. Its text is the button's accessible name. */
  children: ReactNode;
  /** Content revealed when the row is expanded */
  detail: ReactNode;
};

/**
 * A list row that reveals more detail in place.
 * No aria-label override: the visible text names the control (WCAG 2.5.3).
 */
export function ExpandableRow({ children, detail }: ExpandableRowProps) {
  const [open, setOpen] = useState(false);
  const id = useId();

  return (
    <>
      <button
        type="button"
        className={`dash-list-row interactive${open ? " expanded" : ""}`}
        aria-expanded={open}
        aria-controls={id}
        onClick={() => setOpen((value) => !value)}
      >
        {children}
        <RowChevron />
      </button>
      <div id={id} className="accordion-details" hidden={!open}>
        {detail}
      </div>
    </>
  );
}
