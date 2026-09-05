import { useEffect, useState } from "react";
import axios from "axios";

export default function DoctorProfile() {
  const [doctor, setDoctor] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const user = JSON.parse(localStorage.getItem("user"));

  useEffect(() => {
    if (!user?.profile_id) {
      setError("Doctor profile could not be found.");
      setLoading(false);
      return;
    }

    axios
      .get(`http://localhost:5000/api/profile/doctor/${user.profile_id}`)
      .then((response) => {
        setDoctor(response.data);
      })
      .catch((error) => {
        console.error(error);
        setError("Could not load doctor profile.");
      })
      .finally(() => {
        setLoading(false);
      });
  }, [user?.profile_id]);

  const getInitials = (name) => {
    if (!name) return "";

    return name
      .replace("Dr. ", "")
      .split(" ")
      .map((word) => word.charAt(0))
      .join("")
      .toUpperCase();
  };

  if (loading) {
    return (
      <section className="doctor-profile-section">
        <p>Loading profile...</p>
      </section>
    );
  }

  if (error || !doctor) {
    return (
      <section className="doctor-profile-section">
        <p>{error || "Doctor profile not found."}</p>
      </section>
    );
  }

  return (
    <section className="doctor-profile-section">
      <div className="doctor-profile-card">
        <div className="doctor-profile-top">
          <div className="doctor-profile-avatar">
            {getInitials(doctor.full_name)}
          </div>

          <div>
            <h2>{doctor.full_name}</h2>
            <p>{doctor.specialization || "Doctor"}</p>
          </div>
        </div>

        <div className="doctor-profile-info-grid">
          <div className="doctor-profile-info-box">
            <span className="doctor-profile-info-label">Email</span>

            <span className="doctor-profile-info-value">{user.email}</span>
          </div>

          <div className="doctor-profile-info-box">
            <span className="doctor-profile-info-label">Phone</span>

            <span className="doctor-profile-info-value">
              {doctor.phone || "Not provided"}
            </span>
          </div>

          <div className="doctor-profile-info-box">
            <span className="doctor-profile-info-label">Clinic</span>

            <span className="doctor-profile-info-value">
              Dr. Hani Kafaween Clinic
            </span>
          </div>

          <div className="doctor-profile-info-box">
            <span className="doctor-profile-info-label">Status</span>

            <span className="doctor-profile-info-value">
              {doctor.status || "Active"}
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}
