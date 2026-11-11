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
 * visible without colour. (A row that opens an inline panel or page keeps the RowChevron instead.)
 * No aria-label override: the visible text names the control, and aria-expanded carries the state (WCAG 2.5.3).
 */
export function ExpandableRow({ children, detail }: ExpandableRowProps) {
  const [open, setOpen] = useState(false);
  const id = useId();
  const triggerId = `${id}-trigger`;
  const detailId = `${id}-detail`;
  const Icon = open ? Minus : Plus;

  return (
    <>
      <button
        type="button"
        className={`dash-list-row interactive${open ? " expanded" : ""}`}
        id={triggerId}
        aria-expanded={open}
        aria-controls={detailId}
        onClick={() => setOpen((value) => !value)}
      >
        {children}
        <span className="row-toggle" aria-hidden="true">
          <Icon size={14} strokeWidth={3} />
        </span>
      </button>
      <div
        id={detailId}
        className="accordion-details"
        role="region"
        aria-labelledby={triggerId}
        tabIndex={open ? 0 : -1}
        hidden={!open}
      >
        {detail}
      </div>
    </>
  );
}
