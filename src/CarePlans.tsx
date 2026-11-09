import { DataSection } from "./components/ui/DataSection";
import { ExpandableRow } from "./components/ui/ExpandableRow";
import { Callout } from "./components/ui/Callout";
import { RecordPage } from "./components/ui/RecordPage";

const plans = [
  {
    title: "Wellbeing Support Plan",
    created: "15 September 2026",
    actions: [
      "Regular contact with perinatal mental health team",
      "Safety plan in place - emergency contacts documented",
      "Partner involved in care planning",
      "Social services aware - supportive",
    ],
  },
  {
    title: "Diabetes management",
    created: "12 September 2026",
    actions: [
      "Home glucose monitoring 4 times a day",
      "Dietitian review arranged",
      "Growth scans every 4 weeks from 28w",
      "Consider medication escalation if targets not met",
    ],
  },
] as const;

export default function CarePlans() {
  return (
    <RecordPage title="Care plans">
      <DataSection title="Care plans" summary={`${plans.length} active`}>
        {plans.map((plan) => (
          <ExpandableRow
            key={plan.title}
            detail={
              <ul className="bullet-list">
                {plan.actions.map((action) => (
                  <li key={action}>{action}</li>
                ))}
              </ul>
            }
          >
            <div>
              <strong>{plan.title}</strong>
              <small>Created: {plan.created}</small>
            </div>
          </ExpandableRow>
        ))}
      </DataSection>

      <Callout tone="blue" title="Connected record benefit">
        <p>
          The wellbeing plan and diabetes plan are visible together, helping clinicians
          plan an appointment that covers both safety and physical health.
        </p>
      </Callout>
    </RecordPage>
  );
}
