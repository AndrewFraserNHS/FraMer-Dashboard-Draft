import { Link } from "react-router-dom";
import { DataSection } from "../components/ui/DataSection";
import { DetailList } from "../components/ui/DetailList";
import { RecordPage } from "../components/ui/RecordPage";
import { Callout } from "../components/ui/Callout";
import { StatusTag } from "../components/ui/StatusTag";
import { ProvenanceTag } from "../components/ui/ProvenanceTag";
import { ExpandableRow } from "../components/ui/ExpandableRow";

export default function MaternityContentPatternLibrary() {
  return (
    <RecordPage
      title="Maternity Viewer content pattern library"
      intro="Reference patterns for writing and presenting maternity record content in the viewer."
      showSystems={false}
    >
      <DataSection title="Section headings">
        <DetailList
          rows={[
            ["Pattern", "Use short noun headings that match the user task (for example, “Results”, “Appointments”, “Care plans”)."],
            ["Avoid", "Long descriptive headings or mixed terms for the same concept across pages."],
          ]}
        />
      </DataSection>

      <DataSection title="Risk and alert labels">
        <p>Always include clear status language with visual tags.</p>
        <p style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
          <StatusTag tone="red">High risk</StatusTag>
          <StatusTag tone="orange">Moderate risk</StatusTag>
          <StatusTag tone="green">No immediate concern</StatusTag>
        </p>
      </DataSection>

      <DataSection title="Status language">
        <DetailList
          rows={[
            ["Use", "Specific and active terms such as Scheduled, Completed, Review needed, Pending further detail."],
            ["Avoid", "Vague terms such as OK, Fine, Normal unless clinically defined in context."],
          ]}
        />
      </DataSection>

      <DataSection title="Source and provenance">
        <p>Show source at the point of use using clinician-first labels.</p>
        <p style={{ display: "flex", flexWrap: "wrap", gap: 8, alignItems: "center" }}>
          <ProvenanceTag
            label="Dr Sarah Wilson"
            tone="blue"
            details={[
              ["Organisation", "Central City Practice"],
              ["Care setting", "Primary care"],
              ["Source system", "EMIS GP"],
              ["Pulled", "3 days ago"],
              ["By", "Dr Sarah Wilson (GP)"],
            ]}
          />
          <ProvenanceTag
            label="Midwife J. Davies"
            tone="green"
            details={[
              ["Organisation", "Community Midwifery - Central"],
              ["Care setting", "Community care"],
              ["Source system", "BadgerNet Maternity"],
              ["Pulled", "2 days ago"],
              ["By", "J. Davies (Midwife)"],
            ]}
          />
          <ProvenanceTag
            label="Community Perinatal Service"
            tone="purple"
            details={[
              ["Organisation", "Community Perinatal Service"],
              ["Care setting", "Mental health care"],
              ["Source system", "RiO"],
              ["Pulled", "5 days ago"],
              ["By", "Perinatal team record"],
            ]}
          />
        </p>
      </DataSection>

      <DataSection title="Dates and currency">
        <DetailList
          rows={[
            ["Date format", "Use short month format in clinical tables and timelines (for example, 05 Oct 2026)."],
            ["Currency marker", "When relevant, use explicit recency language such as Last updated 05 Oct 2026, 09:12."],
          ]}
        />
      </DataSection>

      <DataSection title="Responsible organisation or team">
        <DetailList
          rows={[
            ["Pattern", "Name the accountable service in plain language (for example, Central City Practice · GP)."],
            ["Placement", "Show in detail panels and key tables where ownership affects follow-up actions."],
          ]}
        />
      </DataSection>

      <DataSection title="Expand/collapse labels">
        <DetailList
          rows={[
            ["Expand state", "Label controls with the section name and purpose, for example Expand all sections."],
            ["Collapse state", "Use Collapse all sections and preserve the user’s context on return."],
          ]}
        />
      </DataSection>

      <DataSection title="Filters">
        <DetailList
          rows={[
            ["Pattern", "Use task-based filter labels (Care setting, Event type, Organisation, Date range)."],
            ["Behaviour", "When no filters are selected, default to an explicit All option for each dimension."],
          ]}
        />
      </DataSection>

      <DataSection title="Empty states">
        <DetailList
          rows={[
            ["Pattern", "Explain why content is empty and what to do next."],
            ["Example", "No appointments match these filters. Clear filters or select a wider date range."],
          ]}
        />
      </DataSection>

      <DataSection title="Unavailable or incomplete data">
        <DetailList
          rows={[
            ["Pattern", "Use explicit placeholders such as Not supplied by source."],
            ["Avoid", "Blank cells that can be mistaken for no clinical issue."],
          ]}
        />
      </DataSection>

      <DataSection title="Uncertain and conflicting information">
        <Callout tone="amber" title="Conflicting records need review">
          <p>State what conflicts, name both sources, and ask for clinician confirmation before acting.</p>
        </Callout>
      </DataSection>

      <DataSection title="Links to source records">
        <DetailList
          rows={[
            ["Pattern", "Use clear destination labels such as View source record, View encounter, View document."],
            ["Link text", "Avoid generic labels like Click here."],
          ]}
        />
      </DataSection>

      <DataSection title="Sensitive-information disclosure">
        <Callout tone="blue" title="Reveal only what is needed">
          <p>Use progressive disclosure for sensitive details and keep access intent clear and auditable.</p>
          <p>
            For high-sensitivity records, route users to confirmation patterns before full data display. See{" "}
            <Link to="/audit">Audit</Link> for current access logging behaviour.
          </p>
        </Callout>
      </DataSection>

      <DataSection title="Component examples used in Maternity Viewer" defaultOpen={false}>
        <p>Use expandable rows for compact summaries, and NHS tags for status labels in lists such as recent test results and investigations.</p>
        <div className="context-data">
          <ExpandableRow
            detail={
              <DetailList
                rows={[
                  ["Condition", "Gestational diabetes"],
                  ["Diagnosis date", "11 Oct 2026"],
                  ["Source", "Lab results"],
                  ["Responsible team", "Diabetes Antenatal Clinic"],
                ]}
              />
            }
          >
            <div>
              <strong>Gestational diabetes</strong>
              <small>Diagnosed 11 Oct 2026 · Lab results</small>
            </div>
            <StatusTag tone="red">Active</StatusTag>
          </ExpandableRow>

          <ExpandableRow
            detail={
              <DetailList
                rows={[
                  ["Investigation", "Oral glucose tolerance test (75 g)"],
                  ["Result", "Abnormal"],
                  ["Result date", "11 Oct 2026"],
                  ["Record source", "UHMB Biochemistry"],
                ]}
              />
            }
          >
            <div>
              <strong>Oral glucose tolerance test (75 g)</strong>
              <small>11 Oct 2026 · UHMB Biochemistry</small>
            </div>
            <StatusTag tone="red">Abnormal</StatusTag>
          </ExpandableRow>
        </div>
      </DataSection>
    </RecordPage>
  );
}
