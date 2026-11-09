# Suggestions: shared components, NHS design system use and accessibility

Status: suggestions only. No source files were changed and nothing is committed.
Verified against: `src/App.tsx`, `MaternityShell.tsx`, `DetailPanel.tsx`, `RiskBanner.tsx`, `Results.tsx`, `main.tsx`, `index.css`, `package.json` (nhsuk-frontend 10.7.1).
Class names for NHS components should be checked against the v10.7 docs before use. I wrote them from memory of v9/v10.

---

## 1. What I found

### The big picture
1. **`nhsuk-frontend` CSS is loaded but barely used.** `main.tsx` imports it, yet only the Reorder modal buttons and one notification-banner rule use an `nhsuk-*` class. `index.css` is ~4,000 lines that re-implement NHS components: expander, tags, summary list, back link, skip link, table, error summary, breadcrumb.
2. **The Summary page's building blocks are defined inline in `App.tsx`**, so no other page can use them. `Card`, `ExpanderCard`, `AccordionItem`, `DetailRows`, `ListRow`, `More`, `SortControl` and `RowChevron` all sit there. `Card` is just a pass-through to `ExpanderCard`.
3. **Several components do the same job in different ways.**
   - Key/value lists: `DetailRows` (App), `StructuredDetails` (Shell), and the raw `<dl className="panel-detail-list">` in `openSpecialistDetail`.
   - Disclosure: `<details>` (ExpanderCard), button + `aria-expanded` (AccordionItem, Results `SectionCard`).
   - Drill-in: some rows expand inline, others open the side panel (Upcoming care, Care team, Documents), with no rule for which is used when.
4. **The same clinical data is written three times:** `RiskBannerGroup risks=[…]`, the `risks` const, and `safetyFlags` in the shell. These will drift apart. In a clinical UI that is a safety issue, not only a tidiness one.
5. **`Results.tsx` is a different app.**
   - It renders its own NHS header, patient bar and tab bar *inside* the shell, so the page gets two headers (routes are wrapped by `MaternityShell` in `main.tsx`).
   - It uses Tailwind arbitrary hex values and 10–13px text.
   - Its tables are `<div>` + `<p>`.
   - Its filter "buttons" are clickable `<div>`s (not keyboard-reachable).
   - Its `ResultsTable` always shows the green "Normal" icon and colour whatever `r.status` is (lines ~157–165). An abnormal value would be displayed as normal.
6. **`MaternityShell` patches accessibility in with a `MutationObserver`** (`decorateRecords`). It gives every `ul li`, `tbody tr` and Tailwind-matching `div` on non-Summary pages `role="button"`, `tabindex="0"` and an `aria-label`. It also clicks section toggles via the DOM for "Expand all". This is fragile. It makes whole rows buttons with nested content, and it overwrites accessible names. It is also why only the Summary page "works" properly.

### Accessibility defects (WCAG 2.2 AA)
| # | Where | Problem | WCAG |
|---|---|---|---|
| a | `AccordionItem` | `aria-label="Expand X detail"` replaces the visible text, so the voice-control name ("click Gestational diabetes") no longer matches. `aria-expanded` has no `aria-controls`. The `detail` prop is unused. | 2.5.3, 4.1.2 |
| b | `DetailPanel` | `aria-label="Close X details"` while the visible text is "Back". `closeButton` ref in the shell is never attached, so **focus never moves into the panel**. | 2.5.3, 2.4.3 |
| c | Shell + App | **Two `<h1>`s**: patient name and "Summary". | 1.3.1 |
| d | `ExpanderCard` | Section titles are not headings, so screen-reader users cannot navigate by heading. `aria-expanded` on `<summary>` is redundant. `aria-live="polite"` on the count makes it announce on every toggle. | 1.3.1, 4.1.3 |
| e | `ReorderModal` | Not a dialog: no `role="dialog"`/`aria-modal`, no focus trap, no Escape, no focus return, inline styles. Also `useState(cards)` snapshots once, and `cardOrder` is never read by `App`, so Apply does nothing. | 2.1.2, 2.4.3, 4.1.2 |
| f | Search screens | `<span aria-label="required">*</span>` is not announced reliably. Errors are not linked to inputs (`aria-describedby`/`aria-invalid`). The error should come with an NHS error summary that takes focus. "Back" is a `<button>`, not a link. | 3.3.1, 3.3.3, 4.1.2 |
| g | Access toast | Disappears after 4 s. | 2.2.1 |
| h | Text size | 10–13px text (`text-[11px]` etc.). NHS body is 19px, with 16px as the smallest "small" size. | 1.4.4, NHS typography |
| i | Colours | `#9ba8b5`, `#8a9baa` on white are ~2.6–3:1 (need 4.5:1). `#8ab0c8` separators on `#d5e8f5` are decorative but should be `aria-hidden`. | 1.4.3 |
| j | Priority tags | `priority-filled` alternates by `index % 2`. Visual state with no meaning. | 1.3.3 (misleading), design |
| k | Risk banners | Level is colour + icon only. Add text such as "High priority:" for AT and for monochrome. `count && …` renders a stray `0`. | 1.4.1 |
| l | `SortControl` | Select has `aria-label` only (NHS wants a visible `<label>`). The re-sort is silent. Dates are sorted by `Date.parse("5 September 2026")`, which is non-standard and brittle. | 3.3.2, 4.1.3 |
| m | Results filters | Clickable `<div>`s. | 2.1.1, 4.1.2 |
| n | Safety flags | A row of buttons not in a list, and nothing says they open a panel. | 1.3.1 |

---

## 2. Target structure

```
src/
  components/
    ui/                     # presentational, no clinical knowledge
      DataSection.tsx       # heading + disclosure + count + footer link
      DisclosureGroup.tsx   # state-driven expand/collapse all
      ExpandableRow.tsx     # list row that discloses a DetailList
      DetailList.tsx        # one key/value list (replaces 3 variants)
      StatusTag.tsx         # tag with text, icon + colour
      AlertBanner.tsx       # replaces RiskBanner visuals
      SortSelect.tsx
      Dialog.tsx            # native <dialog>
      DataTable.tsx         # responsive NHS table wrapper
      DetailPanel.tsx       # existing, fixed focus + naming
    record/                 # clinical composites
      SafetyFlags.tsx
      SourceInformation.tsx
      PatientBanner.tsx
  data/
    patient.ts              # SINGLE source: risks, conditions, meds, results…
  pages/                    # App → Summary, Results, …
  styles/tokens.css
```

Rules for the library (put in `COMPONENT_LIBRARY.md`):
- Use an NHS component first. Build a new one only when none exists, and wrap NHS classes where possible.
- Components take data props, never raw hex, and never reach into the DOM.
- Every component documents: keyboard behaviour, accessible name source, and what it announces.
- Pages never pass `aria-label` to override visible text.

### Which NHS component replaces what
| Current custom | NHS component |
|---|---|
| `DetailRows`, `StructuredDetails`, `.panel-detail-list` | Summary list `nhsuk-summary-list` |
| `.priority`, `.result-tag`, `.source-tag`, `.outline-tag`, `event-type-tag` | Tag `nhsuk-tag nhsuk-tag--red/orange/yellow/green/blue/grey` |
| `RiskBanner` (medium) | Warning callout `nhsuk-warning-callout` |
| `RiskBanner` (high) | Care card (urgent) |
| `.documents-table`, ad-hoc Results tables | Table `nhsuk-table` / `nhsuk-table-responsive` |
| `.back-link`, `.detail-back-button`, `.detail-panel-back-button` | Back link `nhsuk-back-link` |
| `.record-skip-link` | `nhsuk-skip-link` |
| Search form | Input, label, hint, radios, **error summary**, error message |
| Patient-confirm warning | Warning callout or inset text |
| Access toast | Notification banner (success), persistent, with dismiss |
| Breadcrumb | `nhsuk-breadcrumb` |
| Sort select | `nhsuk-form-group` + `nhsuk-label` + `nhsuk-select` |
| `.nhs-visually-hidden` | `nhsuk-u-visually-hidden` |

---

## 3. Suggested component code

### 3.1 Tokens and type scale (`styles/tokens.css`)
Use rem so the existing Small/Medium/Large control scales everything (set it on `html`, not on `.record-shell`).
```css
:root {
  --ncrs-font-s: 1rem;        /* NHS small text */
  --ncrs-font-m: 1.1875rem;   /* NHS body (19px) */
  --ncrs-font-l: 1.5rem;
  --ncrs-focus: #ffeb3b;      /* NHS focus yellow */
  --ncrs-focus-text: #212b32;
  --ncrs-text-secondary: #4c6272;  /* AA on white and on #f0f4f5 */
}
html.text-small  { font-size: 100%; }
html.text-medium { font-size: 112.5%; }
html.text-large  { font-size: 125%; }
```
Then delete the one-off px sizes and the low-contrast greys from `Results.tsx`/`index.css`.

### 3.2 `DetailList` (replaces `DetailRows` + `StructuredDetails` + raw `<dl>`)
```tsx
import { ReactNode } from "react";

export const NOT_SUPPLIED = "Not supplied by source";
export type DetailRow = readonly [label: string, value?: ReactNode];

export function DetailList({ rows }: { rows: readonly DetailRow[] }) {
  return (
    <dl className="nhsuk-summary-list">
      {rows.map(([label, value]) => (
        <div className="nhsuk-summary-list__row" key={label}>
          <dt className="nhsuk-summary-list__key">{label}</dt>
          <dd className="nhsuk-summary-list__value">{value || NOT_SUPPLIED}</dd>
        </div>
      ))}
    </dl>
  );
}
```
Missing data is explicit and consistent, which matters in a record that merges sources.

### 3.3 `StatusTag`, with text always present
```tsx
type Priority = "high" | "medium" | "low";
const priority: Record<Priority, { label: string; cls: string }> = {
  high:   { label: "High priority",   cls: "nhsuk-tag--red" },
  medium: { label: "Medium priority", cls: "nhsuk-tag--orange" },
  low:    { label: "Low priority",    cls: "nhsuk-tag--blue" },
};

export function PriorityTag({ level }: { level: Priority }) {
  const { label, cls } = priority[level];
  return <strong className={`nhsuk-tag ${cls}`}>{label}</strong>;
}

// results: Abnormal / Borderline / Normal / Awaiting
const result = {
  abnormal:   { label: "Abnormal",   cls: "nhsuk-tag--red" },
  borderline: { label: "Borderline", cls: "nhsuk-tag--yellow" },
  normal:     { label: "Normal",     cls: "nhsuk-tag--green" },
  awaiting:   { label: "Awaiting",   cls: "nhsuk-tag--grey" },
} as const;
export function ResultTag({ status }: { status: keyof typeof result }) {
  const { label, cls } = result[status];
  return <strong className={`nhsuk-tag ${cls}`}>{label}</strong>;
}
```
Drive tags from one map, so `Results.tsx` cannot show "Normal" for an abnormal value. Drop the `priority-filled` alternation.

### 3.4 `DisclosureGroup` and `DataSection`
Pattern: button inside a heading, `aria-expanded` + `aria-controls`, panel with `hidden`. This is the WAI-ARIA accordion pattern and keeps heading navigation. `<details>/<summary>` hides heading semantics from some screen readers. "Expand all" becomes state, not DOM clicks.

```tsx
// DisclosureGroup.tsx
import { createContext, ReactNode, useCallback, useContext, useState } from "react";

type Signal = { open: boolean; n: number };
const Ctx = createContext<Signal>({ open: false, n: 0 });
const SetCtx = createContext<(open: boolean) => void>(() => {});

export function DisclosureGroup({ children }: { children: ReactNode }) {
  const [signal, setSignal] = useState<Signal>({ open: false, n: 0 });
  const setAll = useCallback((open: boolean) => setSignal((s) => ({ open, n: s.n + 1 })), []);
  return <SetCtx.Provider value={setAll}><Ctx.Provider value={signal}>{children}</Ctx.Provider></SetCtx.Provider>;
}
export const useGroupSignal = () => useContext(Ctx);
export const useSetAll = () => useContext(SetCtx);
```

```tsx
// DataSection.tsx
import { ReactNode, useEffect, useId, useState } from "react";
import { Link } from "react-router-dom";
import { useGroupSignal } from "./DisclosureGroup";

type Props = {
  title: string;
  /** e.g. "Showing 7 of 7 active" */
  summary?: string;
  headingLevel?: 2 | 3;
  defaultOpen?: boolean;
  toolbar?: ReactNode;                       // e.g. <SortSelect/>
  footerLink?: { to: string; label: string };
  children: ReactNode;
};

export function DataSection({
  title, summary, headingLevel = 2, defaultOpen = true, toolbar, footerLink, children,
}: Props) {
  const [open, setOpen] = useState(defaultOpen);
  const id = useId();
  const signal = useGroupSignal();
  useEffect(() => { if (signal.n > 0) setOpen(signal.open); }, [signal]);
  const H = `h${headingLevel}` as const;

  return (
    <section className="data-section" aria-labelledby={`${id}-h`}>
      <H className="data-section__heading" id={`${id}-h`}>
        <button
          type="button"
          className="data-section__toggle"
          aria-expanded={open}
          aria-controls={`${id}-body`}
          onClick={() => setOpen((o) => !o)}
        >
          <span className="data-section__title">{title}</span>
          {summary && <span className="data-section__summary">{summary}</span>}
          <span className="data-section__chevron" aria-hidden="true" />
        </button>
      </H>
      <div id={`${id}-body`} hidden={!open} className="data-section__body">
        {toolbar && <div className="data-section__toolbar">{toolbar}</div>}
        {children}
        {footerLink && <Link className="nhsuk-link" to={footerLink.to}>{footerLink.label}</Link>}
      </div>
    </section>
  );
}
```
- Accessible name = visible text (no `aria-label` override), which fixes defects (a) and (d).
- The summary text ("Showing 3 of 3") is in the name, which is helpful. It is not a live region.
- The shell then does `const setAll = useSetAll()` for the toolbar, and `decorateRecords`/`toggleAllSections` DOM code is deleted.
- Add a visually-hidden `role="status"` line in the toolbar: "All sections expanded".

CSS essentials (all focus styles use NHS yellow + dark underline):
```css
.data-section__toggle { display:flex; width:100%; align-items:center; gap:.75rem;
  min-height:44px; padding:.75rem 1rem; text-align:left; font:inherit; font-weight:700;
  background:#f0f4f5; border:0; border-bottom:1px solid #d8dde0; color:#212b32; cursor:pointer; }
.data-section__toggle:focus-visible { outline:4px solid transparent; background:var(--ncrs-focus);
  box-shadow:0 -2px var(--ncrs-focus), 0 4px var(--ncrs-focus-text); }
.data-section__summary { margin-left:auto; font-weight:400; color:var(--ncrs-text-secondary); }
@media (forced-colors: active) { .data-section__toggle:focus-visible { outline:3px solid ButtonText; } }
```

### 3.5 `ExpandableRow` (replaces `AccordionItem`)
```tsx
import { ReactNode, useId, useState } from "react";

export function ExpandableRow({
  title, meta, trailing, children,
}: { title: string; meta?: ReactNode; trailing?: ReactNode; children: ReactNode }) {
  const [open, setOpen] = useState(false);
  const id = useId();
  return (
    <li className="record-row">
      <button type="button" className="record-row__button"
        aria-expanded={open} aria-controls={id} onClick={() => setOpen(!open)}>
        <span className="record-row__text">
          <strong>{title}</strong>
          {meta && <small>{meta}</small>}
        </span>
        {trailing}
        <span className="record-row__chevron" aria-hidden="true" />
      </button>
      <div id={id} hidden={!open} className="record-row__detail">{children}</div>
    </li>
  );
}
// Wrap rows in <ul className="record-rows"> for list semantics.
```
Usage from `App.tsx` (also shows the single-source data idea):
```tsx
<DataSection title="Pregnancy conditions" summary={`Showing ${conditions.length} of ${conditions.length} active`}
             footerLink={{ to: "/comorbidities", label: "View full condition history" }}>
  <ul className="record-rows">
    {conditions.map((c) => (
      <ExpandableRow key={c.id} title={c.name} meta={`${c.status} · ${c.source}`}>
        <DetailList rows={c.detailRows} />
      </ExpandableRow>
    ))}
  </ul>
</DataSection>
```

**Pick one drill-in rule and document it:**
- Inline `ExpandableRow` for ≤ ~8 fields of context (risks, conditions, medicines, results, events, social context).
- `DetailPanel` for whole-document or multi-section views (documents, safety flags, care team).
- Upcoming care and Care team currently use raw buttons with panels. Convert them to `ExpandableRow` or give them a visible "View" affordance.

### 3.6 `AlertBanner` (replaces `RiskBanner` visuals)
```tsx
type Level = "high" | "medium" | "low";
const cfg = {
  high:   { prefix: "High priority: ",   cls: "alert-banner--high" },
  medium: { prefix: "Medium priority: ", cls: "alert-banner--medium" },
  low:    { prefix: "Low priority: ",    cls: "alert-banner--low" },
} as const;

export function AlertBanner({ level, title, message, count }:
  { level: Level; title: string; message?: string; count?: number }) {
  const { prefix, cls } = cfg[level];
  return (
    <li className={`alert-banner ${cls}`}>
      <h3 className="alert-banner__title">
        <span className="nhsuk-u-visually-hidden">{prefix}</span>
        {title}{count ? ` (${count})` : ""}
      </h3>
      {message && <p className="alert-banner__message">{message}</p>}
    </li>
  );
}

export function AlertBannerGroup({ risks }: { risks: ReadonlyArray<{ level: Level; title: string; message?: string }> }) {
  if (!risks.length) return null;
  return (
    <section aria-labelledby="alerts-h" className="alert-group">
      <h2 id="alerts-h" className="nhsuk-u-visually-hidden">Clinical alerts</h2>
      <ul className="alert-banner-list">{/* high, medium, then low roll-up as now */}</ul>
    </section>
  );
}
```
- Keep the icon, and keep it `aria-hidden`. The hidden text carries the level.
- Style with NHS care-card/warning-callout colours (red `#d5281b`, amber/orange `#ed8b00`) and check contrast. Do not use `#fee2e2`/`#fef3c7` backgrounds with coloured text unless they pass 4.5:1.
- **Derive these from the same `data/patient.ts` `risks` array that feeds "Clinical risks and alerts" and the safety strip.** Add one `priority` field and filter, don't retype.

### 3.7 `SortSelect`
```tsx
import { useId } from "react";

export function SortSelect({ label, value, onChange, resultCount }:
  { label: string; value: string; onChange: (v: string) => void; resultCount: number }) {
  const id = useId();
  return (
    <div className="nhsuk-form-group sort-select">
      <label className="nhsuk-label nhsuk-label--s" htmlFor={id}>Sort {label}</label>
      <select className="nhsuk-select" id={id} value={value} onChange={(e) => onChange(e.target.value)}>
        <option value="date-desc">Newest first</option>
        <option value="date-asc">Oldest first</option>
        <option value="az">A to Z</option>
        <option value="za">Z to A</option>
      </select>
      <span role="status" className="nhsuk-u-visually-hidden">
        {resultCount} {label} sorted
      </span>
    </div>
  );
}
```
Store dates as ISO strings (`"2026-09-05"`) and format for display only. Replace `Date.parse("5 September 2026")` and the `medicineDates` lookup map.

### 3.8 `DetailPanel`: focus, naming, and back link
```tsx
import { ReactNode, useEffect, useRef } from "react";

export function DetailPanel({ title, eyebrow, status, tone = "blue", backLabel = "Back", content, onClose, isOpen }:
  DetailPanelProps & { backLabel?: string }) {
  const headingRef = useRef<HTMLHeadingElement>(null);

  useEffect(() => {
    if (!isOpen) return;
    headingRef.current?.focus();            // announce the new context
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && onClose();
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [isOpen, onClose]);

  if (!isOpen) return null;
  return (
    <section className="detail-panel" aria-labelledby="detail-panel-title">
      <button type="button" className="nhsuk-back-link__link detail-panel__back" onClick={onClose}>
        {backLabel}
      </button>
      <header className={`detail-panel-header tone-${tone}`}>
        {eyebrow && <p className="detail-panel-eyebrow">{eyebrow}</p>}
        <h2 id="detail-panel-title" tabIndex={-1} ref={headingRef}>{title}</h2>
        {status && <strong className="nhsuk-tag">{status}</strong>}
      </header>
      <div className="detail-panel-body">{content}</div>
    </section>
  );
}
```
- Visible text equals the accessible name. In the shell, pass `backLabel="Back to Summary"` (the current page title) so the destination is clear.
- Delete the unused `closeButton` ref and the shell's duplicate Escape handler, and keep the one in the panel.
- Move `DetailPanelContext`/`useDetailPanel` out of `MaternityShell.tsx` into `components/ui/DetailPanelProvider.tsx`.
- Add `title` prop to `DetailPanel` for `document.title` update (e.g. "Gestational diabetes — Leila Khan — NCRS").

### 3.9 `Dialog`, built on native `<dialog>`, for Reorder
```tsx
import { ReactNode, useEffect, useId, useRef } from "react";

export function Dialog({ open, title, onClose, children, footer }:
  { open: boolean; title: string; onClose: () => void; children: ReactNode; footer?: ReactNode }) {
  const ref = useRef<HTMLDialogElement>(null);
  const id = useId();
  useEffect(() => {
    const d = ref.current; if (!d) return;
    if (open && !d.open) d.showModal();     // focus trap, inert background, Esc, focus return
    if (!open && d.open) d.close();
  }, [open]);
  return (
    <dialog ref={ref} className="ncrs-dialog" aria-labelledby={id} onClose={onClose}
            onClick={(e) => e.target === ref.current && onClose()}>
      {open && (
        <div className="ncrs-dialog__inner">
          <h2 id={id}>{title}</h2>
          {children}
          {footer && <div className="ncrs-dialog__footer">{footer}</div>}
        </div>
      )}
    </dialog>
  );
}
```
Rendering children only while open resets state each time, which fixes the stale `useState(cards)` snapshot. Move the order into `Summary` (or a context) so Apply actually reorders the sections.

Reorder list tweaks:
- Announce moves: `<p role="status" className="nhsuk-u-visually-hidden">{moved} moved to position {i+1} of {n}</p>`.
- Re-focus the pressed button after state updates (`useEffect` + ref). When a row jumps to the top/bottom, focus the opposite button if the pressed one becomes disabled.
- Replace `style={{…}}` with `nhsuk-button--secondary` + a `.reorder-buttons` class. Make buttons 44×44.
- Persist the order in `localStorage`.

### 3.10 `DataTable` and `RecordTable`
```tsx
export function DataTable({ caption, head, children }: { caption: string; head: string[]; children: ReactNode }) {
  return (
    <div className="nhsuk-table-responsive">
      <table className="nhsuk-table-responsive">
        <caption className="nhsuk-table__caption nhsuk-u-visually-hidden">{caption}</caption>
        <thead className="nhsuk-table__head">
          <tr>{head.map((h) => <th scope="col" key={h}>{h}</th>)}</tr>
        </thead>
        <tbody className="nhsuk-table__body">{children}</tbody>
      </table>
    </div>
  );
}
```
Use it for Documents, Results, Audit and Appointments. Row action: a real `<a>`/`<button>` in the last cell with a visible "View" label plus visually-hidden row name. Do not make `<tr>` a button. Delete `decorateRecords` once every page uses the shared components.

### 3.11 Patient search: use the NHS form pattern
- Wrap each field in `nhsuk-form-group` with `nhsuk-label`, `nhsuk-hint`, `nhsuk-input`.
- On error, render `nhsuk-error-summary` (`role="alert"`, `tabIndex={-1}`, focus it on submit failure). Link each message to its field, and set `aria-invalid` + `aria-describedby` on the input.
- Replace `<span aria-label="required">*</span>` with the NHS convention: mark optional fields, or add "(required)" as text.
- Replace the NHS-number/Demographics toggle with NHS radios, or a proper tab/segmented control with `role="radiogroup"`.
- Replace the "Back" buttons with `<a class="nhsuk-back-link__link">` (or button styled as such).
- Access toast: use a persistent `nhsuk-notification-banner--success` with `role="status"` and a Dismiss button. No 4-second timeout.

---

## 4. Page-level fixes

1. **One `<h1>` per page.** In `MaternityShell`, change `<h1>Leila KHAN</h1>` to `<p className="record-patient-name">` (the banner already has `aria-label="Patient identity"`). Keep the `<h1>` for page titles, and create `<RecordPage title="Summary">` so every page gets it for free.
2. **Remove the duplicate chrome from `Results.tsx`** (header, patient bar, tabs, connected-systems footer if the shell should own it). Keep only the page body. Convert:
   - the filter "chips" → `<button aria-pressed>` group (or NHS radios);
   - `SectionCard` → `DataSection`;
   - div-tables → `DataTable`;
   - hex/Tailwind → NHS classes/tokens;
   - `<img alt="">` status icons → `ResultTag` (text carries meaning).
3. **Safety flags strip:** render as `<ul>` of buttons, give each a visible state suffix when relevant, and add `aria-haspopup="dialog"` only if it becomes a true modal. Since it replaces the page content as a panel, a plain button is correct.
4. **Navigation:** the `NavLink` tab bar is correct as `<nav>` with `aria-current="page"` (NavLink sets this). Do not convert it to `role="tablist"`.
5. **Prototype note:** keep "Demo prototype – fictional data", but move it into the footer landmark (`<footer>`) rather than a loose `<p>`.
6. **Reflow:** test at 320 px and 400% zoom. The safety strip, tab row and patient banner are the likely failures.
7. **Target size:** make row buttons and utilities ≥ 44 px high (WCAG 2.2 minimum is 24 px, and NHS guidance is higher).

---

## 5. Suggested order of work

1. `data/patient.ts` single source of truth, and `tokens.css` (rem type, contrast-safe colours).
2. Extract `DetailList`, `StatusTag`, `DataSection`, `DisclosureGroup`, `ExpandableRow` and rebuild **Summary** with them. Its look should not change much, but the semantics will.
3. Fix `DetailPanel` focus/naming and the single `<h1>`.
4. `Dialog` + working Reorder.
5. `DataTable`, then migrate Documents, Appointments, Pregnancy, Care plans, Comorbidities, Audit. Migrate `Results.tsx` first of those, since it has the status bug and the double chrome.
6. Delete `decorateRecords`, the `.specialist-detail-*` CSS and the now-unused custom classes from `index.css`.
7. Update `COMPONENT_LIBRARY.md` with props, keyboard map and "announces" for each component.

## 6. How to check each component
- Keyboard only: Tab order, Enter/Space toggles, Escape closes panel/dialog, focus returns to the trigger.
- Screen reader (NVDA + Firefox/Chrome, VoiceOver + Safari): headings list shows each section, buttons announce "expanded/collapsed", panel opens with heading read out.
- Voice control: say the visible label ("click Penicillin allergy"). It must work.
- axe DevTools / Lighthouse plus forced-colors and 200%/400% zoom.
- Optional later: `vitest` + `@testing-library/react` + `jest-axe` per component so the library stays accessible as it grows.
