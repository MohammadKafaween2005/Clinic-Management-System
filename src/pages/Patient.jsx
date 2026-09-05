import { useContext, useState } from "react";

import PatientProvider from "../context/PatientProvider";
import { PatientContext } from "../context/PatientContext";

import PatientSidebar from "../components/patientcomponents/PatientSidebar";
import PatientHeader from "../components/patientcomponents/PatientHeader";
import PatientHome from "../components/patientcomponents/PatientHome";
import PatientAppointments from "../components/patientcomponents/PatientAppointments";
import PatientBookAppointment from "../components/patientcomponents/PatientBookAppointment";
import PatientReschedule from "../components/patientcomponents/PatientReschedule";
import PatientProfile from "../components/patientcomponents/PatientProfile";

export default function Patient() {
  return (
    <PatientProvider>
      <PatientPage />
    </PatientProvider>
  );
}

function PatientPage() {
  const { section } = useContext(PatientContext);

  const [selectedAppointment, setSelectedAppointment] = useState(null);

  return (
    <div className="patient-page">
      <PatientSidebar />

      <main className="patient-content">
        <PatientHeader />

        {section === "home" && (
          <PatientHome setSelectedAppointment={setSelectedAppointment} />
        )}

        {section === "appointments" && (
          <PatientAppointments
            setSelectedAppointment={setSelectedAppointment}
          />
        )}

        {section === "bookAppointment" && <PatientBookAppointment />}

        {section === "reschedule" && (
          <PatientReschedule appointment={selectedAppointment} />
        )}

        {section === "profile" && <PatientProfile />}
      </main>
    </div>
  );
}
