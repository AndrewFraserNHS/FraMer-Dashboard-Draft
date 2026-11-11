/**
 * Development-only accessibility check at the ARIA and markup level, using axe-core.
 * It cannot replace testing with a screen reader and a keyboard, but it catches the mechanical
 * failures (names, roles, labels, contrast, landmarks) on every page as you work.
 *
 * Runs automatically in `npm run dev` after the page settles and after each change.
 * Run it by hand any time from the console: `await window.runAxe()`.
 */
type AxeResult = { id: string; impact?: string | null; help: string; helpUrl: string; nodes: { target: unknown; failureSummary?: string }[] };

export async function startAxe() {
  const axe = (await import("axe-core")).default;
  let timer: number | undefined;

  // axe cannot run twice at once, so a run that overlaps another waits for it
  let current: Promise<AxeResult[]> | null = null;
  const run = (): Promise<AxeResult[]> => (current ??= check().finally(() => (current = null)));

  async function check() {
    const results = await axe.run(document, { runOnly: { type: "tag", values: ["wcag2a", "wcag2aa", "wcag21a", "wcag21aa", "wcag22aa", "best-practice"] } });
    const violations = results.violations as AxeResult[];
    if (!violations.length) {
      console.info("%c[axe] No automatic accessibility violations found", "color: #00703c");
      return violations;
    }
    console.groupCollapsed(`%c[axe] ${violations.length} accessibility issue(s) on ${location.pathname}`, "color: #d5281b; font-weight: 700");
    for (const violation of violations) {
      console.groupCollapsed(`${violation.impact ?? "n/a"}: ${violation.help} (${violation.nodes.length})`);
      console.info(violation.helpUrl);
      violation.nodes.forEach((node) => console.info(node.target, node.failureSummary));
      console.groupEnd();
    }
    console.groupEnd();
    return violations;
  }

  (window as unknown as { runAxe: typeof run }).runAxe = run;
  const schedule = () => {
    window.clearTimeout(timer);
    timer = window.setTimeout(run, 1500);
  };
  new MutationObserver(schedule).observe(document.body, { childList: true, subtree: true, attributes: true });
  schedule();
}
