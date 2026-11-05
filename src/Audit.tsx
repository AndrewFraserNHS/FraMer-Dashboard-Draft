import { ReactNode, useState } from "react";
import { useDetailPanel } from "./MaternityShell";

const systems = [
  ["BadgerNet Maternity", "5 October 2026, 9:12am", "Primary record system"],
  ["GP record", "5 October 2026, 8:45am", "Connected"],
  ["Lab results", "5 October 2026, 7:30am", "Connected"],
  ["Diabetes service", "4 October 2026, 4:20pm", "Connected"],
  ["Perinatal mental health", "3 October 2026, 2:05pm", "Connected"],
  ["Ultrasound", "30 September 2026, 10am", "Connected"],
  ["Social services", "2 October 2026, 11:30am", "Connected"],
  ["Smoking cessation", "No recent update", "Not connected"],
] as const;

function DetailRows({ rows }: { rows: Array<[string, ReactNode]> }) {
  return <dl className="panel-detail-list">
    {rows.map(([label, value]) => <div key={label}><dt>{label}</dt><dd>{value}</dd></div>)}
  </dl>;
}

export default function Audit() {
  const [systemsOpen, setSystemsOpen] = useState(false);
  const openPanel = useDetailPanel();

  return <div className="ncrs-app maternity-dashboard audit-page">
    <div className="ncrs-main">
      <div className="audit-heading">
        <h1 className="record-page-title">Audit</h1>
        <p>Review connected record systems and the latest information-sharing updates.</p>
      </div>

      <section className="dash-card systems-card">
        <div className="dash-card-header">
          <div className="dash-card-title"><strong>Connected systems</strong><span>7 of 8 connected</span></div>
          <button
            type="button"
            data-section-toggle
            aria-expanded={systemsOpen}
            aria-label={`${systemsOpen ? "Hide" : "Show"} connected systems`}
            onClick={() => setSystemsOpen((value) => !value)}
          >
            {systemsOpen ? "Hide" : "Show"}
          </button>
        </div>
        {systemsOpen && <>
          <div className="systems-summary">
            <p>BadgerNet is the home system. Latest connected update: 5 October 2026, 9:12am.</p>
          </div>
          <div className="systems-list">
            {systems.map(([name, time, status]) => <button
              type="button"
              key={name}
              onClick={() => openPanel({
                eyebrow: "Connected system detail",
                title: name,
                content: <DetailRows rows={[
                  ["System or service", name],
                  ["Connection status", status],
                  ["Latest update", time],
                  ["Patient", "Leila Khan"],
                  ["Record access", status === "Not connected" ? "Unavailable" : "Available in shared record"],
                  ["Data sharing", "Direct care"],
                ]} />,
              })}
            >
              <strong>{name}</strong>
              <span>{time}</span>
              <b className={status === "Not connected" ? "offline" : ""}>{status}</b>
            </button>)}
          </div>
        </>}
      </section>

      <p className="prototype-note">Demo prototype – fictional data</p>
    </div>
  </div>;
}
