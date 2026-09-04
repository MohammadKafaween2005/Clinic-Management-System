import { useContext } from "react";
import { PatientContext } from "../../context/PatientContext";

export default function PatientHeader() {
  const { section } = useContext(PatientContext);

  const titles = {
    home: "My Dashboard",
    appointments: "My Appointments",
    bookAppointment: "Book Appointment",
    profile: "My Profile",
  };

  const breadcrumbTitles = {
    home: "Dashboard",
    appointments: "Appointments",
    bookAppointment: "Book Appointment",
    profile: "Profile",
  };

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

        <div className="patient-header-avatar" title="James Thornton">
          JT
        </div>
      </div>
    </header>
  );
}
