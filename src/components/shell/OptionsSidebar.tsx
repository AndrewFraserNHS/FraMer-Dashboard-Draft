import { useId, useState } from "react";
import { ChevronLeft, ListOrdered, SlidersHorizontal } from "lucide-react";
import { useSetAllDisclosures } from "../ui/DisclosureGroup";

export type TextSize = "small" | "medium" | "large";

/**
 * Expand and collapse every DataSection on the page through DisclosureGroup state. Two buttons with fixed
 * names, rather than one that swaps its label, so the label can never disagree with what is on screen.
 */
function ExpandAllButtons() {
  const setAll = useSetAllDisclosures();
  const [announcement, setAnnouncement] = useState("");
  const apply = (open: boolean) => {
    setAll(open);
    setAnnouncement(open ? "All sections expanded" : "All sections collapsed");
  };
  return (
    <>
      <button type="button" onClick={() => apply(true)}>Expand all sections</button>
      <button type="button" onClick={() => apply(false)}>Collapse all sections</button>
      <span role="status" className="nhs-visually-hidden">{announcement}</span>
    </>
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

/** Text size and page tools. Shared by the desktop sidebar and the expanded mobile menu. */
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
          <ExpandAllButtons />
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
