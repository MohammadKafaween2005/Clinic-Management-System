import { useEffect, useState } from "react";
import axios from "axios";

export default function PatientProfile() {
  const [patient, setPatient] = useState(null);
  const [error, setError] = useState("");

  const user = JSON.parse(localStorage.getItem("user"));

  useEffect(() => {
    const fetchPatient = async () => {
      try {
        const response = await axios.get(
          `http://localhost:5000/api/profile/patient/${user.profile_id}`,
        );

        setPatient(response.data);
      } catch (error) {
        console.error(error);
        setError("Could not load patient profile.");
      }
    };

    fetchPatient();
  }, [user.profile_id]);

  if (error) {
    return <p>{error}</p>;
  }

  if (!patient) {
    return <p>Loading...</p>;
  }

  const initials = patient.first_name.charAt(0) + patient.last_name.charAt(0);

  return (
    <section className="patient-profile-section">
      <div className="patient-profile-card">
        <div className="patient-profile-top">
          <div className="patient-profile-avatar">{initials}</div>

          <div>
            <h2>
              {patient.first_name} {patient.last_name}
            </h2>
            <p>Patient</p>
          </div>
        </div>

        <div className="patient-profile-info-grid">
          <div className="patient-profile-info-box">
            <span className="patient-profile-info-label">Email</span>

            <strong className="patient-profile-info-value">
              {patient.email || "Not provided"}
            </strong>
          </div>

          <div className="patient-profile-info-box">
            <span className="patient-profile-info-label">Phone</span>

            <strong className="patient-profile-info-value">
              {patient.phone || "Not provided"}
            </strong>
          </div>

          <div className="patient-profile-info-box">
            <span className="patient-profile-info-label">Date of Birth</span>

            <strong className="patient-profile-info-value">
              {patient.date_of_birth
                ? new Date(patient.date_of_birth).toLocaleDateString()
                : "Not provided"}
            </strong>
          </div>

          <div className="patient-profile-info-box">
            <span className="patient-profile-info-label">Gender</span>

            <strong className="patient-profile-info-value">
              {patient.gender || "Not provided"}
            </strong>
          </div>
        </div>
      </div>
    </section>
  );
}
