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
  /** Plain-words explanation of the trend, e.g. "Lost about 3 kg over 6 months" */
  note?: string;
  /** Extra content under the figure: a source tag, an action, an updated date */
  children?: ReactNode;
  onClick?: () => void;
};

/**
 * One measurement or score, shown big. The trend is an icon plus words, so direction
 * never depends on colour. Used for vitals and for the Clinical Frailty Scale.
 */
export function KeyFigure({ label, value, unit, size = "default", trend, note, children, onClick }: KeyFigureProps) {
  const Icon = trend ? trendIcon[trend] : null;
  const className = `key-figure key-figure--${size}${onClick ? " key-figure--clickable" : ""}`;

  const content = (
    <>
      <p className="key-figure__label">{label}</p>
      <p className="key-figure__value">
        {value}
        {unit && <span className="key-figure__unit"> {unit}</span>}
      </p>
      {trend && Icon && (
        <p className={`key-figure__trend key-figure__trend--${trend}`}>
          <Icon size={16} aria-hidden="true" />
          <span>
            <strong>{trendWord[trend]}.</strong> {note}
          </span>
        </p>
      )}
      {!trend && note && <p className="key-figure__note">{note}</p>}
      {children && <div className="key-figure__footer">{children}</div>}
    </>
  );

  if (onClick) {
    return (
      <button type="button" className={className} onClick={onClick} aria-label={`Open details for ${label}`}>
        {content}
      </button>
    );
  }

  return <div className={className}>{content}</div>;
}
