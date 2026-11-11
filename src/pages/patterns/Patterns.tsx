import { useEffect } from "react";
import { Link } from "react-router-dom";
import { Callout } from "../../components/ui/Callout";
import { DataTable } from "../../components/ui/DataTable";
import { DisclosureGroup } from "../../components/ui/DisclosureGroup";
import { StatusTag, TagTone } from "../../components/ui/StatusTag";
import {
  Concern,
  Origin,
  originLabel,
  originMeaning,
  patternGroups,
  patterns,
  PatternNote,
  systemConcerns,
} from "../../data/patternNotes";
import { useMediaQuery } from "../../hooks/useMediaQuery";
import { demos } from "./demos";

const originTone: Record<Origin, TagTone> = { nhs: "green", adapted: "blue", custom: "purple" };
const levelTone: Record<NonNullable<Concern["level"]>, TagTone> = { high: "red", medium: "orange", low: "grey" };
const levelRank = { high: 0, medium: 1, low: 2 } as const;
const nhsLogoSrc = `${import.meta.env.BASE_URL}assets/images/NHS%2010mm%20-%20RGB%20Blue.jpg`;

type RegisterRow = {
  level: "high" | "medium" | "low" | "question";
  kind: string;
  area: string;
  text: string;
  status: "mitigated" | "open";
  mitigation?: string;
};

const register: RegisterRow[] = [
  ...patterns.flatMap((pattern) =>
    pattern.concerns.map((concern) => ({
      level: concern.kind === "question" ? ("question" as const) : (concern.level ?? "low"),
      kind: concern.kind === "question" ? "Question" : "Risk",
      area: pattern.name,
      text: concern.text,
      status: concern.status ?? "open",
      mitigation: concern.mitigation,
    })),
  ),
  ...systemConcerns.map((concern) => ({
    level: concern.kind === "question" ? ("question" as const) : (concern.level ?? "low"),
    kind: concern.kind === "question" ? "Question" : "Risk",
    area: `Whole prototype: ${concern.area}`,
    text: concern.text,
    status: concern.status ?? "open",
    mitigation: concern.mitigation,
  })),
];

const rank = (level: RegisterRow["level"]) => (level === "question" ? 3 : levelRank[level]);
const levelLabel = (level: RegisterRow["level"]) => (level === "question" ? "Question" : `${level[0].toUpperCase()}${level.slice(1)} risk`);

function ConcernList({ concerns }: { concerns: PatternNote["concerns"] }) {
  if (!concerns.length) return <p className="pl-note">None recorded.</p>;
  return (
    <ul className="pl-concerns">
      {concerns.map((concern) => (
        <li key={concern.text}>
          {concern.kind === "risk" ? (
            <StatusTag tone={levelTone[concern.level ?? "low"]}>{`${concern.level ?? "low"} risk`}</StatusTag>
          ) : (
            <StatusTag tone="yellow">Question</StatusTag>
          )}
          <span>{concern.text}</span>
          {concern.mitigation ? (
            <span className="pl-mitigation">
              <StatusTag tone="green">Mitigated</StatusTag> {concern.mitigation}
            </span>
          ) : (
            <span className="pl-mitigation pl-mitigation--open">
              <StatusTag tone="grey">Open</StatusTag> {concern.kind === "question" ? "Needs a decision." : "Needs sign-off or research."}
            </span>
          )}
        </li>
      ))}
    </ul>
  );
}

function PatternEntry({ pattern }: { pattern: PatternNote }) {
  return (
    <section className="pl-entry" id={pattern.id} aria-labelledby={`${pattern.id}-title`}>
      <div className="pl-entry__head">
        <h3 id={`${pattern.id}-title`}>{pattern.name}</h3>
        <StatusTag tone={originTone[pattern.origin]}>{originLabel[pattern.origin]}</StatusTag>
      </div>
      <p className="pl-entry__source">
        Source: <code>src/{pattern.source}</code>
      </p>
      <p>{pattern.summary}</p>

      <div className="pl-demo maternity-dashboard" role="group" aria-label={`Example: ${pattern.name}`}>
        <p className="pl-demo__label">Live example</p>
        <div className="pl-demo__body">{demos[pattern.id]}</div>
      </div>

      <div className="pl-columns">
        <div>
          <h4>Accessibility</h4>
          <ul className="pl-checks">
            {pattern.accessibility.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </div>
        <div>
          <h4>Risks and questions</h4>
          <ConcernList concerns={pattern.concerns} />
        </div>
      </div>
    </section>
  );
}

/**
 * The pattern library: every component we use, where it came from, what we did for accessibility,
 * and where we think there is risk or an open question. Content lives in src/data/patternNotes.ts.
 */
export default function Patterns() {
  // The contents list starts open beside the page, and closed above it on small screens
  const wide = useMediaQuery("(min-width: 900px)");
  useEffect(() => {
    document.title = "Pattern library — NHS National Care Records Service prototype";
  }, []);

  const counts = {
    origin: (origin: Origin) => patterns.filter((pattern) => pattern.origin === origin).length,
    high: register.filter((row) => row.level === "high").length,
    medium: register.filter((row) => row.level === "medium").length,
    low: register.filter((row) => row.level === "low").length,
    question: register.filter((row) => row.level === "question").length,
    mitigated: register.filter((row) => row.status === "mitigated").length,
    open: register.filter((row) => row.status === "open").length,
    openHigh: register.filter((row) => row.status === "open" && row.level === "high").length,
    mitigatedHigh: register.filter((row) => row.status === "mitigated" && row.level === "high").length,
  };

  return (
    <DisclosureGroup>
      <div className="record-shell text-medium pl-page">
        <a className="record-skip-link" href="#pl-main">
          Skip to main content
        </a>
        <header className="ncrs-service">
          <div className="ncrs-service__brand">
            <img className="ncrs-logo" src={nhsLogoSrc} alt="NHS" />
            <span className="ncrs-service__name">National Care Records Service</span>
          </div>
          <div className="ncrs-service__actions">
            <Link className="ncrs-service__link" to="/">
              Back to the record
            </Link>
          </div>
        </header>

        <div className="pl-layout">
          <nav className="pl-nav" aria-label="Pattern library contents">
            <details open={wide} key={String(wide)}>
              <summary>Contents</summary>
              <ul>
                <li>
                  <a href="#overview">Overview</a>
                </li>
                {patternGroups.map((group) => (
                  <li key={group}>
                    <a href={`#${group.replace(/\s+/g, "-").toLowerCase()}`}>
                      {group}
                    </a>
                    <ul>
                      {patterns
                        .filter((pattern) => pattern.group === group)
                        .map((pattern) => (
                          <li key={pattern.id}>
                            <a href={`#${pattern.id}`}>{pattern.name}</a>
                          </li>
                        ))}
                    </ul>
                  </li>
                ))}
                <li>
                  <a href="#register">Risk and question register</a>
                </li>
                <li>
                  <Link to="/maternity-content-pattern-library">
                    Content patterns (wording)
                  </Link>
                </li>
              </ul>
            </details>
          </nav>

          <main id="pl-main" className="pl-main" tabIndex={-1}>
            <h1>Pattern library</h1>
            <p className="pl-lede">
              The components behind this prototype of an NHS clinician
              interface. For each one: where it comes from, what we did for
              accessibility, and where we think there is risk or a question we
              cannot answer yet.
            </p>

            <section id="overview" aria-labelledby="overview-title">
              <h2 id="overview-title">Overview</h2>
              <p>
                {patterns.length} patterns. Everything here is built on the
                NHS.UK frontend CSS and aims for WCAG 2.2 AA. Further work is
                needed to test with assistive technology and users, so treat
                every accessibility note as a design intention, not a result.
              </p>

              <div className="pl-origins">
                {(Object.keys(originLabel) as Origin[]).map((origin) => (
                  <div key={origin} className="pl-origin">
                    <StatusTag tone={originTone[origin]}>
                      {originLabel[origin]}
                    </StatusTag>
                    <p className="pl-origin__count">{counts.origin(origin)}</p>
                    <p>{originMeaning[origin]}</p>
                  </div>
                ))}
              </div>

              <Callout tone="amber" title="Where we are" label="Note: ">
                {counts.mitigated} of {register.length} items are mitigated in
                code, including {counts.mitigatedHigh} high risks. {counts.open}{" "}
                stay open: {counts.question} questions that need a decision, and
                risks that need clinical safety review, user research or manual
                testing with assistive technology.{" "}
                <a href="#register">
                  See the register at the end of this page.
                </a>
              </Callout>

              <h3>How accessibility is handled across the library</h3>
              <ul className="pl-checks">
                <li>
                  Native elements first: button, dialog, select, dl, table. The
                  browser supplies keyboard, focus and screen reader behaviour.
                </li>
                <li>
                  Meaning is never colour alone. Status, priority and trend are
                  always text, and often an icon as well.
                </li>
                <li>
                  Every control has a visible label that is its accessible name.
                  Hints are text, not placeholders.
                </li>
                <li>
                  Anything that hides or removes content is reversible, and
                  focus moves to where the user needs it next.
                </li>
                <li>
                  No hover-only content. The yellow NHS focus style is kept on
                  every control.
                </li>
                <li>
                  Dragging has a button alternative. Overlays use the native
                  dialog or popover, so Escape and focus return work.
                </li>
              </ul>
            </section>

            {patternGroups.map((group) => (
              <section
                key={group}
                id={group.replace(/\s+/g, "-").toLowerCase()}
                aria-labelledby={`${group}-title`}
              >
                <h2 id={`${group}-title`}>{group}</h2>
                {patterns
                  .filter((pattern) => pattern.group === group)
                  .map((pattern) => (
                    <PatternEntry key={pattern.id} pattern={pattern} />
                  ))}
              </section>
            ))}

            <section id="register" aria-labelledby="register-title">
              <h2 id="register-title">Risk and question register</h2>
              <p>
                Every risk and question from this page in one table.{" "}
                {counts.high} high, {counts.medium} medium, {counts.low} low,{" "}
                {counts.question} questions. {counts.mitigated} mitigated,{" "}
                {counts.open} open. Sort by any column.
              </p>
              <DataTable
                caption="Risks and open questions"
                rows={register}
                rowKey={(row) => `${row.area}-${row.text}`}
                defaultSort={{ header: "Level", direction: "ascending" }}
                columns={[
                  {
                    header: "Level",
                    sort: (row) => rank(row.level),
                    cell: (row) => (
                      <StatusTag
                        tone={
                          row.level === "question"
                            ? "yellow"
                            : levelTone[row.level]
                        }
                      >
                        {levelLabel(row.level)}
                      </StatusTag>
                    ),
                  },
                  {
                    header: "Status",
                    sort: (row) => row.status,
                    cell: (row) => (
                      <StatusTag
                        tone={row.status === "mitigated" ? "green" : "grey"}
                      >
                        {row.status === "mitigated" ? "Mitigated" : "Open"}
                      </StatusTag>
                    ),
                  },
                  {
                    header: "Component",
                    cell: (row) => row.area,
                    sort: (row) => row.area,
                  },
                  {
                    header: "Detail",
                    cell: (row) => (
                      <>
                        {row.text}
                        {row.mitigation && (
                          <small>Mitigation: {row.mitigation}</small>
                        )}
                      </>
                    ),
                  },
                ]}
              />
            </section>

            <p className="prototype-note">Demo prototype – fictional data</p>
          </main>
        </div>
      </div>
    </DisclosureGroup>
  );
}
