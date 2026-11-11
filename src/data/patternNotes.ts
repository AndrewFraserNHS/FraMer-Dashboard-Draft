// Content for the pattern library page (src/pages/Patterns.tsx): where each component comes from,
// what we did for accessibility, and where we think there is risk or an open question.
// Keep this honest. A risk written down here is better than one found in review.

export type Origin = "nhs" | "adapted" | "custom";

export const originLabel: Record<Origin, string> = {
  nhs: "NHS design system",
  adapted: "NHS pattern, adapted",
  custom: "Our own",
};

export const originMeaning: Record<Origin, string> = {
  nhs: "Uses the NHS.UK frontend classes as published. Behaviour and styling follow the design system.",
  adapted: "Starts from an NHS pattern but we changed structure, behaviour or colour. Needs design system review.",
  custom: "No NHS equivalent. Built here with accessibility first. Needs user research and, ideally, a proposal back to the design system.",
};

export type Concern = {
  kind: "risk" | "question";
  /** mitigated: fixed in code (see mitigation). open: still needs a decision, research or sign-off. Questions are always open. */
  status?: "mitigated" | "open";
  /** What was done, and what is left */
  mitigation?: string;
  /** Risks only. high: could cause harm or block a user; medium: degrades use; low: polish or debt */
  level?: "high" | "medium" | "low";
  text: string;
};

export type PatternGroup = "Actions and forms" | "Messages and status" | "Showing record data" | "Revealing and overlays" | "Page structure and navigation";

export type PatternNote = {
  id: string;
  name: string;
  group: PatternGroup;
  origin: Origin;
  /** Files, relative to src/ */
  source: string;
  summary: string;
  accessibility: string[];
  concerns: Concern[];
};

export const patternGroups: readonly PatternGroup[] = [
  "Actions and forms",
  "Messages and status",
  "Showing record data",
  "Revealing and overlays",
  "Page structure and navigation",
];

export const patterns: readonly PatternNote[] = [
  // ---------------------------------------------------------------- Actions and forms
  {
    id: "button",
    name: "Button and ButtonLink",
    group: "Actions and forms",
    origin: "nhs",
    source: "components/ui/Button.tsx",
    summary: "Primary and secondary NHS buttons. ButtonLink is a link styled as a button, for actions that go to another page.",
    accessibility: [
      "Native button and anchor elements, so keyboard, focus and screen reader behaviour is the browser's.",
      "Defaults to type=\"button\", so a button inside a form never submits it by accident.",
      "One primary button per screen; everything else is secondary.",
    ],
    concerns: [
      { kind: "risk", level: "low", text: "The Search button uses the disabled attribute while searching. A disabled button leaves the tab order and can drop focus. aria-disabled would be kinder." },
    ],
  },
  {
    id: "form-field",
    name: "TextField, TextAreaField, SelectField",
    group: "Actions and forms",
    origin: "nhs",
    source: "components/ui/FormField.tsx",
    summary: "Every form control with a visible label, optional hint and optional error, sharing one wrapper so they cannot drift apart.",
    accessibility: [
      "Label is always visible and linked with for/id. No placeholder-only instructions: format examples are hint text.",
      "Hint and error are linked with aria-describedby, and the control gets aria-invalid when there is an error.",
      "Errors are text prefixed with a hidden \"Error:\", not colour alone, and sit above the control as the NHS pattern specifies.",
      "Optional fields say \"(optional)\" in the label, as NHS guidance asks. Required fields carry aria-required.",
      "DateField is three labelled number fields in a fieldset, with autocomplete tokens for dates of birth.",
      "Native select and date inputs keep platform keyboard and mobile behaviour.",
    ],
    concerns: [
      { kind: "question", text: "NHS guidance is to mark optional fields rather than required ones. We hide \"(required)\" for screen readers only, with nothing visible. What is the house style?" },
      { kind: "risk", level: "medium", text: "Legacy rules in index.css (for example the old record filter bar) still restyle selects. Sizes can differ between pages until that debt is removed." },
      { kind: "risk", level: "low", text: "Native date input is not consistent across browsers. NHS recommends three separate fields for a date of birth." },
    ],
  },
  {
    id: "error-summary",
    name: "ErrorSummary",
    group: "Actions and forms",
    origin: "nhs",
    source: "components/ui/ErrorSummary.tsx",
    summary: "A box at the top of a form that lists what to fix. Each item links to its field.",
    accessibility: [
      "Takes focus when it appears and has role=\"alert\", so screen reader users hear it straight away.",
      "Each message is a link to its field, and choosing it moves focus into the field.",
    ],
    concerns: [
      { kind: "risk", level: "medium", text: "The links use #hash hrefs. With client-side routing they scroll but may not move focus into the field. The NHS script does that; ours does not yet." },
      { kind: "risk", level: "low", text: "The heading id is fixed, so two summaries on one page would share an id." },
    ],
  },
  {
    id: "back-link",
    name: "BackLink",
    group: "Actions and forms",
    origin: "adapted",
    source: "components/ui/BackLink.tsx",
    summary: "Back in the find-a-patient flow.",
    accessibility: ["Visible text is the accessible name. The chevron is decorative."],
    concerns: [
      { kind: "question", text: "The NHS back link is an anchor to the previous URL. Ours is a button because the flow is state, not routes. If the flow gets URLs this should become a real link so browser Back works." },
    ],
  },
  {
    id: "question-page",
    name: "QuestionPage and RadioField",
    group: "Actions and forms",
    origin: "nhs",
    source: "components/ui/QuestionPage.tsx, FormField.tsx (RadioField, TextAreaQuestion)",
    summary: "The NHS question pages pattern: one question per page, the question as the page heading, a back link, Continue, and an error summary. Used for the step-by-step Comprehensive Geriatric Assessment (version 2).",
    accessibility: [
      "The question is the page h1: a fieldset legend for radios, a label for text. A screen reader announces it first, and focus moves to it when the step changes.",
      "Each step has its own document title and URL, so Back, reload and history work, and a step can be linked to.",
      "Radios follow NHS markup, with hints, errors and conditional reveals linked by aria-describedby and aria-controls.",
      "Errors appear in an error summary that takes focus, and again beside the field. Choosing an error moves focus to the field.",
      "Pre-filled answers are never accepted silently: the page shows what the record says and asks \"Is this correct?\", with change and remove options.",
      "Skip is a visible button, and an unanswered question is flagged on Check your answers, never hidden.",
    ],
    concerns: [
      { kind: "risk", level: "high", text: "69 pages for one assessment is a lot of clicks for a clinician who knows what they want to record. The single-page version stays available, but we have not measured the time cost." },
      { kind: "question", text: "Which questions are safe to skip? The Clinical Frailty Scale is marked mandatory (no skip, no remove) as a first guess; every other question can be skipped. A clinical lead should confirm the list." },
      { kind: "risk", level: "medium", text: "Answers live in sessionStorage in the browser, not on a server. Closing the tab ends the draft, and nothing is audited." },
      { kind: "question", text: "The NHS pattern puts a Check your answers page at the end. Should a clinician also be able to see a running summary while answering?" },
    ],
  },
  {
    id: "assessment-progress",
    name: "AssessmentProgress",
    group: "Actions and forms",
    origin: "custom",
    source: "components/ui/AssessmentProgress.tsx",
    summary: "Progress through a long assessment, split into its sections. One segment per section, filled by how much is done, with the current section marked.",
    accessibility: [
      "Never colour alone. A line of text says which section, which question, and how many are done overall.",
      "Each section has hidden text: \"Mental health, 2 of 6 done, current section\". The current section also has aria-current=\"step\".",
      "Sections are links, so a clinician can jump to one. Answers are kept.",
      "The bar is decorative and hidden from assistive technology, because the text says the same.",
      "On small screens only the current section's name is shown; the others stay available to screen readers.",
    ],
    concerns: [
      { kind: "question", text: "The NHS design system has no progress indicator. Is a segmented bar the right pattern, or a plain \"Question 3 of 69\"? Needs user research." },
      { kind: "risk", level: "low", text: "Eight narrow segments are small touch targets on a phone. The labels are hidden there, so the segments are the only way to jump between sections." },
      { kind: "risk", level: "low", text: "Sections do not all have the same number of questions, so segment widths suggest equal effort when they are not." },
    ],
  },
  {
    id: "summary-list",
    name: "SummaryList (check your answers)",
    group: "Showing record data",
    origin: "nhs",
    source: "components/ui/SummaryList.tsx",
    summary: "NHS summary list with a Change link on each row, for a check-your-answers page.",
    accessibility: [
      "Real dl, dt and dd. Each Change link's visible text is \"Change\", with the question as hidden text, so every link is unique out of context.",
      "Unanswered and skipped questions are tags with text, not just an empty row.",
    ],
    concerns: [
      { kind: "risk", level: "low", text: "69 rows on one page is long. Grouping by section helps, but the page has no way to collapse a section." },
    ],
  },
  {
    id: "toggle-group",
    name: "ToggleGroup",
    group: "Actions and forms",
    origin: "custom",
    source: "components/ui/ToggleGroup.tsx",
    summary: "A row of buttons where one is pressed. Used to filter results and to choose a search method.",
    accessibility: [
      "Real buttons in a labelled group, with aria-pressed carrying the state.",
      "An optional status message is announced politely after a change (\"Showing 4 of 12 results\").",
      "The selected state is not colour alone: the pressed button is filled and the count is text.",
    ],
    concerns: [
      { kind: "risk", level: "medium", text: "The component does not announce how many items are now shown. Results adds its own status message; any new use must do the same." },
      { kind: "question", text: "Is this a filter or a view switch? If it switches views, NHS tabs may be the better pattern." },
    ],
  },
  {
    id: "sort-select",
    name: "SortSelect",
    group: "Actions and forms",
    origin: "custom",
    source: "components/ui/SortSelect.tsx",
    summary: "A labelled select that re-sorts a list of rows.",
    accessibility: [
      "Visible label (\"Sort medicines\"), not just an icon.",
      "A polite live region announces the count and the new order after a change.",
    ],
    concerns: [
      { kind: "risk", level: "low", text: "Only date and A–Z orders exist. Clinicians may want sort by priority or by status." },
    ],
  },

  // ---------------------------------------------------------------- Messages and status
  {
    id: "status-tag",
    name: "StatusTag, PriorityTag, ResultTag, SourceTag",
    group: "Messages and status",
    origin: "nhs",
    source: "components/ui/StatusTag.tsx",
    summary: "NHS tags for status, priority, result and source.",
    accessibility: [
      "The text always states the status. Colour only reinforces it.",
      "NHS tag colours are published with passing contrast.",
    ],
    concerns: [
      { kind: "risk", level: "medium", text: "Borderline is orange in PriorityTag and ResultTag but yellow on the Results page. One status should have one colour; two near-identical oranges are hard to tell apart." },
      { kind: "risk", level: "low", text: "Tags use <strong>, which screen readers may emphasise. A span would be quieter." },
    ],
  },
  {
    id: "callout",
    name: "Callout",
    group: "Messages and status",
    origin: "adapted",
    source: "components/ui/Callout.tsx",
    summary: "One alert component for clinical risks, warnings, information and notes. Red, amber, blue and grey.",
    accessibility: [
      "White surface with dark text (about 15:1), not a pastel fill. This replaced pastel fills that failed contrast review.",
      "Icon chip and left bar are at least 3:1 against white (WCAG 1.4.11). Amber uses NHS warning yellow with a dark symbol, 11:1.",
      "Tone is stated in text: a hidden \"Important:\" or \"Warning:\" prefix, or a visible \"High priority:\" label.",
      "Red callouts add a full red border so urgency is visible without relying on the fill.",
    ],
    concerns: [
      { kind: "question", text: "The NHS warning callout is yellow with a heading label. Red \"high priority\" has no NHS equivalent. Do we propose one, or keep red as our extension?" },
      { kind: "risk", level: "medium", text: "Contrast figures were worked out by hand, not with a tool. They need checking in an automated audit." },
      { kind: "risk", level: "low", text: "Callouts have no role. That is right for static content, but a callout that appears after an action would need role=\"status\"." },
    ],
  },
  {
    id: "alerts-band",
    name: "AlertsBand (safety flags)",
    group: "Messages and status",
    origin: "custom",
    source: "components/shell/AlertsBand.tsx",
    summary: "Collapsible band under the patient name listing safety flags. Open by default so none is missed.",
    accessibility: [
      "Toggle is a button with aria-expanded and aria-controls.",
      "Severity is text (\"High priority\"), not colour.",
      "Always open on arrival at every screen size, and the choice is never remembered.",
      "When collapsed it still names every high-priority flag and says how many others are hidden.",
      "Each flag is a button with a chevron that opens its detail, so it reads as an action, not a link.",
    ],
    concerns: [
      { kind: "risk", level: "high", text: "On screens under 900px the band starts collapsed. Medium and low flags are then hidden until opened. This is a patient safety decision, not a layout one. It needs clinical safety sign-off." },
      { kind: "risk", level: "medium", text: "The open or closed choice is kept in sessionStorage, so a flag could stay hidden for the rest of a session." },
      { kind: "question", text: "Should flags be able to be collapsed at all? Real record systems often pin them." },
    ],
  },

  // ---------------------------------------------------------------- Showing record data
  {
    id: "data-table",
    name: "DataTable",
    group: "Showing record data",
    origin: "adapted",
    source: "components/ui/DataTable.tsx",
    summary: "NHS-style table with optional sorting and an optional per-row view button.",
    accessibility: [
      "Caption describes the table; headers use scope=\"col\".",
      "Sortable headers are real buttons and the column carries aria-sort. A change is announced politely.",
      "On narrow screens rows stack with each cell showing its column name, and a labelled select replaces the sort buttons. Explicit table roles keep the semantics.",
      "The scroll wrapper is keyboard focusable so wide tables can be read without a mouse.",
      "Rows are never buttons. The view action is a button in its own cell.",
      "Empty values always sort last.",
    ],
    concerns: [
      { kind: "risk", level: "high", text: "At 390px wide, tables such as Imaging (six columns) scroll sideways. The NHS responsive table (stacked rows with headers repeated) is not used yet." },
      { kind: "risk", level: "medium", text: "Sorting changes the order but does not announce it. SortSelect does; the table headers do not." },
      { kind: "question", text: "Sorting by date uses Date.parse on display strings. Should rows carry real ISO dates instead?" },
    ],
  },
  {
    id: "detail-list",
    name: "DetailList and FactsGrid",
    group: "Showing record data",
    origin: "adapted",
    source: "components/ui/DetailList.tsx",
    summary: "Label and value pairs as a description list. FactsGrid is the compact multi-column version.",
    accessibility: [
      "Real dl, dt and dd, so the relationship between label and value is exposed.",
      "A missing value is shown as \"Not supplied by source\" rather than left blank.",
    ],
    concerns: [
      { kind: "question", text: "Is \"Not supplied by source\" the right words for a clinician? A blank could be read as \"none\", which is why we chose to be explicit, but the wording has not been tested." },
      { kind: "risk", level: "low", text: "The NHS summary list has an actions column. We do not use it yet." },
    ],
  },
  {
    id: "key-figure",
    name: "KeyFigure",
    group: "Showing record data",
    origin: "custom",
    source: "components/ui/KeyFigure.tsx",
    summary: "One measurement or score shown large. Used for vitals and the Clinical Frailty Scale.",
    accessibility: [
      "Trend is an icon plus words (\"Rising. Lost 3 kg\"), never colour alone.",
      "Opening more detail is a real button in the footer (\"View details for Weight\"), never the whole figure, so buttons never nest.",
      "Red is used only when the trend is flagged as a concern. Rising or falling alone is neutral.",
      "Values keep their units as text.",
    ],
    concerns: [
      { kind: "risk", level: "medium", text: "Trend colours (rising red, falling red) say \"worse\" for some measures and not others. Direction is not the same as good or bad, and the component does not know which." },
      { kind: "question", text: "Should out-of-range values carry a reference range and a status tag, as in Results?" },
    ],
  },
  {
    id: "provenance-tag",
    name: "ProvenanceTag",
    group: "Showing record data",
    origin: "custom",
    source: "components/ui/ProvenanceTag.tsx",
    summary: "A source tag you open to see the organisation, system, date pulled and author of a piece of data.",
    accessibility: [
      "Opens on click or Enter, never on hover alone (WCAG 1.4.13).",
      "Native Popover API: Escape closes, clicking outside closes, focus returns to the tag.",
      "aria-expanded and aria-controls on the tag.",
      "Renders in the top layer, so a scrolling table cannot clip it.",
    ],
    concerns: [
      { kind: "risk", level: "medium", text: "The Popover API needs Chrome 114, Safari 17 or Firefox 125. NHS estates often run older browsers. There is no fallback." },
      { kind: "risk", level: "low", text: "Placement is calculated in JavaScript and may be wrong if the page scrolls while open." },
      { kind: "question", text: "Provenance is the main trust signal for merged records. Which fields do clinicians need first? We have guessed." },
    ],
  },
  {
    id: "review-field",
    name: "ReviewField and ReviewPrompt",
    group: "Showing record data",
    origin: "custom",
    source: "components/ui/ReviewField.tsx",
    summary: "Pre-populated assessment items to accept, edit or reject, and suggestions to confirm or dismiss.",
    accessibility: [
      "The item title is the control's label. Hint text is visible, not placeholder-only.",
      "Reject and dismiss are reversible, and focus moves to Undo so nothing disappears silently.",
      "Status (\"Pending review\", \"Accepted\") is text in a tag.",
      "A pending pre-filled item says in words that it is not checked yet, and that notice is read with the Accept button. There is no accept-all.",
      "Decisions are kept for the session, so a reload does not lose them.",
      "Accept, Edit and Reject are separate buttons, never a swipe or a hidden gesture.",
    ],
    concerns: [
      { kind: "risk", level: "high", text: "Pre-filled answers invite automation bias: accepting without reading. There is deliberately no \"accept all\", but the risk needs clinical safety review." },
      { kind: "question", text: "Who is recorded as the author of an accepted item: the source system, or the clinician who accepted it? There is no audit trail in this prototype." },
      { kind: "risk", level: "medium", text: "Status is held in page state and is lost on reload." },
    ],
  },
  {
    id: "record-card-list",
    name: "RecordCardList and RecordCard",
    group: "Showing record data",
    origin: "custom",
    source: "components/ui/RecordCardList.tsx",
    summary: "Read-only record summaries with an optional status tag.",
    accessibility: ["A real list. Status is text in a tag.", "Not interactive, so there are no hidden controls."],
    concerns: [
      { kind: "question", text: "Overlaps with DataTable and ExpandableRow. Do we need three ways to show a list of records?" },
    ],
  },
  {
    id: "connected-systems",
    name: "ConnectedSystems",
    group: "Showing record data",
    origin: "custom",
    source: "components/ui/ConnectedSystems.tsx",
    summary: "The systems feeding this record and when each last updated.",
    accessibility: ["Status is text (\"Connected\", \"Partially connected\"), not colour. A partial system states what is missing.", "Built on DataSection, so it is a heading with an expandable region."],
    concerns: [
      { kind: "risk", level: "medium", text: "\"Partially connected\" does not say what is missing. A clinician cannot tell whether the gap matters." },
    ],
  },

  // ---------------------------------------------------------------- Revealing and overlays
  {
    id: "data-section",
    name: "DataSection",
    group: "Revealing and overlays",
    origin: "adapted",
    source: "components/ui/DataSection.tsx",
    summary: "A collapsible section with a real heading. Based on the NHS expander, built as an accordion heading.",
    accessibility: [
      "heading > button[aria-expanded][aria-controls], the WAI-ARIA accordion pattern, so users can move by heading.",
      "The button name is the title. Status and count are shown and read as its description (aria-describedby).",
      "Nested headings take their level from the enclosing section, so the outline never skips.",
      "Responds to Expand all through shared state, not by clicking elements.",
    ],
    concerns: [
      { kind: "risk", level: "medium", text: "Title, summary and badge are read together as one long name. Cards with several badges become tiring to listen to." },
      { kind: "risk", level: "medium", text: "The Expand all button changes its label from its own state. If sections are opened one by one, the label can be wrong." },
      { kind: "question", text: "Most sections start closed. Should clinically important ones always start open?" },
    ],
  },
  {
    id: "expandable-row",
    name: "ExpandableRow and RowChevron",
    group: "Revealing and overlays",
    origin: "custom",
    source: "components/ui/ExpandableRow.tsx, RowChevron.tsx",
    summary: "A list row that expands in place, shown with a plus that becomes a minus. Rows that open a modal or page use a chevron instead, so the two behaviours look different.",
    accessibility: [
      "Button with aria-expanded; the visible text is the name (WCAG 2.5.3).",
      "The icon changes shape, so state is not shown by colour or rotation alone.",
      "The chevron is decorative and hidden from assistive technology.",
    ],
    concerns: [
      { kind: "question", text: "Plus and minus are our extension. The NHS expander uses a text summary and arrow. Is the difference between \"expands here\" and \"opens elsewhere\" clear to users? It has not been tested." },
      { kind: "risk", level: "low", text: "The whole row is one large button containing tags. Screen readers read all of it as one name." },
    ],
  },
  {
    id: "dialog",
    name: "Dialog",
    group: "Revealing and overlays",
    origin: "adapted",
    source: "components/ui/Dialog.tsx",
    summary: "Modal dialog on the native dialog element.",
    accessibility: [
      "The browser provides the focus trap, inert background, Escape to close and focus return.",
      "Labelled by its heading. Content is mounted only while open, so state resets each time.",
    ],
    concerns: [
      { kind: "risk", level: "medium", text: "Clicking the backdrop closes the dialog. If a dialog ever holds a form, that would discard input." },
      { kind: "question", text: "The NHS design system has no modal pattern and discourages them. Is a dialog right for vitals history, or should it be a page?" },
    ],
  },
  {
    id: "drawer",
    name: "Drawer",
    group: "Revealing and overlays",
    origin: "custom",
    source: "components/ui/Drawer.tsx",
    summary: "A side sheet on the native dialog element. The narrow-screen menu.",
    accessibility: [
      "Same native behaviour as Dialog: focus trap, Escape, focus return.",
      "Find patient is the first item.",
      "Close is a text button with an icon, not an icon alone.",
      "Stays mounted so open menus and text size are kept between openings.",
    ],
    concerns: [
      { kind: "risk", level: "medium", text: "Collapsing the whole header into a drawer on mobile puts patient search two taps away. For a tool used constantly, that cost has not been measured." },
      { kind: "question", text: "The NHS header uses a Menu button that reveals links in place. Would that be better than a modal sheet?" },
    ],
  },
  {
    id: "reorder-dialog",
    name: "ReorderDialog",
    group: "Revealing and overlays",
    origin: "custom",
    source: "components/ui/ReorderDialog.tsx",
    summary: "Reorder a list of sections with up and down buttons in a dialog.",
    accessibility: [
      "Buttons instead of drag and drop, which meets WCAG 2.5.7 (dragging movements).",
      "Focus stays on the button that was pressed. Each move is announced (\"moved to position 2 of 8\").",
      "Buttons are 44px square, with the item name in their label.",
      "The order is saved, so it is there next visit.",
    ],
    concerns: [
      { kind: "risk", level: "low", text: "The order is kept in memory and resets on reload. Clinicians would expect it to be remembered." },
      { kind: "question", text: "Should clinically important sections be lockable so they cannot be pushed to the bottom?" },
    ],
  },
  {
    id: "menu-button",
    name: "MenuButton",
    group: "Revealing and overlays",
    origin: "custom",
    source: "components/shell/MenuButton.tsx",
    summary: "A button that reveals a list of actions. Used for the patient picker, the record view and the account.",
    accessibility: [
      "Disclosure pattern (aria-expanded), not role=\"menu\", so every action stays an ordinary button in the tab order.",
      "Escape closes it and returns focus. Arrow keys, Home and End move between items.",
      "The current item is marked in text and with aria-current. Unavailable items stay focusable with aria-disabled so their reason can be read.",
    ],
    concerns: [
      { kind: "risk", level: "high", text: "The patient picker switches patient in one click, with no confirmation or identity check. In a real system that is a wrong-patient risk. It exists for the demo only." },
      { kind: "risk", level: "low", text: "Home and End keys do not move to the first and last item." },
      { kind: "question", text: "Not tested with real screen readers yet, only inspected." },
    ],
  },

  // ---------------------------------------------------------------- Page structure and navigation
  {
    id: "service-header",
    name: "ServiceHeader and PatientBar",
    group: "Page structure and navigation",
    origin: "adapted",
    source: "components/shell/ServiceHeader.tsx, PatientBar.tsx",
    summary: "The NHS blue bar and the patient identity row. On narrow screens only these remain and everything else moves to the Drawer.",
    accessibility: [
      "Patient bar is a labelled region. Age, date of birth and NHS number are real description list items.",
      "On mobile the title shows \"NCRS\" visually, and screen readers still hear \"National Care Records Service\".",
      "The Menu button reports aria-expanded.",
    ],
    concerns: [
      { kind: "risk", level: "medium", text: "Address, GP and next of kin are behind \"Patient details\" (and in the Drawer on mobile). Name, date of birth and NHS number stay visible, but the patient identification standard needs checking." },
      { kind: "question", text: "Is NCRS an abbreviation clinicians recognise? It is not expanded visually on mobile." },
    ],
  },
  {
    id: "options-sidebar",
    name: "OptionsSidebar and PageOptions",
    group: "Page structure and navigation",
    origin: "custom",
    source: "components/shell/OptionsSidebar.tsx",
    summary: "Text size and page tools (expand all, reorder, filters). A collapsible rail on wide screens; inside the Drawer on narrow ones.",
    accessibility: [
      "Collapse toggle has aria-expanded and aria-controls; the rail's button gets a label when collapsed.",
      "Text size is a radio group in a fieldset.",
    ],
    concerns: [
      { kind: "question", text: "Browser zoom and text size settings already exist. Does a custom text size control help, or does it fight with them?" },
      { kind: "risk", level: "low", text: "Text size is not remembered between visits." },
    ],
  },
  {
    id: "record-page",
    name: "RecordPage, Subsection, RecordFilterBar",
    group: "Page structure and navigation",
    origin: "adapted",
    source: "components/ui/RecordPage.tsx, Subsection.tsx, components/shell/RecordFilterBar.tsx",
    summary: "The standard page layout: one h1, stacked sections, connected systems, and a prototype note.",
    accessibility: [
      "One h1 per page. Subsections use real h3 or h4 headings, so the outline is navigable.",
      "Filter bar is a labelled region of labelled selects.",
      "Skip link and focus moves to the main content on a view change.",
    ],
    concerns: [
      { kind: "risk", level: "low", text: "Subsection levels are set by hand. A DataSection at level 3 followed by a level 3 Subsection would skip the outline." },
      { kind: "risk", level: "low", text: "The filter bar controls are not wired up. They look like they filter but do nothing in the prototype." },
    ],
  },
];

/** Concerns that belong to the whole prototype rather than one component. */
export const systemConcerns: readonly (Concern & { area: string })[] = [
  { area: "Testing", kind: "risk", level: "high", text: "No automated accessibility checks run (for example axe in CI). Everything on this page was checked by hand and by reading the code, not with assistive technology." },
  { area: "Testing", kind: "question", text: "No testing with disabled users or with clinicians. Which scenarios and which assistive technology should come first?" },
  { area: "Styles", kind: "risk", level: "medium", text: "index.css is about 5,500 lines with layers of older rules, !important, and selectors that fight each other. New components work around it with higher-specificity overrides. It should be replaced, not extended." },
  { area: "Styles", kind: "risk", level: "medium", text: "Colours are hard-coded hex values in many places, not tokens. A change of palette means a search and replace." },
  { area: "Browser support", kind: "risk", level: "medium", text: "Native dialog and the Popover API need current browsers. The NHS supports older ones." },
  { area: "Forced colours", kind: "risk", level: "low", text: "High contrast mode is only partly handled. Icon chips and the callout bar may disappear." },
  { area: "Data", kind: "risk", level: "low", text: "All data is fictional and its dates shift every day through the scenario clock, so screenshots and examples will not match tomorrow." },
  { area: "Clinical safety", kind: "question", text: "None of this has been through clinical safety review (DCB0129 and DCB0160). Several items above are flagged for it." },
  { area: "Design system", kind: "question", text: "Where we have extended the NHS system, do we propose the extension back to it, or keep it local and document the difference?" },
];

// Applied once at load: which concerns have been fixed in code, and how.
const mitigations: Record<string, string> = {
  "The Search button uses the disabled": "Button now uses aria-disabled and ignores clicks, so focus stays on it.",
  "NHS guidance is to mark optional": "Now follows NHS guidance: optional fields say (optional), required ones use aria-required. Confirm the house style with the design team.",
  "Native date input is not consistent": "DateField (day, month, year) now used for date of birth.",
  "The links use #hash hrefs": "Choosing a message now moves focus into the field.",
  "The heading id is fixed": "Uses a generated id.",
  "The component does not announce how many items": "ToggleGroup takes a status message that is announced politely. Results and the frailty snapshot use it.",
  "Borderline is orange in PriorityTag": "One meaningTone map now gives every state one colour. Borderline and medium priority are orange everywhere. Tags are span elements.",
  "Contrast figures were worked out by hand": "axe-core now runs in development on every page and change, and from the console. Manual contrast checking is still advised.",
  "Callouts have no role": "A live prop adds role=status for callouts that appear after an action.",
  "On screens under 900px the band starts collapsed": "Always open on arrival at every size, and says how many flags are hidden when collapsed. Still needs clinical safety sign-off.",
  "The open or closed choice is kept in sessionStorage": "No longer remembered, so it cannot hide a flag on a later patient or visit.",
  "At 390px wide, tables such as Imaging": "Rows stack with each cell showing its column name below 640px, with a sort select. Explicit table roles keep the semantics.",
  "Sorting changes the order but does not announce": "Corrected: sorting already announced. The earlier note was wrong.",
  "Trend colours (rising red": "KeyFigure takes a concern flag. Red is used only for worrying trends; direction alone is neutral.",
  "The Popover API needs Chrome 114": "Falls back to a plain disclosure (details element) where the Popover API is missing.",
  "Placement is calculated in JavaScript": "Repositions on scroll and resize while open.",
  "Pre-filled answers invite automation bias": "A pending pre-filled item now says it is not checked and the notice is read with Accept. There is still no accept-all. Residual risk stays with clinical safety review.",
  "Status is held in page state": "Review decisions are kept for the session.",
  "does not say what is missing": "ConnectedSystem has a gap field that states what is missing. Required for partial systems.",
  "Title, summary and badge are read together": "Name is now the title only. Status and count are the button description.",
  "The Expand all button changes its label": "Replaced with two fixed buttons, Expand all and Collapse all, and a status announcement.",
  "Clicking the backdrop closes the dialog": "closeOnBackdrop prop. The patient switch dialog turns it off.",
  "Collapsing the whole header into a drawer": "Find patient is the first item in the drawer. Measure the cost in user testing.",
  "The order is kept in memory": "Saved in localStorage and ignored if it no longer matches the sections.",
  "The patient picker switches patient in one click": "Switching now asks for confirmation showing name, date of birth and NHS number, and offers Stay. It remains a demo-only control.",
  "Home and End keys": "Home and End now move to the first and last item.",
  "Text size is not remembered": "Saved in localStorage.",
  "Subsection levels are set by hand": "Subsections now take their heading level from the enclosing DataSection.",
  "The filter bar controls are not wired up": "The bar now says in text that the filters are not connected in this prototype.",
  "No automated accessibility checks run": "axe-core runs in development on every page and change, and from the console (window.runAxe). Manual testing with assistive technology is still needed.",
  "Colours are hard-coded hex values": "Palette tokens (--ncrs-*) now cover everything added in these rounds. Older rules still use literals.",
  "Native dialog and the Popover API need current": "Popover has a fallback. Native dialog is supported in all current browsers.",
  "High contrast mode is only partly handled": "A forced-colors block now keeps borders and chips visible. Needs checking in Windows high contrast."
};

function annotate(concern: Concern): void {
  if (concern.kind === "question") {
    concern.status = "open";
    return;
  }
  const key = Object.keys(mitigations).find((candidate) => concern.text.includes(candidate));
  concern.status = key ? "mitigated" : "open";
  if (key) concern.mitigation = mitigations[key];
}

patterns.forEach((pattern) => pattern.concerns.forEach(annotate));
systemConcerns.forEach(annotate);
