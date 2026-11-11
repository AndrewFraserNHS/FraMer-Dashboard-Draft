import { useSyncExternalStore } from "react";

/** Subscribes to a CSS media query. Used where a layout change moves controls rather than just restyling them. */
export function useMediaQuery(query: string): boolean {
  return useSyncExternalStore(
    (notify) => {
      const list = window.matchMedia(query);
      list.addEventListener("change", notify);
      return () => list.removeEventListener("change", notify);
    },
    () => window.matchMedia(query).matches,
    () => false,
  );
}

/** The narrow layout: the service header reveals its menu in the page flow. Matches the CSS breakpoint. */
export const NARROW_QUERY = "(max-width: 767px)";
