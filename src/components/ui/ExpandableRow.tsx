import { ReactNode, useId, useState } from "react";
import { Minus, Plus } from "lucide-react";

type ExpandableRowProps = {
  /** Always-visible row content. Its text is the button's accessible name. */
  children: ReactNode;
  /** Content revealed when the row is expanded */
  detail: ReactNode;
};

/**
 * A list row that reveals more detail in place. A plus becomes a minus while open, so the state is
 * visible without colour. (A row that opens a modal or page keeps the RowChevron instead.)
 * No aria-label override: the visible text names the control, and aria-expanded carries the state (WCAG 2.5.3).
 */
export function ExpandableRow({ children, detail }: ExpandableRowProps) {
  const [open, setOpen] = useState(false);
  const id = useId();
  const Icon = open ? Minus : Plus;

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
        <span className="row-toggle" aria-hidden="true">
          <Icon size={14} strokeWidth={3} />
        </span>
      </button>
      <div id={id} className="accordion-details" hidden={!open}>
        {detail}
      </div>
    </>
  );
}
