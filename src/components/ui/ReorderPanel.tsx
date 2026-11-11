import { useEffect, useRef, useState } from "react";
import { ArrowDown, ArrowUp } from "lucide-react";
import { Button } from "./Button";
import { InlinePanel } from "./InlinePanel";

type Direction = "up" | "down";

type ReorderPanelProps = {
  open: boolean;
  title: string;
  /** Plain-language instruction shown above the list */
  description: string;
  items: readonly string[];
  onApply: (order: string[]) => void;
  onClose: () => void;
};

/**
 * Reorder a list of named items with up and down buttons, in an inline panel.
 * Buttons keep focus where it was after a move, and each move is announced to screen readers.
 * The list is mounted only while open, so the working order resets each time.
 */
export function ReorderPanel({ open, title, description, items, onApply, onClose }: ReorderPanelProps) {
  return (
    <InlinePanel open={open} title={title}>
      <ReorderList
        description={description}
        items={items}
        onApply={(order) => {
          onApply(order);
          onClose();
        }}
        onCancel={onClose}
      />
    </InlinePanel>
  );
}

function ReorderList({
  description,
  items,
  onApply,
  onCancel,
}: {
  description: string;
  items: readonly string[];
  onApply: (order: string[]) => void;
  onCancel: () => void;
}) {
  const [order, setOrder] = useState<string[]>([...items]);
  const [announcement, setAnnouncement] = useState("");
  const list = useRef<HTMLUListElement | null>(null);
  const refocus = useRef<{ item: string; direction: Direction } | null>(null);

  useEffect(() => {
    const target = refocus.current;
    if (!target) return;
    refocus.current = null;
    const row = list.current?.querySelector<HTMLElement>(`[data-item="${CSS.escape(target.item)}"]`);
    const buttons = row?.querySelectorAll<HTMLButtonElement>("button");
    if (!buttons) return;
    const [up, down] = [buttons[0], buttons[1]];
    // Keep focus on the button that was pressed; if it is now disabled, use the other one
    const preferred = target.direction === "up" ? up : down;
    (preferred.disabled ? (target.direction === "up" ? down : up) : preferred).focus();
  }, [order]);

  function move(index: number, direction: Direction) {
    const next = [...order];
    const target = direction === "up" ? index - 1 : index + 1;
    if (target < 0 || target >= next.length) return;
    [next[index], next[target]] = [next[target], next[index]];
    refocus.current = { item: order[index], direction };
    setOrder(next);
    setAnnouncement(`${order[index]} moved to position ${target + 1} of ${next.length}`);
  }

  return (
    <>
      <p>{description}</p>
      <ul className="ncrs-reorder" ref={list}>
        {order.map((item, index) => (
          <li key={item} data-item={item}>
            <span>{item}</span>
            <div className="ncrs-reorder__buttons">
              <Button
                variant="secondary"
                onClick={() => move(index, "up")}
                disabled={index === 0}
                aria-label={`Move ${item} up`}
              >
                <ArrowUp size={18} aria-hidden="true" />
              </Button>
              <Button
                variant="secondary"
                onClick={() => move(index, "down")}
                disabled={index === order.length - 1}
                aria-label={`Move ${item} down`}
              >
                <ArrowDown size={18} aria-hidden="true" />
              </Button>
            </div>
          </li>
        ))}
      </ul>
      <p role="status" className="nhs-visually-hidden">{announcement}</p>
      <div className="ncrs-inline-panel__footer">
        <Button variant="secondary" onClick={onCancel}>
          Cancel
        </Button>
        <Button onClick={() => onApply(order)}>
          Apply
        </Button>
      </div>
    </>
  );
}
