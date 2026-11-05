import { ReactNode, useState } from "react";
import { Link } from "react-router-dom";
import { useDetailPanel } from "./MaternityShell";

const risks = [
  ["high", "Gestational diabetes", "Diagnosed 5 September 2026 · Lab results"],
  ["high", "Penicillin allergy", "Reaction: rash · GP record"],
  ["medium", "High body mass index (32)", "Added to record 15 August 2026 · BadgerNet Maternity"],
  ["medium", "Depression and anxiety (history)", "Currently managed by Perinatal mental health team"],
  ["medium", "Sertraline in pregnancy", "50mg once daily · GP record"],
  ["medium", "Language need", "Urdu interpreter required"],
  ["low", "Safeguarding", "3 concerns on record · 1 active"],
] as const;

const conditions = [
  ["Gestational diabetes mellitus", "Active · Diagnosed 5 September 2026", "Lab results"],
  ["Depression and anxiety (history)", "Currently managed · Since 2022", "GP record"],
  ["Obesity (body mass index 32)", "Active · Since 15 August 2026", "BadgerNet Maternity"],
];

const medicines = [
  ["Metformin", "500mg", "gestational diabetes mellitus management", "Diabetes service"],
  ["Sertraline", "50mg", "Once daily", "Dr Sarah Wilson (GP)"],
  ["Prenatal Vitamins", "Standard", "Once daily", "Midwife"],
];

const results = [
  ["Oral glucose tolerance test (75 g)", "Fasting 5.6 · 2-hour 8.7 mmol/L", "5 September 2026", "Abnormal", "high"],
  ["HbA1c", "41 mmol/mol", "5 September 2026", "Borderline", "medium"],
  ["full blood count", "Hb 122 · WCC 7.8 · Plt 262", "15 August 2026", "Normal", "low"],
  ["HIV, hepatitis B and syphilis", "Negative", "15 August 2026", "Normal", "low"],
  ["ABO blood group and rhesus D status", "A+", "15 August 2026", "Added to record", "low"],
] as const;

const events = [
  ["15 September 2026", "Community", "Perinatal mental health assessment", "Wellbeing assessment completed. Safety plan reviewed.", "Community Perinatal Service", "Perinatal mental health team", "Perinatal mental health"],
  ["12 September 2026", "Outpatient", "Gestational diabetes management", "Metformin commenced. Glucose monitoring 4 times a day.", "Diabetes Antenatal Clinic", "Dr James Chen", "Diabetes service"],
  ["5 September 2026", "Antenatal clinic", "Glucose tolerance test", "Gestational diabetes mellitus confirmed following an abnormal oral glucose tolerance test.", "Antenatal Clinic", "Phlebotomy", "Lab results"],
  ["15 August 2026", "Community", "Antenatal booking", "Baseline observations and risk assessment completed.", "Community Midwifery - Central", "Midwife J. Davies", "BadgerNet Maternity"],
];

const documents = [
  ["Structured referral (GP)", "GP structured referral", "25 July 2026", "GP Referral", "Received", "Clinical"],
  ["Booking appointment summary", "Booking summary", "15 August 2026", "BadgerNet", "Document filed", "Clinical"],
  ["Diabetes clinic letter", "Clinic letter", "12 September 2026", "Diabetes service", "Document filed", "Clinical"],
  ["Wellbeing support plan", "Care plan", "15 September 2026", "Perinatal mental health team", "Document filed", "Clinical"],
  ["Interpreter booking confirmation", "Admin note", "20 September 2026", "Booking Office", "Document filed", "Admin"],
];

const socialContext = [
  ["Pregnancy", "Third pregnancy, 1 previous birth · 34 weeks and 1 day · estimated due date 15 November 2026"],
  ["Language", "Urdu · Interpreter required"],
  ["Living situation", "Lives with partner, Imran Khan"],
  ["Employment", "Retail assistant (part-time)"],
  ["Safeguarding", "No active concern recorded"],
  ["Next of kin", "Imran Khan · 07811 223344"],
  ["Phone", "07980782416"],
  ["Email", "leila.khan@example.com"],
  ["GP", "Dr Sarah Wilson · Central City Practice"],
  ["Ethnicity", "Asian / Asian British - Pakistani"],
  ["Blood group", "A+"],
  ["Previous pregnancies", "2 · No stillbirths"],
  ["Vaccinations", "Seasonal Flu and Pertussis completed"],
  ["Disability", "None recorded"],
] as const;

function Card({ title, count, children, className = "", action, defaultOpen = true }: { title: string; count?: string; children: ReactNode; className?: string; action?: ReactNode; defaultOpen?: boolean }) {
  return (
    <ExpanderCard
      title={title}
      count={count}
      className={className}
      action={action}
      defaultOpen={defaultOpen}
    >
      {children}
    </ExpanderCard>
  );
}

function ExpanderCard({
  title,
  count,
  children,
  className = "",
  action,
  defaultOpen = true,
}: {
  title: string;
  count?: string;
  children: ReactNode;
  className?: string;
  action?: ReactNode;
  defaultOpen?: boolean;
}) {
  const [open, setOpen] = useState(defaultOpen);

  return (
    <details
      className={`nhs-expander-card ${className}`}
      open={open}
      onToggle={(event) => setOpen(event.currentTarget.open)}
    >
      <summary
        className="nhs-expander-summary"
        data-section-toggle
        aria-expanded={open}
      >
        <span className="nhs-expander-summary-text">{title}</span>
        {count && <span className="nhs-expander-count" aria-live="polite">{count}</span>}
      </summary>
      <div className="nhs-expander-content">
        {action && <div className="nhs-expander-action">{action}</div>}
        <div className="dash-card-body">{children}</div>
      </div>
    </details>
  );
}

function More({ to, children }: { to: string; children: ReactNode }) {
  return <Link className="dash-more" to={to}>{children}</Link>;
}

function SortControl({
  label,
  value,
  onChange,
}: {
  label: string;
  value: string;
  onChange: (value: string) => void;
}) {
  return (
    <select
      className="dash-sort"
      aria-label={`Sort ${label}`}
      value={value}
      onChange={(event) => onChange(event.target.value)}
    >
      <option value="date-desc">Newest first</option>
      <option value="date-asc">Oldest first</option>
      <option value="az">A–Z</option>
      <option value="za">Z–A</option>
    </select>
  );
}

function DetailRows({ rows }: { rows: Array<[string, ReactNode]> }) {
  return <dl className="panel-detail-list">
    {rows.map(([label, value]) => <div key={label}><dt>{label}</dt><dd>{value}</dd></div>)}
  </dl>;
}

function RowChevron() {
  return <span className="side-panel-chevron" aria-hidden="true" />;
}

function ListRow({ children, onOpen, label }: { children: ReactNode; onOpen?: () => void; label?: string }) {
  if (onOpen) {
    return <button type="button" className="dash-list-row interactive" onClick={onOpen} aria-label={label}>{children}<RowChevron /></button>;
  }
  return <div className="dash-list-row">{children}</div>;
}

export default function App() {
  const openPanel = useDetailPanel();
  const [medicineSort, setMedicineSort] = useState("date-desc");
  const [resultSort, setResultSort] = useState("date-desc");
  const [timelineGroupsOpen, setTimelineGroupsOpen] = useState({
    september: true,
    august: false,
  });
  const allTimelineGroupsOpen = Object.values(timelineGroupsOpen).every(Boolean);
  const medicineDates: Record<string, number> = {
    Metformin: Date.parse("2026-09-12"),
    Sertraline: Date.parse("2022-01-01"),
    "Prenatal Vitamins": Date.parse("2026-08-15"),
  };
  const sortRecords = <T extends readonly string[]>(
    records: readonly T[],
    sort: string,
    getDate: (record: T) => number,
  ) =>
    [...records].sort((first, second) => {
      if (sort === "az") return first[0].localeCompare(second[0]);
      if (sort === "za") return second[0].localeCompare(first[0]);
      return sort === "date-asc"
        ? getDate(first) - getDate(second)
        : getDate(second) - getDate(first);
    });
  const sortedMedicines = sortRecords(
    medicines,
    medicineSort,
    ([name]) => medicineDates[name] ?? 0,
  );
  const sortedResults = sortRecords(
    results,
    resultSort,
    ([, , date]) => Date.parse(date),
  );

  function showEventDetail([date, setting, event, reason, org, clinician, source]: (typeof events)[number]) {
    openPanel({
      eyebrow: "Maternity event detail",
      title: event,
      content: <DetailRows rows={[
        ["Date", date],
        ["Care setting", setting],
        ["Reason for contact", reason],
        ["Organisation", org],
        ["Clinician or team", clinician],
        ["Record source", source],
      ]} />,
    });
  }

  function showDocumentDetail([name, type, date, source, status, confidentiality]: (typeof documents)[number]) {
    openPanel({
      eyebrow: type,
      title: name,
      content: <article className="panel-document">
        <div className="panel-document-meta">
          <strong>University Hospitals of Morecambe Bay NHS Foundation Trust</strong>
          <span><b>Date:</b> {date}</span>
          <span><b>Source:</b> {source}</span>
          <span><b>Status:</b> {status} · {confidentiality}</span>
        </div>
        <div className="panel-patient-block">
          <span><b>Patient:</b> Leila Khan</span>
          <span><b>NHS No:</b> 485 777 2910</span>
          <span><b>DoB:</b> 14 June 1995</span>
          <span><b>Address:</b> 14 Ryelands Crescent, Lancaster</span>
        </div>
        <h3>{name}</h3>
        <h4>Clinical summary</h4>
        <p>This document forms part of Leila Khan’s shared maternity record and has been made available to the maternity care team.</p>
        <h4>Current pregnancy</h4>
        <p>Leila is in her third pregnancy, with 1 previous birth, and is 34 weeks and 1 day pregnant. Gestational diabetes mellitus is managed with metformin and regular glucose monitoring. She needs an Urdu interpreter.</p>
        <h4>Plan</h4>
        <p>Continue the agreed maternity pathway and review at the next scheduled appointment. Escalate any new clinical or safeguarding concerns.</p>
      </article>,
    });
  }

  return <div className="ncrs-app maternity-dashboard"><div className="ncrs-main">
    <h1 className="record-page-title">Summary</h1>
    <ExpanderCard
      title="Artificial intelligence clinical summary"
      count="High confidence"
      className="ai-card"
    >
        <div className="ai-full"><p>Leila is 31 and in her third pregnancy, with 1 previous birth. She is 34 weeks and 1 day pregnant, with an estimated due date of 15 November 2026. Her active conditions are gestational diabetes mellitus, obesity and a history of depression and anxiety. Her current medicines are sertraline 50mg, prenatal vitamins and metformin 500mg. She has a penicillin allergy that caused a rash. Her mental health is stable with support from the perinatal mental health team. She speaks Urdu and needs an interpreter. She lives with her partner and works part time as a retail assistant.</p><small>Sources: GP record (5 October 2026, 8:45am) · BadgerNet Maternity (5 October 2026, 9:12am) · Lab results (5 October 2026, 7:30am) · Perinatal mental health (3 October 2026, 2:05pm)</small><button type="button" className="panel-link-button" onClick={() => openPanel({
          eyebrow: "Artificial intelligence clinical summary",
          title: "Clinical summary detail",
          content: <><p>Leila is 31 and in her third pregnancy, with 1 previous birth. She is 34 weeks and 1 day pregnant. Her pregnancy is complicated by gestational diabetes mellitus, obesity and a history of depression and anxiety. She has a penicillin allergy and needs an Urdu interpreter.</p><DetailRows rows={[
            ["Generated", "5 October 2026, 9:15am"],
            ["Confidence", "High"],
            ["Connected sources", "4"],
            ["Review status", "Clinical review required"],
            ["Key medicines", "Metformin 500mg, Sertraline 50mg, prenatal vitamins"],
            ["Next planned care", "34-week routine review · 5 October 2026"],
          ]} /></>,
        })}>View summary detail</button></div>
    </ExpanderCard>

    <div className="dash-grid dash-grid-three">
      <ExpanderCard title="Clinical risks and alerts" count="Showing 7 of 7 active">
        {risks.map(([tone, label, detail], index) => <ListRow key={label} label={`View ${label} detail`} onOpen={() => openPanel({
          eyebrow: "Risk and safety detail",
          title: label,
          content: <DetailRows rows={[
            ["Risk or flag", label],
            ["Priority", tone === "high" ? "High priority" : tone === "medium" ? "Medium priority" : "Low priority"],
            ["Clinical detail", detail],
            ["Applies to", "Current pregnancy"],
            ["Review status", tone === "low" ? "No action required" : "Active review required"],
            ["Record source", detail.includes("·") ? detail.split("·")[1].trim() : "Maternity record"],
          ]} />,
        })}><div><strong>{label}</strong><small>{detail}</small></div><b className={`priority ${tone}${index % 2 === 1 ? " priority-filled" : ""}`}>{tone === "high" ? "High priority" : tone === "medium" ? "Medium priority" : "Low priority"}</b></ListRow>)}
      </ExpanderCard>
      <Card
        title="Pregnancy conditions"
        count="Showing 3 of 3 active"
      >
        {conditions.map(([name, meta, source]) => <ListRow key={name} label={`View ${name} detail`} onOpen={() => openPanel({
          eyebrow: "Condition detail",
          title: name,
          content: <DetailRows rows={[
            ["Condition or problem", name],
            ["Clinical status", meta],
            ["Date recorded", meta.includes("Diagnosed") ? "5 September 2026" : "15 August 2026"],
            ["Recorder", source === "GP record" ? "Dr Sarah Wilson" : "Maternity clinical team"],
            ["Service", source],
            ["Record source", source],
          ]} />,
        })}><div><strong>{name}</strong><small>{meta} · {source}</small></div></ListRow>)}
        <More to="/comorbidities">View full condition history</More>
      </Card>
      <Card title="Social and maternity context" count="Showing 14 of 14 recorded">
        <div className="context-data">
          {socialContext.map(([label, value], index) => <button
            type="button"
            key={label}
            className={index === 6 ? "extended-start" : ""}
            onClick={() => openPanel({
              eyebrow: "Patient context detail",
              title: label,
              content: <DetailRows rows={[
                [label, value],
                ["Patient", "Leila Khan"],
                ["Record status", "Current"],
                ["Record source", label === "GP" ? "GP record" : "BadgerNet Maternity"],
                ["Last reviewed", "5 October 2026"],
              ]} />,
            })}
          ><strong>{label}</strong><span>{value}</span><RowChevron /></button>)}
        </div>
      </Card>
    </div>

    <div className="dash-grid dash-grid-three">
      <Card
        title="Recent test results and investigations"
        count="Showing 5 of 5 results"
        defaultOpen={false}
        action={<SortControl label="test results" value={resultSort} onChange={setResultSort} />}
      >
        {sortedResults.map(([test, value, date, status, tone]) => <ListRow key={test} label={`View ${test} result`} onOpen={() => openPanel({
          eyebrow: "Result detail",
          title: test,
          content: <DetailRows rows={[
            ["Investigation", test],
            ["Result", value],
            ["Result date", date],
            ["Status", status],
            ["Requested by", "Maternity clinical team"],
            ["Record source", "Lab results"],
          ]} />,
        })}><div><strong>{test}</strong><span>{value}</span><small>{date} · Lab results</small></div><b className={`result-tag ${tone}`}>{status}</b></ListRow>)}
        <More to="/results">View all results</More>
      </Card>
      <Card title="Care plans and treatment preferences" count="Showing 2 of 2 active" defaultOpen={false}>
        <ListRow label="View Wellbeing Support Plan" onOpen={() => openPanel({
          eyebrow: "Care plan detail",
          title: "Wellbeing Support Plan",
          content: <><DetailRows rows={[["Status", "Active"], ["Last updated", "15 September 2026"], ["Responsible service", "Perinatal mental health team"], ["Review frequency", "Regular contact"]]} /><h3>Plan</h3><p>Safety plan in place; partner involved; social services aware and supportive.</p></>,
        })}><div><strong>Wellbeing Support Plan</strong><small>Updated 15 September 2026 · Perinatal mental health team</small><span>Regular contact; safety plan in place; partner involved; social services aware and supportive.</span></div></ListRow>
        <ListRow label="View gestational diabetes management plan" onOpen={() => openPanel({
          eyebrow: "Care plan detail",
          title: "Gestational diabetes management",
          content: <><DetailRows rows={[["Status", "Active"], ["Last updated", "12 September 2026"], ["Responsible service", "Diabetes service"], ["Lead clinician", "Dr James Chen"]]} /><h3>Plan</h3><p>Metformin 500mg; glucose monitoring four times daily; dietitian referral requested.</p></>,
        })}><div><strong>Gestational diabetes management</strong><small>Updated 12 September 2026 · Diabetes service</small><span>Metformin 500mg; glucose monitoring 4 times a day; dietitian referral requested.</span></div></ListRow>
        <More to="/care-plans">View all care plans</More>
      </Card>
      <Card
        title="Medicines"
        count="Showing 3 of 3 active"
        defaultOpen={false}
        action={<SortControl label="medicines" value={medicineSort} onChange={setMedicineSort} />}
      >
        {sortedMedicines.map(([name, dose, direction, source]) => <ListRow key={name} label={`View ${name} detail`} onOpen={() => openPanel({
          eyebrow: "Medication detail",
          title: name,
          content: <DetailRows rows={[
            ["Medicine", name],
            ["Dose", dose],
            ["Directions or indication", direction],
            ["Status", "Current"],
            ["Prescriber or service", source],
            ["Pregnancy review", "Reviewed for current pregnancy"],
          ]} />,
        })}><div><strong>{name} <em>{dose}</em></strong><small>{direction} · {source}</small></div></ListRow>)}
        <More to="/pregnancy">View complete medicines record</More>
      </Card>
    </div>

    <ExpanderCard
      title="Clinical events"
      count="Showing 4 of 4 events"
      className="timeline-card"
      defaultOpen={false}
    >
      <div className="timeline-content">
        <div className="timeline-toolbar">
          <button
            type="button"
            onClick={() => setTimelineGroupsOpen({
              september: !allTimelineGroupsOpen,
              august: !allTimelineGroupsOpen,
            })}
          >
            {allTimelineGroupsOpen ? "Collapse all" : "Expand all"}
          </button>
        </div>
        <div className="event-groups">
          <section className="event-group">
            <button
              type="button"
              className="event-group-title"
              aria-expanded={timelineGroupsOpen.september}
              aria-controls="september-events"
              onClick={() => setTimelineGroupsOpen((groups) => ({ ...groups, september: !groups.september }))}
            >
              <strong>Sep 2026</strong>
              <span className="setting-tag community">Community (1)</span>
              <span className="setting-tag outpatient">Outpatient (1)</span>
              <span className="setting-tag antenatal">Antenatal clinic (1)</span>
              <b>3</b>
            </button>
            {timelineGroupsOpen.september && <div id="september-events" className="table-scroll">
              <table className="event-table">
                <caption className="nhs-visually-hidden">September 2026 maternity events</caption>
                <thead><tr><th>Date</th><th>Setting</th><th>Event</th><th>Reason for contact</th><th>Organisation</th><th>Doc</th><th /></tr></thead>
                <tbody>
                  {events.slice(0, 3).map(([date, setting, event, reason, org, clinician, source]) => <tr key={date}>
                    <td><strong>{date}</strong></td>
                    <td>{setting}</td>
                    <td><strong>{event}</strong><span className="event-type-tag">{source}</span><small>{clinician}</small></td>
                    <td>{reason}</td>
                    <td>{org}</td>
                    <td>—</td>
                    <td><button className="row-chevron-button" type="button" aria-label={`View ${event} detail`} onClick={() => showEventDetail([date, setting, event, reason, org, clinician, source])}><RowChevron /></button></td>
                  </tr>)}
                </tbody>
              </table>
            </div>}
          </section>
          <section className="event-group">
            <button
              type="button"
              className="event-group-title"
              aria-expanded={timelineGroupsOpen.august}
              aria-controls="august-events"
              onClick={() => setTimelineGroupsOpen((groups) => ({ ...groups, august: !groups.august }))}
            >
              <strong>Aug 2026</strong>
              <span className="setting-tag community">Community midwifery (1)</span>
              <b>1</b>
            </button>
            {timelineGroupsOpen.august && <div id="august-events" className="table-scroll">
              <table className="event-table">
                <caption className="nhs-visually-hidden">August 2026 maternity events</caption>
                <thead><tr><th>Date</th><th>Setting</th><th>Event</th><th>Reason for contact</th><th>Organisation</th><th>Doc</th><th /></tr></thead>
                <tbody><tr>
                  <td><strong>{events[3][0]}</strong></td>
                  <td>{events[3][1]}</td>
                  <td><strong>{events[3][2]}</strong><span className="event-type-tag">{events[3][6]}</span><small>{events[3][5]}</small></td>
                  <td>{events[3][3]}</td>
                  <td>{events[3][4]}</td>
                  <td>—</td>
                  <td><button className="row-chevron-button" type="button" aria-label={`View ${events[3][2]} detail`} onClick={() => showEventDetail(events[3])}><RowChevron /></button></td>
                </tr></tbody>
              </table>
            </div>}
          </section>
        </div>
        <More to="/appointments">View full maternity timeline</More>
      </div>
    </ExpanderCard>

    <div className="dash-grid dash-grid-lower">
      <Card title="Clinical documents" count="Showing 5 of 5 documents" className="documents-card" defaultOpen={false}>
        <div className="table-scroll"><table className="documents-table"><caption className="nhs-visually-hidden">Clinical documents</caption><thead><tr><th>Document</th><th>Type</th><th>Date</th><th>Source</th><th>Status</th><th><span className="nhs-visually-hidden">Actions</span></th></tr></thead><tbody>
          {documents.map((document) => {
            const [name, type, date, source, status, confidentiality] = document;
            return <tr key={name}><td><strong>{name}</strong><small>{confidentiality}</small></td><td><span className="outline-tag">{type}</span></td><td>{date}</td><td><span className="source-tag">{source}</span></td><td>{status}</td><td><button className="row-chevron-button" type="button" aria-label={`View ${name}`} onClick={() => showDocumentDetail(document)}><RowChevron /></button></td></tr>;
          })}
        </tbody></table></div><More to="/documents">View full document library</More>
      </Card>
      <Card title="Upcoming care" count="Showing 2 of 2 upcoming" defaultOpen={false}>
        <div className="upcoming-list">
          <button type="button" onClick={() => openPanel({
            eyebrow: "Upcoming appointment",
            title: "34-week routine review",
            content: <DetailRows rows={[["Date and time", "5 October 2026, 9am"], ["Care setting", "Community"], ["Organisation", "Community Midwifery - Central"], ["Clinician", "Midwife J. Davies"], ["Interpreter", "Urdu interpreter booked"], ["Status", "Scheduled"]]} />,
          })}><div><strong>34-week routine review</strong><span>5 October 2026, 9am</span><small>Community Midwifery - Central · Urdu interpreter booked</small></div><RowChevron /></button>
          <button type="button" onClick={() => openPanel({
            eyebrow: "Upcoming appointment",
            title: "36-week growth scan",
            content: <DetailRows rows={[["Date and time", "16 October 2026, 11:10am"], ["Care setting", "Outpatient"], ["Organisation", "Ultrasound Department"], ["Reason", "Scheduled due to gestational diabetes mellitus pathway"], ["Preparation", "Attend with maternity notes"], ["Status", "Scheduled"]]} />,
          })}><div><strong>36-week growth scan</strong><span>16 October 2026, 11:10am</span><small>Ultrasound department · Scheduled due to gestational diabetes mellitus pathway</small></div><RowChevron /></button>
        </div><More to="/appointments">View all upcoming care</More>
      </Card>
      <Card title="Care team and health services" count="Showing 6 of 6 active" className="team-card" defaultOpen={false}>
        <div className="team-list">{[
          ["Midwife J. Davies", "Community Midwifery - Central", "Last contact: 15 August 2026"],
          ["Dr James Chen", "Diabetes Antenatal Clinic", "Last contact: 12 September 2026"],
          ["Dr Sarah Wilson", "Central City Practice · GP", "Record updated: 5 October 2026"],
          ["Perinatal mental health team", "Community Perinatal Service", "Last contact: 15 September 2026"],
          ["Social services", "Supportive involvement", "Last update: 2 October 2026"],
          ["University Hospitals of Morecambe Bay", "Maternity hospital service", "Active service"],
        ].map(([name, service, detail]) => <button type="button" key={name} onClick={() => openPanel({
          eyebrow: "Care team and service detail",
          title: name,
          content: <DetailRows rows={[["Name or service", name], ["Role or organisation", service], ["Activity", detail], ["Patient", "Leila Khan"], ["Status", "Active in current pregnancy"], ["Record source", "Shared maternity record"]]} />,
        })}><div><strong>{name}</strong><span>{service}</span><small>{detail}</small></div><RowChevron /></button>)}</div>
      </Card>
    </div>
    <p className="prototype-note">Demo prototype – fictional data</p>
  </div></div>;
}
