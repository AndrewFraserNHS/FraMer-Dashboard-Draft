import { ReactNode, useEffect, useId, useRef, useState } from "react";
import { Check, ChevronDown } from "lucide-react";

export type MenuItem = {
  label: string;
  icon?: ReactNode;
  onSelect: () => void;
  /** Draws a divider above this item */
  separatorBefore?: boolean;
  /** The selected item. Stated in text and with aria-current. */
  current?: boolean;
  /** Visible second line, e.g. why an item is unavailable */
  hint?: string;
  /** Stays focusable (aria-disabled) so its reason can be read, but does nothing */
  disabled?: boolean;
};

type MenuButtonProps = {
  label: ReactNode;
  items: readonly MenuItem[];
  className?: string;
};

/**
 * Disclosure menu: a button that shows a list of action buttons.
 * Escape closes it and returns focus, clicking outside closes it, and the arrow keys
 * move between items. Uses aria-expanded rather than role="menu", so every action stays
 * an ordinary button in the tab order.
 */
export function MenuButton({ label, items, className = "" }: MenuButtonProps) {
  const [open, setOpen] = useState(false);
  const root = useRef<HTMLDivElement | null>(null);
  const trigger = useRef<HTMLButtonElement | null>(null);
  const id = useId();

  useEffect(() => {
    if (!open) return;
    const onPointerDown = (event: PointerEvent) => {
      if (!root.current?.contains(event.target as Node)) setOpen(false);
    };
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setOpen(false);
        trigger.current?.focus();
      }
    };
    window.addEventListener("pointerdown", onPointerDown);
    window.addEventListener("keydown", onKeyDown);
    return () => {
      window.removeEventListener("pointerdown", onPointerDown);
      window.removeEventListener("keydown", onKeyDown);
    };
  }, [open]);

  function moveFocus(event: React.KeyboardEvent<HTMLUListElement>) {
    if (event.key !== "ArrowDown" && event.key !== "ArrowUp") return;
    event.preventDefault();
    const buttons = Array.from(event.currentTarget.querySelectorAll<HTMLButtonElement>("button"));
    const current = buttons.indexOf(document.activeElement as HTMLButtonElement);
    const step = event.key === "ArrowDown" ? 1 : -1;
    buttons[(current + step + buttons.length) % buttons.length]?.focus();
  }

  return (
    <div className={`ncrs-menu ${className}`} ref={root}>
      <button
        ref={trigger}
        type="button"
        className="ncrs-menu__trigger"
        aria-expanded={open}
        aria-controls={id}
        onClick={() => setOpen((value) => !value)}
      >
        {label}
        <ChevronDown size={16} aria-hidden="true" className="ncrs-menu__chevron" />
      </button>
      <ul id={id} className="ncrs-menu__list" hidden={!open} onKeyDown={moveFocus}>
        {items.map((item) => (
          <li key={item.label} className={item.separatorBefore ? "has-separator" : undefined}>
            <button
              type="button"
              aria-current={item.current ? "true" : undefined}
              aria-disabled={item.disabled || undefined}
              onClick={() => {
                if (item.disabled) return;
                setOpen(false);
                item.onSelect();
              }}
            >
              {item.icon}
              <span className="ncrs-menu__text">
                {item.label}
                {item.current && <span className="nhs-visually-hidden"> (current)</span>}
                {item.hint && <small>{item.hint}</small>}
              </span>
              {item.current && <Check size={16} aria-hidden="true" className="ncrs-menu__check" />}
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}
