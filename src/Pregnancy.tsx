import { useState } from "react";
import { Link } from "react-router-dom";

const assetPathPrefix = "/assets";
const imgImageNhs = `${assetPathPrefix}/1b6bd.png`;
const imgIcon = `${assetPathPrefix}/146f3.svg`;
const imgIcon1 = `${assetPathPrefix}/efb42.svg`;
const imgIcon2 = `${assetPathPrefix}/048a9.svg`;
const imgIcon3 = `${assetPathPrefix}/ac60c.svg`;
const imgIcon4 = `${assetPathPrefix}/80b3f.svg`;
const imgIcon5 = `${assetPathPrefix}/d2ed5.svg`;
const imgIcon6 = `${assetPathPrefix}/96f16.svg`;
const imgIcon7 = `${assetPathPrefix}/37b1c.svg`;
const imgIcon8 = `${assetPathPrefix}/3532b.svg`;
const imgIcon9 = `${assetPathPrefix}/61af0.svg`;
const imgIcon10 = `${assetPathPrefix}/7c3ff.svg`;
const imgIcon11 = `${assetPathPrefix}/689e6.svg`;
const imgIcon12 = `${assetPathPrefix}/b2bc3.svg`;
const imgIcon13 = `${assetPathPrefix}/166a2.svg`;
const imgIcon14 = `${assetPathPrefix}/70e4e.svg`;
const imgIcon15 = `${assetPathPrefix}/85d58.svg`;
const imgIcon16 = `${assetPathPrefix}/1584a.svg`;
const imgIcon17 = `${assetPathPrefix}/30502.svg`;
const imgIcon18 = `${assetPathPrefix}/40a51.svg`;
const imgIcon19 = `${assetPathPrefix}/91418.svg`;
const imgIcon20 = `${assetPathPrefix}/e7bd3.svg`;
const imgIcon21 = `${assetPathPrefix}/a2f04.svg`;
const imgIcon22 = `${assetPathPrefix}/da479.svg`;
const imgIcon23 = `${assetPathPrefix}/a0df7.svg`;
const imgIcon24 = `${assetPathPrefix}/afc57.svg`;
const imgIcon25 = `${assetPathPrefix}/8e8d6.svg`;
const imgIcon26 = `${assetPathPrefix}/ecba4.svg`;
const imgIcon27 = `${assetPathPrefix}/525a9.svg`;
const imgIcon28 = `${assetPathPrefix}/323d1.svg`;
const imgIcon29 = `${assetPathPrefix}/d55a1.svg`;
const imgIcon30 = `${assetPathPrefix}/eeb13.svg`;

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

export default function Pregnancy() {
  const [obstetricOpen, setObstetricOpen] = useState(false);
  const [healthHistoryOpen, setHealthHistoryOpen] = useState(false);
  const [problemsOpen, setProblemsOpen] = useState(false);
  const [screeningOpen, setScreeningOpen] = useState(false);
  const [prevPregOpen, setPrevPregOpen] = useState(false);
  const [connectedOpen, setConnectedOpen] = useState(false);

  return (
    <div className="ncrs-app bg-[#f0f4f5] min-h-screen w-full flex flex-col">
      {/* NHS Header */}
      <div className="ncrs-header bg-[#005eb8] w-full shrink-0">
        <div className="flex flex-col items-center w-full">
          <div className="flex items-center justify-between w-full max-w-[1440px] px-6 py-2">
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
        </div>
        {/* Sub nav */}
        <div className="flex flex-col items-center w-full">
          <div className="flex items-center justify-end w-full max-w-[1440px] px-6 h-[29px]">
            <div className="border-[#e5e7eb] border-r flex items-center px-3 py-1.5">
              <p className="text-[11px] text-[rgba(255,255,255,0.8)]">
                Find patient
              </p>
            </div>
            <div className="border-[#e5e7eb] border-r flex items-center px-3 py-1.5">
              <p className="text-[11px] text-[rgba(255,255,255,0.8)]">
                Change role
              </p>
            </div>
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
              <p className="text-[11px] text-[rgba(255,255,255,0.8)]">
                Settings
              </p>
            </div>
            <div className="flex items-center px-3 py-1.5">
              <p className="text-[11px] text-[rgba(255,255,255,0.8)]">
                Log out
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Patient bar */}
      <div className="ncrs-patient bg-[#d5e8f5] border-[#b0cfe8] border-b w-full shrink-0">
        <div className="flex flex-col items-center w-full">
          <div className="flex items-center justify-between w-full max-w-[1440px] px-6 py-2">
            <div className="flex gap-4 items-center">
              <p className="font-bold leading-[22.5px] text-[#1a1a1a] text-[15px] whitespace-nowrap">
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
        </div>
      </div>

      {/* Tab navigation */}
      <div className="ncrs-tabs bg-white border-[#d5dce0] border-b w-full shrink-0 overflow-hidden">
        <div className="flex flex-col items-center w-full">
          <div className="flex items-end w-full max-w-[1440px] px-6">
            <Link
              to="/"
              className="flex flex-col items-center justify-center px-4 py-2.5 text-[#3d5166] text-[13px] whitespace-nowrap no-underline hover:text-[#1d3557]"
            >
              Summary
            </Link>
            <div className="flex flex-col items-center justify-center px-4 py-2.5 relative">
              <p className="font-bold text-[#003087] text-[13px] whitespace-nowrap">
                Pregnancy
              </p>
              <div className="absolute bg-[#005eb8] h-[3px] left-0 rounded-tl-[2px] rounded-tr-[2px] bottom-0 w-full" />
            </div>
            <Link
              to="/appointments"
              className="flex flex-col items-center justify-center px-4 py-2.5 no-underline"
            >
              <p className="text-[#3d5166] text-[13px] whitespace-nowrap">
                Appointments
              </p>
            </Link>
            <Link
              to="/results"
              className="flex flex-col items-center justify-center px-4 py-2.5 no-underline"
            >
              <p className="text-[#3d5166] text-[13px] whitespace-nowrap">
                Results
              </p>
            </Link>
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
      </div>

      {/* Main content */}
      <div className="ncrs-main flex-1 p-6 overflow-auto">
        <h1 className="record-page-title">Pregnancy</h1>
        <div className="flex flex-col items-start max-w-[1440px] w-full mx-auto">
          {/* Current pregnancy banner */}
          <div className="bg-[#005eb8] flex items-center gap-6 px-5 py-3 w-full">
            <div className="flex gap-2 items-center shrink-0">
              <div className="size-4 relative shrink-0">
                <img
                  alt=""
                  className="absolute block inset-0 max-w-none size-full"
                  src={imgIcon4}
                />
              </div>
              <p className="font-bold text-[13px] text-white whitespace-nowrap">
                Current pregnancy
              </p>
            </div>
            {[
              ["Gestation", "34 weeks and 1 day"],
              ["estimated due date", "15 November 2026"],
              [
                "Parity",
                "Third pregnancy, 1 previous birth · no previous caesarean birth",
              ],
              ["Blood Group", "A+"],
              ["body mass index", "32"],
              ["Booking", "9w (15 August 2026)"],
            ].map(([label, value]) => (
              <div key={label} className="flex items-baseline gap-1.5 shrink-0">
                <p className="text-[10px] text-white/70 tracking-[0.25px] uppercase whitespace-nowrap">
                  {label}
                </p>
                <p className="font-bold text-[14px] text-white whitespace-nowrap">
                  {value}
                </p>
              </div>
            ))}
          </div>

          {/* Risk factors — always visible */}
          <div className="bg-[#fff9f9] border-2 border-[#da291c] w-full mt-4">
            <div className="bg-[#fef0ef] border-[#f5c0bb] border-b flex gap-2 items-center px-4 py-2.5">
              <div className="size-[14px] relative shrink-0">
                <img
                  alt=""
                  className="absolute block inset-0 max-w-none size-full"
                  src={imgIcon5}
                />
              </div>
              <p className="font-bold text-[#da291c] text-[13px] whitespace-nowrap">
                Risk factors in Pregnancy
              </p>
              <p className="font-medium text-[#4a6a85] text-[10px] tracking-[0.25px] uppercase pl-1">
                — always visible
              </p>
              <div className="flex-1 flex items-start justify-end">
                <div className="bg-[#da291c] px-2 py-[2px] rounded-full">
                  <p className="font-bold text-[10px] text-white whitespace-nowrap">
                    Active risks present
                  </p>
                </div>
              </div>
            </div>
            <div className="flex flex-col gap-2 px-4 py-3">
              {/* gestational diabetes mellitus — red */}
              <div className="bg-[#fef5f5] border border-[#da291c] px-4 py-3">
                <div className="flex gap-2 items-center">
                  <div className="size-[14px] relative shrink-0">
                    <img
                      alt=""
                      className="absolute block inset-0 max-w-none size-full"
                      src={imgIcon6}
                    />
                  </div>
                  <p className="font-semibold text-[#1d3557] text-[12px] flex-1">
                    Gestational Diabetes
                  </p>
                  <p className="font-semibold text-[#da291c] text-[11px] whitespace-nowrap">
                    Confirmed
                  </p>
                </div>
                <p className="text-[#1d3557] text-[11px] pl-[18px] pt-1">
                  The oral glucose tolerance test was abnormal on 5 September
                  2026. The diabetes clinic is providing care. Glucose is
                  monitored 4 times a day and metformin 500mg has started.
                </p>
                <p className="text-[#4a6a85] text-[10px] pl-[18px] pt-1">
                  Lab results
                </p>
              </div>
              {/* Previous C-section — green */}
              <div className="bg-[#f5f9f6] border border-[#c5d9c8] px-4 py-3">
                <div className="flex gap-2 items-center">
                  <div className="size-[14px] relative shrink-0">
                    <img
                      alt=""
                      className="absolute block inset-0 max-w-none size-full"
                      src={imgIcon7}
                    />
                  </div>
                  <p className="font-semibold text-[#1d3557] text-[12px] flex-1">
                    Previous caesarean section
                  </p>
                  <p className="font-semibold text-[#2d7a3e] text-[11px] whitespace-nowrap">
                    No
                  </p>
                </div>
                <p className="text-[#1d3557] text-[11px] pl-[18px] pt-1">
                  Previous birth was a spontaneous vaginal birth (SVB) in 2023.
                </p>
                <p className="text-[#4a6a85] text-[10px] pl-[18px] pt-1">
                  BadgerNet Maternity
                </p>
              </div>
              {/* venous thromboembolism — amber */}
              <div className="bg-[#fffbf0] border border-[#e8a917] px-4 py-3">
                <div className="flex gap-2 items-center">
                  <div className="size-[14px] relative shrink-0">
                    <img
                      alt=""
                      className="absolute block inset-0 max-w-none size-full"
                      src={imgIcon8}
                    />
                  </div>
                  <p className="font-semibold text-[#1d3557] text-[12px] flex-1">
                    venous thromboembolism score
                  </p>
                  <p className="font-semibold text-[#b58600] text-[11px] whitespace-nowrap">
                    3
                  </p>
                </div>
                <p className="text-[#1d3557] text-[11px] pl-[18px] pt-1">
                  body mass index ≥30 (+1), Age 25–35 (+1), Parity ≥1 (+1).
                  Total = 3. Reassess at 28w and postnatally.
                </p>
                <p className="text-[#4a6a85] text-[10px] pl-[18px] pt-1">
                  BadgerNet Maternity
                </p>
                <div className="bg-[#e8f4fd] flex gap-1.5 items-center px-2.5 py-1 rounded ml-[18px] mt-2 inline-flex w-fit">
                  <div className="size-3 relative shrink-0">
                    <img
                      alt=""
                      className="absolute block inset-0 max-w-none size-full"
                      src={imgIcon9}
                    />
                  </div>
                  <p className="font-bold text-[#005eb8] text-[11px] whitespace-nowrap">
                    venous thromboembolism Score: 3 — reassess at 28w
                  </p>
                </div>
              </div>
              {/* Mental health — amber */}
              <div className="bg-[#fffbf0] border border-[#e8a917] px-4 py-3">
                <div className="flex gap-2 items-center">
                  <div className="size-[14px] relative shrink-0">
                    <img
                      alt=""
                      className="absolute block inset-0 max-w-none size-full"
                      src={imgIcon8}
                    />
                  </div>
                  <p className="font-semibold text-[#1d3557] text-[12px] flex-1">
                    Mental health
                  </p>
                  <p className="font-semibold text-[#b58600] text-[11px] whitespace-nowrap">
                    History — monitored
                  </p>
                </div>
                <p className="text-[#1d3557] text-[11px] pl-[18px] pt-1">
                  Depression/anxiety 2022–2024. Currently on Sertraline 50mg.
                  Wellbeing plan in place. Edinburgh Postnatal Depression Scale
                  11/30 at booking.
                </p>
                <p className="text-[#4a6a85] text-[10px] pl-[18px] pt-1">
                  Perinatal mental health
                </p>
              </div>
            </div>
          </div>

          {/* Background History header */}
          <div className="flex items-center justify-between pt-4 px-1 w-full">
            <p className="font-semibold text-[#3d5166] text-[11px] tracking-[0.275px] uppercase">
              Background history
            </p>
            <p className="font-semibold text-[#005eb8] text-[11px]">
              Collapse all
            </p>
          </div>

          {/* Obstetric history */}
          <div className="bg-white border border-[#d5dce0] w-full mt-4">
            <button
              data-section-toggle
              aria-expanded={obstetricOpen}
              onClick={() => setObstetricOpen((o) => !o)}
              className="w-full bg-[#f5f7fa] border-b border-[#d5dce0] flex items-center gap-2 px-4 py-3 text-left"
            >
              <Chevron open={obstetricOpen} />
              <div className="size-[14px] relative shrink-0">
                <img
                  alt=""
                  className="absolute block inset-0 max-w-none size-full"
                  src={imgIcon11}
                />
              </div>
              <p className="font-bold text-[#1d3557] text-[13px] flex-1">
                Obstetric history
              </p>
            </button>
            {obstetricOpen && (
              <div className="px-4 py-3 overflow-x-auto">
                <table className="w-full text-[12px] min-w-[700px]">
                  <thead>
                    <tr className="border-b border-[#d5dce0]">
                      <th className="text-left font-semibold text-[#3d5166] py-1.5 pr-3">
                        Date
                      </th>
                      <th className="text-left font-semibold text-[#3d5166] py-1.5 pr-3">
                        Gestation
                      </th>
                      <th className="text-left font-semibold text-[#3d5166] py-1.5 pr-3">
                        Mode of birth
                      </th>
                      <th className="text-left font-semibold text-[#3d5166] py-1.5 pr-3">
                        Outcome
                      </th>
                      <th className="text-left font-semibold text-[#3d5166] py-1.5 pr-3">
                        Name
                      </th>
                      <th className="text-left font-semibold text-[#3d5166] py-1.5 pr-3">
                        Status
                      </th>
                      <th className="text-left font-semibold text-[#3d5166] py-1.5 pr-3">
                        Sex
                      </th>
                      <th className="text-left font-semibold text-[#3d5166] py-1.5 pr-3">
                        Weight
                      </th>
                      <th className="text-left font-semibold text-[#3d5166] py-1.5 pr-3">
                        Birth centile
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr className="border-b border-[#edf0f2]">
                      <td className="py-2 pr-3 text-[#1d3557]">2023</td>
                      <td className="py-2 pr-3 text-[#1d3557]">
                        39 weeks and 4 days
                      </td>
                      <td className="py-2 pr-3 text-[#1d3557]">
                        Spontaneous vaginal birth (SVB)
                      </td>
                      <td className="py-2 pr-3 font-medium text-[#1d3557]">
                        Live birth
                      </td>
                      <td className="py-2 pr-3 text-[#1d3557]">Amina</td>
                      <td className="py-2 pr-3 text-[#1d3557]">
                        Alive and well
                      </td>
                      <td className="py-2 pr-3 text-[#1d3557]">Female</td>
                      <td className="py-2 pr-3 text-[#1d3557]">3.28 kg</td>
                      <td className="py-2 pr-3 text-[#1d3557]">50th</td>
                    </tr>
                    <tr>
                      <td className="py-2 pr-3 text-[#1d3557]">2021</td>
                      <td className="py-2 pr-3 text-[#1d3557]">
                        8 weeks and 3 days
                      </td>
                      <td className="py-2 pr-3 text-[#1d3557]">N/A</td>
                      <td className="py-2 pr-3 font-medium text-[#1d3557]">
                        Miscarriage
                      </td>
                      <td className="py-2 pr-3 text-[#1d3557]">—</td>
                      <td className="py-2 pr-3 text-[#1d3557]">—</td>
                      <td className="py-2 pr-3 text-[#1d3557]">—</td>
                      <td className="py-2 pr-3 text-[#1d3557]">—</td>
                      <td className="py-2 pr-3 text-[#1d3557]">—</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            )}
          </div>

          {/* Health history at booking */}
          <div className="bg-white border border-[#d5dce0] w-full mt-4">
            <button
              data-section-toggle
              aria-expanded={healthHistoryOpen}
              onClick={() => setHealthHistoryOpen((o) => !o)}
              className="w-full bg-[#f5f7fa] border-b border-[#d5dce0] flex items-center gap-2 px-4 py-3 text-left"
            >
              <Chevron open={healthHistoryOpen} />
              <div className="size-[14px] relative shrink-0">
                <img
                  alt=""
                  className="absolute block inset-0 max-w-none size-full"
                  src={imgIcon12}
                />
              </div>
              <p className="font-bold text-[#1d3557] text-[13px] flex-1">
                Health history at booking
              </p>
            </button>
            {healthHistoryOpen && (
              <div className="px-4 py-3">
                <div className="grid grid-cols-2 gap-x-6">
                  {[
                    ["Blood Transfusions", "No", "GP record"],
                    [
                      "Infections",
                      "No significant infections recorded",
                      "GP record",
                    ],
                    [
                      "Anaesthetic History",
                      "No previous anaesthetic",
                      "BadgerNet Maternity",
                    ],
                    ["Cardiac History", "No cardiac conditions", "GP record"],
                    [
                      "Gynaecological History",
                      "No gynaecological conditions recorded",
                      "GP record",
                    ],
                    ["Family History", "Mother: Type 2 Diabetes", "GP record"],
                    ["Smoking Status", "Non-smoker", "GP record"],
                    ["Alcohol Use", "None in pregnancy", "Booking"],
                    ["Substance Use", "None recorded", "GP record"],
                    [
                      "Bmi",
                      "32 (Obesity) — Dietitian referral pending",
                      "BadgerNet Maternity",
                    ],
                    [
                      "Mental health",
                      "History of depression/anxiety (2022–2024) — Treated with sertraline 50mg",
                      "Perinatal mental health",
                    ],
                    ["Allergies", "Penicillin (rash)", "GP record"],
                  ].map(([label, value, source]) => (
                    <div key={label} className="border-b border-[#edf0f2] py-2">
                      <div className="flex gap-4 items-start">
                        <div className="flex-1 min-w-0">
                          <p className="font-semibold text-[#3d5166] text-[12px]">
                            {label}
                          </p>
                          <p className="text-[#1d3557] text-[13px] pt-0.5">
                            {value}
                          </p>
                        </div>
                        <p className="text-[#4a6a85] text-[12px] whitespace-nowrap shrink-0">
                          {source}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Diagnoses and clinical history */}
          <div className="bg-white border border-[#d5dce0] w-full mt-4">
            <button
              data-section-toggle
              aria-expanded={problemsOpen}
              onClick={() => setProblemsOpen((o) => !o)}
              className="w-full bg-[#f5f7fa] border-b border-[#d5dce0] flex items-center gap-2 px-4 py-3 text-left"
            >
              <Chevron open={problemsOpen} />
              <div className="size-[14px] relative shrink-0">
                <img
                  alt=""
                  className="absolute block inset-0 max-w-none size-full"
                  src={imgIcon13}
                />
              </div>
              <p className="font-bold text-[#1d3557] text-[13px] flex-1">
                Diagnoses and clinical history
              </p>
              <div className="bg-[#da291c] px-2 py-[2px] rounded">
                <p className="font-semibold text-[10px] text-white">3</p>
              </div>
            </button>
            {problemsOpen && (
              <div className="px-4 py-3">
                {/* Diagnoses */}
                <p className="font-bold text-[#3d5166] text-[12px]">
                  Diagnoses
                </p>
                <div className="flex flex-col gap-1 mt-1.5">
                  {[
                    [
                      "Gestational diabetes mellitus (O24.4)",
                      "Active · 5 September 2026 · Lab results",
                    ],
                    [
                      "Obesity (body mass index 32) (E66.0)",
                      "Active · 15 August 2026 · BadgerNet Maternity",
                    ],
                    [
                      "Depression and anxiety — History (F41.9)",
                      "Currently managed · 2022 · GP record",
                    ],
                  ].map(([name, meta]) => (
                    <div
                      key={name}
                      className="bg-[#f8f9fa] border border-[#e8ecef] flex items-center justify-between px-3 py-2"
                    >
                      <p className="font-medium text-[#1d3557] text-[12px]">
                        {name}
                      </p>
                      <p className="text-[#3d5166] text-[11px]">{meta}</p>
                    </div>
                  ))}
                </div>

                {/* Previous referrals */}
                <p className="font-bold text-[#3d5166] text-[12px] mt-4">
                  Previous referrals
                </p>
                <div className="flex flex-col gap-1 mt-1.5">
                  <div className="bg-[#f8f9fa] border border-[#e8ecef] flex items-center gap-3 px-3 py-2">
                    <div className="flex-1 min-w-0 relative h-6">
                      <p className="absolute font-medium text-[#1d3557] text-[12px] top-[3px] left-0">
                        Diabetes Antenatal Clinic
                      </p>
                      <p className="absolute text-[#3d5166] text-[11px] top-[5px] left-[151px]">
                        — gestational diabetes mellitus confirmed — management
                        plan
                      </p>
                    </div>
                    <div className="flex gap-2 items-center shrink-0">
                      <p className="text-[#4a6a85] text-[11px]">
                        12 September 2026
                      </p>
                      <div className="bg-[#f5f9f6] px-1.5 py-[2px] rounded">
                        <p className="font-semibold text-[#2d7a3e] text-[10px]">
                          Referral reviewed
                        </p>
                      </div>
                    </div>
                  </div>
                  <div className="bg-[#f8f9fa] border border-[#e8ecef] flex items-center gap-3 px-3 py-2">
                    <div className="flex-1 min-w-0 relative h-6">
                      <p className="absolute font-medium text-[#1d3557] text-[12px] top-[3px] left-0">
                        Perinatal Mental health
                      </p>
                      <p className="absolute text-[#3d5166] text-[11px] top-[5px] left-[141px]">
                        — Wellbeing assessment and support plan
                      </p>
                    </div>
                    <div className="flex gap-2 items-center shrink-0">
                      <p className="text-[#4a6a85] text-[11px]">
                        15 September 2026
                      </p>
                      <div className="bg-[#f5f9f6] px-1.5 py-[2px] rounded">
                        <p className="font-semibold text-[#2d7a3e] text-[10px]">
                          Referral reviewed
                        </p>
                      </div>
                    </div>
                  </div>
                  <div className="bg-[#f8f9fa] border border-[#e8ecef] flex items-center gap-3 px-3 py-2">
                    <div className="flex-1 min-w-0 relative h-6">
                      <p className="absolute font-medium text-[#1d3557] text-[12px] top-[3px] left-0">
                        Dietitian
                      </p>
                      <p className="absolute text-[#3d5166] text-[11px] top-[5px] left-[55px]">
                        — Weight management + gestational diabetes mellitus
                        dietary advice
                      </p>
                    </div>
                    <div className="flex gap-2 items-center shrink-0">
                      <p className="text-[#4a6a85] text-[11px]">Pending</p>
                      <div className="bg-[#fffbf0] px-1.5 py-[2px] rounded">
                        <p className="font-semibold text-[#e8a917] text-[10px]">
                          Pending
                        </p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Tokophobia */}
                <p className="font-bold text-[#3d5166] text-[12px] mt-4">
                  Tokophobia
                </p>
                <div className="bg-[#f8f9fa] border border-[#e8ecef] px-3 py-2 mt-1.5">
                  <div className="flex gap-2 items-center">
                    <div className="size-[13px] relative shrink-0">
                      <img
                        alt=""
                        className="absolute block inset-0 max-w-none size-full"
                        src={imgIcon14}
                      />
                    </div>
                    <p className="text-[#1d3557] text-[12px]">Not reported</p>
                  </div>
                  <p className="text-[#3d5166] text-[11px] pl-[21px] pt-1">
                    Not reported. Previous spontaneous vaginal birth (SVB) with
                    good experience noted.
                  </p>
                </div>

                {/* Plan */}
                <p className="font-bold text-[#3d5166] text-[12px] mt-4">
                  Plan
                </p>
                <ul className="mt-1.5 pl-1 flex flex-col gap-1">
                  {[
                    "Continue glucose monitoring 4 times a day with dietitian input",
                    "Growth scans from 28w (gestational diabetes mellitus pathway)",
                    "Perinatal mental health follow-up aligned to routine appointments",
                    "Review Sertraline risks/benefits — shared decision documented",
                    "Interpreter at every clinical contact",
                    "Discuss birth preferences at 20–28w review",
                  ].map((item) => (
                    <li key={item} className="flex gap-2">
                      <span className="text-[#005eb8] text-[12px]">•</span>
                      <p className="text-[#1d3557] text-[12px]">{item}</p>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>

          {/* Screening */}
          <div className="bg-white border border-[#d5dce0] w-full mt-4">
            <button
              data-section-toggle
              aria-expanded={screeningOpen}
              onClick={() => setScreeningOpen((o) => !o)}
              className="w-full bg-[#f5f7fa] border-b border-[#d5dce0] flex items-center gap-2 px-4 py-3 text-left"
            >
              <Chevron open={screeningOpen} />
              <div className="size-[14px] relative shrink-0">
                <img
                  alt=""
                  className="absolute block inset-0 max-w-none size-full"
                  src={imgIcon15}
                />
              </div>
              <p className="font-bold text-[#1d3557] text-[13px] flex-1">
                Screening
              </p>
              <div className="bg-[#da291c] px-2 py-[2px] rounded">
                <p className="font-semibold text-[10px] text-white">
                  7 attention
                </p>
              </div>
            </button>
            {screeningOpen && (
              <div className="px-4 py-3 overflow-x-auto">
                <table className="w-full text-[12px] min-w-[600px]">
                  <thead>
                    <tr className="border-b border-[#d5dce0]">
                      <th className="text-left font-semibold text-[#3d5166] py-1.5 pr-3">
                        Test
                      </th>
                      <th className="text-left font-semibold text-[#3d5166] py-1.5 pr-3">
                        Date
                      </th>
                      <th className="text-left font-semibold text-[#3d5166] py-1.5 pr-3">
                        Gestation
                      </th>
                      <th className="text-left font-semibold text-[#3d5166] py-1.5 pr-3">
                        Accepted
                      </th>
                      <th className="text-left font-semibold text-[#3d5166] py-1.5 pr-3">
                        Result
                      </th>
                      <th className="text-left font-semibold text-[#3d5166] py-1.5 pr-3">
                        Source
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {[
                      [
                        "Growth scan (36w)",
                        "16 October 2026",
                        "36 weeks",
                        false,
                        "Booked — upcoming",
                        "Ultrasound department",
                      ],
                      [
                        "Growth scan (28w)",
                        "25 September 2026",
                        "28 weeks",
                        true,
                        "Growth appropriate. amniotic fluid index normal. Presentation cephalic.",
                        "Ultrasound department",
                      ],
                      [
                        "Oral glucose tolerance test (75 g)",
                        "5 September 2026",
                        "28 weeks",
                        true,
                        "Abnormal — gestational diabetes mellitus confirmed",
                        "Lab results",
                      ],
                      [
                        "Anomaly scan (20w)",
                        "2 September 2026",
                        "20 weeks and 1 day",
                        true,
                        "No structural anomalies detected. Growth appropriate.",
                        "Ultrasound department",
                      ],
                      [
                        "HIV, hepatitis B and syphilis",
                        "15 August 2026",
                        "9 weeks",
                        true,
                        "Negative",
                        "Lab results",
                      ],
                      [
                        "Sickle cell and thalassaemia",
                        "15 August 2026",
                        "9 weeks",
                        true,
                        "Low risk — no further action",
                        "Lab results",
                      ],
                      [
                        "Combined screening (T21/T18/T13)",
                        "2 August 2026",
                        "12 weeks and 4 days",
                        true,
                        "Low risk (1:5400 T21, 1:12000 T18)",
                        "Screening service",
                      ],
                      [
                        "Dating scan",
                        "2 August 2026",
                        "9 weeks",
                        true,
                        "CRL consistent with dates. Singleton.",
                        "Ultrasound department",
                      ],
                      [
                        "Group B Strep",
                        "—",
                        "Not recorded",
                        false,
                        "Declined",
                        "BadgerNet Maternity",
                      ],
                    ].map(
                      ([test, date, gestation, accepted, result, source]) => (
                        <tr
                          key={test as string}
                          className="border-b border-[#edf0f2]"
                        >
                          <td className="py-2 pr-3 font-medium text-[#1d3557]">
                            {test as string}
                          </td>
                          <td className="py-2 pr-3 text-[#3d5166]">
                            {date as string}
                          </td>
                          <td className="py-2 pr-3 text-[#3d5166]">
                            {gestation as string}
                          </td>
                          <td className="py-2 pr-3">
                            <div className="flex gap-1 items-center">
                              <div className="size-3 relative shrink-0">
                                <img
                                  alt=""
                                  className="absolute block inset-0 max-w-none size-full"
                                  src={accepted ? imgIcon16 : imgIcon17}
                                />
                              </div>
                              <p
                                className={`font-semibold text-[12px] ${accepted ? "text-[#2d7a3e]" : "text-[#da291c]"}`}
                              >
                                {accepted ? "Yes" : "No"}
                              </p>
                            </div>
                          </td>
                          <td className="py-2 pr-3 text-[#1d3557]">
                            {result as string}
                          </td>
                          <td className="py-2 pr-3 text-[#4a6a85]">
                            {source as string}
                          </td>
                        </tr>
                      ),
                    )}
                  </tbody>
                </table>
              </div>
            )}
          </div>

          {/* Previous pregnancy Panel */}
          <div className="bg-white border border-[#d5dce0] w-full mt-4">
            <button
              data-section-toggle
              aria-expanded={prevPregOpen}
              onClick={() => setPrevPregOpen((o) => !o)}
              className="w-full bg-[#f5f7fa] border-b border-[#d5dce0] flex items-center gap-2 px-4 py-3 text-left"
            >
              <Chevron open={prevPregOpen} />
              <div className="size-[14px] relative shrink-0">
                <img
                  alt=""
                  className="absolute block inset-0 max-w-none size-full"
                  src={imgIcon18}
                />
              </div>
              <p className="font-bold text-[#1d3557] text-[13px] flex-1">
                Previous pregnancy Panel
              </p>
              <div className="bg-[#005eb8] px-2 py-[2px] rounded">
                <p className="font-semibold text-[10px] text-white">
                  2 pregnancies
                </p>
              </div>
            </button>
            {prevPregOpen && (
              <div className="px-4 py-3 flex flex-col gap-4">
                {/* 2023 live birth */}
                <div className="border border-[#d5dce0]">
                  <div className="bg-[#e8f8ed] flex gap-3 items-center px-4 py-2.5">
                    <div className="bg-[#2d7a3e] size-8 rounded-full flex items-center justify-center shrink-0">
                      <p className="font-bold text-[12px] text-white">2023</p>
                    </div>
                    <div className="relative h-6 flex-1">
                      <p className="absolute font-bold text-[#1d3557] text-[13px] top-[2px] left-0">
                        Live birth
                      </p>
                      <p className="absolute text-[#3d5166] text-[11px] top-[5px] left-[67px]">
                        at 39 weeks and 4 days
                      </p>
                    </div>
                    <p className="text-[#4a6a85] text-[11px] shrink-0">
                      BadgerNet Maternity
                    </p>
                  </div>
                  <div className="px-4 py-3">
                    <div className="grid grid-cols-3 gap-x-6">
                      {[
                        ["Year", "2023"],
                        [
                          "Gestation at delivery or loss",
                          "39 weeks and 4 days",
                        ],
                        ["Outcome", "Live birth"],
                        [
                          "Place of delivery",
                          "University Hospitals of Morecambe Bay",
                        ],
                        ["Mode of birth", "Spontaneous vaginal birth (SVB)"],
                        ["Sex", "Female"],
                        ["Name of child", "Amina"],
                        ["Birth weight", "3.28 kg"],
                        ["Birth centile", "50th"],
                        ["APGAR scores", "1 min: 9 · 5 min: 10"],
                        ["NICU admission", "No"],
                        ["Feeding method", "Breastfed"],
                        ["Current status", "Alive and well"],
                        ["Uterine surgery", "None recorded"],
                      ].map(([label, value]) => (
                        <div
                          key={label}
                          className="border-b border-[#edf0f2] py-2"
                        >
                          <p className="font-semibold text-[#3d5166] text-[12px]">
                            {label}
                          </p>
                          <p className="text-[#1d3557] text-[13px] pt-0.5">
                            {value}
                          </p>
                        </div>
                      ))}
                    </div>
                    <div className="border-t border-[#edf0f2] mt-3 pt-3">
                      <p className="text-[#3d5166] text-[11px]">
                        No complications recorded
                      </p>
                    </div>
                  </div>
                </div>

                {/* 2021 miscarriage */}
                <div className="border border-[#d5dce0]">
                  <div className="bg-[#fef5f5] flex gap-3 items-center px-4 py-2.5">
                    <div className="bg-[#b0b8c1] size-8 rounded-full flex items-center justify-center shrink-0">
                      <p className="font-bold text-[12px] text-white">2021</p>
                    </div>
                    <div className="relative h-6 flex-1">
                      <p className="absolute font-bold text-[#1d3557] text-[13px] top-[2px] left-0">
                        Miscarriage
                      </p>
                      <p className="absolute text-[#3d5166] text-[11px] top-[5px] left-[84px]">
                        at 8 weeks and 3 days
                      </p>
                    </div>
                    <p className="text-[#4a6a85] text-[11px] shrink-0">
                      GP record
                    </p>
                  </div>
                  <div className="px-4 py-3">
                    <div className="grid grid-cols-3 gap-x-6">
                      {[
                        ["Year", "2021"],
                        ["Gestation at delivery or loss", "8 weeks and 3 days"],
                        ["Outcome", "Miscarriage"],
                        [
                          "Place of delivery",
                          "Central City Practice (managed in community)",
                        ],
                        ["Uterine surgery", "None recorded"],
                      ].map(([label, value]) => (
                        <div
                          key={label}
                          className="border-b border-[#edf0f2] py-2"
                        >
                          <p className="font-semibold text-[#3d5166] text-[12px]">
                            {label}
                          </p>
                          <p className="text-[#1d3557] text-[13px] pt-0.5">
                            {value}
                          </p>
                        </div>
                      ))}
                    </div>
                    <div className="border-t border-[#edf0f2] mt-3 pt-3">
                      <p className="text-[#3d5166] text-[11px]">
                        No complications recorded
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Footer note */}
          <p className="text-[#4a6a85] text-[11px] pt-4">
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
