import { formatFrailtyDate, formatFrailtyShortDate } from "../../data/frailty";
import { useState } from "react";
import { Link } from "react-router-dom";
import { Callout } from "../../components/ui/Callout";
import { DataSection } from "../../components/ui/DataSection";
import { DataTable } from "../../components/ui/DataTable";
import { DetailList, FactsGrid } from "../../components/ui/DetailList";
import { InlinePanel } from "../../components/ui/InlinePanel";
import { Button } from "../../components/ui/Button";
import { KeyFigure } from "../../components/ui/KeyFigure";
import { RecordPage } from "../../components/ui/RecordPage";
import { StatusTag } from "../../components/ui/StatusTag";
import { Subsection } from "../../components/ui/Subsection";
import { ToggleGroup } from "../../components/ui/ToggleGroup";
import { useDetailPanel } from "../../hooks/useDetailPanel";
import {
  frailtyAppointments,
  frailtyConnectedSystems,
  frailtyConditions,
  frailtyMedicines,
  frailtyRisks,
  frailtyScale,
  equipmentAdaptations,
  fallsHistory,
  mobilityHistory,
  patientOverview,
  prov,
  provenanceLine,
  serviceTone,
  services,
  snapshotFilters,
  sourceMeta,
  timeline,
  vitals,
  type FrailtyService,
  type SnapshotPanel,
  type Vital,
} from "../../data/frailty";
import { priorityLabel } from "../../data/patient";
import { dateKey } from "../../utils/sort";
import { Source, SourceRow } from "../../components/record/Source";

type TrendPeriod = "latest" | "6m" | "1y";

function VitalHistory({ vital }: { vital: Vital }) {
  return (
    <>
      <KeyFigure
        label={vital.label}
        value={vital.value}
        unit={vital.unit}
        size="large"
        note={`Updated ${vital.updated}`}
      >
        <Source of={vital.provenance} />
      </KeyFigure>
      <dl className="facts-grid">
        <div>
          <dt>Over 6 months</dt>
          <dd>{vital.summary6m}</dd>
        </div>
        <div>
          <dt>Over 1 year</dt>
          <dd>{vital.summary1y}</dd>
        </div>
      </dl>
      <DataTable
        caption={`${vital.label} prior readings`}
        columns={[
          { header: "Date", cell: (r) => r.date, sort: (r) => dateKey(r.date) },
          { header: "Reading", cell: (r) => <strong>{r.value}</strong> },
          ...(vital.readings.some((r) => r.weight)
            ? [
                {
                  header: "Weight",
                  cell: (r: (typeof vital.readings)[number]) => (
                    <strong>{r.weight}</strong>
                  ),
                },
              ]
            : []),
          ...(vital.readings.some((r) => r.height)
            ? [
                {
                  header: "Height",
                  cell: (r: (typeof vital.readings)[number]) => (
                    <strong>{r.height}</strong>
                  ),
                },
              ]
            : []),
          { header: "Recorded by", cell: (r) => r.by, sort: (r) => r.by },
          ...(vital.readings.some((r) => r.type)
            ? [
                {
                  header: "Posture",
                  cell: (r: (typeof vital.readings)[number]) => r.type ?? "-",
                  sort: (r: (typeof vital.readings)[number]) => r.type ?? "",
                },
              ]
            : []),
          { header: "System", cell: (r) => r.system, sort: (r) => r.system },
        ]}
        rows={vital.readings}
        rowKey={(r) => `${r.date}-${r.value}`}
        defaultSort={{ header: "Date", direction: "descending" }}
      />
    </>
  );
}

export default function FrailtySnapshot() {
  const openPanel = useDetailPanel();
  const [filter, setFilter] = useState<string>("all");
  const [period, setPeriod] = useState<TrendPeriod>("6m");
  const [vitalOpen, setVitalOpen] = useState<Vital | null>(null);
  const [cfsOpen, setCfsOpen] = useState(false);

  const active =
    snapshotFilters.find((f) => f.value === filter) ?? snapshotFilters[0];
  const show = (panel: SnapshotPanel) =>
    active.panels === null ||
    (active.panels as readonly string[]).includes(panel);
  const openCfs = () => {
    setVitalOpen(null);
    setCfsOpen(true);
  };
  const openVital = (vital: Vital) => {
    setCfsOpen(false);
    setVitalOpen(vital);
  };

  const high = frailtyRisks.filter((r) => r.level === "high");
  const medium = frailtyRisks.filter((r) => r.level === "medium");
  const counts = (status: FrailtyService["status"]) =>
    services.filter((s) => s.status === status).length;

  function openServiceDetail(service: FrailtyService) {
    openPanel({
      eyebrow: "Service involvement",
      title: service.team,
      status: service.status,
      content: (
        <DetailList
          rows={[
            ["Team or service", service.team],
            ["Status", service.status],
            ["Role", service.role],
            ["Next planned activity", service.nextPlannedActivity],
            ["Key contact", service.keyContact],
            ["Last confirmed date", service.lastConfirmedDate],
            ["Source", <Source of={service.source} />],
          ]}
        />
      ),
    });
  }

  function openFallsHistory() {
    openPanel({
      eyebrow: "Functional insight",
      title: "Falls history",
      content: (
        <DataTable
          caption="Falls history and incident changes"
          columns={[
            {
              header: "Date",
              cell: (row) => row.date,
              sort: (row) => dateKey(row.date),
            },
            {
              header: "Incident",
              cell: (row) => <strong>{row.incident}</strong>,
              sort: (row) => row.incident,
            },
            { header: "Outcome", cell: (row) => row.outcome },
            {
              header: "Change after incident",
              cell: (row) => row.changeAfterIncident,
            },
            { header: "Source", cell: (row) => <Source of={row.provenance} /> },
          ]}
          rows={fallsHistory}
          rowKey={(row) => `${row.date}-${row.incident}`}
          defaultSort={{ header: "Date", direction: "descending" }}
        />
      ),
    });
  }

  function openMobilityHistory() {
    openPanel({
      eyebrow: "Functional insight",
      title: "Baseline mobility history",
      content: (
        <DataTable
          caption="Baseline mobility changes and history"
          columns={[
            {
              header: "Date",
              cell: (row) => row.date,
              sort: (row) => dateKey(row.date),
            },
            {
              header: "Change",
              cell: (row) => <strong>{row.change}</strong>,
              sort: (row) => row.change,
            },
            { header: "Detail", cell: (row) => row.detail },
            { header: "Trigger", cell: (row) => row.trigger },
            { header: "Source", cell: (row) => <Source of={row.provenance} /> },
          ]}
          rows={mobilityHistory}
          rowKey={(row) => `${row.date}-${row.change}`}
          defaultSort={{ header: "Date", direction: "descending" }}
        />
      ),
    });
  }

  function openEquipmentAdaptations() {
    openPanel({
      eyebrow: "Functional insight",
      title: "Equipment and adaptations",
      content: (
        <DataTable
          caption="Equipment and adaptations used across the MDT"
          columns={[
            {
              header: "Equipment or adaptation",
              cell: (row) => <strong>{row.item}</strong>,
              sort: (row) => row.item,
            },
            {
              header: "Status",
              cell: (row) => (
                <StatusTag
                  tone={
                    row.status === "Active"
                      ? "green"
                      : row.status === "Pending review"
                        ? "orange"
                        : "blue"
                  }
                >
                  {row.status}
                </StatusTag>
              ),
              sort: (row) => row.status,
            },
            {
              header: "Provider",
              cell: (row) => row.provider,
              sort: (row) => row.provider,
            },
            {
              header: "Installation date",
              cell: (row) => row.installationDate,
              sort: (row) => dateKey(row.installationDate),
            },
            { header: "Current use", cell: (row) => row.currentUse },
            {
              header: "Review or outstanding action",
              cell: (row) => row.reviewOrOutstandingAction,
            },
            { header: "Source", cell: (row) => <Source of={row.provenance} /> },
          ]}
          rows={equipmentAdaptations}
          rowKey={(row) => row.item}
          defaultSort={{ header: "Installation date", direction: "descending" }}
        />
      ),
    });
  }
  const cfsHistory = [
    {
      date: formatFrailtyShortDate("2026-02-06"),
      score: "6",
      label: "Moderately frail",
      setting: "Community Geriatrician Follow-up",
      source: prov.mdt,
    },
    {
      date: formatFrailtyShortDate("2025-12-12"),
      score: "5",
      label: "Mildly frail",
      setting: "Community frailty follow-up",
      source: prov.districtNurse(),
    },
    {
      date: formatFrailtyShortDate("2025-10-03"),
      score: "5",
      label: "Mildly frail",
      setting: "Social care package review",
      source: prov.socialWorker(),
    },
    {
      date: formatFrailtyShortDate("2025-07-09"),
      score: "4",
      label: "Vulnerable",
      setting: "GP annual frailty review",
      source: prov.gpPatel(),
    },
    {
      date: formatFrailtyShortDate("2025-03-21"),
      score: "4",
      label: "Vulnerable",
      setting: "Post-discharge community review",
      source: prov.acute(),
    },
  ] as const;

  return (
    <RecordPage
      title="Frailty snapshot"
      // intro="Assembled from GP, community, acute, social care and urgent care records. Select a source tag to see where a fact came from."
      systems={frailtyConnectedSystems}
      showSystems={false}
    >
      <DataSection title="Frailty overview">
        <div className="frailty-overview">
          <KeyFigure
            label="Clinical Frailty Scale"
            value={frailtyScale.score}
            unit="out of 9"
            size="large"
            trend="up"
            concern
            note={`Up from ${frailtyScale.previous}. ${frailtyScale.label}.`}
            onOpen={openCfs}
            openLabel="View scale details"
          >
            <p className="key-figure__note">
              Last updated {frailtyScale.updated}
            </p>
            <Source of={frailtyScale.provenance} />
          </KeyFigure>
          <div className="frailty-overview__text">
            <h3 className="subsection__title">Patient overview</h3>
            {patientOverview.paragraphs.map((paragraph) => (
              <p key={paragraph}>{paragraph}</p>
            ))}
            <p className="panel-sources__label">Assembled from</p>
            <SourceRow of={patientOverview.assembledFrom} />
          </div>
        </div>
      </DataSection>

      <InlinePanel
        open={cfsOpen}
        title="Clinical Frailty Scale"
        footer={
          <Button variant="secondary" onClick={() => setCfsOpen(false)}>
            Close
          </Button>
        }
      >
        <p>
          The Rockwood Clinical Frailty Scale (CFS) is a 9-point judgment-based
          clinical tool used to assess an older adult's baseline level of
          physical fitness, daily function, and cognition from two weeks prior
          to an acute illness to help guide care decisions and predict health
          outcomes.
        </p>
        <ul className="bullet-list">
          <li>
            <strong>6:</strong> Moderately frail - needs help with outdoor
            activities and keeping the house running.
          </li>
          <li>
            <strong>7:</strong> Severely frail - completely dependent for
            personal care.
          </li>
          <li>
            <strong>8:</strong> Very severely frail - completely dependent and
            nearing end of life.
          </li>
        </ul>
        <p>
          <strong>Current score:</strong> {frailtyScale.score} (
          {frailtyScale.label})
        </p>
        <DataTable
          caption="Clinical Frailty Scale history (last 12 months)"
          columns={[
            {
              header: "Date",
              cell: (row) => row.date,
              sort: (row) => dateKey(row.date),
            },
            {
              header: "Score",
              cell: (row) => (
                <strong>
                  {row.score} - {row.label}
                </strong>
              ),
              sort: (row) => Number(row.score),
            },
            {
              header: "Assessment context",
              cell: (row) => row.setting,
              sort: (row) => row.setting,
            },
            {
              header: "Source",
              cell: (row) => <Source of={row.source} />,
            },
          ]}
          rows={cfsHistory}
          rowKey={(row) => `${row.date}-${row.score}-${row.setting}`}
          defaultSort={{ header: "Date", direction: "descending" }}
        />
      </InlinePanel>

      <Callout
        tone="red"
        label="Important: "
        title="DNACPR: in place"
        source={provenanceLine(prov.gpPatel("5 days ago"))}
      >
        <p>
          Recorded {formatFrailtyDate("2025-11-14")}. Outcome of decision:{" "}
          <strong>Do not attempt CPR.</strong>
        </p>
        <p>
          <Link to="/frailty/care-plan">View the advance care plan</Link> for
          the full context and rationale.
        </p>
      </Callout>

      <DataSection
        title="Services involved"
        summary={`${counts("Active")} active · ${counts("Referred / waiting")} referred/waiting · ${counts("Recently discharged")} recently discharged · ${counts("Historical")} historical`}
      >
        <DataTable
          caption="Services involved in this patient's care"
          columns={[
            {
              header: "Team or service",
              cell: (s) => <strong>{s.team}</strong>,
              sort: (s) => s.team,
            },
            {
              header: "Status",
              cell: (s) => (
                <StatusTag tone={serviceTone[s.status]}>{s.status}</StatusTag>
              ),
              sort: (s) => s.status,
            },
            { header: "Role", cell: (s) => s.role, sort: (s) => s.role },
            {
              header: "Next planned activity",
              cell: (s) => s.nextPlannedActivity,
              sort: (s) => s.nextPlannedActivity,
            },
            {
              header: "Key contact",
              cell: (s) => s.keyContact,
              sort: (s) => s.keyContact,
            },
            {
              header: "Last confirmed date",
              cell: (s) => s.lastConfirmedDate,
              sort: (s) => dateKey(s.lastConfirmedDate),
            },
          ]}
          rows={services}
          rowKey={(s) => s.team}
          onView={openServiceDetail}
          viewLabel={(s) => `View service details for ${s.team}`}
        />
      </DataSection>

      <div className="frailty-filter">
        <ToggleGroup
          label="Show"
          options={snapshotFilters.map((f) => ({
            value: f.value,
            label: f.label,
          }))}
          value={filter}
          onChange={setFilter}
          status={`Showing ${active.label} panels`}
        />
      </div>

      {(show("falls") ||
        show("mobility") ||
        show("equipment") ||
        show("carer")) && (
        <section
          className="frailty-insight-group"
          aria-labelledby="frailty-insights-heading"
        >
          <h2 id="frailty-insights-heading" className="subsection__title">
            Functional and carer insights
          </h2>
          <div className="frailty-insight-cards">
            {show("falls") && (
              <article className="frailty-insight-card">
                <h3>Falls history</h3>
                <FactsGrid
                  facts={[
                    ["Falls in the last 3 months", "4"],
                    [
                      "Most recent",
                      `${formatFrailtyDate("2026-01-22")}, ED attendance`,
                    ],
                  ]}
                />
                <button
                  type="button"
                  className="link-button"
                  onClick={openFallsHistory}
                >
                  View history
                </button>
                <SourceRow of={[prov.mdt, prov.acute()]} />
              </article>
            )}

            {show("mobility") && (
              <article className="frailty-insight-card">
                <h3>Baseline mobility</h3>
                <FactsGrid
                  facts={[
                    ["Indoors", "Walking stick"],
                    ["Outdoors", "Wheeled zimmer frame"],
                    ["Transfers", "Requires assistance of 1"],
                  ]}
                />
                <button
                  type="button"
                  className="link-button"
                  onClick={openMobilityHistory}
                >
                  View history
                </button>
                <SourceRow of={[prov.physio]} />
              </article>
            )}

            {show("equipment") && (
              <article className="frailty-insight-card">
                <h3>Equipment and adaptations</h3>
                <FactsGrid
                  facts={[
                    [
                      "Walking aid",
                      "Walking stick indoors · wheeled zimmer outdoors",
                    ],
                    [
                      "Bathroom equipment",
                      "Shower chair and grab rails in place",
                    ],
                    [
                      "Transfer aids",
                      "Bed rail and chair raiser (pending review)",
                    ],
                    [
                      "Pressure equipment",
                      "Alternating pressure cushion awaiting installation",
                    ],
                  ]}
                />
                <button
                  type="button"
                  className="link-button"
                  onClick={openEquipmentAdaptations}
                >
                  View history
                </button>
                <SourceRow
                  of={[prov.physio, prov.socialWorker(), prov.districtNurse()]}
                />
              </article>
            )}

            {show("carer") && (
              <article className="frailty-insight-card">
                <h3>Carer insights</h3>
                <DetailList
                  rows={[
                    ["Primary carer", "Son (Nick Bennett) · 07700 900 123"],
                    [
                      "Contingency carer",
                      "Daughter (Rachel Bennett) · 07700 900 456",
                    ],
                    ["Carer strain", "Moderate (reported struggling)"],
                  ]}
                />
                <SourceRow of={[prov.socialWorker()]} />
              </article>
            )}
          </div>
        </section>
      )}

      {show("household") && (
        <DataSection title="Household and living">
          <DetailList
            rows={[
              ["Accommodation", "Ground floor flat"],
              ["Tenure", "Council property"],
              ["Household", "Lives alone"],
              [
                "Family",
                "Wife: Dorothy Bennett (deceased, 2022). Son: Nick Bennett (primary carer, lives locally). Daughter: Rachel Bennett (lives in Manchester).",
              ],
              ["Care agency or provider", "Riverside Home Support"],
              [
                "Care contact details",
                "01524 555 621 · duty@riversidecare.example",
              ],
              [
                "Visits per day or week",
                "3 visits per day (21 visits per week)",
              ],
              ["Usual timing", "08:00, 13:00 and 18:30"],
              [
                "Purpose and activities",
                "Personal care, meal preparation, prompts for medicines, hydration checks and light domestic support.",
              ],
              ["Start date", formatFrailtyDate("2025-10-01")],
              [
                "Previous package or change",
                `Increased from 2 visits a day after falls review on ${formatFrailtyDate("2026-01-24")}.`,
              ],
              ["Review date", formatFrailtyDate("2026-03-20")],
              ["Source", "Social"],
              ["Transport", "Support required"],
            ]}
          />
          <SourceRow of={[prov.socialWorker()]} />
        </DataSection>
      )}

      {show("vitals") && (
        <DataSection
          title="Vitals"
          toolbar={
            <ToggleGroup
              label="Trend"
              options={[
                { value: "latest", label: "Latest" },
                { value: "6m", label: "6 months" },
                { value: "1y", label: "1 year" },
              ]}
              value={period}
              onChange={setPeriod}
            />
          }
        >
          <div className="frailty-vitals">
            {vitals.map((vital) => (
              <KeyFigure
                key={vital.key}
                label={vital.label}
                value={vital.value}
                unit={vital.unit}
                trend={period === "latest" ? undefined : vital.trend}
                concern={vital.concern}
                note={
                  period === "latest"
                    ? `Updated ${vital.updated}`
                    : period === "6m"
                      ? vital.summary6m
                      : vital.summary1y
                }
              >
                <Source of={vital.provenance} />
                <button
                  type="button"
                  className="link-button"
                  onClick={() => openVital(vital)}
                >
                  View history
                  <span className="nhs-visually-hidden">
                    {" "}
                    for {vital.label}
                  </span>
                </button>
              </KeyFigure>
            ))}
          </div>
        </DataSection>
      )}

      {show("conditions") && (
        <DataSection
          title="Active conditions"
          summary={`${frailtyConditions.length} active`}
        >
          <DataTable
            caption="Active conditions"
            columns={[
              {
                header: "Condition",
                cell: (c) => <strong>{c.name}</strong>,
                sort: (c) => c.name,
              },
              {
                header: "Since",
                cell: (c) => c.since,
                sort: (c) => Number(c.since),
              },
              {
                header: "Source",
                cell: (c) => <Source of={prov.gpPatel()} />,
                sort: (c) => sourceMeta[c.source].label,
              },
            ]}
            rows={frailtyConditions}
            rowKey={(c) => c.name}
          />
        </DataSection>
      )}

      {show("medicines") && (
        <DataSection
          title="Current medications"
          summary={`${frailtyMedicines.length} medicines · ${frailtyMedicines.filter((m) => m.status === "Current Course").length} current course · ${frailtyMedicines.filter((m) => m.status === "Inactive").length} inactive`}
        >
          <DataTable
            caption="Current medications"
            columns={[
              {
                header: "Medicine",
                cell: (m) => <strong>{m.name}</strong>,
                sort: (m) => m.name,
              },
              {
                header: "How often",
                cell: (m) => m.frequency,
                sort: (m) => m.frequency,
              },
              {
                header: "Status",
                cell: (m) => (
                  <StatusTag
                    tone={
                      m.status === "Active"
                        ? "green"
                        : m.status === "Current Course"
                          ? "orange"
                          : "grey"
                    }
                  >
                    {m.status}
                  </StatusTag>
                ),
                sort: (m) => m.status,
              },
              {
                header: "Start date",
                cell: (m) => m.startDate ?? "Not started",
                sort: (m) => (m.startDate ? dateKey(m.startDate) : null),
              },
              {
                header: "End date",
                cell: (m) => m.endDate ?? "Ongoing",
                sort: (m) => (m.endDate ? dateKey(m.endDate) : null),
              },
              { header: "Source", cell: (m) => <Source of={m.provenance} /> },
            ]}
            rows={frailtyMedicines}
            rowKey={(m) => m.name}
          />
        </DataSection>
      )}

      {show("timeline") && (
        <DataSection
          title="Timeline of encounters"
          summary={`${timeline.length} encounters`}
        >
          <DataTable
            caption="Timeline of encounters, most recent first"
            columns={[
              {
                header: "Date",
                cell: (e) => e.date,
                sort: (e) => dateKey(e.date),
              },
              {
                header: "Encounter",
                cell: (e) => <strong>{e.title}</strong>,
                sort: (e) => e.title,
              },
              { header: "Details", cell: (e) => e.description },
              { header: "Source", cell: (e) => <Source of={e.provenance} /> },
            ]}
            rows={timeline}
            rowKey={(e) => `${e.date}-${e.title}`}
            defaultSort={{ header: "Date", direction: "descending" }}
          />
        </DataSection>
      )}

      {show("appointments") && (
        <DataSection
          title="Scheduled appointments"
          summary={`${frailtyAppointments.length} upcoming`}
        >
          <DataTable
            caption="Scheduled appointments"
            columns={[
              {
                header: "Appointment",
                cell: (a) => (
                  <>
                    <strong>{a.title}</strong>
                    <small className="cell-note">{a.service}</small>
                    <small className="cell-note">{a.description}</small>
                  </>
                ),
                sort: (a) => a.title,
              },
              {
                header: "Date",
                cell: (a) => a.date,
                sort: (a) => dateKey(a.date),
              },
              { header: "Time", cell: (a) => a.time, sort: (a) => a.time },
              {
                header: "Location",
                cell: (a) => a.location,
                sort: (a) => a.location,
              },
              { header: "Source", cell: (a) => <Source of={a.provenance} /> },
            ]}
            rows={frailtyAppointments}
            rowKey={(a) => a.title}
            defaultSort={{ header: "Date", direction: "ascending" }}
          />
        </DataSection>
      )}

      <InlinePanel
        open={vitalOpen !== null}
        title={vitalOpen ? `${vitalOpen.label}: history` : ""}
        footer={
          <Button variant="secondary" onClick={() => setVitalOpen(null)}>
            Close
          </Button>
        }
      >
        {vitalOpen && (
          <Subsection title="Latest reading and trend" headingLevel={3}>
            <VitalHistory vital={vitalOpen} />
          </Subsection>
        )}
      </InlinePanel>
    </RecordPage>
  );
}
