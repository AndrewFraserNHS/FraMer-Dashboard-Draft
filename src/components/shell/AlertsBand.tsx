import { useId, useState } from "react";
import { AlertOctagon, ChevronDown, ChevronRight } from "lucide-react";
import { Priority, priorityLabel } from "../../data/patient";
import { StatusTag, TagTone } from "../ui/StatusTag";

export type AlertFlag = {
  id: string;
  label: string;
  level: Priority;
  onOpen: () => void;
};

const tone: Record<Priority, TagTone> = { high: "red", medium: "orange", low: "blue" };
const STORAGE_KEY = "ncrs.alerts.open";

function readOpen(): boolean {
  try {
    const stored = window.sessionStorage.getItem(STORAGE_KEY);
    if (stored) return stored === "open";
  } catch {
    /* fall through to the default */
  }
  // Open by default so no flag is missed, except on narrow screens where the list would fill the view
  return window.innerWidth >= 900;
}

/**
 * Safety flags, collapsible. Open by default so none can be missed on arrival.
 * Collapsed, it still names every high-priority flag. Severity is stated in text.
 */
export function AlertsBand({ flags }: { flags: readonly AlertFlag[] }) {
  const [open, setOpen] = useState(readOpen);
  const id = useId();
  const high = flags.filter((flag) => flag.level === "high");

  function toggle() {
    const next = !open;
    setOpen(next);
    try {
      window.sessionStorage.setItem(STORAGE_KEY, next ? "open" : "closed");
    } catch {
      /* remembering the choice is a convenience only */
    }
  }

  return (
    <section className="ncrs-alerts" aria-label="Safety flags">
      <div className="ncrs-alerts__bar">
        <button
          type="button"
          className="ncrs-alerts__toggle"
          aria-expanded={open}
          aria-controls={id}
          onClick={toggle}
        >
          <AlertOctagon size={18} aria-hidden="true" />
          <span className="ncrs-alerts__title">Safety flags</span>
          <StatusTag tone="red">{high.length} high priority</StatusTag>
          <span className="ncrs-alerts__count">{flags.length} in total</span>
          <ChevronDown size={16} aria-hidden="true" className="ncrs-menu__chevron" />
        </button>

        {!open && (
          <ul className="ncrs-alerts__preview">
            {high.map((flag) => (
              <li key={flag.id}>
                <button type="button" onClick={flag.onOpen}>
                  {flag.label}
                  <ChevronRight size={16} aria-hidden="true" />
                </button>
              </li>
            ))}
          </ul>
        )}
      </div>

      <ul id={id} className="ncrs-alerts__list" hidden={!open}>
        {flags.map((flag) => (
          <li key={flag.id}>
            <button type="button" onClick={flag.onOpen}>
              <StatusTag tone={tone[flag.level]}>{priorityLabel[flag.level]}</StatusTag>
              <span className="ncrs-alerts__name">{flag.label}</span>
              <ChevronRight size={16} aria-hidden="true" />
            </button>
          </li>
        ))}
      </ul>
    </section>
  );
}
