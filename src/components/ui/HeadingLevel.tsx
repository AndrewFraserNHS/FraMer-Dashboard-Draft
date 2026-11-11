import { createContext, useContext } from "react";

/** The level of the nearest enclosing section heading, so nested headings never skip a level. */
export const HeadingLevelContext = createContext<2 | 3 | 4>(2);

export type HeadingTag = "h2" | "h3" | "h4" | "h5";

/** The heading tag one level below the enclosing section. */
export function useChildHeading(): HeadingTag {
  const parent = useContext(HeadingLevelContext);
  return `h${Math.min(parent + 1, 5)}` as HeadingTag;
}
