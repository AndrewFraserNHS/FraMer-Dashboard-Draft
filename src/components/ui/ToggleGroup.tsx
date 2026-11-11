type Option<V extends string> = { value: V; label: string; count?: number };

/** A set of buttons where one is pressed. Replaces clickable <div> "chips". */
export function ToggleGroup<V extends string>({
  label,
  options,
  value,
  onChange,
  status,
}: {
  label: string;
  options: readonly Option<V>[];
  value: V;
  onChange: (value: V) => void;
  /** Announced politely after a change, e.g. "Showing 4 of 12 results". Say what is now shown. */
  status?: string;
}) {
  return (
    <>
    <div className="toggle-group" role="group" aria-label={label}>
      <span className="toggle-group__label" aria-hidden="true">
        {label}
      </span>
      {options.map((option) => (
        <button
          key={option.value}
          type="button"
          className="toggle-group__button"
          aria-pressed={value === option.value}
          onClick={() => onChange(option.value)}
        >
          {option.label}
          {option.count !== undefined && (
            <span className="toggle-group__count">{option.count}</span>
          )}
        </button>
      ))}
    </div>
    {status !== undefined && <p role="status" className="nhs-visually-hidden">{status}</p>}
    </>
  );
}
