import { ReactNode } from "react";
import { Priority, priorityLabel } from "../../data/patient";

/** Priority tag. The text always carries the meaning; colour only reinforces it. */
export function PriorityTag({ level }: { level: Priority }) {
  return <b className={`priority ${level}`}>{priorityLabel[level]}</b>;
}

/** Result status tag (Abnormal / Borderline / Normal …). Always render the status text. */
export function ResultTag({ tone, children }: { tone: Priority; children: ReactNode }) {
  return <b className={`result-tag ${tone}`}>{children}</b>;
}

export type TagTone = "red" | "orange" | "yellow" | "green" | "blue" | "grey" | "purple";

/** NHS tag (nhsuk-tag). Use for status; the label text must say what the status is. */
export function StatusTag({ tone, children }: { tone: TagTone; children: ReactNode }) {
  return <strong className={`nhsuk-tag nhsuk-tag--${tone}`}>{children}</strong>;
}

/** Where a piece of information came from. */
export function SourceTag({ children }: { children: ReactNode }) {
  return <span className="source-tag">{children}</span>;
}
