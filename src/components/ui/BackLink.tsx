import { ChevronLeft } from "lucide-react";
import { ReactNode } from "react";

/** NHS back link as a button, for steps in a flow where going back is an action rather than a URL. */
export function BackLink({ onClick, children }: { onClick: () => void; children: ReactNode }) {
  return (
    <button type="button" className="back-link" onClick={onClick}>
      <ChevronLeft size={18} aria-hidden="true" />
      {children}
    </button>
  );
}
