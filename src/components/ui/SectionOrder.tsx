import { createContext, useContext } from "react";

/** Reorderable Summary sections. The AI summary is pinned above them and not listed. */
export const defaultSectionOrder = [
  "Clinical risks",
  "Pregnancy conditions",
  "Social context",
  "Test results",
  "Care plans",
  "Medicines",
  "Clinical events",
  "Documents",
  "Upcoming care",
  "Care team",
] as const;

export type SectionName = (typeof defaultSectionOrder)[number];

export const SectionOrderContext = createContext<readonly string[]>(defaultSectionOrder);

export const useSectionOrder = () => useContext(SectionOrderContext);
