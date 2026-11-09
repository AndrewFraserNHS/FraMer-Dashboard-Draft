import { useDetailPanel } from "./MaternityShell";
import { DataSection } from "./components/ui/DataSection";
import { DataTable } from "./components/ui/DataTable";
import { RecordPage } from "./components/ui/RecordPage";
import { SourceTag } from "./components/ui/StatusTag";
import { DocumentDetail } from "./components/record/DocumentDetail";
import { ClinicalDocument, documents } from "./data/patient";
import { dateKey } from "./utils/sort";

export default function Documents() {
  const openPanel = useDetailPanel();

  function view(document: ClinicalDocument) {
    openPanel({
      eyebrow: document.type,
      title: document.name,
      content: <DocumentDetail document={document} />,
    });
  }

  return (
    <RecordPage title="Documents">
      <DataSection title="Clinical documents" summary={`${documents.length} items`}>
        <DataTable
          caption="Clinical documents"
          rows={documents}
          rowKey={(document) => document.name}
          onView={view}
          viewLabel={(document) => `View ${document.name}`}
          columns={[
            { header: "Date", cell: (d) => d.date, sort: (d) => dateKey(d.date) },
            { header: "Type", cell: (d) => d.type, sort: (d) => d.type },
            { header: "Name", cell: (d) => <strong>{d.name}</strong>, sort: (d) => d.name },
            { header: "Source", cell: (d) => <SourceTag>{d.source}</SourceTag>, sort: (d) => d.source },
            { header: "Status", cell: (d) => d.status, sort: (d) => d.status },
            { header: "Confidentiality", cell: (d) => d.confidentiality, sort: (d) => d.confidentiality },
          ]}
          defaultSort={{ header: "Date", direction: "descending" }}
        />
      </DataSection>
    </RecordPage>
  );
}
