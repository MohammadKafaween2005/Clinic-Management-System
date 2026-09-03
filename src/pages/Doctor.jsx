import { useContext } from "react";

import { DoctorContext, DoctorProvider } from "../context/DoctorContext";

import DoctorSidebar from "../components/doctorcomponents/DoctorSidebar";
import DoctorHeader from "../components/doctorcomponents/DoctorHeader";
import DoctorProfile from "../components/doctorcomponents/DoctorProfile";
import DoctorPatients from "../components/doctorcomponents/DoctorPatients";
import DoctorSchedule from "../components/doctorcomponents/DoctorSchedule";
import DoctorHome from "../components/doctorcomponents/DoctorHome";
import DoctorViewRecord from "../components/doctorcomponents/DoctorViewRecord";

export default function Doctor() {
  return (
    <DoctorProvider>
      <DoctorPage />
    </DoctorProvider>
  );
}

function DoctorPage() {
  const { section } = useContext(DoctorContext);

  return (
    <div className="doctor-page">
      <DoctorSidebar />

      <main className="doctor-content">
        <DoctorHeader />

        {section === "home" && <DoctorHome />}

        {section === "schedule" && <DoctorSchedule />}

        {section === "patients" && <DoctorPatients />}

        {section === "profile" && <DoctorProfile />}

        {section === "record" && <DoctorViewRecord />}
      </main>
    </div>
  );
}
