import { createContext, ReactNode, useContext } from "react";

/** What the shell's detail panel is showing. Pages open one with useDetailPanel(). */
export type DetailPanel = {
  title: string;
  eyebrow?: string;
  status?: string;
  tone?: "red" | "purple" | "blue" | "amber";
  content: ReactNode;
};


export const DetailPanelContext = createContext<((panel: DetailPanel) => void) | null>(null);

export function useDetailPanel() {
  const openPanel = useContext(DetailPanelContext);
  if (!openPanel) {
    throw new Error("useDetailPanel must be used within the record shell");
  }
  return openPanel;
}

