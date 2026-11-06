import { ReactNode } from "react";
import {
  AlertOctagon,
  AlertTriangle,
  AlertCircle,
} from "lucide-react";

type RiskLevel = "high" | "medium" | "low";

export function RiskBanner({
  level,
  title,
  message,
  count,
}: {
  level: RiskLevel;
  title: string;
  message?: string;
  count?: number;
}) {
  const icons = {
    high: AlertOctagon,
    medium: AlertTriangle,
    low: AlertCircle,
  };

  const IconComponent = icons[level];
  const colorClass = level === "high" ? "high" : level === "medium" ? "medium" : "low";

  return (
    <div className={`risk-banner ${colorClass}`}>
      <div className="risk-banner-icon">
        <IconComponent size={20} aria-hidden="true" />
      </div>
      <div className="risk-banner-content">
        <p className="risk-banner-title">
          {title} {count && `(${count})`}
        </p>
        {message && <p className="risk-banner-message">{message}</p>}
      </div>
    </div>
  );
}

export function RiskBannerGroup({ risks }: { risks: Array<{ level: RiskLevel; title: string; message?: string }> }) {
  if (risks.length === 0) return null;

  const highRisks = risks.filter((r) => r.level === "high");
  const mediumRisks = risks.filter((r) => r.level === "medium");
  const lowRisks = risks.filter((r) => r.level === "low");

  return (
    <div className="risk-banner-group">
      {highRisks.map((risk) => (
        <RiskBanner
          key={risk.title}
          level="high"
          title={risk.title}
          message={risk.message}
        />
      ))}
      {mediumRisks.map((risk) => (
        <RiskBanner
          key={risk.title}
          level="medium"
          title={risk.title}
          message={risk.message}
        />
      ))}
      {lowRisks.length > 0 && (
        <RiskBanner
          level="low"
          title="Low priority flags"
          message={lowRisks.map((r) => r.title).join(", ")}
          count={lowRisks.length}
        />
      )}
    </div>
  );
}
