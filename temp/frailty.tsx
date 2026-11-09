import React, { useState, useRef, type ReactNode } from "react";

const assetPathPrefix = "/assets";

// Shared assets
const imgNhs = `${assetPathPrefix}/09b0f.png`;
const imgIconWhatsNew = `${assetPathPrefix}/da88a.svg`;
const imgIconSettings = `${assetPathPrefix}/b008b.svg`;
const imgIconCopy = `${assetPathPrefix}/9bab6.svg`;
// Snapshot-specific assets
const imgIconCfsUp = `${assetPathPrefix}/b9f6e.svg`;
const imgIconAi = `${assetPathPrefix}/b7194.svg`;
const imgIconViewPlan = `${assetPathPrefix}/66a2d.svg`;
const imgIconNoCpr = `${assetPathPrefix}/421de.svg`;
const imgIconHighRisk = `${assetPathPrefix}/d51fc.svg`;
const imgIconModRisk = `${assetPathPrefix}/69cd8.svg`;
const imgIconClockSmall = `${assetPathPrefix}/583ed.svg`;
const imgIconServices = `${assetPathPrefix}/334ed.svg`;
const imgIconServiceItem = `${assetPathPrefix}/2df08.svg`;
const imgIconPriority = `${assetPathPrefix}/606b0.svg`;
const imgIconCarePlanShortcut = `${assetPathPrefix}/f9ba6.svg`;
const imgIconFalls = `${assetPathPrefix}/46f25.svg`;
const imgIconMobility = `${assetPathPrefix}/6dcb1.svg`;
const imgIconHousehold = `${assetPathPrefix}/f5934.svg`;
const imgIconCarer = `${assetPathPrefix}/f92a3.svg`;
const imgIconVitals = `${assetPathPrefix}/dc368.svg`;
const imgIconConditions = `${assetPathPrefix}/67315.svg`;
const imgIconMeds = `${assetPathPrefix}/4cb1f.svg`;
const imgIconTimeline = `${assetPathPrefix}/0fb6a.svg`;
const imgIconAppt = `${assetPathPrefix}/fab4c.svg`;
const imgIconConnected = `${assetPathPrefix}/44b31.svg`;
const imgIconMedOk = `${assetPathPrefix}/eeb13.svg`;
const imgIconMedReview = `${assetPathPrefix}/0de10.svg`;
const imgIconApptLoc = `${assetPathPrefix}/a5320.svg`;
const imgIconConnectedCheck = `${assetPathPrefix}/b9ed4.svg`;
const imgIconHide = `${assetPathPrefix}/0de10.svg`;
const imgIconRisk = `${assetPathPrefix}/df636.svg`;
// CGA Prep assets
const imgIconInfo = `${assetPathPrefix}/55f69.svg`;
const imgIconDuration = `${assetPathPrefix}/8583b.svg`;
const imgIconCarerPerson = `${assetPathPrefix}/b8ec1.svg`;
const imgIconCalendar = `${assetPathPrefix}/bdfd7.svg`;
// CGA Assessment assets
const imgCgaConfirm = `${assetPathPrefix}/a2738.svg`;
const imgCgaEdit = `${assetPathPrefix}/23140.svg`;
const imgCgaDismiss = `${assetPathPrefix}/283b2.svg`;
const imgCgaAccept = `${assetPathPrefix}/6df64.svg`;
const imgCgaReject = `${assetPathPrefix}/efe6c.svg`;
const imgCgaEditLarge = `${assetPathPrefix}/cabea.svg`;
const imgCgaChevron = `${assetPathPrefix}/d206d.svg`;
const imgCgaPending = `${assetPathPrefix}/4f7ee.svg`;
const imgCgaAiSparkle = `${assetPathPrefix}/538de.svg`;
const imgCgaAiCircle = `${assetPathPrefix}/a2734.svg`;
const imgCgaRisk = `${assetPathPrefix}/7bfa2.svg`;
const imgCgaTimestamp = `${assetPathPrefix}/f3d04.svg`;

// Care Plan assets
const imgCpHistory = `${assetPathPrefix}/90a3c.svg`;
const imgCpTimestamp = `${assetPathPrefix}/f3d04.svg`;
const imgCpCheck = `${assetPathPrefix}/37965.svg`;
const imgCpInfo = `${assetPathPrefix}/55f69.svg`;
const imgCpAiSparkle = `${assetPathPrefix}/99b24.svg`;
const imgCpPending = `${assetPathPrefix}/4f7ee.svg`;
const imgCpRisk = `${assetPathPrefix}/588be.svg`;
const imgCpReferred = `${assetPathPrefix}/a6450.svg`;
const imgCpOk = `${assetPathPrefix}/ca47e.svg`;
const imgCpEdit = `${assetPathPrefix}/520f3.svg`;
const imgCpGenerate = `${assetPathPrefix}/57aba.svg`;
const imgCpMdt = `${assetPathPrefix}/de3e1.svg`;
const imgCpInsightIcon = `${assetPathPrefix}/63729.svg`;
const imgCpSystemPrefilled = `${assetPathPrefix}/b7194.svg`;
const imgCpCarePlanIcon = `${assetPathPrefix}/1d060.svg`;
const imgCpLivePlan = `${assetPathPrefix}/c595a.svg`;
const imgCpActionsIcon = `${assetPathPrefix}/17350.svg`;
const imgCpAudit = `${assetPathPrefix}/3738c.svg`;
// OT Update assets
const imgOtCfsIcon = `${assetPathPrefix}/033ea.svg`;
const imgOtEditIcon = `${assetPathPrefix}/32e05.svg`;

type Page = "snapshot" | "cga-assessment" | "care-plan";

// ── Shared components ────────────────────────────────────────────────────────

function TopNav() {
  return (
    <>
      <div className="bg-[#005eb8] flex items-center justify-between px-6 py-2">
        <div className="flex gap-4 items-center">
          <img src={imgNhs} alt="NHS" className="h-10 w-auto" />
          <div className="bg-white/30 w-px h-8" />
          <p className="text-white text-base font-semibold">
            National Care Records Service
          </p>
        </div>
        <div className="flex gap-4 items-end">
          <div className="flex flex-col gap-0.5">
            <p className="text-white/70 text-xs">User</p>
            <div className="relative bg-white h-8 w-[170px]">
              <div className="absolute inset-0 flex items-center px-3">
                <p className="text-[#1d1d1d] text-sm font-medium truncate">
                  Dr Sarah Smith
                </p>
              </div>
              <span className="absolute right-2 top-2 text-[#505a5f] text-xs">
                ▾
              </span>
            </div>
          </div>
          <div className="flex flex-col gap-0.5">
            <p className="text-white/70 text-xs">Role</p>
            <div className="relative bg-white h-8 w-[289px]">
              <div className="absolute inset-0 flex items-center px-3">
                <p className="text-[#1d1d1d] text-sm font-medium truncate">
                  R0260 General Medical Practitioner
                </p>
              </div>
              <span className="absolute right-2 top-2 text-[#505a5f] text-xs">
                ▾
              </span>
            </div>
          </div>
        </div>
      </div>
      <div className="bg-[#005eb8] border-t border-white/20 flex justify-end px-6 h-[33px]">
        <div className="flex items-center">
          {["Find patient", "Change role"].map((item) => (
            <button
              key={item}
              className="text-white text-sm px-3 py-1.5 hover:bg-white/10"
            >
              {item}
            </button>
          ))}
          <span className="text-white/30 text-sm px-1">|</span>
          <button className="text-white text-sm px-3 py-1.5 hover:bg-white/10 flex items-center gap-1">
            What's new <img src={imgIconWhatsNew} alt="" className="size-3" />
          </button>
          <span className="text-white/30 text-sm px-1">|</span>
          <button className="text-white text-sm px-3 py-1.5 hover:bg-white/10">
            Give feedback
          </button>
          <span className="text-white/30 text-sm px-1">|</span>
          <button className="text-white text-sm px-3 py-1.5 hover:bg-white/10 flex items-center gap-1">
            Settings <img src={imgIconSettings} alt="" className="size-3" />
          </button>
          <span className="text-white/30 text-sm px-1">|</span>
          <button className="text-white text-sm px-3 py-1.5 hover:bg-white/10">
            Log out
          </button>
        </div>
      </div>
      <div className="bg-[#d2e4f5] flex items-center gap-0 px-6 py-2 flex-wrap">
        <span className="text-[#1d1d1d] text-sm font-bold">Harold BENNETT</span>
        <span className="text-[#505a5f] text-sm px-2">·</span>
        <span className="text-[#1d1d1d] text-sm">80 years old, male</span>
        <span className="text-[#505a5f] text-sm px-2">·</span>
        <span className="text-[#1d1d1d] text-sm">DoB:</span>
        <span className="text-[#1d1d1d] text-sm font-bold pl-1">
          15 Jun 1945
        </span>
        <span className="text-[#505a5f] text-sm px-2">·</span>
        <span className="text-[#1d1d1d] text-sm">NHS number:</span>
        <span
          className="text-[#1d1d1d] text-sm font-bold pl-1"
          style={{ fontFamily: "Courier New, monospace" }}
        >
          485 726 2193
        </span>
        <div className="pl-1">
          <button className="border border-[rgba(29,29,29,0.4)] flex gap-1 items-center px-2 py-0.5 text-[#1d1d1d] text-xs font-semibold">
            <img src={imgIconCopy} alt="" className="size-[11px]" />
            Copy
          </button>
        </div>
        <span className="text-[#505a5f] text-sm px-2">·</span>
        <span className="text-[#1d1d1d] text-sm">Address:</span>
        <span className="text-[#1d1d1d] text-sm font-bold pl-1">
          14 ELM GROVE, BROMLEY, BR1 3PQ
        </span>
      </div>
    </>
  );
}

function PageTabs({
  active,
  onNavigate,
}: {
  active: Page;
  onNavigate: (p: Page) => void;
}) {
  const tabs: { label: string; page: Page; dot?: boolean }[] = [
    { label: "Frailty Snapshot", page: "snapshot", dot: true },
    {
      label: "Comprehensive Geriatric Assessment (CGA)",
      page: "cga-assessment",
    },
    { label: "Care Plan", page: "care-plan" },
  ];
  return (
    <div className="bg-white border-b border-[#d8dde6]">
      <div className="flex h-[47px] items-end px-6 overflow-x-auto">
        {tabs.map(({ label, page, dot }) => (
          <button
            key={label}
            onClick={() => onNavigate(page)}
            className={`flex items-center gap-1.5 px-5 py-3 text-sm font-medium whitespace-nowrap border-b-[3px] ${
              active === page
                ? "text-[#005eb8] border-[#005eb8]"
                : "text-[#505a5f] border-transparent hover:border-gray-300"
            }`}
          >
            {label}
            {dot && <span className="inline-block size-2 bg-[#00703c]" />}
          </button>
        ))}
      </div>
    </div>
  );
}

// ── Snapshot sub-components ──────────────────────────────────────────────────

interface ProvenanceInfo {
  org: string;
  setting: string;
  system: string;
  pulled: string;
  by: string;
}

function ProvenanceTooltip({
  info,
  color,
  label,
  darkText,
}: {
  info: ProvenanceInfo;
  color: string;
  label: string;
  darkText?: boolean;
}) {
  const [pos, setPos] = useState<{ x: number; y: number } | null>(null);
  const ref = useRef<HTMLSpanElement>(null);

  function handleEnter() {
    if (ref.current) {
      const r = ref.current.getBoundingClientRect();
      const tooltipW = 224; // w-56 = 14rem = 224px
      const spaceRight = window.innerWidth - r.left;
      const x = spaceRight < tooltipW + 8 ? r.right - tooltipW : r.left;
      setPos({ x, y: r.top });
    }
  }

  return (
    <span
      ref={ref}
      className="relative inline-flex"
      onMouseEnter={(e) => {
        e.stopPropagation();
        handleEnter();
      }}
      onMouseLeave={(e) => {
        e.stopPropagation();
        if (
          e.relatedTarget instanceof Node &&
          !ref.current?.contains(e.relatedTarget)
        )
          setPos(null);
        else if (!(e.relatedTarget instanceof Node)) setPos(null);
      }}
    >
      <span
        className={`inline-flex items-center px-2 py-0.5  text-xs font-semibold cursor-default border border-white/60 ${darkText ? "text-[#1d1d1d]" : "text-white"}`}
        style={{ backgroundColor: color }}
      >
        {label}
      </span>
      {pos && (
        <span
          className="fixed z-[9999] w-56 bg-[#1d1d1d] text-white text-[11px] -[6px] px-3 py-2.5 shadow-lg pointer-events-none leading-[1.6]"
          style={{
            left: Math.max(8, pos.x),
            top: pos.y - 8,
            transform: "translateY(-100%)",
          }}
        >
          <span className="block">
            <span className="font-semibold">Organisation:</span> {info.org}
          </span>
          <span className="block">
            <span className="font-semibold">Care setting:</span> {info.setting}
          </span>
          <span className="block">
            <span className="font-semibold">Source system:</span> {info.system}
          </span>
          <span className="block">Pulled {info.pulled}</span>
          <span className="block">By {info.by}</span>
        </span>
      )}
    </span>
  );
}

function SourceBadge({
  label,
  color,
  provenance,
}: {
  label: string;
  color: string;
  provenance?: ProvenanceInfo;
}) {
  if (provenance)
    return <ProvenanceTooltip label={label} color={color} info={provenance} />;
  return (
    <span
      className="inline-flex items-center px-2 py-0.5 text-white text-xs font-semibold"
      style={{ backgroundColor: color }}
    >
      {label}
    </span>
  );
}

// Named provenance presets
const PROV = {
  cfsTag: {
    org: "Community Health Services",
    setting: "Community care",
    system: "Frailty MDT notes",
    pulled: "3 days ago",
    by: "Jane Smith (District Nurse)",
  },
  sprGP: {
    org: "Woodside Health Centre",
    setting: "Primary care",
    system: "EMIS GP",
    pulled: "3 days ago",
    by: "Dr Patel (GP)",
  },
  sprSocial: {
    org: "Croydon Council Adult Social Care",
    setting: "Social care",
    system: "Liquidlogic",
    pulled: "5 days ago",
    by: "Aisha Khan (Social worker)",
  },
  sprCommunity: {
    org: "Community Health Services",
    setting: "Community care",
    system: "Frailty MDT notes",
    pulled: "3 days ago",
    by: "Jane Smith (District Nurse)",
  },
  dnacprGP: {
    org: "Woodside Health Centre",
    setting: "Primary care",
    system: "EMIS GP",
    pulled: "5 days ago",
    by: "Dr Patel (GP)",
  },
} as const;

function CollapseButton({
  open,
  onClick,
}: {
  open: boolean;
  onClick: () => void;
}) {
  return (
    <button
      onClick={onClick}
      className="border border-[#d8dde6] flex items-center justify-center size-8 shrink-0 hover:bg-gray-50"
    >
      <span className="text-xs text-[#505a5f]">{open ? "▲" : "▼"}</span>
    </button>
  );
}

function PanelHeader({
  icon,
  title,
  subtitle,
  open,
  onToggle,
  tooltip,
}: {
  icon?: string;
  title: string;
  subtitle?: string;
  open: boolean;
  onToggle: () => void;
  tooltip?: string;
}) {
  const tipRef = useRef<HTMLSpanElement>(null);
  const [tipPos, setTipPos] = useState<{ x: number; y: number } | null>(null);

  function handleTipEnter() {
    if (tipRef.current) {
      const r = tipRef.current.getBoundingClientRect();
      const tooltipW = 240;
      const x =
        window.innerWidth - r.left < tooltipW + 8 ? r.right - tooltipW : r.left;
      setTipPos({ x, y: r.top });
    }
  }

  return (
    <div className="flex gap-3 items-start pt-4 px-4 pb-0">
      <div className="flex flex-col flex-1 min-w-0">
        <div className="flex gap-2 items-center">
          {icon && (
            <img
              src={icon}
              alt=""
              className="nhs-blue-icon size-[18px] shrink-0"
            />
          )}
          <p className="font-bold text-[#1d1d1d] text-base leading-6 whitespace-nowrap">
            {title}
          </p>
          {tooltip && (
            <span
              ref={tipRef}
              onMouseEnter={handleTipEnter}
              onMouseLeave={() => setTipPos(null)}
              className="cursor-default text-[#505a5f] hover:text-[#1d1d1d] leading-none select-none"
              style={{ fontSize: 13 }}
            >
              ⓘ
              {tipPos && (
                <span
                  className="fixed z-[9999] w-60 bg-[#1d1d1d] text-white text-[11px] -[6px] px-3 py-2.5 shadow-lg pointer-events-none leading-[1.7] font-normal"
                  style={{
                    left: Math.max(8, tipPos.x),
                    top: tipPos.y - 8,
                    transform: "translateY(-100%)",
                  }}
                >
                  {tooltip.split("\n").map((line, i) => (
                    <span
                      key={i}
                      className={`block ${i === 0 ? "font-semibold mb-1" : ""}`}
                    >
                      {line}
                    </span>
                  ))}
                </span>
              )}
            </span>
          )}
        </div>
        {subtitle && (
          <p className="text-[#505a5f] text-sm leading-5 mt-1">{subtitle}</p>
        )}
      </div>
      <div className="flex gap-2 items-center shrink-0">
        <CollapseButton open={open} onClick={onToggle} />
      </div>
    </div>
  );
}

function RiskCard({
  severity,
  severityColor,
  riskName,
  level,
  detail,
  updated,
  clinician,
  source,
  provenance,
  bannerTooltip,
}: {
  severity: string;
  severityColor: string;
  riskName: string;
  level: string;
  detail?: string;
  updated?: string;
  clinician: string;
  source: string;
  provenance?: ProvenanceInfo;
  bannerTooltip?: string;
}) {
  const bannerRef = useRef<HTMLDivElement>(null);
  const [bannerTipPos, setBannerTipPos] = useState<{
    x: number;
    y: number;
  } | null>(null);

  function handleBannerEnter() {
    if (bannerRef.current) {
      const r = bannerRef.current.getBoundingClientRect();
      setBannerTipPos({ x: r.left, y: r.top });
    }
  }

  return (
    <div className="border border-[#d8dde6] flex flex-col">
      <div
        ref={bannerRef}
        className="relative min-h-11 shrink-0"
        style={{
          backgroundColor: severityColor,
          cursor: bannerTooltip ? "default" : undefined,
        }}
        onMouseEnter={bannerTooltip ? handleBannerEnter : undefined}
        onMouseLeave={
          bannerTooltip
            ? (e) => {
                const rt = e.relatedTarget;
                if (!(rt instanceof Node) || !bannerRef.current?.contains(rt))
                  setBannerTipPos(null);
              }
            : undefined
        }
      >
        {bannerTooltip && bannerTipPos && (
          <span
            className="fixed z-[9999] w-64 bg-[#1d1d1d] text-white text-[11px] -[6px] px-3 py-2.5 shadow-lg pointer-events-none leading-[1.7]"
            style={{
              left: Math.max(
                8,
                Math.min(bannerTipPos.x, window.innerWidth - 264),
              ),
              top: bannerTipPos.y - 8,
              transform: "translateY(-100%)",
            }}
          >
            {bannerTooltip.split("\n").map((line, i) => (
              <span
                key={i}
                className={`block ${i === 0 ? "font-semibold mb-1" : ""}`}
              >
                {line}
              </span>
            ))}
          </span>
        )}
        <div className="flex gap-2 items-center justify-between px-4 py-2.5">
          <div className="flex gap-2 items-center min-w-0">
            <img
              src={severity === "High" ? imgIconHighRisk : imgIconModRisk}
              alt=""
              className="size-4"
            />
            <span className="text-white text-sm font-bold">{riskName}</span>
          </div>
          <div className="shrink-0" onMouseEnter={() => setBannerTipPos(null)}>
            {provenance ? (
              <ProvenanceTooltip
                label={source}
                color="#ffffff"
                info={provenance}
                darkText
              />
            ) : (
              <span className="bg-white border border-white/60 px-2 py-0.5 text-[#1d1d1d] text-xs font-semibold">
                {source}
              </span>
            )}
          </div>
        </div>
      </div>
      <div className="bg-white px-4 py-3 flex flex-col gap-1">
        <p
          className="font-semibold leading-6"
          style={{ color: severityColor, fontSize: 16 }}
        >
          {level}
        </p>
        {detail && (
          <p className="text-[#1d1d1d] text-sm font-medium leading-5">
            {detail}
          </p>
        )}
        <div className="flex gap-2 items-center mt-1">
          <span className="text-[#595959] text-xs">{clinician}</span>
        </div>
      </div>
    </div>
  );
}

function TimelineItem({
  date,
  title,
  description,
  updated,
  clinician,
  sourceBg,
  sourceLabel,
  provenance,
}: {
  date: string;
  title: string;
  description: string;
  updated?: string;
  clinician: string;
  sourceBg: string;
  sourceLabel: string;
  provenance?: ProvenanceInfo;
}) {
  return (
    <div>
      <div className="flex items-start justify-between">
        <div>
          <p className="text-[#505a5f] text-sm font-semibold leading-5">
            {date}
          </p>
          <p className="text-[#1d1d1d] text-base font-semibold leading-7">
            {title}
          </p>
        </div>
        {provenance ? (
          <ProvenanceTooltip
            label={sourceLabel}
            color={sourceBg}
            info={provenance}
          />
        ) : (
          <span
            className="px-2 py-0.5 text-white text-xs font-semibold"
            style={{ backgroundColor: sourceBg }}
          >
            {sourceLabel}
          </span>
        )}
      </div>
      <p className="text-[#505a5f] text-base leading-6 mt-1">{description}</p>
      <div className="flex gap-2 items-center mt-2">
        <span className="text-[#505a5f] text-xs">{clinician}</span>
      </div>
    </div>
  );
}

function MedItem({
  name,
  status,
  statusColor,
  freq,
  reviewed,
  updated,
  source,
  sourceColor,
  provenance,
}: {
  name: string;
  status: string;
  statusColor: string;
  freq: string;
  reviewed?: string;
  updated?: string;
  source: string;
  sourceColor: string;
  provenance?: ProvenanceInfo;
}) {
  return (
    <div className="flex gap-3 items-start pt-2">
      <div className="flex-1 min-w-0">
        <div className="flex gap-2 items-center">
          <span className="text-[#1d1d1d] text-base font-semibold leading-6 whitespace-nowrap">
            {name}
          </span>
          <span
            className="flex gap-1 items-center px-1.5 py-0.5 text-white text-xs font-bold whitespace-nowrap"
            style={{ backgroundColor: statusColor }}
          >
            <img
              src={status === "Optimised" ? imgIconMedOk : imgIconMedReview}
              alt=""
              className="size-2.5"
            />
            {status}
          </span>
        </div>
        <p className="text-[#505a5f] text-sm leading-5">{freq}</p>
        {reviewed && (
          <p className="text-[#00703c] text-sm leading-5">
            Reviewed: {reviewed}
          </p>
        )}
      </div>
      <div className="shrink-0 mt-0.5">
        {provenance ? (
          <ProvenanceTooltip
            label={source}
            color={sourceColor}
            info={provenance}
          />
        ) : (
          <span
            className="px-2 py-0.5 text-white text-xs font-semibold"
            style={{ backgroundColor: sourceColor }}
          >
            {source}
          </span>
        )}
      </div>
    </div>
  );
}

// ── Vitals modal data ─────────────────────────────────────────────────────────

interface VitalReading {
  date: string;
  value: string;
  by: string;
  source: string;
  latest?: boolean;
}

interface VitalDetail {
  label: string;
  value: string;
  unit: string;
  timestamp: string;
  trend6mo: {
    icon: string;
    label: string;
    summary: string;
    up: boolean | null;
  };
  trend1yr: {
    icon: string;
    label: string;
    summary: string;
    up: boolean | null;
  };
  provenance: {
    source: string;
    system: string;
    org: string;
    setting: string;
    updated: string;
    recordedBy: string;
  };
  readings: VitalReading[];
}

const VITALS_DETAIL: Record<string, VitalDetail> = {
  BP: {
    label: "BLOOD PRESSURE (BP)",
    value: "148/90",
    unit: "mmHg",
    timestamp: "22 Jan 2026",
    trend6mo: {
      icon: "↑",
      label: "Trending up",
      summary: "Systolic risen ~12 mmHg over 6 months",
      up: true,
    },
    trend1yr: {
      icon: "↑",
      label: "Trending up",
      summary: "Sustained upward trend over past year",
      up: true,
    },
    provenance: {
      source: "Community",
      system: "EMIS Community",
      org: "Community Health Services",
      setting: "Community care",
      updated: "2 weeks ago",
      recordedBy: "District Nurse · Jane Smith",
    },
    readings: [
      {
        date: "22 Jan 2026",
        value: "148/90 mmHg",
        by: "District Nurse",
        source: "EMIS Community",
        latest: true,
      },
      {
        date: "08 Jan 2026",
        value: "145/88 mmHg",
        by: "District Nurse",
        source: "EMIS Community",
      },
      {
        date: "15 Dec 2025",
        value: "143/86 mmHg",
        by: "Practice Nurse",
        source: "EMIS GP",
      },
      {
        date: "01 Dec 2025",
        value: "140/85 mmHg",
        by: "Practice Nurse",
        source: "EMIS GP",
      },
      {
        date: "15 Nov 2025",
        value: "138/84 mmHg",
        by: "GP",
        source: "EMIS GP",
      },
      {
        date: "01 Nov 2025",
        value: "136/82 mmHg",
        by: "GP",
        source: "EMIS GP",
      },
      {
        date: "22 Jan 2025",
        value: "136/82 mmHg",
        by: "GP",
        source: "EMIS GP",
      },
    ],
  },
  Pulse: {
    label: "PULSE",
    value: "62",
    unit: "bpm",
    timestamp: "22 Jan 2026",
    trend6mo: {
      icon: "~",
      label: "Stable",
      summary: "Pulse stable, 60 to 68 bpm range",
      up: null,
    },
    trend1yr: {
      icon: "~",
      label: "Stable",
      summary: "No significant change over 1 year",
      up: null,
    },
    provenance: {
      source: "Community",
      system: "EMIS Community",
      org: "Community Health Services",
      setting: "Community care",
      updated: "2 weeks ago",
      recordedBy: "District Nurse · Jane Smith",
    },
    readings: [
      {
        date: "22 Jan 2026",
        value: "62 bpm",
        by: "District Nurse",
        source: "EMIS Community",
        latest: true,
      },
      {
        date: "08 Jan 2026",
        value: "65 bpm",
        by: "District Nurse",
        source: "EMIS Community",
      },
      {
        date: "15 Dec 2025",
        value: "68 bpm",
        by: "Practice Nurse",
        source: "EMIS GP",
      },
      {
        date: "01 Dec 2025",
        value: "66 bpm",
        by: "Practice Nurse",
        source: "EMIS GP",
      },
      { date: "22 Jan 2025", value: "64 bpm", by: "GP", source: "EMIS GP" },
      { date: "01 Nov 2025", value: "63 bpm", by: "GP", source: "EMIS GP" },
    ],
  },
  Weight: {
    label: "WEIGHT",
    value: "54",
    unit: "kg",
    timestamp: "22 Jan 2026",
    trend6mo: {
      icon: "↓",
      label: "Trending down",
      summary: "Lost ~3 kg over 6 months",
      up: false,
    },
    trend1yr: {
      icon: "↓",
      label: "Trending down",
      summary: "Progressive weight loss over past year",
      up: false,
    },
    provenance: {
      source: "Community",
      system: "EMIS Community",
      org: "Community Health Services",
      setting: "Community care",
      updated: "2 weeks ago",
      recordedBy: "District Nurse · Jane Smith",
    },
    readings: [
      {
        date: "22 Jan 2026",
        value: "54 kg",
        by: "District Nurse",
        source: "EMIS Community",
        latest: true,
      },
      {
        date: "01 Dec 2025",
        value: "55 kg",
        by: "Practice Nurse",
        source: "EMIS GP",
      },
      {
        date: "01 Oct 2025",
        value: "56 kg",
        by: "Practice Nurse",
        source: "EMIS GP",
      },
      { date: "01 Aug 2025", value: "57 kg", by: "GP", source: "EMIS GP" },
      { date: "22 Jan 2025", value: "57 kg", by: "GP", source: "EMIS GP" },
    ],
  },
  "Blood Glucose": {
    label: "BLOOD GLUCOSE",
    value: "7.2",
    unit: "mmol/L",
    timestamp: "22 Jan 2026",
    trend6mo: {
      icon: "↑",
      label: "Trending up",
      summary: "Glucose risen from ~6.4 to 7.2 mmol/L",
      up: true,
    },
    trend1yr: {
      icon: "↑",
      label: "Trending up",
      summary: "Upward trend, approaching diabetic threshold",
      up: true,
    },
    provenance: {
      source: "GP",
      system: "EMIS GP",
      org: "Woodside Health Centre",
      setting: "Primary care",
      updated: "2 weeks ago",
      recordedBy: "Practice Nurse · EMIS GP",
    },
    readings: [
      {
        date: "22 Jan 2026",
        value: "7.2 mmol/L",
        by: "Practice Nurse",
        source: "EMIS GP",
        latest: true,
      },
      {
        date: "01 Dec 2025",
        value: "7.0 mmol/L",
        by: "Practice Nurse",
        source: "EMIS GP",
      },
      { date: "01 Oct 2025", value: "6.8 mmol/L", by: "GP", source: "EMIS GP" },
      { date: "01 Aug 2025", value: "6.6 mmol/L", by: "GP", source: "EMIS GP" },
      { date: "01 Jun 2025", value: "6.4 mmol/L", by: "GP", source: "EMIS GP" },
      { date: "22 Jan 2025", value: "6.3 mmol/L", by: "GP", source: "EMIS GP" },
    ],
  },
};

function trendColor(up: boolean | null) {
  if (up === null) return "#00703c";
  return up ? "#d5281b" : "#d5281b";
}

function VitalsModal({
  vitalKey,
  onClose,
}: {
  vitalKey: string;
  onClose: () => void;
}) {
  const d = VITALS_DETAIL[vitalKey as keyof typeof VITALS_DETAIL];
  return (
    <div
      className="fixed inset-0 z-50 flex items-start justify-center bg-black/40 overflow-y-auto py-8"
      onClick={onClose}
    >
      <div
        className="bg-white -[12px] shadow-2xl w-full max-w-2xl mx-4 flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Modal header */}
        <div className="flex items-start justify-between px-7 pt-6 pb-4 border-b border-[#d8dde6]">
          <div>
            <h2 className="font-bold text-[20px] text-[#1d1d1d]">
              {d.label}: History
            </h2>
            <p className="text-[#505a5f] text-[14px] mt-1">
              Latest reading with trend analysis and historical data.
            </p>
          </div>
          <button
            onClick={onClose}
            className="text-[#505a5f] hover:text-[#1d1d1d] text-[22px] leading-none mt-0.5 font-light"
          >
            &times;
          </button>
        </div>

        {/* Vital block */}
        <div className="p-6 flex flex-col gap-6 overflow-y-auto max-h-[80vh]">
          {[vitalKey].map((key) => {
            const d = VITALS_DETAIL[key];
            return (
              <div key={key} className="border border-[#d8dde6] -[8px] p-5">
                {/* Header row */}
                <div className="flex items-start justify-between">
                  <div>
                    <p className="text-[11px] font-bold text-[#505a5f] tracking-wide uppercase">
                      {d.label}
                    </p>
                    <div className="flex items-end gap-1.5 mt-1">
                      <span className="text-[28px] font-bold text-[#1d1d1d] leading-none">
                        {d.value}
                      </span>
                      <span className="text-[14px] font-semibold text-[#505a5f] pb-0.5">
                        {d.unit}
                      </span>
                    </div>
                  </div>
                  <div className="flex items-center gap-1.5 text-[12px] text-[#505a5f]">
                    <img src={imgIconClockSmall} alt="" className="size-3" />
                    <span>{d.timestamp}</span>
                  </div>
                </div>

                {/* 3-column trend grid */}
                <div className="grid grid-cols-3 gap-3 mt-4">
                  {/* Latest */}
                  <div className="bg-[#eef1f3] border border-[#c8d0d8] -[6px] p-3">
                    <p className="text-[10px] font-bold text-[#505a5f] tracking-wide uppercase mb-1">
                      Latest
                    </p>
                    <p className="font-bold text-[15px] text-[#1d1d1d]">
                      {d.value}{" "}
                      <span className="font-normal text-[12px]">{d.unit}</span>
                    </p>
                    <p className="text-[12px] text-[#505a5f] mt-0.5">
                      {d.timestamp}
                    </p>
                  </div>
                  {/* 6 months */}
                  <div className="bg-[#eef1f3] border border-[#c8d0d8] -[6px] p-3">
                    <p className="text-[10px] font-bold text-[#505a5f] tracking-wide uppercase mb-1">
                      6 Months
                    </p>
                    <div className="flex items-center gap-1.5">
                      <span
                        className="font-bold text-[16px]"
                        style={{ color: trendColor(d.trend6mo.up) }}
                      >
                        {d.trend6mo.icon}
                      </span>
                      <span
                        className="font-semibold text-[13px]"
                        style={{ color: trendColor(d.trend6mo.up) }}
                      >
                        {d.trend6mo.label}
                      </span>
                    </div>
                    <p className="text-[12px] text-[#505a5f] mt-1">
                      {d.trend6mo.summary}
                    </p>
                  </div>
                  {/* 1 year */}
                  <div className="bg-[#eef1f3] border border-[#c8d0d8] -[6px] p-3">
                    <p className="text-[10px] font-bold text-[#505a5f] tracking-wide uppercase mb-1">
                      1 Year
                    </p>
                    <div className="flex items-center gap-1.5">
                      <span
                        className="font-bold text-[16px]"
                        style={{ color: trendColor(d.trend1yr.up) }}
                      >
                        {d.trend1yr.icon}
                      </span>
                      <span
                        className="font-semibold text-[13px]"
                        style={{ color: trendColor(d.trend1yr.up) }}
                      >
                        {d.trend1yr.label}
                      </span>
                    </div>
                    <p className="text-[12px] text-[#505a5f] mt-1">
                      {d.trend1yr.summary}
                    </p>
                  </div>
                </div>

                {/* Provenance */}
                <div className="mt-4 bg-[#f7f9fc] border border-[#e8edee] -[6px] px-4 py-3 grid grid-cols-2 gap-x-6 gap-y-1 text-[12px]">
                  {[
                    ["Source", d.provenance.source],
                    ["System", d.provenance.system],
                    ["Organisation", d.provenance.org],
                    ["Care setting", d.provenance.setting],
                    ["Updated", d.provenance.updated],
                    ["Recorded by", d.provenance.recordedBy],
                  ].map(([k, v]) => (
                    <div key={k} className="flex gap-1">
                      <span className="font-semibold text-[#505a5f]">{k}:</span>
                      <span className="text-[#1d1d1d]">{v}</span>
                    </div>
                  ))}
                </div>

                {/* Prior readings */}
                <div className="mt-4">
                  <div className="flex items-center gap-2 mb-3">
                    <svg
                      className="w-3.5 h-3.5 text-[#005eb8] shrink-0"
                      viewBox="0 0 16 16"
                      fill="none"
                      stroke="#005eb8"
                      strokeWidth="1.5"
                    >
                      <circle cx="8" cy="8" r="6.5" />
                      <path d="M8 5v3.5l2 2" strokeLinecap="round" />
                    </svg>
                    <p className="text-[10px] font-bold text-[#505a5f] tracking-wide uppercase">
                      Prior Readings
                    </p>
                  </div>
                  <div className="flex flex-col gap-1.5">
                    {d.readings.map((r, i) => (
                      <div
                        key={i}
                        className={`flex items-center justify-between px-3 py-2 -[6px] border ${r.latest ? "bg-[#e8f4f8] border-[#b3d7ea]" : "bg-[#fafbfc] border-[#e8edee]"}`}
                      >
                        <span
                          className={`text-[13px] font-semibold w-28 shrink-0 ${r.latest ? "text-[#005eb8]" : "text-[#505a5f]"}`}
                        >
                          {r.date}
                        </span>
                        <span
                          className={`text-[13px] font-bold flex-1 ${r.latest ? "text-[#005eb8]" : "text-[#1d1d1d]"}`}
                        >
                          {r.value}
                        </span>
                        <span className="text-[12px] text-[#505a5f] text-right">
                          {r.by} · {r.source}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

function VitalCard({
  label,
  value,
  unit,
  trend,
  trendColor: tc,
  trendDesc,
  source,
  sourceColor,
  provenance,
  onClick,
}: {
  label: string;
  value: string;
  unit: string;
  trend: string;
  trendColor: string;
  trendDesc: string;
  source: string;
  sourceColor: string;
  provenance?: ProvenanceInfo;
  onClick: () => void;
}) {
  return (
    <button
      onClick={onClick}
      className="bg-white border border-[#c8d0d8] p-3 flex flex-col text-left hover:border-[#005eb8] transition-colors w-full"
    >
      <p className="text-[#505a5f] text-xs font-semibold">{label}</p>
      <div className="flex items-end gap-1 mt-1">
        <span className="text-[#1d1d1d] text-lg font-bold leading-7">
          {value}
        </span>
        <span className="text-[#505a5f] text-xs font-semibold pb-1">
          {unit}
        </span>
      </div>
      <div className="flex gap-1 items-center mt-2">
        <span className="font-semibold text-xs" style={{ color: tc }}>
          {trend}
        </span>
        <span className="text-[#505a5f] text-xs truncate">{trendDesc}</span>
      </div>
      <div className="mt-2" onClick={(e) => e.stopPropagation()}>
        {provenance ? (
          <ProvenanceTooltip
            label={source}
            color={sourceColor}
            info={provenance}
          />
        ) : (
          <span
            className="px-2 py-0.5 text-white text-xs font-semibold"
            style={{ backgroundColor: sourceColor }}
          >
            {source}
          </span>
        )}
      </div>
      <span className="text-[#005eb8] text-xs font-semibold mt-2">
        History →
      </span>
    </button>
  );
}

function ServiceItem({
  name,
  status,
  statusColor,
  borderColor,
}: {
  name: string;
  status: string;
  statusColor: string;
  borderColor: string;
}) {
  return (
    <div
      className="bg-white border flex gap-3 items-center px-4 py-3 shadow-sm relative"
      style={{ borderColor }}
    >
      <img src={imgIconServiceItem} alt="" className="size-[18px] shrink-0" />
      <div className="flex flex-col">
        <p className="text-[#1d1d1d] text-sm font-bold leading-5">{name}</p>
        <div className="flex items-center mt-1">
          <span
            className="px-3 py-0.5 text-xs font-bold text-white"
            style={{
              backgroundColor:
                statusColor === "#505a5f" ? "#3d4246" : statusColor,
            }}
          >
            {status}
          </span>
        </div>
      </div>
    </div>
  );
}

function ConnectedSystemRow({
  name,
  org,
  status,
}: {
  name: string;
  org: string;
  status: "Connected" | "Not available";
}) {
  return (
    <div className="bg-white border border-[#d8dde6] px-3 py-2 flex items-center justify-between">
      <div>
        <p className="text-[#003f7e] text-base font-bold leading-6">{name}</p>
        <p className="text-[#505a5f] text-sm leading-5">{org}</p>
      </div>
      {status === "Connected" ? (
        <span className="flex items-center gap-1 bg-[#005eb8] px-2.5 py-1 text-white text-xs font-bold">
          <img src={imgIconConnectedCheck} alt="" className="size-3" />
          Connected
        </span>
      ) : (
        <span className="flex items-center gap-1 bg-[#505a5f] px-2.5 py-1 text-white text-xs font-bold">
          Not available
        </span>
      )}
    </div>
  );
}

function AppointmentCard({
  title,
  service,
  date,
  time,
  location,
  description,
  bookedBy,
  provenance,
}: {
  title: string;
  service: string;
  date: string;
  time: string;
  location: string;
  description: string;
  bookedBy: string;
  provenance?: ProvenanceInfo;
}) {
  return (
    <div className="bg-white border border-[#d8dde6] p-4">
      <div className="flex items-start justify-between">
        <div className="flex gap-2 items-center">
          <div className="bg-[#005eb8] p-1.5">
            <img src={imgIconApptLoc} alt="" className="size-3.5" />
          </div>
          <div>
            <p className="text-[#1d1d1d] text-sm font-bold leading-5">
              {title}
            </p>
            <p className="text-[#505a5f] text-xs">{service}</p>
          </div>
        </div>
        {provenance ? (
          <ProvenanceTooltip
            label="Community"
            color="#00703c"
            info={provenance}
          />
        ) : (
          <span className="px-2 py-0.5 text-white text-xs font-semibold bg-[#00703c]">
            Community
          </span>
        )}
      </div>
      <div className="grid grid-cols-2 gap-3 mt-3">
        <div>
          <p className="text-[#505a5f] text-xs font-semibold">Date</p>
          <p className="text-[#1d1d1d] text-sm font-semibold mt-1">{date}</p>
        </div>
        <div>
          <p className="text-[#505a5f] text-xs font-semibold">Time</p>
          <p className="text-[#1d1d1d] text-sm font-semibold mt-1">{time}</p>
        </div>
      </div>
      <div className="flex gap-1.5 items-center mt-3">
        <img src={imgIconApptLoc} alt="" className="size-3" />
        <span className="text-[#505a5f] text-xs">{location}</span>
      </div>
      <p className="text-[#505a5f] text-sm mt-3">{description}</p>
    </div>
  );
}

// ── Snapshot page ─────────────────────────────────────────────────────────────

type QuickFilter =
  | "Clinical"
  | "Functional"
  | "Social / Carer"
  | "Risks"
  | "Medication"
  | "Events";

const FILTER_PANELS: Record<QuickFilter, string[]> = {
  Clinical: ["vitals", "active-conditions", "current-medications"],
  Functional: ["falls-history", "baseline-mobility", "household-living"],
  "Social / Carer": ["carer-insights", "household-living"],
  Risks: ["falls-history", "active-conditions", "current-medications"],
  Medication: ["current-medications"],
  Events: ["timeline-events", "scheduled-appointments"],
};

const ALL_PANELS = [
  "falls-history",
  "baseline-mobility",
  "household-living",
  "carer-insights",
  "vitals",
  "active-conditions",
  "current-medications",
  "timeline-events",
  "scheduled-appointments",
];

function SnapshotPage({ onNavigate }: { onNavigate: (p: Page) => void }) {
  const [activeFilters, setActiveFilters] = useState<Set<QuickFilter>>(
    new Set(),
  );
  const [openPanels, setOpenPanels] = useState<Record<string, boolean>>(
    Object.fromEntries(ALL_PANELS.map((p) => [p, false])),
  );
  const [connectedOpen, setConnectedOpen] = useState(false);
  const [showVitalsModal, setShowVitalsModal] = useState<string | null>(null);

  function toggleFilter(f: QuickFilter) {
    setActiveFilters((prev) => {
      const next = new Set(prev);
      next.has(f) ? next.delete(f) : next.add(f);
      return next;
    });
  }
  function togglePanel(id: string) {
    setOpenPanels((prev) => ({ ...prev, [id]: !prev[id] }));
  }
  function isPanelVisible(id: string): boolean {
    if (activeFilters.size === 0) return true;
    for (const f of activeFilters)
      if (FILTER_PANELS[f].includes(id)) return true;
    return false;
  }

  const filters: QuickFilter[] = [
    "Clinical",
    "Functional",
    "Social / Carer",
    "Risks",
    "Medication",
    "Events",
  ];

  return (
    <div className="p-6">
      {showVitalsModal && (
        <VitalsModal
          vitalKey={showVitalsModal}
          onClose={() => setShowVitalsModal(null)}
        />
      )}
      <div className="bg-white border border-[#d8dde6] shadow-sm p-6">
        <div className="grid grid-cols-12 gap-6">
          {/* Left column */}
          <div className="col-span-3 flex flex-col gap-4">
            <div className="bg-[#f8f8f8] border border-[#d8dde6] p-4">
              <div className="flex flex-col items-center">
                <p className="text-[#505a5f] text-sm font-semibold text-center">
                  Clinical Frailty Scale
                </p>
                <div className="flex gap-3 items-end mt-2">
                  <span className="text-[#d5281b] text-[60px] font-bold leading-none">
                    6
                  </span>
                  <div className="flex gap-1 items-center pb-1">
                    <img src={imgIconCfsUp} alt="" className="size-[18px]" />
                    <span className="text-[#d5281b] text-base font-semibold">
                      from 5
                    </span>
                  </div>
                </div>
                <p className="text-[#1d1d1d] text-base font-semibold mt-2">
                  Moderately Frail
                </p>
                <p className="text-[#505a5f] text-sm mt-1 text-center">
                  Last updated:{" "}
                  <span className="font-semibold">06 Feb 2026, 14:23</span>
                </p>
                <div className="mt-3">
                  <ProvenanceTooltip
                    label="Community"
                    color="#00703c"
                    info={PROV.cfsTag}
                  />
                </div>
              </div>
            </div>
            <div className="bg-white border border-[#d8dde6] p-4">
              <p className="text-[#1d1d1d] text-sm font-bold">
                SPR Patient Overview
              </p>
              <div className="mt-3">
                <p className="text-[#1d1d1d] text-base leading-6">
                  80-year-old widower living alone with a 3x/day care package.
                  CFS has increased recently with recurrent falls and
                  breathlessness. Wife Dorothy passed away in 2022.
                </p>
                <p className="text-[#1d1d1d] text-base leading-6 mt-2">
                  <span className="font-semibold">Key risks:</span> Falls (4 in
                  3 months), safeguarding self-neglect flagged, FRAX overdue.
                </p>
                <p className="text-[#1d1d1d] text-base leading-6 mt-1">
                  <span className="font-semibold">Support:</span> Son (Nick
                  Bennett) is primary carer/proxy; moderate carer strain
                  reported. Daughter Rachel lives in Manchester.
                </p>
              </div>
              <div className="mt-4 pt-3 border-t border-[#e8edee]">
                <p className="text-[#505a5f] text-sm font-semibold">
                  Assembled from
                </p>
                <div className="flex gap-1 mt-2 flex-wrap">
                  <SourceBadge
                    label="GP"
                    color="#005eb8"
                    provenance={PROV.sprGP}
                  />
                  <SourceBadge
                    label="Social"
                    color="#6f2c91"
                    provenance={PROV.sprSocial}
                  />
                  <SourceBadge
                    label="Community"
                    color="#00703c"
                    provenance={PROV.sprCommunity}
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Right columns */}
          <div className="col-span-9 flex flex-col gap-4">
            {/* DNACPR */}
            <div className="border border-[#d8dde6] overflow-hidden">
              <div className="bg-[#003087] flex gap-4 items-center px-5 py-3">
                <div className="flex gap-2 items-center flex-1">
                  <img src={imgIconHighRisk} alt="" className="size-4" />
                  <p className="text-white text-sm font-bold">
                    DNACPR: In place
                  </p>
                </div>
                <ProvenanceTooltip
                  label="GP"
                  color="#005eb8"
                  info={PROV.dnacprGP}
                />
              </div>
              <div className="bg-white px-5 py-4">
                <div className="flex gap-4 items-center">
                  <span className="text-[#1d1d1d] text-xs font-semibold">
                    Recorded: 14 Nov 2025
                  </span>
                </div>
                <div className="flex gap-2 items-center mt-3">
                  <div className="bg-[#d5281b] border-2 border-[#d5281b] size-5 flex items-center justify-center">
                    <img src={imgIconNoCpr} alt="" className="size-3" />
                  </div>
                  <p className="text-[#1d1d1d] text-sm font-semibold">
                    Decision in place
                  </p>
                </div>
                <div className="mt-3 bg-[#f0f4f5] border border-[#d8dde6] px-3 py-2">
                  <p className="text-[#505a5f] text-xs font-semibold">
                    Outcome of decision
                  </p>
                  <p className="text-[#1d1d1d] text-sm font-bold mt-0.5">
                    Do not attempt CPR
                  </p>
                </div>
                <div className="flex gap-4 items-center mt-3">
                  <button
                    onClick={() => onNavigate("care-plan")}
                    className="flex gap-2 items-center"
                  >
                    <span className="text-[#005eb8] text-sm font-semibold">
                      View Advance Care Plan
                    </span>
                  </button>
                  <button onClick={() => onNavigate("care-plan")}>
                    <span className="text-[#505a5f] text-xs font-semibold">
                      Full context and rationale in Care Plan →
                    </span>
                  </button>
                </div>
              </div>
            </div>

            {/* Key Clinical Risk Indicators */}
            <div className="bg-white border border-[#d8dde6] shadow-sm">
              <div className="flex items-center justify-between px-4 py-3">
                <div>
                  <div className="flex gap-2 items-center">
                    <img src={imgIconRisk} alt="" className="size-[18px]" />
                    <p className="text-[#1d1d1d] text-base font-bold">
                      Key Clinical Risk Indicators
                    </p>
                  </div>
                  <p className="text-[#505a5f] text-sm mt-0.5">
                    4 high · 4 moderate
                  </p>
                </div>
                <div className="border border-[#d8dde6] size-8 flex items-center justify-center">
                  <span className="text-xs text-[#505a5f]">▲</span>
                </div>
              </div>
              <div className="px-4 pb-4">
                <div className="grid grid-cols-2 gap-3">
                  <RiskCard
                    severity="High"
                    severityColor="#d5281b"
                    riskName="Falls risk"
                    level="High"
                    detail="4 falls in the last 3 months"
                    clinician="Dr Patel (GP)"
                    source="GP"
                    provenance={{
                      org: "Woodside Health Centre",
                      setting: "Primary care",
                      system: "EMIS GP",
                      pulled: "3 days ago",
                      by: "Dr Patel (GP)",
                    }}
                  />
                  <RiskCard
                    severity="Med"
                    severityColor="#d46a00"
                    riskName="Delirium risk"
                    level="Moderate"
                    detail="4AT score: 2 (possible cognitive impairment) (28 Jan 2026)"
                    clinician="Dr Williams (Acute clinician)"
                    source="Acute"
                    provenance={{
                      org: "Croydon University Hospital",
                      setting: "Acute care",
                      system: "Oracle Health",
                      pulled: "7 days ago",
                      by: "Dr Williams (Acute clinician)",
                    }}
                  />
                  <RiskCard
                    severity="Med"
                    severityColor="#d46a00"
                    riskName="Carer Insights"
                    level="Moderate"
                    detail="Formal: No · Informal: Yes (son, Nick Bennett)"
                    clinician="Aisha Khan (Social worker)"
                    source="Social"
                    provenance={{
                      org: "Croydon Council Adult Social Care",
                      setting: "Social care",
                      system: "Liquidlogic",
                      pulled: "2 weeks ago",
                      by: "Aisha Khan (Social worker)",
                    }}
                    bannerTooltip={
                      "Carer Insights\nInformal carer = family member or friend. Formal carer = Voluntary sector, Social Care, etc. Son (Nick) reporting reduced availability due to work commitments; moderate strain noted."
                    }
                  />
                  <RiskCard
                    severity="Med"
                    severityColor="#d46a00"
                    riskName="Bone health risk"
                    level="FRAX overdue"
                    clinician="Dr Patel (GP)"
                    source="GP"
                    provenance={{
                      org: "Woodside Health Centre",
                      setting: "Primary care",
                      system: "EMIS GP",
                      pulled: "3 days ago",
                      by: "Dr Patel (GP)",
                    }}
                  />
                  <RiskCard
                    severity="High"
                    severityColor="#d5281b"
                    riskName="Safeguarding concerns"
                    level="Self-neglect flagged"
                    clinician="Mark Ellis (Safeguarding lead)"
                    source="Social"
                    provenance={{
                      org: "Croydon Council Adult Social Care",
                      setting: "Social care",
                      system: "Liquidlogic",
                      pulled: "5 days ago",
                      by: "Mark Ellis (Safeguarding lead)",
                    }}
                  />
                  <RiskCard
                    severity="High"
                    severityColor="#d5281b"
                    riskName="Polypharmacy"
                    level="5 medications"
                    clinician="Hannah Green (GP Pharmacist)"
                    source="GP"
                    provenance={{
                      org: "Woodside Health Centre",
                      setting: "Primary care",
                      system: "EMIS GP",
                      pulled: "3 days ago",
                      by: "Hannah Green (GP Pharmacist)",
                    }}
                  />
                  <RiskCard
                    severity="Med"
                    severityColor="#d46a00"
                    riskName="Bladder & Bowel risk"
                    level="Risks noted"
                    clinician="Jane Smith (District Nurse)"
                    source="Community"
                    provenance={{
                      org: "Community Health Services",
                      setting: "Community care",
                      system: "EMIS Community",
                      pulled: "2 weeks ago",
                      by: "Jane Smith (District Nurse)",
                    }}
                    bannerTooltip={
                      "Bladder & Bowel risk\nUrinary incontinence, bowel incontinence, constipation, and urinary retention are noted as risks being managed."
                    }
                  />
                  <RiskCard
                    severity="High"
                    severityColor="#d5281b"
                    riskName="Risk of Admission"
                    level="Elevated"
                    detail="2 LAS calls in 3 months · Known to frailty team"
                    clinician="Dr Williams (Acute clinician)"
                    source="Acute"
                    provenance={{
                      org: "Croydon University Hospital",
                      setting: "Acute care",
                      system: "Oracle Health",
                      pulled: "7 days ago",
                      by: "Dr Williams (Acute clinician)",
                    }}
                    bannerTooltip={
                      "Risk of Admission\nLondon Ambulance Service calls: 2 in last 3 months. Known to frailty team: Yes. Recent hospital admission: ED attendance 22 Jan 2026 (fall, no fracture). Recent change in care package: Yes — increased to 3x daily visits."
                    }
                  />
                </div>
              </div>
            </div>

            {/* Services Involved */}
            <div className="bg-white border border-[#d8dde6] shadow-sm">
              <div className="flex items-center justify-between px-4 py-3">
                <div>
                  <div className="flex gap-2 items-center">
                    <img src={imgIconServices} alt="" className="size-[18px]" />
                    <p className="text-[#1d1d1d] text-base font-bold">
                      Services Involved
                    </p>
                  </div>
                  <p className="text-[#505a5f] text-sm mt-0.5">
                    4 active · 2 referral pending · 1 recently discharged
                  </p>
                </div>
                <div className="border border-[#d8dde6] size-8 flex items-center justify-center">
                  <span className="text-xs text-[#505a5f]">▲</span>
                </div>
              </div>
              <div className="px-4 pb-4">
                <div className="grid grid-cols-3 gap-3">
                  <ServiceItem
                    name="Primary Care"
                    status="Active"
                    statusColor="#00703c"
                    borderColor="#00703c"
                  />
                  <ServiceItem
                    name="Social Care"
                    status="Active"
                    statusColor="#00703c"
                    borderColor="#00703c"
                  />
                  <ServiceItem
                    name="Community Nursing"
                    status="Active"
                    statusColor="#00703c"
                    borderColor="#00703c"
                  />
                  <ServiceItem
                    name="Community Frailty Service"
                    status="Active"
                    statusColor="#00703c"
                    borderColor="#00703c"
                  />
                  <ServiceItem
                    name="Community Therapy (OT/PT)"
                    status="Referral pending"
                    statusColor="#c25700"
                    borderColor="#c25700"
                  />
                  <ServiceItem
                    name="Falls Service"
                    status="Referral pending"
                    statusColor="#c25700"
                    borderColor="#c25700"
                  />
                  <ServiceItem
                    name="Mental Health Services"
                    status="Recently discharged"
                    statusColor="#505a5f"
                    borderColor="#505a5f"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Quick filters */}
        <div className="mt-4 bg-white border border-[#d8dde6] shadow-sm px-5 py-4">
          <div className="flex items-center justify-between gap-4">
            <div>
              <p className="text-[#1d1d1d] text-sm font-bold">Quick filters</p>
            </div>
            <div className="flex gap-2 items-center flex-wrap">
              {filters.map((f) => {
                const active = activeFilters.has(f);
                return (
                  <button
                    key={f}
                    onClick={() => toggleFilter(f)}
                    className={`px-3 py-2  text-sm font-semibold border transition-colors ${active ? "bg-[#005eb8] border-[#005eb8] text-white" : "bg-white border-[#d8dde6] text-[#505a5f] hover:bg-gray-50"}`}
                  >
                    {f}
                  </button>
                );
              })}
            </div>
            <button
              onClick={() => onNavigate("care-plan")}
              className="flex gap-2 items-center whitespace-nowrap"
            >
              <span className="text-[#005eb8] text-sm font-bold">
                Care plan shortcut
              </span>
            </button>
          </div>
        </div>

        {/* Three-column panels */}
        <div className="mt-4 grid grid-cols-3 gap-4 items-start">
          {/* Column 1 */}
          <div className="flex flex-col gap-3">
            {isPanelVisible("falls-history") && (
              <div className="bg-white border border-[#d8dde6]">
                <PanelHeader
                  icon={imgIconFalls}
                  title="Falls History"
                  open={openPanels["falls-history"]}
                  onToggle={() => togglePanel("falls-history")}
                />
                {openPanels["falls-history"] && (
                  <div className="px-4 pb-4 pt-3">
                    <p className="text-[#d5281b] text-sm font-semibold">
                      4 falls in last 3 months
                    </p>
                    <p className="text-[#1d1d1d] text-sm mt-2">
                      Most recent: 22 Jan 2026 - ED attendance
                    </p>
                    <div className="flex gap-2 mt-3">
                      <SourceBadge
                        label="Community"
                        color="#00703c"
                        provenance={{
                          org: "Community Health Services",
                          setting: "Community care",
                          system: "Frailty MDT notes",
                          pulled: "3 days ago",
                          by: "Jane Smith (District Nurse)",
                        }}
                      />
                      <SourceBadge
                        label="Acute"
                        color="#c25700"
                        provenance={{
                          org: "Croydon University Hospital",
                          setting: "Acute care",
                          system: "Oracle Health",
                          pulled: "7 days ago",
                          by: "Dr Williams (Acute clinician)",
                        }}
                      />
                    </div>
                  </div>
                )}
              </div>
            )}
            {isPanelVisible("baseline-mobility") && (
              <div className="bg-white border border-[#d8dde6]">
                <PanelHeader
                  icon={imgIconMobility}
                  title="Baseline Mobility"
                  open={openPanels["baseline-mobility"]}
                  onToggle={() => togglePanel("baseline-mobility")}
                />
                {openPanels["baseline-mobility"] && (
                  <div className="px-4 pb-4 pt-3">
                    <div className="grid grid-cols-2 gap-3">
                      <div>
                        <p className="text-[#505a5f] text-xs font-semibold">
                          Inside
                        </p>
                        <p className="text-[#1d1d1d] text-sm font-semibold mt-0.5">
                          Walking stick
                        </p>
                      </div>
                      <div>
                        <p className="text-[#505a5f] text-xs font-semibold">
                          Outside
                        </p>
                        <p className="text-[#1d1d1d] text-sm font-semibold mt-0.5">
                          Wheeled zimmer frame
                        </p>
                      </div>
                    </div>
                    <p className="text-[#1d1d1d] text-sm mt-2">
                      <span className="font-semibold">Transfer:</span> Requires
                      assistance of 1
                    </p>
                    <div className="mt-3">
                      <SourceBadge
                        label="Community"
                        color="#00703c"
                        provenance={{
                          org: "Community Health Services",
                          setting: "Community care",
                          system: "Community therapy notes",
                          pulled: "2 weeks ago",
                          by: "Tom Edwards (Physiotherapist)",
                        }}
                      />
                    </div>
                  </div>
                )}
              </div>
            )}
            {isPanelVisible("household-living") && (
              <div className="bg-white border border-[#d8dde6]">
                <PanelHeader
                  icon={imgIconHousehold}
                  title="Household & Living"
                  open={openPanels["household-living"]}
                  onToggle={() => togglePanel("household-living")}
                />
                {openPanels["household-living"] && (
                  <div className="px-4 pb-4 pt-3 space-y-2">
                    <p className="text-[#1d1d1d] text-sm">
                      <span className="font-semibold">Accommodation:</span>{" "}
                      Ground floor flat
                    </p>
                    <p className="text-[#1d1d1d] text-sm">
                      <span className="font-semibold">Tenure:</span> Council
                      property
                    </p>
                    <p className="text-[#1d1d1d] text-sm">
                      <span className="font-semibold">Household:</span> Lives
                      alone
                    </p>
                    <p className="text-[#1d1d1d] text-sm">
                      <span className="font-semibold">Family:</span> Wife:
                      Dorothy Bennett (deceased, 2022). Son: Nick Bennett
                      (primary carer, lives locally). Daughter: Rachel Bennett
                      (lives in Manchester).
                    </p>
                    <p className="text-[#1d1d1d] text-sm">
                      <span className="font-semibold">Care package:</span> 3x
                      daily visits
                    </p>
                    <p className="text-[#1d1d1d] text-sm">
                      <span className="font-semibold">Transport:</span> Support
                      required
                    </p>
                    <div className="mt-3">
                      <SourceBadge
                        label="Social"
                        color="#6f2c91"
                        provenance={{
                          org: "Croydon Council Adult Social Care",
                          setting: "Social care",
                          system: "Liquidlogic",
                          pulled: "2 weeks ago",
                          by: "Aisha Khan (Social worker)",
                        }}
                      />
                    </div>
                  </div>
                )}
              </div>
            )}
            {isPanelVisible("carer-insights") && (
              <div className="bg-white border border-[#d8dde6]">
                <PanelHeader
                  icon={imgIconCarer}
                  title="Carer Insights"
                  open={openPanels["carer-insights"]}
                  onToggle={() => togglePanel("carer-insights")}
                />
                {openPanels["carer-insights"] && (
                  <div className="px-4 pb-4 pt-3 space-y-2">
                    <div className="flex items-baseline gap-2">
                      <p className="text-[#1d1d1d] text-sm">
                        <span className="font-semibold">Primary carer:</span>{" "}
                        Son (Nick Bennett)
                      </p>
                      <span className="text-[#505a5f] text-xs">
                        · 07700 900 123
                      </span>
                    </div>
                    <div className="flex items-baseline gap-2">
                      <p className="text-[#1d1d1d] text-sm">
                        <span className="font-semibold">
                          Contingency carer:
                        </span>{" "}
                        Daughter (Rachel Bennett)
                      </p>
                      <span className="text-[#505a5f] text-xs">
                        · 07700 900 456
                      </span>
                    </div>
                    <p className="text-[#1d1d1d] text-sm">
                      <span className="font-semibold">Carer strain:</span>{" "}
                      Moderate (reported struggling)
                    </p>
                    <div className="mt-3">
                      <SourceBadge
                        label="Social"
                        color="#6f2c91"
                        provenance={{
                          org: "Croydon Council Adult Social Care",
                          setting: "Social care",
                          system: "Liquidlogic",
                          pulled: "2 weeks ago",
                          by: "Aisha Khan (Social worker)",
                        }}
                      />
                    </div>
                  </div>
                )}
              </div>
            )}
          </div>

          {/* Column 2 */}
          <div className="flex flex-col gap-3">
            {isPanelVisible("vitals") && (
              <div className="bg-white border border-[#d8dde6]">
                <PanelHeader
                  icon={imgIconVitals}
                  title="Vitals"
                  open={openPanels["vitals"]}
                  onToggle={() => togglePanel("vitals")}
                />
                {openPanels["vitals"] && (
                  <div className="p-4">
                    <div className="flex gap-2 items-center mb-3">
                      <span className="text-[#505a5f] text-xs font-semibold">
                        Trend:
                      </span>
                      <button className="bg-white border border-[#d8dde6] px-2 py-0.5 text-[#505a5f] text-xs font-semibold">
                        Latest
                      </button>
                      <button className="bg-[#005eb8] border border-[#005eb8] px-2 py-0.5 text-white text-xs font-semibold">
                        6 mo
                      </button>
                      <button className="bg-white border border-[#d8dde6] px-2 py-0.5 text-[#505a5f] text-xs font-semibold">
                        1 yr
                      </button>
                    </div>
                    <div className="grid grid-cols-2 gap-3">
                      <VitalCard
                        label="BP"
                        value="148/90"
                        unit="mmHg"
                        trend="↑"
                        trendColor="#d5281b"
                        trendDesc="Trending up over 6 months"
                        source="Community"
                        sourceColor="#00703c"
                        provenance={{
                          org: "Community Health Services",
                          setting: "Community care",
                          system: "EMIS Community",
                          pulled: "2 weeks ago",
                          by: "Jane Smith (District Nurse)",
                        }}
                        onClick={() => setShowVitalsModal("BP")}
                      />
                      <VitalCard
                        label="Pulse"
                        value="62"
                        unit="bpm"
                        trend="~"
                        trendColor="#00703c"
                        trendDesc="Stable, 60 to 68 bpm range"
                        source="Community"
                        sourceColor="#00703c"
                        provenance={{
                          org: "Community Health Services",
                          setting: "Community care",
                          system: "EMIS Community",
                          pulled: "2 weeks ago",
                          by: "Jane Smith (District Nurse)",
                        }}
                        onClick={() => setShowVitalsModal("Pulse")}
                      />
                      <VitalCard
                        label="Weight"
                        value="54"
                        unit="kg"
                        trend="↓"
                        trendColor="#d5281b"
                        trendDesc="Lost ~3 kg over 6 months"
                        source="GP"
                        sourceColor="#005eb8"
                        provenance={{
                          org: "Woodside Health Centre",
                          setting: "Primary care",
                          system: "EMIS GP",
                          pulled: "3 days ago",
                          by: "Emily Brown (Practice nurse)",
                        }}
                        onClick={() => setShowVitalsModal("Weight")}
                      />
                      <VitalCard
                        label="Blood Glucose"
                        value="7.2"
                        unit="mmol/L"
                        trend="↑"
                        trendColor="#d5281b"
                        trendDesc="Risen from ~6.4 to 7.2 mmol/L"
                        source="GP"
                        sourceColor="#005eb8"
                        provenance={{
                          org: "Woodside Health Centre",
                          setting: "Primary care",
                          system: "EMIS GP",
                          pulled: "3 days ago",
                          by: "Emily Brown (Practice nurse)",
                        }}
                        onClick={() => setShowVitalsModal("Blood Glucose")}
                      />
                    </div>
                  </div>
                )}
              </div>
            )}
            {isPanelVisible("active-conditions") && (
              <div className="bg-white border border-[#d8dde6]">
                <PanelHeader
                  icon={imgIconConditions}
                  title="Active Conditions"
                  open={openPanels["active-conditions"]}
                  onToggle={() => togglePanel("active-conditions")}
                />
                {openPanels["active-conditions"] && (
                  <div className="px-4 pb-4 pt-3 space-y-3">
                    {[
                      { name: "Type 2 diabetes mellitus", since: "Since 2012" },
                      { name: "Hypertension", since: "Since 2008" },
                      { name: "Chronic heart failure", since: "Since 2019" },
                      {
                        name: "Chronic kidney disease stage 3a",
                        since: "Since 2020",
                      },
                      { name: "Dementia (mixed type)", since: "Since 2024" },
                    ].map(({ name, since }) => (
                      <div key={name}>
                        <p className="text-[#1d1d1d] text-base font-semibold leading-6">
                          {name}
                        </p>
                        <div className="flex gap-2 items-center">
                          <span className="text-[#505a5f] text-sm">
                            {since}
                          </span>
                        </div>
                      </div>
                    ))}
                    <div className="flex gap-2 mt-1">
                      <SourceBadge
                        label="GP"
                        color="#005eb8"
                        provenance={{
                          org: "Woodside Health Centre",
                          setting: "Primary care",
                          system: "EMIS GP",
                          pulled: "3 days ago",
                          by: "Dr Patel (GP)",
                        }}
                      />
                      <SourceBadge
                        label="Acute"
                        color="#c25700"
                        provenance={{
                          org: "Croydon University Hospital",
                          setting: "Acute care",
                          system: "Oracle Health",
                          pulled: "7 days ago",
                          by: "Dr Williams (Acute clinician)",
                        }}
                      />
                    </div>
                  </div>
                )}
              </div>
            )}
            {isPanelVisible("current-medications") && (
              <div className="bg-white border border-[#d8dde6]">
                <PanelHeader
                  icon={imgIconMeds}
                  title="Current Medications"
                  open={openPanels["current-medications"]}
                  onToggle={() => togglePanel("current-medications")}
                />
                {openPanels["current-medications"] && (
                  <div className="px-4 pb-4 pt-3">
                    <div className="divide-y divide-[#e8edee]">
                      <MedItem
                        name="Amlodipine 5mg"
                        status="Optimised"
                        statusColor="#00703c"
                        freq="Once daily"
                        reviewed="10 Dec 2025"
                        source="GP"
                        sourceColor="#005eb8"
                        provenance={{
                          org: "Woodside Health Centre",
                          setting: "Primary care",
                          system: "EMIS GP",
                          pulled: "3 days ago",
                          by: "Hannah Green (Practice pharmacist)",
                        }}
                      />
                      <MedItem
                        name="Atorvastatin 20mg"
                        status="Optimised"
                        statusColor="#00703c"
                        freq="Once daily at night"
                        reviewed="10 Dec 2025"
                        source="GP"
                        sourceColor="#005eb8"
                        provenance={{
                          org: "Woodside Health Centre",
                          setting: "Primary care",
                          system: "EMIS GP",
                          pulled: "3 days ago",
                          by: "Dr Patel (GP)",
                        }}
                      />
                      <MedItem
                        name="Aspirin 75mg"
                        status="Review needed"
                        statusColor="#c25700"
                        freq="Once daily"
                        source="Acute"
                        sourceColor="#c25700"
                        provenance={{
                          org: "Woodside Health Centre",
                          setting: "Primary care",
                          system: "EMIS GP",
                          pulled: "3 days ago",
                          by: "Dr Patel (GP)",
                        }}
                      />
                      <MedItem
                        name="Ramipril 2.5mg"
                        status="Optimised"
                        statusColor="#00703c"
                        freq="Once daily"
                        reviewed="10 Dec 2025"
                        source="GP"
                        sourceColor="#005eb8"
                        provenance={{
                          org: "Woodside Health Centre",
                          setting: "Primary care",
                          system: "EMIS GP",
                          pulled: "3 days ago",
                          by: "Dr Patel (GP)",
                        }}
                      />
                      <MedItem
                        name="Bisoprolol 2.5mg"
                        status="Review needed"
                        statusColor="#c25700"
                        freq="Once daily"
                        source="Acute"
                        sourceColor="#c25700"
                        provenance={{
                          org: "Croydon University Hospital",
                          setting: "Acute care",
                          system: "Oracle Health",
                          pulled: "7 days ago",
                          by: "Dr Williams (Acute clinician)",
                        }}
                      />
                    </div>
                    <div className="flex gap-2 mt-3">
                      <SourceBadge
                        label="GP"
                        color="#005eb8"
                        provenance={{
                          org: "Woodside Health Centre",
                          setting: "Primary care",
                          system: "EMIS GP",
                          pulled: "3 days ago",
                          by: "Hannah Green (Practice pharmacist)",
                        }}
                      />
                      <SourceBadge
                        label="Acute"
                        color="#c25700"
                        provenance={{
                          org: "Croydon University Hospital",
                          setting: "Acute care",
                          system: "Oracle Health",
                          pulled: "7 days ago",
                          by: "Dr Williams (Acute clinician)",
                        }}
                      />
                    </div>
                  </div>
                )}
              </div>
            )}
          </div>

          {/* Column 3 */}
          <div className="flex flex-col gap-3">
            {isPanelVisible("timeline-events") && (
              <div className="bg-white border border-[#d8dde6]">
                <div className="flex gap-3 items-start pt-4 px-4 pb-0">
                  <div className="flex flex-col flex-1 min-w-0">
                    <div className="flex gap-2 items-center">
                      <img
                        src={imgIconTimeline}
                        alt=""
                        className="nhs-blue-icon size-[18px] shrink-0"
                      />
                      <p className="font-bold text-[#1d1d1d] text-base leading-6">
                        Timeline of Events
                      </p>
                    </div>
                  </div>
                  <CollapseButton
                    open={openPanels["timeline-events"]}
                    onClick={() => togglePanel("timeline-events")}
                  />
                </div>
                {openPanels["timeline-events"] && (
                  <div className="px-4 pb-4 pt-3 space-y-4">
                    <TimelineItem
                      date="05 Feb 2026"
                      title="Virtual Ward"
                      description="Remote monitoring via virtual ward for 3 days following increased breathlessness and fall risk."
                      clinician="Claire Hobbs (Virtual Ward Nurse)"
                      sourceBg="#00703c"
                      sourceLabel="Community"
                      provenance={{
                        org: "Community Health Services",
                        setting: "Community care",
                        system: "Frailty MDT notes",
                        pulled: "2 days ago",
                        by: "Claire Hobbs (Virtual Ward Nurse)",
                      }}
                    />
                    <TimelineItem
                      date="04 Feb 2026"
                      title="Community visit"
                      description="District Nurse - wound care review"
                      clinician="Jane Smith (District Nurse)"
                      sourceBg="#00703c"
                      sourceLabel="Community"
                      provenance={{
                        org: "Community Health Services",
                        setting: "Community care",
                        system: "EMIS Community",
                        pulled: "3 days ago",
                        by: "Jane Smith (District Nurse)",
                      }}
                    />
                    <TimelineItem
                      date="02 Feb 2026"
                      title="Social work involvement"
                      description="Social worker reviewed care package and logged safeguarding concern"
                      clinician="Aisha Khan (Social worker)"
                      sourceBg="#6f2c91"
                      sourceLabel="Social"
                      provenance={{
                        org: "Croydon Council Adult Social Care",
                        setting: "Social care",
                        system: "Liquidlogic",
                        pulled: "5 days ago",
                        by: "Aisha Khan (Social worker)",
                      }}
                    />
                    <TimelineItem
                      date="31 Jan 2026"
                      title="Carer change"
                      description="Son (Nick Bennett) availability reduced (work commitments). Review requested."
                      clinician="Aisha Khan (Social worker)"
                      sourceBg="#6f2c91"
                      sourceLabel="Social"
                      provenance={{
                        org: "Croydon Council Adult Social Care",
                        setting: "Social care",
                        system: "Liquidlogic",
                        pulled: "7 days ago",
                        by: "Aisha Khan (Social worker)",
                      }}
                    />
                    <TimelineItem
                      date="29 Jan 2026"
                      title="111 call"
                      description="Patient called re: increased breathlessness"
                      clinician="NHS 111 clinician (111 clinician)"
                      sourceBg="#505a5f"
                      sourceLabel="111"
                      provenance={{
                        org: "NHS 111 / South East London ICS",
                        setting: "Urgent care",
                        system: "NHS Pathways",
                        pulled: "7 days ago",
                        by: "NHS 111 clinician",
                      }}
                    />
                    <TimelineItem
                      date="22 Jan 2026"
                      title="ED visit"
                      description="Fall at home, no fracture"
                      clinician="Dr Williams (Acute clinician)"
                      sourceBg="#c25700"
                      sourceLabel="Acute"
                      provenance={{
                        org: "Croydon University Hospital",
                        setting: "Acute care",
                        system: "Oracle Health",
                        pulled: "7 days ago",
                        by: "Dr Williams (Acute clinician)",
                      }}
                    />
                    <TimelineItem
                      date="18 Jan 2026"
                      title="Therapy appointment"
                      description="Physiotherapy - mobility assessment"
                      clinician="Tom Edwards (Physiotherapist)"
                      sourceBg="#00703c"
                      sourceLabel="Community"
                      provenance={{
                        org: "Community Health Services",
                        setting: "Community care",
                        system: "Community therapy notes",
                        pulled: "2 weeks ago",
                        by: "Tom Edwards (Physiotherapist)",
                      }}
                    />
                    <div className="flex gap-2 mt-3">
                      <SourceBadge label="GP" color="#005eb8" />
                      <SourceBadge label="Acute" color="#c25700" />
                      <SourceBadge label="Social" color="#6f2c91" />
                    </div>
                  </div>
                )}
              </div>
            )}
            {isPanelVisible("scheduled-appointments") && (
              <div className="bg-white border border-[#d8dde6]">
                <div className="flex gap-3 items-start pt-4 px-4 pb-0">
                  <div className="flex flex-col flex-1 min-w-0">
                    <div className="flex gap-2 items-center">
                      <img
                        src={imgIconAppt}
                        alt=""
                        className="nhs-blue-icon size-[18px] shrink-0"
                      />
                      <p className="font-bold text-[#1d1d1d] text-base leading-6">
                        Scheduled Appointments
                      </p>
                    </div>
                  </div>
                  <CollapseButton
                    open={openPanels["scheduled-appointments"]}
                    onClick={() => togglePanel("scheduled-appointments")}
                  />
                </div>
                {openPanels["scheduled-appointments"] && (
                  <div className="px-4 pb-4 pt-3 space-y-4">
                    <AppointmentCard
                      title="OT Home Assessment"
                      service="OT / Community Therapy"
                      date="20 Feb 2026"
                      time="10:30"
                      location="Patient's home"
                      description="Home assessment for equipment review and environmental hazard reduction following recurrent falls."
                      bookedBy="Booked 06 Feb 2026 by Sarah Linton (OT Co-ordinator)"
                      provenance={{
                        org: "Community Health Services",
                        setting: "Community care",
                        system: "Community therapy notes",
                        pulled: "1 day ago",
                        by: "Sarah Linton (OT Co-ordinator)",
                      }}
                    />
                    <AppointmentCard
                      title="Frailty MDT Review"
                      service="Frailty Team"
                      date="05 Mar 2026"
                      time="14:00"
                      location="Virtual (MS Teams)"
                      description="Follow-up multi-disciplinary review to reassess CFS score, medication optimisation, and falls prevention plan."
                      bookedBy="Booked 07 Feb 2026 by Laura Chen (Frailty Co-ordinator)"
                      provenance={{
                        org: "Community Health Services",
                        setting: "Community care",
                        system: "Frailty MDT notes",
                        pulled: "1 day ago",
                        by: "Laura Chen (Frailty Co-ordinator)",
                      }}
                    />
                    <div className="mt-3">
                      <SourceBadge label="Community" color="#00703c" />
                    </div>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

// ── CGA Assessment ────────────────────────────────────────────────────────────

const CFS_OPTIONS = [
  {
    value: "1",
    label: "1: Very Fit",
    desc: "Robust, active, energetic and motivated. Exercise regularly and are among the fittest for their age.",
  },
  {
    value: "2",
    label: "2: Well",
    desc: "No active disease symptoms but less fit than category 1. Often exercise or are very active occasionally.",
  },
  {
    value: "3",
    label: "3: Managing Well",
    desc: "Medical problems are well controlled, even if not regularly active beyond routine walking.",
  },
  {
    value: "4",
    label: "4: Vulnerable",
    desc: "Not dependent on others for daily help, but symptoms often limit activities. Common complaint is being slowed up or tired.",
  },
  {
    value: "5",
    label: "5: Mildly Frail",
    desc: "More evident slowing and need help with high-order activities of daily living (finances, transportation, heavy housework).",
  },
  {
    value: "6",
    label: "6: Moderately Frail",
    desc: "Need help with all outside activities and with keeping house. Inside, they often have problems with stairs and need help with bathing.",
  },
  {
    value: "7",
    label: "7: Severely Frail",
    desc: "Completely dependent for personal care from whatever cause (physical or cognitive). Even so, they seem stable and not at high risk of dying.",
  },
  {
    value: "8",
    label: "8: Very Severely Frail",
    desc: "Completely dependent, approaching the end of life. Typically, they could not recover even from a minor illness.",
  },
  {
    value: "9",
    label: "9: Terminally Ill",
    desc: "Approaching the end of life. This category applies to people with a life expectancy <6 months, who are not otherwise evidently frail.",
  },
];

type ActionState = "accept" | "reject" | "edit" | null;
type InsightState = "confirm" | "edit" | "dismiss" | null;

function FieldBadges({
  badge,
  pending,
}: {
  badge?: "system-prefilled" | "risk" | null;
  pending?: boolean;
}) {
  return (
    <>
      {badge === "risk" && (
        <span className="bg-[#d5281b] border border-[#d5281b] text-white text-[12px] font-bold px-2 py-0.5 flex items-center gap-1">
          Risks
        </span>
      )}
      {pending && (
        <span className="bg-[#fff4e6] border border-[#ffd6a8] text-[#d46a00] text-[12px] font-bold px-2 py-0.5 flex items-center gap-1">
          Pending review
        </span>
      )}
    </>
  );
}

function AcceptRejectButtons({
  id,
  action,
  showEdit,
  onAction,
}: {
  id: string;
  action: ActionState;
  showEdit?: boolean;
  onAction: (id: string, a: ActionState) => void;
}) {
  return (
    <div className="flex gap-2 mt-3">
      <button
        onClick={() => onAction(id, action === "accept" ? null : "accept")}
        className={`flex gap-1.5 items-center px-4 py-2  border text-[14px] font-semibold transition-colors ${
          action === "accept"
            ? "bg-[#00703c] border-[#00703c] text-white"
            : "bg-white border-[#d8dde6] text-[#505a5f] hover:bg-gray-50"
        }`}
      >
        Accept
      </button>
      <button
        onClick={() => onAction(id, "reject")}
        className="flex gap-1.5 items-center px-4 py-2 border border-[#d8dde6] bg-white text-[#505a5f] text-[14px] font-semibold hover:bg-gray-50"
      >
        Reject
      </button>
      {showEdit && (
        <button
          onClick={() => onAction(id, action === "edit" ? null : "edit")}
          className={`flex gap-1.5 items-center px-4 py-2  border text-[14px] font-semibold transition-colors ${
            action === "edit"
              ? "bg-[#005eb8] border-[#005eb8] text-white"
              : "bg-white border-[#d8dde6] text-[#505a5f] hover:bg-gray-50"
          }`}
        >
          {action === "edit" ? "Save" : "Edit"}
        </button>
      )}
    </div>
  );
}

interface AssessmentFieldProps {
  id: string;
  title: string;
  badge?: "system-prefilled" | "risk" | null;
  pending?: boolean;
  placeholder?: string;
  prefillText?: string;
  prefillProvenance?: ProvenanceInfo;
  showEdit?: boolean;
  action: ActionState;
  onAction: (id: string, a: ActionState) => void;
}

function AssessmentField({
  id,
  title,
  badge,
  pending,
  placeholder,
  prefillText,
  prefillProvenance,
  showEdit = true,
  action,
  onAction,
}: AssessmentFieldProps) {
  const [text, setText] = useState(prefillText ?? "");
  const [notes, setNotes] = useState("");
  if (action === "reject") return null;
  return (
    <div className="bg-[#fafbfc] border border-[#d8dde6] -[8px] p-4 w-full">
      <div className="flex gap-2 items-center flex-wrap">
        <span className="font-bold text-[16px] text-[#1d1d1d] leading-6">
          {title}
        </span>
        <FieldBadges badge={badge} pending={pending} />
      </div>
      {prefillText && action !== "edit" && (
        <p className="mt-2 text-[16px] text-[#1d1d1d] leading-7 whitespace-pre-line">
          {text}
        </p>
      )}
      {prefillText && action === "edit" && (
        <textarea
          className="mt-2 w-full bg-white border border-[#005eb8] p-3 text-[16px] text-[#1d1d1d] leading-6 resize-y min-h-[112px] focus:outline-none"
          value={text}
          onChange={(e) => setText(e.target.value)}
          autoFocus
        />
      )}
      {prefillProvenance && (
        <div className="mt-2">
          <ProvenanceTooltip
            label={
              prefillProvenance.setting.includes("Primary")
                ? "GP"
                : prefillProvenance.setting.includes("Social")
                  ? "Social"
                  : prefillProvenance.setting.includes("Acute")
                    ? "Acute"
                    : "Community"
            }
            color={
              prefillProvenance.setting.includes("Primary")
                ? "#005eb8"
                : prefillProvenance.setting.includes("Social")
                  ? "#6f2c91"
                  : prefillProvenance.setting.includes("Acute")
                    ? "#c25700"
                    : "#00703c"
            }
            info={prefillProvenance}
          />
        </div>
      )}
      {placeholder !== undefined && (
        <textarea
          className="mt-2 w-full bg-white border border-[#d8dde6] p-3 text-[16px] text-[#595959] leading-6 resize-y min-h-[80px] focus:outline-none focus:border-[#005eb8] placeholder:text-[#595959]"
          placeholder={placeholder}
          value={notes}
          onChange={(e) => setNotes(e.target.value)}
        />
      )}
      <AcceptRejectButtons
        id={id}
        action={action}
        showEdit={showEdit}
        onAction={onAction}
      />
    </div>
  );
}

function YesNoField({
  id,
  title,
  badge,
  pending,
  action,
  onAction,
}: {
  id: string;
  title: string;
  badge?: "system-prefilled" | "risk" | null;
  pending?: boolean;
  action: ActionState;
  onAction: (id: string, a: ActionState) => void;
}) {
  const [sel, setSel] = useState<"yes" | "no" | null>(null);
  if (action === "reject") return null;
  return (
    <div className="bg-[#fafbfc] border border-[#d8dde6] -[8px] p-4 w-full">
      <div className="flex gap-2 items-center flex-wrap">
        <span className="font-bold text-[16px] text-[#1d1d1d] leading-6">
          {title}
        </span>
        <FieldBadges badge={badge} pending={pending} />
      </div>
      <div className="flex gap-3 mt-3">
        <button
          onClick={() => setSel(sel === "yes" ? null : "yes")}
          className={`px-5 py-2  border text-[14px] font-semibold transition-colors ${sel === "yes" ? "bg-[#005eb8] border-[#005eb8] text-white" : "bg-white border-[#d8dde6] text-[#505a5f] hover:bg-gray-50"}`}
        >
          Yes
        </button>
        <button
          onClick={() => setSel(sel === "no" ? null : "no")}
          className={`px-5 py-2  border text-[14px] font-semibold transition-colors ${sel === "no" ? "bg-[#005eb8] border-[#005eb8] text-white" : "bg-white border-[#d8dde6] text-[#505a5f] hover:bg-gray-50"}`}
        >
          No
        </button>
      </div>
      <AcceptRejectButtons
        id={id}
        action={action}
        showEdit={false}
        onAction={onAction}
      />
    </div>
  );
}

const MUST_OPTIONS = ["0: Low Risk", "1: Medium Risk", "2 or more: High Risk"];

function MustScoreField({
  id,
  action,
  onAction,
}: {
  id: string;
  action: ActionState;
  onAction: (id: string, a: ActionState) => void;
}) {
  const [sel, setSel] = useState<string | null>(null);
  if (action === "reject") return null;
  return (
    <div className="bg-[#fafbfc] border border-[#d8dde6] -[8px] p-4 w-full">
      <div className="flex gap-2 items-center flex-wrap">
        <span className="font-bold text-[16px] text-[#1d1d1d] leading-6">
          MUST Score
        </span>
        <FieldBadges pending />
      </div>
      <div className="flex flex-col gap-2 mt-3">
        {MUST_OPTIONS.map((opt) => (
          <button
            key={opt}
            onClick={() => setSel(sel === opt ? null : opt)}
            className={`flex gap-3 items-center p-3  border text-[16px] text-left transition-colors ${sel === opt ? "border-[#005eb8] bg-[#e8f4f8]" : "border-[#d8dde6] bg-white hover:bg-gray-50"}`}
          >
            <span
              className={`shrink-0 w-4 h-4  border-2 flex items-center justify-center ${sel === opt ? "border-[#005eb8]" : "border-[#768692]"}`}
            >
              {sel === opt && <span className="w-2 h-2 bg-[#005eb8]" />}
            </span>
            <span className="text-[#1d1d1d]">{opt}</span>
          </button>
        ))}
      </div>
      <AcceptRejectButtons
        id={id}
        action={action}
        showEdit={false}
        onAction={onAction}
      />
    </div>
  );
}

interface AIInsightCardProps {
  id: string;
  text: string;
  confidence?: string;
  date?: string;
  state: InsightState;
  onState: (id: string, s: InsightState) => void;
}

function AIInsightCard({
  id,
  text,
  date = "04 Mar 2026",
  state,
  onState,
}: AIInsightCardProps) {
  const [editableText, setEditableText] = useState(text);
  if (state === "dismiss") return null;
  return (
    <div className="bg-[#fafbfc] border border-[#d8dde6] -[8px] p-4 w-full">
      <div className="flex gap-2 items-center flex-wrap">
        <span className="bg-[#fff4e6] border border-[#ffd6a8] text-[#d46a00] text-[11px] font-bold px-2 py-0.5">
          Pending review
        </span>
      </div>
      {state === "edit" ? (
        <textarea
          className="mt-2 w-full bg-white border border-[#005eb8] p-3 text-[16px] text-[#1d1d1d] leading-7 resize-y min-h-[112px] focus:outline-none"
          value={editableText}
          onChange={(e) => setEditableText(e.target.value)}
          autoFocus
        />
      ) : (
        <p className="mt-2 text-[16px] text-[#1d1d1d] leading-7 whitespace-pre-line">
          {editableText}
        </p>
      )}
      <div className="flex gap-2 items-center mt-2">
        <span className="text-[#505a5f] text-[12px]">Added {date}</span>
        <span className="text-[#d8dde6] text-[12px]">|</span>
        <div className="flex gap-1.5 items-center">
          <button
            onClick={() => onState(id, state === "confirm" ? null : "confirm")}
            className={`flex gap-1 items-center px-2 py-1  border text-[12px] font-semibold transition-colors ${
              state === "confirm"
                ? "bg-[#00703c] border-[#00703c] text-white"
                : "bg-white border-[#d8dde6] text-[#505a5f] hover:bg-gray-50"
            }`}
          >
            Confirm
          </button>
          <button
            onClick={() => onState(id, state === "edit" ? null : "edit")}
            className={`flex gap-1 items-center px-2 py-1  border text-[12px] font-semibold transition-colors ${
              state === "edit"
                ? "bg-[#005eb8] border-[#005eb8] text-white"
                : "bg-white border-[#d8dde6] text-[#505a5f] hover:bg-gray-50"
            }`}
          >
            {state === "edit" ? "Save" : "Edit"}
          </button>
          <button
            onClick={() => onState(id, "dismiss")}
            className="flex gap-1 items-center px-2 py-1 border border-[#d8dde6] bg-white text-[#505a5f] text-[12px] font-semibold hover:bg-gray-50"
          >
            Dismiss
          </button>
        </div>
      </div>
    </div>
  );
}

interface DomainSectionProps {
  id: string;
  icon: string;
  title: string;
  reviewedText: string;
  hasRisk?: boolean;
  aiCount?: number;
  open: boolean;
  onToggle: (id: string) => void;
  children: ReactNode;
}

function DomainSection({
  id,
  icon,
  title,
  reviewedText,
  hasRisk,
  aiCount,
  open,
  onToggle,
  children,
}: DomainSectionProps) {
  return (
    <div className="border border-[#d8dde6] -[8px] overflow-hidden w-full">
      <button
        onClick={() => onToggle(id)}
        className="w-full bg-[#f0f4f5] px-5 py-3 flex items-center justify-between hover:bg-[#e8eef0] transition-colors"
      >
        <div className="flex gap-3 items-center">
          <span className="font-bold text-[18px] text-[#1d1d1d]">{title}</span>
          {hasRisk && (
            <span className="bg-[#d5281b] border border-[#d5281b] text-white text-[12px] font-bold px-2 py-0.5 flex items-center gap-1">
              Risks
            </span>
          )}
        </div>
        <div className="flex gap-4 items-center">
          <span className="text-[#505a5f] text-[14px]">{reviewedText}</span>
          <span className="text-[#505a5f] text-[16px]">{open ? "▲" : "▼"}</span>
        </div>
      </button>
      {open && (
        <div className="bg-white flex flex-col gap-4 p-5 w-full">
          {children}
        </div>
      )}
    </div>
  );
}

function CgaAssessmentPage({ onNavigate }: { onNavigate: (p: Page) => void }) {
  const [open, setOpen] = useState<Record<string, boolean>>({});
  const [cfsValue, setCfsValue] = useState("6");
  const [cfsOpen, setCfsOpen] = useState(false);
  const [fieldActions, setFieldActions] = useState<Record<string, ActionState>>(
    {},
  );
  const [insightStates, setInsightStates] = useState<
    Record<string, InsightState>
  >({});

  const toggleDomain = (id: string) => setOpen((p) => ({ ...p, [id]: !p[id] }));
  const setFieldAction = (id: string, a: ActionState) =>
    setFieldActions((p) => ({ ...p, [id]: a }));
  const setInsightState = (id: string, s: InsightState) =>
    setInsightStates((p) => ({ ...p, [id]: s }));

  const selectedCfs = CFS_OPTIONS.find((o) => o.value === cfsValue);

  return (
    <div className="flex flex-col min-h-screen bg-[#f0f4f5]">
      {/* Page header */}
      <div className="bg-white border-b border-[#d8dde6] px-6 py-4">
        <div className="flex items-start justify-between">
          <div>
            <h1 className="font-bold text-[24px] text-[#1d1d1d] leading-8">
              Comprehensive Geriatric Assessment (CGA)
            </h1>
            <p className="text-[#505a5f] text-[14px] mt-1">
              Review and confirm pre-populated data, complete assessment
              domains, and record new findings.
            </p>
          </div>
        </div>
      </div>

      {/* CGA Summary Output */}
      <div className="px-6 pt-6">
        <div className="bg-white border border-[#d8dde6] p-5 w-full">
          <h3 className="font-bold text-[18px] text-[#1d1d1d] mb-3">
            CGA Summary Output
          </h3>
          <div className="space-y-2 text-[14px]">
            <p>
              <span className="font-semibold">Clinical Frailty Scale:</span> 6:
              Moderately Frail
            </p>
            <p>
              <span className="font-semibold">Key Issues:</span> Recurrent falls
              (4 in 3 months), polypharmacy (5 medications), declining weight,
              rising blood glucose, dementia (mixed type), delirium risk,
              self-neglect safeguarding concern, deteriorating hearing, dental
              concerns, carer strain escalating
            </p>
            <p>
              <span className="font-semibold">Recommended Actions:</span> Falls
              prevention programme, OT home assessment (scheduled 20 Feb),
              pharmacist medication review, glycaemic management review, mental
              health support, carer strain assessment, audiological referral,
              dental assessment, ophthalmology follow-up
            </p>
          </div>
        </div>
      </div>

      {/* Main content */}
      <div className="px-6 py-6 flex flex-col gap-4">
        {/* Physical */}
        <DomainSection
          id="physical"
          icon="🫀"
          title="Physical"
          reviewedText="0 / 31 reviewed"
          hasRisk
          aiCount={4}
          open={!!open["physical"]}
          onToggle={toggleDomain}
        >
          {/* Review prompts */}
          <div className="bg-[#fafbfc] border border-[#d8dde6] -[8px] p-4 w-full">
            <div className="flex items-center gap-2 mb-3">
              <span className="font-bold text-[14px] text-[#1d1d1d]">
                Review prompts: Physical
              </span>
            </div>
            <div className="flex flex-col gap-3">
              <AIInsightCard
                id="ai-phys-1"
                text="Recurrent falls pattern detected (4 falls in 3 months). High risk of serious injury. Recommend urgent falls prevention referral."
                confidence="High"
                date="04 Mar 2026"
                state={insightStates["ai-phys-1"] ?? null}
                onState={setInsightState}
              />
              <AIInsightCard
                id="ai-phys-2"
                text="Declining weight trend noted over last 3 months (~3 kg loss). MUST score elevated. Consider dietitian referral."
                confidence="High"
                date="04 Mar 2026"
                state={insightStates["ai-phys-2"] ?? null}
                onState={setInsightState}
              />
              <AIInsightCard
                id="ai-phys-3"
                text="Deteriorating hearing detected from carer reports. Consider referral for audiological assessment / hearing aids."
                confidence="Medium"
                date="04 Mar 2026"
                state={insightStates["ai-phys-3"] ?? null}
                onState={setInsightState}
              />
              <AIInsightCard
                id="ai-phys-4"
                text="Rising blood glucose values over last 3 readings. Glycaemic management review recommended."
                confidence="Medium"
                date="04 Mar 2026"
                state={insightStates["ai-phys-4"] ?? null}
                onState={setInsightState}
              />
            </div>
          </div>

          {/* CFS field */}
          <div
            className={`bg-[#fafbfc] border border-[#d8dde6] -[8px] p-4 w-full ${fieldActions["cfs"] === "reject" ? "hidden" : ""}`}
          >
            <div className="flex items-start justify-between w-full">
              <div className="flex gap-2 items-center">
                <span className="font-bold text-[16px] text-[#1d1d1d]">
                  Clinical Frailty Scale
                </span>
              </div>
              <div className="flex gap-2 items-center">
                <button
                  onClick={() =>
                    setFieldAction(
                      "cfs",
                      fieldActions["cfs"] === "accept" ? null : "accept",
                    )
                  }
                  className={`flex gap-1.5 items-center px-3 py-1.5  border text-[12px] font-semibold transition-colors ${fieldActions["cfs"] === "accept" ? "bg-[#00703c] border-[#00703c] text-white" : "bg-white border-[#d8dde6] text-[#505a5f] hover:bg-gray-50"}`}
                >
                  Accept
                </button>
                <button
                  onClick={() => setFieldAction("cfs", "reject")}
                  className="flex gap-1.5 items-center px-3 py-1.5 border border-[#d8dde6] bg-white text-[#505a5f] text-[12px] font-semibold hover:bg-gray-50"
                >
                  Reject
                </button>
                <button
                  onClick={() => {
                    const isEditing = fieldActions["cfs"] === "edit";
                    setFieldAction("cfs", isEditing ? null : "edit");
                    if (isEditing) setCfsOpen(false);
                  }}
                  className={`flex gap-1.5 items-center px-3 py-1.5  border text-[12px] font-semibold transition-colors ${fieldActions["cfs"] === "edit" ? "bg-[#005eb8] border-[#005eb8] text-white" : "bg-white border-[#d8dde6] text-[#505a5f] hover:bg-gray-50"}`}
                >
                  {fieldActions["cfs"] === "edit" ? "Save" : "Edit"}
                </button>
              </div>
            </div>
            <div className="mt-3 relative">
              <button
                onClick={() => {
                  if (fieldActions["cfs"] === "edit") setCfsOpen((p) => !p);
                }}
                className="w-full bg-white border border-[#d8dde6] px-3 py-2.5 flex items-center justify-between text-left text-[14px] text-[#1d1d1d] hover:border-[#005eb8] transition-colors"
              >
                <span>{selectedCfs?.label}</span>
              </button>
              {cfsOpen && (
                <div className="absolute z-10 top-full left-0 right-0 bg-white border border-[#d8dde6] shadow-lg mt-1 max-h-72 overflow-y-auto">
                  {CFS_OPTIONS.map((opt) => (
                    <button
                      key={opt.value}
                      onClick={() => {
                        setCfsValue(opt.value);
                        setCfsOpen(false);
                      }}
                      className={`w-full text-left px-4 py-3 hover:bg-[#f0f4f5] border-b border-[#d8dde6] last:border-0 transition-colors ${cfsValue === opt.value ? "bg-[#e8f4f8]" : ""}`}
                    >
                      <div className="font-semibold text-[14px] text-[#1d1d1d]">
                        {opt.label}
                      </div>
                      <div className="text-[12px] text-[#505a5f] mt-0.5">
                        {opt.desc}
                      </div>
                    </button>
                  ))}
                </div>
              )}
              {selectedCfs && (
                <p className="mt-2 text-[13px] text-[#505a5f] italic">
                  {selectedCfs.desc}
                </p>
              )}
            </div>
          </div>

          <AssessmentField
            id="active-conditions"
            title="Active Conditions"
            badge="system-prefilled"
            pending
            prefillText="Type 2 diabetes (2012), Hypertension (2008), Chronic heart failure (2019), CKD stage 3a (2020), Dementia, mixed type (2024)"
            prefillProvenance={{
              org: "Woodside Health Centre",
              setting: "Primary care",
              system: "EMIS GP",
              pulled: "3 days ago",
              by: "Dr Patel (GP)",
            }}
            showEdit
            action={fieldActions["active-conditions"] ?? null}
            onAction={setFieldAction}
          />
          <AssessmentField
            id="history-presenting"
            title="History of presenting condition"
            badge="system-prefilled"
            pending
            prefillText="80-year-old male with moderate frailty (CFS 6). 4 falls in last 3 months, most recent 22 Jan 2026 resulting in ED attendance (no fracture). Episode of increased breathlessness 29 Jan 2026, contact via 111 and subsequent virtual ward monitoring. Background of dementia (mixed type, 2024), chronic heart failure, and Type 2 diabetes. Carer strain noted; son's availability has recently reduced."
            prefillProvenance={{
              org: "Community Health Services",
              setting: "Community care",
              system: "Frailty MDT notes",
              pulled: "3 days ago",
              by: "Jane Smith (District Nurse)",
            }}
            action={fieldActions["history-presenting"] ?? null}
            onAction={setFieldAction}
          />
          <AssessmentField
            id="current-diagnosis"
            title="Current diagnosis"
            badge="system-prefilled"
            pending
            prefillText="Type 2 diabetes mellitus (2012) · Hypertension (2008) · Chronic heart failure (2019) · Chronic kidney disease stage 3a (2020) · Dementia, mixed type (2024)"
            prefillProvenance={{
              org: "Woodside Health Centre",
              setting: "Primary care",
              system: "EMIS GP",
              pulled: "3 days ago",
              by: "Dr Patel (GP)",
            }}
            action={fieldActions["current-diagnosis"] ?? null}
            onAction={setFieldAction}
          />
          <AssessmentField
            id="past-medical"
            title="Other significant past medical history"
            pending
            placeholder="Other significant past medical history not captured in active conditions."
            action={fieldActions["past-medical"] ?? null}
            onAction={setFieldAction}
          />
          <AssessmentField
            id="medication-review"
            title="Medication Review"
            badge="risk"
            pending
            placeholder="Document medication review findings here."
            action={fieldActions["medication-review"] ?? null}
            onAction={setFieldAction}
          />
          <AssessmentField
            id="smoking-drugs"
            title="Smoking, drugs and alcohol"
            pending
            placeholder="Smoking status, alcohol intake, recreational drug use and history."
            action={fieldActions["smoking-drugs"] ?? null}
            onAction={setFieldAction}
          />
          <YesNoField
            id="vital-signs"
            title="Vital signs observations"
            badge="system-prefilled"
            pending
            action={fieldActions["vital-signs"] ?? null}
            onAction={setFieldAction}
          />
          <AssessmentField
            id="ecg"
            title="ECG"
            pending
            placeholder="ECG findings and interpretation."
            action={fieldActions["ecg"] ?? null}
            onAction={setFieldAction}
          />
          <AssessmentField
            id="weight-bmi"
            title="Weight, Height & BMI"
            badge="system-prefilled"
            pending
            prefillText="Weight: 54 kg (lost ~3 kg over 6 months). Height: not recorded. BMI: unable to calculate."
            prefillProvenance={{
              org: "Community Health Services",
              setting: "Community care",
              system: "EMIS Community",
              pulled: "2 weeks ago",
              by: "Jane Smith (District Nurse)",
            }}
            action={fieldActions["weight-bmi"] ?? null}
            onAction={setFieldAction}
          />
          <AssessmentField
            id="bloods"
            title="Bloods of note"
            badge="system-prefilled"
            pending
            prefillText="HbA1c: 68 mmol/mol (raised, reviewed by GP). eGFR: reduced, consistent with CKD stage 3a. No recent full blood count on record."
            prefillProvenance={{
              org: "Woodside Health Centre",
              setting: "Primary care",
              system: "EMIS GP",
              pulled: "3 days ago",
              by: "Dr Patel (GP)",
            }}
            action={fieldActions["bloods"] ?? null}
            onAction={setFieldAction}
          />
          <AssessmentField
            id="falls-history"
            title="Falls History"
            badge="risk"
            pending
            prefillText="4 falls in last 3 months. Most recent: 22 Jan 2026, ED attendance, no fracture. Previous falls on record via community and acute. Multifactorial falls intervention in place. Physiotherapy strength and balance programme ongoing (fortnightly)."
            prefillProvenance={{
              org: "Croydon University Hospital",
              setting: "Acute care",
              system: "Oracle Health",
              pulled: "7 days ago",
              by: "Dr Williams (Acute clinician)",
            }}
            placeholder="Add further detail here."
            action={fieldActions["falls-history"] ?? null}
            onAction={setFieldAction}
          />
          <AssessmentField
            id="pain"
            title="Pain"
            pending
            placeholder="Describe pain location, type, severity. Consider using a pain scale such as PAINAD, Abbey, or Visual Analogue Scale."
            action={fieldActions["pain"] ?? null}
            onAction={setFieldAction}
          />
          <AssessmentField
            id="pain-expression"
            title="Differences expressing pain"
            pending
            placeholder="Any difficulties or differences in how the patient expresses pain."
            action={fieldActions["pain-expression"] ?? null}
            onAction={setFieldAction}
          />
          <AssessmentField
            id="eating-drinking"
            title="Eating and drinking"
            pending
            placeholder="Eating and drinking habits, independence, any concerns."
            action={fieldActions["eating-drinking"] ?? null}
            onAction={setFieldAction}
          />
          <AssessmentField
            id="appetite"
            title="Appetite"
            pending
            placeholder="Current appetite, any recent changes."
            action={fieldActions["appetite"] ?? null}
            onAction={setFieldAction}
          />
          <AssessmentField
            id="swallowing"
            title="Swallowing"
            pending
            placeholder="Any swallowing difficulties or concerns. Is SALT involved?"
            action={fieldActions["swallowing"] ?? null}
            onAction={setFieldAction}
          />
          <AssessmentField
            id="feeding-equipment"
            title="Feeding equipment"
            pending
            placeholder="Copy UCP (in medical devices). Any specialised feeding equipment in use."
            action={fieldActions["feeding-equipment"] ?? null}
            onAction={setFieldAction}
          />
          <MustScoreField
            id="must-score"
            action={fieldActions["must-score"] ?? null}
            onAction={setFieldAction}
          />
          <AssessmentField
            id="bladder"
            title="Bladder function"
            pending
            placeholder="Bladder function details. Align with catheter care section."
            action={fieldActions["bladder"] ?? null}
            onAction={setFieldAction}
          />
          <YesNoField
            id="catheter"
            title="Catheter"
            pending
            action={fieldActions["catheter"] ?? null}
            onAction={setFieldAction}
          />
          <AssessmentField
            id="catheter-care"
            title="Catheter care"
            pending
            placeholder="Catheter care details: type, size, date inserted, next change due."
            action={fieldActions["catheter-care"] ?? null}
            onAction={setFieldAction}
          />
          <AssessmentField
            id="bowel"
            title="Bowel function"
            pending
            placeholder="Bowel function details: frequency, consistency, any concerns."
            action={fieldActions["bowel"] ?? null}
            onAction={setFieldAction}
          />
          <AssessmentField
            id="skin"
            title="Skin integrity"
            pending
            placeholder="Skin integrity assessment. Include ulcer grades where applicable."
            action={fieldActions["skin"] ?? null}
            onAction={setFieldAction}
          />
          <AssessmentField
            id="risk-score"
            title="Risk score"
            pending
            placeholder="Risk score. Consider using Purpose T, Waterlow, or Braden scale."
            action={fieldActions["risk-score"] ?? null}
            onAction={setFieldAction}
          />
          <AssessmentField
            id="bone-health"
            title="Bone Health"
            pending
            placeholder="Document bone health findings, DEXA results, fracture risk."
            action={fieldActions["bone-health"] ?? null}
            onAction={setFieldAction}
          />
          <AssessmentField
            id="eyesight"
            title="Eyesight"
            pending
            placeholder="Document eyesight findings, any referrals required."
            action={fieldActions["eyesight"] ?? null}
            onAction={setFieldAction}
          />
          <AssessmentField
            id="hearing"
            title="Hearing"
            pending
            placeholder="Document hearing assessment findings, aids in use, any referrals."
            action={fieldActions["hearing"] ?? null}
            onAction={setFieldAction}
          />
          <AssessmentField
            id="dental"
            title="Dental Health"
            pending
            placeholder="Document dental health, dentures, oral hygiene, last review."
            action={fieldActions["dental"] ?? null}
            onAction={setFieldAction}
          />
          <AssessmentField
            id="other-physical"
            title="Other physical assessment findings"
            pending
            placeholder="Any other physical assessment findings not captured above."
            action={fieldActions["other-physical"] ?? null}
            onAction={setFieldAction}
          />
          <AssessmentField
            id="physical-additional"
            title="Additional details"
            pending
            placeholder="Any other relevant physical information."
            action={fieldActions["physical-additional"] ?? null}
            onAction={setFieldAction}
          />
        </DomainSection>

        {/* Psychological */}
        <DomainSection
          id="psychological"
          icon="🧠"
          title="Psychological"
          reviewedText="0 / 3 reviewed"
          hasRisk
          aiCount={2}
          open={!!open["psychological"]}
          onToggle={toggleDomain}
        >
          <div className="bg-[#fafbfc] border border-[#d8dde6] -[8px] p-4 w-full">
            <div className="flex items-center gap-2 mb-3">
              <span className="font-bold text-[14px] text-[#1d1d1d]">
                Review prompts: Psychological
              </span>
            </div>
            <div className="flex flex-col gap-3">
              <AIInsightCard
                id="ai-psych-1"
                text="PHQ-9 score 14 (moderate depression). Antidepressant therapy not currently prescribed. Consider mental health review."
                confidence="High"
                date="04 Mar 2026"
                state={insightStates["ai-psych-1"] ?? null}
                onState={setInsightState}
              />
              <AIInsightCard
                id="ai-psych-2"
                text="BPSD symptoms escalating: agitation and nocturnal wandering reported by carer. Consider non-pharmacological strategies first."
                confidence="Medium"
                date="04 Mar 2026"
                state={insightStates["ai-psych-2"] ?? null}
                onState={setInsightState}
              />
            </div>
          </div>
          <AssessmentField
            id="cognitive"
            title="Cognitive Assessment"
            badge="system-prefilled"
            pending
            prefillText="Dementia (mixed type) diagnosed 2024. Cognitive impairment noted by GP and community team. Formal cognitive testing to be completed during assessment."
            prefillProvenance={{
              org: "Woodside Health Centre",
              setting: "Primary care",
              system: "EMIS GP",
              pulled: "3 days ago",
              by: "Dr Patel (GP)",
            }}
            placeholder="Add further detail here."
            action={fieldActions["cognitive"] ?? null}
            onAction={setFieldAction}
          />
          <AssessmentField
            id="mood-mental-health"
            title="Mood & Mental Health"
            badge="system-prefilled"
            pending
            prefillText="Previously under community mental health for low mood following bereavement (wife Dorothy, deceased 2022). Discharged from CMHT with advice and self-management plan (Dec 2025). No current mental health input. Carer strain from son may be contributing to low mood. Further assessment required."
            prefillProvenance={{
              org: "Croydon Mental Health Services",
              setting: "Community care",
              system: "ePJS",
              pulled: "7 days ago",
              by: "CMHT discharge record",
            }}
            placeholder="Add further detail here."
            action={fieldActions["mood-mental-health"] ?? null}
            onAction={setFieldAction}
          />
          <AssessmentField
            id="bpsd"
            title="Behavioural & Psychological Symptoms"
            pending
            placeholder="To be completed during assessment."
            action={fieldActions["bpsd"] ?? null}
            onAction={setFieldAction}
          />
        </DomainSection>

        {/* Functional */}
        <DomainSection
          id="functional"
          icon="🦽"
          title="Functional"
          reviewedText="0 / 3 reviewed"
          aiCount={1}
          open={!!open["functional"]}
          onToggle={toggleDomain}
        >
          <div className="bg-[#fafbfc] border border-[#d8dde6] -[8px] p-4 w-full">
            <div className="flex items-center gap-2 mb-3">
              <span className="font-bold text-[14px] text-[#1d1d1d]">
                Review prompts: Functional
              </span>
            </div>
            <div className="flex flex-col gap-3">
              <AIInsightCard
                id="ai-func-1"
                text="Barthel Index score declining over past 3 assessments. OT home assessment overdue, scheduled for 20 Feb but not yet completed."
                confidence="Medium"
                date="04 Mar 2026"
                state={insightStates["ai-func-1"] ?? null}
                onState={setInsightState}
              />
            </div>
          </div>
          <AssessmentField
            id="mobility-transfers"
            title="Mobility & Transfers"
            badge="system-prefilled"
            pending
            prefillText="Indoors: walking stick. Outdoors: wheeled zimmer frame. Transfers: requires assistance of 1. Physio mobility assessment completed 18 Jan 2026 by Tom Edwards (Physiotherapist)."
            prefillProvenance={{
              org: "Community Health Services",
              setting: "Community care",
              system: "Community therapy notes",
              pulled: "2 weeks ago",
              by: "Tom Edwards (Physiotherapist)",
            }}
            placeholder="Add further detail here."
            action={fieldActions["mobility-transfers"] ?? null}
            onAction={setFieldAction}
          />
          <AssessmentField
            id="adls"
            title="Activities of Daily Living (ADLs)"
            pending
            placeholder="To be completed during assessment."
            action={fieldActions["adls"] ?? null}
            onAction={setFieldAction}
          />
          <AssessmentField
            id="ot-home"
            title="OT Home Assessment"
            pending
            placeholder="To be completed during assessment."
            action={fieldActions["ot-home"] ?? null}
            onAction={setFieldAction}
          />
        </DomainSection>

        {/* Social */}
        <DomainSection
          id="social"
          icon="👥"
          title="Social"
          reviewedText="0 / 3 reviewed"
          hasRisk
          aiCount={2}
          open={!!open["social"]}
          onToggle={toggleDomain}
        >
          <div className="bg-[#fafbfc] border border-[#d8dde6] -[8px] p-4 w-full">
            <div className="flex items-center gap-2 mb-3">
              <span className="font-bold text-[14px] text-[#1d1d1d]">
                Review prompts: Social
              </span>
            </div>
            <div className="flex flex-col gap-3">
              <AIInsightCard
                id="ai-soc-1"
                text="Carer strain indicators present. Zarit Burden score moderate. Explore respite care options urgently."
                confidence="High"
                date="04 Mar 2026"
                state={insightStates["ai-soc-1"] ?? null}
                onState={setInsightState}
              />
              <AIInsightCard
                id="ai-soc-2"
                text="Self-neglect safeguarding concern raised by community nurse. Adult safeguarding referral recommended."
                confidence="High"
                date="04 Mar 2026"
                state={insightStates["ai-soc-2"] ?? null}
                onState={setInsightState}
              />
            </div>
          </div>
          <AssessmentField
            id="carer-insights"
            title="Carer Insights"
            badge="risk"
            pending
            prefillText="Primary carer: son Nick Bennett (07700 900 123), lives locally. Contingency carer: daughter Rachel Bennett (07700 900 456), lives in Manchester. Formal: No. Informal: Yes. Carer strain: moderate; son reporting reduced availability due to work commitments. Care package in place: 3x daily visits."
            prefillProvenance={{
              org: "Croydon Council Adult Social Care",
              setting: "Social care",
              system: "Liquidlogic",
              pulled: "2 weeks ago",
              by: "Aisha Khan (Social worker)",
            }}
            placeholder="Add further detail here."
            action={fieldActions["carer-insights"] ?? null}
            onAction={setFieldAction}
          />
          <AssessmentField
            id="safeguarding"
            title="Safeguarding"
            badge="risk"
            pending
            prefillText="Self-neglect risk flagged. Concern logged 02 Feb 2026 by Aisha Khan (Social worker) following care package review. Patient declining some care visits. Safeguarding referral made to Croydon Council Adult Social Care. Status: under review."
            prefillProvenance={{
              org: "Croydon Council Adult Social Care",
              setting: "Social care",
              system: "Liquidlogic",
              pulled: "5 days ago",
              by: "Mark Ellis (Safeguarding lead)",
            }}
            placeholder="Add further detail here."
            action={fieldActions["safeguarding"] ?? null}
            onAction={setFieldAction}
          />
          <AssessmentField
            id="social-isolation"
            title="Social Isolation & Support Networks"
            badge="system-prefilled"
            pending
            prefillText="Lives alone. Wife deceased (2022). Limited social contact noted. Son visits when work allows; daughter in Manchester. No voluntary sector input currently in place. Warm referral to Age UK suggested for social isolation support (status: pending)."
            prefillProvenance={{
              org: "Croydon Council Adult Social Care",
              setting: "Social care",
              system: "Liquidlogic",
              pulled: "5 days ago",
              by: "Aisha Khan (Social worker)",
            }}
            placeholder="Add further detail here."
            action={fieldActions["social-isolation"] ?? null}
            onAction={setFieldAction}
          />
        </DomainSection>

        {/* Personal Information */}
        <DomainSection
          id="personal-info"
          icon="👤"
          title="Personal Information"
          reviewedText="0 / 7 reviewed"
          open={!!open["personal-info"]}
          onToggle={toggleDomain}
        >
          <AssessmentField
            id="personal-info-main"
            title="Personal Information"
            badge="system-prefilled"
            pending
            prefillText="Preferred name: George. Language: English. Religion: Christian. Ethnicity: White British. Next of kin: Nick Bennett (son) · 07700 900 123."
            prefillProvenance={{
              org: "Woodside Health Centre",
              setting: "Primary care",
              system: "EMIS GP",
              pulled: "3 days ago",
              by: "Dr Patel (GP)",
            }}
            showEdit
            action={fieldActions["personal-info-main"] ?? null}
            onAction={setFieldAction}
          />
          <AssessmentField
            id="able-phone"
            title="Able to use phone"
            pending
            placeholder="To be completed during assessment."
            action={fieldActions["able-phone"] ?? null}
            onAction={setFieldAction}
          />
          <AssessmentField
            id="preferred-contact"
            title="Preferred method of contact"
            pending
            placeholder="Add any further detail here..."
            action={fieldActions["preferred-contact"] ?? null}
            onAction={setFieldAction}
          />
          <AssessmentField
            id="comms-support"
            title="Support with communication"
            pending
            placeholder="Any communication support needs, hearing aids, interpreter, etc."
            action={fieldActions["comms-support"] ?? null}
            onAction={setFieldAction}
          />
          <AssessmentField
            id="personal-contacts"
            title="Personal Contacts"
            badge="system-prefilled"
            pending
            prefillText="Son: Nick Bennett (primary carer) · 07700 900 123 · lives locally. Daughter: Rachel Bennett · 07700 900 456 · Manchester. Social worker: Aisha Khan · Croydon Council Adult Social Care."
            prefillProvenance={{
              org: "Croydon Council Adult Social Care",
              setting: "Social care",
              system: "Liquidlogic",
              pulled: "5 days ago",
              by: "Aisha Khan (Social worker)",
            }}
            action={fieldActions["personal-contacts"] ?? null}
            onAction={setFieldAction}
          />
          <AssessmentField
            id="hsc-professionals"
            title="Health and social care professionals or services"
            badge="system-prefilled"
            pending
            prefillText="GP: Dr Patel · Woodside Health Centre. District Nurse: Jane Smith · Community Health Services. Social Worker: Aisha Khan · Croydon Council Adult Social Care. Physiotherapist: Tom Edwards · Community Health Services. Frailty Team: Laura Chen (Co-ordinator). OT: Sarah Linton (Co-ordinator) · awaiting allocation."
            prefillProvenance={{
              org: "Community Health Services",
              setting: "Community care",
              system: "Frailty MDT notes",
              pulled: "3 days ago",
              by: "Jane Smith (District Nurse)",
            }}
            showEdit
            action={fieldActions["hsc-professionals"] ?? null}
            onAction={setFieldAction}
          />
          <AssessmentField
            id="personal-info-additional"
            title="Additional details"
            pending
            placeholder="Any other relevant personal information."
            action={fieldActions["personal-info-additional"] ?? null}
            onAction={setFieldAction}
          />
        </DomainSection>

        {/* Environmental */}
        <DomainSection
          id="environmental"
          icon="🏠"
          title="Environmental"
          reviewedText="0 / 10 reviewed"
          open={!!open["environmental"]}
          onToggle={toggleDomain}
        >
          <AssessmentField
            id="who-lives-with"
            title="Who they live with"
            badge="system-prefilled"
            pending
            prefillText="Lives alone. Son Nick Bennett (primary carer) lives locally. Daughter Rachel Bennett lives in Manchester. Care package: 3x daily visits."
            prefillProvenance={{
              org: "Croydon Council Adult Social Care",
              setting: "Social care",
              system: "Liquidlogic",
              pulled: "2 weeks ago",
              by: "Aisha Khan (Social worker)",
            }}
            showEdit
            action={fieldActions["who-lives-with"] ?? null}
            onAction={setFieldAction}
          />
          <AssessmentField
            id="access-property"
            title="Access to property"
            pending
            placeholder="Details about access to the property: steps, ramps, key access, etc."
            action={fieldActions["access-property"] ?? null}
            onAction={setFieldAction}
          />
          <AssessmentField
            id="accommodation-type"
            title="Type of accommodation"
            badge="system-prefilled"
            pending
            prefillText="Ground floor flat. Council property (Croydon Council). No steps at entrance. Support required for transport."
            prefillProvenance={{
              org: "Croydon Council Adult Social Care",
              setting: "Social care",
              system: "Liquidlogic",
              pulled: "2 weeks ago",
              by: "Aisha Khan (Social worker)",
            }}
            showEdit
            action={fieldActions["accommodation-type"] ?? null}
            onAction={setFieldAction}
          />
          <AssessmentField
            id="property-issues"
            title="Are there any issues identified with this property"
            badge="risk"
            pending
            placeholder="Damp, disrepair, hazards, accessibility issues, etc."
            action={fieldActions["property-issues"] ?? null}
            onAction={setFieldAction}
          />
          <AssessmentField
            id="housing-plan"
            title="Plan to address housing issues"
            pending
            placeholder="Plans to resolve any identified housing issues."
            action={fieldActions["housing-plan"] ?? null}
            onAction={setFieldAction}
          />
          <AssessmentField
            id="evacuation-plan"
            title="Emergency evacuation plan"
            pending
            placeholder="Details of the emergency evacuation plan."
            action={fieldActions["evacuation-plan"] ?? null}
            onAction={setFieldAction}
          />
          <AssessmentField
            id="key-safe"
            title="Key safe details"
            badge="system-prefilled"
            pending
            prefillText="Key safe present. Location: front door, left of frame. Code: held by district nursing team. Confirm code with Jane Smith (District Nurse) before visit."
            prefillProvenance={{
              org: "Community Health Services",
              setting: "Community care",
              system: "EMIS Community",
              pulled: "3 days ago",
              by: "Jane Smith (District Nurse)",
            }}
            showEdit
            action={fieldActions["key-safe"] ?? null}
            onAction={setFieldAction}
          />
          <AssessmentField
            id="pets"
            title="Pets"
            pending
            placeholder="Details of any pets in the home."
            action={fieldActions["pets"] ?? null}
            onAction={setFieldAction}
          />
          <AssessmentField
            id="keeping-safe"
            title="Keeping safe at home and in the community"
            badge="risk"
            pending
            placeholder="Safety concerns, telecare, assistive technology, community safety, etc."
            action={fieldActions["keeping-safe"] ?? null}
            onAction={setFieldAction}
          />
          <AssessmentField
            id="environmental-additional"
            title="Additional details"
            pending
            placeholder="Any other relevant environmental information."
            action={fieldActions["environmental-additional"] ?? null}
            onAction={setFieldAction}
          />
        </DomainSection>

        {/* Future Wishes */}
        <DomainSection
          id="future-wishes"
          icon="📋"
          title="Future Wishes"
          reviewedText="0 / 3 reviewed"
          open={!!open["future-wishes"]}
          onToggle={toggleDomain}
        >
          <AssessmentField
            id="dnacpr"
            title="DNACPR"
            badge="system-prefilled"
            pending
            prefillText="DNACPR in place. Decision made 14 Nov 2025 by Dr Patel (GP) following discussion with patient and family. Documented in EMIS GP. Copy held at Woodside Health Centre."
            prefillProvenance={{
              org: "Woodside Health Centre",
              setting: "Primary care",
              system: "EMIS GP",
              pulled: "5 days ago",
              by: "Dr Patel (GP)",
            }}
            showEdit
            action={fieldActions["dnacpr"] ?? null}
            onAction={setFieldAction}
          />
          <AssessmentField
            id="preferred-care-death"
            title="Preferred Place of Care & Death"
            pending
            placeholder="To be completed during assessment."
            action={fieldActions["preferred-care-death"] ?? null}
            onAction={setFieldAction}
          />
          <AssessmentField
            id="lpa"
            title="Lasting Power of Attorney"
            badge="system-prefilled"
            pending
            prefillText="LPA status: not confirmed on record. To be verified with patient and family during assessment. Son Nick Bennett (07700 900 123) may hold authority."
            prefillProvenance={{
              org: "Woodside Health Centre",
              setting: "Primary care",
              system: "EMIS GP",
              pulled: "3 days ago",
              by: "Dr Patel (GP)",
            }}
            showEdit
            action={fieldActions["lpa"] ?? null}
            onAction={setFieldAction}
          />
        </DomainSection>

        {/* Patient Goals */}
        <DomainSection
          id="patient-goals"
          icon="🎯"
          title="Patient Goals"
          reviewedText="0 / 5 reviewed"
          open={!!open["patient-goals"]}
          onToggle={toggleDomain}
        >
          <AssessmentField
            id="daily-life"
            title="Daily life and interests"
            pending
            placeholder="What does their day look like? Hobbies, routines, activities they enjoy."
            action={fieldActions["daily-life"] ?? null}
            onAction={setFieldAction}
          />
          <AssessmentField
            id="important-wishes"
            title="What is important to them and their preferences and wishes"
            pending
            placeholder="To be completed during assessment."
            action={fieldActions["important-wishes"] ?? null}
            onAction={setFieldAction}
          />
          <AssessmentField
            id="concerns-wellbeing"
            title="Concerns and wellbeing"
            pending
            placeholder="Any concerns the patient has about their health, wellbeing, or situation."
            action={fieldActions["concerns-wellbeing"] ?? null}
            onAction={setFieldAction}
          />
          <AssessmentField
            id="goals"
            title="Goals"
            pending
            placeholder="Specific goals the patient would like to work towards."
            action={fieldActions["goals"] ?? null}
            onAction={setFieldAction}
          />
          <AssessmentField
            id="goals-additional"
            title="Additional details"
            pending
            placeholder="Any other relevant information about the patient's goals."
            action={fieldActions["goals-additional"] ?? null}
            onAction={setFieldAction}
          />
        </DomainSection>
      </div>

      {/* Bottom bar */}
      <div className="sticky bottom-0 bg-white border-t border-[#d8dde6] px-6 py-4 flex items-center justify-between">
        <div />
        <div className="flex gap-3">
          <button
            onClick={() => onNavigate("snapshot")}
            className="border border-[#505a5f] text-[#505a5f] text-[14px] font-semibold px-5 py-2.5 hover:bg-gray-50 transition-colors"
          >
            ← Back
          </button>
          <button
            onClick={() => onNavigate("care-plan")}
            className="bg-[#005eb8] text-white text-[14px] font-semibold px-5 py-2.5 hover:bg-[#004b93] transition-colors"
          >
            Next →
          </button>
        </div>
      </div>
    </div>
  );
}

// ── Care Plan ─────────────────────────────────────────────────────────────────

interface CpDomainProps {
  id: string;
  icon: string;
  title: string;
  riskLevel?: "high" | "medium" | "low" | null;
  referredCount?: number;
  pendingCount?: number;
  open: boolean;
  onToggle: (id: string) => void;
  children: ReactNode;
}

function CpDomain({
  id,
  icon,
  title,
  riskLevel,
  referredCount,
  pendingCount,
  open,
  onToggle,
  children,
}: CpDomainProps) {
  const riskColors = {
    high: {
      bg: "bg-[#d5281b]",
      border: "border-[#d5281b]",
      text: "text-white",
      label: "High Risk",
    },
    medium: {
      bg: "bg-[#d46a00]",
      border: "border-[#d46a00]",
      text: "text-white",
      label: "Medium Risk",
    },
    low: {
      bg: "bg-[#00703c]",
      border: "border-[#00703c]",
      text: "text-white",
      label: "Low Risk",
    },
  };
  const risk = riskLevel ? riskColors[riskLevel] : null;
  return (
    <div className="border border-[#d8dde6] -[8px] overflow-hidden w-full shadow-sm">
      <button
        onClick={() => onToggle(id)}
        className="w-full bg-[#f0f4f5] px-5 py-4 flex items-center justify-between hover:bg-[#e8eef0] transition-colors"
      >
        <div className="flex gap-3 items-center flex-wrap">
          <span className="font-bold text-[18px] text-[#1d1d1d]">{title}</span>
          {risk && (
            <span
              className={`${risk.bg} border ${risk.border} ${risk.text} text-[12px] font-bold px-2 py-0.5  flex items-center gap-1`}
            >
              {risk.label}
            </span>
          )}
          {referredCount != null && referredCount > 0 && (
            <span className="bg-[#005eb8] border border-[#005eb8] text-white text-[12px] font-bold px-2 py-0.5 flex items-center gap-1">
              {referredCount} referred
            </span>
          )}
          {pendingCount != null && pendingCount > 0 && (
            <span className="bg-[#d46a00] border border-[#d46a00] text-white text-[12px] font-bold px-2 py-0.5 flex items-center gap-1">
              {pendingCount} pending
            </span>
          )}
        </div>
        <span className="text-[#505a5f] text-[16px] shrink-0 ml-4">
          {open ? "▲" : "▼"}
        </span>
      </button>
      {open && (
        <div className="bg-white p-5 flex flex-col gap-4">{children}</div>
      )}
    </div>
  );
}

interface ReferralCardProps {
  title: string;
  status: "Referred" | "Pending" | "Suggested" | "Completed";
  owner?: string;
  timescale?: string;
  service?: string;
  note?: string;
}

function ReferralCard({
  title,
  status,
  owner,
  timescale,
  service,
  note,
}: ReferralCardProps) {
  const statusColors: Record<string, string> = {
    Referred: "bg-[#005eb8] border border-[#005eb8] text-white",
    Pending: "bg-[#d46a00] border border-[#d46a00] text-white",
    Suggested: "bg-[#4c2c92] border border-[#4c2c92] text-white",
    Completed: "bg-[#00703c] border border-[#00703c] text-white",
  };
  return (
    <div className="bg-white border border-[#d8dde6] -[8px] p-4 w-full">
      <div className="flex items-start justify-between gap-3">
        <span className="font-semibold text-[16px] text-[#1d1d1d] flex-1">
          {title}
        </span>
        <span
          className={`text-[12px] font-bold px-2 py-0.5  shrink-0 ${statusColors[status] ?? "bg-[#505a5f] text-white"}`}
        >
          {status}
        </span>
      </div>
      {(owner || timescale || service) && (
        <div className="mt-2 flex flex-wrap gap-x-4 gap-y-1 text-[14px]">
          {owner && (
            <span>
              <span className="font-bold text-[#505a5f]">Owner: </span>
              {owner}
            </span>
          )}
          {timescale && (
            <span>
              <span className="font-bold text-[#505a5f]">Timescale: </span>
              {timescale}
            </span>
          )}
          {service && (
            <span>
              <span className="font-bold text-[#505a5f]">Service: </span>
              {service}
            </span>
          )}
        </div>
      )}
      {note && <p className="mt-2 text-[14px] text-[#505a5f] italic">{note}</p>}
    </div>
  );
}

interface CpSubPanelProps {
  id: string;
  title: string;
  open: boolean;
  onToggle: (id: string) => void;
  children: ReactNode;
}

function CpSubPanel({ id, title, open, onToggle, children }: CpSubPanelProps) {
  return (
    <div className="border border-[#d8dde6] -[8px] overflow-hidden w-full">
      <button
        onClick={() => onToggle(id)}
        className="w-full bg-[#f0f4f5] px-5 py-3 flex items-center justify-between hover:bg-[#e8eef0] transition-colors"
      >
        <span className="font-bold text-[14px] text-[#1d1d1d]">{title}</span>
        <span className="text-[#505a5f] text-[14px]">{open ? "▲" : "▼"}</span>
      </button>
      {open && <div className="bg-white p-5">{children}</div>}
    </div>
  );
}

function AuditEntry({
  text,
  who,
  when,
}: {
  text: string;
  who: string;
  when: string;
}) {
  return (
    <div className="flex gap-3 items-start py-2 border-b border-[#e8edee] last:border-0">
      <div className="mt-2 shrink-0">
        <div className="w-1.5 h-1.5 bg-[#005eb8]" />
      </div>
      <div className="flex-1 min-w-0">
        <p className="text-[14px] text-[#1d1d1d] leading-6">{text}</p>
        <p className="text-[12px] text-[#595959] mt-0.5">
          {who} • {when}
        </p>
      </div>
    </div>
  );
}

interface CpActionCardProps {
  title: string;
  status: "Pending" | "Active" | "Suggested" | "Referred" | "Completed";
  owner: string;
  timescale: string;
  service: string;
}

function CpActionCard({
  title,
  status,
  owner,
  timescale,
  service,
}: CpActionCardProps) {
  const statusStyles: Record<string, string> = {
    Pending: "bg-[#d46a00] border border-[#d46a00] text-white",
    Active: "bg-[#00703c] border border-[#00703c] text-white",
    Suggested: "bg-[#4c2c92] border border-[#4c2c92] text-white",
    Referred: "bg-[#005eb8] border border-[#005eb8] text-white",
    Completed: "bg-[#00703c] border border-[#00703c] text-white",
  };
  return (
    <div className="border border-[#d8dde6] -[4px] p-3 w-full">
      <div className="flex items-start justify-between gap-2">
        <span className="font-semibold text-[16px] text-[#1d1d1d] leading-5 flex-1">
          {title}
        </span>
        <span
          className={`text-[12px] font-bold px-2 py-0.5  shrink-0 ${statusStyles[status]}`}
        >
          {status}
        </span>
      </div>
      <div className="mt-2 grid grid-cols-2 gap-x-2 gap-y-1">
        <div>
          <p className="text-[11px] font-bold text-[#505a5f]">Owner</p>
          <p className="text-[13px] text-[#1d1d1d]">{owner}</p>
        </div>
        <div>
          <p className="text-[11px] font-bold text-[#505a5f]">Timescale</p>
          <p className="text-[13px] font-semibold text-[#1d1d1d]">
            {timescale}
          </p>
        </div>
        <div className="col-span-2">
          <p className="text-[11px] font-bold text-[#505a5f]">Service</p>
          <p className="text-[13px] text-[#1d1d1d]">{service}</p>
        </div>
      </div>
    </div>
  );
}

interface Cp3ColDomainProps {
  id: string;
  icon: string;
  emoji: string;
  title: string;
  riskBadge?: {
    label: string;
    bg: string;
    border: string;
    text: string;
    dot: string;
  };
  referredCount?: number;
  pendingCount?: number;
  actionsCount: number;
  open: boolean;
  onToggle: (id: string) => void;
  insightText: string;
  insightMeta: {
    owner: string;
    referralStatus: string;
    frequency: string;
    nextAppt: string;
  };
  carePlanText: string;
  onCarePlanChange: (text: string) => void;
  editing: boolean;
  onEditToggle: () => void;
  actions: CpActionCardProps[];
}

function Cp3ColDomain({
  id,
  icon,
  emoji,
  title,
  riskBadge,
  referredCount,
  pendingCount,
  actionsCount,
  open,
  onToggle,
  carePlanText,
  onCarePlanChange,
  editing,
  onEditToggle,
  actions,
}: Cp3ColDomainProps) {
  const [addingAction, setAddingAction] = useState(false);
  const [addedActions, setAddedActions] = useState<CpActionCardProps[]>([]);
  const [newAction, setNewAction] = useState({
    owner: "",
    service: "",
    timescale: "",
    notes: "",
  });

  function saveAction(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setAddedActions((current) => [
      ...current,
      {
        title: newAction.notes.trim(),
        status: "Suggested",
        owner: newAction.owner,
        service: newAction.service,
        timescale: newAction.timescale,
      },
    ]);
    setNewAction({ owner: "", service: "", timescale: "", notes: "" });
    setAddingAction(false);
  }

  return (
    <div className="bg-white border border-[#d8dde6] -[8px] overflow-hidden shadow-sm w-full">
      <button
        onClick={() => onToggle(id)}
        className="w-full bg-[#f0f4f5] px-6 py-4 flex items-center justify-between hover:bg-[#e8eef0] transition-colors text-left"
      >
        <div className="flex gap-3 items-center flex-wrap">
          <span className="font-bold text-[18px] text-[#1d1d1d]">{title}</span>
          {riskBadge && (
            <span
              className={`${riskBadge.bg} border ${riskBadge.border} ${riskBadge.text} text-[12px] font-bold px-2 py-0.5  flex items-center gap-1`}
            >
              <span className={`inline-block w-2.5 h-2.5  ${riskBadge.dot}`} />
              {riskBadge.label}
            </span>
          )}
          {referredCount != null && referredCount > 0 && (
            <span className="bg-[#005eb8] border border-[#005eb8] text-white text-[12px] font-bold px-2 py-0.5 flex items-center gap-1">
              {referredCount} referred
            </span>
          )}
          {pendingCount != null && pendingCount > 0 && (
            <span className="bg-[#d46a00] border border-[#d46a00] text-white text-[12px] font-bold px-2 py-0.5 flex items-center gap-1">
              {pendingCount} pending
            </span>
          )}
        </div>
        <div className="flex items-center gap-4 shrink-0 ml-4">
          <span className="text-[#505a5f] text-[16px]">{open ? "▲" : "▼"}</span>
        </div>
      </button>
      {open && (
        <div className="p-6">
          <div className="grid grid-cols-2 gap-5">
            {/* Detailed Care Plan */}
            <div className="border border-[#d8dde6] -[8px] overflow-hidden flex flex-col">
              <div className="bg-[#005eb8] px-4 py-3 flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span className="font-bold text-[12px] text-white">
                    Detailed Care Plan
                  </span>
                </div>
                {editing ? (
                  <button
                    onClick={onEditToggle}
                    className="bg-white text-[#005eb8] text-[12px] font-semibold px-3 py-1 -[4px] hover:bg-[#f0f4f5] transition-colors"
                  >
                    Save
                  </button>
                ) : (
                  <button
                    onClick={onEditToggle}
                    className="bg-[rgba(255,255,255,0.2)] flex items-center gap-1 px-2 py-1 -[4px] hover:bg-[rgba(255,255,255,0.3)] transition-colors"
                  >
                    <span className="text-white text-[12px] font-semibold">
                      Edit
                    </span>
                  </button>
                )}
              </div>
              <div className="bg-white flex-1 p-4 flex flex-col">
                {editing ? (
                  <textarea
                    className="flex-1 w-full text-[16px] text-[#1d1d1d] leading-[26px] border border-[#d8dde6] -[4px] p-3 resize-none focus:outline-none focus:border-[#005eb8] min-h-[200px]"
                    value={carePlanText}
                    onChange={(e) => onCarePlanChange(e.target.value)}
                    autoFocus
                  />
                ) : (
                  <p className="text-[16px] text-[#1d1d1d] leading-[26px] flex-1 whitespace-pre-line">
                    {carePlanText}
                  </p>
                )}
                <div className="flex items-center gap-2 mt-3">
                  <span className="text-[#505a5f] text-[12px]">
                    {editing
                      ? "Review your changes, then select Save."
                      : "Saved to the patient record"}
                  </span>
                </div>
              </div>
            </div>

            {/* Recommended Actions */}
            <div className="border border-[#d8dde6] -[8px] overflow-hidden flex flex-col">
              <div className="bg-[#00703c] px-4 py-3 flex items-center justify-between gap-2">
                <span className="font-bold text-[12px] text-white">
                  Recommended Actions
                </span>
                <button
                  type="button"
                  onClick={() => setAddingAction((current) => !current)}
                  className="bg-white text-[#00703c] text-[12px] font-semibold px-3 py-1 hover:bg-[#f0f4f5] transition-colors"
                >
                  Add
                </button>
              </div>
              <div className="bg-white flex-1 p-4 flex flex-col gap-3">
                {addingAction && (
                  <form
                    onSubmit={saveAction}
                    className="border border-[#d8dde6] bg-[#f7f9fc] p-4"
                  >
                    <p className="font-bold text-[16px] text-[#1d1d1d]">
                      Add action
                    </p>
                    <div className="mt-4 flex flex-col gap-3">
                      <label className="flex flex-col gap-1">
                        <span className="text-[13px] font-bold text-[#1d1d1d]">
                          Owner
                        </span>
                        <select
                          required
                          value={newAction.owner}
                          onChange={(e) =>
                            setNewAction((current) => ({
                              ...current,
                              owner: e.target.value,
                            }))
                          }
                          className="h-10 border border-[#768692] bg-white px-3 text-[14px] text-[#1d1d1d] focus:border-[#005eb8] focus:outline-none"
                        >
                          <option value="" disabled>
                            Select owner
                          </option>
                          <option>GP</option>
                          <option>GP / Pharmacist</option>
                          <option>District Nurse</option>
                          <option>Community OT</option>
                          <option>Community Physio</option>
                          <option>Social Worker</option>
                          <option>Frailty Coordinator</option>
                        </select>
                      </label>
                      <label className="flex flex-col gap-1">
                        <span className="text-[13px] font-bold text-[#1d1d1d]">
                          Service
                        </span>
                        <select
                          required
                          value={newAction.service}
                          onChange={(e) =>
                            setNewAction((current) => ({
                              ...current,
                              service: e.target.value,
                            }))
                          }
                          className="h-10 border border-[#768692] bg-white px-3 text-[14px] text-[#1d1d1d] focus:border-[#005eb8] focus:outline-none"
                        >
                          <option value="" disabled>
                            Select service
                          </option>
                          <option>Primary Care</option>
                          <option>Community Nursing</option>
                          <option>Community OT</option>
                          <option>Community Physio</option>
                          <option>Adult Social Care</option>
                          <option>Frailty Team</option>
                          <option>Voluntary Sector</option>
                        </select>
                      </label>
                      <label className="flex flex-col gap-1">
                        <span className="text-[13px] font-bold text-[#1d1d1d]">
                          Timescale
                        </span>
                        <select
                          required
                          value={newAction.timescale}
                          onChange={(e) =>
                            setNewAction((current) => ({
                              ...current,
                              timescale: e.target.value,
                            }))
                          }
                          className="h-10 border border-[#768692] bg-white px-3 text-[14px] text-[#1d1d1d] focus:border-[#005eb8] focus:outline-none"
                        >
                          <option value="" disabled>
                            Select timescale
                          </option>
                          <option>Urgent, within 5 days</option>
                          <option>Within 1 week</option>
                          <option>Within 2 weeks</option>
                          <option>Within 1 month</option>
                          <option>At next home visit</option>
                          <option>Next MDT review</option>
                          <option>Ongoing</option>
                        </select>
                      </label>
                      <label className="flex flex-col gap-1">
                        <span className="text-[13px] font-bold text-[#1d1d1d]">
                          Notes
                        </span>
                        <textarea
                          required
                          value={newAction.notes}
                          onChange={(e) =>
                            setNewAction((current) => ({
                              ...current,
                              notes: e.target.value,
                            }))
                          }
                          placeholder="Enter action details"
                          className="min-h-24 border border-[#768692] bg-white p-3 text-[14px] text-[#1d1d1d] resize-y placeholder:text-[#505a5f] focus:border-[#005eb8] focus:outline-none"
                        />
                      </label>
                      <div>
                        <button
                          type="submit"
                          className="bg-[#005eb8] px-5 py-2 text-[14px] font-bold text-white hover:bg-[#004b93] transition-colors"
                        >
                          Save
                        </button>
                      </div>
                    </div>
                  </form>
                )}
                {[...actions, ...addedActions].map((a, i) => (
                  <CpActionCard key={`${a.title}-${i}`} {...a} />
                ))}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

function CarePlanPage({ onNavigate }: { onNavigate: (p: Page) => void }) {
  const [openDomains, setOpenDomains] = useState<Record<string, boolean>>({
    falls: false,
    medical: false,
    mental: false,
    functional: false,
    social: false,
    goals: false,
  });
  const [editingDomain, setEditingDomain] = useState<Record<string, boolean>>(
    {},
  );
  const [carePlanTexts, setCarePlanTexts] = useState<Record<string, string>>({
    falls:
      "Multifactorial falls intervention in place. Patient requires:\n• Ongoing physiotherapy strength & balance programme (fortnightly)\n• OT home assessment for equipment review and environmental hazard reduction\n• Medication review focusing on postural hypotension risk\n• Evening and night safety measures: sensor lighting, bed rail assessment\n• Footwear assessment and advice\n• Weight monitoring (weekly)",
    medical:
      "Active medical management priorities:\n• Polypharmacy review with deprescribing where appropriate — focus on falls-related medications\n• Glycaemic management review — HbA1c recheck, dietary input if needed\n• Heart failure monitoring (weight, fluid balance, symptoms)\n• CKD stage 3a — renal function monitoring (6-monthly)\n• Ophthalmology follow-up — cataract progression assessment and falls contribution\n• Audiological referral — formal hearing assessment based on carer concerns\n• Dental assessment — urgent referral to community dental service",
    mental:
      "Mental health and cognitive support plan:\n• IAPT referral for low mood management — adapted for cognitive impairment\n• Social prescribing — reconnect with community activities, reduce isolation\n• Delirium prevention — hydration, sleep hygiene, medication review\n• Sundowning management — structured evening routine, lighting adjustments\n• Regular mood monitoring by DN and social worker\n• Bereavement support consideration — wife passed 2022, ongoing grief",
    functional:
      "Functional independence support plan:\n• Rollator with seat in use; environmental modifications completed\n• Ongoing physiotherapy strength and balance programme (fortnightly)\n• ADL support from home carer 3x/day — personal care, dressing, meal prep\n• Raised toilet seat ordered; installation pending\n• Monthly OT check-in to monitor home safety and equipment needs",
    social:
      "Carer and social support plan:\n• Care package confirmed: 3 visits/day (morning, midday, evening)\n• Safeguarding concern (self-neglect) logged and under review\n• Carer assessment for son arranged through social worker\n• Social isolation support: warm referral to Age UK day service\n• Emergency plan in place: son as named emergency contact",
    goals:
      "Patient goals and advance care plan:\n• Remain at home with support — preferred place of care documented\n• DNACPR in place and reviewed with patient and son\n• LPA (health and welfare) status unconfirmed — to be verified with family\n• Faith community visits welcomed — chaplain referral offered\n• Priority: reduce falls, maintain independence with personal care",
  });

  const [historyOpen, setHistoryOpen] = useState(true);
  const [saved, setSaved] = useState(false);

  const toggleDomain = (id: string) =>
    setOpenDomains((p) => ({ ...p, [id]: !p[id] }));
  const toggleEdit = (id: string) => {
    setEditingDomain((p) => ({ ...p, [id]: !p[id] }));
    setSaved(false);
  };
  const updateText = (id: string, text: string) =>
    setCarePlanTexts((p) => ({ ...p, [id]: text }));

  const HIGH_RISK = {
    label: "High Risk",
    bg: "bg-[#d5281b]",
    border: "border-[#d5281b]",
    text: "text-white",
    dot: "bg-white",
  };
  const MED_RISK = {
    label: "Medium Risk",
    bg: "bg-[#d46a00]",
    border: "border-[#d46a00]",
    text: "text-white",
    dot: "bg-white",
  };
  const LOW_RISK = {
    label: "Low Risk",
    bg: "bg-[#00703c]",
    border: "border-[#00703c]",
    text: "text-white",
    dot: "bg-white",
  };

  const domains: Omit<
    Cp3ColDomainProps,
    | "open"
    | "onToggle"
    | "carePlanText"
    | "onCarePlanChange"
    | "editing"
    | "onEditToggle"
  >[] = [
    {
      id: "falls",
      icon: imgCpAiSparkle,
      emoji: "⚠️",
      title: "Falls Prevention",
      riskBadge: HIGH_RISK,
      referredCount: 1,
      pendingCount: 2,
      actionsCount: 4,
      insightText:
        "Multifactorial falls risk identified. 4 falls in the last 3 months, all in the home environment. Timed Up and Go (TUG) test: 22 seconds (moderate fall risk). Postural hypotension confirmed on standing BP. Visual impairment and polypharmacy contributing factors. OT home assessment completed 24 Feb 2026.",
      insightMeta: {
        owner: "OT / Community Physio",
        referralStatus: "Physio referral — active",
        frequency: "Fortnightly",
        nextAppt: "20 Feb 2026 — OT home visit",
      },
      actions: [
        {
          title: "Occupational Therapy home assessment",
          status: "Referred",
          owner: "Community OT",
          timescale: "At home visit",
          service: "Community OT",
        },
        {
          title: "Physiotherapy: strength and balance programme",
          status: "Active",
          owner: "Community Physio",
          timescale: "Fortnightly",
          service: "Community Physio",
        },
        {
          title: "Medication review: postural hypotension risk",
          status: "Pending",
          owner: "GP / Pharmacist",
          timescale: "At home visit",
          service: "Primary Care",
        },
        {
          title: "Sensor lighting and bed rail assessment",
          status: "Suggested",
          owner: "Community OT",
          timescale: "With OT visit",
          service: "Community OT",
        },
      ],
    },
    {
      id: "medical",
      icon: imgCpAiSparkle,
      emoji: "💊",
      title: "Medical Management",
      riskBadge: HIGH_RISK,
      pendingCount: 4,
      actionsCount: 5,
      insightText:
        "5 active medications with polypharmacy risk identified. 2 medications flagged for pharmacist review (Aspirin 75mg, Bisoprolol 2.5mg). Blood glucose rising (7.2 mmol/L) indicating deteriorating glycaemic control. BP stable at 148/90 mmHg. CKD stage 3a stable. Eyesight last tested Mar 2024 (>23 months ago). Bilateral cataracts noted. Hearing concerns reported by carer with no formal assessment. Dental record absent and may be linked to weight loss.",
      insightMeta: {
        owner: "Dr Patel (GP)",
        referralStatus: "Pharmacist review — pending",
        frequency: "GP monthly, DN weekly",
        nextAppt: "14/03/2026 — GP review",
      },
      actions: [
        {
          title: "Polypharmacy review with deprescribing",
          status: "Pending",
          owner: "GP",
          timescale: "1 week",
          service: "Primary Care",
        },
        {
          title: "Diabetes and heart failure monitoring",
          status: "Active",
          owner: "Practice Nurse",
          timescale: "Monthly",
          service: "Primary Care",
        },
        {
          title: "Ophthalmology referral — cataract assessment",
          status: "Suggested",
          owner: "GP",
          timescale: "2 weeks",
          service: "Secondary Care",
        },
        {
          title: "Audiological assessment referral",
          status: "Suggested",
          owner: "GP",
          timescale: "2 weeks",
          service: "Audiology",
        },
        {
          title: "Community dental service referral",
          status: "Suggested",
          owner: "GP / DN",
          timescale: "1 week",
          service: "Community Dental",
        },
      ],
    },
    {
      id: "mental",
      icon: imgCpAiSparkle,
      emoji: "🧠",
      title: "Mental Health & Wellbeing",
      riskBadge: MED_RISK,
      referredCount: 2,
      pendingCount: 2,
      actionsCount: 4,
      insightText:
        "Mood trajectory declining across 3 separate data sources over 6 weeks. Patient reports low mood linked to increased falls and reduced independence. Son notes increased withdrawal. Possible agitation pattern detected in DN evening visits — correlating with sundowning behaviour. Dementia (mixed type) diagnosed 2024; 4AT score: 2 with moderate delirium risk. Previously under CMHT — discharged Dec 2025.",
      insightMeta: {
        owner: "Mental Health Team / GP",
        referralStatus: "IAPT referral — pending",
        frequency: "GP 6-weekly review",
        nextAppt: "TBC — awaiting IAPT allocation",
      },
      actions: [
        {
          title: "IAPT referral for low mood management",
          status: "Pending",
          owner: "GP",
          timescale: "2 weeks",
          service: "IAPT / Talking Therapies",
        },
        {
          title: "Social prescribing: community reconnection",
          status: "Suggested",
          owner: "Social Prescriber",
          timescale: "Within 1 month",
          service: "Primary Care Network",
        },
        {
          title: "Delirium prevention plan implementation",
          status: "Active",
          owner: "DN / GP",
          timescale: "Ongoing",
          service: "Community / Primary Care",
        },
        {
          title: "Sundowning management protocol",
          status: "Suggested",
          owner: "District Nurse",
          timescale: "At next home visit",
          service: "Community Nursing",
        },
      ],
    },
    {
      id: "functional",
      icon: imgCpAiSparkle,
      emoji: "🦽",
      title: "Functional Independence",
      actionsCount: 2,
      insightText:
        "Barthel Index 12/20. Mobilises with rollator post-OT intervention. Transfers with standby assist only. ADL support from home carer for bathing, dressing, and toileting. OT home visit completed 24 Feb 2026 — significant improvements in home safety noted. Environmental hazards removed.",
      insightMeta: {
        owner: "OT / Community Physio",
        referralStatus: "OT assessment — completed",
        frequency: "Monthly OT check-in",
        nextAppt: "24 Mar 2026 — OT review",
      },
      actions: [
        {
          title: "OT home assessment",
          status: "Completed",
          owner: "Community OT",
          timescale: "Completed 24 Feb 2026",
          service: "Community OT",
        },
        {
          title: "Physiotherapy: ongoing mobility programme",
          status: "Active",
          owner: "Community Physio",
          timescale: "Fortnightly",
          service: "Community Physio",
        },
      ],
    },
    {
      id: "social",
      icon: imgCpAiSparkle,
      emoji: "👥",
      title: "Carer Support & Social",
      riskBadge: HIGH_RISK,
      referredCount: 2,
      actionsCount: 3,
      insightText:
        "Care package confirmed: 3 visits/day (morning, midday, evening). Safeguarding concern for self-neglect logged by social worker Aisha Khan. Son (primary informal carer) showing signs of carer burden. Social isolation significant — limited community engagement. Warm referral to Age UK suggested.",
      insightMeta: {
        owner: "Aisha Khan (Social Worker)",
        referralStatus: "Safeguarding — under review",
        frequency: "Weekly social worker contact",
        nextAppt: "12 Mar 2026 — care review",
      },
      actions: [
        {
          title: "Adult safeguarding referral: self-neglect",
          status: "Referred",
          owner: "Aisha Khan (SW)",
          timescale: "Urgent — within 5 days",
          service: "Croydon Adult Social Care",
        },
        {
          title: "Carer assessment and respite support",
          status: "Referred",
          owner: "Social Work Team",
          timescale: "Within 2 weeks",
          service: "Local Authority",
        },
        {
          title: "Age UK social isolation referral",
          status: "Suggested",
          owner: "Social Prescriber",
          timescale: "Within 1 month",
          service: "Voluntary Sector",
        },
      ],
    },
    {
      id: "goals",
      icon: imgCpAiSparkle,
      emoji: "🎯",
      title: "Patient Goals & Future Wishes",
      riskBadge: LOW_RISK,
      pendingCount: 2,
      actionsCount: 2,
      insightText:
        "Patient's goals: remain at home, maintain dignity and independence with personal care, see daughter Rachel regularly, maintain faith connection, and reduce falls risk. DNACPR in place. LPA (health and welfare) status unconfirmed — to be verified with family. Preferred place of care: home.",
      insightMeta: {
        owner: "Dr Patel (GP)",
        referralStatus: "ACP documentation — pending",
        frequency: "Annual review / as needed",
        nextAppt: "Next MDT review — TBC",
      },
      actions: [
        {
          title: "Advance care planning: preferred place of care documentation",
          status: "Pending",
          owner: "Dr Patel (GP)",
          timescale: "Next MDT review",
          service: "Frailty Team",
        },
        {
          title: "Spiritual / pastoral care referral",
          status: "Suggested",
          owner: "Frailty Coordinator",
          timescale: "Within 2 weeks",
          service: "Chaplaincy / Voluntary",
        },
      ],
    },
  ];

  return (
    <div className="flex flex-col min-h-screen bg-[#f0f4f5]">
      {/* Page header card */}
      <div className="px-6 pt-6">
        <div className="bg-white border border-[#d8dde6] -[8px] shadow-sm p-6">
          <h1 className="font-bold text-[24px] text-[#1d1d1d] leading-8">
            Personalised Care Plan
          </h1>
        </div>
      </div>

      {/* Care Plan History & Attachments */}
      <div className="px-6 pt-6">
        <div className="bg-white border border-[#d8dde6] -[8px] shadow-sm overflow-hidden">
          <button
            onClick={() => setHistoryOpen((p) => !p)}
            className="w-full bg-[#f0f4f5] border-b border-[#d8dde6] px-6 py-3 flex items-center gap-2 hover:bg-[#e8eef0] transition-colors text-left"
          >
            <span className="font-bold text-[14px] text-[#1d1d1d] flex-1">
              Care Plan History &amp; Attachments
            </span>
            <span className="text-[#505a5f] text-[14px]">
              {historyOpen ? "▲" : "▼"}
            </span>
          </button>
          {historyOpen && (
            <div className="p-6">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                {[
                  {
                    title: "Personalised Care Plan (Current)",
                    status: "Active",
                    statusCls:
                      "bg-[#00703c] border border-[#00703c] text-white",
                    date: "06 Feb 2026",
                    desc: "Auto-generated from CGA. Pending MDT sign-off.",
                    files: [
                      "CGA_Summary_060226.pdf",
                      "Frailty_Snapshot_060226.pdf",
                    ],
                    border: "border-[#005eb8]",
                  },
                  {
                    title: "Falls Prevention Plan",
                    status: "Completed",
                    statusCls:
                      "bg-[#00703c] border border-[#00703c] text-white",
                    date: "12 Dec 2025",
                    desc: "",
                    files: ["Physio_Report_121225.pdf"],
                    border: "border-[#d8dde6]",
                  },
                  {
                    title: "Social Care Support Plan",
                    status: "Superseded",
                    statusCls:
                      "bg-[#505a5f] border border-[#505a5f] text-white",
                    date: "03 Oct 2025",
                    desc: "Care package increased to 3x/day; carer review requested.",
                    files: [
                      "Social_Care_Review_031025.pdf",
                      "Carer_Assessment_031025.pdf",
                    ],
                    border: "border-[#d8dde6]",
                  },
                  {
                    title: "Mental Health Support Plan",
                    status: "Discharged",
                    statusCls:
                      "bg-[#505a5f] border border-[#505a5f] text-white",
                    date: "15 Dec 2025",
                    desc: "CMHT involvement ended; advice + self-management plan.",
                    files: ["CMHT_Discharge_150725.pdf"],
                    border: "border-[#d8dde6]",
                  },
                ].map((card) => (
                  <div
                    key={card.title}
                    className={`bg-[#f7f9fc] border ${card.border} -[8px] p-4 flex flex-col shadow-sm`}
                  >
                    <div className="flex items-start justify-between gap-2">
                      <span className="font-semibold text-[16px] text-[#1d1d1d] flex-1">
                        {card.title}
                      </span>
                      <span
                        className={`text-[12px] font-bold px-2 py-0.5  shrink-0 ${card.statusCls}`}
                      >
                        {card.status}
                      </span>
                    </div>
                    <p className="text-[12px] text-[#505a5f] mt-2">
                      {card.date}
                    </p>
                    {card.desc && (
                      <p className="text-[13px] text-[#505a5f] mt-1">
                        {card.desc}
                      </p>
                    )}
                    <div className="mt-3 flex flex-col gap-1">
                      <p className="text-[12px] font-semibold text-[#505a5f]">
                        Attachments
                      </p>
                      {card.files.map((f) => (
                        <span
                          key={f}
                          className="text-[12px] text-[#005eb8] underline cursor-pointer"
                        >
                          {f}
                        </span>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Domain panels */}
      <div className="px-6 pt-6 pb-8 flex flex-col gap-4">
        {domains.map((d) => (
          <Cp3ColDomain
            key={d.id}
            {...d}
            open={!!openDomains[d.id]}
            onToggle={toggleDomain}
            carePlanText={carePlanTexts[d.id] ?? ""}
            onCarePlanChange={(text) => updateText(d.id, text)}
            editing={!!editingDomain[d.id]}
            onEditToggle={() => toggleEdit(d.id)}
          />
        ))}
      </div>

      {/* Bottom action bar */}
      <div className="px-6 pb-8">
        <div className="bg-white border border-[#d8dde6] -[8px] shadow-sm px-6 py-5 flex items-center justify-end">
          <div className="flex items-center gap-3">
            <button
              onClick={() => {
                setEditingDomain({});
                setSaved(true);
              }}
              className="bg-[#005eb8] text-white text-[16px] font-bold px-8 py-3 hover:bg-[#004b93] transition-colors"
            >
              {saved ? "Saved" : "Save"}
            </button>
            <button
              onClick={() => onNavigate("snapshot")}
              className="bg-[#00703c] text-white text-[16px] font-bold px-8 py-3 -[4px] hover:bg-[#005a30] transition-colors"
            >
              Return to Snapshot
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

// ── Root ──────────────────────────────────────────────────────────────────────

export default function App() {
  const [page, setPage] = useState<Page>("snapshot");

  return (
    <div
      className="min-w-[1280px] bg-[#f0f4f5] text-[#1d1d1d]"
      style={{ fontFamily: "Inter, sans-serif" }}
    >
      <TopNav />
      <PageTabs active={page} onNavigate={setPage} />
      {page === "snapshot" && <SnapshotPage onNavigate={setPage} />}
      {page === "cga-assessment" && <CgaAssessmentPage onNavigate={setPage} />}
      {page === "care-plan" && <CarePlanPage onNavigate={setPage} />}
    </div>
  );
}
