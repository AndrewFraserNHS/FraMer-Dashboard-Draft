import { formatDate } from "../data/patient";
import { useDetailPanel } from "../hooks/useDetailPanel";
import { DataSection } from "../components/ui/DataSection";
import { DataTable } from "../components/ui/DataTable";
import { DetailList } from "../components/ui/DetailList";
import { RecordPage } from "../components/ui/RecordPage";
import { StatusTag, TagTone } from "../components/ui/StatusTag";
import { dateKey } from "../utils/sort";

type Appointment = {
  date: string;
  time: string;
  visitType: string;
  clinic: string;
  interpreter: string;
  status: "Completed" | "Today" | "Booked";
  outcome: string;
};

const statusTone: Record<Appointment["status"], TagTone> = {
  Completed: "green",
  Today: "blue",
  Booked: "grey",
};

const appointments: readonly Appointment[] = [
  { date: formatDate("2026-08-15"), time: "10am", visitType: "Booking appointment", clinic: "Community Midwifery - Central", interpreter: "Urdu (Booked)", status: "Completed", outcome: "Booking completed. Interpreter used. Baseline observations recorded. Risk factors identified and referrals initiated." },
  { date: formatDate("2026-09-05"), time: "9:15am", visitType: "Phlebotomy and oral glucose tolerance test", clinic: "Antenatal Clinic", interpreter: "Not required", status: "Completed", outcome: "Oral glucose tolerance test completed and HbA1c sample taken. Gestational diabetes mellitus confirmed and referral made to the Diabetes Antenatal Clinic." },
  { date: formatDate("2026-09-12"), time: "1:30pm", visitType: "Diabetes clinic", clinic: "Diabetes Antenatal Clinic", interpreter: "Urdu (Telephone)", status: "Completed", outcome: "Gestational diabetes mellitus management plan agreed. Metformin 500mg commenced. Glucose monitoring 4 times a day. Dietitian referral requested." },
  { date: formatDate("2026-09-15"), time: "3pm", visitType: "Perinatal mental health contact", clinic: "Community Perinatal Service", interpreter: "Urdu (Booked)", status: "Completed", outcome: "Wellbeing assessment completed. Support plan updated. Safety plan reviewed." },
  { date: formatDate("2026-09-25"), time: "9:40am", visitType: "28-week growth scan", clinic: "Ultrasound department", interpreter: "Urdu (Booked)", status: "Completed", outcome: "Growth appropriate. Amniotic fluid index normal. Presentation cephalic. Follow-up 36-week scan booked." },
  { date: formatDate("2026-10-05"), time: "9am", visitType: "34-week routine review", clinic: "Community Midwifery - Central", interpreter: "Urdu (Booked)", status: "Today", outcome: "" },
  { date: formatDate("2026-10-16"), time: "11:10am", visitType: "36-week growth scan", clinic: "Ultrasound department", interpreter: "Urdu (Booked)", status: "Booked", outcome: "Scheduled due to gestational diabetes mellitus pathway." },
];

export default function Appointments() {
  const openPanel = useDetailPanel();

  function view(appointment: Appointment) {
    openPanel({
      eyebrow: "Appointment detail",
      title: appointment.visitType,
      status: appointment.status,
      content: (
        <DetailList
          rows={[
            ["Date and time", `${appointment.date}, ${appointment.time}`],
            ["Visit type", appointment.visitType],
            ["Clinic", appointment.clinic],
            ["Interpreter", appointment.interpreter],
            ["Status", appointment.status],
            ["Outcome", appointment.outcome || "Not yet recorded"],
          ]}
        />
      ),
    });
  }

  return (
    <RecordPage title="Appointments">
      <DataSection title="Appointments" summary={`${appointments.length} items`}>
        <DataTable
          caption="Appointments"
          rows={appointments}
          rowKey={(appointment) => `${appointment.date}-${appointment.visitType}`}
          onView={view}
          viewLabel={(appointment) => `View ${appointment.visitType}, ${appointment.date}`}
          columns={[
            {
              header: "Date and time",
              cell: (a) => (
                <>
                  <strong>{a.date}</strong>
                  <small>{a.time}</small>
                </>
              ),
              sort: (a) => dateKey(a.date),
            },
            { header: "Visit type", cell: (a) => <strong>{a.visitType}</strong>, sort: (a) => a.visitType },
            { header: "Clinic", cell: (a) => a.clinic, sort: (a) => a.clinic },
            { header: "Interpreter", cell: (a) => a.interpreter, sort: (a) => a.interpreter },
            { header: "Status", cell: (a) => <StatusTag tone={statusTone[a.status]}>{a.status}</StatusTag>, sort: (a) => a.status },
            { header: "Outcome", cell: (a) => a.outcome || "Not yet recorded" },
          ]}
          defaultSort={{ header: "Date and time", direction: "ascending" }}
        />
      </DataSection>
    </RecordPage>
  );
}
