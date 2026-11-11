import type { ProgressSection } from "../../../components/ui/AssessmentProgress";
import { cgaDomains, type CgaDomain, type CgaField } from "../../../data/frailty";

export const CGA_BASE = "/frailty/cga/v2";
export const questionPath = (stepId: string) => `${CGA_BASE}/question/${stepId}`;
export const checkPath = `${CGA_BASE}/check`;
export const donePath = `${CGA_BASE}/done`;

export type Step = {
  id: string;
  kind: "prompt" | "field";
  domain: CgaDomain;
  prompt?: { id: string; text: string };
  field?: CgaField;
  /** From 1, across the whole assessment */
  number: number;
  /** From 1, inside the section */
  inSection: number;
  sectionTotal: number;
};

/** What the clinician said about a pre-filled item */
export type Review = "confirmed" | "changed";

export type Answer = {
  /** Finished: answered, or deliberately skipped */
  done: true;
  skipped?: boolean;
  review?: Review;
  text?: string;
  choice?: string;
};
export type Answers = Record<string, Answer>;

/** The assessment as a flat list of pages: one page per suggestion and one page per question. */
export const steps: readonly Step[] = (() => {
  const list: Step[] = [];
  let number = 0;
  for (const domain of cgaDomains) {
    const sectionTotal = domain.fields.length + (domain.prompts?.length ?? 0);
    let inSection = 0;
    const add = (partial: Pick<Step, "id" | "kind" | "field" | "prompt">) => {
      number += 1;
      inSection += 1;
      list.push({ ...partial, domain, number, inSection, sectionTotal });
    };
    for (const prompt of domain.prompts ?? []) {
      add({ id: prompt.id, kind: "prompt", prompt });
    }
    for (const field of domain.fields) add({ id: field.id, kind: "field", field });
  }
  return list;
})();

export const totalQuestions = steps.length;
export const stepIndex = (id: string | undefined) => steps.findIndex((step) => step.id === id);
export const firstUnfinished = (answers: Answers) => steps.find((step) => !answers[step.id]);

export function sectionsFor(answers: Answers): ProgressSection[] {
  return cgaDomains.map((domain) => {
    const inDomain = steps.filter((step) => step.domain.id === domain.id);
    return {
      id: domain.id,
      title: domain.title,
      done: inDomain.filter((step) => answers[step.id]).length,
      total: inDomain.length,
      to: questionPath(inDomain[0].id),
    };
  });
}

/** The value the connected system holds for this question, as text. */
export function systemValue(field: CgaField): string | undefined {
  if (field.prefill) return field.prefill;
  if (field.kind === "choice" && field.initialChoice) return field.options?.find((option) => option.value === field.initialChoice)?.label;
  return undefined;
}

export const optionLabel = (field: CgaField, value?: string) => field.options?.find((option) => option.value === value)?.label;
