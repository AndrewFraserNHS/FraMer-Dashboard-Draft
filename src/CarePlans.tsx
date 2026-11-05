import { useState } from "react";
import { Link } from "react-router-dom";

const A = "/assets";
const imgNhs = `${A}/1b6bd.png`;
const iconChevronDown = `${A}/146f3.svg`;
const iconWhatsnew = `${A}/efb42.svg`;
const iconSettings = `${A}/048a9.svg`;
const iconCopyNhs = `${A}/ac60c.svg`;
const iconHide = `${A}/91418.svg`;
const iconBadgerNet = `${A}/e7bd3.svg`;
const iconHomeSys = `${A}/a2f04.svg`;
const iconGP = `${A}/da479.svg`;
const iconConnected = `${A}/a0df7.svg`;
const iconLab = `${A}/afc57.svg`;
const iconDiab = `${A}/8e8d6.svg`;
const iconPMH = `${A}/ecba4.svg`;
const iconUS = `${A}/525a9.svg`;
const iconInterp = `${A}/323d1.svg`;
const iconSocSupport = `${A}/d55a1.svg`;
const iconPartial = `${A}/eeb13.svg`;

export default function CarePlans() {
  const [wellbeingOpen, setWellbeingOpen] = useState(false);
  const [diabetesOpen, setDiabetesOpen] = useState(false);
  const [connectedOpen, setConnectedOpen] = useState(false);

  return (
    <div className="ncrs-app bg-[#f0f4f5] min-h-screen w-full">
      {/* Top nav */}
      <div className="ncrs-header bg-[#005eb8] w-full">
        <div className="flex items-center justify-between max-w-[1440px] mx-auto px-6 py-2">
          <div className="flex gap-3 items-center">
            <img src={imgNhs} alt="NHS" className="h-[38px] w-auto" />
            <span className="text-white text-[14px] font-semibold tracking-[-0.35px]">
              National Care Records Service
            </span>
          </div>
          <div className="flex gap-3 items-center">
            <div className="bg-[#004a94] border border-white/20 rounded flex gap-1.5 items-center px-2.5 py-1.5">
              <span className="text-white/70 text-[12px]">User</span>
              <span className="text-white text-[12px] font-semibold">
                Amrita Kaur Dr
              </span>
              <img src={iconChevronDown} alt="" className="size-3" />
            </div>
            <div className="bg-[#004a94] border border-white/20 rounded flex gap-1.5 items-center px-2.5 py-1.5">
              <span className="text-white/70 text-[12px]">Role</span>
              <span className="text-white text-[12px] font-semibold">
                R0260 - General Medical Practitioner
              </span>
              <img src={iconChevronDown} alt="" className="size-3" />
            </div>
          </div>
        </div>
        <div className="flex items-center justify-end max-w-[1440px] mx-auto px-6">
          {["Find patient", "Change role"].map((t) => (
            <button
              key={t}
              className="border-r border-white/20 text-white/80 text-[11px] px-3 py-1.5"
            >
              {t}
            </button>
          ))}
          <button className="border-r border-white/20 text-white/80 text-[11px] px-3 py-1.5 flex gap-1 items-center">
            <img src={iconWhatsnew} alt="" className="size-[11px]" /> What's new
          </button>
          <button className="border-r border-white/20 text-white/80 text-[11px] px-3 py-1.5">
            Give feedback
          </button>
          <button className="border-r border-white/20 text-white/80 text-[11px] px-3 py-1.5 flex gap-1 items-center">
            <img src={iconSettings} alt="" className="size-[11px]" /> Settings
          </button>
          <button className="text-white/80 text-[11px] px-3 py-1.5">
            Log out
          </button>
        </div>
      </div>

      {/* Patient banner */}
      <div className="ncrs-patient bg-[#d5e8f5] border-b border-[#b0cfe8] w-full">
        <div className="flex items-center max-w-[1440px] mx-auto px-6 py-2">
          <div className="flex items-center gap-4">
            <span className="font-bold text-[15px] text-[#1a1a1a]">
              Leila KHAN
            </span>
            <span className="text-[#8ab0c8] text-[16px]">|</span>
            <span className="text-[13px] text-[#1a1a1a]">Female, 28 years</span>
            <span className="text-[#8ab0c8] text-[16px]">|</span>
            <span className="text-[13px] text-[#1a1a1a]">14 June 1995</span>
            <span className="text-[#8ab0c8] text-[16px]">|</span>
            <div className="flex items-center gap-1.5">
              <span className="text-[11px] font-semibold tracking-[0.275px] uppercase text-[#1a1a1a]">
                NHS number:
              </span>
              <span className="text-[13px] font-medium text-[#1a1a1a]">
                485 777 2910
              </span>
              <img src={iconCopyNhs} alt="" className="size-3" />
            </div>
            <span className="text-[#8ab0c8] text-[16px]">|</span>
            <span className="text-[13px] text-[#1a1a1a]">
              14 Ryelands Crescent, Lancaster, LA1 3PQ
            </span>
          </div>
        </div>
      </div>

      {/* Tab nav */}
      <div className="ncrs-tabs bg-white border-b border-[#d5dce0] w-full">
        <div className="flex items-end max-w-[1440px] mx-auto px-6">
          {(
            [
              ["Summary", "/"],
              ["Pregnancy", "/pregnancy"],
              ["Appointments", "/appointments"],
              ["Results", "/results"],
              ["Comorbidities", "/comorbidities"],
            ] as [string, string][]
          ).map(([label, path]) => (
            <Link
              key={label}
              to={path}
              className="flex flex-col items-center justify-center px-4 py-2.5 no-underline"
            >
              <span className="text-[13px] text-[#3d5166]">{label}</span>
            </Link>
          ))}
          <div className="relative flex flex-col items-center justify-center px-4 py-2.5">
            <span className="text-[13px] font-bold text-[#003087]">
              Care plans
            </span>
            <div className="absolute bottom-0 left-0 right-0 h-[3px] bg-[#005eb8] rounded-t" />
          </div>
          <Link
            to="/documents"
            className="flex flex-col items-center justify-center px-4 py-2.5 no-underline"
          >
            <span className="text-[13px] text-[#3d5166]">Documents</span>
          </Link>
        </div>
      </div>

      {/* Main content */}
      <div className="ncrs-main max-w-[1440px] mx-auto px-6 py-6">
        <h1 className="record-page-title">Care plans</h1>
        {/* Care plans outer card */}
        <div className="bg-white border border-[#ddd]">
          {/* Card heading */}
          <div className="bg-[#f5f5f5] border-b border-[#ddd] px-4 py-2.5">
            <p className="font-semibold text-[13px] text-[#333]">Care plans</p>
          </div>

          <div className="p-4 space-y-3">
            {/* Wellbeing Support Plan */}
            <div className="bg-white border border-[#ddd]">
              <button
                type="button"
                data-section-toggle
                aria-expanded={wellbeingOpen}
                onClick={() => setWellbeingOpen((value) => !value)}
                className="bg-[#f9f9f9] border-b border-[#eee] flex items-center justify-between px-4 py-2.5 w-full text-left"
              >
                <p className="font-semibold text-[13px] text-[#333]">
                  Wellbeing Support Plan
                </p>
                <p className="text-[11px] text-[#666]">
                  Created: 15 September 2026
                </p>
              </button>
              {wellbeingOpen && (
                <ul className="p-4 space-y-1">
                  {[
                    "Regular contact with perinatal mental health team",
                    "Safety plan in place - emergency contacts documented",
                    "Partner involved in care planning",
                    "Social services aware - supportive",
                  ].map((item, i) => (
                    <li key={i} className="text-[12px] text-[#333]">
                      • {item}
                    </li>
                  ))}
                </ul>
              )}
            </div>

            {/* Diabetes management */}
            <div className="bg-white border border-[#ddd]">
              <button
                type="button"
                data-section-toggle
                aria-expanded={diabetesOpen}
                onClick={() => setDiabetesOpen((value) => !value)}
                className="bg-[#f9f9f9] border-b border-[#eee] flex items-center justify-between px-4 py-2.5 w-full text-left"
              >
                <p className="font-semibold text-[13px] text-[#333]">
                  Diabetes management
                </p>
                <p className="text-[11px] text-[#666]">
                  Created: 12 September 2026
                </p>
              </button>
              {diabetesOpen && (
                <ul className="p-4 space-y-1">
                  {[
                    "Home glucose monitoring 4 times a day",
                    "Dietitian review arranged",
                    "Growth scans every 4 weeks from 28w",
                    "Consider medication escalation if targets not met",
                  ].map((item, i) => (
                    <li key={i} className="text-[12px] text-[#333]">
                      • {item}
                    </li>
                  ))}
                </ul>
              )}
            </div>

            {/* Connected record benefit */}
            <div className="bg-[#e8f4fd] border border-[#005eb8] p-3">
              <p className="font-semibold text-[11px] text-[#333]">
                Connected record benefit
              </p>
              <p className="text-[12px] text-[#666] mt-1">
                The wellbeing plan and diabetes plan are visible together,
                helping clinicians plan an appointment that covers both safety
                and physical health.
              </p>
            </div>
          </div>
        </div>

        <p className="text-[11px] text-[#4a6a85] mt-4">
          Demo prototype – fictional data
        </p>
      </div>

      {/* Connected Systems footer */}
      <div className="ncrs-connected bg-white border-t border-[#d5dce0] w-full mt-4">
        <button
          className="flex items-center justify-between px-4 py-2 w-full"
          onClick={() => setConnectedOpen((o) => !o)}
        >
          <div className="flex gap-3 items-center">
            <span className="font-semibold text-[12px] text-[#1d3557]">
              Connected Systems
            </span>
            <span className="text-[11px] text-[#4a6a85]">7/8 connected</span>
            <div className="flex gap-1.5 items-center">
              {[...Array(6)].map((_, i) => (
                <div key={i} className="bg-[#2d7a3e] size-2 rounded-full" />
              ))}
            </div>
          </div>
          <div className="flex gap-1.5 items-center">
            <span className="font-semibold text-[11px] text-[#005eb8]">
              {connectedOpen ? "Hide" : "Show"}
            </span>
            <img
              src={iconHide}
              alt=""
              className={`size-3.5 transition-transform duration-200 ${connectedOpen ? "rotate-180" : "rotate-0"}`}
            />
          </div>
        </button>
        {connectedOpen && (
          <div className="bg-[#f8f9fa] border-t border-[#e8ecef] px-4 py-3">
            <div className="flex flex-wrap gap-3">
              {[
                {
                  icon: iconBadgerNet,
                  name: "BadgerNet Maternity",
                  time: "5 October 2026, 9:12am",
                  badge: "Primary record system",
                  badgeColor: "bg-[#005eb8]",
                  badgeIcon: iconHomeSys,
                  border: "border-[#b8dfc8]",
                },
                {
                  icon: iconGP,
                  name: "GP record",
                  time: "5 October 2026, 8:45am",
                  badge: "Connected",
                  badgeColor: "bg-[#2d7a3e]",
                  badgeIcon: iconConnected,
                  border: "border-[#b8dfc8]",
                },
                {
                  icon: iconLab,
                  name: "Lab results",
                  time: "5 October 2026, 7:30am",
                  badge: "Connected",
                  badgeColor: "bg-[#2d7a3e]",
                  badgeIcon: iconConnected,
                  border: "border-[#b8dfc8]",
                },
                {
                  icon: iconDiab,
                  name: "Diabetes service",
                  time: "4 October 2026, 4:20pm",
                  badge: "Connected",
                  badgeColor: "bg-[#2d7a3e]",
                  badgeIcon: iconConnected,
                  border: "border-[#b8dfc8]",
                },
                {
                  icon: iconPMH,
                  name: "Perinatal mental health",
                  time: "3 October 2026, 2:05pm",
                  badge: "Connected",
                  badgeColor: "bg-[#2d7a3e]",
                  badgeIcon: iconConnected,
                  border: "border-[#b8dfc8]",
                },
                {
                  icon: iconUS,
                  name: "Ultrasound department",
                  time: "30 September 2026, 11:40am",
                  badge: "Connected",
                  badgeColor: "bg-[#2d7a3e]",
                  badgeIcon: iconConnected,
                  border: "border-[#b8dfc8]",
                },
                {
                  icon: iconInterp,
                  name: "Interpreter booking",
                  time: "5 October 2026, 9am",
                  badge: "Connected",
                  badgeColor: "bg-[#2d7a3e]",
                  badgeIcon: iconConnected,
                  border: "border-[#b8dfc8]",
                },
                {
                  icon: iconSocSupport,
                  name: "Social support and community",
                  time: "1 October 2026, 10:15am",
                  badge: "Partially connected",
                  badgeColor: "bg-[#e8a917]",
                  badgeIcon: iconPartial,
                  border: "border-[#ffe0a0]",
                },
              ].map((sys, i) => (
                <div
                  key={i}
                  className={`bg-white border ${sys.border} flex gap-2 items-center px-3 py-2`}
                >
                  <img src={sys.icon} alt="" className="size-3.5" />
                  <div>
                    <p className="font-medium text-[12px] text-[#1d3557]">
                      {sys.name}
                    </p>
                    <p className="text-[10px] text-[#4a6a85]">{sys.time}</p>
                  </div>
                  <div
                    className={`${sys.badgeColor} flex gap-1 items-center px-2.5 py-0.5 rounded ml-1`}
                  >
                    <img src={sys.badgeIcon} alt="" className="size-2.5" />
                    <span className="font-semibold text-[11px] text-white">
                      {sys.badge}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
