import { ReactNode } from "react";
import { ArrowDown, ArrowUp, Minus } from "lucide-react";

export type FigureTrend = "up" | "down" | "stable";

const trendIcon = { up: ArrowUp, down: ArrowDown, stable: Minus } as const;
const trendWord = { up: "Rising", down: "Falling", stable: "Stable" } as const;

type KeyFigureProps = {
  label: string;
  value: ReactNode;
  unit?: string;
  size?: "default" | "large";
  trend?: FigureTrend;
  /** The trend is worrying, not just a direction. Only then is it drawn in red; rising or falling alone is neutral. */
  concern?: boolean;
  /** Plain-words explanation of the trend, e.g. "Lost about 3 kg over 6 months" */
  note?: string;
  /** Extra content under the figure: a source tag, an action, an updated date */
  children?: ReactNode;
  /** Opens more detail. Shown as a real button under the figure, never by making the whole figure a button,
   *  because a figure can also hold its own links and source tags and buttons must not nest. */
  onOpen?: () => void;
  /** Visible text of that button, e.g. "View scale details" */
  openLabel?: string;
};

/**
 * One measurement or score, shown big. The trend is an icon plus words, so direction
 * never depends on colour. Used for vitals and for the Clinical Frailty Scale.
 */
export function KeyFigure({ label, value, unit, size = "default", trend, concern, note, children, onOpen, openLabel = "View details" }: KeyFigureProps) {
  const Icon = trend ? trendIcon[trend] : null;
  const className = `key-figure key-figure--${size}`;

  return (
    <div className={className}>
      <p className="key-figure__label">{label}</p>
      <p className="key-figure__value">
        {value}
        {unit && <span className="key-figure__unit"> {unit}</span>}
      </p>
      {trend && Icon && (
        <p className={`key-figure__trend key-figure__trend--${trend}${concern ? " key-figure__trend--concern" : ""}`}>
          <Icon size={16} aria-hidden="true" />
          <span>
            <strong>{trendWord[trend]}.</strong> {note}
          </span>
        </p>
      )}
      {!trend && note && <p className="key-figure__note">{note}</p>}
      {(children || onOpen) && (
        <div className="key-figure__footer">
          {children}
          {onOpen && (
            <button type="button" className="link-button" onClick={onOpen}>
              {openLabel}
              <span className="nhs-visually-hidden"> for {label}</span>
            </button>
          )}
        </div>
      )}
    </div>
  );
}
