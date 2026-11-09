import { Bell, HelpCircle, LogOut, MessageSquare, Search, Settings, Baby } from "lucide-react";
import { MenuButton } from "./MenuButton";

/**
 * Slim NHS service header: identity on the left, the one thing clinicians do constantly
 * (find a patient) and a single account menu on the right.
 */
export function ServiceHeader({ onFindPatient }: { onFindPatient: () => void }) {
  const noop = () => {};
  return (
    <header className="ncrs-service">
      <div className="ncrs-service__brand">
        <span className="ncrs-logo" role="img" aria-label="NHS">NHS</span>
        <span className="ncrs-service__name">National Care Records Service</span>
      </div>

      <div className="ncrs-service__actions">
        <button type="button" className="ncrs-service__link" onClick={onFindPatient}>
          <Search size={18} aria-hidden="true" />
          Find patient
        </button>
        <MenuButton
          label="Dr Amrita Kaur"
          items={[
            { label: "Change role", icon: <Settings size={16} aria-hidden="true" />, onSelect: noop },
            { label: "List birth notifications", icon: <Baby size={16} aria-hidden="true" />, onSelect: noop },
            { label: "What's new", icon: <Bell size={16} aria-hidden="true" />, onSelect: noop },
            { label: "Give feedback", icon: <MessageSquare size={16} aria-hidden="true" />, onSelect: noop },
            { label: "Help", icon: <HelpCircle size={16} aria-hidden="true" />, onSelect: noop },
            { label: "Log out", icon: <LogOut size={16} aria-hidden="true" />, onSelect: noop, separatorBefore: true },
          ]}
        />
      </div>
    </header>
  );
}
