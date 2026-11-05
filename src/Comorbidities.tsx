import { useState } from "react";
import { Link } from "react-router-dom";

const A = "/assets";
const imgNhs = `${A}/1b6bd.png`;
const iconChevronDown = `${A}/146f3.svg`;
const iconWhatsnew = `${A}/efb42.svg`;
const iconSettings = `${A}/048a9.svg`;
const iconCopyNhs = `${A}/ac60c.svg`;
const iconChevronRight = `${A}/7c3ff.svg`;
const iconAtRisk = `${A}/2eea0.svg`;
const iconWarningAmber = `${A}/eeb13.svg`;
const iconChevronSmall = `${A}/37dce.svg`;
const iconGdm = `${A}/500df.svg`;
const iconInfo = `${A}/1e125.svg`;
const iconFlagRed = `${A}/f6553.svg`;
const iconWarningYellow = `${A}/cfb22.svg`;
const iconLink = `${A}/c0e39.svg`;
const iconScreening = `${A}/02e86.svg`;
const iconWarnYellow2 = `${A}/d828f.svg`;
const iconQuestion = `${A}/c9f14.svg`;
const iconNote = `${A}/34dcd.svg`;
const iconSocial = `${A}/409e4.svg`;
const iconCauseForConcern = `${A}/cfb22.svg`;
const iconMeds = `${A}/e775a.svg`;
const iconHide = `${A}/91418.svg`;
// Connected systems icons
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
const iconLimitedAmber = `${A}/eeb13.svg`;

export default function Comorbidities() {
  const [endoOpen, setEndoOpen] = useState(false);
  const [mhOpen, setMhOpen] = useState(false);
  const [socialOpen, setSocialOpen] = useState(false);
  const [medsOpen, setMedsOpen] = useState(false);
  const [connectedOpen, setConnectedOpen] = useState(false);

  const chevron = (open: boolean) => (
    <svg
      width="14"
      height="14"
      viewBox="0 0 14 14"
      fill="none"
      className={`transition-transform duration-200 ${open ? "rotate-0" : "-rotate-90"}`}
    >
      <path
        d="M2.5 5L7 9.5L11.5 5"
        stroke="#3D5166"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );

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
        <div className="flex items-center justify-between max-w-[1440px] mx-auto px-6 py-2">
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
            ] as [string, string][]
          ).map(([label, path]) => (
            <Link
              key={label}
              to={path}
              className="flex flex-col items-center justify-center px-4 py-2.5"
            >
              <span className="text-[13px] text-[#3d5166]">{label}</span>
            </Link>
          ))}
          <div className="relative flex flex-col items-center justify-center px-4 py-2.5">
            <span className="text-[13px] font-bold text-[#003087]">
              Comorbidities
            </span>
            <div className="absolute bottom-0 left-0 right-0 h-[3px] bg-[#005eb8] rounded-t" />
          </div>
          <Link
            to="/care-plans"
            className="flex flex-col items-center justify-center px-4 py-2.5 no-underline"
          >
            <span className="text-[13px] text-[#3d5166]">Care plans</span>
          </Link>
          <Link
            to="/documents"
            className="flex flex-col items-center justify-center px-4 py-2.5 no-underline"
          >
            <span className="text-[13px] text-[#3d5166]">Documents</span>
          </Link>
        </div>
      </div>

      {/* Main content */}
      <div className="ncrs-main max-w-[1440px] mx-auto px-6 py-6 space-y-4">
        <h1 className="record-page-title">Conditions</h1>

        {/* Endocrine and metabolic */}
        <div className="bg-white border border-[#d5dce0]">
          <button
            data-section-toggle
            aria-expanded={endoOpen}
            className="bg-[#f5f7fa] border-b border-[#d5dce0] flex gap-2 items-center px-4 py-3 rounded-t-lg w-full text-left"
            onClick={() => setEndoOpen((o) => !o)}
          >
            <img src={iconChevronRight} alt="" className="size-3.5" />
            <img src={iconAtRisk} alt="" className="size-3.5" />
            <span className="flex-1 font-bold text-[13px] text-[#1d3557]">
              Endocrine and metabolic
            </span>
            <div className="bg-[#da291c] flex gap-1 items-center px-2 py-0.5 rounded">
              <img src={iconWarningAmber} alt="" className="size-2.5" />
              <span className="font-bold text-[10px] text-white">AT RISK</span>
              <img src={iconChevronSmall} alt="" className="size-2" />
            </div>
            {chevron(endoOpen)}
          </button>
          {endoOpen && (
            <div className="px-4 py-3 space-y-4">
              {/* Alert box */}
              <div className="bg-[#fef5f5] border border-[#da291c] flex gap-2.5 items-start px-4 py-3">
                <img src={iconGdm} alt="" className="size-4 mt-0.5 shrink-0" />
                <div>
                  <p className="font-bold text-[12px] text-[#da291c]">
                    Gestational Diabetes — AT RISK
                  </p>
                  <p className="text-[12px] text-[#1d3557] mt-1">
                    Risk factors identified from connected records. Diagnosis
                    may or may not be confirmed.
                  </p>
                </div>
              </div>

              {/* Risk factors table */}
              <div>
                <div className="border-b border-[#e8ecef] pb-1 mb-1.5">
                  <p className="font-bold text-[11px] text-[#005eb8] tracking-[0.275px] uppercase">
                    Risk factors (auto-detected)
                  </p>
                </div>
                <table className="w-full text-[12px]">
                  <thead>
                    <tr className="border-b border-[#edf0f2]">
                      <th className="text-left font-semibold text-[10px] text-[#3d5166] tracking-[0.25px] uppercase py-1.5 pr-3 w-[30%]">
                        Factor
                      </th>
                      <th className="text-left font-semibold text-[10px] text-[#3d5166] tracking-[0.25px] uppercase py-1.5 pr-3 w-[40%]">
                        Detail
                      </th>
                      <th className="text-left font-semibold text-[10px] text-[#3d5166] tracking-[0.25px] uppercase py-1.5 pr-3">
                        Source
                      </th>
                      <th className="text-left font-semibold text-[10px] text-[#3d5166] tracking-[0.25px] uppercase py-1.5">
                        Flagged
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-[#fef5f5]">
                    <tr className="border-b border-[#edf0f2]">
                      <td className="py-2 pr-3 font-medium text-[#1d3557]">
                        Ethnicity
                      </td>
                      <td className="py-2 pr-3">
                        <p className="text-[#1d3557]">
                          Asian / Asian British — Pakistani
                        </p>
                        <p className="text-[10px] text-[#005eb8]">
                          South Asian ethnicity is classified as high-risk for
                          gestational diabetes mellitus per NICE NG3
                        </p>
                      </td>
                      <td className="py-2 pr-3">
                        <div className="flex items-center gap-1">
                          <img src={iconLink} alt="" className="size-2.5" />
                          <span className="font-semibold text-[#005eb8]">
                            Demographics
                          </span>
                        </div>
                      </td>
                      <td className="py-2">
                        <div className="flex items-center gap-0.5">
                          <img src={iconFlagRed} alt="" className="size-2.5" />
                          <span className="font-bold text-[10px] text-[#da291c]">
                            Yes
                          </span>
                        </div>
                      </td>
                    </tr>
                    <tr className="border-b border-[#edf0f2]">
                      <td className="py-2 pr-3 font-medium text-[#1d3557]">
                        body mass index ≥ 30
                      </td>
                      <td className="py-2 pr-3 text-[#1d3557]">
                        body mass index 32 (Obesity)
                      </td>
                      <td className="py-2 pr-3">
                        <div className="flex items-center gap-1">
                          <img src={iconLink} alt="" className="size-2.5" />
                          <span className="font-semibold text-[#005eb8]">
                            Booking
                          </span>
                        </div>
                      </td>
                      <td className="py-2">
                        <div className="flex items-center gap-0.5">
                          <img src={iconFlagRed} alt="" className="size-2.5" />
                          <span className="font-bold text-[10px] text-[#da291c]">
                            Yes
                          </span>
                        </div>
                      </td>
                    </tr>
                    <tr className="border-b border-[#edf0f2]">
                      <td className="py-2 pr-3 font-medium text-[#1d3557]">
                        Family history of Type 2 diabetes
                      </td>
                      <td className="py-2 pr-3 text-[#1d3557]">
                        Mother: Type 2 Diabetes
                      </td>
                      <td className="py-2 pr-3">
                        <div className="flex items-center gap-1">
                          <img src={iconLink} alt="" className="size-2.5" />
                          <span className="font-semibold text-[#005eb8]">
                            GP Record
                          </span>
                        </div>
                      </td>
                      <td className="py-2">
                        <div className="flex items-center gap-0.5">
                          <img src={iconFlagRed} alt="" className="size-2.5" />
                          <span className="font-bold text-[10px] text-[#da291c]">
                            Yes
                          </span>
                        </div>
                      </td>
                    </tr>
                    <tr>
                      <td className="py-2 pr-3 font-medium text-[#1d3557]">
                        Previous gestational diabetes mellitus
                      </td>
                      <td className="py-2 pr-3 text-[#1d3557]">
                        Not applicable for first pregnancy
                      </td>
                      <td className="py-2 pr-3 text-[#4a6a85]">BadgerNet</td>
                      <td className="py-2 text-[10px] text-[#3d5166]">No</td>
                    </tr>
                  </tbody>
                </table>
              </div>

              {/* Recommended action */}
              <div className="bg-[#e8f4fd] border border-[#005eb8] px-4 py-3">
                <div className="flex gap-2.5 items-start">
                  <img
                    src={iconInfo}
                    alt=""
                    className="size-3.5 mt-0.5 shrink-0"
                  />
                  <p className="text-[12px]">
                    <span className="font-bold text-[#005eb8]">
                      Recommended action:{" "}
                    </span>
                    <span className="text-[#1d3557]">
                      Refer for GTT at 24–28 weeks. Advise on dietary
                      modification with interpreter support.
                    </span>
                  </p>
                </div>
                <div className="pl-6 mt-2">
                  <div className="flex items-center gap-1">
                    <img src={iconLink} alt="" className="size-2.5" />
                    <span className="font-semibold text-[12px] text-[#005eb8]">
                      View Results tab
                    </span>
                  </div>
                </div>
              </div>

              {/* Previous Glucose / HbA1c */}
              <div>
                <div className="border-b border-[#e8ecef] pb-1 mb-1.5 flex items-center justify-between">
                  <p className="font-bold text-[11px] text-[#3d5166] tracking-[0.275px] uppercase">
                    Previous glucose and HbA1c results (GP record)
                  </p>
                  <div className="flex items-center gap-1">
                    <img src={iconLink} alt="" className="size-2.5" />
                    <span className="font-semibold text-[12px] text-[#005eb8]">
                      All results →
                    </span>
                  </div>
                </div>
                <table className="w-full text-[12px]">
                  <thead>
                    <tr className="border-b border-[#edf0f2]">
                      <th className="text-left font-semibold text-[10px] text-[#3d5166] tracking-[0.25px] uppercase py-1.5 pr-3 w-[35%]">
                        Test
                      </th>
                      <th className="text-left font-semibold text-[10px] text-[#3d5166] tracking-[0.25px] uppercase py-1.5 pr-3">
                        Result
                      </th>
                      <th className="text-left font-semibold text-[10px] text-[#3d5166] tracking-[0.25px] uppercase py-1.5 pr-3">
                        Ref. Range
                      </th>
                      <th className="text-left font-semibold text-[10px] text-[#3d5166] tracking-[0.25px] uppercase py-1.5 pr-3">
                        Date
                      </th>
                      <th className="text-left font-semibold text-[10px] text-[#3d5166] tracking-[0.25px] uppercase py-1.5">
                        Source
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr className="border-b border-[#edf0f2]">
                      <td className="py-2 pr-3 font-medium text-[#1d3557]">
                        Fasting glucose (pre-pregnancy)
                      </td>
                      <td className="py-2 pr-3 font-semibold text-[#1d3557]">
                        5.2 mmol/L
                      </td>
                      <td className="py-2 pr-3 text-[#3d5166]">
                        &lt; 5.6 mmol/L
                      </td>
                      <td className="py-2 pr-3 text-[#3d5166]">
                        14 August 2024
                      </td>
                      <td className="py-2 text-[#4a6a85]">GP Record</td>
                    </tr>
                    <tr>
                      <td className="py-2 pr-3 font-medium text-[#1d3557]">
                        HbA1c (pre-pregnancy)
                      </td>
                      <td className="py-2 pr-3 font-semibold text-[#1d3557]">
                        37 mmol/mol
                      </td>
                      <td className="py-2 pr-3 text-[#3d5166]">
                        &lt; 42 mmol/mol
                      </td>
                      <td className="py-2 pr-3 text-[#3d5166]">
                        14 August 2024
                      </td>
                      <td className="py-2 text-[#4a6a85]">GP Record</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          )}
        </div>

        {/* Mental health */}
        <div className="bg-white border border-[#d5dce0]">
          <button
            data-section-toggle
            aria-expanded={mhOpen}
            className="bg-[#f5f7fa] border-b border-[#d5dce0] flex gap-2 items-center px-4 py-3 rounded-t-lg w-full text-left"
            onClick={() => setMhOpen((o) => !o)}
          >
            <img src={iconChevronRight} alt="" className="size-3.5" />
            <img src={iconScreening} alt="" className="size-3.5" />
            <span className="flex-1 font-bold text-[13px] text-[#1d3557]">
              Mental health
            </span>
            <div className="bg-[#fff4ce] flex gap-1 items-center px-2 py-0.5 rounded">
              <img src={iconWarningAmber} alt="" className="size-2.5" />
              <span className="font-bold text-[10px] text-[#7a5900]">
                SCREENING DUE
              </span>
            </div>
            {chevron(mhOpen)}
          </button>
          {mhOpen && (
            <div className="px-4 py-3 space-y-3">
              {/* Screening warning */}
              <div className="bg-[#fffbf0] border border-[#e8a917] flex gap-2.5 items-start px-4 py-3">
                <img
                  src={iconWarnYellow2}
                  alt=""
                  className="size-4 mt-0.5 shrink-0"
                />
                <p className="font-bold text-[12px] text-[#7a5900]">
                  Formal perinatal mental health screening has not yet been
                  completed. Complete at this appointment.
                </p>
              </div>

              {/* Anxiety history */}
              <div className="bg-white border border-[#d5dce0] px-4 py-3">
                <div className="flex items-start justify-between">
                  <div>
                    <p className="font-semibold text-[11px] text-[#3d5166] tracking-[0.275px] uppercase">
                      Anxiety history (connected system)
                    </p>
                    <p className="font-semibold text-[12px] text-[#da291c] mt-0.5">
                      Previous anxiety leading to panic attacks — recorded in
                      GP/Rio
                    </p>
                  </div>
                  <span className="text-[10px] text-[#4a6a85] shrink-0 ml-4">
                    GP and Rio (connected system)
                  </span>
                </div>
              </div>

              {/* CMHT + Psychiatric meds */}
              <div className="bg-white border border-[#d5dce0] px-4">
                <div className="border-b border-[#edf0f2] py-2 flex items-start justify-between">
                  <div>
                    <p className="font-semibold text-[11px] text-[#3d5166] tracking-[0.275px] uppercase">
                      CMHT involvement
                    </p>
                    <p className="text-[12px] text-[#1d3557] mt-0.5">
                      No current CMHT involvement recorded
                    </p>
                  </div>
                  <span className="text-[10px] text-[#4a6a85] shrink-0 ml-4">
                    Connected Record
                  </span>
                </div>
                <div className="border-b border-[#edf0f2] py-2 flex items-start justify-between">
                  <div>
                    <p className="font-semibold text-[11px] text-[#3d5166] tracking-[0.275px] uppercase">
                      Current psychiatric medications
                    </p>
                    <p className="text-[12px] text-[#1d3557] mt-0.5">
                      No current psychiatric medications recorded
                    </p>
                  </div>
                  <span className="text-[10px] text-[#4a6a85] shrink-0 ml-4">
                    Connected Record
                  </span>
                </div>
                <div className="bg-[#fffbf0] border border-[#e8a917] flex gap-2 items-start px-3 py-2 my-3">
                  <img
                    src={iconQuestion}
                    alt=""
                    className="size-3 mt-0.5 shrink-0"
                  />
                  <p className="italic text-[11px] text-[#7a5900]">
                    Has patient been prescribed anxiolytics or antidepressants
                    previously?
                  </p>
                </div>
              </div>

              {/* Screening and assessments */}
              <div>
                <div className="border-b border-[#e8ecef] pb-1 mb-1.5">
                  <p className="font-bold text-[11px] text-[#005eb8] tracking-[0.275px] uppercase">
                    Screening and assessments
                  </p>
                </div>
                <table className="w-full text-[12px]">
                  <thead>
                    <tr className="border-b border-[#edf0f2]">
                      {[
                        "Date",
                        "Tool",
                        "Score",
                        "Risk level",
                        "Clinician",
                        "Source",
                      ].map((h) => (
                        <th
                          key={h}
                          className="text-left font-semibold text-[12px] text-[#3d5166] py-1.5 pr-3"
                        >
                          {h}
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    <tr className="border-b border-[#edf0f2]">
                      <td className="py-2 pr-3 text-[#3d5166]">
                        15 August 2026
                      </td>
                      <td className="py-2 pr-3 font-medium text-[#1d3557]">
                        Edinburgh Postnatal Depression Scale
                      </td>
                      <td className="py-2 pr-3 text-[#1d3557]">11/30</td>
                      <td className="py-2 pr-3 text-[#1d3557]">
                        Borderline – follow up
                      </td>
                      <td className="py-2 pr-3 text-[#4a6a85]">Booking</td>
                      <td className="py-2 text-[#3d5166]">
                        Patient reports low mood and poor sleep. Denies
                        self-harm.
                      </td>
                    </tr>
                    <tr className="border-b border-[#edf0f2]">
                      <td className="py-2 pr-3 text-[#3d5166]">
                        15 September 2026
                      </td>
                      <td className="py-2 pr-3 font-medium text-[#1d3557]">
                        GAD-7
                      </td>
                      <td className="py-2 pr-3 text-[#1d3557]">9/21</td>
                      <td className="py-2 pr-3 text-[#1d3557]">
                        Moderate anxiety
                      </td>
                      <td className="py-2 pr-3 text-[#4a6a85]">
                        Perinatal mental health team
                      </td>
                      <td className="py-2 text-[#3d5166]">
                        Anxiety related to health + language barrier.
                      </td>
                    </tr>
                    <tr>
                      <td className="py-2 pr-3 text-[#3d5166]">
                        15 September 2026
                      </td>
                      <td className="py-2 pr-3 font-medium text-[#1d3557]">
                        Risk review
                      </td>
                      <td className="py-2 pr-3 text-[#1d3557]">N/A</td>
                      <td className="py-2 pr-3 text-[#1d3557]">
                        No immediate risk disclosed
                      </td>
                      <td className="py-2 pr-3 text-[#4a6a85]">
                        Perinatal mental health team
                      </td>
                      <td className="py-2 text-[#3d5166]">
                        Safety plan reviewed; emergency contacts confirmed.
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>

              {/* Contact history */}
              <div>
                <div className="border-b border-[#e8ecef] pb-1 mb-1.5">
                  <p className="font-bold text-[12px] text-[#005eb8]">
                    Contact history
                  </p>
                </div>
                <table className="w-full text-[12px]">
                  <thead>
                    <tr className="border-b border-[#edf0f2]">
                      {[
                        "Date",
                        "Service",
                        "Type",
                        "Clinician",
                        "Interpreter",
                        "Outcome",
                      ].map((h) => (
                        <th
                          key={h}
                          className="text-left font-semibold text-[12px] text-[#3d5166] py-1.5 pr-3"
                        >
                          {h}
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    <tr className="border-b border-[#edf0f2]">
                      <td className="py-2 pr-3 text-[#3d5166]">
                        15 September 2026
                      </td>
                      <td className="py-2 pr-3 font-medium text-[#1d3557]">
                        Perinatal mental health
                      </td>
                      <td className="py-2 pr-3 text-[#3d5166]">
                        Telephone assessment
                      </td>
                      <td className="py-2 pr-3 text-[#3d5166]">
                        Perinatal mental health practitioner
                      </td>
                      <td className="py-2 pr-3 text-[#3d5166]">
                        Urdu (Booked)
                      </td>
                      <td className="py-2 text-[#3d5166]">
                        Wellbeing assessment completed. Safety plan reviewed.
                        Follow-up offered in 2–4 weeks.
                      </td>
                    </tr>
                    <tr>
                      <td className="py-2 pr-3 text-[#3d5166]">
                        22 September 2026
                      </td>
                      <td className="py-2 pr-3 font-medium text-[#1d3557]">
                        Perinatal mental health
                      </td>
                      <td className="py-2 pr-3 text-[#3d5166]">
                        Advice to midwifery
                      </td>
                      <td className="py-2 pr-3 text-[#3d5166]">
                        Perinatal mental health team
                      </td>
                      <td className="py-2 pr-3 text-[#3d5166]">N/A</td>
                      <td className="py-2 text-[#3d5166]">
                        Shared key points for booking: private discussion
                        recommended; confirm support network; review Sertraline
                        continuation.
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>

              {/* Wellbeing + Safety plan */}
              <div className="grid grid-cols-2 gap-3">
                <div className="border border-[#d5dce0]">
                  <div className="bg-[#f5f7fa] border-b border-[#d5dce0] flex items-center justify-between px-4 py-2.5 rounded-t-lg">
                    <div>
                      <p className="font-bold text-[12px] text-[#1d3557]">
                        Wellbeing support plan (summary)
                      </p>
                      <p className="text-[10px] text-[#4a6a85]">
                        Last updated: 15 September 2026
                      </p>
                    </div>
                    <div className="flex items-center gap-1">
                      <img src={iconLink} alt="" className="size-2.5" />
                      <span className="font-semibold text-[12px] text-[#005eb8]">
                        View care plans
                      </span>
                    </div>
                  </div>
                  <ul className="px-4 py-3 space-y-1.5">
                    {[
                      "Continue Sertraline 50mg (review risks/benefits; avoid abrupt stopping)",
                      "Identify a named contact in maternity for questions between visits",
                      "Offer information in Urdu where available",
                      "Agree safety plan: who to call if mood worsens",
                      "Screen again at 16w and 28w, earlier if concerns",
                    ].map((item, i) => (
                      <li key={i} className="flex gap-1.5 text-[12px]">
                        <span className="text-[#005eb8] shrink-0">•</span>
                        <span className="text-[#1d3557]">{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
                <div className="border border-[#d5dce0]">
                  <div className="bg-[#f5f7fa] border-b border-[#d5dce0] px-4 py-2.5 rounded-t-lg">
                    <p className="font-bold text-[12px] text-[#1d3557]">
                      Safety plan
                    </p>
                  </div>
                  <div className="px-4 py-2">
                    <div className="border-b border-[#edf0f2] py-2 flex items-start justify-between">
                      <div>
                        <p className="font-semibold text-[11px] text-[#3d5166] tracking-[0.275px] uppercase">
                          Crisis line
                        </p>
                        <p className="text-[12px] text-[#1d3557] mt-0.5">
                          Local crisis line (24/7) — demo number 0800 000 000
                        </p>
                      </div>
                      <span className="text-[10px] text-[#4a6a85] ml-4 shrink-0">
                        Connected Record
                      </span>
                    </div>
                    <div className="py-2 flex items-start justify-between">
                      <div>
                        <p className="font-semibold text-[11px] text-[#3d5166] tracking-[0.275px] uppercase">
                          Maternity triage
                        </p>
                        <p className="text-[12px] text-[#1d3557] mt-0.5">
                          Maternity triage — demo number 01524 555 999
                        </p>
                      </div>
                      <span className="text-[10px] text-[#4a6a85] ml-4 shrink-0">
                        BadgerNet
                      </span>
                    </div>
                    <ul className="pb-3 space-y-1.5">
                      {[
                        "Ask about thoughts of self-harm in a private setting (with interpreter).",
                        "Confirm patient knows how to access urgent support.",
                      ].map((item, i) => (
                        <li key={i} className="flex gap-1.5 text-[12px]">
                          <span className="text-[#005eb8] shrink-0">•</span>
                          <span className="text-[#1d3557]">{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>

              {/* Clinical note */}
              <div className="bg-[#f5f7fa] border border-[#4a6a85] flex gap-2.5 items-start px-4 py-3">
                <img src={iconNote} alt="" className="size-4 mt-0.5 shrink-0" />
                <p className="text-[12px]">
                  <span className="font-semibold text-[#3d5166]">
                    Clinical note:{" "}
                  </span>
                  <span className="text-[#1d3557]">
                    Mental health history may be under-reported due to language
                    barrier and limited prior NHS engagement — clinical
                    judgement required.
                  </span>
                </p>
              </div>

              {/* Suggested Actions */}
              <div>
                <div className="border-b border-[#e8ecef] pb-1 mb-1.5">
                  <p className="font-bold text-[11px] text-[#005eb8] tracking-[0.275px] uppercase">
                    Suggested Actions (Connected Record)
                  </p>
                </div>
                <div className="space-y-2">
                  <div className="bg-white border border-[#e8ecef] flex items-start justify-between px-4 py-3">
                    <div>
                      <p className="font-semibold text-[12px] text-[#1d3557]">
                        Complete private wellbeing discussion with interpreter
                        (incl. safety questions)
                      </p>
                      <p className="text-[10px] text-[#4a6a85]">
                        Category: Booking
                      </p>
                    </div>
                    <span className="bg-[#da291c] text-white text-[10px] font-semibold px-2 py-0.5 rounded ml-4 shrink-0">
                      High
                    </span>
                  </div>
                  <div className="bg-white border border-[#e8ecef] flex items-start justify-between px-4 py-3">
                    <div>
                      <p className="font-semibold text-[12px] text-[#1d3557]">
                        Confirm Sertraline plan in pregnancy and document shared
                        decision
                      </p>
                      <div className="flex items-center gap-1 mt-0.5">
                        <span className="text-[10px] text-[#4a6a85]">
                          Category: Medication
                        </span>
                        <div className="flex items-center gap-1 ml-2">
                          <img src={iconLink} alt="" className="size-2.5" />
                          <span className="font-semibold text-[12px] text-[#005eb8]">
                            View care plans
                          </span>
                        </div>
                      </div>
                    </div>
                    <span className="bg-[#005eb8] text-white text-[10px] font-semibold px-2 py-0.5 rounded ml-4 shrink-0">
                      Medium
                    </span>
                  </div>
                  <div className="bg-white border border-[#e8ecef] flex items-start justify-between px-4 py-3">
                    <div>
                      <p className="font-semibold text-[12px] text-[#1d3557]">
                        Book a follow-up mental health check-in with the routine
                        appointment
                      </p>
                      <div className="flex items-center gap-1 mt-0.5">
                        <span className="text-[10px] text-[#4a6a85]">
                          Category: Follow-up
                        </span>
                        <div className="flex items-center gap-1 ml-2">
                          <img src={iconLink} alt="" className="size-2.5" />
                          <span className="font-semibold text-[12px] text-[#005eb8]">
                            View in Appointments
                          </span>
                        </div>
                      </div>
                    </div>
                    <span className="bg-[#005eb8] text-white text-[10px] font-semibold px-2 py-0.5 rounded ml-4 shrink-0">
                      Medium
                    </span>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Social complexity */}
        <div className="bg-white border border-[#d5dce0]">
          <button
            data-section-toggle
            aria-expanded={socialOpen}
            className="bg-[#f5f7fa] border-b border-[#d5dce0] flex gap-2 items-center px-4 py-3 rounded-t-lg w-full text-left"
            onClick={() => setSocialOpen((o) => !o)}
          >
            <img src={iconChevronRight} alt="" className="size-3.5" />
            <img src={iconSocial} alt="" className="size-3.5" />
            <span className="flex-1 font-bold text-[13px] text-[#1d3557]">
              Social complexity
            </span>
            {chevron(socialOpen)}
          </button>
          {socialOpen && (
            <div className="px-4 py-3 space-y-3">
              <div className="bg-white border border-[#d5dce0] px-4">
                <div className="border-b border-[#edf0f2] flex items-center justify-between py-2">
                  <span className="text-[12px] text-[#1d3557]">
                    Previous children's services involvement
                  </span>
                  <span className="font-semibold text-[12px] text-[#e8a917]">
                    Unknown
                  </span>
                </div>
                <div className="border-b border-[#edf0f2] flex items-center justify-between py-2">
                  <span className="text-[12px] text-[#1d3557]">
                    Current children's services involvement
                  </span>
                  <span className="font-semibold text-[12px] text-[#2d7a3e]">
                    No
                  </span>
                </div>
                <div className="flex items-center justify-between py-2">
                  <span className="text-[12px] text-[#1d3557]">
                    Previous domestic violence
                  </span>
                  <span className="font-semibold text-[12px] text-[#e8a917]">
                    Unknown
                  </span>
                </div>
              </div>
              <div className="bg-[#fffbf0] border border-[#e8a917] flex gap-2.5 items-start px-4 py-3">
                <img
                  src={iconCauseForConcern}
                  alt=""
                  className="size-4 mt-0.5 shrink-0"
                />
                <p className="text-[12px]">
                  <span className="font-bold text-[#7a5900]">
                    Cause for concern:{" "}
                  </span>
                  <span className="text-[#1d3557]">
                    Social complexity flagged in referral (language barrier,
                    limited extended family locally)
                  </span>
                  <span className="text-[10px] text-[#4a6a85] ml-2">
                    — GP Referral
                  </span>
                </p>
              </div>
            </div>
          )}
        </div>

        {/* Current medicines */}
        <div className="bg-white border border-[#d5dce0]">
          <button
            data-section-toggle
            aria-expanded={medsOpen}
            className="bg-[#f5f7fa] border-b border-[#d5dce0] flex gap-2 items-center px-4 py-3 rounded-t-lg w-full text-left"
            onClick={() => setMedsOpen((o) => !o)}
          >
            <img src={iconChevronRight} alt="" className="size-3.5" />
            <img src={iconMeds} alt="" className="size-3.5" />
            <span className="flex-1 font-bold text-[13px] text-[#1d3557]">
              Current medicines
            </span>
            {chevron(medsOpen)}
          </button>
          {medsOpen && (
            <div className="px-4 py-3 overflow-x-auto">
              <table className="w-full text-[12px]">
                <thead>
                  <tr className="border-b border-[#edf0f2]">
                    {[
                      "Medication",
                      "Dose",
                      "Frequency",
                      "Prescriber",
                      "Source",
                    ].map((h) => (
                      <th
                        key={h}
                        className="text-left font-semibold text-[10px] text-[#3d5166] tracking-[0.25px] uppercase py-1.5 pr-3"
                      >
                        {h}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  <tr className="border-b border-[#edf0f2]">
                    <td className="py-2 pr-3 font-medium text-[#1d3557]">
                      Sertraline
                    </td>
                    <td className="py-2 pr-3 text-[#1d3557]">50 mg</td>
                    <td className="py-2 pr-3 text-[#3d5166]">Once daily</td>
                    <td className="py-2 pr-3 text-[#3d5166]">
                      Dr Sarah Wilson (GP)
                    </td>
                    <td className="py-2">
                      <div className="flex items-center gap-1">
                        <img src={iconLink} alt="" className="size-2.5" />
                        <span className="font-semibold text-[#005eb8]">
                          GP Record
                        </span>
                      </div>
                    </td>
                  </tr>
                  <tr>
                    <td className="py-2 pr-3 font-medium text-[#1d3557]">
                      Prenatal Vitamins
                    </td>
                    <td className="py-2 pr-3 text-[#1d3557]">Standard</td>
                    <td className="py-2 pr-3 text-[#3d5166]">Once daily</td>
                    <td className="py-2 pr-3 text-[#3d5166]">Midwife</td>
                    <td className="py-2 text-[#4a6a85]">BadgerNet</td>
                  </tr>
                </tbody>
              </table>
            </div>
          )}
        </div>

        <p className="text-[11px] text-[#4a6a85]">
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
                },
                {
                  icon: iconGP,
                  name: "GP record",
                  time: "5 October 2026, 8:45am",
                  badge: "Connected",
                  badgeColor: "bg-[#2d7a3e]",
                  badgeIcon: iconConnected,
                },
                {
                  icon: iconLab,
                  name: "Lab results",
                  time: "5 October 2026, 7:30am",
                  badge: "Connected",
                  badgeColor: "bg-[#2d7a3e]",
                  badgeIcon: iconConnected,
                },
                {
                  icon: iconDiab,
                  name: "Diabetes service",
                  time: "4 October 2026, 4:20pm",
                  badge: "Connected",
                  badgeColor: "bg-[#2d7a3e]",
                  badgeIcon: iconConnected,
                },
                {
                  icon: iconPMH,
                  name: "Perinatal mental health",
                  time: "3 October 2026, 2:05pm",
                  badge: "Connected",
                  badgeColor: "bg-[#2d7a3e]",
                  badgeIcon: iconConnected,
                },
                {
                  icon: iconUS,
                  name: "Ultrasound department",
                  time: "30 September 2026, 11:40am",
                  badge: "Connected",
                  badgeColor: "bg-[#2d7a3e]",
                  badgeIcon: iconConnected,
                },
                {
                  icon: iconInterp,
                  name: "Interpreter booking",
                  time: "5 October 2026, 9am",
                  badge: "Connected",
                  badgeColor: "bg-[#2d7a3e]",
                  badgeIcon: iconConnected,
                },
                {
                  icon: iconSocSupport,
                  name: "Social support and community",
                  time: "1 October 2026, 10:15am",
                  badge: "Limited",
                  badgeColor: "bg-[#e8a917]",
                  badgeIcon: iconLimitedAmber,
                },
              ].map((sys, i) => (
                <div
                  key={i}
                  className={`bg-white border ${sys.badge === "Limited" ? "border-[#ffe0a0]" : "border-[#b8dfc8]"} flex gap-2 items-center px-3 py-2`}
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
