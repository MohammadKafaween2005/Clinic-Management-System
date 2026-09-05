import { useContext } from "react";
import { useNavigate } from "react-router-dom";

import { DoctorContext } from "../../context/DoctorContext";

export default function DoctorSidebar() {
  const { section, setSection } = useContext(DoctorContext);
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("user");
    navigate("/Login");
  };

  return (
    <aside className="doctor-sidebar">
      <div className="sidebar-brand">
        <span className="sidebar-logo">HK</span>

        <span className="sidebar-clinic-name">Dr. Hani Kafaween Clinic</span>
      </div>

      <nav className="sidebar-nav">
        <button
          className={`sidebar-link ${section === "home" ? "active" : ""}`}
          onClick={() => setSection("home")}
        >
          <span className="sidebar-icon">▦</span>
          Home
        </button>

        <button
          className={`sidebar-link ${section === "schedule" ? "active" : ""}`}
          onClick={() => setSection("schedule")}
        >
          <span className="sidebar-icon">□</span>
          Schedule
        </button>

        <button
          className={`sidebar-link ${section === "patients" ? "active" : ""}`}
          onClick={() => setSection("patients")}
        >
          <span className="sidebar-icon">♙</span>
          Patients
        </button>

        <button
          className={`sidebar-link ${section === "profile" ? "active" : ""}`}
          onClick={() => setSection("profile")}
        >
          <span className="sidebar-icon">○</span>
          Profile
        </button>
      </nav>

      <div className="sidebar-bottom">
        <div className="sidebar-doctor">
          <h4>Dr. Hani Kafaween</h4>
          <p>Doctor</p>
        </div>

        <button type="button" className="sidebar-logout" onClick={handleLogout}>
          <span>↪</span>
          Logout
        </button>
      </div>
    </aside>
  );
}
