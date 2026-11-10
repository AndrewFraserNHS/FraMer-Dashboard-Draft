import { FormEvent, useState } from "react";
import { BackLink } from "../ui/BackLink";
import { Button } from "../ui/Button";
import { ErrorSummary } from "../ui/ErrorSummary";
import { TextField } from "../ui/FormField";
import { ToggleGroup } from "../ui/ToggleGroup";
import { PatientFinderLayout } from "./PatientFinderLayout";

type Mode = "nhs-number" | "demographics";
type Errors = { nhsNumber?: string; fullName?: string; dob?: string };

// The prototype only knows one (fictional) patient
const KNOWN = { nhsNumber: "4857772910", name: "leila", dob: "1995-06-14" };

function validate(mode: Mode, values: { nhsNumber: string; fullName: string; dob: string }): Errors {
  if (mode === "nhs-number") {
    return values.nhsNumber.replace(/\s/g, "") === KNOWN.nhsNumber
      ? {}
      : { nhsNumber: "Enter the fictional NHS number 485 777 2910" };
  }
  const errors: Errors = {};
  if (!values.fullName.trim().toLowerCase().includes(KNOWN.name)) errors.fullName = "Enter the fictional patient name, Leila Khan";
  if (values.dob !== KNOWN.dob) errors.dob = "Enter the fictional date of birth, 14 June 1995";
  return errors;
}

const fieldIds = { nhsNumber: "search-nhs-number", fullName: "search-full-name", dob: "search-dob" } as const;

/** First step of finding a patient: search by NHS number or by name and date of birth. */
export function PatientSearchScreen({ onFound, onCancel }: { onFound: () => void; onCancel: () => void }) {
  const [mode, setMode] = useState<Mode>("nhs-number");
  const [values, setValues] = useState({ nhsNumber: "", fullName: "", dob: "" });
  const [errors, setErrors] = useState<Errors>({});
  const [searching, setSearching] = useState(false);
  const set = (key: keyof typeof values) => (event: { target: { value: string } }) =>
    setValues((current) => ({ ...current, [key]: event.target.value }));

  function search(event: FormEvent) {
    event.preventDefault();
    const found = validate(mode, values);
    setErrors(found);
    if (Object.keys(found).length) return;
    setSearching(true);
    window.setTimeout(() => {
      setSearching(false);
      onFound();
    }, 450);
  }

  const summary = (Object.keys(errors) as (keyof Errors)[]).map((key) => ({ text: errors[key]!, fieldId: fieldIds[key] }));

  return (
    <PatientFinderLayout back={<BackLink onClick={onCancel}>Back to patient record</BackLink>}>
      <div className="patient-search-card">
        <h1>Find a patient</h1>
        <p>Search for a patient before accessing their national care record.</p>
        <ToggleGroup
          label="Search by"
          value={mode}
          onChange={(next) => {
            setMode(next);
            setErrors({});
          }}
          options={[
            { value: "nhs-number", label: "NHS number" },
            { value: "demographics", label: "Name and date of birth" },
          ]}
        />
        <form onSubmit={search} noValidate>
          <ErrorSummary items={summary} />
          {mode === "nhs-number" ? (
            <TextField
              id={fieldIds.nhsNumber}
              label="NHS number"
              hint="For example, 485 777 2910"
              inputMode="numeric"
              autoComplete="off"
              required
              value={values.nhsNumber}
              onChange={set("nhsNumber")}
              error={errors.nhsNumber}
            />
          ) : (
            <>
              <TextField
                id={fieldIds.fullName}
                label="Full name"
                hint="For example, Leila Khan"
                autoComplete="off"
                required
                value={values.fullName}
                onChange={set("fullName")}
                error={errors.fullName}
              />
              <TextField
                id={fieldIds.dob}
                label="Date of birth"
                type="date"
                required
                value={values.dob}
                onChange={set("dob")}
                error={errors.dob}
              />
            </>
          )}
          <Button type="submit" disabled={searching}>
            {searching ? "Searching…" : "Search"}
          </Button>
        </form>
      </div>
    </PatientFinderLayout>
  );
}
