import { useDetailPanel } from "./MaternityShell";
import { ConnectedSystem, ConnectedSystems, systemStatusLabel } from "./components/ui/ConnectedSystems";
import { DetailList } from "./components/ui/DetailList";
import { RecordPage } from "./components/ui/RecordPage";

const systems: readonly ConnectedSystem[] = [
  { name: "BadgerNet Maternity", updated: "5 October 2026, 9:12am", status: "primary" },
  { name: "GP record", updated: "5 October 2026, 8:45am", status: "connected" },
  { name: "Lab results", updated: "5 October 2026, 7:30am", status: "connected" },
  { name: "Diabetes service", updated: "4 October 2026, 4:20pm", status: "connected" },
  { name: "Perinatal mental health", updated: "3 October 2026, 2:05pm", status: "connected" },
  { name: "Ultrasound", updated: "30 September 2026, 10am", status: "connected" },
  { name: "Social services", updated: "2 October 2026, 11:30am", status: "connected" },
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
        intro="BadgerNet is the home system. Latest connected update: 5 October 2026, 9:12am."
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
