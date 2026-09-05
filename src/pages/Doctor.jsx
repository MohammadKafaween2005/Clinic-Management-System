import { useContext, useState } from "react";

import { DoctorContext } from "../context/DoctorContext";
import DoctorProvider from "../context/DoctorProvider";
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

  const [selectedPatientId, setSelectedPatientId] = useState(null);

  return (
    <div className="doctor-page">
      <DoctorSidebar />

      <main className="doctor-content">
        <DoctorHeader />

        {section === "home" && (
          <DoctorHome setSelectedPatientId={setSelectedPatientId} />
        )}
        {section === "schedule" && <DoctorSchedule />}

        {section === "patients" && (
          <DoctorPatients setSelectedPatientId={setSelectedPatientId} />
        )}

        {section === "profile" && <DoctorProfile />}

        {section === "record" && (
          <DoctorViewRecord patientId={selectedPatientId} />
        )}
      </main>
    </div>
  );
}
