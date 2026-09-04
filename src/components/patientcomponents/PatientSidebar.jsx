import { useContext } from "react";
import { Link } from "react-router-dom";
import { PatientContext } from "../../context/PatientContext";

export default function PatientSidebar() {
  const { section, setSection } = useContext(PatientContext);

  return (
    <aside className="patient-sidebar">
      <div className="patient-sidebar-brand">
        <div className="patient-sidebar-logo">HK</div>

        <div className="patient-sidebar-clinic">Dr. Hani Kafaween Clinic</div>

        <span className="patient-sidebar-collapse">‹</span>
      </div>

      <nav className="patient-sidebar-nav">
        <button
          type="button"
          className={`patient-sidebar-link ${
            section === "home" ? "active" : ""
          }`}
          onClick={() => setSection("home")}
        >
          <span className="patient-sidebar-icon">▦</span>
          <span>Home</span>
        </button>

        <button
          type="button"
          className={`patient-sidebar-link ${
            section === "appointments" ? "active" : ""
          }`}
          onClick={() => setSection("appointments")}
        >
          <span className="patient-sidebar-icon">▣</span>
          <span>My Appointments</span>
        </button>

        <button
          type="button"
          className={`patient-sidebar-link ${
            section === "bookAppointment" ? "active" : ""
          }`}
          onClick={() => setSection("bookAppointment")}
        >
          <span className="patient-sidebar-icon">＋</span>
          <span>Book Appointment</span>
        </button>

        <button
          type="button"
          className={`patient-sidebar-link ${
            section === "profile" ? "active" : ""
          }`}
          onClick={() => setSection("profile")}
        >
          <span className="patient-sidebar-icon">♙</span>
          <span>Profile</span>
        </button>
      </nav>

      <div className="patient-sidebar-bottom">
        <div className="patient-sidebar-user">
          <strong>James Thornton</strong>
          <span>Patient</span>
        </div>

        <Link to="/" className="patient-sidebar-logout">
          <span>↪</span>
          Logout
        </Link>
      </div>
    </aside>
  );
}
