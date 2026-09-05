import { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { ReceptionistContext } from "../../context/ReceptionistContext";

export default function ReceptionistSidebar() {
  const { section, setSection } = useContext(ReceptionistContext);

  const navigate = useNavigate();

  const [profile, setProfile] = useState(null);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const user = JSON.parse(localStorage.getItem("user"));

        if (!user || user.role !== "receptionist") {
          return;
        }

        const response = await axios.get(
          `http://localhost:5000/api/profile/receptionist/${user.profile_id}`,
        );

        setProfile(response.data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchProfile();
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("user");
    navigate("/Login");
  };

  return (
    <aside className="receptionist-sidebar">
      <div className="receptionist-brand">
        <div className="receptionist-logo">M</div>

        <div className="receptionist-clinic-name">Dr. Hani Kafaween Clinic</div>

        <span className="sidebar-collapse">‹</span>
      </div>

      <nav className="receptionist-nav">
        <button
          type="button"
          className={`receptionist-nav-item ${
            section === "home" ? "active" : ""
          }`}
          onClick={() => setSection("home")}
        >
          <span className="receptionist-nav-icon">▦</span>

          <span>Home</span>
        </button>

        <button
          type="button"
          className={`receptionist-nav-item ${
            section === "appointments" ? "active" : ""
          }`}
          onClick={() => setSection("appointments")}
        >
          <span className="receptionist-nav-icon">▣</span>

          <span>Appointments</span>
        </button>

        <button
          type="button"
          className={`receptionist-nav-item ${
            section === "patients" ? "active" : ""
          }`}
          onClick={() => setSection("patients")}
        >
          <span className="receptionist-nav-icon">♙</span>

          <span>Patients</span>
        </button>

        <button
          type="button"
          className={`receptionist-nav-item ${
            section === "register" ? "active" : ""
          }`}
          onClick={() => setSection("register")}
        >
          <span className="receptionist-nav-icon">♧</span>

          <span>Register Patient</span>
        </button>

        <button
          type="button"
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
          <strong>{profile?.full_name || "Receptionist"}</strong>

          <span>Receptionist</span>
        </div>

        <button
          type="button"
          className="receptionist-logout"
          onClick={handleLogout}
        >
          <span>↪</span>
          Logout
        </button>
      </div>
    </aside>
  );
}
