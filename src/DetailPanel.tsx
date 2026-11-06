import { ReactNode } from "react";
import { ChevronLeft } from "lucide-react";

export type DetailPanelProps = {
  title: string;
  eyebrow?: string;
  status?: string;
  tone?: "red" | "purple" | "blue" | "amber";
  content: ReactNode;
  onClose: () => void;
  isOpen: boolean;
};

export function DetailPanel({
  title,
  eyebrow,
  status,
  tone = "blue",
  content,
  onClose,
  isOpen,
}: DetailPanelProps) {
  if (!isOpen) return null;

  return (
    <div 
      className="detail-panel" 
      role="region" 
      aria-labelledby="detail-panel-title"
    >
      <div className={`detail-panel-header tone-${tone}`}>
        <button
          onClick={onClose}
          aria-label={`Close ${title} details`}
          className="detail-panel-back-button"
        >
          <ChevronLeft size={20} />
          <span>Back</span>
        </button>
        <div className="detail-panel-heading-content">
          {eyebrow && <span className="detail-panel-eyebrow">{eyebrow}</span>}
          <h2 id="detail-panel-title">{title}</h2>
          {status && <b className="detail-panel-status">{status}</b>}
        </div>
      </div>
      <div className="detail-panel-body">{content}</div>
    </div>
  );
}
