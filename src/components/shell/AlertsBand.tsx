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

/**
 * Safety flags and risks, collapsible. Always open on arrival, at every screen size, so none can be missed:
 * the choice to collapse is never remembered, so it cannot hide a flag on the next patient or the next visit.
 * Collapsed, it still names every high-priority flag and counts the rest. Severity is stated in text.
 */
export function AlertsBand({ flags }: { flags: readonly AlertFlag[] }) {
  const [open, setOpen] = useState(true);
  const id = useId();
  const high = flags.filter((flag) => flag.level === "high");
  const medium = flags.filter((flag) => flag.level === "medium").length;
  const low = flags.filter((flag) => flag.level === "low").length;

  const toggle = () => setOpen((value) => !value);

  return (
    <section className="ncrs-alerts" aria-label="Safety flags and risks">
      <div className="ncrs-alerts__bar">
        <button
          type="button"
          className="ncrs-alerts__toggle"
          aria-expanded={open}
          aria-controls={id}
          onClick={toggle}
        >
          <AlertOctagon size={18} aria-hidden="true" />
          <span className="ncrs-alerts__title">Safety flags and risks</span>
          <StatusTag tone="red">{high.length} high priority</StatusTag>
          <span className="ncrs-alerts__count">{flags.length} in total</span>
          <ChevronDown
            size={16}
            aria-hidden="true"
            className="ncrs-menu__chevron"
          />
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
            {(medium > 0 || low > 0) && (
              <li className="ncrs-alerts__more">
                {medium > 0 &&
                  `${medium} medium risk${medium === 1 ? "" : "s"}`}
                {medium > 0 && low > 0 && ", "}
                {low > 0 && `${low} low risk${low === 1 ? "" : "s"}`}
                {" hidden"}
              </li>
            )}
          </ul>
        )}
      </div>

      <ul id={id} className="ncrs-alerts__list" hidden={!open}>
        {flags.map((flag) => (
          <li key={flag.id}>
            <button type="button" onClick={flag.onOpen}>
              <StatusTag tone={tone[flag.level]}>
                {priorityLabel[flag.level]}
              </StatusTag>
              <span className="ncrs-alerts__name">{flag.label}</span>
              <ChevronRight size={16} aria-hidden="true" />
            </button>
          </li>
        ))}
      </ul>
    </section>
  );
}
