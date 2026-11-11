import { ReactNode } from "react";
import { AlertCircle, AlertOctagon, AlertTriangle, StickyNote } from "lucide-react";

export type CalloutTone = "red" | "amber" | "blue" | "grey";

const config = {
  red: { Icon: AlertOctagon, label: "Important: " },
  amber: { Icon: AlertTriangle, label: "Warning: " },
  blue: { Icon: AlertCircle, label: "Information: " },
  grey: { Icon: StickyNote, label: "Note: " },
} as const;

type CalloutProps = {
  tone: CalloutTone;
  title?: ReactNode;
  /** Replaces the hidden prefix read before the title, e.g. "High priority: " */
  label?: string;
  /** Originating record. Shown on its own line, never inline with the message. */
  source?: string;
  children?: ReactNode;
  /** Set when the callout appears after an action, so assistive technology announces it */
  live?: boolean;
};

/**
 * The one alert component. Used for clinical risk banners, warnings and notes.
 * The tone is also stated in hidden text, so it never relies on colour or icon alone.
 */
export function Callout({ tone, title, label, source, children, live }: CalloutProps) {
  const { Icon, label: defaultLabel } = config[tone];
  return (
    <div className={`callout callout--${tone}`} role={live ? "status" : undefined}>
      <Icon size={20} aria-hidden="true" className="callout__icon" />
      <div className="callout__content">
        {title && (
          <p className="callout__title">
            <span className="nhs-visually-hidden">{label ?? defaultLabel}</span>
            {title}
          </p>
        )}
        {children && <div className="callout__body">{children}</div>}
        {source && <p className="callout__source">Source: {source}</p>}
      </div>
    </div>
  );
}
