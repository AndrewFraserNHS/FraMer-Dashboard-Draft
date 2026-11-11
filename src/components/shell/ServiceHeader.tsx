import { Bell, HelpCircle, LogOut, Menu, MessageSquare, Search, Settings, Baby } from "lucide-react";
import { useEffect, useRef } from "react";
import { MenuButton } from "./MenuButton";

const noop = () => {};
const nhsLogoSrc = `${import.meta.env.BASE_URL}assets/images/NHS%2010mm%20-%20RGB%20Blue.jpg`;

/** The signed-in clinician's menu. Shown in the header on wide screens and in the expanded mobile menu on narrow ones. */
export function AccountMenu() {
  return (
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
  );
}

type ServiceHeaderProps = {
  onFindPatient: () => void;
  /** Demo patient picker, shown beside Find patient */
  patientMenu?: React.ReactNode;
  /** Narrow screens: only the NHS bar and a Menu button remain; everything else is revealed in the page flow */
  narrow?: boolean;
  menuOpen?: boolean;
  onToggleMenu?: () => void;
};

/**
 * Slim NHS service header: identity on the left, the one thing clinicians do constantly
 * (find a patient) and a single account menu on the right. On narrow screens it keeps
 * only the NHS bar and a Menu button.
 */
export function ServiceHeader({ onFindPatient, patientMenu, narrow = false, menuOpen = false, onToggleMenu }: ServiceHeaderProps) {
  const menuButton = useRef<HTMLButtonElement>(null);
  const wasOpen = useRef(false);

  useEffect(() => {
    if (narrow && wasOpen.current && !menuOpen) menuButton.current?.focus();
    wasOpen.current = menuOpen;
  }, [menuOpen, narrow]);

  return (
    <header className="ncrs-service">
      <div className="ncrs-service__brand">
        <img className="ncrs-logo" src={nhsLogoSrc} alt="NHS" />
        <span className="ncrs-service__name">
          {narrow ? (
            <>
              <span aria-hidden="true">NCRS</span>
              <span className="nhs-visually-hidden">National Care Records Service</span>
            </>
          ) : (
            "National Care Records Service"
          )}
        </span>
      </div>

      {narrow ? (
        <button
          ref={menuButton}
          type="button"
          className="ncrs-service__link ncrs-service__menu"
          aria-expanded={menuOpen}
          aria-controls="ncrs-mobile-menu"
          onClick={onToggleMenu}
        >
          <Menu size={20} aria-hidden="true" />
          Menu
        </button>
      ) : (
        <div className="ncrs-service__actions">
          <button type="button" className="ncrs-service__link" onClick={onFindPatient}>
            <Search size={18} aria-hidden="true" />
            Find patient
          </button>
          {patientMenu}
          <AccountMenu />
        </div>
      )}
    </header>
  );
}
