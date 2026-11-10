import { useId, useState } from "react";
import { ChevronLeft, ListOrdered, SlidersHorizontal } from "lucide-react";
import { useSetAllDisclosures } from "../ui/DisclosureGroup";

export type TextSize = "small" | "medium" | "large";

/** Expands or collapses every DataSection on the page through DisclosureGroup state. */
function ExpandAllButton() {
  const setAll = useSetAllDisclosures();
  const [expanded, setExpanded] = useState(false);
  return (
    <button
      type="button"
      onClick={() => {
        setAll(!expanded);
        setExpanded(!expanded);
      }}
    >
      {expanded ? "Collapse all sections" : "Expand all sections"}
    </button>
  );
}

export type PageOptionsProps = {
  textSize: TextSize;
  onTextSize: (size: TextSize) => void;
  filtersOpen: boolean;
  /** Omit when the current view has no filters */
  onToggleFilters?: () => void;
  /** Omit when the current view's sections cannot be reordered */
  onReorder?: () => void;
};

/** Text size and page tools. Shared by the desktop sidebar and the mobile menu drawer. */
export function PageOptions({ textSize, onTextSize, filtersOpen, onToggleFilters, onReorder }: PageOptionsProps) {
  return (
    <>
      <fieldset className="ncrs-options__group">
        <legend>Text size</legend>
        <div className="ncrs-options__radios">
          {(["small", "medium", "large"] as const).map((size) => (
            <label key={size}>
              <input
                type="radio"
                name="record-text-size"
                checked={textSize === size}
                onChange={() => onTextSize(size)}
              />
              <span>{size[0].toUpperCase() + size.slice(1)}</span>
            </label>
          ))}
        </div>
      </fieldset>

      <div className="ncrs-options__group">
        <p className="ncrs-options__label">This page</p>
        <div className="ncrs-options__actions">
          <ExpandAllButton />
          {onReorder && (
            <button type="button" onClick={onReorder}>
              <ListOrdered size={16} aria-hidden="true" />
              Reorder sections
            </button>
          )}
          {onToggleFilters && (
            <button type="button" aria-expanded={filtersOpen} onClick={onToggleFilters}>
              {filtersOpen ? "Hide filters" : "Show filters"}
            </button>
          )}
        </div>
      </div>
    </>
  );
}

/**
 * Page options in a collapsible left sidebar (wide screens). Collapses to a narrow rail to give the page its width back.
 */
export function OptionsSidebar({ open, onOpenChange, ...options }: { open: boolean; onOpenChange: (open: boolean) => void } & PageOptionsProps) {
  const bodyId = useId();

  return (
    <aside className={`ncrs-options${open ? " is-open" : ""}`} aria-label="Page options">
      <button
        type="button"
        className="ncrs-options__toggle"
        aria-expanded={open}
        aria-controls={bodyId}
        aria-label={open ? undefined : "Show page options"}
        onClick={() => onOpenChange(!open)}
      >
        <SlidersHorizontal size={18} aria-hidden="true" />
        {open && <span>Page options</span>}
        <ChevronLeft size={16} aria-hidden="true" className="ncrs-options__collapse" />
      </button>

      <div id={bodyId} className="ncrs-options__body" hidden={!open}>
        <PageOptions {...options} />
      </div>
    </aside>
  );
}
