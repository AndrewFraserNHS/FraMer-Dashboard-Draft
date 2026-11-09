import { ClinicalDocument } from "../../data/patient";

/** Body of the detail panel for a clinical document. Shared by Summary and Documents. */
export function DocumentDetail({ document }: { document: ClinicalDocument }) {
  const { name, date, source, status, confidentiality } = document;
  return (
    <article className="panel-document">
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
    </article>
  );
}
