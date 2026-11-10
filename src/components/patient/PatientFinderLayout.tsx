import { ReactNode } from "react";

/** Full-page frame for the find-a-patient flow: NHS bar, then one centred card. */
export function PatientFinderLayout({ back, children }: { back: ReactNode; children: ReactNode }) {
  return (
    <div className="patient-search-screen">
      <header>
        <span className="record-nhs-logo">NHS</span>
        <strong>National Care Records Service</strong>
      </header>
      <main>
        {back}
        {children}
      </main>
    </div>
  );
}
