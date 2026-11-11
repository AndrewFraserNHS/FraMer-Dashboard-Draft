import { ReactNode, useEffect, useRef, useState } from "react";
import { NavLink, useLocation, useNavigate } from "react-router-dom";
import { BreadcrumbProvider, BreadcrumbNav } from "../components/shell/BreadcrumbNav";
import { DetailPanel as DetailPanelComponent } from "../components/shell/DetailPanel";
import { ReorderPanel } from "../components/ui/ReorderPanel";
import { DisclosureGroup } from "../components/ui/DisclosureGroup";
import { AccountMenu, ServiceHeader } from "../components/shell/ServiceHeader";
import { PatientBar, PatientDetails } from "../components/shell/PatientBar";
import { NARROW_QUERY, useMediaQuery } from "../hooks/useMediaQuery";
import { usePersistentState } from "../hooks/usePersistentState";
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
import { allViewLabels, recordViews, viewForPath, type ViewKey } from "../views";
import { Button } from "../components/ui/Button";
import { InlinePanel } from "../components/ui/InlinePanel";
import { DetailList } from "../components/ui/DetailList";

export default function RecordShell({ children }: { children: ReactNode }) {
  const location = useLocation();
  const navigate = useNavigate();
  const view = recordViews[viewForPath(location.pathname)];
  const tabs = view.tabs;
  const currentTabLabel =
    // The longest tab path that matches, so pages inside a tab (such as CGA version 2) keep that tab current
    [...tabs]
      .sort((a, b) => b[1].length - a[1].length)
      .find(([, path]) => location.pathname === path || location.pathname.startsWith(`${path}/`))?.[0] ?? tabs[0][0];
  const [viewAnnouncement, setViewAnnouncement] = useState("");
  const previousView = useRef(view.key);
  const [appView, setAppView] = useState<"search" | "confirm" | "record">(
    "record",
  );
  const [accessToastVisible, setAccessToastVisible] = useState(false);
  const [textSize, setTextSize] = usePersistentState<TextSize>("ncrs.textSize", "medium");
  const [filtersOpen, setFiltersOpen] = useState(false);
  const [optionsOpen, setOptionsOpen] = useState(false);
  const [showReorderPanel, setShowReorderPanel] = useState(false);
  const isNarrow = useMediaQuery(NARROW_QUERY);
  const [menuOpen, setMenuOpen] = useState(false);
  const [pendingView, setPendingView] = useState<ViewKey | null>(null);
  const [storedOrder, setCardOrder] = usePersistentState<string[]>("ncrs.sectionOrder", [...defaultSectionOrder]);
  // Ignore a saved order that no longer matches the sections on the page
  const cardOrder =
    storedOrder.length === defaultSectionOrder.length && defaultSectionOrder.every((name) => storedOrder.includes(name))
      ? storedOrder
      : [...defaultSectionOrder];
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

  // The inline mobile menu closes once a choice has changed the page
  useEffect(() => {
    setMenuOpen(false);
  }, [location.pathname, isNarrow]);

  useEffect(() => {
    // Question pages set their own title, one per step
    const ownsTitle = location.pathname.startsWith("/frailty/cga/v2/");
    if (!ownsTitle) document.title = `${currentTabLabel} — ${view.patient.name} — NHS National Care Records Service`;
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
        onSelect: () => {
          if (item.key === view.key) return;
          // Never change patient in one click: confirm who is about to be opened (wrong-patient safeguard)
          setMenuOpen(false);
          setPendingView(item.key);
        },
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
          setShowReorderPanel(true);
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
                onToggleMenu={() => setMenuOpen((value) => !value)}
              />
              {isNarrow && (
                <section id="ncrs-mobile-menu" className="ncrs-mobile-menu" hidden={!menuOpen} aria-label="Menu">
                  <div className="ncrs-mobile-menu__header">
                    <h2>Menu</h2>
                    <Button variant="secondary" onClick={() => setMenuOpen(false)}>
                      Close menu
                    </Button>
                  </div>
                  <button
                    type="button"
                    className="ncrs-mobile-menu__find nhsuk-button nhsuk-button--secondary"
                    onClick={() => {
                      setMenuOpen(false);
                      setAppView("search");
                    }}
                  >
                    Find patient
                  </button>
                  <div className="ncrs-mobile-menu__group">
                    <h3>Patient</h3>
                    {patientMenu}
                  </div>
                  <div className="ncrs-mobile-menu__group">
                    <h3>Record view</h3>
                    {viewMenu}
                  </div>
                  <div className="ncrs-mobile-menu__group">
                    <h3>Patient details</h3>
                    <PatientDetails patient={view.patient} />
                  </div>
                  <div className="ncrs-mobile-menu__group">
                    <h3>Signed in as</h3>
                    <AccountMenu />
                  </div>
                  <div className="ncrs-mobile-menu__group">
                    <h3>Page options</h3>
                    <PageOptions {...pageOptions} />
                  </div>
                </section>
              )}
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
                      <NavLink to={path} end={path === "/" || tabs.some(([, other]) => other.startsWith(`${path}/`))}>
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
                  <InlinePanel
                    open={pendingView !== null}
                    title="Switch patient?"
                    footer={
                      <>
                        <Button variant="secondary" onClick={() => setPendingView(null)}>
                          Stay on {view.patient.name}
                        </Button>
                        <Button
                          onClick={() => {
                            const next = pendingView && recordViews[pendingView];
                            setPendingView(null);
                            if (next) navigate(next.home);
                          }}
                        >
                          Open {pendingView && recordViews[pendingView].patient.name}
                        </Button>
                      </>
                    }
                  >
                    {pendingView && (
                      <>
                        <p>You are leaving {view.patient.name}'s record. Check these details match the patient in front of you.</p>
                        <DetailList
                          rows={[
                            ["Name", recordViews[pendingView].patient.name],
                            ["Date of birth", recordViews[pendingView].patient.dob],
                            ["NHS number", recordViews[pendingView].patient.nhsNumber],
                            ["Record", `${recordViews[pendingView].label} record`],
                          ]}
                        />
                      </>
                    )}
                  </InlinePanel>
                  <ReorderPanel
                    open={showReorderPanel}
                    title="Reorder sections"
                    description="Use the arrow buttons to change the order of the sections on the Summary page."
                    items={cardOrder}
                    onApply={setCardOrder}
                    onClose={() => setShowReorderPanel(false)}
                  />
                </main>
              </div>
            </div>
          </div>
        </SectionOrderContext.Provider>
      </DisclosureGroup>
    </BreadcrumbProvider>
  );
}
