import { useState } from "react";
import { Link } from "react-router-dom";
import { DetailList } from "../components/ui/DetailList";
import { Callout } from "../components/ui/Callout";
import { StatusTag } from "../components/ui/StatusTag";
import { ProvenanceTag } from "../components/ui/ProvenanceTag";
import { ExpandableRow } from "../components/ui/ExpandableRow";

const nhsLogoSrc = `${import.meta.env.BASE_URL}assets/images/NHS%2010mm%20-%20RGB%20Blue.jpg`;

const sectionLinks = [
  ["section-headings", "Section headings"],
  ["risk-alert-labels", "Risk and alert labels"],
  ["status-language", "Status language"],
  ["source-provenance", "Source and provenance"],
  ["dates-currency", "Dates and currency"],
  ["responsible-team", "Responsible organisation or team"],
  ["expand-collapse", "Expand/collapse labels"],
  ["filters", "Filters"],
  ["empty-states", "Empty states"],
  ["incomplete-data", "Unavailable or incomplete data"],
  ["conflicting-info", "Uncertain and conflicting information"],
  ["source-links", "Links to source records"],
  ["sensitive-disclosure", "Sensitive-information disclosure"],
  ["component-examples", "Component examples"],
  ["reused-components", "Where we reuse components"],
  ["custom-only", "Where we had to build custom"],
] as const;

function Section({
  id,
  title,
  children,
  visible,
}: {
  id: string;
  title: string;
  children: React.ReactNode;
  visible: boolean;
}) {
  if (!visible) return null;
  return (
    <section id={id} className="pattern-library-section">
      <h2 className="nhsuk-heading-m">{title}</h2>
      {children}
    </section>
  );
}

export default function ContentPatternLibrary() {
  const [activeSection, setActiveSection] = useState<string>(sectionLinks[0][0]);

  return (
    <div className="content-pattern-library-page">
      <header className="content-pattern-library-header" role="banner">
        <div className="nhsuk-width-container content-pattern-library-header__inner">
          <img
            className="content-pattern-library-header__logo"
            src={nhsLogoSrc}
            alt="NHS"
          />
          <span className="content-pattern-library-header__service">
            National Care Records Service
          </span>
        </div>
      </header>

      <main className="nhsuk-width-container content-pattern-library-main">
        <h1 className="nhsuk-heading-l">Content pattern library</h1>
        <p className="nhsuk-lede-text app-lede-text">
          Reference patterns for writing and presenting maternity record content
          in the viewer.
        </p>

        <div className="nhsuk-grid-row">
          <div className="nhsuk-grid-column-one-third">
            <nav className="app-side-bar" aria-label="On this page">
              <h2 className="nhsuk-heading-s">On this page</h2>
              <ul className="nhsuk-list">
                {sectionLinks.map(([id, label]) => (
                  <li key={id}>
                    <button
                      type="button"
                      className={`nhsuk-link app-side-bar__link${activeSection === id ? " is-active" : ""}`}
                      aria-current={activeSection === id ? "true" : undefined}
                      onClick={() => setActiveSection(id)}
                    >
                      {label}
                    </button>
                  </li>
                ))}
              </ul>
            </nav>
          </div>

          <div className="nhsuk-grid-column-two-thirds">
            <div className="pattern-library-content">
              <Section
                id="section-headings"
                title="Section headings"
                visible={activeSection === "section-headings"}
              >
                <DetailList
                  rows={[
                    [
                      "Pattern",
                      "Use short noun headings that match the user task (for example, “Results”, “Appointments”, “Care plans”).",
                    ],
                    [
                      "Avoid",
                      "Long descriptive headings or mixed terms for the same concept across pages.",
                    ],
                  ]}
                />
              </Section>

              <Section
                id="risk-alert-labels"
                title="Risk and alert labels"
                visible={activeSection === "risk-alert-labels"}
              >
                <p>Always include clear status language with visual tags.</p>
                <p style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
                  <StatusTag tone="red">High risk</StatusTag>
                  <StatusTag tone="orange">Moderate risk</StatusTag>
                  <StatusTag tone="green">No immediate concern</StatusTag>
                </p>
              </Section>

              <Section
                id="status-language"
                title="Status language"
                visible={activeSection === "status-language"}
              >
                <DetailList
                  rows={[
                    [
                      "Use",
                      "Specific and active terms such as Scheduled, Completed, Review needed, Pending further detail.",
                    ],
                    [
                      "Avoid",
                      "Vague terms such as OK, Fine, Normal unless clinically defined in context.",
                    ],
                  ]}
                />
              </Section>

              <Section
                id="source-provenance"
                title="Source and provenance"
                visible={activeSection === "source-provenance"}
              >
                <p>
                  Show source at the point of use using clinician-first labels.
                </p>
                <p
                  style={{
                    display: "flex",
                    flexWrap: "wrap",
                    gap: 8,
                    alignItems: "center",
                  }}
                >
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
              </Section>

              <Section
                id="dates-currency"
                title="Dates and currency"
                visible={activeSection === "dates-currency"}
              >
                <DetailList
                  rows={[
                    [
                      "Date format",
                      "Use short month format in clinical tables and timelines (for example, 05 Oct 2026).",
                    ],
                    [
                      "Currency marker",
                      "When relevant, use explicit recency language such as Last updated 05 Oct 2026, 09:12.",
                    ],
                  ]}
                />
              </Section>

              <Section
                id="responsible-team"
                title="Responsible organisation or team"
                visible={activeSection === "responsible-team"}
              >
                <DetailList
                  rows={[
                    [
                      "Pattern",
                      "Name the accountable service in plain language (for example, Central City Practice · GP).",
                    ],
                    [
                      "Placement",
                      "Show in detail panels and key tables where ownership affects follow-up actions.",
                    ],
                  ]}
                />
              </Section>

              <Section
                id="expand-collapse"
                title="Expand/collapse labels"
                visible={activeSection === "expand-collapse"}
              >
                <DetailList
                  rows={[
                    [
                      "Expand state",
                      "Label controls with the section name and purpose, for example Expand all sections.",
                    ],
                    [
                      "Collapse state",
                      "Use Collapse all sections and preserve the user’s context on return.",
                    ],
                  ]}
                />
              </Section>

              <Section
                id="filters"
                title="Filters"
                visible={activeSection === "filters"}
              >
                <DetailList
                  rows={[
                    [
                      "Pattern",
                      "Use task-based filter labels (Care setting, Event type, Organisation, Date range).",
                    ],
                    [
                      "Behaviour",
                      "When no filters are selected, default to an explicit All option for each dimension.",
                    ],
                  ]}
                />
              </Section>

              <Section
                id="empty-states"
                title="Empty states"
                visible={activeSection === "empty-states"}
              >
                <DetailList
                  rows={[
                    [
                      "Pattern",
                      "Explain why content is empty and what to do next.",
                    ],
                    [
                      "Example",
                      "No appointments match these filters. Clear filters or select a wider date range.",
                    ],
                  ]}
                />
              </Section>

              <Section
                id="incomplete-data"
                title="Unavailable or incomplete data"
                visible={activeSection === "incomplete-data"}
              >
                <DetailList
                  rows={[
                    [
                      "Pattern",
                      "Use explicit placeholders such as Not supplied by source.",
                    ],
                    [
                      "Avoid",
                      "Blank cells that can be mistaken for no clinical issue.",
                    ],
                  ]}
                />
              </Section>

              <Section
                id="conflicting-info"
                title="Uncertain and conflicting information"
                visible={activeSection === "conflicting-info"}
              >
                <Callout tone="amber" title="Conflicting records need review">
                  <p>
                    State what conflicts, name both sources, and ask for
                    clinician confirmation before acting.
                  </p>
                </Callout>
              </Section>

              <Section
                id="source-links"
                title="Links to source records"
                visible={activeSection === "source-links"}
              >
                <DetailList
                  rows={[
                    [
                      "Pattern",
                      "Use clear destination labels such as View source record, View encounter, View document.",
                    ],
                    ["Link text", "Avoid generic labels like Click here."],
                  ]}
                />
              </Section>

              <Section
                id="sensitive-disclosure"
                title="Sensitive-information disclosure"
                visible={activeSection === "sensitive-disclosure"}
              >
                <Callout tone="blue" title="Reveal only what is needed">
                  <p>
                    Use progressive disclosure for sensitive details and keep
                    access intent clear and auditable.
                  </p>
                  <p>
                    For high-sensitivity records, route users to confirmation
                    patterns before full data display. See{" "}
                    <Link to="/audit">Audit</Link> for current access logging
                    behaviour.
                  </p>
                </Callout>
              </Section>

              <Section
                id="component-examples"
                title="Component examples used in Maternity Viewer"
                visible={activeSection === "component-examples"}
              >
                <p>
                  Use expandable rows for compact summaries, and NHS tags for
                  status labels in lists such as recent test results and
                  investigations.
                </p>
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
                          [
                            "Investigation",
                            "Oral glucose tolerance test (75 g)",
                          ],
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
              </Section>

              <Section
                id="reused-components"
                title="Where we reuse existing components"
                visible={activeSection === "reused-components"}
              >
                <DetailList
                  rows={[
                    [
                      "StatusTag",
                      "Used for risk, status and result labels with NHS tag colours.",
                    ],
                    [
                      "ProvenanceTag",
                      "Used for source tags with source-details interaction.",
                    ],
                    [
                      "ExpandableRow",
                      "Used for compact row summaries with inline detail reveal.",
                    ],
                    [
                      "Callout",
                      "Used for warnings, conflicts and sensitive disclosure guidance.",
                    ],
                    [
                      "DetailList",
                      "Used for key-value guidance and explicit placeholders.",
                    ],
                  ]}
                />
              </Section>

              <Section
                id="custom-only"
                title="Where we had to build custom (minimal)"
                visible={activeSection === "custom-only"}
              >
                <DetailList
                  rows={[
                    [
                      "In-page side navigation",
                      "Added on this page to mirror NHS service-manual table-of-contents navigation.",
                    ],
                    [
                      "Pattern-library page composition",
                      "Custom page-level layout and static content sections for this standalone page.",
                    ],
                  ]}
                />
              </Section>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
