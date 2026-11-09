import { createContext, ReactNode, useCallback, useContext, useState } from "react";

type Signal = { open: boolean; n: number };

const SignalContext = createContext<Signal>({ open: false, n: 0 });
const SetAllContext = createContext<(open: boolean) => void>(() => {});

/**
 * Lets a toolbar expand or collapse every DataSection below it through state,
 * instead of clicking elements through the DOM.
 */
export function DisclosureGroup({ children }: { children: ReactNode }) {
  const [signal, setSignal] = useState<Signal>({ open: false, n: 0 });
  const setAll = useCallback(
    (open: boolean) => setSignal((s) => ({ open, n: s.n + 1 })),
    [],
  );
  return (
    <SetAllContext.Provider value={setAll}>
      <SignalContext.Provider value={signal}>{children}</SignalContext.Provider>
    </SetAllContext.Provider>
  );
}

export const useDisclosureSignal = () => useContext(SignalContext);
export const useSetAllDisclosures = () => useContext(SetAllContext);
