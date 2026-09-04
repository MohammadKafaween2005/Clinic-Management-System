import { useContext } from "react";
import { ReceptionistContext } from "../../context/ReceptionistContext";

export default function ReceptionistHeader() {
  const { section } = useContext(ReceptionistContext);

  const titles = {
    home: "Dashboard",
    appointments: "Appointments",
    patients: "Patients",
    register: "Register Patient",
    profile: "Profile",
    newAppointment: "Book Appointment",
    patientProfile: "Patient Profile",
  };

  const currentTitle = titles[section];

  return (
    <header className="receptionist-header">
      <div className="receptionist-header-left">
        <div className="receptionist-breadcrumb">
          <span>Receptionist</span>
          <span>›</span>
          <strong>{currentTitle}</strong>
        </div>

        <h2>{currentTitle}</h2>
      </div>

      <div className="receptionist-header-right">
        <button
          type="button"
          className="receptionist-notification-button"
          title="Notifications"
        >
          ♧<span className="notification-dot"></span>
        </button>

        <div className="receptionist-header-avatar" title="Elham">
          E
        </div>
      </div>
    </header>
  );
}
