import { useContext, useEffect, useState } from "react";
import axios from "axios";
import { ReceptionistContext } from "../../context/ReceptionistContext";

export default function ReceptionistHeader() {
  const { section } = useContext(ReceptionistContext);

  const [profile, setProfile] = useState(null);

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

  const getInitial = () => {
    if (!profile?.full_name) {
      return "R";
    }

    return profile.full_name.charAt(0).toUpperCase();
  };

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

        <div
          className="receptionist-header-avatar"
          title={profile?.full_name || "Receptionist"}
        >
          {getInitial()}
        </div>
      </div>
    </header>
  );
}
