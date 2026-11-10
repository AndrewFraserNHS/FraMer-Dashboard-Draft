/**
 * Scenario clocks. The prototype's patient records are authored with fixed calendar dates, but a
 * record that says "today" in October 2026 looks stale in November. A clock maps the date the
 * scenario treats as "today" onto the real today, so every authored date keeps its distance from
 * now (an appointment "5 days ago" stays 5 days ago). Authors still write plain ISO dates.
 */
const DAY_MS = 86_400_000;
const MONTHS_LONG = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

const utcDay = (iso: string) => {
  const [y, m, d] = iso.split("-").map(Number);
  return Date.UTC(y, m - 1, d);
};

const startOfToday = () => {
  const now = new Date();
  return Date.UTC(now.getFullYear(), now.getMonth(), now.getDate());
};

export type ScenarioClock = {
  /** Shifted date for an authored ISO date, as yyyy-mm-dd */
  iso: (authored: string) => string;
  /** "5 September 2026" */
  long: (authored: string) => string;
  /** "05 Sep 2026" */
  short: (authored: string) => string;
  /** "September 2026" */
  month: (authored: string) => string;
};

/** @param scenarioToday The authored ISO date that the scenario treats as today. */
export function createScenarioClock(scenarioToday: string): ScenarioClock {
  const offset = startOfToday() - utcDay(scenarioToday);
  const shift = (authored: string) => new Date(utcDay(authored) + offset);
  const parts = (authored: string) => {
    const date = shift(authored);
    return { d: date.getUTCDate(), m: date.getUTCMonth(), y: date.getUTCFullYear() };
  };
  return {
    iso: (authored) => shift(authored).toISOString().slice(0, 10),
    long: (authored) => {
      const { d, m, y } = parts(authored);
      return `${d} ${MONTHS_LONG[m]} ${y}`;
    },
    short: (authored) => {
      const { d, m, y } = parts(authored);
      return `${String(d).padStart(2, "0")} ${MONTHS_LONG[m].slice(0, 3)} ${y}`;
    },
    month: (authored) => {
      const { m, y } = parts(authored);
      return `${MONTHS_LONG[m]} ${y}`;
    },
  };
}

/** Whole days between two ISO dates, for sorting and "N days ago" labels. */
export const daysBetween = (fromIso: string, toIso: string) => Math.round((utcDay(toIso) - utcDay(fromIso)) / DAY_MS);
