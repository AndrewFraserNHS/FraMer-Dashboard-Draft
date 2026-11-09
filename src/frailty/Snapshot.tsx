import { useState } from "react";
import { Link } from "react-router-dom";
import { Callout } from "../components/ui/Callout";
import { DataSection } from "../components/ui/DataSection";
import { DataTable } from "../components/ui/DataTable";
import { DetailList, FactsGrid } from "../components/ui/DetailList";
import { Dialog } from "../components/ui/Dialog";
import { KeyFigure } from "../components/ui/KeyFigure";
import { RecordPage } from "../components/ui/RecordPage";
import { StatusTag } from "../components/ui/StatusTag";
import { Subsection } from "../components/ui/Subsection";
import { ToggleGroup } from "../components/ui/ToggleGroup";
import {
  frailtyAppointments,
  frailtyConnectedSystems,
  frailtyConditions,
  frailtyMedicines,
  frailtyRisks,
  frailtyScale,
  patientOverview,
  prov,
  provenanceLine,
  serviceTone,
  services,
  snapshotFilters,
  sourceMeta,
  timeline,
  vitals,
  type SnapshotPanel,
  type Vital,
} from "../data/frailty";
import { priorityLabel } from "../data/patient";
import { dateKey } from "../utils/sort";
import { Source, SourceRow } from "./Source";

type TrendPeriod = "latest" | "6m" | "1y";

function VitalHistory({ vital }: { vital: Vital }) {
  return (
    <>
      <KeyFigure label={vital.label} value={vital.value} unit={vital.unit} size="large" note={`Updated ${vital.updated}`}>
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
          { header: "Recorded by", cell: (r) => r.by, sort: (r) => r.by },
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
  const [filter, setFilter] = useState<string>("all");
  const [period, setPeriod] = useState<TrendPeriod>("6m");
  const [vitalOpen, setVitalOpen] = useState<Vital | null>(null);

  const active = snapshotFilters.find((f) => f.value === filter) ?? snapshotFilters[0];
  const show = (panel: SnapshotPanel) => active.panels === null || (active.panels as readonly string[]).includes(panel);

  const high = frailtyRisks.filter((r) => r.level === "high");
  const medium = frailtyRisks.filter((r) => r.level === "medium");
  const counts = (status: string) => services.filter((s) => s.status === status).length;

  return (
    <RecordPage
      title="Frailty snapshot"
      intro="Assembled from GP, community, acute, social care and urgent care records. Select a source tag to see where a fact came from."
      systems={frailtyConnectedSystems}
    >
      <DataSection title="Frailty overview">
        <div className="frailty-overview">
          <KeyFigure
            label="Clinical Frailty Scale"
            value={frailtyScale.score}
            unit="out of 9"
            size="large"
            trend="up"
            note={`Up from ${frailtyScale.previous}. ${frailtyScale.label}.`}
          >
            <p className="key-figure__note">Last updated {frailtyScale.updated}</p>
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

      <Callout
        tone="red"
        label="Important: "
        title="DNACPR: in place"
        source={provenanceLine(prov.gpPatel("5 days ago"))}
      >
        <p>
          Recorded 14 November 2025. Outcome of decision: <strong>Do not attempt CPR.</strong>
        </p>
        <p>
          <Link to="/frailty/care-plan">View the advance care plan</Link> for the full context and rationale.
        </p>
      </Callout>

      <DataSection
        title="Key clinical risk indicators"
        summary={`${high.length} high · ${medium.length} moderate`}
      >
        <div className="frailty-risk-grid">
          {[...high, ...medium].map((risk) => (
            <Callout
              key={risk.id}
              tone={risk.level === "high" ? "red" : "amber"}
              label={`${priorityLabel[risk.level]}: `}
              title={`${risk.title}: ${risk.status}`}
              source={provenanceLine(risk.provenance)}
            >
              {risk.detail && <p>{risk.detail}</p>}
              {risk.explanation && <p>{risk.explanation}</p>}
            </Callout>
          ))}
        </div>
      </DataSection>

      <DataSection
        title="Services involved"
        summary={`${counts("Active")} active · ${counts("Referral pending")} referral pending · ${counts("Recently discharged")} recently discharged`}
      >
        <DataTable
          caption="Services involved in this patient's care"
          columns={[
            { header: "Service", cell: (s) => <strong>{s.name}</strong>, sort: (s) => s.name },
            { header: "Status", cell: (s) => <StatusTag tone={serviceTone[s.status]}>{s.status}</StatusTag>, sort: (s) => s.status },
          ]}
          rows={services}
          rowKey={(s) => s.name}
        />
      </DataSection>

      <div className="frailty-filter">
        <ToggleGroup
          label="Show"
          options={snapshotFilters.map((f) => ({ value: f.value, label: f.label }))}
          value={filter}
          onChange={setFilter}
        />
        <p className="nhs-visually-hidden" role="status">
          Showing {active.label} panels
        </p>
      </div>

      {show("falls") && (
        <DataSection title="Falls history" summary="4 falls in the last 3 months">
          <FactsGrid
            facts={[
              ["Falls in the last 3 months", "4"],
              ["Most recent", "22 January 2026, ED attendance"],
            ]}
          />
          <SourceRow of={[prov.mdt, prov.acute()]} />
        </DataSection>
      )}

      {show("mobility") && (
        <DataSection title="Baseline mobility">
          <FactsGrid
            facts={[
              ["Indoors", "Walking stick"],
              ["Outdoors", "Wheeled zimmer frame"],
              ["Transfers", "Requires assistance of 1"],
            ]}
          />
          <SourceRow of={[prov.physio]} />
        </DataSection>
      )}

      {show("household") && (
        <DataSection title="Household and living">
          <DetailList
            rows={[
              ["Accommodation", "Ground floor flat"],
              ["Tenure", "Council property"],
              ["Household", "Lives alone"],
              ["Family", "Wife: Dorothy Bennett (deceased, 2022). Son: Nick Bennett (primary carer, lives locally). Daughter: Rachel Bennett (lives in Manchester)."],
              ["Care package", "3 visits a day"],
              ["Transport", "Support required"],
            ]}
          />
          <SourceRow of={[prov.socialWorker()]} />
        </DataSection>
      )}

      {show("carer") && (
        <DataSection title="Carer insights" summary="Moderate strain">
          <DetailList
            rows={[
              ["Primary carer", "Son (Nick Bennett) · 07700 900 123"],
              ["Contingency carer", "Daughter (Rachel Bennett) · 07700 900 456"],
              ["Carer strain", "Moderate (reported struggling)"],
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
                note={period === "latest" ? `Updated ${vital.updated}` : period === "6m" ? vital.summary6m : vital.summary1y}
              >
                <Source of={vital.provenance} />
                <button type="button" className="link-button" onClick={() => setVitalOpen(vital)}>
                  View history<span className="nhs-visually-hidden"> for {vital.label}</span>
                </button>
              </KeyFigure>
            ))}
          </div>
        </DataSection>
      )}

      {show("conditions") && (
        <DataSection title="Active conditions" summary={`${frailtyConditions.length} active`}>
          <DataTable
            caption="Active conditions"
            columns={[
              { header: "Condition", cell: (c) => <strong>{c.name}</strong>, sort: (c) => c.name },
              { header: "Since", cell: (c) => c.since, sort: (c) => Number(c.since) },
              { header: "Source", cell: (c) => <Source of={prov.gpPatel()} />, sort: (c) => sourceMeta[c.source].label },
            ]}
            rows={frailtyConditions}
            rowKey={(c) => c.name}
          />
        </DataSection>
      )}

      {show("medicines") && (
        <DataSection
          title="Current medications"
          summary={`${frailtyMedicines.length} medicines · ${frailtyMedicines.filter((m) => m.status === "Review needed").length} need review`}
        >
          <DataTable
            caption="Current medications"
            columns={[
              { header: "Medicine", cell: (m) => <strong>{m.name}</strong>, sort: (m) => m.name },
              { header: "How often", cell: (m) => m.frequency, sort: (m) => m.frequency },
              {
                header: "Status",
                cell: (m) => <StatusTag tone={m.status === "Optimised" ? "green" : "orange"}>{m.status}</StatusTag>,
                sort: (m) => m.status,
              },
              { header: "Last reviewed", cell: (m) => m.reviewed ?? "Not reviewed", sort: (m) => (m.reviewed ? dateKey(m.reviewed) : null) },
              { header: "Source", cell: (m) => <Source of={m.provenance} /> },
            ]}
            rows={frailtyMedicines}
            rowKey={(m) => m.name}
          />
        </DataSection>
      )}

      {show("timeline") && (
        <DataSection title="Timeline of events" summary={`${timeline.length} events`}>
          <DataTable
            caption="Timeline of events, most recent first"
            columns={[
              { header: "Date", cell: (e) => e.date, sort: (e) => dateKey(e.date) },
              { header: "Event", cell: (e) => <strong>{e.title}</strong>, sort: (e) => e.title },
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
        <DataSection title="Scheduled appointments" summary={`${frailtyAppointments.length} upcoming`}>
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
              { header: "Date", cell: (a) => a.date, sort: (a) => dateKey(a.date) },
              { header: "Time", cell: (a) => a.time, sort: (a) => a.time },
              { header: "Location", cell: (a) => a.location, sort: (a) => a.location },
              { header: "Source", cell: (a) => <Source of={a.provenance} /> },
            ]}
            rows={frailtyAppointments}
            rowKey={(a) => a.title}
            defaultSort={{ header: "Date", direction: "ascending" }}
          />
        </DataSection>
      )}

      <Dialog
        open={vitalOpen !== null}
        title={vitalOpen ? `${vitalOpen.label}: history` : ""}
        onClose={() => setVitalOpen(null)}
        footer={
          <button type="button" className="nhsuk-button nhsuk-button--secondary" onClick={() => setVitalOpen(null)}>
            Close
          </button>
        }
      >
        {vitalOpen && (
          <Subsection title="Latest reading and trend" headingLevel={3}>
            <VitalHistory vital={vitalOpen} />
          </Subsection>
        )}
      </Dialog>
    </RecordPage>
  );
}
