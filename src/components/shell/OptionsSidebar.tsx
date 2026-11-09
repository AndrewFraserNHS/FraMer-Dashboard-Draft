import { useId, useState } from "react";
import { ChevronDown, ChevronLeft, ListOrdered, SlidersHorizontal } from "lucide-react";
import { useSetAllDisclosures } from "../ui/DisclosureGroup";

export type TextSize = "small" | "medium" | "large";

const recordViews = [
  "Core record",
  "Cancer",
  "Children and young people",
  "Diagnostics",
  "Frailty",
  "Long-term conditions",
  "Maternity",
  "Mental health",
  "Planned and elective care",
] as const;

type OptionsSidebarProps = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  textSize: TextSize;
  onTextSize: (size: TextSize) => void;
  recordView: string;
  onRecordView: (view: string) => void;
  filtersOpen: boolean;
  onToggleFilters: () => void;
  onReorder: () => void;
};

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

/**
 * Page options in a collapsible left sidebar: display (text size, record view) and
 * page tools (expand, reorder, filters). Collapses to a narrow rail to give the page its width back.
 */
export function OptionsSidebar({
  open,
  onOpenChange,
  textSize,
  onTextSize,
  recordView,
  onRecordView,
  filtersOpen,
  onToggleFilters,
  onReorder,
}: OptionsSidebarProps) {
  const bodyId = useId();
  const viewsId = useId();
  const [viewsOpen, setViewsOpen] = useState(false);

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
          <p className="ncrs-options__label">Record view</p>
          <button
            type="button"
            className="ncrs-options__disclosure"
            aria-expanded={viewsOpen}
            aria-controls={viewsId}
            onClick={() => setViewsOpen((value) => !value)}
          >
            {recordView}
            <ChevronDown size={16} aria-hidden="true" className="ncrs-menu__chevron" />
          </button>
          <ul id={viewsId} className="ncrs-options__views" hidden={!viewsOpen}>
            {recordViews.map((view, index) => (
              <li key={view} className={index === 1 || index === 7 ? "has-separator" : undefined}>
                <button
                  type="button"
                  aria-pressed={recordView === view}
                  onClick={() => {
                    onRecordView(view);
                    setViewsOpen(false);
                  }}
                >
                  {view}
                </button>
              </li>
            ))}
          </ul>
        </div>

        <div className="ncrs-options__group">
          <p className="ncrs-options__label">This page</p>
          <div className="ncrs-options__actions">
            <ExpandAllButton />
            <button type="button" onClick={onReorder}>
              <ListOrdered size={16} aria-hidden="true" />
              Reorder sections
            </button>
            <button type="button" aria-expanded={filtersOpen} onClick={onToggleFilters}>
              {filtersOpen ? "Hide filters" : "Show filters"}
            </button>
          </div>
        </div>
      </div>
    </aside>
  );
}
