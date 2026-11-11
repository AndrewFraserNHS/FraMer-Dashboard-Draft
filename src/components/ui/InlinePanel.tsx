import { ReactNode, useEffect, useId, useRef } from "react";

type InlinePanelProps = {
  open: boolean;
  title: string;
  children: ReactNode;
  footer?: ReactNode;
};

/** Reveals related content in the page flow without an overlay or focus trap. */
export function InlinePanel({ open, title, children, footer }: InlinePanelProps) {
  const titleId = useId();
  const heading = useRef<HTMLHeadingElement>(null);
  const trigger = useRef<HTMLElement | null>(null);
  const wasOpen = useRef(false);

  useEffect(() => {
    if (open && !wasOpen.current) {
      trigger.current = document.activeElement instanceof HTMLElement ? document.activeElement : null;
      heading.current?.focus();
    } else if (!open && wasOpen.current) {
      if (trigger.current?.isConnected && trigger.current.getClientRects().length > 0) {
        trigger.current.focus();
      } else {
        document.getElementById("main-content")?.focus();
      }
      trigger.current = null;
    }
    wasOpen.current = open;
  }, [open]);

  if (!open) return null;

  return (
    <section className="ncrs-inline-panel" role="region" aria-labelledby={titleId}>
      <h2 id={titleId} ref={heading} className="ncrs-inline-panel__title" tabIndex={-1}>
        {title}
      </h2>
      {children}
      {footer && <div className="ncrs-inline-panel__footer">{footer}</div>}
    </section>
  );
}
