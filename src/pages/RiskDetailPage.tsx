import { BackLink } from "../components/ui/BackLink";
import { RecordPage } from "../components/ui/RecordPage";
import { formatDate } from "../data/patient";
import { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useBreadcrumb } from "../components/shell/BreadcrumbNav";
import { DetailPage } from "../components/record/DetailPage";

// Map of risk IDs to their details
const riskDetails: Record<string, any> = {
  "gestational-diabetes": {
    title: "Gestational diabetes",
    eyebrow: "Clinical Risk Detail",
    rows: [
      ["Risk or flag", "Gestational diabetes mellitus"],
      ["Priority", "High priority"],
      ["Clinical detail", `Diagnosed ${formatDate("2026-09-05")} following abnormal oral glucose tolerance test`],
      ["Applies to", "Current pregnancy"],
      ["Review status", "Active review required"],
      ["Record source", "Lab results"],
      ["Date diagnosed", formatDate("2026-09-05")],
      ["Current management", "Metformin 500mg once daily with glucose monitoring 4x daily"],
      ["Care team", "Diabetes Antenatal Clinic"],
      ["Next review", formatDate("2026-10-01")],
    ],
  },
  "penicillin-allergy": {
    title: "Penicillin allergy",
    eyebrow: "Clinical Risk Detail",
    rows: [
      ["Allergen", "Penicillin"],
      ["Priority", "High priority"],
      ["Reaction type", "Rash (non-severe)"],
      ["Date recorded", formatDate("2026-08-12")],
      ["Clinical detail", "Widespread raised rash after oral penicillin in childhood. No breathing difficulty or facial swelling."],
      ["Record source", "GP record"],
      ["Recorder", "Dr Anita Shah - General Practice"],
      ["Management", "Avoid all penicillin-class antibiotics"],
      ["Alternative options", "Consider cephalosporin or macrolide antibiotics after allergy assessment"],
      ["Specialist review", "Allergy assessment recommended if future treatment significantly limited"],
    ],
  },
  "high-bmi": {
    title: "High body mass index (32)",
    eyebrow: "Clinical Risk Detail",
    rows: [
      ["BMI", "32 kg/m²"],
      ["Priority", "Moderate priority"],
      ["Classification", "Obese (class I)"],
      ["Date recorded", formatDate("2026-08-15")],
      ["Clinical detail", "BMI 32 requires monitoring and increased screening during pregnancy"],
      ["Record source", "BadgerNet Maternity"],
      ["Health risks", "Increased risk of gestational diabetes, pre-eclampsia, and operative delivery"],
      ["Monitoring plan", "Regular antenatal screening and lifestyle support"],
      ["Lifestyle recommendations", "Continue healthy diet and safe physical activity as tolerated"],
      ["Next review", formatDate("2026-10-02")],
    ],
  },
};

export default function RiskDetailPage() {
  const { riskId } = useParams<{ riskId: string }>();
  const { setBreadcrumbs } = useBreadcrumb();
  const navigate = useNavigate();

  useEffect(() => {
    if (riskId) {
      setBreadcrumbs([
        { label: "Clinical risks", path: "/" },
        { label: riskId.replace(/-/g, " "), path: `/risk/${riskId}` },
      ]);
    }
  }, [riskId, setBreadcrumbs]);

  const risk = riskId ? riskDetails[riskId] : null;

  if (!risk) {
    return (
      <RecordPage title="Risk not found" showSystems={false}>
        <BackLink onClick={() => navigate("/")}>Back to Summary</BackLink>
        <p>This risk is not in the record.</p>
      </RecordPage>
    );
  }

  return <DetailPage config={risk} />;
}
