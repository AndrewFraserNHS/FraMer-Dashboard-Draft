import { useId, useRef, useState } from "react";
import type { TagTone } from "./StatusTag";

export type ProvenanceRow = readonly [label: string, value: string];

type ProvenanceTagProps = {
  /** Short source name, e.g. "GP". Also the tag's visible label. */
  label: string;
  tone: TagTone;
  /** Where the data came from. Opens on click or Enter, never on hover alone (WCAG 1.4.13). */
  details: readonly ProvenanceRow[];
};

/**
 * A source tag you can open for more detail.
 * Built on the native Popover API: it renders in the top layer, so it is never clipped by a
 * scrolling table, and the browser supplies Escape to close, light-dismiss and focus return.
 */
export function ProvenanceTag({ label, tone, details }: ProvenanceTagProps) {
  const panelId = useId();
  const panel = useRef<HTMLDivElement>(null);
  const trigger = useRef<HTMLButtonElement>(null);
  const [open, setOpen] = useState(false);

  function place() {
    const button = trigger.current;
    const box = panel.current;
    if (!button || !box) return;
    const anchor = button.getBoundingClientRect();
    const left = Math.max(8, Math.min(anchor.left, window.innerWidth - box.offsetWidth - 8));
    const below = anchor.bottom + 6;
    const top = below + box.offsetHeight > window.innerHeight ? Math.max(8, anchor.top - box.offsetHeight - 6) : below;
    box.style.left = `${left}px`;
    box.style.top = `${top}px`;
  }

  return (
    <>
      <button
        ref={trigger}
        type="button"
        className={`provenance-tag nhsuk-tag nhsuk-tag--${tone}`}
        popoverTarget={panelId}
        aria-expanded={open}
        aria-controls={panelId}
      >
        {label}
        <span className="nhs-visually-hidden"> source details</span>
      </button>
      <div
        ref={panel}
        id={panelId}
        popover="auto"
        className="provenance-panel"
        aria-label={`${label} source details`}
        onToggle={(event) => {
          const isOpen = (event.nativeEvent as ToggleEvent).newState === "open";
          setOpen(isOpen);
          if (isOpen) place();
        }}
      >
        <dl>
          {details.map(([term, value]) => (
            <div key={term}>
              <dt>{term}</dt>
              <dd>{value}</dd>
            </div>
          ))}
        </dl>
      </div>
    </>
  );
}
