import { ReactNode } from "react";
import { Priority, priorityLabel } from "../../data/patient";

/** Priority tag. The text always carries the meaning; colour only reinforces it. */
export function PriorityTag({ level }: { level: Priority }) {
  const tone: Record<Priority, TagTone> = {
    high: "red",
    medium: "orange",
    low: "green",
  };
  return <StatusTag tone={tone[level]}>{priorityLabel[level]}</StatusTag>;
}

/** Result status tag (Abnormal / Borderline / Normal …). Always render the status text. */
export function ResultTag({ tone, children }: { tone: Priority; children: ReactNode }) {
  const statusTone: Record<Priority, TagTone> = {
    high: "red",
    medium: "orange",
    low: "green",
  };
  return <StatusTag tone={statusTone[tone]}>{children}</StatusTag>;
}

/**
 * One colour per meaning, used everywhere. Borderline and medium priority are both orange, so the same
 * state never appears in two different colours on different pages.
 */
export const meaningTone = {
  critical: "red",
  warning: "orange",
  ok: "green",
  info: "blue",
  neutral: "grey",
} as const satisfies Record<string, TagTone>;

export type TagTone = "red" | "orange" | "yellow" | "green" | "blue" | "grey" | "purple";

/** NHS tag (nhsuk-tag). Use for status; the label text must say what the status is. */
export function StatusTag({ tone, children }: { tone: TagTone; children: ReactNode }) {
  return <span className={`nhsuk-tag nhsuk-tag--${tone}`}>{children}</span>;
}

/** Where a piece of information came from. */
export function SourceTag({ children }: { children: ReactNode }) {
  return <span className="source-tag nhsuk-tag nhsuk-tag--white">{children}</span>;
}
