import { useState } from "react";
import { Link } from "react-router-dom";

const assetPathPrefix = "/assets";
const imgImageNhs = `${assetPathPrefix}/1b6bd.png`;
const imgIcon = `${assetPathPrefix}/146f3.svg`;
const imgIcon1 = `${assetPathPrefix}/efb42.svg`;
const imgIcon2 = `${assetPathPrefix}/048a9.svg`;
const imgIcon3 = `${assetPathPrefix}/ac60c.svg`;
const imgIcon4 = `${assetPathPrefix}/91418.svg`;
const imgIcon5 = `${assetPathPrefix}/e7bd3.svg`;
const imgIcon6 = `${assetPathPrefix}/a2f04.svg`;
const imgIcon7 = `${assetPathPrefix}/da479.svg`;
const imgIcon8 = `${assetPathPrefix}/a0df7.svg`;
const imgIcon9 = `${assetPathPrefix}/afc57.svg`;
const imgIcon10 = `${assetPathPrefix}/8e8d6.svg`;
const imgIcon11 = `${assetPathPrefix}/ecba4.svg`;
const imgIcon12 = `${assetPathPrefix}/525a9.svg`;
const imgIcon13 = `${assetPathPrefix}/323d1.svg`;
const imgIcon14 = `${assetPathPrefix}/d55a1.svg`;
const imgIcon15 = `${assetPathPrefix}/eeb13.svg`;

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
        stroke="#333"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

const appointments = [
  {
    date: "15 August 2026",
    time: "10am",
    visitType: "Booking appointment",
    clinic: "Community Midwifery - Central",
    interpreter: "Urdu (Booked)",
    status: "Completed",
    statusColor: "bg-[#2d7a3e]",
    outcome:
      "Booking completed. Interpreter used. Baseline observations recorded. Risk factors identified and referrals initiated.",
  },
  {
    date: "5 September 2026",
    time: "9:15am",
    visitType: "Phlebotomy and oral glucose tolerance test",
    clinic: "Antenatal Clinic",
    interpreter: "Not required",
    status: "Completed",
    statusColor: "bg-[#2d7a3e]",
    outcome:
      "Oral glucose tolerance test completed and HbA1c sample taken. Gestational diabetes mellitus confirmed and referral made to the Diabetes Antenatal Clinic.",
  },
  {
    date: "12 September 2026",
    time: "1:30pm",
    visitType: "Diabetes clinic",
    clinic: "Diabetes Antenatal Clinic",
    interpreter: "Urdu (Telephone)",
    status: "Completed",
    statusColor: "bg-[#2d7a3e]",
    outcome:
      "gestational diabetes mellitus management plan agreed. Metformin 500mg commenced. Glucose monitoring 4 times a day. Dietitian referral requested.",
  },
  {
    date: "15 September 2026",
    time: "3pm",
    visitType: "Perinatal mental health contact",
    clinic: "Community Perinatal Service",
    interpreter: "Urdu (Booked)",
    status: "Completed",
    statusColor: "bg-[#2d7a3e]",
    outcome:
      "Wellbeing assessment completed. Support plan updated. Safety plan reviewed.",
  },
  {
    date: "25 September 2026",
    time: "9:40am",
    visitType: "28-week growth scan",
    clinic: "Ultrasound department",
    interpreter: "Urdu (Booked)",
    status: "Completed",
    statusColor: "bg-[#2d7a3e]",
    outcome:
      "Growth appropriate. amniotic fluid index normal. Presentation cephalic. Follow-up 36-week scan booked.",
  },
  {
    date: "5 October 2026",
    time: "9am",
    visitType: "34-week routine review",
    clinic: "Community Midwifery - Central",
    interpreter: "Urdu (Booked)",
    status: "Today",
    statusColor: "bg-[#005eb8]",
    outcome: "—",
  },
  {
    date: "16 October 2026",
    time: "11:10am",
    visitType: "36-week growth scan",
    clinic: "Ultrasound department",
    interpreter: "Urdu (Booked)",
    status: "Booked",
    statusColor: "bg-[#5a6d7e]",
    outcome: "Scheduled due to gestational diabetes mellitus pathway.",
  },
];

export default function Appointments() {
  const [tableOpen, setTableOpen] = useState(true);
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
          <div className="flex items-center w-full max-w-[1440px] px-6 py-2">
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
            <div className="flex flex-col items-center justify-center px-4 py-2.5 relative">
              <p className="font-bold text-[#003087] text-[13px] whitespace-nowrap">
                Appointments
              </p>
              <div className="absolute bg-[#005eb8] h-[3px] left-0 rounded-tl-[2px] rounded-tr-[2px] bottom-0 w-full" />
            </div>
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
        <h1 className="record-page-title">Appointments</h1>
        <div className="flex flex-col items-start max-w-[1440px] w-full mx-auto">
          {/* Appointments card */}
          <div className="bg-white border border-[#ddd] w-full">
            {/* Card header — collapsible */}
            <button
              data-section-toggle
              aria-expanded={tableOpen}
              onClick={() => setTableOpen((o) => !o)}
              className="w-full bg-[#f5f5f5] border-b border-[#ddd] flex items-center justify-between px-4 py-2.5 text-left"
            >
              <div className="flex items-center gap-2">
                <Chevron open={tableOpen} />
                <p className="font-semibold text-[#333] text-[13px]">
                  Appointments
                </p>
              </div>
              <p className="text-[#666] text-[11px]">7 items</p>
            </button>

            {tableOpen && (
              <div className="overflow-x-auto">
                <table className="w-full text-[12px] min-w-[900px]">
                  <thead>
                    <tr className="bg-[#f5f5f5] border-b border-[#ddd]">
                      <th className="text-left font-semibold text-[#333] px-3 py-2 whitespace-nowrap">
                        Date/Time
                      </th>
                      <th className="text-left font-semibold text-[#333] px-3 py-2 whitespace-nowrap">
                        Visit type
                      </th>
                      <th className="text-left font-semibold text-[#333] px-3 py-2 whitespace-nowrap">
                        Clinic
                      </th>
                      <th className="text-left font-semibold text-[#333] px-3 py-2 whitespace-nowrap">
                        Interpreter
                      </th>
                      <th className="text-left font-semibold text-[#333] px-3 py-2 whitespace-nowrap">
                        Status
                      </th>
                      <th className="text-left font-semibold text-[#333] px-3 py-2 whitespace-nowrap">
                        Outcome
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {appointments.map((appt, i) => (
                      <tr
                        key={i}
                        className="border-b border-[#eee] last:border-b-0"
                      >
                        <td className="px-3 py-2.5 align-middle">
                          <p className="font-medium text-[#333] text-[12px] whitespace-nowrap">
                            {appt.date}
                          </p>
                          <p className="text-[#666] text-[11px] whitespace-nowrap">
                            {appt.time}
                          </p>
                        </td>
                        <td className="px-3 py-2.5 align-middle">
                          <p className="font-medium text-[#333] text-[12px] whitespace-nowrap">
                            {appt.visitType}
                          </p>
                        </td>
                        <td className="px-3 py-2.5 align-middle">
                          <p className="text-[#666] text-[12px] whitespace-nowrap">
                            {appt.clinic}
                          </p>
                        </td>
                        <td className="px-3 py-2.5 align-middle">
                          <p className="text-[#666] text-[12px] whitespace-nowrap">
                            {appt.interpreter}
                          </p>
                        </td>
                        <td className="px-3 py-2.5 align-middle">
                          <div
                            className={`${appt.statusColor} inline-flex items-center px-2.5 py-0.5 rounded`}
                          >
                            <p className="font-semibold text-[11px] text-white whitespace-nowrap">
                              {appt.status}
                            </p>
                          </div>
                        </td>
                        <td className="px-3 py-2.5 align-middle">
                          <p className="text-[#666] text-[12px]">
                            {appt.outcome}
                          </p>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>

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
                src={imgIcon4}
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
                  icon: imgIcon5,
                  statusIcon: imgIcon6,
                  border: "border-[#b8dfc8]",
                },
                {
                  name: "GP record",
                  time: "5 October 2026, 8:45am",
                  status: "Connected",
                  statusBg: "bg-[#2d7a3e]",
                  icon: imgIcon7,
                  statusIcon: imgIcon8,
                  border: "border-[#b8dfc8]",
                },
                {
                  name: "Lab results",
                  time: "5 October 2026, 7:30am",
                  status: "Connected",
                  statusBg: "bg-[#2d7a3e]",
                  icon: imgIcon9,
                  statusIcon: imgIcon8,
                  border: "border-[#b8dfc8]",
                },
                {
                  name: "Diabetes service",
                  time: "4 October 2026, 4:20pm",
                  status: "Connected",
                  statusBg: "bg-[#2d7a3e]",
                  icon: imgIcon10,
                  statusIcon: imgIcon8,
                  border: "border-[#b8dfc8]",
                },
                {
                  name: "Perinatal mental health",
                  time: "3 October 2026, 2:05pm",
                  status: "Connected",
                  statusBg: "bg-[#2d7a3e]",
                  icon: imgIcon11,
                  statusIcon: imgIcon8,
                  border: "border-[#b8dfc8]",
                },
                {
                  name: "Ultrasound department",
                  time: "30 September 2026, 11:40am",
                  status: "Connected",
                  statusBg: "bg-[#2d7a3e]",
                  icon: imgIcon12,
                  statusIcon: imgIcon8,
                  border: "border-[#b8dfc8]",
                },
                {
                  name: "Interpreter booking",
                  time: "5 October 2026, 9am",
                  status: "Connected",
                  statusBg: "bg-[#2d7a3e]",
                  icon: imgIcon13,
                  statusIcon: imgIcon8,
                  border: "border-[#b8dfc8]",
                },
                {
                  name: "Social support and community",
                  time: "1 October 2026, 10:15am",
                  status: "Partially connected",
                  statusBg: "bg-[#e8a917]",
                  icon: imgIcon14,
                  statusIcon: imgIcon15,
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
