# FraMer Dashboard Component Library

This document describes the reusable components available for building consistent NHS-compliant interfaces across all dashboard pages.

## DetailPanel Component

A reusable panel component for displaying detailed information about a record item. Used consistently across all pages (Summary, Pregnancy, Appointments, etc.).

### Location
`src/DetailPanel.tsx`

### Props

```typescript
interface DetailPanelProps {
  title: string;              // Main heading
  eyebrow?: string;           // Subtitle/context (e.g., "Maternity event detail")
  status?: string;            // Status badge (e.g., "Active")
  tone?: "red" | "purple" | "blue" | "amber";  // Header color
  content: ReactNode;         // Panel body content (HTML/components)
  onClose: () => void;        // Callback when close/back button is clicked
  isOpen: boolean;            // Controls visibility
}
```

### Usage

```typescript
import { DetailPanel } from "./DetailPanel";

function MyPage() {
  const [selectedItem, setSelectedItem] = useState(null);

  return (
    <>
      {/* Main content */}
      <div>Your page content here</div>

      {/* Detail panel - automatically centered and positioned */}
      <DetailPanel
        isOpen={!!selectedItem}
        title={selectedItem?.name || ""}
        eyebrow="Item Details"
        status="Active"
        tone="blue"
        content={<div>{/* Your detail content */}</div>}
        onClose={() => setSelectedItem(null)}
      />
    </>
  );
}
```

### Styling

The component uses CSS classes:
- `.detail-panel` - Container (max-width 1280px, centered)
- `.detail-panel-header` - Header with background color
- `.detail-panel-back-button` - Back/close button (semantic styling)
- `.detail-panel-body` - Content area with padding
- `.detail-panel-eyebrow` - Subtitle text
- `.detail-panel-status` - Status badge

### Features

✅ Centered layout matching main content width
✅ Color-coded headers (blue, red, purple, amber)
✅ Proper back button styling (white text on colored background)
✅ Visibility toggle (shows/hides main content when open)
✅ Accessibility support (ARIA labels, semantic HTML)
✅ Responsive layout
✅ Reusable across all pages without customization

### CSS Architecture

The `.detail-panel` component is designed to be placed inside `.maternity-content` (the main flex container) for proper centering:

```
record-workspace (flex container)
├── maternity-content (flex, grows)
│   └── detail-panel (max-width 1280px, centered)
│       ├── detail-panel-header (with tone variant bg)
│       └── detail-panel-body (scrollable content)
```

The component automatically inherits the centered layout from its parent container.

## Integration Pattern

When implementing detail panels across pages:

1. Import the DetailPanel component
2. Create state to track which item is selected
3. Render your list/cards with click handlers
4. Place a DetailPanel at the end of your content
5. Pass state and callbacks to the DetailPanel

Example for Pregnancy page:
```typescript
import { DetailPanel } from "./DetailPanel";

export default function Pregnancy() {
  const [selectedCondition, setSelectedCondition] = useState(null);

  return (
    <div>
      {/* Conditions list */}
      {conditions.map(condition => (
        <button onClick={() => setSelectedCondition(condition)}>
          {condition.name}
        </button>
      ))}

      {/* Detail panel */}
      <DetailPanel
        isOpen={!!selectedCondition}
        title={selectedCondition?.name || ""}
        eyebrow="Pregnancy Condition"
        tone="blue"
        content={/* Detail rows here */}
        onClose={() => setSelectedCondition(null)}
      />
    </div>
  );
}
```

## Styling Conventions

### Header Tones
- `tone="blue"` - Primary information (default)
- `tone="red"` - Alerts/warnings
- `tone="amber"` - Cautions
- `tone="purple"` - Alternative (future use)

### Back Button
The back button styling is handled automatically by `.detail-panel-back-button` CSS:
- White text on colored background
- Underlined for clarity
- ChevronLeft icon (from lucide-react)
- Hover effect (opacity change)

## Future Enhancements

Potential additions to the component library:

1. **DetailRow Component** - Consistent label/value pair styling
2. **AccordionItem Component** - Collapsible content sections
3. **StatusBadge Component** - Consistent status styling
4. **SafetyFlag Component** - Alert/warning styling
5. **RiskBanner Component** - Risk highlighting

## Notes

- The DetailPanel component was designed to be the foundation of a reusable component library
- All styling uses CSS classes in `src/index.css` for consistency
- The component uses semantic HTML for accessibility
- Center layout is handled by parent container flex layout

## Shared UI components (`src/components/ui`)

Every record tab is built from these. Pages must not render their own header, patient banner or tabs; the shell supplies them.

| Component | Use for | Accessibility notes |
|---|---|---|
| `RecordPage` | Page layout: one `<h1>`, stacked sections, connected systems, prototype note | Single h1 per page |
| `DataSection` | Collapsible section (`title`, `summary`, `badge`, `toolbar`) | Heading containing a button with `aria-expanded` and `aria-controls`; visible text is the name; responds to Expand all |
| `ExpandableRow` | A list row that reveals a `DetailList` in place | Button name comes from its visible text |
| `DetailList` / `FactsGrid` | Label/value pairs; missing values show "Not supplied by source" | Description list |
| `DataTable` | Any table; optional per-row "view" button | Caption, `scope="col"`, keyboard-scrollable region; rows are never buttons |
| `StatusTag`, `PriorityTag`, `ResultTag`, `SourceTag` | Status and provenance | Text always states the status |
| `Callout` | Highlighted message (`red`, `amber`, `blue`, `grey`) | Tone also stated in hidden text |
| `Subsection` | Headed group inside a section | Real `<h3>`/`<h4>` |
| `ToggleGroup` | Filter buttons | `aria-pressed` |
| `SortSelect` | Sorting | Visible label, polite announcement |
| `ConnectedSystems` | Connected-systems panel | Status as text tag |
| `Dialog` | Modal dialogs | Native `<dialog>`: focus trap, Escape, focus return |
| `DetailPanel` | Drill-in view | Focus moves to heading; Back button text is its name |

Patient data lives in `src/data/`, so risks, banners and safety flags share one source.
