import { ReactNode, useEffect, useId, useRef } from "react";

type DialogProps = {
  open: boolean;
  title: string;
  onClose: () => void;
  children: ReactNode;
  footer?: ReactNode;
  /** Clicking outside closes the dialog. Turn off for dialogs that hold a form, so a stray click never discards input. */
  closeOnBackdrop?: boolean;
};

/**
 * Modal dialog on the native <dialog> element: the browser provides the focus trap,
 * inert background, Escape to close and focus return to the trigger.
 * Children only render while open, so internal state resets each time.
 */
export function Dialog({ open, title, onClose, children, footer, closeOnBackdrop = true }: DialogProps) {
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
      className="ncrs-dialog"
      aria-labelledby={titleId}
      onClose={onClose}
      onClick={(event) => {
        if (closeOnBackdrop && event.target === ref.current) onClose();
      }}
    >
      {open && (
        <div className="ncrs-dialog__inner">
          <h2 id={titleId} className="ncrs-dialog__title">
            {title}
          </h2>
          {children}
          {footer && <div className="ncrs-dialog__footer">{footer}</div>}
        </div>
      )}
    </dialog>
  );
}
