import { ReactNode, useId } from "react";
import { HeadingTag, useChildHeading } from "./HeadingLevel";

/** A headed group inside a DataSection. Gives the page a navigable heading outline. */
export function Subsection({
  title,
  aside,
  headingLevel,
  children,
}: {
  title: string;
  aside?: ReactNode;
  /** Override only when the surrounding heading level is not provided by a DataSection */
  headingLevel?: 3 | 4;
  children: ReactNode;
}) {
  const id = useId();
  const inherited = useChildHeading();
  const Heading: HeadingTag = headingLevel ? (`h${headingLevel}` as HeadingTag) : inherited;
  return (
    <div className="subsection" role="group" aria-labelledby={id}>
      <div className="subsection__header">
        <Heading id={id} className="subsection__title">
          {title}
        </Heading>
        {aside && <div className="subsection__aside">{aside}</div>}
      </div>
      {children}
    </div>
  );
}
