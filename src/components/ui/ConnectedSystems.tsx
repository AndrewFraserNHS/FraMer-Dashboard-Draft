import { ReactNode } from "react";
import { RowChevron } from "./RowChevron";
import { DataSection } from "./DataSection";
import { StatusTag, TagTone } from "./StatusTag";

export type SystemStatus = "primary" | "connected" | "partial" | "offline";

export type ConnectedSystem = {
  name: string;
  updated: string;
  status: SystemStatus;
};

const statusDisplay: Record<SystemStatus, { label: string; tone: TagTone }> = {
  primary: { label: "Primary Record", tone: "blue" },
  connected: { label: "Connected", tone: "green" },
  partial: { label: "Partially connected", tone: "yellow" },
  offline: { label: "Not connected", tone: "grey" },
};

export const systemStatusLabel = (status: SystemStatus) => statusDisplay[status].label;

type Props = {
  systems: readonly ConnectedSystem[];
  title?: string;
  defaultOpen?: boolean;
  intro?: ReactNode;
  /** When set, each system is a button (for example to open a detail panel) */
  onSelect?: (system: ConnectedSystem) => void;
};

export function ConnectedSystems({
  systems,
  title = "Connected systems",
  defaultOpen = false,
  intro,
  onSelect,
}: Props) {
  const connected = systems.filter(
    (system) => system.status === "primary" || system.status === "connected",
  ).length;

  return (
    <DataSection
      title={title}
      summary={`${connected} of ${systems.length} connected`}
      defaultOpen={defaultOpen}
      className="systems-section"
    >
      {intro && <p className="systems-intro">{intro}</p>}
      <ul className="systems-grid">
        {systems.map((system) => {
          const { label, tone } = statusDisplay[system.status];
          const body = (
            <>
              <span className="systems-grid__text">
                <strong>{system.name}</strong>
                <small>Latest update: {system.updated}</small>
              </span>
              <StatusTag tone={tone}>{label}</StatusTag>
              {onSelect && <RowChevron />}
            </>
          );
          return (
            <li key={system.name}>
              {onSelect ? (
                <button
                  type="button"
                  className="systems-grid__item"
                  onClick={() => onSelect(system)}
                >
                  {body}
                </button>
              ) : (
                <div className="systems-grid__item">{body}</div>
              )}
            </li>
          );
        })}
      </ul>
    </DataSection>
  );
}
