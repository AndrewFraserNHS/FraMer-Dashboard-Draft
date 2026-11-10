import { ReactNode } from "react";
const nhsLogoSrc = "/assets/images/NHS%2010mm%20-%20RGB%20Blue.jpg";

/** Full-page frame for the find-a-patient flow: NHS bar, then one centred card. */
export function PatientFinderLayout({ back, children }: { back: ReactNode; children: ReactNode }) {
  return (
    <div className="patient-search-screen">
      <header>
        <img className="record-nhs-logo-image" src={nhsLogoSrc} alt="NHS" />
        <strong>National Care Records Service</strong>
      </header>
      <main>
        {back}
        {children}
      </main>
    </div>
  );
}
