import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useBreadcrumb } from "./BreadcrumbNav";
import { ChevronLeft } from "lucide-react";

export type DetailPageConfig = {
  title: string;
  eyebrow?: string;
  rows: Array<[label: string, value: string | React.ReactNode]>;
};

export function DetailPage({ config }: { config: DetailPageConfig }) {
  const { setBreadcrumbs } = useBreadcrumb();
  const navigate = useNavigate();

  useEffect(() => {
    setBreadcrumbs([]);
  }, [setBreadcrumbs]);

  return (
    <div className="detail-page-container">
      <div className="detail-page-header">
        <button
          className="detail-back-button"
          onClick={() => navigate(-1)}
          aria-label="Go back"
        >
          <ChevronLeft size={20} />
          <span>Back</span>
        </button>
        {config.eyebrow && <p className="detail-eyebrow">{config.eyebrow}</p>}
        <h1 className="detail-page-title">{config.title}</h1>
      </div>

      <div className="detail-page-content">
        <dl className="detail-rows">
          {config.rows.map(([label, value], index) => (
            <div key={index} className="detail-row">
              <dt className="detail-label">{label}</dt>
              <dd className="detail-value">{value}</dd>
            </div>
          ))}
        </dl>
      </div>
    </div>
  );
}
