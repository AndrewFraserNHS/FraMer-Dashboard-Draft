import { ReactNode, createContext, useContext, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { ChevronRight } from "lucide-react";

export type BreadcrumbItem = {
  label: string;
  path: string;
};

type BreadcrumbContextType = {
  breadcrumbs: BreadcrumbItem[];
  setBreadcrumbs: (items: BreadcrumbItem[]) => void;
};

const BreadcrumbContext = createContext<BreadcrumbContextType | null>(null);

export function useBreadcrumb() {
  const ctx = useContext(BreadcrumbContext);
  if (!ctx) throw new Error("useBreadcrumb must be used within BreadcrumbProvider");
  return ctx;
}

export function BreadcrumbProvider({ children }: { children: ReactNode }) {
  const [breadcrumbs, setBreadcrumbs] = useState<BreadcrumbItem[]>([]);

  return (
    <BreadcrumbContext.Provider value={{ breadcrumbs, setBreadcrumbs }}>
      {children}
    </BreadcrumbContext.Provider>
  );
}

export function BreadcrumbNav() {
  const { breadcrumbs } = useBreadcrumb();
  const navigate = useNavigate();
  const location = useLocation();

  if (breadcrumbs.length === 0) return null;

  return (
    <nav className="breadcrumb-nav" aria-label="Breadcrumb">
      <ol className="breadcrumb-list">
        <li>
          <button
            className="breadcrumb-link"
            onClick={() => navigate("/")}
          >
            Summary
          </button>
        </li>
        {breadcrumbs.map((item, index) => (
          <li key={item.path}>
            <ChevronRight className="breadcrumb-separator" size={16} aria-hidden="true" />
            {index === breadcrumbs.length - 1 ? (
              <span className="breadcrumb-current">{item.label}</span>
            ) : (
              <button
                className="breadcrumb-link"
                onClick={() => navigate(item.path)}
              >
                {item.label}
              </button>
            )}
          </li>
        ))}
      </ol>
    </nav>
  );
}
