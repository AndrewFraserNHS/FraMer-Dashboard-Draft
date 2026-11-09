import { ProvenanceTag } from "../components/ui/ProvenanceTag";
import { Provenance, sourceMeta } from "../data/frailty";

/** Source tag for a frailty data point. Opens to show the organisation, system, date and author. */
export function Source({ of }: { of: Provenance }) {
  const meta = sourceMeta[of.source];
  return (
    <ProvenanceTag
      label={meta.label}
      tone={meta.tone}
      details={[
        ["Organisation", of.org],
        ["Care setting", of.setting],
        ["Source system", of.system],
        ["Pulled", of.pulled],
        ["By", of.by],
      ]}
    />
  );
}

/** One or more sources for a whole panel. */
export function SourceRow({ of }: { of: readonly Provenance[] }) {
  return (
    <div className="panel-sources">
      <span className="panel-sources__label">Source</span>
      {of.map((item) => (
        <Source key={`${item.source}-${item.by}`} of={item} />
      ))}
    </div>
  );
}
