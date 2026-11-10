import { Fragment, ReactNode, useState } from "react";
import { Link } from "react-router-dom";
import { useDetailPanel } from "../hooks/useDetailPanel";
import { RiskBannerGroup } from "../components/record/RiskBanner";
import { DataSection } from "../components/ui/DataSection";
import { DetailList } from "../components/ui/DetailList";
import { ExpandableRow } from "../components/ui/ExpandableRow";
import { RowChevron } from "../components/ui/RowChevron";
import { DataTable } from "../components/ui/DataTable";
import { dateKey } from "../utils/sort";
import { SortSelect, SortValue } from "../components/ui/SortSelect";
import { PriorityTag, ResultTag } from "../components/ui/StatusTag";
import { SectionName, useSectionOrder } from "../components/ui/SectionOrder";
import { DocumentDetail } from "../components/record/DocumentDetail";
import {
  careTeam,
  carePlans,
  ClinicalDocument,
  conditions,
  documents,
  events,
  formatDate,
  medicines,
  priorityLabel,
  results,
  risks,
  socialContext,
  upcomingCare,
} from "../data/patient";

function More({ to, children }: { to: string; children: ReactNode }) {
  return (
    <Link className="dash-more" to={to}>
      {children}
    </Link>
  );
}

function sortRecords<T>(
  records: readonly T[],
  sort: SortValue,
  getName: (record: T) => string,
  getDate: (record: T) => string,
): T[] {
  return [...records].sort((first, second) => {
    if (sort === "az") return getName(first).localeCompare(getName(second));
    if (sort === "za") return getName(second).localeCompare(getName(first));
    // ISO dates compare correctly as strings
    const order = getDate(first).localeCompare(getDate(second));
    return sort === "date-asc" ? order : -order;
  });
}

const activeCount = (count: number, noun = "active") =>
  `Showing ${count} of ${count} ${noun}`;

export default function Summary() {
  const openPanel = useDetailPanel();
  const sectionOrder = useSectionOrder();
  const [medicineSort, setMedicineSort] = useState<SortValue>("date-desc");
  const [resultSort, setResultSort] = useState<SortValue>("date-desc");

  const sortedMedicines = sortRecords(
    medicines,
    medicineSort,
    (medicine) => medicine.name,
    (medicine) => medicine.started,
  );
  const sortedResults = sortRecords(
    results,
    resultSort,
    (result) => result.test,
    (result) => result.date,
  );

  function showDocumentDetail(document: ClinicalDocument) {
    openPanel({
      eyebrow: document.type,
      title: document.name,
      content: <DocumentDetail document={document} />,
    });
  }

  const sections: Record<SectionName, ReactNode> = {
    "Clinical risks": (
      <DataSection title="Clinical risks and alerts" summary={activeCount(risks.length)}>
        {risks.map((risk) => (
          <ExpandableRow
            key={risk.id}
            detail={
              <DetailList
                rows={[
                  ["Risk or flag", risk.title],
                  ["Priority", priorityLabel[risk.level]],
                  ["Clinical detail", risk.detail],
                  ["Applies to", "Current pregnancy"],
                  ["Review status", risk.level === "low" ? "No action required" : "Active review required"],
                  ["Record source", risk.source],
                ]}
              />
            }
          >
            <div>
              <strong>{risk.title}</strong>
              <small>{risk.detail}</small>
            </div>
            <PriorityTag level={risk.level} />
          </ExpandableRow>
        ))}
      </DataSection>
    ),

    "Pregnancy conditions": (
      <DataSection title="Pregnancy conditions" summary={activeCount(conditions.length)}>
        {conditions.map((condition) => (
          <ExpandableRow
            key={condition.name}
            detail={
              <DetailList
                rows={[
                  ["Condition or problem", condition.name],
                  ["Clinical status", condition.status],
                  ["Date recorded", condition.recorded],
                  ["Recorder", condition.recorder],
                  ["Service", condition.source],
                  ["Record source", condition.source],
                ]}
              />
            }
          >
            <div>
              <strong>{condition.name}</strong>
              <small>{condition.status} · {condition.source}</small>
            </div>
          </ExpandableRow>
        ))}
        <More to="/comorbidities">View full condition history</More>
      </DataSection>
    ),

    "Social context": (
      <DataSection title="Social and maternity context" summary={`Showing ${socialContext.length} of ${socialContext.length} recorded`}>
        <div className="context-data">
          {socialContext.map(([label, value]) => (
            <ExpandableRow
              key={label}
              detail={
                <DetailList
                  rows={[
                    [label, value],
                    ["Patient", "Leila Khan"],
                    ["Record status", "Current"],
                    ["Record source", label === "GP" ? "GP record" : "BadgerNet Maternity"],
                    ["Last reviewed", formatDate("2026-10-05")],
                  ]}
                />
              }
            >
              <strong>{label}</strong>
              <span>{value}</span>
            </ExpandableRow>
          ))}
        </div>
      </DataSection>
    ),

    "Test results": (
      <DataSection
        title="Recent test results and investigations"
        summary={`Showing ${results.length} of ${results.length} results`}
        defaultOpen={false}
        toolbar={
          <SortSelect
            label="test results"
            value={resultSort}
            onChange={setResultSort}
            count={sortedResults.length}
          />
        }
      >
        {sortedResults.map((result) => (
          <ExpandableRow
            key={result.test}
            detail={
              <DetailList
                rows={[
                  ["Investigation", result.test],
                  ["Result", result.value],
                  ["Result date", formatDate(result.date)],
                  ["Status", result.status],
                  ["Requested by", "Maternity clinical team"],
                  ["Record source", "Lab results"],
                ]}
              />
            }
          >
            <div>
              <strong>{result.test}</strong>
              <span>{result.value}</span>
              <small>{formatDate(result.date)} · Lab results</small>
            </div>
            <ResultTag tone={result.tone}>{result.status}</ResultTag>
          </ExpandableRow>
        ))}
        <More to="/results">View all results</More>
      </DataSection>
    ),

    "Care plans": (
      <DataSection
        title="Care plans and treatment preferences"
        summary={activeCount(carePlans.length)}
        defaultOpen={false}
      >
        {carePlans.map((plan) => (
          <ExpandableRow
            key={plan.title}
            detail={
              <>
                <DetailList rows={plan.rows} />
                <h3>Plan</h3>
                <p>{plan.planText}</p>
              </>
            }
          >
            <div>
              <strong>{plan.title}</strong>
              <small>Updated {plan.updated} · {plan.service}</small>
              <span>{plan.summary}</span>
            </div>
          </ExpandableRow>
        ))}
        <More to="/care-plans">View all care plans</More>
      </DataSection>
    ),

    Medicines: (
      <DataSection
        title="Medicines"
        summary={activeCount(medicines.length)}
        defaultOpen={false}
        toolbar={
          <SortSelect
            label="medicines"
            value={medicineSort}
            onChange={setMedicineSort}
            count={sortedMedicines.length}
          />
        }
      >
        {sortedMedicines.map((medicine) => (
          <ExpandableRow
            key={medicine.name}
            detail={
              <DetailList
                rows={[
                  ["Medicine", medicine.name],
                  ["Dose", medicine.dose],
                  ["Directions or indication", medicine.direction],
                  ["Status", "Current"],
                  ["Prescriber or service", medicine.source],
                  ["Pregnancy review", "Reviewed for current pregnancy"],
                ]}
              />
            }
          >
            <div>
              <strong>{medicine.name} <em>{medicine.dose}</em></strong>
              <small>{medicine.direction} · {medicine.source}</small>
            </div>
          </ExpandableRow>
        ))}
        <More to="/pregnancy">View complete medicines record</More>
      </DataSection>
    ),

    "Clinical events": (
      <DataSection
        title="Clinical events"
        summary={`Showing ${events.length} of ${events.length} events`}
        defaultOpen={false}
      >
        {events.map((item) => (
          <ExpandableRow
            key={`${item.date}-${item.event}`}
            detail={
              <DetailList
                rows={[
                  ["Date", item.date],
                  ["Care setting", item.setting],
                  ["Reason for contact", item.reason],
                  ["Organisation", item.organisation],
                  ["Clinician or team", item.clinician],
                  ["Record source", item.source],
                ]}
              />
            }
          >
            <div>
              <strong>{item.event}</strong>
              <small>{item.date} · {item.setting}</small>
              <span className="event-type-tag">{item.source}</span>
            </div>
          </ExpandableRow>
        ))}
        <More to="/appointments">View full maternity timeline</More>
      </DataSection>
    ),

    Documents: (
      <DataSection
        title="Clinical documents"
        summary={`Showing ${documents.length} of ${documents.length} documents`}
        className="documents-card"
        defaultOpen={false}
      >
        <DataTable
          caption="Clinical documents"
          rows={documents}
          rowKey={(document) => document.name}
          onView={showDocumentDetail}
          viewLabel={(document) => `View ${document.name}`}
          columns={[
            {
              header: "Document",
              cell: (d) => (
                <>
                  <strong>{d.name}</strong>
                  <small>{d.confidentiality}</small>
                </>
              ),
              sort: (d) => d.name,
            },
            { header: "Type", cell: (d) => <span className="outline-tag">{d.type}</span>, sort: (d) => d.type },
            { header: "Date", cell: (d) => d.date, sort: (d) => dateKey(d.date) },
            { header: "Source", cell: (d) => <span className="source-tag">{d.source}</span>, sort: (d) => d.source },
            { header: "Status", cell: (d) => d.status, sort: (d) => d.status },
          ]}
          defaultSort={{ header: "Date", direction: "descending" }}
        />
        <More to="/documents">View full document library</More>
      </DataSection>
    ),

    "Upcoming care": (
      <DataSection
        title="Upcoming care"
        summary={`Showing ${upcomingCare.length} of ${upcomingCare.length} upcoming`}
        defaultOpen={false}
      >
        <div className="upcoming-list">
          {upcomingCare.map((appointment) => (
            <button
              key={appointment.title}
              type="button"
              onClick={() =>
                openPanel({
                  eyebrow: "Upcoming appointment",
                  title: appointment.title,
                  content: <DetailList rows={appointment.rows} />,
                })
              }
            >
              <div>
                <strong>{appointment.title}</strong>
                <span>{appointment.when}</span>
                <small>{appointment.summary}</small>
              </div>
              <RowChevron />
            </button>
          ))}
        </div>
        <More to="/appointments">View all upcoming care</More>
      </DataSection>
    ),

    "Care team": (
      <DataSection
        title="Care team and health services"
        summary={activeCount(careTeam.length)}
        className="team-card"
        defaultOpen={false}
      >
        <div className="team-list">
          {careTeam.map(([name, service, detail]) => (
            <button
              type="button"
              key={name}
              onClick={() =>
                openPanel({
                  eyebrow: "Care team and service detail",
                  title: name,
                  content: (
                    <DetailList
                      rows={[
                        ["Name or service", name],
                        ["Role or organisation", service],
                        ["Activity", detail],
                        ["Patient", "Leila Khan"],
                        ["Status", "Active in current pregnancy"],
                        ["Record source", "Shared maternity record"],
                      ]}
                    />
                  ),
                })
              }
            >
              <div>
                <strong>{name}</strong>
                <span>{service}</span>
                <small>{detail}</small>
              </div>
              <RowChevron />
            </button>
          ))}
        </div>
      </DataSection>
    ),
  };

  return (
    <div className="ncrs-app maternity-dashboard">
      <div className="ncrs-main">
        <h1 className="record-page-title">Summary</h1>

        <RiskBannerGroup
          risks={risks
            .filter((risk) => risk.banner)
            .map((risk) => ({
              id: risk.id,
              level: risk.level,
              title: risk.title,
              message: risk.banner,
            }))}
        />

        <DataSection
          title="Artificial intelligence clinical summary"
          summary="High confidence"
          className="ai-card"
        >
          <div className="ai-full">
            <p>
              Leila is 31 and in her third pregnancy, with 1 previous birth. She
              is 34 weeks and 1 day pregnant, with an estimated due date of {formatDate("2026-11-15")}. Her active conditions are gestational diabetes
              mellitus, obesity and a history of depression and anxiety. Her
              current medicines are sertraline 50mg, prenatal vitamins and
              metformin 500mg. She has a penicillin allergy that caused a rash.
              Her mental health is stable with support from the perinatal mental
              health team. She speaks Urdu and needs an interpreter. She lives
              with her partner and works part time as a retail assistant.
            </p>
            <small>
              Sources: GP record ({formatDate("2026-10-05")}, 8:45am) · BadgerNet Maternity
              ({formatDate("2026-10-05")}, 9:12am) · Lab results ({formatDate("2026-10-05")}, 7:30am) ·
              Perinatal mental health ({formatDate("2026-10-03")}, 2:05pm)
            </small>
            <button
              type="button"
              className="panel-link-button"
              onClick={() =>
                openPanel({
                  eyebrow: "Artificial intelligence clinical summary",
                  title: "Clinical summary detail",
                  content: (
                    <>
                      <p>
                        Leila is 31 and in her third pregnancy, with 1 previous
                        birth. She is 34 weeks and 1 day pregnant. Her pregnancy
                        is complicated by gestational diabetes mellitus, obesity
                        and a history of depression and anxiety. She has a
                        penicillin allergy and needs an Urdu interpreter.
                      </p>
                      <DetailList
                        rows={[
                          ["Generated", `${formatDate("2026-10-05")}, 9:15am`],
                          ["Confidence", "High"],
                          ["Connected sources", "4"],
                          ["Review status", "Clinical review required"],
                          ["Key medicines", "Metformin 500mg, Sertraline 50mg, prenatal vitamins"],
                          ["Next planned care", `34-week routine review · ${formatDate("2026-10-05")}`],
                        ]}
                      />
                    </>
                  ),
                })
              }
            >
              View summary detail
            </button>
          </div>
        </DataSection>

        <div className="dash-grid dash-grid-three">
          {sectionOrder.map((name) => (
            <Fragment key={name}>{sections[name as SectionName] ?? null}</Fragment>
          ))}
        </div>
      </div>

      <p className="prototype-note">Demo prototype – fictional data</p>
    </div>
  );
}
