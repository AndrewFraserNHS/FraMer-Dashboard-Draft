import { useId, useState } from "react";

export type SortValue = "date-desc" | "date-asc" | "az" | "za";

const options: ReadonlyArray<readonly [SortValue, string]> = [
  ["date-desc", "Newest first"],
  ["date-asc", "Oldest first"],
  ["az", "A–Z"],
  ["za", "Z–A"],
];

type SortSelectProps = {
  /** What is being sorted, e.g. "medicines" */
  label: string;
  value: SortValue;
  onChange: (value: SortValue) => void;
  count: number;
};

/** Visible label plus a polite announcement after the list re-sorts. */
export function SortSelect({ label, value, onChange, count }: SortSelectProps) {
  const id = useId();
  const [announcement, setAnnouncement] = useState("");

  return (
    <div className="dash-sort-field">
      <label htmlFor={id}>Sort {label}</label>
      <select
        id={id}
        className="dash-sort"
        value={value}
        onChange={(event) => {
          const next = event.target.value as SortValue;
          onChange(next);
          const name = options.find(([option]) => option === next)?.[1];
          setAnnouncement(`${count} ${label} sorted: ${name}`);
        }}
      >
        {options.map(([option, name]) => (
          <option key={option} value={option}>
            {name}
          </option>
        ))}
      </select>
      <span role="status" className="nhs-visually-hidden">
        {announcement}
      </span>
    </div>
  );
}
