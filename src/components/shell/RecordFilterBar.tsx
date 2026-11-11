import { SelectField } from "../ui/FormField";

export type FilterDefinition = {
  label: string;
  /** The first option is "all" and is the default */
  options: readonly string[];
};

/** A row of labelled selects that narrows what the record pages show. Which filters exist is configuration, per view. */
export function RecordFilterBar({ filters }: { filters: readonly FilterDefinition[] }) {
  return (
    <section className="record-filterbar" aria-label="Record filters">
      <p className="record-filterbar__note">Prototype: these filters are not connected to the record yet.</p>
      {filters.map((filter) => (
        <SelectField key={filter.label} label={filter.label} options={filter.options} defaultValue={filter.options[0]} />
      ))}
    </section>
  );
}
