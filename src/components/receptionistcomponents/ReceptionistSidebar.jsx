import { useContext } from "react";
import { Link } from "react-router-dom";
import { ReceptionistContext } from "../../context/ReceptionistContext";

export default function ReceptionistSidebar() {
  const { section, setSection } = useContext(ReceptionistContext);

  return (
    <aside className="receptionist-sidebar">
      <div className="receptionist-brand">
        <div className="receptionist-logo">M</div>

        <div className="receptionist-clinic-name">Dr. Hani Kafaween Clinic</div>

        <span className="sidebar-collapse">‹</span>
      </div>

      <nav className="receptionist-nav">
        <button
          className={`receptionist-nav-item ${
            section === "home" ? "active" : ""
          }`}
          onClick={() => setSection("home")}
        >
          <span className="receptionist-nav-icon">▦</span>

          <span>Home</span>
        </button>

        <button
          className={`receptionist-nav-item ${
            section === "appointments" ? "active" : ""
          }`}
          onClick={() => setSection("appointments")}
        >
          <span className="receptionist-nav-icon">▣</span>

          <span>Appointments</span>
        </button>

        <button
          className={`receptionist-nav-item ${
            section === "patients" ? "active" : ""
          }`}
          onClick={() => setSection("patients")}
        >
          <span className="receptionist-nav-icon">♙</span>

          <span>Patients</span>
        </button>

        <button
          className={`receptionist-nav-item ${
            section === "register" ? "active" : ""
          }`}
          onClick={() => setSection("register")}
        >
          <span className="receptionist-nav-icon">♧</span>

          <span>Register Patient</span>
        </button>

        <button
          className={`receptionist-nav-item ${
            section === "profile" ? "active" : ""
          }`}
          onClick={() => setSection("profile")}
        >
          <span className="receptionist-nav-icon">♙</span>

          <span>Profile</span>
        </button>
      </nav>

      <div className="receptionist-user">
        <div className="receptionist-user-info">
          <strong>Elham</strong>

          <span>Receptionist</span>
        </div>

        <Link to="/" className="receptionist-logout">
          <span>↪</span>
          Logout
        </Link>
      </div>
    </aside>
  );
}
