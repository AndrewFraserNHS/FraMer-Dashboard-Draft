import { ReactNode, useEffect, useId, useRef } from "react";
import { X } from "lucide-react";

type DrawerProps = {
  open: boolean;
  title: string;
  onClose: () => void;
  children: ReactNode;
};

/**
 * Side sheet on the native <dialog> element, the same way as Dialog: the browser provides the focus
 * trap, inert background, Escape to close and focus return to the control that opened it.
 * Unlike Dialog it stays mounted, so state inside it (open menus, text size) is kept between openings.
 */
export function Drawer({ open, title, onClose, children }: DrawerProps) {
  const ref = useRef<HTMLDialogElement>(null);
  const titleId = useId();

  useEffect(() => {
    const dialog = ref.current;
    if (!dialog) return;
    if (open && !dialog.open) dialog.showModal();
    if (!open && dialog.open) dialog.close();
  }, [open]);

  return (
    <dialog
      ref={ref}
      className="ncrs-drawer"
      aria-labelledby={titleId}
      onClose={onClose}
      onClick={(event) => {
        if (event.target === ref.current) onClose();
      }}
    >
      <div className="ncrs-drawer__header">
        <h2 id={titleId} className="ncrs-drawer__title">{title}</h2>
        <button type="button" className="ncrs-drawer__close" onClick={onClose}>
          <X size={18} aria-hidden="true" />
          Close
        </button>
      </div>
      <div className="ncrs-drawer__body">{children}</div>
    </dialog>
  );
}
