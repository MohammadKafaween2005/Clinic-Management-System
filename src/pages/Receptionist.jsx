import { useContext, useState } from "react";

import ReceptionistProvider from "../context/ReceptionistProvider";
import { ReceptionistContext } from "../context/ReceptionistContext";

import NewAppointment from "../components/receptionistcomponents/NewAppointment";
import ReceptionistSidebar from "../components/receptionistcomponents/ReceptionistSidebar";
import ReceptionistHeader from "../components/receptionistcomponents/ReceptionistHeader";
import ReceptionistHome from "../components/receptionistcomponents/ReceptionistHome";
import ReceptionistAppointments from "../components/receptionistcomponents/ReceptionistAppointments";
import ReceptionistPatientProfile from "../components/receptionistcomponents/ReceptionistPatientProfile";
import ReceptionistPatients from "../components/receptionistcomponents/ReceptionistPatients";
import RegisterPatient from "../components/receptionistcomponents/RegisterPatient";
import ReceptionistProfile from "../components/receptionistcomponents/ReceptionistProfile";

export default function Receptionist() {
  return (
    <ReceptionistProvider>
      <ReceptionistPage />
    </ReceptionistProvider>
  );
}

function ReceptionistPage() {
  const { section } = useContext(ReceptionistContext);

  const [selectedPatientId, setSelectedPatientId] = useState(null);

  return (
    <div className="receptionist-page">
      <ReceptionistSidebar />

      <main className="receptionist-content">
        <ReceptionistHeader />
        {section === "home" && (
          <ReceptionistHome setSelectedPatientId={setSelectedPatientId} />
        )}
        {section === "patients" && (
          <ReceptionistPatients setSelectedPatientId={setSelectedPatientId} />
        )}
        {section === "appointments" && (
          <ReceptionistAppointments
            setSelectedPatientId={setSelectedPatientId}
          />
        )}{" "}
        {section === "newAppointment" && <NewAppointment />}
        {section === "patientProfile" && (
          <ReceptionistPatientProfile patientId={selectedPatientId} />
        )}
        {section === "register" && <RegisterPatient />}
        {section === "profile" && <ReceptionistProfile />}
      </main>
    </div>
  );
}
