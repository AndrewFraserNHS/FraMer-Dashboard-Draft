import { formatDate } from "../data/patient";
import { useDetailPanel } from "../hooks/useDetailPanel";
import { ConnectedSystem, ConnectedSystems, systemStatusLabel } from "../components/ui/ConnectedSystems";
import { DetailList } from "../components/ui/DetailList";
import { RecordPage } from "../components/ui/RecordPage";

const systems: readonly ConnectedSystem[] = [
  { name: "BadgerNet Maternity", updated: `${formatDate("2026-10-05")}, 9:12am`, status: "primary" },
  { name: "GP record", updated: `${formatDate("2026-10-05")}, 8:45am`, status: "connected" },
  { name: "Lab results", updated: `${formatDate("2026-10-05")}, 7:30am`, status: "connected" },
  { name: "Diabetes service", updated: `${formatDate("2026-10-04")}, 4:20pm`, status: "connected" },
  { name: "Perinatal mental health", updated: `${formatDate("2026-10-03")}, 2:05pm`, status: "connected" },
  { name: "Ultrasound", updated: `${formatDate("2026-09-30")}, 10am`, status: "connected" },
  { name: "Social services", updated: `${formatDate("2026-10-02")}, 11:30am`, status: "connected" },
  { name: "Smoking cessation", updated: "No recent update", status: "offline" },
];

export default function Audit() {
  const openPanel = useDetailPanel();

  return (
    <RecordPage
      title="Audit"
      intro="Review connected record systems and the latest information-sharing updates."
      showSystems={false}
      className="audit-page"
    >
      <ConnectedSystems
        systems={systems}
        defaultOpen
        intro={`BadgerNet is the home system. Latest connected update: ${formatDate("2026-10-05")}, 9:12am.`}
        onSelect={(system) =>
          openPanel({
            eyebrow: "Connected system detail",
            title: system.name,
            content: (
              <DetailList
                rows={[
                  ["System or service", system.name],
                  ["Connection status", systemStatusLabel(system.status)],
                  ["Latest update", system.updated],
                  ["Patient", "Leila Khan"],
                  ["Record access", system.status === "offline" ? "Unavailable" : "Available in shared record"],
                  ["Data sharing", "Direct care"],
                ]}
              />
            ),
          })
        }
      />
    </RecordPage>
  );
}
