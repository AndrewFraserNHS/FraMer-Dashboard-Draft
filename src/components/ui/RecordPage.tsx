import { ReactNode } from "react";
import { ConnectedSystems } from "./ConnectedSystems";
import { connectedSystems } from "../../data/systems";

/**
 * Standard layout for every record tab: one h1, optional intro, stacked sections,
 * the connected-systems panel and the prototype note. The shell already supplies the
 * header, patient banner and navigation, so pages must not render their own.
 */
export function RecordPage({
  title,
  intro,
  showSystems = true,
  className = "",
  children,
}: {
  title: string;
  intro?: ReactNode;
  showSystems?: boolean;
  className?: string;
  children: ReactNode;
}) {
  return (
    <div className={`ncrs-app maternity-dashboard ${className}`}>
      <div className="ncrs-main">
        <h1 className="record-page-title">{title}</h1>
        {intro && <p className="record-page-intro">{intro}</p>}
        <div className="record-page-stack">
          {children}
          {showSystems && <ConnectedSystems systems={connectedSystems} />}
        </div>
      </div>
      <p className="prototype-note">Demo prototype – fictional data</p>
    </div>
  );
}
