import { Dispatch, SetStateAction, useEffect, useState } from "react";

/**
 * useState that survives a reload, for preferences and in-progress work (text size, section order,
 * review decisions). Storage can be blocked or full, so every access is wrapped and the app works without it.
 * Use sessionStorage for work that should not outlive the tab, localStorage for preferences.
 */
export function usePersistentState<T>(key: string, initial: T, area: "session" | "local" = "local"): [T, Dispatch<SetStateAction<T>>] {
  const storage = () => (area === "local" ? window.localStorage : window.sessionStorage);
  const [value, setValue] = useState<T>(() => {
    try {
      const stored = storage().getItem(key);
      return stored === null ? initial : (JSON.parse(stored) as T);
    } catch {
      return initial;
    }
  });
  useEffect(() => {
    try {
      storage().setItem(key, JSON.stringify(value));
    } catch {
      /* remembering is a convenience only */
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [key, value]);
  return [value, setValue];
}
