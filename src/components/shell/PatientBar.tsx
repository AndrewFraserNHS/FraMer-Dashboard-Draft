import { useId, useState } from "react";
import { ChevronDown } from "lucide-react";
import type { PatientSummary } from "../../views";
import { DetailList } from "../ui/DetailList";
import { StatusTag } from "../ui/StatusTag";

const isCrossBoundary = (patient: PatientSummary) =>
  !!patient.registeredIcb && !!patient.viewingIcb && patient.registeredIcb !== patient.viewingIcb;

/** Address, GP, next of kin and the cross-boundary explanation. */
export function PatientDetails({ patient }: { patient: PatientSummary }) {
  return (
    <>
      <DetailList
        rows={[
          ["Address", patient.address],
          ["Registered GP", patient.gp],
          ["Next of kin", patient.nextOfKin],
        ]}
      />
      {isCrossBoundary(patient) && (
        <p className="ncrs-inset">
          <strong>Cross-boundary access.</strong> This patient is registered with{" "}
          {patient.registeredIcb}. You are viewing as {patient.viewingIcb}.
        </p>
      )}
    </>
  );
}

type PatientBarProps = {
  patient: PatientSummary;
  /** Record view control, shown beside the facts on wide screens */
  viewMenu?: React.ReactNode;
  /** Narrow screens: identity only. The view control and patient details live in the menu drawer. */
  compact?: boolean;
};

/**
 * Who the patient is, and nothing else. Address, GP, next of kin and the
 * cross-boundary explanation sit behind "Patient details".
 */
export function PatientBar({ patient, viewMenu, compact = false }: PatientBarProps) {
  const [open, setOpen] = useState(false);
  const id = useId();

  return (
    <section className={`ncrs-patient${compact ? " ncrs-patient--compact" : ""}`} aria-label="Patient identity">
      <div className="ncrs-patient__row">
        <p className="ncrs-patient__name">{patient.name}</p>
        <dl className="ncrs-patient__facts">
          <div><dt className="nhs-visually-hidden">Age and sex</dt><dd>{patient.age} years · {patient.sex}</dd></div>
          <div><dt>Date of birth</dt><dd><strong>{patient.dob}</strong></dd></div>
          <div><dt>NHS number</dt><dd><strong>{patient.nhsNumber}</strong></dd></div>
        </dl>
        {!compact && viewMenu}
        {!compact && isCrossBoundary(patient) && <StatusTag tone="blue">Cross-boundary</StatusTag>}
        {!compact && (
          <button
            type="button"
            className="ncrs-patient__toggle"
            aria-expanded={open}
            aria-controls={id}
            onClick={() => setOpen((value) => !value)}
          >
            Patient details
            <ChevronDown size={16} aria-hidden="true" className="ncrs-menu__chevron" />
          </button>
        )}
      </div>

      {!compact && (
        <div id={id} className="ncrs-patient__details" hidden={!open}>
          <PatientDetails patient={patient} />
        </div>
      )}
    </section>
  );
}
