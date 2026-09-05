import { useEffect, useState } from "react";
import axios from "axios";

export default function ReceptionistProfile() {
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        setLoading(true);

        const user = JSON.parse(localStorage.getItem("user"));

        if (!user || user.role !== "receptionist") {
          setError("Receptionist information not found.");
          return;
        }

        const response = await axios.get(
          `http://localhost:5000/api/profile/receptionist/${user.profile_id}`,
        );

        setProfile({
          ...response.data,
          email: user.email,
        });
      } catch (error) {
        console.error(error);

        setError(
          error.response?.data?.error || "Could not load receptionist profile.",
        );
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, []);

  if (loading) {
    return (
      <section className="receptionist-profile-section">
        <div className="receptionist-profile-card">
          <p>Loading profile...</p>
        </div>
      </section>
    );
  }

  if (error) {
    return (
      <section className="receptionist-profile-section">
        <div className="receptionist-profile-card">
          <p>{error}</p>
        </div>
      </section>
    );
  }

  const initial = profile.full_name
    ? profile.full_name.charAt(0).toUpperCase()
    : "R";

  return (
    <section className="receptionist-profile-section">
      <div className="receptionist-profile-card">
        {/* TOP */}

        <div className="receptionist-profile-top">
          <div className="receptionist-profile-avatar">{initial}</div>

          <div>
            <h2>{profile.full_name}</h2>
            <p>Receptionist</p>
          </div>
        </div>

        {/* INFORMATION */}

        <div className="receptionist-profile-info-grid">
          <div className="receptionist-profile-info-box">
            <span className="receptionist-profile-info-label">Email</span>

            <strong className="receptionist-profile-info-value">
              {profile.email || "Not provided"}
            </strong>
          </div>

          <div className="receptionist-profile-info-box">
            <span className="receptionist-profile-info-label">Phone</span>

            <strong className="receptionist-profile-info-value">
              {profile.phone || "Not provided"}
            </strong>
          </div>

          <div className="receptionist-profile-info-box">
            <span className="receptionist-profile-info-label">Clinic</span>

            <strong className="receptionist-profile-info-value">
              Dr. Hani Kafaween Clinic
            </strong>
          </div>

          <div className="receptionist-profile-info-box">
            <span className="receptionist-profile-info-label">Status</span>

            <strong className="receptionist-profile-info-value">
              {profile.status || "Active"}
            </strong>
          </div>
        </div>
      </div>
    </section>
  );
}
