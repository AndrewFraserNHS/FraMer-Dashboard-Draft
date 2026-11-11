import { ReactNode, useEffect, useRef } from "react";
import { ChevronLeft } from "lucide-react";

export type DetailPanelProps = {
  title: string;
  eyebrow?: string;
  status?: string;
  tone?: "red" | "purple" | "blue" | "amber";
  content: ReactNode;
  onClose: () => void;
  isOpen: boolean;
  /** Visible text of the back control, e.g. "Back to Summary" */
  backLabel?: string;
};

export function DetailPanel({
  title,
  eyebrow,
  status,
  tone = "blue",
  content,
  onClose,
  isOpen,
  backLabel = "Back",
}: DetailPanelProps) {
  const headingRef = useRef<HTMLHeadingElement | null>(null);
  const onCloseRef = useRef(onClose);
  onCloseRef.current = onClose;

  // Move focus to the heading when the panel opens so the new context is announced.
  useEffect(() => {
    if (isOpen) headingRef.current?.focus();
  }, [isOpen]);

  useEffect(() => {
    if (!isOpen) return;
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") onCloseRef.current();
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <section className={`detail-panel tone-${tone}`} aria-labelledby="detail-panel-title">
      <div className={`detail-panel-header tone-${tone}`}>
        {/* No aria-label: the visible text is the accessible name */}
        <button
          type="button"
          onClick={onClose}
          className="detail-panel-back-button"
        >
          <ChevronLeft size={20} aria-hidden="true" />
          <span>{backLabel}</span>
        </button>
        <div className="detail-panel-heading-content">
          {eyebrow && <span className="detail-panel-eyebrow">{eyebrow}</span>}
          <h2 id="detail-panel-title" tabIndex={-1} ref={headingRef}>
            {title}
          </h2>
          {status && <b className="detail-panel-status">{status}</b>}
        </div>
      </div>
      <div className="detail-panel-body">{content}</div>
    </section>
  );
}
