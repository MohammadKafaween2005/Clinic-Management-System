import { useContext, useEffect, useState } from "react";
import axios from "axios";
import { PatientContext } from "../../context/PatientContext";

export default function PatientHeader() {
  const { section } = useContext(PatientContext);

  const [patient, setPatient] = useState(null);

  const user = JSON.parse(localStorage.getItem("user"));

  const titles = {
    home: "My Dashboard",
    appointments: "My Appointments",
    bookAppointment: "Book Appointment",
    reschedule: "Reschedule Appointment",
    profile: "My Profile",
  };

  const breadcrumbTitles = {
    home: "Dashboard",
    appointments: "Appointments",
    bookAppointment: "Book Appointment",
    reschedule: "Reschedule",
    profile: "Profile",
  };
  useEffect(() => {
    const fetchPatient = async () => {
      try {
        const response = await axios.get(
          `http://localhost:5000/api/profile/patient/${user.profile_id}`,
        );

        setPatient(response.data);
      } catch (error) {
        console.error("Could not load patient header:", error);
      }
    };

    fetchPatient();
  }, [user.profile_id]);

  const initials = patient
    ? `${patient.first_name.charAt(0)}${patient.last_name.charAt(0)}`
    : "";

  const fullName = patient
    ? `${patient.first_name} ${patient.last_name}`
    : "Patient";

  return (
    <header className="patient-header">
      <div className="patient-header-left">
        <div className="patient-breadcrumb">
          <span>Patient</span>
          <span>›</span>
          <strong>{breadcrumbTitles[section]}</strong>
        </div>

        <h1>{titles[section]}</h1>
      </div>

      <div className="patient-header-right">
        <button
          type="button"
          className="patient-notification"
          title="Notifications"
        >
          ♧<span className="patient-notification-dot"></span>
        </button>

        <div className="patient-header-avatar" title={fullName}>
          {initials}
        </div>
      </div>
    </header>
  );
}
