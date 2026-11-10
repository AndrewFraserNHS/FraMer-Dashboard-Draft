import { Button } from "../ui/Button";
import { BackLink } from "../ui/BackLink";
import { DetailList } from "../ui/DetailList";
import { Callout } from "../ui/Callout";
import { PatientFinderLayout } from "./PatientFinderLayout";
import { recordViews } from "../../views";

const patient = recordViews.maternity.patient;

/** Second step: check the right patient was found, and acknowledge that access is audited. */
export function PatientConfirmScreen({ onConfirm, onBack }: { onConfirm: () => void; onBack: () => void }) {
  return (
    <PatientFinderLayout back={<BackLink onClick={onBack}>Back to search</BackLink>}>
      <div className="patient-search-card patient-confirm-card">
        <p className="confirm-eyebrow">Patient found</p>
        <h1>Confirm patient details</h1>
        <DetailList
          rows={[
            ["Name", patient.name],
            ["Date of birth", `${patient.dob} (${patient.age} years)`],
            ["NHS number", patient.nhsNumber],
            ["Address", patient.address],
          ]}
        />
        <Callout tone="amber" title="Check your legitimate relationship">
          Only access this record when you have a legitimate relationship with the patient. Access will be recorded in
          the audit log.
        </Callout>
        <div className="page-steps">
          <Button onClick={onConfirm}>Confirm and open record</Button>
          <Button variant="secondary" onClick={onBack}>Back</Button>
        </div>
      </div>
    </PatientFinderLayout>
  );
}
