import { ReactNode, useId, useMemo, useState } from "react";
import { ArrowDown, ArrowUp, ChevronsUpDown } from "lucide-react";
import { RowChevron } from "./RowChevron";

export type SortKey = string | number | null;

export type Column<T> = {
  header: string;
  cell: (row: T) => ReactNode;
  /** Makes the column sortable. Return null for "no value"; those rows sort last. */
  sort?: (row: T) => SortKey;
};

type Direction = "ascending" | "descending";

type DataTableProps<T> = {
  /** Describes the table to assistive technology. Not shown visually. */
  caption: string;
  columns: readonly Column<T>[];
  rows: readonly T[];
  rowKey: (row: T, index: number) => string;
  /** Header of the column to sort by initially */
  defaultSort?: { header: string; direction: Direction };
  /** When set, each row gets a "view" button as its last cell */
  onView?: (row: T) => void;
  /** Accessible name of the row's view button, e.g. `View ${row.name}` */
  viewLabel?: (row: T) => string;
};

function compare(a: SortKey, b: SortKey): number {
  if (a === null && b === null) return 0;
  if (a === null) return 1; // empty values always last
  if (b === null) return -1;
  if (typeof a === "number" && typeof b === "number") return a - b;
  return String(a).localeCompare(String(b), "en-GB", { numeric: true, sensitivity: "base" });
}

/**
 * NHS-style data table: caption, column headers, optional sorting and a
 * keyboard-scrollable wrapper. Sortable headers are real buttons and the th carries
 * aria-sort. Rows are never buttons; the optional last cell holds a real button.
 */
export function DataTable<T>({
  caption,
  columns,
  rows,
  rowKey,
  defaultSort,
  onView,
  viewLabel,
}: DataTableProps<T>) {
  const [sort, setSort] = useState<{ header: string; direction: Direction } | null>(
    defaultSort ?? null,
  );
  const [announcement, setAnnouncement] = useState("");
  const sortId = useId();
  const sortable = columns.filter((column) => column.sort);

  const sortedRows = useMemo(() => {
    const column = columns.find((candidate) => candidate.header === sort?.header);
    if (!sort || !column?.sort) return rows;
    const key = column.sort;
    const factor = sort.direction === "ascending" ? 1 : -1;
    // Array.prototype.sort is stable, so equal rows keep their original order
    return [...rows].sort((first, second) => {
      const a = key(first);
      const b = key(second);
      // keep empty values last in both directions
      if (a === null || b === null) return compare(a, b);
      return factor * compare(a, b);
    });
  }, [rows, columns, sort]);

  function applySort(header: string, direction: Direction) {
    setSort({ header, direction });
    setAnnouncement(`Sorted by ${header}, ${direction}`);
  }

  function toggleSort(header: string) {
    const direction: Direction =
      sort?.header === header && sort.direction === "ascending" ? "descending" : "ascending";
    setSort({ header, direction });
    setAnnouncement(`Sorted by ${header}, ${direction}`);
  }

  return (
    <div className="table-scroll" role="region" aria-label={caption} tabIndex={0}>
      {sortable.length > 0 && (
        <div className="data-table__mobile-sort">
          <label htmlFor={sortId}>Sort {caption.toLowerCase()} by</label>
          <select
            id={sortId}
            className="nhsuk-select"
            value={sort ? `${sort.header}|${sort.direction}` : ""}
            onChange={(event) => {
              const [header, direction] = event.target.value.split("|");
              applySort(header, direction as Direction);
            }}
          >
            {!sort && <option value="">Choose</option>}
            {sortable.flatMap((column) => [
              <option key={`${column.header}-a`} value={`${column.header}|ascending`}>{column.header} (ascending)</option>,
              <option key={`${column.header}-d`} value={`${column.header}|descending`}>{column.header} (descending)</option>,
            ])}
          </select>
        </div>
      )}
      {/* Explicit roles keep the table semantics when the stacked mobile layout changes the display type */}
      <table className="documents-table data-table nhsuk-table-responsive" role="table">
        <caption className="nhs-visually-hidden">{caption}</caption>
        <thead role="rowgroup">
          <tr role="row">
            {columns.map((column) => {
              const active = sort?.header === column.header ? sort.direction : undefined;
              return (
                <th key={column.header} role="columnheader" scope="col" aria-sort={column.sort ? (active ?? "none") : undefined}>
                  {column.sort ? (
                    <button
                      type="button"
                      className="data-table__sort"
                      onClick={() => toggleSort(column.header)}
                    >
                      {column.header}
                      {active === "ascending" ? (
                        <ArrowUp size={14} aria-hidden="true" />
                      ) : active === "descending" ? (
                        <ArrowDown size={14} aria-hidden="true" />
                      ) : (
                        <ChevronsUpDown size={14} aria-hidden="true" />
                      )}
                    </button>
                  ) : (
                    column.header
                  )}
                </th>
              );
            })}
            {onView && (
              <th role="columnheader" scope="col">
                <span className="nhs-visually-hidden">Actions</span>
              </th>
            )}
          </tr>
        </thead>
        <tbody role="rowgroup">
          {sortedRows.map((row, index) => (
            <tr key={rowKey(row, index)} role="row">
              {columns.map((column) => (
                <td key={column.header} role="cell" data-label={column.header}>{column.cell(row)}</td>
              ))}
              {onView && (
                <td role="cell">
                  <button
                    type="button"
                    className="row-chevron-button"
                    aria-label={viewLabel?.(row) ?? "View details"}
                    onClick={() => onView(row)}
                  >
                    <RowChevron />
                  </button>
                </td>
              )}
            </tr>
          ))}
        </tbody>
      </table>
      <span role="status" className="nhs-visually-hidden">
        {announcement}
      </span>
    </div>
  );
}
