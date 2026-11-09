import { Callout, CalloutTone } from "./components/ui/Callout";
import { Priority, priorityLabel } from "./data/patient";

const tone: Record<Priority, CalloutTone> = {
  high: "red",
  medium: "amber",
  low: "blue",
};

/** A clinical risk, rendered with the shared Callout so every alert looks the same. */
export function RiskBanner({
  level,
  title,
  message,
  count,
}: {
  level: Priority;
  title: string;
  message?: string;
  count?: number;
}) {
  return (
    <Callout
      tone={tone[level]}
      label={`${priorityLabel[level]}: `}
      title={`${title}${count ? ` (${count})` : ""}`}
    >
      {message && <p>{message}</p>}
    </Callout>
  );
}

export function RiskBannerGroup({
  risks,
}: {
  risks: ReadonlyArray<{ id: string; level: Priority; title: string; message?: string }>;
}) {
  if (risks.length === 0) return null;

  const high = risks.filter((risk) => risk.level === "high");
  const medium = risks.filter((risk) => risk.level === "medium");
  const low = risks.filter((risk) => risk.level === "low");

  return (
    <section className="risk-banner-group" aria-label="Clinical alerts">
      {[...high, ...medium].map((risk) => (
        <RiskBanner key={risk.id} level={risk.level} title={risk.title} message={risk.message} />
      ))}
      {low.length > 0 && (
        <RiskBanner
          level="low"
          title="Low priority flags"
          message={low.map((risk) => risk.title).join(", ")}
          count={low.length}
        />
      )}
    </section>
  );
}
