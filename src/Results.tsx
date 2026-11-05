import { useState } from "react";
import { Link } from "react-router-dom";

const assetPathPrefix = "/assets";
const imgImageNhs = `${assetPathPrefix}/1b6bd.png`;
const imgIcon = `${assetPathPrefix}/146f3.svg`;
const imgIcon1 = `${assetPathPrefix}/efb42.svg`;
const imgIcon2 = `${assetPathPrefix}/048a9.svg`;
const imgIcon3 = `${assetPathPrefix}/ac60c.svg`;
const imgIcon4 = `${assetPathPrefix}/6e3c2.svg`; // alert icon (red)
const imgIcon5 = `${assetPathPrefix}/84d1f.svg`; // abnormal icon (red dot)
const imgIcon6 = `${assetPathPrefix}/6d174.svg`; // borderline icon (amber dot)
const imgIcon7 = `${assetPathPrefix}/7c3ff.svg`; // chevron / expand
const imgIcon8 = `${assetPathPrefix}/4240d.svg`; // haematology icon
const imgIcon9 = `${assetPathPrefix}/2ac3c.svg`; // normal green dot
const imgIcon10 = `${assetPathPrefix}/10b8f.svg`; // infection icon
const imgIcon11 = `${assetPathPrefix}/52660.svg`; // metabolic / endocrine icon
const imgIcon12 = `${assetPathPrefix}/31c2f.svg`; // antenatal screening icon
const imgIcon13 = `${assetPathPrefix}/9907c.svg`; // abnormal badge icon (red x)
const imgIcon14 = `${assetPathPrefix}/7e623.svg`; // abnormal urine icon
const imgIcon15 = `${assetPathPrefix}/68f64.svg`; // imaging icon
const imgIcon16 = `${assetPathPrefix}/be456.svg`; // awaiting icon (blue clock)
const imgIcon17 = `${assetPathPrefix}/47f63.svg`; // cervical screening icon
const imgIcon18 = `${assetPathPrefix}/e948c.svg`; // awaiting results header icon
const imgIcon19 = `${assetPathPrefix}/91418.svg`; // hide icon
const imgIcon20 = `${assetPathPrefix}/e7bd3.svg`; // BadgerNet
const imgIcon21 = `${assetPathPrefix}/a2f04.svg`; // Primary record system btn
const imgIcon22 = `${assetPathPrefix}/da479.svg`; // GP record
const imgIcon23 = `${assetPathPrefix}/a0df7.svg`; // Connected btn
const imgIcon24 = `${assetPathPrefix}/afc57.svg`; // Lab results
const imgIcon25 = `${assetPathPrefix}/8e8d6.svg`; // Diabetes service
const imgIcon26 = `${assetPathPrefix}/ecba4.svg`; // Perinatal mental health
const imgIcon27 = `${assetPathPrefix}/525a9.svg`; // Ultrasound dept
const imgIcon28 = `${assetPathPrefix}/323d1.svg`; // Interpreter booking
const imgIcon29 = `${assetPathPrefix}/d55a1.svg`; // Social support
const imgIcon30 = `${assetPathPrefix}/eeb13.svg`; // Partially connected btn

function Chevron({ open }: { open: boolean }) {
  return (
    <svg
      width="14"
      height="14"
      viewBox="0 0 14 14"
      fill="none"
      className={`transition-transform duration-200 shrink-0 ${open ? "rotate-0" : "-rotate-90"}`}
    >
      <path
        d="M2.5 5L7 9.5L11.5 5"
        stroke="#3d5166"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function SectionCard({
  icon,
  icon2,
  title,
  badge,
  count,
  open,
  onToggle,
  bg = "bg-[#f5f7fa]",
  children,
}: {
  icon: string;
  icon2?: string;
  title: string;
  badge?: React.ReactNode;
  count?: string;
  open: boolean;
  onToggle: () => void;
  bg?: string;
  children: React.ReactNode;
}) {
  return (
    <div className="bg-white border border-[#d5dce0] w-full">
      <button
        data-section-toggle
        aria-expanded={open}
        onClick={onToggle}
        className={`w-full ${bg} border-b border-[#d5dce0] flex gap-2 items-center px-4 py-3 text-left`}
      >
        <img
          alt=""
          className="size-[14px] block shrink-0"
          src={imgIcon7}
          style={{
            transform: open ? "none" : "rotate(-90deg)",
            transition: "transform 0.2s",
          }}
        />
        {icon2 && (
          <img alt="" className="size-[14px] block shrink-0" src={icon2} />
        )}
        <p className="font-bold text-[#1d3557] text-[13px] flex-1">{title}</p>
        {count && <p className="text-[#4a6a85] text-[12px]">{count}</p>}
        {badge}
      </button>
      {open && children}
    </div>
  );
}

function ResultsTable({
  groups,
}: {
  groups: {
    label?: string;
    rows: {
      test: string;
      result: string;
      refRange: string;
      status: "Normal" | "Abnormal" | "Borderline";
      provenance?: string;
    }[];
  }[];
}) {
  return (
    <div className="px-4 py-3 w-full">
      {/* Header */}
      <div className="bg-[#f5f7fa] border-b border-[#d5dce0] flex px-4 py-2">
        <p className="font-semibold text-[#3d5166] text-[12px] flex-1">Test</p>
        <p className="font-semibold text-[#3d5166] text-[12px] w-36">Result</p>
        <p className="font-semibold text-[#3d5166] text-[12px] w-40">
          Ref range
        </p>
        <p className="font-semibold text-[#3d5166] text-[12px] w-36">Status</p>
        <p className="font-medium text-[#8a9baa] text-[11px] w-24 text-right">
          Provenance ↓
        </p>
      </div>
      {groups.map((g) => (
        <div key={g.label ?? "default"}>
          {g.label && (
            <div className="bg-[#edf2f5] px-4 py-1.5 mt-0">
              <p className="font-semibold text-[#3d5166] text-[11px] tracking-[0.33px] uppercase">
                {g.label}
              </p>
            </div>
          )}
          {g.rows.map((r) => (
            <div
              key={r.test}
              className="flex items-center border-b border-[#edf0f2] px-4 py-2.5 last:border-b-0"
            >
              <p className="font-medium text-[#1d3557] text-[13px] flex-1">
                {r.test}
              </p>
              <p className="font-semibold text-[#1d3557] text-[13px] w-36">
                {r.result}
              </p>
              <p className="text-[#4a6a85] text-[12px] w-40">{r.refRange}</p>
              <div className="flex gap-1 items-center w-36">
                <img
                  alt=""
                  className="size-[10px] block shrink-0"
                  src={imgIcon9}
                />
                <p className="font-semibold text-[#2d7a3e] text-[11px]">
                  {r.status}
                </p>
              </div>
              <p className="text-[#9ba8b5] text-[11px] w-24 text-right">▼</p>
            </div>
          ))}
        </div>
      ))}
    </div>
  );
}

function ScanCard({
  title,
  status,
  date,
  gestation,
  centre,
  reporter,
  findings,
  measurements,
  bg = "bg-white",
  headerBg = "bg-[#f5f7fa]",
  dept,
}: {
  title: string;
  status?: React.ReactNode;
  date: string;
  gestation: string;
  centre: string;
  reporter: string;
  findings: string;
  measurements?: string[];
  bg?: string;
  headerBg?: string;
  dept?: string;
}) {
  return (
    <div
      className={`${bg} border border-[#d5dce0] w-full`}
      style={{ borderColor: bg === "bg-[#f5faff]" ? "#b8d4ea" : undefined }}
    >
      <div
        className={`${headerBg} flex gap-3 items-center px-4 py-2.5`}
        style={{
          backgroundColor: headerBg === "bg-[#e8f4fd]" ? "#e8f4fd" : undefined,
        }}
      >
        <p className="font-bold text-[#1d3557] text-[13px] flex-1">{title}</p>
        {status}
        {dept && <p className="text-[#4a6a85] text-[12px]">{dept}</p>}
      </div>
      <div className="px-4 py-3">
        <div className="grid grid-cols-4 gap-6 border-b border-[#edf0f2] pb-2">
          {[
            ["Date", date],
            ["Gestation at scan", gestation],
            ["Centre", centre],
            ["Reporter", reporter],
          ].map(([label, val]) => (
            <div key={label}>
              <p className="font-semibold text-[#3d5166] text-[12px]">
                {label}
              </p>
              <p className="text-[#1d3557] text-[13px] pt-0.5">{val}</p>
            </div>
          ))}
        </div>
        <p className="text-[12px] pt-2">
          <span className="font-semibold text-[#3d5166]">Findings: </span>
          <span className="text-[#1d3557] text-[13px]">{findings}</span>
        </p>
        {measurements && measurements.length > 0 && (
          <div className="flex gap-1.5 pt-2">
            {measurements.map((m) => (
              <div
                key={m}
                className="bg-[#e8f4fd] border border-[#b8d4ea] px-2 py-0.5 rounded"
              >
                <p className="font-semibold text-[#005eb8] text-[11px]">{m}</p>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default function Results() {
  const [haematologyOpen, setHaematologyOpen] = useState(false);
  const [infectionOpen, setInfectionOpen] = useState(false);
  const [metabolicOpen, setMetabolicOpen] = useState(false);
  const [antenatalOpen, setAntenatalOpen] = useState(false);
  const [urinalysisOpen, setUrinalysisOpen] = useState(false);
  const [imagingOpen, setImagingOpen] = useState(false);
  const [cervicalOpen, setCervicalOpen] = useState(false);
  const [awaitingOpen, setAwaitingOpen] = useState(false);
  const [connectedOpen, setConnectedOpen] = useState(false);

  return (
    <div className="ncrs-app bg-[#f0f4f5] min-h-screen w-full flex flex-col">
      {/* NHS Header */}
      <div className="ncrs-header bg-[#005eb8] w-full shrink-0">
        <div className="flex items-center justify-between w-full max-w-[1440px] mx-auto px-6 py-2">
          <div className="flex gap-3 items-center">
            <div className="h-[38px] w-[93.711px] relative shrink-0">
              <img
                alt=""
                className="absolute inset-0 max-w-none object-contain pointer-events-none size-full"
                src={imgImageNhs}
              />
            </div>
            <p className="font-semibold leading-[21px] text-[14px] text-white tracking-[-0.35px] whitespace-nowrap">
              National Care Records Service
            </p>
          </div>
          <div className="flex gap-3 items-center">
            <div className="bg-[#004a94] border border-[rgba(255,255,255,0.2)] flex gap-1.5 items-center px-2.5 py-1.5 rounded">
              <p className="text-[12px] text-[rgba(255,255,255,0.7)] whitespace-nowrap">
                User
              </p>
              <p className="font-semibold text-[12px] text-white whitespace-nowrap">
                Amrita Kaur Dr
              </p>
              <div className="size-3 relative shrink-0">
                <img
                  alt=""
                  className="absolute block inset-0 max-w-none size-full"
                  src={imgIcon}
                />
              </div>
            </div>
            <div className="bg-[#004a94] border border-[rgba(255,255,255,0.2)] flex gap-1.5 items-center px-2.5 py-1.5 rounded">
              <p className="text-[12px] text-[rgba(255,255,255,0.7)] whitespace-nowrap">
                Role
              </p>
              <p className="font-semibold text-[12px] text-white whitespace-nowrap">
                R0260 - General Medical Practitioner
              </p>
              <div className="size-3 relative shrink-0">
                <img
                  alt=""
                  className="absolute block inset-0 max-w-none size-full"
                  src={imgIcon}
                />
              </div>
            </div>
          </div>
        </div>
        <div className="flex items-center justify-end w-full max-w-[1440px] mx-auto px-6 h-[29px]">
          {["Find patient", "Change role"].map((t) => (
            <div
              key={t}
              className="border-[#e5e7eb] border-r flex items-center px-3 py-1.5"
            >
              <p className="text-[11px] text-[rgba(255,255,255,0.8)]">{t}</p>
            </div>
          ))}
          <div className="border-[#e5e7eb] border-r flex gap-1 items-center px-3 py-1.5">
            <div className="size-[11px] relative shrink-0">
              <img
                alt=""
                className="absolute block inset-0 max-w-none size-full"
                src={imgIcon1}
              />
            </div>
            <p className="text-[11px] text-[rgba(255,255,255,0.8)]">
              What's new
            </p>
          </div>
          <div className="border-[#e5e7eb] border-r flex items-center px-3 py-1.5">
            <p className="text-[11px] text-[rgba(255,255,255,0.8)]">
              Give feedback
            </p>
          </div>
          <div className="border-[#e5e7eb] border-r flex gap-1 items-center px-3 py-1.5">
            <div className="size-[11px] relative shrink-0">
              <img
                alt=""
                className="absolute block inset-0 max-w-none size-full"
                src={imgIcon2}
              />
            </div>
            <p className="text-[11px] text-[rgba(255,255,255,0.8)]">Settings</p>
          </div>
          <div className="flex items-center px-3 py-1.5">
            <p className="text-[11px] text-[rgba(255,255,255,0.8)]">Log out</p>
          </div>
        </div>
      </div>

      {/* Patient bar */}
      <div className="ncrs-patient bg-[#d5e8f5] border-[#b0cfe8] border-b w-full shrink-0">
        <div className="flex items-center w-full max-w-[1440px] mx-auto px-6 py-2 gap-4">
          <p className="font-bold text-[#1a1a1a] text-[15px] whitespace-nowrap">
            Leila KHAN
          </p>
          <p className="text-[#8ab0c8] text-[16px]">|</p>
          <p className="text-[#1a1a1a] text-[13px]">Female, 28 years</p>
          <p className="text-[#8ab0c8] text-[16px]">|</p>
          <p className="text-[#1a1a1a] text-[13px]">14 June 1995</p>
          <p className="text-[#8ab0c8] text-[16px]">|</p>
          <div className="flex gap-1.5 items-center">
            <p className="font-semibold text-[#1a1a1a] text-[11px] tracking-[0.275px] uppercase">
              NHS number:
            </p>
            <p className="font-medium text-[#1a1a1a] text-[13px]">
              485 777 2910
            </p>
            <div className="size-3 relative shrink-0">
              <img
                alt=""
                className="absolute block inset-0 max-w-none size-full"
                src={imgIcon3}
              />
            </div>
          </div>
          <p className="text-[#8ab0c8] text-[16px]">|</p>
          <p className="text-[#1a1a1a] text-[13px]">
            14 Ryelands Crescent, Lancaster, LA1 3PQ
          </p>
        </div>
      </div>

      {/* Tab nav */}
      <div className="ncrs-tabs bg-white border-[#d5dce0] border-b w-full shrink-0 overflow-hidden">
        <div className="flex items-end w-full max-w-[1440px] mx-auto px-6">
          <Link
            to="/"
            className="flex flex-col items-center justify-center px-4 py-2.5 no-underline"
          >
            <p className="text-[#3d5166] text-[13px] whitespace-nowrap">
              Summary
            </p>
          </Link>
          <Link
            to="/pregnancy"
            className="flex flex-col items-center justify-center px-4 py-2.5 no-underline"
          >
            <p className="text-[#3d5166] text-[13px] whitespace-nowrap">
              Pregnancy
            </p>
          </Link>
          <Link
            to="/appointments"
            className="flex flex-col items-center justify-center px-4 py-2.5 no-underline"
          >
            <p className="text-[#3d5166] text-[13px] whitespace-nowrap">
              Appointments
            </p>
          </Link>
          <div className="flex flex-col items-center justify-center px-4 py-2.5 relative">
            <p className="font-bold text-[#003087] text-[13px] whitespace-nowrap">
              Results
            </p>
            <div className="absolute bg-[#005eb8] h-[3px] left-0 rounded-tl-[2px] rounded-tr-[2px] bottom-0 w-full" />
          </div>
          <Link
            to="/comorbidities"
            className="flex flex-col items-center justify-center px-4 py-2.5 no-underline"
          >
            <p className="text-[#3d5166] text-[13px] whitespace-nowrap">
              Comorbidities
            </p>
          </Link>
          <Link
            to="/care-plans"
            className="flex flex-col items-center justify-center px-4 py-2.5 no-underline"
          >
            <p className="text-[#3d5166] text-[13px] whitespace-nowrap">
              Care plans
            </p>
          </Link>
          <Link
            to="/documents"
            className="flex flex-col items-center justify-center px-4 py-2.5 no-underline"
          >
            <p className="text-[#3d5166] text-[13px] whitespace-nowrap">
              Documents
            </p>
          </Link>
        </div>
      </div>

      {/* Main content */}
      <div className="ncrs-main flex-1 p-6 overflow-auto">
        <h1 className="record-page-title">Results</h1>
        <div className="flex flex-col gap-4 max-w-[1440px] w-full mx-auto">
          {/* Filter bar */}
          <div className="border-b border-[#d5dce0] flex gap-2 items-center pb-3">
            <p className="font-semibold text-[#3d5166] text-[12px] mr-1">
              Show results:
            </p>
            <div className="bg-[#1d3557] border border-[#1d3557] flex items-center px-3 py-1.5 rounded cursor-pointer">
              <p className="font-medium text-[12px] text-white">All results</p>
            </div>
            <div className="bg-white border border-[#d5dce0] flex gap-1.5 items-center px-3 py-1.5 rounded cursor-pointer">
              <p className="font-medium text-[#1d3557] text-[12px]">
                Abnormal and borderline
              </p>
              <div className="bg-[#da291c] flex items-center px-1.5 py-0.5 rounded-full">
                <p className="font-bold text-[11px] text-white">4</p>
              </div>
            </div>
            <div className="bg-white border border-[#d5dce0] flex gap-1.5 items-center px-3 py-1.5 rounded cursor-pointer">
              <p className="font-medium text-[#1d3557] text-[12px]">
                Awaiting results
              </p>
              <div className="bg-[#005eb8] flex items-center px-1.5 py-0.5 rounded-full">
                <p className="font-bold text-[11px] text-white">4</p>
              </div>
            </div>
          </div>

          {/* Results requiring attention panel */}
          <div className="bg-white border-2 border-[#da291c] w-full">
            <div className="bg-[#da291c] flex gap-2 items-center px-4 py-2.5">
              <div className="size-[15px] relative shrink-0">
                <img
                  alt=""
                  className="absolute block inset-0 max-w-none size-full"
                  src={imgIcon4}
                />
              </div>
              <p className="font-bold text-[13px] text-white flex-1">
                Results requiring attention
              </p>
              <p className="text-[12px] text-white opacity-90">
                2 abnormal · 2 borderline
              </p>
            </div>
            <div className="flex flex-col gap-1.5 p-3">
              {[
                {
                  icon: imgIcon5,
                  name: "Fasting glucose from oral glucose tolerance test",
                  value: "5.6 mmol/L (reference range below 5.1)",
                  date: "5 September 2026",
                  note: "Gestational diabetes mellitus confirmed. Referred to the Diabetes Antenatal Clinic.",
                  bg: "bg-[#fef5f5]",
                  border: "border-[#da291c]",
                },
                {
                  icon: imgIcon5,
                  name: "2-hour glucose from oral glucose tolerance test",
                  value: "8.7 mmol/L (reference range below 7.8)",
                  date: "5 September 2026",
                  note: "Glucose monitoring started 4 times a day.",
                  bg: "bg-[#fef5f5]",
                  border: "border-[#da291c]",
                },
                {
                  icon: imgIcon6,
                  name: "HbA1c",
                  value: "41 mmol/mol (ref < 42)",
                  date: "5 September 2026",
                  note: "Borderline elevated. Continue monitoring via diabetes clinic.",
                  bg: "bg-[#fffbf0]",
                  border: "border-[#e8a917]",
                },
                {
                  icon: imgIcon6,
                  name: "Urine dipstick glucose",
                  value: "+1 (12 September 2026)",
                  date: "12 September 2026",
                  note: "Consistent with gestational diabetes mellitus. Continue glucose monitoring.",
                  bg: "bg-[#fffbf0]",
                  border: "border-[#e8a917]",
                },
              ].map((item) => (
                <div
                  key={item.name}
                  className={`${item.bg} border ${item.border} flex gap-4 items-center px-3 py-2.5`}
                >
                  <div className="flex gap-2 items-center flex-1 min-w-0">
                    <div className="size-[13px] relative shrink-0">
                      <img
                        alt=""
                        className="absolute block inset-0 max-w-none size-full"
                        src={item.icon}
                      />
                    </div>
                    <p className="font-bold text-[#1d3557] text-[13px] whitespace-nowrap">
                      {item.name}
                    </p>
                    <p className="text-[#3d5166] text-[12px] whitespace-nowrap">
                      {item.value}
                    </p>
                  </div>
                  <p className="text-[#4a6a85] text-[12px] whitespace-nowrap">
                    {item.date}
                  </p>
                  <p className="font-medium text-[#1d3557] text-[12px] text-right flex-1">
                    {item.note}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Haematology */}
          <SectionCard
            icon={imgIcon7}
            icon2={imgIcon8}
            title="Haematology"
            open={haematologyOpen}
            onToggle={() => setHaematologyOpen((o) => !o)}
          >
            <ResultsTable
              groups={[
                {
                  label: "Full Blood Count",
                  rows: [
                    {
                      test: "Haemoglobin (Hb)",
                      result: "122 g/L",
                      refRange: "115–160 g/L",
                      status: "Normal",
                    },
                    {
                      test: "MCV",
                      result: "88 fL",
                      refRange: "80–100 fL",
                      status: "Normal",
                    },
                    {
                      test: "Platelets (Plt)",
                      result: "262 × 10⁹/L",
                      refRange: "150–400 × 10⁹/L",
                      status: "Normal",
                    },
                    {
                      test: "White Cell Count (WCC)",
                      result: "7.8 × 10⁹/L",
                      refRange: "4.0–11.0 × 10⁹/L",
                      status: "Normal",
                    },
                  ],
                },
                {
                  label: "Blood group and antibody screen",
                  rows: [
                    {
                      test: "ABO Group",
                      result: "A",
                      refRange: "—",
                      status: "Normal",
                    },
                    {
                      test: "Rh Factor",
                      result: "Positive (D+)",
                      refRange: "—",
                      status: "Normal",
                    },
                    {
                      test: "Irregular Antibodies",
                      result: "Not detected",
                      refRange: "Not detected",
                      status: "Normal",
                    },
                  ],
                },
                {
                  label: "Haemoglobinopathy Screening",
                  rows: [
                    {
                      test: "Sickle Cell Screen",
                      result: "Negative (AA)",
                      refRange: "Negative",
                      status: "Normal",
                    },
                    {
                      test: "Thalassaemia Carrier Status",
                      result: "Low risk (MCH >27 pg)",
                      refRange: "Low risk",
                      status: "Normal",
                    },
                  ],
                },
              ]}
            />
          </SectionCard>

          {/* Infection screen */}
          <SectionCard
            icon={imgIcon7}
            icon2={imgIcon10}
            title="Infection screen"
            open={infectionOpen}
            onToggle={() => setInfectionOpen((o) => !o)}
          >
            <ResultsTable
              groups={[
                {
                  label: "Infectious Screening",
                  rows: [
                    {
                      test: "Rubella Immune Status",
                      result: "Immune",
                      refRange: "Immune",
                      status: "Normal",
                    },
                    {
                      test: "Syphilis Serology",
                      result: "Negative",
                      refRange: "Negative",
                      status: "Normal",
                    },
                    {
                      test: "HIV Status",
                      result: "Negative",
                      refRange: "Negative",
                      status: "Normal",
                    },
                    {
                      test: "Hepatitis B Surface Antigen",
                      result: "Negative",
                      refRange: "Negative",
                      status: "Normal",
                    },
                    {
                      test: "Hepatitis C Antibody",
                      result: "Negative",
                      refRange: "Negative",
                      status: "Normal",
                    },
                  ],
                },
              ]}
            />
          </SectionCard>

          {/* Metabolic and endocrine */}
          <SectionCard
            icon={imgIcon7}
            icon2={imgIcon11}
            title="Metabolic and endocrine"
            open={metabolicOpen}
            onToggle={() => setMetabolicOpen((o) => !o)}
          >
            <ResultsTable
              groups={[
                {
                  label: "Thyroid Function",
                  rows: [
                    {
                      test: "TSH",
                      result: "1.8 mIU/L",
                      refRange: "0.3–4.2 mIU/L",
                      status: "Normal",
                    },
                  ],
                },
              ]}
            />
          </SectionCard>

          {/* Antenatal screening */}
          <SectionCard
            icon={imgIcon7}
            icon2={imgIcon12}
            title="Antenatal screening"
            count="5 tests"
            badge={
              <div className="bg-[#da291c] flex items-center px-2 py-0.5 rounded">
                <p className="font-bold text-[11px] text-white">Attention</p>
              </div>
            }
            open={antenatalOpen}
            onToggle={() => setAntenatalOpen((o) => !o)}
            bg="bg-[#fff8f8]"
          >
            <div className="flex flex-col gap-2 px-4 py-3">
              {[
                {
                  name: "Combined first trimester screening",
                  statusLabel: "Normal",
                  statusColor: "text-[#2d7a3e]",
                  detail: "T21: 1:5400 · T18: 1:12000 · T13: < 1:20000",
                  date: "2 August 2026",
                  result: "Low risk",
                  source: "Screening Service",
                  bg: "bg-[#f8f9fa]",
                  border: "border-[#e8ecef]",
                },
                {
                  name: "NIPT (cfDNA)",
                  statusLabel: "Normal",
                  statusColor: "text-[#2d7a3e]",
                  detail: "Not requested — combined screening low risk",
                  date: "—",
                  result: "Not performed",
                  source: "—",
                  bg: "bg-[#f8f9fa]",
                  border: "border-[#e8ecef]",
                },
                {
                  name: "Quadruple test",
                  statusLabel: "Normal",
                  statusColor: "text-[#2d7a3e]",
                  detail: "Not applicable — combined screening completed",
                  date: "—",
                  result: "Not performed",
                  source: "—",
                  bg: "bg-[#f8f9fa]",
                  border: "border-[#e8ecef]",
                },
              ].map((item) => (
                <div
                  key={item.name}
                  className={`${item.bg} border ${item.border} flex gap-4 items-start p-3`}
                >
                  <div className="flex-1 min-w-0">
                    <div className="flex gap-2 items-center">
                      <p className="font-bold text-[#1d3557] text-[13px]">
                        {item.name}
                      </p>
                      <div className="flex gap-1 items-center">
                        <img
                          alt=""
                          className="size-[10px] block shrink-0"
                          src={imgIcon9}
                        />
                        <p
                          className={`font-semibold text-[11px] ${item.statusColor}`}
                        >
                          {item.statusLabel}
                        </p>
                      </div>
                    </div>
                    <p className="text-[#3d5166] text-[12px] pt-1">
                      {item.detail}
                    </p>
                  </div>
                  <div className="flex gap-3 items-center shrink-0 text-right">
                    <p className="text-[#4a6a85] text-[12px]">{item.date}</p>
                    <p className="font-semibold text-[#1d3557] text-[12px]">
                      {item.result}
                    </p>
                    <p className="text-[#4a6a85] text-[12px]">{item.source}</p>
                  </div>
                </div>
              ))}
              {/* GTT - Abnormal */}
              <div className="bg-[#fef5f5] border border-[#da291c] flex gap-4 items-start p-3">
                <div className="flex-1 min-w-0">
                  <div className="flex gap-2 items-center">
                    <p className="font-bold text-[#1d3557] text-[13px]">
                      Oral glucose tolerance test (75 g)
                    </p>
                    <div className="bg-[#da291c] flex gap-1 items-center px-1.5 py-0.5 rounded">
                      <div className="size-[10px] relative shrink-0">
                        <img
                          alt=""
                          className="absolute block inset-0 max-w-none size-full"
                          src={imgIcon13}
                        />
                      </div>
                      <p className="font-bold text-[11px] text-white">
                        Abnormal
                      </p>
                    </div>
                  </div>
                  <p className="text-[#3d5166] text-[12px] pt-1">
                    Fasting 5.6 mmol/L (ref &lt; 5.1) · 2h 8.7 mmol/L (ref &lt;
                    7.8). gestational diabetes mellitus confirmed.
                  </p>
                </div>
                <div className="flex gap-3 items-center shrink-0 text-right">
                  <p className="text-[#4a6a85] text-[12px]">5 September 2026</p>
                  <p className="font-semibold text-[#da291c] text-[12px]">
                    Abnormal
                  </p>
                  <p className="text-[#4a6a85] text-[12px]">
                    UHMB Biochemistry
                  </p>
                </div>
              </div>
              {/* Group B Strep */}
              <div className="bg-[#f8f9fa] border border-[#e8ecef] flex gap-4 items-start p-3">
                <div className="flex-1 min-w-0">
                  <div className="flex gap-2 items-center">
                    <p className="font-bold text-[#1d3557] text-[13px]">
                      Group B Strep (GBS)
                    </p>
                    <div className="flex gap-1 items-center">
                      <img
                        alt=""
                        className="size-[10px] block shrink-0"
                        src={imgIcon9}
                      />
                      <p className="font-semibold text-[#2d7a3e] text-[11px]">
                        Normal
                      </p>
                    </div>
                  </div>
                  <p className="text-[#3d5166] text-[12px] pt-1">
                    Patient declined GBS screening
                  </p>
                </div>
                <div className="flex gap-3 items-center shrink-0">
                  <p className="text-[#4a6a85] text-[12px]">—</p>
                  <p className="font-semibold text-[#4a6a85] text-[12px]">
                    Declined
                  </p>
                  <p className="text-[#4a6a85] text-[12px]">
                    BadgerNet Maternity
                  </p>
                </div>
              </div>
            </div>
          </SectionCard>

          {/* Urinalysis */}
          <SectionCard
            icon={imgIcon7}
            icon2={imgIcon11}
            title="Urinalysis"
            count="3 dipstick entries"
            open={urinalysisOpen}
            onToggle={() => setUrinalysisOpen((o) => !o)}
          >
            <div className="px-4 py-3 flex flex-col gap-4">
              {/* Urine culture */}
              <div>
                <p className="font-bold text-[#3d5166] text-[12px] mb-1.5">
                  Urine culture
                </p>
                <div className="bg-[#f8f9fa] border border-[#e8ecef] flex gap-3 items-center px-3 py-2">
                  <p className="font-medium text-[#1d3557] text-[13px] flex-1">
                    No growth
                  </p>
                  <p className="text-[#4a6a85] text-[12px]">15 August 2026</p>
                </div>
              </div>
              {/* Dipstick history */}
              <div>
                <p className="font-bold text-[#3d5166] text-[12px] mb-1.5">
                  Dipstick history
                </p>
                <div className="bg-[#f5f7fa] border-b border-[#d5dce0] flex px-2 py-2 text-[12px] font-semibold text-[#3d5166]">
                  <p className="w-28">Date</p>
                  <p className="w-20">Protein</p>
                  <p className="w-20">Glucose</p>
                  <p className="w-24">Leucocytes</p>
                  <p className="w-20">Nitrites</p>
                  <p className="flex-1 text-[#5a7a94]">Clinician</p>
                  <p className="text-[#5a7a94]">Lab</p>
                </div>
                {[
                  {
                    date: "15 August 2026",
                    protein: "Neg",
                    glucose: "Neg",
                    leuco: "Neg",
                    nitrites: "Neg",
                    clinician: "Midwife J. Davies",
                    lab: "",
                  },
                  {
                    date: "5 September 2026",
                    protein: "Neg",
                    glucose: "Trace⚠",
                    leuco: "Neg",
                    nitrites: "Neg",
                    clinician: "Phlebotomy Team",
                    lab: "",
                  },
                  {
                    date: "12 September 2026",
                    protein: "Neg",
                    glucose: "+1⚠",
                    leuco: "Neg",
                    nitrites: "Neg",
                    clinician: "Dr James Chen",
                    lab: "",
                  },
                ].map((row) => (
                  <div
                    key={row.date}
                    className="flex items-center border-b border-[#edf0f2] px-2 py-2.5 last:border-b-0"
                  >
                    <p className="text-[#3d5166] text-[13px] w-28">
                      {row.date}
                    </p>
                    <p className="font-medium text-[#1d3557] text-[13px] w-20">
                      {row.protein}
                    </p>
                    <p
                      className={`font-medium text-[13px] w-20 ${row.glucose.includes("⚠") ? "text-[#da291c]" : "text-[#1d3557]"}`}
                    >
                      {row.glucose.replace("⚠", "")}
                    </p>
                    <p className="font-medium text-[#1d3557] text-[13px] w-24">
                      {row.leuco}
                    </p>
                    <p className="font-medium text-[#1d3557] text-[13px] w-20">
                      {row.nitrites}
                    </p>
                    <p className="text-[#4a6a85] text-[13px] flex-1">
                      {row.clinician}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </SectionCard>

          {/* Imaging */}
          <SectionCard
            icon={imgIcon7}
            icon2={imgIcon15}
            title="Imaging"
            count="4 scans"
            open={imagingOpen}
            onToggle={() => setImagingOpen((o) => !o)}
          >
            <div className="px-4 py-3 flex flex-col gap-3">
              <ScanCard
                title="Dating scan"
                dept="Ultrasound department"
                date="2 August 2026"
                gestation="9 weeks and 0 days"
                centre="UHMB Ultrasound department"
                reporter="Sonographer K. Patel"
                findings="Single intrauterine pregnancy. CRL consistent with dates. FH seen."
                measurements={["CRL: 23.4 mm"]}
              />
              <ScanCard
                title="Nuchal translucency"
                dept="Screening Service"
                date="2 August 2026"
                gestation="12 weeks and 4 days"
                centre="UHMB Ultrasound department"
                reporter="Sonographer K. Patel"
                findings="NT measurement within normal limits. Nasal bone present."
                measurements={["CRL: 61 mm", "NT: 1.5 mm"]}
              />
              <ScanCard
                title="Anomaly scan (20w)"
                bg="bg-[#f5faff]"
                headerBg="bg-[#e8f4fd]"
                dept="Ultrasound department"
                status={
                  <div className="bg-white border border-[#b8d4ea] flex gap-1 items-center px-2 py-0.5 rounded">
                    <div className="size-[10px] relative shrink-0">
                      <img
                        alt=""
                        className="absolute block inset-0 max-w-none size-full"
                        src={imgIcon16}
                      />
                    </div>
                    <p className="font-semibold text-[#005eb8] text-[11px]">
                      Awaiting
                    </p>
                  </div>
                }
                date="2 September 2026"
                gestation="20 weeks and 1 day"
                centre="UHMB Ultrasound department"
                reporter="Sonographer K. Patel"
                findings="Booked — awaiting"
              />
              <ScanCard
                title="Growth scan (28w)"
                bg="bg-[#f5faff]"
                headerBg="bg-[#e8f4fd]"
                dept="Ultrasound department"
                status={
                  <div className="bg-white border border-[#b8d4ea] flex gap-1 items-center px-2 py-0.5 rounded">
                    <div className="size-[10px] relative shrink-0">
                      <img
                        alt=""
                        className="absolute block inset-0 max-w-none size-full"
                        src={imgIcon16}
                      />
                    </div>
                    <p className="font-semibold text-[#005eb8] text-[11px]">
                      Awaiting
                    </p>
                  </div>
                }
                date="25 September 2026"
                gestation="28 weeks and 0 days"
                centre="UHMB Ultrasound department"
                reporter="Sonographer M. Hussain"
                findings="Scheduled (gestational diabetes mellitus pathway)"
              />
            </div>
          </SectionCard>

          {/* Cervical screening */}
          <SectionCard
            icon={imgIcon7}
            icon2={imgIcon17}
            title="Cervical screening"
            open={cervicalOpen}
            onToggle={() => setCervicalOpen((o) => !o)}
          >
            <div className="px-4 py-3">
              <div className="grid grid-cols-2 gap-6">
                {[
                  {
                    label: "Most recent smear",
                    value: "Normal (negative cytology) (22 June 2024)",
                    source: "GP record",
                  },
                  {
                    label: "HPV status",
                    value: "HPV not detected",
                    source: "GP record",
                  },
                  {
                    label: "Colposcopy referral",
                    value: "Not referred",
                    source: "GP record",
                  },
                ].map((item) => (
                  <div
                    key={item.label}
                    className="border-b border-[#edf0f2] py-2 flex gap-4 items-start"
                  >
                    <div className="flex-1 min-w-0">
                      <p className="font-semibold text-[#3d5166] text-[12px]">
                        {item.label}
                      </p>
                      <p className="text-[#1d3557] text-[13px] pt-0.5">
                        {item.value}
                      </p>
                    </div>
                    <p className="text-[#4a6a85] text-[12px] shrink-0 pt-0.5">
                      {item.source}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </SectionCard>

          {/* Awaiting results */}
          <div className="bg-white border border-[#d5dce0] w-full">
            <button
              data-section-toggle
              aria-expanded={awaitingOpen}
              onClick={() => setAwaitingOpen((o) => !o)}
              className="w-full bg-[#e8f4fd] border-b border-[#b0d4f1] flex gap-2 items-center px-4 py-3 text-left"
            >
              <div className="size-[14px] relative shrink-0">
                <img
                  alt=""
                  className="absolute block inset-0 max-w-none size-full"
                  style={{
                    transform: awaitingOpen ? "none" : "rotate(-90deg)",
                    transition: "transform 0.2s",
                  }}
                  src={imgIcon18}
                />
              </div>
              <p className="font-semibold text-[#1d3557] text-[13px] flex-1">
                Awaiting results (4)
              </p>
            </button>
            {awaitingOpen && (
              <div>
                <div className="bg-[#f0f8ff] border-b border-[#d5dce0] flex px-4 py-2">
                  <p className="font-semibold text-[#3d5166] text-[12px] flex-1">
                    Test
                  </p>
                  <p className="font-semibold text-[#3d5166] text-[12px] w-28">
                    Due date
                  </p>
                  <p className="font-semibold text-[#5a7a94] text-[12px] w-32">
                    Date requested
                  </p>
                  <p className="font-semibold text-[#5a7a94] text-[12px] w-40">
                    Requested by
                  </p>
                  <p className="font-semibold text-[#5a7a94] text-[12px] w-36">
                    Source
                  </p>
                </div>
                {[
                  {
                    test: "Growth scan (36w)",
                    due: "16 October 2026",
                    requested: "25 September 2026",
                    by: "Midwife J. Davies",
                    source: "Ultrasound department",
                  },
                  {
                    test: "Repeat full blood count (34w)",
                    due: "5 October 2026",
                    requested: "15 August 2026",
                    by: "Midwife J. Davies",
                    source: "UHMB Haematology",
                  },
                  {
                    test: "Antibody re-screen (34w)",
                    due: "5 October 2026",
                    requested: "15 August 2026",
                    by: "Midwife J. Davies",
                    source: "UHMB Blood Bank",
                  },
                ].map((row) => (
                  <div
                    key={row.test}
                    className="flex items-center border-b border-[#d5e8f5] px-4 py-2.5 last:border-b-0"
                  >
                    <p className="font-semibold text-[#1d3557] text-[13px] flex-1">
                      {row.test}
                    </p>
                    <p className="font-medium text-[#1d3557] text-[13px] w-28">
                      {row.due}
                    </p>
                    <p className="text-[#4a6a85] text-[12px] w-32">
                      {row.requested}
                    </p>
                    <p className="text-[#4a6a85] text-[12px] w-40">{row.by}</p>
                    <p className="text-[#4a6a85] text-[12px] w-36">
                      {row.source}
                    </p>
                  </div>
                ))}
              </div>
            )}
          </div>

          <p className="text-[#4a6a85] text-[11px] pt-2">
            Demo prototype – fictional data
          </p>
        </div>
      </div>

      {/* Connected Systems footer */}
      <div className="ncrs-connected bg-white border-[#d5dce0] border-t w-full shrink-0">
        <div className="flex items-center justify-between px-4 py-2">
          <div className="flex gap-3 items-center">
            <p className="font-semibold text-[#1d3557] text-[12px]">
              Connected Systems
            </p>
            <p className="text-[#4a6a85] text-[11px]">7/8 connected</p>
            <div className="flex gap-1.5 items-center">
              {[...Array(6)].map((_, i) => (
                <div key={i} className="bg-[#2d7a3e] size-2 rounded-full" />
              ))}
            </div>
          </div>
          <button
            onClick={() => setConnectedOpen((o) => !o)}
            className="flex gap-1.5 items-center cursor-pointer bg-transparent border-0 p-0"
          >
            <p className="font-semibold text-[#005eb8] text-[11px]">
              {connectedOpen ? "Hide" : "Show"}
            </p>
            <div className="size-[14px] relative shrink-0">
              <img
                alt=""
                className={`absolute block inset-0 max-w-none size-full transition-transform duration-200 ${connectedOpen ? "rotate-0" : "rotate-180"}`}
                src={imgIcon19}
              />
            </div>
          </button>
        </div>
        {connectedOpen && (
          <div className="bg-[#f8f9fa] border-[#e8ecef] border-t px-4 py-3">
            <div className="flex flex-wrap gap-3">
              {[
                {
                  name: "BadgerNet Maternity",
                  time: "5 October 2026, 9:12am",
                  status: "Primary record system",
                  statusBg: "bg-[#005eb8]",
                  icon: imgIcon20,
                  statusIcon: imgIcon21,
                  border: "border-[#b8dfc8]",
                },
                {
                  name: "GP record",
                  time: "5 October 2026, 8:45am",
                  status: "Connected",
                  statusBg: "bg-[#2d7a3e]",
                  icon: imgIcon22,
                  statusIcon: imgIcon23,
                  border: "border-[#b8dfc8]",
                },
                {
                  name: "Lab results",
                  time: "5 October 2026, 7:30am",
                  status: "Connected",
                  statusBg: "bg-[#2d7a3e]",
                  icon: imgIcon24,
                  statusIcon: imgIcon23,
                  border: "border-[#b8dfc8]",
                },
                {
                  name: "Diabetes service",
                  time: "4 October 2026, 4:20pm",
                  status: "Connected",
                  statusBg: "bg-[#2d7a3e]",
                  icon: imgIcon25,
                  statusIcon: imgIcon23,
                  border: "border-[#b8dfc8]",
                },
                {
                  name: "Perinatal mental health",
                  time: "3 October 2026, 2:05pm",
                  status: "Connected",
                  statusBg: "bg-[#2d7a3e]",
                  icon: imgIcon26,
                  statusIcon: imgIcon23,
                  border: "border-[#b8dfc8]",
                },
                {
                  name: "Ultrasound department",
                  time: "30 September 2026, 11:40am",
                  status: "Connected",
                  statusBg: "bg-[#2d7a3e]",
                  icon: imgIcon27,
                  statusIcon: imgIcon23,
                  border: "border-[#b8dfc8]",
                },
                {
                  name: "Interpreter booking",
                  time: "5 October 2026, 9am",
                  status: "Connected",
                  statusBg: "bg-[#2d7a3e]",
                  icon: imgIcon28,
                  statusIcon: imgIcon23,
                  border: "border-[#b8dfc8]",
                },
                {
                  name: "Social support and community",
                  time: "1 October 2026, 10:15am",
                  status: "Partially connected",
                  statusBg: "bg-[#e8a917]",
                  icon: imgIcon29,
                  statusIcon: imgIcon30,
                  border: "border-[#ffe0a0]",
                },
              ].map(
                ({
                  name,
                  time,
                  status,
                  statusBg,
                  icon,
                  statusIcon,
                  border,
                }) => (
                  <div
                    key={name}
                    className={`bg-white border ${border} flex gap-2 items-center px-3 py-2`}
                  >
                    <div className="size-[14px] relative shrink-0">
                      <img
                        alt=""
                        className="absolute block inset-0 max-w-none size-full"
                        src={icon}
                      />
                    </div>
                    <div className="flex flex-col">
                      <p className="font-medium text-[#1d3557] text-[12px] whitespace-nowrap">
                        {name}
                      </p>
                      <p className="text-[#4a6a85] text-[10px] whitespace-nowrap">
                        {time}
                      </p>
                    </div>
                    <div
                      className={`${statusBg} flex gap-1 items-center px-2.5 py-[2px] rounded`}
                    >
                      <div className="size-[10px] relative shrink-0">
                        <img
                          alt=""
                          className="absolute block inset-0 max-w-none size-full"
                          src={statusIcon}
                        />
                      </div>
                      <p className="font-semibold text-[11px] text-white whitespace-nowrap">
                        {status}
                      </p>
                    </div>
                  </div>
                ),
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
