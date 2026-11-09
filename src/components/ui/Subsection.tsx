import { ReactNode, useId } from "react";

/** A headed group inside a DataSection. Gives the page a navigable heading outline. */
export function Subsection({
  title,
  aside,
  headingLevel = 3,
  children,
}: {
  title: string;
  aside?: ReactNode;
  headingLevel?: 3 | 4;
  children: ReactNode;
}) {
  const id = useId();
  const Heading = `h${headingLevel}` as "h3" | "h4";
  return (
    <section className="subsection" aria-labelledby={id}>
      <div className="subsection__header">
        <Heading id={id} className="subsection__title">
          {title}
        </Heading>
        {aside && <div className="subsection__aside">{aside}</div>}
      </div>
      {children}
    </section>
  );
}
