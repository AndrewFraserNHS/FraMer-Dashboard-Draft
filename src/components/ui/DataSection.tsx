import { ReactNode, useEffect, useId, useState } from "react";
import { useDisclosureSignal } from "./DisclosureGroup";
import { HeadingLevelContext } from "./HeadingLevel";

type DataSectionProps = {
  title: string;
  /** Short status, e.g. "Showing 7 of 7 active". Part of the button's accessible name. */
  summary?: string;
  /** Extra status in the heading, for example an "At risk" tag. Part of the accessible name. */
  badge?: ReactNode;
  headingLevel?: 2 | 3;
  defaultOpen?: boolean;
  /** Controls shown above the content, e.g. a SortSelect */
  toolbar?: ReactNode;
  className?: string;
  children: ReactNode;
};

/**
 * Collapsible section with a real heading.
 * Pattern: heading > button[aria-expanded][aria-controls] (WAI-ARIA accordion),
 * so screen-reader users can navigate by heading and the visible text is the accessible name.
 */
export function DataSection({
  title,
  summary,
  badge,
  headingLevel = 2,
  defaultOpen = true,
  toolbar,
  className = "",
  children,
}: DataSectionProps) {
  const [open, setOpen] = useState(defaultOpen);
  const id = useId();
  const signal = useDisclosureSignal();
  const Heading = `h${headingLevel}` as "h2" | "h3";

  useEffect(() => {
    if (signal.n > 0) setOpen(signal.open);
  }, [signal]);

  return (
    <section className={`nhs-expander-card ${className}`} data-open={open}>
      <Heading className="nhs-expander-heading">
        <button
          type="button"
          className="nhs-expander-summary"
          aria-expanded={open}
          aria-controls={`${id}-content`}
          aria-describedby={badge || summary ? `${id}-meta` : undefined}
          onClick={() => setOpen((value) => !value)}
        >
          <span className="nhs-expander-summary-text">{title}</span>
          {/* Status and count are shown, but kept out of the button name so the name stays short. They are read as its description. */}
          {(badge || summary) && (
            <span id={`${id}-meta`} className="nhs-expander-meta" aria-hidden="true">
              {badge}
              {summary && <span className="nhs-expander-count">{summary}</span>}
            </span>
          )}
        </button>
      </Heading>
      <div id={`${id}-content`} className="nhs-expander-content" hidden={!open}>
        {toolbar && <div className="nhs-expander-action">{toolbar}</div>}
        <HeadingLevelContext.Provider value={headingLevel}>
          <div className="dash-card-body">{children}</div>
        </HeadingLevelContext.Provider>
      </div>
    </section>
  );
}
