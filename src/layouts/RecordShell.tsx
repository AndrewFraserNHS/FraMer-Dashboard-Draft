import { ReactNode, useEffect, useRef, useState } from "react";
import { NavLink, useLocation, useNavigate } from "react-router-dom";
import { BreadcrumbProvider, BreadcrumbNav } from "../components/shell/BreadcrumbNav";
import { DetailPanel as DetailPanelComponent } from "../components/shell/DetailPanel";
import { ReorderDialog } from "../components/ui/ReorderDialog";
import { DisclosureGroup } from "../components/ui/DisclosureGroup";
import { AccountMenu, ServiceHeader } from "../components/shell/ServiceHeader";
import { PatientBar, PatientDetails } from "../components/shell/PatientBar";
import { Drawer } from "../components/ui/Drawer";
import { NARROW_QUERY, useMediaQuery } from "../hooks/useMediaQuery";
import { AlertsBand } from "../components/shell/AlertsBand";
import { RecordFilterBar } from "../components/shell/RecordFilterBar";
import { SafetyFlagPanel, safetyFlags } from "../components/record/SafetyFlagPanel";
import { PatientConfirmScreen } from "../components/patient/PatientConfirmScreen";
import { PatientSearchScreen } from "../components/patient/PatientSearchScreen";
import { DetailPanelContext, type DetailPanel } from "../hooks/useDetailPanel";
import { OptionsSidebar, PageOptions, TextSize } from "../components/shell/OptionsSidebar";
import { MenuButton } from "../components/shell/MenuButton";
import { defaultSectionOrder, SectionOrderContext } from "../components/ui/SectionOrder";
import { FrailtyFlagPanel, frailtyFlags } from "../components/record/FrailtyFlagPanel";
import { allViewLabels, recordViews, viewForPath } from "../views";

export default function RecordShell({ children }: { children: ReactNode }) {
  const location = useLocation();
  const navigate = useNavigate();
  const view = recordViews[viewForPath(location.pathname)];
  const tabs = view.tabs;
  const currentTabLabel =
    tabs.find(([, path]) => path === location.pathname)?.[0] ?? tabs[0][0];
  const [viewAnnouncement, setViewAnnouncement] = useState("");
  const previousView = useRef(view.key);
  const [appView, setAppView] = useState<"search" | "confirm" | "record">(
    "record",
  );
  const [accessToastVisible, setAccessToastVisible] = useState(false);
  const [textSize, setTextSize] = useState<TextSize>(
    "small",
  );
  const [filtersOpen, setFiltersOpen] = useState(false);
  const [optionsOpen, setOptionsOpen] = useState(
    () => typeof window === "undefined" || window.innerWidth >= 1200,
  );
  const [showReorderModal, setShowReorderModal] = useState(false);
  const isNarrow = useMediaQuery(NARROW_QUERY);
  const [menuOpen, setMenuOpen] = useState(false);
  const [cardOrder, setCardOrder] = useState<string[]>([...defaultSectionOrder]);
  const [panel, setPanel] = useState<DetailPanel | null>(null);
  const panelTrigger = useRef<HTMLElement | null>(null);
  const savedScrollPosition = useRef(0);

  function openPanel(nextPanel: DetailPanel) {
    panelTrigger.current = document.activeElement as HTMLElement;
    savedScrollPosition.current =
      document.querySelector<HTMLElement>(".maternity-content")?.scrollTop ?? 0;
    setPanel(nextPanel);
  }

  function closePanel() {
    setPanel(null);
    requestAnimationFrame(() => {
      const content =
        document.querySelector<HTMLElement>(".maternity-content");
      if (content) content.scrollTop = savedScrollPosition.current;
      panelTrigger.current?.focus();
    });
  }

  // The menu drawer only exists on narrow screens, and closes once a choice has changed the page
  useEffect(() => {
    setMenuOpen(false);
  }, [location.pathname, isNarrow]);

  useEffect(() => {
    document.title = `${currentTabLabel} — ${view.patient.name} — NHS National Care Records Service`;
    setPanel(null);
  }, [location.pathname, currentTabLabel, view]);

  // Changing view changes the patient on screen, so say so, and move focus to the new content.
  useEffect(() => {
    if (previousView.current === view.key) return;
    previousView.current = view.key;
    setViewAnnouncement(`Now viewing ${view.patient.name}, ${view.label} record.`);
    requestAnimationFrame(() => document.getElementById("main-content")?.focus());
  }, [view]);

  const patientMenu = (
    <MenuButton
      label={<>Patient: {view.patient.name.split(" ")[0]}</>}
      items={Object.values(recordViews).map((item) => ({
        label: item.patient.name,
        hint: `${item.label} record`,
        current: item.key === view.key,
        onSelect: () => item.key !== view.key && navigate(item.home),
      }))}
    />
  );

  const viewMenu = (
    <MenuButton
      label={<>Record view: {view.label}</>}
      items={allViewLabels.map((label) => ({
        label,
        current: label === view.label,
        disabled: label !== view.label,
        hint: label === view.label ? undefined : `No ${label.toLowerCase()} data for this patient`,
        onSelect: () => {},
      }))}
    />
  );

  const flags =
    view.key === "frailty"
      ? frailtyFlags.map((flag) => ({
          id: flag.id,
          label: flag.label,
          level: flag.level,
          onOpen: () =>
            openPanel({
              eyebrow: "Clinical alert",
              title: flag.label,
              status: flag.status,
              tone: flag.level === "high" ? "red" : "amber",
              content: <FrailtyFlagPanel flag={flag} />,
            }),
        }))
      : safetyFlags.map((flag) => ({
          id: flag.id,
          label: flag.label,
          level: flag.level,
          onOpen: () =>
            openPanel({
              eyebrow: "Clinical alert",
              title: flag.title,
              status: flag.status,
              tone: flag.tone,
              content: <SafetyFlagPanel kind={flag.kind} />,
            }),
        }));

  const pageOptions = {
    textSize,
    onTextSize: setTextSize,
    filtersOpen,
    onToggleFilters: view.filters ? () => setFiltersOpen((value) => !value) : undefined,
    onReorder: view.canReorder
      ? () => {
          setMenuOpen(false);
          setShowReorderModal(true);
        }
      : undefined,
  };

  if (appView === "search") {
    return (
      <PatientSearchScreen
        onFound={() => setAppView("confirm")}
        onCancel={() => setAppView("record")}
      />
    );
  }

  if (appView === "confirm") {
    return (
      <PatientConfirmScreen
        onBack={() => setAppView("search")}
        onConfirm={() => {
          setAppView("record");
          setAccessToastVisible(true);
          window.setTimeout(() => setAccessToastVisible(false), 4000);
        }}
      />
    );
  }

  return (
    <BreadcrumbProvider>
      <DisclosureGroup>
        <SectionOrderContext.Provider value={cardOrder}>
          <div className={`record-shell text-${textSize}`}>
            <a className="record-skip-link" href="#main-content">
              Skip to main content
            </a>

            <div className="record-frame">
              {accessToastVisible && (
                <div className="access-toast" role="status" aria-live="polite">
                  Access logged — this record access has been recorded for audit
                </div>
              )}
              <ServiceHeader
                onFindPatient={() => setAppView("search")}
                patientMenu={patientMenu}
                narrow={isNarrow}
                menuOpen={menuOpen}
                onToggleMenu={() => setMenuOpen(true)}
              />
              <PatientBar
                key={view.key}
                patient={view.patient}
                viewMenu={viewMenu}
                compact={isNarrow}
              />
              <AlertsBand key={`alerts-${view.key}`} flags={flags} />
              <p role="status" className="nhs-visually-hidden">
                {viewAnnouncement}
              </p>
              <nav aria-label="Patient record sections" className="ncrs-tabs">
                <ul>
                  {tabs.map(([label, path]) => (
                    <li key={path}>
                      <NavLink to={path} end={path === "/"}>
                        {label}
                      </NavLink>
                    </li>
                  ))}
                </ul>
              </nav>

              {view.filters && filtersOpen && <RecordFilterBar filters={view.filters} />}

              <div className="record-workspace">
                {!isNarrow && (
                  <OptionsSidebar open={optionsOpen} onOpenChange={setOptionsOpen} {...pageOptions} />
                )}
                <main
                  id="main-content"
                  className="maternity-content"
                  tabIndex={-1}
                >
                  <DetailPanelContext.Provider value={openPanel}>
                    <BreadcrumbNav />
                    <div style={{ display: panel ? "none" : "block" }}>
                      {children}
                    </div>
                    <DetailPanelComponent
                      isOpen={!!panel}
                      title={panel?.title || ""}
                      eyebrow={panel?.eyebrow}
                      status={panel?.status}
                      tone={panel?.tone}
                      content={panel?.content}
                      onClose={closePanel}
                      backLabel={`Back`}
                    />
                  </DetailPanelContext.Provider>
                </main>
              </div>
              {isNarrow && (
                <Drawer open={menuOpen} title="Menu" onClose={() => setMenuOpen(false)}>
                  <button
                    type="button"
                    className="ncrs-drawer__find nhsuk-button nhsuk-button--secondary"
                    onClick={() => {
                      setMenuOpen(false);
                      setAppView("search");
                    }}
                  >
                    Find patient
                  </button>
                  <div className="ncrs-drawer__group">
                    <h3>Patient</h3>
                    {patientMenu}
                  </div>
                  <div className="ncrs-drawer__group">
                    <h3>Record view</h3>
                    {viewMenu}
                  </div>
                  <div className="ncrs-drawer__group">
                    <h3>Patient details</h3>
                    <PatientDetails patient={view.patient} />
                  </div>
                  <div className="ncrs-drawer__group">
                    <h3>Signed in as</h3>
                    <AccountMenu />
                  </div>
                  <div className="ncrs-drawer__group">
                    <h3>Page options</h3>
                    <PageOptions {...pageOptions} />
                  </div>
                </Drawer>
              )}
              <ReorderDialog
                open={showReorderModal}
                title="Reorder sections"
                description="Use the arrow buttons to change the order of the sections on the Summary page."
                items={cardOrder}
                onApply={setCardOrder}
                onClose={() => setShowReorderModal(false)}
              />
            </div>
          </div>
        </SectionOrderContext.Provider>
      </DisclosureGroup>
    </BreadcrumbProvider>
  );
}
