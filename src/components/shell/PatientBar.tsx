import { useId, useState } from "react";
import { ChevronDown, Copy, Check } from "lucide-react";
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
          ["Occupation", patient.occupation ?? "Not recorded"],
          ["Next of kin", patient.nextOfKin],
          ["Home visit flags", patient.homeVisitFlags ?? "No home visit concerns recorded"],
          ["Communication preference", patient.communicationPreference ?? "No communication preference recorded"],
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
  const [copied, setCopied] = useState(false);
  const [gravidaOpen, setGravidaOpen] = useState(false);
  const [parityOpen, setParityOpen] = useState(false);
  const id = useId();
  const gravidaDetailId = `${id}-gravida-detail`;
  const parityDetailId = `${id}-parity-detail`;

  const copyNhsNumber = async () => {
    try {
      await navigator.clipboard.writeText(patient.nhsNumber.replace(/\s+/g, ""));
      setCopied(true);
      window.setTimeout(() => setCopied(false), 1500);
    } catch {
      setCopied(false);
    }
  };

  return (
    <section className={`ncrs-patient${compact ? " ncrs-patient--compact" : ""}`} aria-label="Patient identity">
      <div className="ncrs-patient__row">
        <p className="ncrs-patient__name">{patient.name}</p>
        <dl className="ncrs-patient__facts">
          <div><dt className="nhs-visually-hidden">Age and sex</dt><dd>{patient.age} years · {patient.sex}</dd></div>
          <div><dt>Date of birth</dt><dd><strong>{patient.dob}</strong></dd></div>
          <div>
            <dt>NHS number</dt>
            <dd>
              <span style={{ display: "inline-flex", alignItems: "center", gap: 8 }}>
                <strong>{patient.nhsNumber}</strong>
                <button
                  type="button"
                  className="ncrs-patient__copy"
                  onClick={copyNhsNumber}
                  aria-label={copied ? "NHS number copied to clipboard" : "Copy NHS number to clipboard"}
                  title="Copy NHS number"
                >
                  {copied ? <Check size={14} aria-hidden="true" /> : <Copy size={14} aria-hidden="true" />}
                </button>
              </span>
            </dd>
          </div>
          {patient.estimatedDueDate && (
            <div>
              <dt>Estimated due date</dt>
              <dd><strong>{patient.estimatedDueDate}</strong></dd>
            </div>
          )}
          {patient.gravida && (
            <div>
              <dt>Gravida</dt>
              <dd>
                <strong>{patient.gravida}</strong>
                {patient.gravidaDetail && (
                  <>
                    {" "}
                    <button
                      type="button"
                      className="ncrs-patient__fact-link"
                      aria-expanded={gravidaOpen}
                      aria-controls={gravidaDetailId}
                      onClick={() => setGravidaOpen((value) => !value)}
                    >
                      View detail
                    </button>
                    <span id={gravidaDetailId} className="ncrs-patient__fact-detail" hidden={!gravidaOpen}>
                      {patient.gravidaDetail}
                    </span>
                  </>
                )}
              </dd>
            </div>
          )}
          {patient.parity && (
            <div>
              <dt>Parity</dt>
              <dd>
                <strong>{patient.parity}</strong>
                {patient.parityDetail && (
                  <>
                    {" "}
                    <button
                      type="button"
                      className="ncrs-patient__fact-link"
                      aria-expanded={parityOpen}
                      aria-controls={parityDetailId}
                      onClick={() => setParityOpen((value) => !value)}
                    >
                      View detail
                    </button>
                    <span id={parityDetailId} className="ncrs-patient__fact-detail" hidden={!parityOpen}>
                      {patient.parityDetail}
                    </span>
                  </>
                )}
              </dd>
            </div>
          )}
          {patient.cSection && (
            <div>
              <dt>C-section</dt>
              <dd><strong>{patient.cSection}</strong></dd>
            </div>
          )}
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
