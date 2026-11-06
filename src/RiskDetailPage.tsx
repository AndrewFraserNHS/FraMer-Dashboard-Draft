import { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useBreadcrumb } from "./BreadcrumbNav";
import { DetailPage } from "./DetailPage";

// Map of risk IDs to their details
const riskDetails: Record<string, any> = {
  "gestational-diabetes": {
    title: "Gestational diabetes",
    eyebrow: "Clinical Risk Detail",
    rows: [
      ["Risk or flag", "Gestational diabetes mellitus"],
      ["Priority", "High priority"],
      ["Clinical detail", "Diagnosed 5 September 2026 following abnormal oral glucose tolerance test"],
      ["Applies to", "Current pregnancy"],
      ["Review status", "Active review required"],
      ["Record source", "Lab results"],
      ["Date diagnosed", "5 September 2026"],
      ["Current management", "Metformin 500mg once daily with glucose monitoring 4x daily"],
      ["Care team", "Diabetes Antenatal Clinic"],
      ["Next review", "1 October 2026"],
    ],
  },
  "penicillin-allergy": {
    title: "Penicillin allergy",
    eyebrow: "Clinical Risk Detail",
    rows: [
      ["Allergen", "Penicillin"],
      ["Priority", "High priority"],
      ["Reaction type", "Rash (non-severe)"],
      ["Date recorded", "12 August 2026"],
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
      ["Priority", "Medium priority"],
      ["Classification", "Obese (class I)"],
      ["Date recorded", "15 August 2026"],
      ["Clinical detail", "BMI 32 requires monitoring and increased screening during pregnancy"],
      ["Record source", "BadgerNet Maternity"],
      ["Health risks", "Increased risk of gestational diabetes, pre-eclampsia, and operative delivery"],
      ["Monitoring plan", "Regular antenatal screening and lifestyle support"],
      ["Lifestyle recommendations", "Continue healthy diet and safe physical activity as tolerated"],
      ["Next review", "2 October 2026"],
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
      <div style={{ padding: "24px" }}>
        <button onClick={() => navigate("/")} style={{ marginBottom: "16px" }}>
          ← Back to Summary
        </button>
        <p>Risk not found</p>
      </div>
    );
  }

  return <DetailPage config={risk} />;
}
