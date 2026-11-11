import { useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { RecordPage } from "../../../components/ui/RecordPage";
import { frailtyConnectedSystems } from "../../../data/frailty";
import { CGA_BASE, checkPath } from "./model";

/** Confirmation: the NHS confirmation panel, then what to do next. */
export default function CgaDone() {
  const heading = useRef<HTMLHeadingElement>(null);
  useEffect(() => {
    document.title = "Assessment complete - Comprehensive Geriatric Assessment";
    heading.current?.focus();
  }, []);

  return (
    <RecordPage title="Comprehensive Geriatric Assessment" systems={frailtyConnectedSystems} showSystems={false}>
      <div className="nhsuk-panel nhsuk-panel--confirmation" role="status">
        <h2 className="nhsuk-panel__title" ref={heading} tabIndex={-1}>Assessment complete</h2>
        <div className="nhsuk-panel__body">The answers have been added to the patient record.</div>
      </div>
      <h2 className="nhsuk-heading-m">What happens next</h2>
      <ul className="nhsuk-list nhsuk-list--bullet">
        <li><Link to="/frailty/care-plan">Review the personalised care plan</Link>, which uses these answers.</li>
        <li><Link to="/frailty">Go back to the frailty snapshot</Link>.</li>
        <li><Link to={checkPath}>Check or change an answer</Link>.</li>
        <li><Link to={CGA_BASE}>Return to the assessment overview</Link>.</li>
      </ul>
    </RecordPage>
  );
}
