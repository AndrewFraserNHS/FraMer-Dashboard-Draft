/** Sort key for display dates such as "5 September 2026" or "2023". Unparseable values sort last. */
export function dateKey(text: string): number | null {
  const time = Date.parse(text);
  return Number.isNaN(time) ? null : time;
}
