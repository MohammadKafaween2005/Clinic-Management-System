import NextPatientCard from "./NextPatientCard";
import TodaySchedule from "./TodaySchedule";
import DashboardSidePanel from "./DashboardSidePanel";

export default function DoctorHome() {
  return (
    <section className="doctor-home">

      <NextPatientCard />

      <div className="doctor-home-grid">
        <TodaySchedule />
        <DashboardSidePanel />
      </div>

    </section>
  );
}