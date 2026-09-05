import { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { PatientContext } from "../../context/PatientContext";

export default function PatientSidebar() {
  const { section, setSection } = useContext(PatientContext);

  const [patient, setPatient] = useState(null);

  const navigate = useNavigate();

  const user = JSON.parse(localStorage.getItem("user"));

  useEffect(() => {
    const fetchPatient = async () => {
      try {
        const response = await axios.get(
          `http://localhost:5000/api/profile/patient/${user.profile_id}`,
        );

        setPatient(response.data);
      } catch (error) {
        console.error("Could not load patient sidebar:", error);
      }
    };

    fetchPatient();
  }, [user.profile_id]);

  const handleLogout = () => {
    localStorage.removeItem("user");
    navigate("/Login");
  };

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
          <strong>
            {patient ? `${patient.first_name} ${patient.last_name}` : "Patient"}
          </strong>

          <span>Patient</span>
        </div>

        <button
          type="button"
          className="patient-sidebar-logout"
          onClick={handleLogout}
        >
          <span>↪</span>
          Logout
        </button>
      </div>
    </aside>
  );
}
