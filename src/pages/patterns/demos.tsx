import { ReactNode, useState } from "react";
import { AlertsBand } from "../../components/shell/AlertsBand";
import { MenuButton } from "../../components/shell/MenuButton";
import { PatientBar } from "../../components/shell/PatientBar";
import { RecordFilterBar } from "../../components/shell/RecordFilterBar";
import { OptionsSidebar, PageOptions, TextSize } from "../../components/shell/OptionsSidebar";
import { AssessmentProgress } from "../../components/ui/AssessmentProgress";
import { RadioField } from "../../components/ui/FormField";
import { SummaryList } from "../../components/ui/SummaryList";
import { BackLink } from "../../components/ui/BackLink";
import { Button, ButtonLink } from "../../components/ui/Button";
import { Callout } from "../../components/ui/Callout";
import { ConnectedSystems } from "../../components/ui/ConnectedSystems";
import { DataSection } from "../../components/ui/DataSection";
import { DataTable } from "../../components/ui/DataTable";
import { DetailList, FactsGrid } from "../../components/ui/DetailList";
import { InlinePanel } from "../../components/ui/InlinePanel";
import { ErrorSummary } from "../../components/ui/ErrorSummary";
import { ExpandableRow } from "../../components/ui/ExpandableRow";
import { DateField, DateParts, emptyDate, SelectField, TextAreaField, TextField } from "../../components/ui/FormField";
import { KeyFigure } from "../../components/ui/KeyFigure";
import { ProvenanceTag } from "../../components/ui/ProvenanceTag";
import { RecordCard, RecordCardList } from "../../components/ui/RecordCardList";
import { ReorderPanel } from "../../components/ui/ReorderPanel";
import { PromptStatus, ReviewField, ReviewPrompt, ReviewStatus } from "../../components/ui/ReviewField";
import { RowChevron } from "../../components/ui/RowChevron";
import { SortSelect, SortValue } from "../../components/ui/SortSelect";
import { PriorityTag, ResultTag, SourceTag, StatusTag } from "../../components/ui/StatusTag";
import { Subsection } from "../../components/ui/Subsection";
import { ToggleGroup } from "../../components/ui/ToggleGroup";
import { formatDate } from "../../data/patient";
import { connectedSystems } from "../../data/systems";
import { recordViews } from "../../views";

const stack = (children: ReactNode) => <div className="pl-stack">{children}</div>;
const row = (children: ReactNode) => <div className="pl-row">{children}</div>;

function ErrorSummaryDemo() {
  const [shown, setShown] = useState(false);
  return stack(
    <>
      <Button variant="secondary" onClick={() => setShown((value) => !value)}>
        {shown ? "Hide the error summary" : "Show the error summary"}
      </Button>
      <ErrorSummary items={shown ? [{ text: "Enter an NHS number", fieldId: "pl-es-nhs" }] : []} />
      <TextField id="pl-es-nhs" label="NHS number" hint="For example, 485 777 2910" error={shown ? "Enter an NHS number" : undefined} />
    </>,
  );
}

function DateDemo() {
  const [value, setValue] = useState<DateParts>(emptyDate);
  return <DateField id="pl-dob" legend="Date of birth" value={value} onChange={setValue} />;
}

function ToggleDemo() {
  const [value, setValue] = useState<"all" | "attention">("all");
  return (
    <ToggleGroup
      label="Show results"
      value={value}
      onChange={setValue}
      status={value === "all" ? "Showing all results" : "Showing abnormal and borderline results"}
      options={[
        { value: "all", label: "All results" },
        { value: "attention", label: "Abnormal and borderline", count: 4 },
      ]}
    />
  );
}

function SortDemo() {
  const [sort, setSort] = useState<SortValue>("date-desc");
  return <SortSelect label="medicines" value={sort} onChange={setSort} count={3} />;
}

function ReviewDemo() {
  const [field, setField] = useState<ReviewStatus>("pending");
  const [prompt, setPrompt] = useState<PromptStatus>("pending");
  return stack(
    <>
      <ReviewField
        title="Falls history"
        hint="Pre-filled from the acute record. Check it before you accept."
        status={field}
        onStatus={setField}
        prefill="4 falls in the last 3 months. Most recent: ED attendance, no fracture."
        editable
        risk
        source={<SourceTag>Acute trust</SourceTag>}
      />
      <ul className="plain-list">
        <ReviewPrompt text="Consider a referral to the falls service." status={prompt} onStatus={setPrompt} />
      </ul>
    </>,
  );
}

function InlinePanelDemo() {
  const [open, setOpen] = useState(false);
  return (
    <>
      <Button variant="secondary" aria-expanded={open} onClick={() => setOpen((value) => !value)}>
        {open ? "Hide the history" : "Show the history"}
      </Button>
      <InlinePanel
        open={open}
        title="Blood pressure: history"
        footer={<Button variant="secondary" onClick={() => setOpen(false)}>Close</Button>}
      >
        <p>The history appears in the page flow. There is no overlay or focus trap.</p>
      </InlinePanel>
    </>
  );
}

function ReorderDemo() {
  const [open, setOpen] = useState(false);
  const [order, setOrder] = useState(["Clinical risks", "Conditions", "Medicines"]);
  return stack(
    <>
      <Button variant="secondary" onClick={() => setOpen(true)}>Reorder sections</Button>
      <p className="pl-note">Current order: {order.join(", ")}</p>
      <ReorderPanel open={open} title="Reorder sections" description="Use the arrow buttons to change the order." items={order} onApply={setOrder} onClose={() => setOpen(false)} />
    </>,
  );
}

function SidebarDemo() {
  const [open, setOpen] = useState(true);
  const [size, setSize] = useState<TextSize>("small");
  return (
    <div className="pl-sidebar-frame">
      <OptionsSidebar open={open} onOpenChange={setOpen} textSize={size} onTextSize={setSize} filtersOpen={false} onToggleFilters={() => {}} onReorder={() => {}} />
    </div>
  );
}

const alertFlags = [
  { id: "gd", label: "Gestational diabetes", level: "high" as const, onOpen: () => {} },
  { id: "pen", label: "Penicillin allergy", level: "high" as const, onOpen: () => {} },
  { id: "bmi", label: "High body mass index (32)", level: "medium" as const, onOpen: () => {} },
  { id: "follow-up", label: "Routine follow-up due", level: "low" as const, onOpen: () => {} },
];

const tableRows = [
  { name: "Metformin", dose: "500mg", started: formatDate("2026-09-12") },
  { name: "Prenatal vitamins", dose: "Standard", started: formatDate("2026-08-15") },
  { name: "Sertraline", dose: "50mg", started: formatDate("2022-01-01") },
];

function QuestionDemo() {
  const [value, setValue] = useState("");
  return (
    <RadioField
      name="pl-q"
      legend="Clinical Frailty Scale: is this correct? (on a real page this is the h1)"
      hint="The record says: 6, Moderately frail"
      value={value}
      onChange={setValue}
      options={[
        { value: "yes", label: "Yes, this is correct" },
        { value: "change", label: "No, I want to change it", reveal: <p className="pl-note">A text box or choices appear here.</p> },
        { value: "remove", label: "This does not apply, remove it" },
      ]}
    />
  );
}

/** Live examples, keyed by pattern id (src/data/patternNotes.ts). */
export const demos: Record<string, ReactNode> = {
  "question-page": <QuestionDemo />,
  "assessment-progress": (
          <AssessmentProgress
        currentId="mental"
        questionInSection={2}
        questionOverall={37}
        totalQuestions={69}
        sections={[
          { id: "physical", title: "Physical", done: 32, total: 32, to: "#" },
          { id: "mental", title: "Mental health", done: 1, total: 6, to: "#" },
          { id: "social", title: "Social", done: 0, total: 5, to: "#" },
          { id: "environment", title: "Environment", done: 0, total: 4, to: "#" },
        ]}
      />
  ),
  "summary-list": (
          <SummaryList
        rows={[
          { key: "a", label: "Clinical Frailty Scale", value: "Confirmed as correct: 6", changeTo: "#" },
          { key: "b", label: "Falls history", value: <StatusTag tone="orange">Not answered</StatusTag>, changeTo: "#" },
        ]}
      />
  ),
  button: row(
    <>
      <Button>Primary</Button>
      <Button variant="secondary">Secondary</Button>
      <ButtonLink to="/" variant="secondary">Link to the record</ButtonLink>
    </>,
  ),
  "form-field": stack(
    <>
      <TextField label="Full name" hint="For example, Leila Khan" />
      <SelectField label="Care setting" options={["All care settings", "Community maternity", "Outpatient"]} />
      <TextAreaField label="Action details" rows={2} optional />
      <DateDemo />
      <TextField label="NHS number" hint="For example, 485 777 2910" error="Enter an NHS number" />
    </>,
  ),
  "error-summary": <ErrorSummaryDemo />,
  "back-link": <BackLink onClick={() => {}}>Back to search</BackLink>,
  "toggle-group": <ToggleDemo />,
  "sort-select": <SortDemo />,
  "status-tag": stack(
    <>
      {row(<><PriorityTag level="high" /><PriorityTag level="medium" /><PriorityTag level="low" /></>)}
      {row(<><ResultTag tone="high">Abnormal</ResultTag><ResultTag tone="medium">Borderline</ResultTag><ResultTag tone="low">Normal</ResultTag></>)}
      {row(<><StatusTag tone="blue">Referred</StatusTag><StatusTag tone="grey">Declined</StatusTag><SourceTag>GP record</SourceTag></>)}
    </>,
  ),
  callout: stack(
    <>
      <Callout tone="red" title="Gestational diabetes" label="High priority: " source="Lab results">Diagnosed {formatDate("2026-09-05")}</Callout>
      <Callout tone="amber" title="High body mass index (32)" label="Medium priority: ">BMI 32 requires monitoring</Callout>
      <Callout tone="blue" title="Recommended action">Offer an early glucose test.</Callout>
      <Callout tone="grey" title="Clinical note">Interpreter booked for the next visit.</Callout>
    </>,
  ),
  "alerts-band": <AlertsBand flags={alertFlags} />,
  "data-table": (
    <DataTable
      caption="Medicines"
      rows={tableRows}
      rowKey={(r) => r.name}
      columns={[
        { header: "Medicine", cell: (r) => <strong>{r.name}</strong>, sort: (r) => r.name },
        { header: "Dose", cell: (r) => r.dose },
        { header: "Started", cell: (r) => r.started, sort: (r) => Date.parse(r.started) },
      ]}
      defaultSort={{ header: "Medicine", direction: "ascending" }}
    />
  ),
  "detail-list": stack(
    <>
      <DetailList rows={[["Medicine", "Metformin"], ["Dose", "500mg"], ["Prescriber", undefined]]} />
      <FactsGrid facts={[["Date", formatDate("2026-09-05")], ["Centre", "Antenatal Clinic"], ["Findings", undefined]]} />
    </>,
  ),
  "key-figure": row(
    <>
      <KeyFigure label="Blood pressure" value="148/90" unit="mmHg" trend="up" note="Up from 136/82 a year ago">
        <SourceTag>District nurse</SourceTag>
      </KeyFigure>
      <KeyFigure label="Weight" value="54" unit="kg" trend="down" note="Lost about 3 kg over 6 months" onOpen={() => {}} openLabel="View history" />
      <KeyFigure label="Clinical Frailty Scale" value="6" size="large" note="Moderately frail" />
    </>,
  ),
  "provenance-tag": row(
    <>
      <ProvenanceTag label="GP" tone="blue" details={[["Organisation", "Woodside Health Centre"], ["System", "EMIS GP"], ["Pulled", "2 days ago"], ["By", "Dr Patel"]]} />
      <ProvenanceTag label="Acute" tone="orange" details={[["Organisation", "Croydon University Hospital"], ["System", "Oracle Health"]]} />
    </>,
  ),
  "review-field": <ReviewDemo />,
  "record-card-list": (
    <RecordCardList>
      <RecordCard heading="Diabetes Antenatal Clinic" status={<StatusTag tone="green">Referral reviewed</StatusTag>} meta={formatDate("2026-09-12")}>
        Gestational diabetes confirmed. Management plan agreed.
      </RecordCard>
      <RecordCard heading="Gestational diabetes mellitus (O24.4)" meta="Active" />
    </RecordCardList>
  ),
  "connected-systems": <ConnectedSystems systems={connectedSystems.slice(0, 4)} defaultOpen headingLevel={3} />,
  "data-section": (
    <DataSection headingLevel={3} title="Medicines" summary="3 active" badge={<StatusTag tone="red">Attention</StatusTag>}>
      <p>Section content. The heading is a button, so the section can be opened and closed from the keyboard.</p>
    </DataSection>
  ),
  "expandable-row": stack(
    <>
      <ExpandableRow detail={<DetailList rows={[["Priority", "High priority"], ["Source", "Lab results"]]} />}>
        <div><strong>Gestational diabetes</strong><small>Expands in place</small></div>
        <PriorityTag level="high" />
      </ExpandableRow>
      <div className="dash-list-row interactive pl-fake-row" aria-hidden="true">
        <div><strong>Penicillin allergy</strong><small>Opens a panel: chevron, not plus</small></div>
        <RowChevron />
      </div>
    </>,
  ),
  "inline-panel": <InlinePanelDemo />,
  "reorder-panel": <ReorderDemo />,
  "menu-button": row(
    <MenuButton
      label="Record view: Maternity"
      items={[
        { label: "Maternity", current: true, onSelect: () => {} },
        { label: "Cancer", disabled: true, hint: "No cancer data for this patient", onSelect: () => {} },
      ]}
    />,
  ),
  "service-header": (
    <PatientBar
      patient={recordViews.maternity.patient}
      viewMenu={<MenuButton label="Record view: Maternity" items={[{ label: "Maternity", current: true, onSelect: () => {} }]} />}
    />
  ),
  "options-sidebar": stack(
    <>
      <SidebarDemo />
      <p className="pl-note">Page options also appear in the expanded mobile menu on narrow screens:</p>
      <PageOptions textSize="small" onTextSize={() => {}} filtersOpen={false} onReorder={() => {}} />
    </>,
  ),
  "record-page": stack(
    <>
      <RecordFilterBar filters={recordViews.maternity.filters ?? []} />
      <Subsection title="A subsection heading">
        <p>Sections group content under a real heading, so the page outline is navigable.</p>
      </Subsection>
    </>,
  ),
};
